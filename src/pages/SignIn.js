import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Nav, Modal } from "react-bootstrap";
import Swal from "sweetalert2";


export default function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState([]);
    const [viewQR, setViewQR] = useState([]);
    const [token, setToken] = useState("");

    const [isActive, setIsActive] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(email !== "" && password !== ""){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }, [email, password]);

    // fetch

    function sendCode(e){
        e.preventDefault();

        fetch("http://ec2-18-139-110-167.ap-southeast-1.compute.amazonaws.com/api/v1/2fa/verify", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                code: code
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.type == "Bearer"){
                localStorage.setItem("token", data.access_token);

                Swal.fire({
                    title: "Succesfully signed in.",
                    icon: "success"
                })
                navigate('/SubmitReports');
            }


        })
    }

    function signIn(e){
        e.preventDefault();

        fetch("http://ec2-18-139-110-167.ap-southeast-1.compute.amazonaws.com/api/v1/signin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            setToken(data.access_token);
            handleShow();
            setMessage(
                    <Modal.Title>{data.message}</Modal.Title>
            );
            setViewQR(
                <img src={data.two_fa_qr_url} alt="" />
            )
        })
    }

    return(
        <>
        <h1 className="m-3 text-center register">Sign In</h1>
        <Container fluid className="background d-flex justify-content-center">
            <Form onSubmit={(e) => signIn(e)} className="registerForm p-5 col-lg-6 col-md-8">

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control className="bg-dark text-light" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="bg-dark text-light" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                
                <div className="d-grid gap-2 mt-4">
                {
                    isActive
                    ?
                    <Button className="bg-info" type="submit">
                        Sign In
                    </Button>
                    :
                    <Button className="bg-info" type="submit" disabled>
                        Sign In
                    </Button>
                }

                <p className="d-flex align-items-center justify-content-center mt-1">Don't have an account yet? <Nav.Link as={Link} to='/register' className='d-inline-block text-success px-1'>Click here </Nav.Link>to Register.</p>

                </div>
            </Form>
        </Container>

        <Modal dialogClassName='my-modal' show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              {message}
            </Modal.Header>
            
            <Modal.Body>
                <Container className="text-center">
                    {viewQR}
                    <Form className="mt-4" onSubmit={(e) => sendCode(e)}>
                        <Form.Group className="mb-3" controlId="code">
                            <Form.Control type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Enter code" />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Send
                        </Button>
                    </Form>
                </Container>
                
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};