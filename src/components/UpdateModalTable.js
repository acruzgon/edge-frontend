/* eslint-disable no-unused-labels */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Fragment } from "react";
import { Title, Text } from "@patternfly/react-core";
import GeneralTable from "./general-table/GeneralTable";
import { cellWidth, headerCol } from "@patternfly/react-table";
import PropTypes from "prop-types";

const UpdateModalTable = ({ reviewObject, reviewObjectLabel }) => {
  const [selectedRowVersion, setSelectedRowVersion] = React.useState("");

  const defaultFilters = [
    {
      label: "Name",
      type: "text",
    },
  ];

  const columns = [
    {
      title: "Version",
      cellTransforms: [headerCol("selectable-radio")],
    },
    "Release",
    {
      title: "Additional packages",
    },
    "Systems running",
    "Created",
  ];

  const rows = reviewObject().rows.map((element, index) => {
    cells: [
      element.version,
      element.release,
      element.additionalPackages,
      element.systemsRunning,
      element.created,
    ];
    selected: selectedRowVersion === element.version;
  });

  // const columnNames = [
  //   {
  //     title: "Version",
  //     type: "version",
  //     sort: false,
  //     columnTransforms: [cellWidth(30)],
  //   },
  //   {
  //     title: "Release",
  //     type: "release",
  //     sort: false,
  //     columnTransforms: [cellWidth(20)],
  //   },
  //   {
  //     title: "Additional Packages",
  //     type: "additional_packages",
  //     sort: false,
  //     columnTransforms: [cellWidth(15)],
  //   },
  //   {
  //     title: "Systems running",
  //     type: "systems_running",
  //     sort: false,
  //     columnTransforms: [cellWidth(15)],
  //   },
  //   {
  //     title: "Created",
  //     type: "created",
  //     sort: false,
  //     columnTransforms: [cellWidth(25)],
  //   },
  // ];

  return (
    <>
      <Title headingLevel="h3">
        <Text>{reviewObject().title}</Text>
      </Title>

      <GeneralTable
        apiFilterSort={false}
        isUseApi={false}
        //filters={defaultFilters}
        loadTableData={reviewObject}
        tableData={{
          count: 0,
          isLoading: false,
          hasError: false,
        }}
        columnNames={columns}
        rows={rows}
        hasCheckbox={false}
        //selectedItems={selectedItems}
        skeletonRowQuantity={3}
        //kebabItems={kebabItems}
        //hasModalSubmitted={hasModalSubmitted}
        //setHasModalSubmitted={setHasModalSubmitted}
      />

      {/* <TableComposable
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
      </TableComposable> */}
    </>
  );
};

UpdateModalTable.propTypes = {
  reviewObject: PropTypes.func,
  reviewObjectLabel: PropTypes.string,
};

export default UpdateModalTable;
