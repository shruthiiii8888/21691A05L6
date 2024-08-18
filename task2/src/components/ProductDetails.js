import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  // For demonstration, we'll use hardcoded product details. Replace this with API fetch if needed.
  const product = {
    productName: `Product ${id}`,
    price: 100 + id * 10,
    rating: 4.5 + id * 0.1,
    discount: 10 + id * 5,
    availability: id % 2 === 0 ? 'yes' : 'out-of-stock',
  };

  return (
    <div>
      <h2>Product Details</h2>
      <h3>{product.productName}</h3>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

export default ProductDetail;
