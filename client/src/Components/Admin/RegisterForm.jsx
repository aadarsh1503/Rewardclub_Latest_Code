import React from 'react'
import { useState, useEffect } from 'react';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Swal from 'sweetalert2';
import LoadingButton from '../Main/LoadingButton';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function RegisterForm({ onSwitchForm }) {

  const [submitButFlag, setSubmitButFlag] = useState(false)
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState(2);
  const [erroeMessage, setErroeMessage] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    user_type: 2
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, user_type: userType }));
  }, [userType]);

  const handleChange = (e) => {
    setErroeMessage("");
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email, password } = formData;
    if (!name || !phone || !email || !password) {
      setErroeMessage("Please fill all fields.");
      return;
    }

    try {
      setSubmitButFlag(true);

      const res = await fetch(`${baseUrl}/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error && data.error.length > 0) {
        setErroeMessage(data.error[0].message);
        return;
      }

      // Registration succeeded
      const user = data.result.data;

      const emailRes = await fetch(`${baseUrl}/admin/send-email-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          email: user.email,
          user_type: user.user_type
        }),
      });

      const emailData = await emailRes.json();

      if (emailData.error && emailData.error.length > 0) {
        setErroeMessage(emailData.error[0].message);
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Verification Email Sent!',
        text: 'Please check your inbox to verify your email.',
        confirmButtonText: 'LOGIN',
      }).then(() => {
        onSwitchForm(0);
      });

    } catch (err) {
      console.error(err);
      setErroeMessage("Network error. Try again.");
    } finally {
      setSubmitButFlag(false);
    }
  };

  return (
    <div className='reg-form-view'>
      <div className='swtch-div-view'>
        <div className={userType === 2 ? 'swtch-div-view-tab-selected' : 'swtch-div-view-tab'}
          onClick={() => setUserType(2)}>Member</div>

        <div className={userType === 3 ? 'swtch-div-view-tab-selected' : 'swtch-div-view-tab'}
          onClick={() => setUserType(3)}>Vendor</div>
      </div>

      <p className='p-reg-title'>Create a new account</p>
      <p className='p-reg-sub-title'>Sign up and earn points and rewards</p>

      <div className='input-div-view'>
        <input type="text" placeholder="Full Name" name="name" onChange={handleChange} />
      </div>

      <div className='input-div-view'>
        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
      </div>

      <div className='input-div-view'>
        <input type="text" placeholder="Phone" name="phone" onChange={handleChange} />
      </div>

      <div className='input-div-view-pwd'>
        <input type={show ? 'text' : 'password'} placeholder="Password" name="password" onChange={handleChange} />
        <span className="eye-icon" onClick={() => setShow(!show)}>
          {show ? <LuEyeClosed /> : <LuEye />}
        </span>
      </div>

      <div style={{ margin: '10px' }}></div>

      <LoadingButton onClick={handleSubmit} isLoading={submitButFlag} text={"Submit"} />

      <button className='button-reg-click-title' onClick={() => onSwitchForm(0)}>
        Have an account? Sign In
      </button>

      {erroeMessage && <p className='p-reg-click-title'>{erroeMessage}</p>}
    </div>
  )
}

export default RegisterForm
