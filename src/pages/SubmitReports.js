import { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";

export default function SubmitReports(){

    const [vulnerability_type, setvulnerability_type] = useState("");
    const [severity_level, setseverity_level] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [reports, setReports] = useState([]);

    const [isActive, setIsActive] = useState(false);
    const [yourReports, setYourReports] = useState("");

    useEffect(() => {
        if(vulnerability_type !== "" && severity_level !== "" && title !== "" && description !== ""){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }, [vulnerability_type, severity_level, title, description]);


    const allReports = () => {
        fetch("http://ec2-18-139-110-167.ap-southeast-1.compute.amazonaws.com/api/v1/reports", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.reports.length == 0){
                setYourReports(
                    <Container className="text-center">
                        <h3>You don't have any reports yet</h3>
                    </Container>
                )
            }
            else{
                setYourReports(
                    <Container className="text-center mb-5">
                        <h3>Your Reports</h3>
                    </Container>
                )
                setReports(data.reports.map((report) => {
                    
                    return(

                        <>
                            <Container className=" text-center" key={report.uuid}>
                                
                                <Card className="" style={{ width: '18rem' }}>
                                <Card.Header>{report.title}</Card.Header>
                                    <Card.Body>
                                      <Card.Title>{report.vulnerability_type}</Card.Title>
                                      <Card.Text>
                                        {report.description}
                                      </Card.Text>
                                      <Button variant="primary" onClick={(e) => deleteReport(report.uuid)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </>
                    )
                }))
            }
        })
    }

    useEffect(() => {
        allReports();
    },[])

    function submitReport(e){
        e.preventDefault();

        fetch("http://ec2-18-139-110-167.ap-southeast-1.compute.amazonaws.com/api/v1/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                vulnerability_type: vulnerability_type,
                severity_level: severity_level,
                title: title,
                description: description
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            allReports();
            Swal.fire({
                title: data.message,
                icon: "success"
            })
            setTitle("");
            setvulnerability_type("");
            setseverity_level("");
            setDescription("");

        })
    }

    function deleteReport(id){

        fetch(`http://ec2-18-139-110-167.ap-southeast-1.compute.amazonaws.com/api/v1/reports/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            ;
            console.log(data);
            Swal.fire({
                title: data.message,
                icon: "success"
            })
        })
        allReports();
    }

    return(
        <>
        <h1 className="m-3 text-center register">Submit a Report</h1>
        <Container fluid className="background d-flex justify-content-center">
            <Form onSubmit={(e) => submitReport(e)} className="registerForm p-5 col-lg-6 col-md-8">

                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control className="bg-dark text-light" type="text" placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="vulnerability_type">
                  <Form.Label>Vulnerability Type: </Form.Label>
                  <Form.Control className="bg-dark text-light" type="text" placeholder="" value={vulnerability_type} onChange={(e) => setvulnerability_type(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="severity_level">
                  <Form.Label>Severity Level:</Form.Label>
                  <Form.Control className="bg-dark text-light" type="text" placeholder="" value={severity_level} onChange={(e) => setseverity_level(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control className="bg-dark text-light" type="text" as="textarea" placeholder="" value={description} onChange={(e) => setDescription(e.target.value)} />
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

                </div>
            </Form>
        </Container>

        <Container fluid className="mt-5 mb-5">
            {yourReports}
            {reports}
        </Container>
        </>
    )
};