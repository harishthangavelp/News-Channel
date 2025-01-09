import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import '../User/Login.css';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [formData, setFormData] = useState({
        myname: '',
        myno: '',
        username: '',
        cty: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalColor, setModalColor] = useState('#808080');
    
    const navigate = useNavigate();

    useEffect(() => {
        // Load data from localStorage (or an API in a real app)
        setFormData({
            myname: localStorage.getItem('myname') || '',
            myno: localStorage.getItem('myno') || '',
            username: localStorage.getItem('username') || '',
            cty: localStorage.getItem('cty') || '',
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setModalMessage("Passwords do not match!");
            setModalColor('#808080');
            setShowModal(true);
            return;
        }

        // Save the updated data to localStorage (In real apps, use backend)
        localStorage.setItem("myname", formData.myname);
        localStorage.setItem("myno", formData.myno);
        localStorage.setItem("username", formData.username);
        localStorage.setItem("cty", formData.cty);

        setModalMessage("Profile updated successfully!");
        setModalColor('#808080');
        setShowModal(true);

        setTimeout(() => {
            navigate('/'); // Navigate to home or profile page after updating
        }, 1000);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="auth-containerl">
                <div className="form-wrapperl">
                    <h2 className="h2l">Edit Profile</h2>
                    <form className="forml" onSubmit={handleUpdateProfile}>
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
                            <label className="labell">Your Phone Number:</label>
                            <input
                                type="text"
                                className="inputl"
                                name="myno"
                                value={formData.myno}
                                onChange={handleInputChange}
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
                            <label className="labell">City:</label>
                            <input
                                type="text"
                                className="inputl"
                                name="cty"
                                value={formData.cty}
                                onChange={handleInputChange}
                                
                            />
                        </div>
                       
                        <button type="submit" className="submit-btnl">Update Profile</button>
                    </form>
                    <div className="back-to-login">
                        <Link to="/login" className="back-btnl">Go back to Login</Link>
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

export default Profile;