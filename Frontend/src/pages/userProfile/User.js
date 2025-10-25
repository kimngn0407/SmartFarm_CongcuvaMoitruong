import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';

const UserProfile = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });

    useEffect(() => {
        authService.getProfile()
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    const handleUpdate = () => {
        authService.updateProfile(profile)
            .then(() => alert('Cập nhật thành công!'))
            .catch(error => console.error('Error updating profile:', error));
    };

    return (
        <div>
            <h1>User Profile</h1>
            <input
                type="text"
                placeholder="Tên"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <button onClick={handleUpdate}>Cập nhật</button>
        </div>
    );
};

export default UserProfile;
