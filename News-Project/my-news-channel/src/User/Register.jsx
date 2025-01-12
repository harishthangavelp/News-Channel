import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Spinner } from 'react-bootstrap';
import '../User/Login.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        myname: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalColor, setModalColor] = useState('#808080');
    const [isLoading, setIsLoading] = useState(false);  // State for spinner
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Show spinner

        if (formData.password !== formData.confirmPassword) {
            setModalMessage("Passwords do not match!");
            setModalColor('#ff0000'); // Error
            setShowModal(true);
            setIsLoading(false); // Hide spinner
            return;
        }
    
        try {
            // Send data to backend
            const response = await fetch("https://news-channel-14.onrender.com/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    myname: formData.myname,
                    username: formData.username,
                    password: formData.password,  // Make sure password is also saved on the backend
                }),
            });
    
            if (response.ok) {
                localStorage.setItem("username", formData.username);  // Store username
                localStorage.setItem("password", formData.password);  // Store password
                setModalMessage("Registration successful!");
                setModalColor('#808080'); // Success
                setShowModal(true);
    
                setTimeout(() => {
                    navigate('/login'); // Navigate to Login page after registration
                }, 1000);
            } else {
                const error = await response.text();
                setModalMessage(`Registration failed: ${error}`);
                setModalColor('#ff0000'); // Error
                setShowModal(true);
            }
        } catch (error) {
            setModalMessage(`Error: ${error.message}`);
            setModalColor('#ff0000'); // Error
            setShowModal(true);
        }
        setIsLoading(false); // Hide spinner after processing
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="auth-containerl">
                <div className="form-wrapperl">
                    <h2 className="h2l">Register</h2>
                    <form className="forml" onSubmit={handleRegister}>
                        <div className="input-groupl">
                            <label className="labell">Your Name:</label>
                            <input
                                type="text"
                                className="inputl"
                                name="myname"
                                value={formData.myname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-groupl">
                            <label className="labell">Username:</label>
                            <input
                                type="email"
                                className="inputl"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-groupl">
                            <label className="labell">Password:</label>
                            <input
                                type="password"
                                className="inputl"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-groupl">
                            <label className="labell">Confirm Password:</label>
                            <input
                                type="password"
                                className="inputl"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btnl">
                            {isLoading ? (
                                <Spinner animation="border" role="status" variant="light" style={{ color: '#d4af37' }} />
                            ) : (
                                'Register'
                            )}
                        </button>
                    </form>
                    <div className="back-to-login">
                        <Link to="/login" className="back-btnl">Already have an account? Log in</Link>
                    </div>
                </div>
                
                <Modal show={showModal} onHide={handleCloseModal} centered className="pink-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: modalColor, color: '#fce4ec' }}>
                        <h4>{modalMessage}</h4>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default Register;
