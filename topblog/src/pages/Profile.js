// Profile.js
import React, { useContext } from 'react';
import { UserContext } from '../App';

const Profile = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h2>Profile Page</h2>
            {user ? (
                <>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Profile;
