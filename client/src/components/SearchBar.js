import React, { useState, useEffect } from "react";

function SearchBar() {
  const [search, setSearch] = useState("null");
  const [stocks, setStocks] = useState([]);
  const [originalStocks, setOriginalStocks] = useState([])
  const [searchMade, setSearchMade] = useState(false)



  useEffect(() => {
    fetch("/stocks")
      .then((r) => r.json())
      .then((stocks) => {
        setStocks(stocks)
        setOriginalStocks(stocks)
        console.log(stocks)} )
  
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchMade(true);

    if (search.trim() === "") {
      setStocks(originalStocks);
      return;
    }

    const filteredStocks = originalStocks.filter((stock) => {
      // Check if the product name or location address includes the search query (case-insensitive)
      const productName = stock.product.name.toLowerCase();
      const locationAddress = stock.location.address.toLowerCase();
      const query = search.toLowerCase();

      return productName.includes(query) || locationAddress.includes(query);
    });
    setStocks(filteredStocks)

  }

  const handleChange = (e) => {
    setSearch(e.target.value, () =>{
    // console.log(search)
    });
  }
  
  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a product"
        value={search}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <p>{stock.product.name}</p>
            <p>{stock.location.address}</p>
            <p>Quantity: {stock.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar