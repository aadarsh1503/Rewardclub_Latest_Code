import '/src/App.css'
import React, { useState, useEffect } from "react";
import apiClient from '../../utils/ApiClient';
import Swal from 'sweetalert2';
import LoadingButton from '../Main/LoadingButton';

function ForgotPassword({ email, onSwitchForm }) {

  const [erroeMessage, setErroeMessage] = useState("");
  const [submitButFlag, setSubmitButFlag] = useState(false);

  const [formData, setFormData] = useState({ email: email || "" });

  useEffect(() => {
    setFormData({ email: email || "" });
  }, [email]);

  const handleChange = (e) => {
    setErroeMessage("");
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formData;
    if (!email) {
      setErroeMessage("Please enter your email.");
      return;
    }

    try {
      setSubmitButFlag(true);

      const payload = { email };
      const response = await apiClient.post("/admin/send_email_reset_password", payload);

      // ❌ Backend returned an error
      if (response.error && response.error.length > 0) {
        setErroeMessage(response.error[0].message);
        return;
      }

      // ✔ Success
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Password reset link has been sent to your email.",
        confirmButtonText: "LOGIN",
      }).then(() => onSwitchForm(0));
      
    } catch (error) {
      console.error(error);
      setErroeMessage("Network error. Please try again.");
    } finally {
      setSubmitButFlag(false);
    }
  };

  return (
    <div className='reg-form-view'>
      <p className='p-reg-title'>Forgot Password</p>
      <p className='p-reg-sub-title'>Change your password and Enjoy the System</p>

      <div className='input-div-view'>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <LoadingButton onClick={handleSubmit} isLoading={submitButFlag} text={"Submit"} />

      <button className='button-reg-click-title' onClick={() => onSwitchForm(0)}>
        Do you want to sign in?
      </button>

      <div className='p-reg-click-title'>{erroeMessage}</div>
    </div>
  );
}

export default ForgotPassword;
