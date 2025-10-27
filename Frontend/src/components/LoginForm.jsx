import React, { useState } from 'react';
import accountService from '../services/accountService';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await accountService.login(form);
      if (res.data === "Đăng nhập thành công!") {
        setMessage('Đăng nhập thành công!');
      } else {
        setMessage('Đăng nhập thất bại!');
      }
    } catch (err) {
      setMessage('Đăng nhập thất bại!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} />
      <button type="submit">Đăng nhập</button>
      <div>{message}</div>
    </form>
  );
} 