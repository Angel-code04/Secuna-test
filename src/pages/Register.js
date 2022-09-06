import { useState, useEffect } from "react";
import { Container, Form, Button, Nav } from "react-bootstrap";
import Swal from "sweetalert2";

import { Link, useNavigate } from "react-router-dom";


export default function Register(){

    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        if((username !== "" && email !== "" && password !== "" && password_confirmation !== "") && (password === password_confirmation)){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }, [username, email, password, password_confirmation]);

    // -----fetch

    function register(e){
      e.preventDefault();

      fetch('http://ec2-18-139-110-167.ap-southeast-1.compute.amazonaws.com/api/v1/signup', 
      {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        })
      })
      .then(res => res.json())
      .then(data => {
        if(data.status === "success"){
          Swal.fire({
            title: data.message,
            icon: "success"
          })
          navigate('/signIn');
        }
        else{
          Swal.fire({
            title: "Oops",
            icon: "error",
            text: "An error occur. Please try again"
          })
        }
      })
    };

   

    return(

      // Conditional reder if user is signIn to submit report

      // --------------------
        <>
        <h1 className="m-3 text-center register">Register</h1>
        <Container fluid className="background d-flex justify-content-center">
            <Form onSubmit={(e) => register(e)} className="registerForm p-5 col-lg-7 col-md-10">
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Username: </Form.Label>
                  <Form.Control className="bg-dark text-light" type="text" placeholder="Enter username" value={username} onChange={(e) => setusername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control className="bg-dark text-light" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Text className="text-light">
                    We'll never share your email.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="bg-dark text-light" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="verifyPassword">
                  <Form.Label>Verify Password</Form.Label>
                  <Form.Control className="bg-dark text-light" type="password" placeholder="Re-enter Password" value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} />
                </Form.Group>
                
                <div className="d-grid gap-2 mt-4">
                {
                    isActive
                    ?
                    <Button className="bg-info" type="submit">
                        Submit
                    </Button>
                    :
                    <Button className="bg-info" type="submit" disabled>
                        Submit
                    </Button>
                }

                <p className="d-flex align-items-center justify-content-center mt-1">Already have an account? <Nav.Link as={Link} to='/login' className='d-inline-block text-success px-1'>Click here </Nav.Link>to log in.</p>

                </div>
            </Form>
        </Container>
        </>
    )

};