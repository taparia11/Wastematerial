import React, { useState,useEffect } from 'react'
import { Table } from "@nextui-org/react";
import Createstaff from './Createstaff';
import { useNavigate } from 'react-router-dom'

const Userlist = (props) => {
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
            key: "phone",
            label: "PHONE",
          },{
            key: "email",
            label: "EMAIL",
          },
        {
          key: "status",
          label: "STATUS",
        },
        
      ];

      const host = 'https://waste.taparia11.repl.co'
      const [staff, setStaff] = useState([])
      const getStaff = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallstaff`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setStaff(json)
        // console.log(staff[0])
    }
    useEffect(() => {
      getStaff()
    }, [])
    
    //   const row = getStaff();
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
    <Createstaff props={props}/>
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
      <Table.Body items={staff}>
        {(item) => (
          <Table.Row key={item._id}>
            {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    </>
  )
}

export default Userlist