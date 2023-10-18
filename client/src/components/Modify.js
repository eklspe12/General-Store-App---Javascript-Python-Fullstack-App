// import React, {useState, useEffect } from "react";

// function Modify({productId}) {
//     const [product, setProduct] = useState(null)

// useEffect(() => {
//     fetch(`/products/${productId}`)
//     .then((r) => r.json())
//     .then((data) => console.error('Error fetching product: '))
// })


// const handleDelete = () => {
  
//     fetch(`/products/${productId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.status === 204) {
          
//           console.log("Product deleted successfully");
//         } else {
//           console.error("Error deleting product");
//         }
//       })
//     .then(() => {
//       const updatedProducts = products.filter((p) => p.id !== id);
//       setProducts(updatedProducts)
//     });
//   }
  
//   const handleUpdate = (updatedProductData) => {
//     fetch(`/products/${productId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type" :"application.json"
//       },
//       body: JSON.stringify(updatedProductData),
//     })
//     .then((r) => r.json())
//     .then((updatedProduct) => {
//       console.log("Product updated!", updatedProduct);
//     })
//     .catch((error) => console.error("Error updating product: ", error));
//   }

//   return (
//     <div>
        
//     </div>

//   );


// }

// export default Modify 