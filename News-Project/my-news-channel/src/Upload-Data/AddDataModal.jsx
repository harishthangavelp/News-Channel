import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import react-bootstrap components

function AddDataModal({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    kind: '',
    img: '',
    detail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://news-channel-14.onrender.com/addNews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to submit data');
      
      setFormData({ id: '', description: '', kind: '', img: '', detail: '' });

      // Trigger onSubmit after successful submission
      if (onSubmit) {
        onSubmit();  // This will be the handleFormSubmit function passed from the parent
      }

      // Close the modal after submission
      setTimeout(() => {
        if (onClose) {
          onClose(); // This calls the function passed from parent to close the modal
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting data');
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formId">
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formKind">
            <Form.Label>Kind</Form.Label>
            <Form.Control
              as="select"
              name="kind"
              value={formData.kind}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="all">All</option>
              <option value="latest">Latest</option>
              <option value="general">General</option>
              <option value="breaking">Breaking</option>
              <option value="cinema">Cinema</option>
              <option value="entertainment">Entertainment</option>
              <option value="weather">Weather</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formImg">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDetail">
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as="textarea"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      
      </Modal.Footer>
    </Modal>
  );
}

export default AddDataModal;