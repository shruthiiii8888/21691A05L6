const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Mock data
const products = [
    { id: 1, productName: 'Laptop 1', price: 2236, rating: 4.7, discount: 63, availability: 'yes' },
    { id: 2, productName: 'Laptop 2', price: 1244, rating: 4.5, discount: 45, availability: 'out-of-stock' },
    { id: 3, productName: 'Laptop 3', price: 9102, rating: 4.4, discount: 98, availability: 'out-of-stock' },
    { id: 4, productName: 'Laptop 4', price: 2652, rating: 4.1, discount: 70, availability: 'yes' }
];

// Get all products
app.get('/test/companies/:companyname/categories/:categoryname/products', (req, res) => {
    const { companyname, categoryname } = req.params;
    const { top, minPrice, maxPrice } = req.query;

    // Filtering logic based on price
    const filteredProducts = products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );

    // Limit results to 'top' number
    const limitedProducts = filteredProducts.slice(0, parseInt(top));

    res.json(limitedProducts);
});

// Get product details by ID
app.get('/test/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
