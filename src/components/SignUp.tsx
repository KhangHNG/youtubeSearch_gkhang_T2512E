import { useState } from 'react';

const SignUp = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSignUp = (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = [];
        try {
            const savedData = localStorage.getItem('users');
            // Only parse if there's actually data there
            users = savedData ? JSON.parse(savedData) : [];

            // Safety check: if parsed data isn't an array, reset it
            if (!Array.isArray(users)) users = [];
        } catch (error) {
            console.error("Corrupted local storage found. Resetting user list.");
            users = [];
        }

        if (users.find(u => u.email === email)) {
            alert("A user with this email already exists.");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Sign up successful!");
        onSuccess();
    };
    return (
        <form onSubmit={handleSignUp} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Create Account</h3>
            <input name="username" placeholder="Username" className="w-full border p-2 rounded" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={handleChange} required />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full border p-2 rounded" onChange={handleChange} required />
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Register</button>
        </form>
    );
};

export default SignUp;