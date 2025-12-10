import React, { useState } from 'react';
import apiClient from '../../utils/ApiClient';
import Swal from 'sweetalert2';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import '/src/App.css';
import LoadingButton from '../Main/LoadingButton';

function ResetPassword({ onSwitchForm }) {

  const [erroeMessage, setErroeMessage] = useState("");
  const [show, setShow] = useState(false);
  const [submitButFlag, setSubmitButFlag] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setErroeMessage("");
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      Swal.fire({ icon: "warning", title: "Missing Fields", text: "Please fill all fields." });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "warning", title: "Wrong", text: "Passwords do not match." });
      return;
    }

    try {
      setSubmitButFlag(true);

      const response = await apiClient.post("/admin/reset_password", { password });

      // ❌ Backend error
      if (response.error && response.error.length > 0) {
        setErroeMessage(response.error[0].message);
        return;
      }

      // ✔ Success
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password has been reset successfully.",
        confirmButtonText: "LOGIN",
      }).then(() => onSwitchForm(0));

    } catch (error) {
      console.error(error);
      setErroeMessage("Network error. Try again.");
    } finally {
      setSubmitButFlag(false);
    }
  };

  return (
    <div className='reg-form-view'>
      <p className='p-reg-title'>Change Your Password</p>
      <p className='p-reg-sub-title'>Change your password and Enjoy the System</p>

      <div className='input-div-view-pwd'>
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <span className="eye-icon" onClick={() => setShow(!show)}>
          {show ? <LuEyeClosed /> : <LuEye />}
        </span>
      </div>

      <div className='input-div-view-pwd'>
        <input
          type={show ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <span className="eye-icon" onClick={() => setShow(!show)}>
          {show ? <LuEyeClosed /> : <LuEye />}
        </span>
      </div>

      <LoadingButton onClick={handleSubmit} isLoading={submitButFlag} text={"Submit"} />

      <div className='p-reg-click-title'>{erroeMessage}</div>
    </div>
  );
}

export default ResetPassword;
