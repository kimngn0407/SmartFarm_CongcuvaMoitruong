import React, { useState } from 'react';
import { register } from '../services/authService';

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'FARMER'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setMessage('Đăng ký thành công!');
    } catch (err) {
      setMessage('Đăng ký thất bại!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Họ tên" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} />
      <button type="submit">Đăng ký</button>
      <div>{message}</div>
    </form>
  );
} 