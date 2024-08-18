import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    company: 'AMZ',
    category: 'Laptop',
    minPrice: 0,
    maxPrice: 10000,
    top: 10,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/test/companies/${filters.company}/categories/${filters.category}/products`,
          {
            params: {
              top: filters.top,
              minPrice: filters.minPrice,
              maxPrice: filters.maxPrice,
            },
          }
        );
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>All Products</h2>
      <div>
        <label>Company:
          <select name="company" value={filters.company} onChange={handleFilterChange}>
            <option value="AMZ">AMZ</option>
            <option value="FLP">FLP</option>
            <option value="SNP">SNP</option>
            <option value="MYN">MYN</option>
            <option value="AZO">AZO</option>
          </select>
        </label>
        <label>Category:
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="Laptop">Laptop</option>
            <option value="Phone">Phone</option>
            {/* Add other categories */}
          </select>
        </label>
        <label>Min Price:
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
        </label>
        <label>Max Price:
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        </label>
        <label>Top:
          <input type="number" name="top" value={filters.top} onChange={handleFilterChange} />
        </label>
      </div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link to={`/product/${index}`}>
              <h3>{product.productName}</h3>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}%</p>
              <p>Availability: {product.availability}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
