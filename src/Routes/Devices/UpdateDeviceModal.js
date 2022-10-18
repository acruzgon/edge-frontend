/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  TextContent,
  Text,
  Bullseye,
  Backdrop,
  Spinner,
} from "@patternfly/react-core";
import { ExclamationTriangleIcon } from "@patternfly/react-icons";
import PropTypes from "prop-types";
import { getImageById, getImageSet } from "../../api/images";
import { updateDeviceLatestImage } from "../../api/devices";
import { useDispatch } from "react-redux";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications/redux";
import Modal from "../../components/Modal";
import componentTypes from "@data-driven-forms/react-form-renderer/component-types";
//import BuildModalReview from "../../components/BuildModalReview";
import DateFormat from "@redhat-cloud-services/frontend-components/DateFormat";
import { distributionMapper } from "../../constants";
import BuildModalUpdate from "../../components/UpdateModalTable";
import UpdateModalTable from "../../components/UpdateModalTable";

const getImageData = (imageId) =>
  getImageById({ id: imageId }).then((imageSetId) =>
    getImageSet({
      id: imageSetId?.image?.ImageSetID,
      q: {
        limit: 1,
        sort_by: "-created_at",
      },
    })
  );

const UpdateDeviceModal = ({ updateModal, setUpdateModal, refreshTable }) => {
  const [imageData, setImageData] = useState(null);
  const dispatch = useDispatch();
  const isMultiple = updateModal.deviceData.length > 1;
  const deviceId = updateModal.deviceData.map((device) => device.id);
  const deviceName = isMultiple
    ? updateModal.deviceData.map((device) => device.display_name)
    : updateModal?.deviceData[0]?.display_name;

  useEffect(() => {
    updateModal?.imageSetId
      ? getImageSet({
          id: updateModal.imageSetId,
          q: {
            limit: 1,
            sort_by: "-created_at",
            status: "SUCCESS",
          },
        }).then((data) => setImageData(data.Data.images[0]))
      : getImageData(updateModal.imageId).then((data) =>
          setImageData(data.Data.images[0])
        );
  }, []);

  const handleUpdateModal = async () => {
    try {
      await updateDeviceLatestImage({
        DevicesUUID: deviceId,
      });
      dispatch({
        ...addNotification({
          variant: "info",
          title: "Updating system",
          description: isMultiple
            ? ` ${deviceName.length} systems were added to the queue.`
            : ` ${deviceName} was added to the queue.`,
        }),
      });
    } catch (err) {
      dispatch({
        ...addNotification({
          variant: "danger",
          title: "Updating a system was unsuccessful",
          description: `Response: ${err.statusText}`,
        }),
      });
    }

    handleClose();
    refreshTable ? refreshTable() : null;
  };

  const handleClose = () => {
    setUpdateModal((prevState) => {
      return {
        ...prevState,
        isOpen: false,
      };
    });
  };

  const WarningText = () => (
    <TextContent className="pf-u-pt-md">
      <Text
        style={{ color: "var(--pf-global--palette--gold-500)" }}
        component="small"
      >
        <ExclamationTriangleIcon /> After the update is installed, the system
        will apply the changes.
        {updateModal.deviceData.some(
          (device) =>
            device.deviceStatus !== "updateAvailable" &&
            device.deviceStatus !== "error"
        ) && (
          <div>
            <ExclamationTriangleIcon /> Some selected systems have a status of
            unresponsive and may not successfully update.
          </div>
        )}
      </Text>
    </TextContent>
  );

  const Description = () => (
    <TextContent>
      <Text>
        Update{" "}
        <span className="pf-u-font-weight-bold pf-u-font-size-md">
          {isMultiple ? `${deviceName.length} systems` : deviceName}
        </span>{" "}
        to a newer of
        <span className="pf-u-font-weight-bold pf-u-font-size-md">
          {` ${imageData?.image.Name}`}
        </span>{" "}
        by selecting a new version from the table below.{" "}
      </Text>
    </TextContent>
  );

  const currentVersion = () => {
    var d = {
      title: "Current version",
      borders: false,
      rows: [
        [
          {
            version: imageData?.image.Version,
            release: distributionMapper[imageData?.image.Distribution],
            additionalPackages: 99,
            systemsRunning: 99,
            created: <DateFormat date={imageData?.image.CreatedAt} />,
          },
        ],
      ],
    };
    return d;
  };

  const allVersions = () => {
    var d = {
      title: "Select version to update to",
      borders: true,
      rows: [
        {
          version: 2,
          release: "RHEL 8.2",
          additionalPackages: 77,
          systemsRunning: 100,
          created: "january",
        },

        {
          version: 3,
          release: "RHEL 8.5",
          additionalPackages: 0,
          systemsRunning: 101,
          created: "february",
        },

        {
          version: 4,
          release: "RHEL 8.6",
          additionalPackages: 7,
          systemsRunning: 102,
          created: "september",
        },

        {
          version: 5,
          release: "RHEL 8.5",
          additionalPackages: 0,
          systemsRunning: 1,
          created: "march",
        },
      ],
    };
    return d;
  };

  const updateSchema = {
    fields: [
      {
        component: componentTypes.PLAIN_TEXT,
        name: "description",
        label: Description(),
      },
      {
        component: "current-version",
        name: "current-version",
      },
      {
        component: "all-versions",
        name: "all-versions",
      },
      {
        component: componentTypes.PLAIN_TEXT,
        name: "warning-text",
        label: WarningText(),
      },
    ],
  };

  const currentVersionBuildModalUpdate = (props) => (
    <UpdateModalTable
      reviewObject={currentVersion}
      reviewObjectLabel="current-version"
      {...props}
    >
      {" "}
    </UpdateModalTable>
  );
  const allVersionsBuildModalUpdate = (props) => (
    <UpdateModalTable
      reviewObject={allVersions}
      reviewObjectLabel="all-versions"
      {...props}
    >
      {" "}
    </UpdateModalTable>
  );

  return (
    <>
      {imageData ? (
        <Modal
          size="medium"
          title={`Update system${
            isMultiple ? "s" : ""
          } to latest image version`}
          isOpen={updateModal.isOpen}
          closeModal={() =>
            setUpdateModal((prevState) => ({ ...prevState, isOpen: false }))
          }
          submitLabel="Update system"
          additionalMappers={{
            "current-version": currentVersionBuildModalUpdate,
            "all-versions": allVersionsBuildModalUpdate,
          }}
          schema={updateSchema}
          onSubmit={handleUpdateModal}
          reloadData={refreshTable}
        ></Modal>
      ) : (
        <Backdrop>
          <Bullseye>
            <Spinner isSVG diameter="100px" />
          </Bullseye>
        </Backdrop>
      )}
    </>
  );
};

UpdateDeviceModal.propTypes = {
  refreshTable: PropTypes.func,
  updateModal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    deviceData: PropTypes.array.isRequired,
    imageData: PropTypes.object,
    imageId: PropTypes.number,
    imageSetId: PropTypes.number,
  }).isRequired,
  setUpdateModal: PropTypes.func.isRequired,
};

export default UpdateDeviceModal;
