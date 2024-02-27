import React, { useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();

        const data = {
            FullName: fullName,
            Email: email,
            Password: password
        }

        const url = 'https://localhost:44308/api/Signup';

        try {
            const response = await axios.post(url, data);

            console.log('Response:', response.data);

            alert('User added Succesfully');

        } catch (error) {
            console.error('Error:', error);
            alert(error);
        }

    };

    const handleSignInSubmit = async (event) => {
        event.preventDefault();

        const data = {
            Email: email,
            Password: password
        }

        const url = 'https://localhost:44308/api/Signin';

        try {
            const response = await axios.post(url, data);

            console.log('Response:', response.data.UserDetails);

            alert(response.data.Message);

            // Check if the response is successful and contains user details
            if (response.data.Message === "User is valid" && response.data.UserDetails) {
                // Navigate to the Details component with user details
                navigate('/details', { state: { userDetails: response.data.UserDetails } });
            }

        } catch (error) {
            console.error('Error:', error);
            alert(error);
        }


    };

    return (
        <div className="form">
            <div className="text-center">
                <h6>
                    <span onClick={() => setIsSignUp(false)}>Log In</span>{' '}
                    <span onClick={() => setIsSignUp(true)}>Sign Up</span>
                </h6>
                <input type="checkbox" className="checkbox" id="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap">
                    <div className="card-3d-wrapper">
                        {/* card front */}
                        <div className={`card-front ${isSignUp ? 'hidden' : ''}`}>
                            <form className="center-wrap" onSubmit={handleSignInSubmit}>
                                <h4 className="heading">Log In</h4>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-style"
                                        placeholder="Your Email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <i className="input-icon material-icons">alternate_email</i>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-style"
                                        placeholder="Your Password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <i className="input-icon material-icons">lock</i>
                                </div>
                                <button type="submit" className="btn">submit</button>
                            </form>
                        </div>
                        {/* card back */}
                        <div className={`card-back ${!isSignUp ? 'hidden' : ''}`}>
                            <form className="center-wrap" onSubmit={handleSignUpSubmit}>
                                <h4 className="heading">Sign Up</h4>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-style"
                                        placeholder="Your Full Name"
                                        value={fullName}
                                        required
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                    <i className="input-icon material-icons">perm_identity</i>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-style"
                                        placeholder="Your Email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <i className="input-icon material-icons">alternate_email</i>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-style"
                                        placeholder="Your Password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <i className="input-icon material-icons">lock</i>
                                </div>
                                <button type="submit" className="btn">submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
