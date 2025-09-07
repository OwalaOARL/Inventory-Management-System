import React from "react";
import { Card, CardBody } from "reactstrap";

const lowStockItems = [
  {
    id: 1,
    name: "Chocolate Wafers",
    quantity: 5,
  },
  {
    id: 2,
    name: "Treat Biscuits",
    quantity: 5,
  },
];

const LowStock = () => {
  return (
    <div className="container mt-4">
      {lowStockItems.map((item) => (
        <Card
          key={item.id}
          style={{
            backgroundColor: "#e0f7fa",
            marginBottom: "20px",
            border: "none",
            padding: "15px",
          }}
        >
          <CardBody>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {/* Product Name */}
              <p
                style={{
                  fontWeight: "bold",
                  margin: "0 20px 0 0",
                  color: "#333",
                }}
              >
                {item.name}
              </p>

              {/* Stock Message */}
              <p style={{ color: "red", margin: "0 20px" }}>Stock is low</p>

              {/* Quantity Display */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <label
                  htmlFor={`qty-${item.id}`}
                  style={{
                    marginRight: "10px",
                    fontWeight: "bold",
                    color: "#007bff",
                  }}
                >
                  Qty:
                </label>
                <input
                  type="number"
                  id={`qty-${item.id}`}
                  value={item.quantity}
                  readOnly
                  style={{
                    width: "60px",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default LowStock;
