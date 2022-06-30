import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Spacer } from "@nextui-org/react";
import { UnLockIcon } from "./UnLockIcon.js";
import { LockIcon } from "./LockIcon.js";
import { Button } from "@nextui-org/react";
import { Container, Card, Row } from "@nextui-org/react";

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            var userType = parseJwt(json.authtoken)
            localStorage.setItem('raccess', userType.staff.role);
            if (userType.staff.role == 'S') {
                navigate("/cleaning");
            }
            else{
                navigate("/home");
            }
            props.showAlert("Logged in successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }

    }
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>

                    <Spacer y={7} />
        <Container xs>
      <Card css={{ $$cardColor: '$colors$purple200' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <form onSubmit={handleSubmit}>
                
                    <Spacer y={1.6} />
                    <Input size="lg" clearable labelPlaceholder="Email" type="email" name='email' value={credentials.email} id="email" onChange={onChange} />
                   
                
                    <Spacer y={2} />
                    <Input.Password value={credentials.password} id="password" onChange={onChange} name='password'
                        labelPlaceholder="Password" size="md"
                        visibleIcon={<UnLockIcon fill="currentColor" />}
                        hiddenIcon={<LockIcon fill="currentColor" />}
                    />
                   
                    <Spacer y={1.6} />
                   <Button type="submit" shadow color="primary" auto>Login</Button>
            </form>
            

          </Row>
        </Card.Body>
      </Card>
    </Container>
        </>
    )
}

export default Login