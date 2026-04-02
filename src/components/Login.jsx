import React, { useState } from 'react';

const SignIn = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSignIn = (e) => {
        e.preventDefault();
        let users = [];

        try {
            const savedData = localStorage.getItem('users');
            users = savedData ? JSON.parse(savedData) : [];
            if (!Array.isArray(users)) users = [];
        } catch (error) {
            alert("Error reading user data. Please clear your browser cache.");
            return;
        }

        const user = users.find(
            (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
            onLoginSuccess(user);
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <form onSubmit={handleSignIn} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Sign In</h3>
            <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={handleChange} required />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        </form>
    );
};

export default SignIn;