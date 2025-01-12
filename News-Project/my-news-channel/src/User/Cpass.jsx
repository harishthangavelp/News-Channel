import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import '../User/Cpass.css';
import { Link } from 'react-router-dom';

const Cpass = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalColor, setModalColor] = useState('#808080');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
    
        const storedPassword = localStorage.getItem("password");
    
        if (formData.oldPassword !== storedPassword) {
            setModalMessage("Old password is incorrect!");
            setModalColor('#808080');
            setShowModal(true);
        } else if (formData.newPassword !== formData.confirmPassword) {
            setModalMessage("New password and confirm password do not match!");
            setModalColor('#808080');
            setShowModal(true);
        } else {
            // Update the password in localStorage
            localStorage.setItem("password", formData.newPassword);
            setModalMessage("Password changed successfully!");
            setModalColor('#808080');
            setShowModal(true);
    
            // Log out the user (clear session data)
            localStorage.removeItem("user");  // Assuming "user" stores user data like authentication info
            localStorage.removeItem("token"); // If you have a token for authentication, clear it
    
            // Redirect to the login page
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    };
    
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="auth-containerc">
                <div className="form-wrapperc">
                    <h2 className="h2c">Change Password</h2>
                    <form className="formc" onSubmit={handleChangePassword}>
                        <div className="input-groupc">
                            <label className="labelc">Old Password:</label>
                            <input
                                type="password"
                                className="inputc"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-groupc">
                            <label className="labelc">New Password:</label>
                            <input
                                type="password"
                                className="inputc"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-groupc">
                            <label className="labelc">Confirm Password:</label>
                            <input
                                type="password"
                                className="inputc"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btnc">Change Password</button>
                    </form>
                    <div className="back-to-home">
                        <Link to="/" className="back-btnc">Back to Home</Link>
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

export default Cpass;
