import React from 'react'
import '/src/App.css'
import { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from 'react-router-dom'
import LoadingButton from '../Main/LoadingButton';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function LoginForm({ onSwitchForm, setEmailId }) {

  const [submitButFlag, setSubmitButFlag] = useState(false)
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [erroeMessage, setErroeMessage] = useState("");

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setErroeMessage("");
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setEmailId(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setErroeMessage("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitButFlag(true);

      const res = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // ❌ Error from backend
      if (data.error && data.error.length > 0) {
        setErroeMessage(data.error[0].message);
        return;
      }

      // ✔ Successful login
      const token = data.result.token;
      const user = data.result.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userType", user.user_type);

      switch (user.user_type) {
        case 1:
          navigate("/admin-dashboard");
          break;
        case 2:
          navigate("/member-dashboard");
          break;
        case 3:
          navigate("/vendor-dashboard");
          break;
        default:
          navigate("/login");
      }

    } catch (err) {
      console.log(err);
      setErroeMessage("Network error. Please try again.");
    } finally {
      setSubmitButFlag(false);
    }
  };

  return (
    <div className='reg-form-view'>
      <p className='p-reg-title'>Sign In</p>
      <p className='p-reg-sub-title'>Sign In and earn points and rewards</p>

      <div className='input-div-view'>
        <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
      </div>

      <div className='input-div-view-pwd'>
        <input type={show ? 'text' : 'password'} placeholder="Password" name="password" onChange={handleChange} required />
        <span className="eye-icon" onClick={() => setShow(!show)}>
          {show ? <LuEyeClosed /> : <LuEye />}
        </span>
      </div>

      <div style={{ margin: '10px' }}></div>

      <LoadingButton onClick={handleSubmit} isLoading={submitButFlag} text={"Submit"} />

      <button className='button-reg-click-title' onClick={() => onSwitchForm(1)}>Do you want to create a new account?</button>

      <button className='button-reg-click-title' onClick={() => { setEmailId(formData.email); setTimeout(() => { onSwitchForm(2); }, 0); }}>Forgot password?</button>

      <div className='p-reg-click-title'>{erroeMessage}</div>
    </div>
  )
}
