import React from 'react'
import { Table } from "@nextui-org/react";

const Userlist = () => {
    const columns = [
        {
          key: "name",
          label: "NAME",
        },
        {
          key: "area",
          label: "AREA",
        },
        {
          key: "status",
          label: "STATUS",
        },
      ];
      const rows = [
        {
          key: "1",
          name: "Tony Reichert",
          area: "CEO",
          status: "Active",
        },
        {
          key: "2",
          name: "Zoey Lang",
          area: "Technical Lead",
          status: "Paused",
        },
        {
          key: "3",
          name: "Jane Fisher",
          area: "Senior Developer",
          status: "Active",
        },
        {
          key: "4",
          name: "William Howard",
          area: "Community Manager",
          status: "Vacation",
        },
      ];
  return (
    <>
    <Table
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row key={item.key}>
            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    </>
  )
}

export default Userlist