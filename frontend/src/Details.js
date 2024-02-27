import React from 'react';
import { useLocation } from 'react-router-dom';
import './auth.css';

const Details = () => {
    const location = useLocation();
    const userDetails = location.state?.userDetails;

    // Ensure userDetails is not null or undefined before accessing its properties
    if (!userDetails) {
        return <div>User details not found!</div>;
    }

    return (
        <div className='card-3d-wrap'>
            <div className='card-front '>
                <div className='center-wrap center'> 
                <span class="material-symbols-outlined big">account_circle</span>
                <h4 className="heading">  User Details</h4>
                <div className='align'>
                <p><span class="material-symbols-outlined small">person</span> <span className='sub'>Full Name:</span> <span className='detail'>{userDetails.FullName}</span></p>
                <p><span class="material-symbols-outlined small">mail</span> <span className='sub'>Email:</span>  <span className='detail'>{userDetails.Email}</span></p>
                </div>
                
                </div>
           
            </div>
        </div>
    );
};

export default Details;
