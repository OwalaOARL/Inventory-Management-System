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
    <Container className="h-100 d-flex justify-content-center align-items-center mt-5">
      <ToastContainer />
      <Card className="shadow w-100">
        <CardBody
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100%" }}
        >
          <div className="w-100" style={{ maxWidth: "1000px" }}>
            {/* Filters */}
            <Row className="mb-4 align-items-end">
              <Col md={3}>
                <label>Company</label>
                <Input type="select">
  <option>CBL (Ceylon Biscuits Limited)</option>
  <option>Maliban</option>
  <option>Munchee</option>
  <option>Prima</option>
  <option>CIC Holdings</option>
  <option>Elephant House</option>
  <option>Anchor</option>
  <option>Kotmale</option>
  <option>Wijaya Products</option>
  <option>Harischandra</option>
</Input>

              </Col>
              <Col md={3}>
                <label>Location</label>
                <Input type="select">
  <option>Colombo</option>
  <option>Gampaha</option>
  <option>Kandy</option>
  <option>Kalutara</option>
  <option>Galle</option>
  <option>Matara</option>
  <option>Hambantota</option>
  <option>Jaffna</option>
  <option>Trincomalee</option>
  <option>Anuradhapura</option>
  <option>Polonnaruwa</option>
  <option>Kurunegala</option>
  <option>Puttalam</option>
  <option>Ratnapura</option>
  <option>Badulla</option>
  <option>Monaragala</option>
  <option>Nuwara Eliya</option>
  <option>Mullaitivu</option>
  <option>Vavuniya</option>
</Input>

              </Col>
              <Col md={3}>
                <label>Product Category</label>
                <Input type="select">
  <option>Biscuit</option>
  <option>Snacks</option>
  <option>Drinks</option>
  <option>Chocolates</option>
  <option>Cereals</option>
  <option>Spices & Condiments</option>
  <option>Rice & Grains</option>
  <option>Flours & Baking</option>
  <option>Cooking Oil</option>
  <option>Dairy Products</option>
  <option>Instant Noodles</option>
  <option>Tea & Coffee</option>
  <option>Jam & Honey</option>
  <option>Frozen Foods</option>
  <option>Cleaning Supplies</option>
</Input>

              </Col>
              <Col md={3}>
                <Button
                  style={{
                    backgroundColor: "rgb(89, 89, 242)",
                    borderColor: "rgb(89, 89, 242)",
                  }}
                  className="w-100 text-white hover:opacity-90 transition"
                >
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
                    <p style={{ color: "#292F63" }}>
                      <strong>Name</strong>: {agent.name}
                    </p>
                    <p style={{ color: "#292F63" }}>
                      <strong>Company</strong>: {agent.company}
                    </p>
                    <p style={{ color: "#292F63" }}>
                      <strong>Product Category</strong>: {agent.category}
                    </p>
                    <p style={{ color: "#292F63" }}>
                      <strong>Location</strong>: {agent.location}
                    </p>
                    <p style={{ color: "#292F63" }}>
                      <strong>Contact</strong>: {agent.contact}
                    </p>
                  </Col>

                  <Col md="auto" className="d-flex justify-content-end">
                    <Button
                      style={{
                        backgroundColor: "rgb(89, 89, 242)",
                        borderColor: "rgb(89, 89, 242)",
                      }}
                      className="mt-2 text-white hover:opacity-90 transition"
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
                <Button
                  style={{
                    backgroundColor: "rgb(89, 89, 242)",
                    borderColor: "rgb(89, 89, 242)",
                  }}
                  className="text-white hover:opacity-90 transition"
                  onClick={handleSubmit}
                >
                  Submit Request
                </Button>
                <Button color="secondary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AddRequest;
