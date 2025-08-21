import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price) }),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setName("");
      setPrice("");
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
        padding: 0,
        margin: 0,
        fontFamily: "Segoe UI",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 32,
        }}
      >
        <h1 style={{ color: "#4f46e5", marginBottom: 24 }}>
          Simple MERN Stack CRUD
        </h1>
        <form
          onSubmit={handleAdd}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 28,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px 14px",
              border: "1px solid #c7d2fe",
              borderRadius: 8,
              fontSize: 16,
              outline: "none",
              minWidth: 120,
            }}
          />
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              padding: "10px 14px",
              border: "1px solid #c7d2fe",
              borderRadius: 8,
              fontSize: 16,
              outline: "none",
              minWidth: 100,
            }}
          />
          <button
            type="submit"
            style={{
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Add Product
          </button>
        </form>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#f1f5f9",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ background: "#6366f1", color: "#fff" }}>
                <th style={{ padding: 12, fontWeight: 600 }}>ID</th>
                <th style={{ padding: 12, fontWeight: 600 }}>Name</th>
                <th style={{ padding: 12, fontWeight: 600 }}>Price</th>
                <th style={{ padding: 12, fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} style={{ background: "#fff" }}>
                  <td
                    style={{ padding: 10, borderBottom: "1px solid #e0e7ff" }}
                  >
                    {p._id}
                  </td>
                  <td
                    style={{ padding: 10, borderBottom: "1px solid #e0e7ff" }}
                  >
                    {p.name}
                  </td>
                  <td
                    style={{ padding: 10, borderBottom: "1px solid #e0e7ff" }}
                  >
                    {p.price}
                  </td>
                  <td
                    style={{ padding: 10, borderBottom: "1px solid #e0e7ff" }}
                  >
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px 16px",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
