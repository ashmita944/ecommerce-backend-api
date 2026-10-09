import { useEffect, useState } from "react";
import axios from "axios";

// Backend URL
const API_URL = "http://localhost:5000/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States (Admin Input)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // 1. GET: Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. POST: Add New Product (Admin Form)
  const handleAddProduct = async (e) => {
    e.preventDefault(); //Prevent page refresh
    if (!name || !price) return alert("Name and price are required!");

    try {
      const newProduct = { name, price: Number(price), image };
      await axios.post(`${API_URL}/add`, newProduct);
      
      alert("Product saved successfully!");
      // Reset form fields
      setName("");
      setPrice("");
      setImage("");
      
      // Refresh product list
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  // 3. DELETE: Delete Product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      alert("Product deleted successfully");
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading products...</h2>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* 🛠️ ADMIN PANEL FORM SECTION */}
      <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px", marginBottom: "40px", border: "1px dashed #ccc" }}>
        <h2 style={{ marginTop: 0 }}>🛡️ Admin Panel: Add New Product</h2>
        <form onSubmit={handleAddProduct} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input 
            type="text" 
            placeholder="Product Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "10px", flex: 1, borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input 
            type="number" 
            placeholder="Price (₹)" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            style={{ padding: "10px", width: "150px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input 
            type="text" 
            placeholder="Image URL (Optional)" 
            value={image} 
            onChange={(e) => setImage(e.target.value)}
            style={{ padding: "10px", flex: 1, borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button type="submit" style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Add Product
          </button>
        </form>
      </div>

      <hr />

      {/* 🛒 USER STORE FRONT SECTION */}
      <h1 style={{ textAlign: "center", color: "#333", margin: "30px 0" }}>🛒 Mera E-Commerce Store</h1>
      
      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>Tijori khali hai! Koi product nahi mila.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {products.map((product) => (
            <div key={product._id} style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              position: "relative"
            }}>
              <img 
                src={product.image || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500"} 
                alt={product.name} 
                style={{ width: "100%", height: "150px", objectFit: "contain" }}
              />
              <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
              <p style={{ color: "green", fontWeight: "bold", fontSize: "18px" }}>₹{product.price}</p>
              
              {/* DELETE BUTTON FOR ADMIN */}
              <button 
                onClick={() => handleDeleteProduct(product._id)}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                🗑️ Delete Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
