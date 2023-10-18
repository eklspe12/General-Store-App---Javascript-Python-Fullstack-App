import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/products/search/${query}`);
      if (response.status === 404) {
        // Handle product not found
        console.error("Product not found");
      } else if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Load all products on component mount
    fetch("/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            {/* Display other product information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
