import React from "react";

const deliveries = [
  {
    store: "Hiru Stores",
    product: "Lemon Puff",
    weight: "200g",
    price: "Rs. 230",
    qty: 20,
  },
  {
    store: "Araliya Stores",
    product: "Cream Cracker",
    weight: "200g",
    price: "Rs. 120",
    qty: 15,
  },
  {
    store: "Hiru Stores",
    product: "Lemon Puff",
    weight: "200g",
    price: "Rs. 230",
    qty: 20,
  },
  {
    store: "Araliya Stores",
    product: "Cream Cracker",
    weight: "200g",
    price: "Rs. 120",
    qty: 15,
  },
];

const PendingDelivery = () => {
  return (
    <>
      {/* Inline CSS styles */}
      <style>{`
        .pending-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 16px;
        }
        .delivery-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #e0f2fe; /* light blue */
          padding: 16px;
          border-radius: 8px;
        }
        .store-name {
          font-weight: 600;
          width: 150px;
        }
        .product-details {
          flex: 1;
          text-align: left;
          padding: 0 20px;
          color: #1f2937;
        }
        .product-name {
          font-weight: 500;
          margin-bottom: 4px;
        }
        .product-qty {
          font-weight: 500;
          color: #374151;
          min-width: 80px;
          text-align: right;
        }
      `}</style>

      <div className="pending-container">
        {deliveries.map((delivery, index) => (
          <div className="delivery-card" key={index}>
            {/* Store Name */}
            <div className="store-name">{delivery.store}</div>

            {/* Product Details */}
            <div className="product-details">
              <p className="product-name">{delivery.product}</p>
              <p>{delivery.weight}</p>
              <p>{delivery.price}</p>
            </div>

            {/* Quantity */}
            <div className="product-qty">Qty: {delivery.qty}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PendingDelivery;
