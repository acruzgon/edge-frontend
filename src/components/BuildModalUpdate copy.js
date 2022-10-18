/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Fragment } from "react";
import { Title, Text } from "@patternfly/react-core";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";
import PropTypes from "prop-types";

const BuildModalUpdate = ({ reviewObject, reviewObjectLabel }) => {
  const [selectedRepoName, setSelectedRepoName] = React.useState("");

  const colNames = {
    version: "Version",
    release: "Release",
    additionalPackages: "Additional packages",
    systemsRunning: "Systems running",
    created: "Created",
  };
  return (
    <>
      <Title headingLevel="h3">
        <Text>{reviewObject.title}</Text>
      </Title>

      <TableComposable
        aria-label="Selectable version table"
        variant="compact"
        borders={reviewObject.borders}
      >
        <Thead>
          <Tr>
            {reviewObjectLabel === "all-versions" ? <Th /> : ""}
            <Th>{colNames.version}</Th>
            <Th>{colNames.release}</Th>
            <Th>{colNames.additionalPackages}</Th>
            <Th>{colNames.systemsRunning}</Th>
            <Th>{colNames.created}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reviewObject.rows.map((element, index) => (
            <Fragment key={element[index] + reviewObjectLabel + index}>
              {element.map((row, rowIndex) => (
                <Tr
                  key={row[index] + reviewObjectLabel + rowIndex}
                  onRowClick={() => setSelectedRepoName(row.version)}
                  isRowSelected={selectedRepoName === row.version}
                >
                  {reviewObjectLabel === "all-versions" ? (
                    <Td
                      select={{
                        rowIndex,
                        onSelect: () => setSelectedRepoName(row.version),
                        isSelected: selectedRepoName === row.version,
                        //disable: !isRepoSelectable(repo),
                        variant: "radio",
                      }}
                    />
                  ) : (
                    ""
                  )}

                  <Td dataLabel={colNames.version}>{row.version}</Td>
                  <Td dataLabel={colNames.release}>{row.release}</Td>
                  <Td dataLabel={colNames.additionalPackages}>
                    {row.additionalPackages}
                  </Td>
                  <Td dataLabel={colNames.systemsRunning}>
                    {row.systemsRunning}
                  </Td>
                  <Td dataLabel={colNames.created}>{row.created}</Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </Tbody>
      </TableComposable>
    </>
  );
};

BuildModalUpdate.propTypes = {
  reviewObject: PropTypes.object,
  reviewObjectLabel: PropTypes.string,
};

export default BuildModalUpdate;
