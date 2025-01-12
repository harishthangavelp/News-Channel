import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Spinner } from 'react-bootstrap';
import '../User/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        myname: '',
        username: '',
        password: '',
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

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true); // Show spinner

        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        // Simulate a delay for login validation
        setTimeout(() => {
            // Check for specific username and password for redirect to myuserdata
            if (formData.username === "havelnews@gmail.com" && formData.password === "1amHaVel@2025") {
                setModalMessage("Login successful!");
                setModalColor('#808080'); // Success
                setShowModal(true);

                // Open myuserdata in a new tab
                setTimeout(() => {
                    // navigate('/')
                    
                    // window.open('/myuserdata', '_blank'); // Open in new tab
                   navigate('/')
                    // navigate('/myuserdata','_blank')
                    
                    localStorage.setItem("loggedIn", true);
                localStorage.setItem("loginTime", Date.now());
                localStorage.setItem("myname", formData.myname);
                }, 1000);
            } else if (formData.username === storedUsername && formData.password === storedPassword) {
                setModalMessage("Login successful!");
                setModalColor('#808080'); // Success
                setShowModal(true);

                // Store the username or myname in localStorage to use it in Data.jsx
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("loginTime", Date.now());
                localStorage.setItem("myname", formData.myname);

                setTimeout(() => {
                    navigate('/'); // Redirect to home page (Data.jsx)
                }, 1000);
            } else {
                setModalMessage("Invalid username or password!");
                setModalColor('#808080'); // Error
                setShowModal(true);
            }
            setIsLoading(false); // Hide spinner after processing
        }, 2000); // Simulate a 2-second delay
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="auth-containerl">
                <div className="form-wrapperl">
                    <h2 className="h2l">Login</h2>
                    <form className="forml" onSubmit={handleLogin}>
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
                        <button type="submit" className="submit-btnl">
                            {isLoading ? (
                                <Spinner animation="border" role="status" variant="light" style={{ color: '#d4af37' }} />
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                    <div className="back-to-register">
                        <Link to="/register" className="back-btnl">Don't have an account? Register</Link>
                    </div>
                </div>
                
                <Modal show={showModal} onHide={handleCloseModal} centered >
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

export default Login;
