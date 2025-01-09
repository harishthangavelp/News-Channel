import React, { useState } from "react";
import Data from "./Data";

const UserData = () => {
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    kind: "",
    img: "",
    detail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate data before adding to Data.jsx
    if (!formData.id || !formData.description || !formData.kind || !formData.img || !formData.detail) {
      alert("All fields are required!");
      return;
    }

    // Add new data to Data.jsx
    Data.push({
      id: formData.id,
      description: formData.description,
      kind: formData.kind,
      img: formData.img,
      detail: formData.detail,
    });

    alert("Data added successfully!");
    // Reset form after submission
    setFormData({
      id: "",
      description: "",
      kind: "",
      img: "",
      detail: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Data</h2>
      <form>
        <div>
          <label>ID: </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Kind: </label>
          <input
            type="text"
            name="kind"
            value={formData.kind}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Detail: </label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="button" onClick={handleSubmit}>
          Add Data
        </button>
      </form>
    </div>
  );
};

export default UserData;
