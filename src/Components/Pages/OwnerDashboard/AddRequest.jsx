import React, { useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const agentData = [
  {
    id: 1,
    name: "Mr. Kasun Perera",
    company: "CBL",
    category: "Biscuit",
    location: "Ratnapura",
    contact: "077 xxxxxx",
    image: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  },
  {
    id: 2,
    name: "Mr. Kasun Perera",
    company: "CBL",
    category: "Biscuit",
    location: "Ratnapura",
    contact: "077 xxxxxx",
    image: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
  },
];

const AddRequest = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [quantity, setQuantity] = useState("");

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleAddRequestClick = (agent) => {
    setSelectedAgent(agent);
    setProductName("");
    setProductDetails("");
    setQuantity("");
    setModalOpen(true);
  };

  const handleSubmit = () => {
    console.log("Agent:", selectedAgent?.name);
    console.log("Product Name:", productName);
    console.log("Product Details:", productDetails);
    console.log("Quantity:", quantity);

    toast.success("Request submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    toggleModal();
  };

  return (
    <Container className="mt-4">
      <ToastContainer />
      <Card className="shadow-sm border-0 rounded">
        <CardBody>
          {/* Filters */}
          <Row className="mb-4 align-items-end">
            <Col md={3}>
              <label>Company</label>
              <Input type="select">
                <option>CBL</option>
                <option>Maliban</option>
                <option>Munchee</option>
              </Input>
            </Col>
            <Col md={3}>
              <label>Location</label>
              <Input type="select">
                <option>Ratnapura</option>
                <option>Colombo</option>
                <option>Galle</option>
              </Input>
            </Col>
            <Col md={3}>
              <label>Product Category</label>
              <Input type="select">
                <option>Biscuit</option>
                <option>Snacks</option>
                <option>Drinks</option>
              </Input>
            </Col>
            <Col md={3}>
              <Button color="primary" className="w-100">
                <FaSearch className="me-2" /> Search
              </Button>
            </Col>
          </Row>

          {/* Agent Cards */}
          {agentData.map((agent) => (
            <div
              key={agent.id}
              className="mb-3 p-3 shadow-sm"
              style={{
                backgroundColor: "#d9f3fc",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <Row className="align-items-start">
                <Col md="auto">
                  <img
                    src={agent.image}
                    alt="agent"
                    style={{
                      width: "100px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Col>

                <Col>
                  <p><strong>Name</strong>: {agent.name}</p>
                  <p><strong>Company</strong>: {agent.company}</p>
                  <p><strong>Product Category</strong>: {agent.category}</p>
                  <p><strong>Location</strong>: {agent.location}</p>
                  <p><strong>Contact</strong>: {agent.contact}</p>
                </Col>

                <Col md="auto" className="d-flex justify-content-end">
                  <Button
                    color="primary"
                    className="mt-2"
                    onClick={() => handleAddRequestClick(agent)}
                  >
                    Add Request
                  </Button>
                </Col>
              </Row>
            </div>
          ))}

          {/* Modal */}
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
              Add Request for {selectedAgent?.name}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="productName">Product Name</Label>
                <Input
                  id="productName"
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="productDetails">Product Details</Label>
                <Input
                  id="productDetails"
                  type="text"
                  placeholder="Enter product details"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSubmit}>
                Submit Request
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AddRequest;
