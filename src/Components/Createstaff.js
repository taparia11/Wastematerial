import React, { useState } from 'react'
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import { useNavigate } from 'react-router-dom'

const Createstaff = (props) => {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };
    const [credentials, setCredentials] = useState({name:"",email:"", password:"",area:"",phone:""})
  let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.name,email: credentials.email, password: credentials.password,area: credentials.area,phone: credentials.phone})
        });
        const json = await response.json();
        setVisible(false);
        setCredentials({name:"",email:"", password:"",area:"",phone:""})
        console.log(json);
        navigate("/userlist"); 
        if (json.success) {
            //save the auth token and redirect
            // localStorage.setItem('token', json.authtoken);
            props.showAlert("Your Account has been Created Successfully","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }

    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }
    return (
      <div>
        <Button auto color="primary" style={{marginLeft:"90%"}} shadow onClick={handler}>
          Create User
        </Button>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Create New&nbsp;
              <Text b size={18}>
                Staff Account
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
          <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              name='name'
              value={credentials.name}
              onChange={onChange}
              placeholder="Name"
              labelLeft="@" 
            /><Input
            clearable
            bordered
            fullWidth
            name='area'
            onChange={onChange}
            value={credentials.area} 
            color="primary"
            size="lg"
            placeholder="Area"
            labelLeft="🌏" 
          /><Input
            clearable
            onChange={onChange}
            value={credentials.phone} 
            bordered
            fullWidth
            name='phone'
            color="primary"
            size="lg"
            placeholder="Phone"
            labelLeft="📞" 
          />
            <Input
              clearable
              bordered
              fullWidth
              onChange={onChange}
              name='email'
              value={credentials.email} 
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<Mail fill="currentColor" />}
            />
            <Input
              clearable
              bordered
              onChange={onChange}
              value={credentials.password} 
              fullWidth
              name='password'
              color="primary"
              size="lg"
              placeholder="Password"
              contentLeft={<Password fill="currentColor" />}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={closeHandler}>
              Cancel
            </Button>
            <Button auto onClick={handleSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  
}

export default Createstaff