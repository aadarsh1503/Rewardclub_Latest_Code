import React,{useState,useEffect} from 'react'
import DashboardBox from '../../Components/Main/DashboardBox'
import TitleView from '../../Components/Main/TitleView'
import TextView from '../../Components/Main/TextView'
import InputText from '../../Components/Main/InputText'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Dropdown from '../../Components/Main/Dropdown'
import ImageUploadPopup from '../../Components/Main/ImageUploadPopup'
import apiClient from '../../utils/ApiClient';
import RoundButtonText from '../../Components/Main/RoundButtonText'
import { faSave, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MemberProfile.css';

const baseUrl = import.meta.env.VITE_API_BASE_IMG_URL;

function MemberProfile() {

    const [show, setShow] = useState(false);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        dob: "",
        gender: "",
        address:"",
        job: "",
        ac_no:"",
        iban_no:"",
        bank_name:"",
        profile_img:""
    });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

     const genderArray =[
        {
            id: 0,
            name: "Male",
        },
        {
            id: 1,
            name: "Femal",
        }
    ];

    useEffect(() => {
        fetchProfile();
    },[]);


    ///API CALLING
    const fetchProfile = async () => {
        //setLoading(true);
        try {
        const response = await apiClient.get("/member/get_profile");
        if (response?.result?.status === 1) {
            console.warn("Get Transaction successfully");
            setFormData(response.result.data);
            //setProfile(response.result.data);

        } else {
            console.warn("No Transaction found or status != 1");
        }
        } catch (error) {
        console.error("Failed to fetch Transaction:", error);
        } finally {
        //setLoading(false);
        }
    };

    const saveProfile = async () => {
        setSaving(true);
        try {
            const data = await apiClient.post("/member/update_profile", formData);

            if (data?.result?.status === 1) {
                showToast('Profile saved successfully! ✓', 'success');
            } else {
                showToast('Failed to save profile', 'error');
            }
        } catch (err) {
            console.error("Something went wrong saving profile", err);
            showToast('Error saving profile. Please try again.', 'error');
        }
        finally {
            setSaving(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleGenderChange = (e) => {
        setFormData(prev => ({
            ...prev,
            gender: e.target.value
        }));
        console.log("Selected Status ID:", e.target.value);
    };

    const handleimageChange = () => {
        setShowImagePopup(false);
        fetchProfile();
        showToast('Profile image updated! ✓', 'success');
    };

    const handleSaveButton = () => {
        console.log("SAVE BUTTON ACTION");
        saveProfile();
    };

   
  return (
    <div className='content-view'>
        {/* Toast Notification */}
        {toast.show && (
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '14px 24px',
                borderRadius: '12px',
                background: toast.type === 'success' 
                    ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' 
                    : 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                zIndex: 9999,
                animation: 'slideIn 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                {toast.message}
            </div>
        )}

        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom:'15px',
            width:'100%'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TitleView text={"Profile"} />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(248, 211, 7, 0.15)',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#666'
                }}>
                    <FontAwesomeIcon icon={faPen} style={{ fontSize: '10px' }} />
                    <span>Click fields to edit</span>
                </div>
            </div>
            <button 
                onClick={handleSaveButton}
                disabled={saving}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: saving 
                        ? '#ccc' 
                        : 'linear-gradient(135deg, var(--highlight-color) 0%, #e6c200 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#222',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(248, 211, 7, 0.3)',
                    transition: 'all 0.3s ease'
                }}
            >
                <FontAwesomeIcon icon={faSave} />
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>

        <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row'
            }}>

                <div style={{
                  width: '20%',
                  height: '100%',
                  backgroundColor: '#00000', 
                  display: 'flex',
                  flexDirection: 'column'
                    }}>

                    {/* Profile image view box    */}
                    <div style={{
                    boxSizing: 'border-box',
                    padding: '2px',
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    }}>
                      <DashboardBox>
                        {formData?.profile_img ? (
                          <>
                            <div className="profile-image-container" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowImagePopup(true)}>
                              <img className='img-profile-dash' src={baseUrl+formData?.profile_img} alt="Profile" />
                              <div className="profile-overlay" style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '8px'
                              }}>
                                <button style={{
                                  backgroundColor: 'var(--highlight-color)',
                                  color: '#222',
                                  border: 'none',
                                  padding: '10px 20px',
                                  borderRadius: '8px',
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}>
                                  📷 Change Photo
                                </button>
                              </div>
                            </div>
                            <div className="blur-box">
                                <div style={{padding:'10px'}}>
                                    <p className="title-text-light">{formData?.name}</p>
                                    <p className="sub-title-text-light">{formData?.email}</p>
                                </div>
                            </div>
                          </>
                        ) : (
                          <div 
                            onClick={() => setShowImagePopup(true)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                              width: '100%',
                              cursor: 'pointer',
                              gap: '16px',
                              background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)',
                              borderRadius: '16px',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <div style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, var(--highlight-color) 0%, #e6c200 100%)',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              boxShadow: '0 8px 24px rgba(248, 211, 7, 0.3)'
                            }}>
                              <span style={{ fontSize: '32px' }}>📷</span>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ 
                                margin: '0 0 4px', 
                                fontSize: '16px', 
                                fontWeight: '600', 
                                color: '#333' 
                              }}>Add Profile Photo</p>
                              <p style={{ 
                                margin: 0, 
                                fontSize: '12px', 
                                color: '#888' 
                              }}>Click to upload your photo</p>
                            </div>
                          </div>
                        )}
                      </DashboardBox>
                   </div>

                    {/* QR Code view box    */}
                    <div style={{
                    boxSizing: 'border-box',
                    padding: '2px',
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    }}>
                      <DashboardBox>
                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
                           
                        </div>
                      </DashboardBox>
                    </div>
                </div>

                <div style={{
                    boxSizing: 'border-box',
                    padding: '2px',
                    width: '40%',
                    height: '100%',
                    display: 'flex',
                    }}>
                        <DashboardBox>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
                                <TextView type='darkBold' text={"Personal Details"}/>
                            </div>

                            <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', padding: '10px', marginLeft: '10px', marginRight: '10px', gap:'15px' }}>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"DOB"}/>
                                    <InputText
                                        type="name"
                                        placeholder="Date of Birth"
                                        name="dob"
                                        value={new Date(formData?.dob ? formData?.dob : "1994-09-03T21:00:00.000Z" ).toISOString().slice(0, 10)}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Gender"}/>
                                     <Dropdown
                                        data={genderArray}
                                        selectedItem={formData.gender}
                                        onChange={handleGenderChange}
                                        firstItem="Select Status"
                                    />
                                </div>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Job"}/>
                                    <InputText
                                        type="name"
                                        placeholder="Job"
                                        name="job"
                                        value={formData.job}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Address"}/>
                                    <InputText
                                        type="address"
                                        placeholder="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>


                            </div>
                        </DashboardBox>
                </div>


                <div style={{
                  boxSizing: 'border-box',
                  padding: '0px',
                  width: '40%',
                  height: '100%',
                  display: 'flex',
                  flexDirection:'column',
                }}>

                    <div style={{
                    boxSizing: 'border-box',
                    padding: '2px',
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    flexDirection:'column',
                    }}>

                        <DashboardBox>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
                                <TextView type='darkBold' text={"Basic Details"}/>
                            </div>

                            <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', padding: '10px', marginLeft: '10px', marginRight: '10px', gap:'15px' }}>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Name"}/>
                                    <InputText
                                        type="name"
                                        placeholder="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Phone"}/>
                                    <InputText
                                        type="phone"
                                        placeholder="Phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Password"}/>
                                    <div className='input-div-view-pwd' style={{padding:'0px',margin:'0px'}}>
                                        <input  type={show ? 'text' : 'password'} placeholder="Password" name="password"   onChange={handleChange} required  value={formData.password} />
                                        <span className="eye-icon" onClick={() => setShow(!show)}>
                                        {show ? <LuEyeClosed /> : <LuEye />}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            
                        </DashboardBox>
                    </div>


                    <div style={{
                    boxSizing: 'border-box',
                    padding: '2px',
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    flexDirection:'column',
                    }}>

                        <DashboardBox>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginLeft: '10px', marginRight: '10px' }}>
                                <TextView type='darkBold' text={"Bank Details"}/>
                            </div>

                            <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', padding: '10px', marginLeft: '10px', marginRight: '10px', gap:'15px' }}>

                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Account Number"}/>
                                    <InputText
                                    type="text"
                                    placeholder="Account Number"
                                    name="ac_no"
                                    value={formData.ac_no}
                                    onChange={handleChange}
                                />
                                </div>
                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"IBAN Number"}/>
                                    <InputText
                                    type="text"
                                    placeholder="IBAN Number"
                                    name="iban_no"
                                    value={formData.iban_no}
                                    onChange={handleChange}
                                />
                                </div>
                                <div style={{width:'100%'}}>
                                    <TextView type='subDark' text={"Bank Name"}/>
                                    <InputText
                                    type="text"
                                    placeholder="Bank Name"
                                    name="bank_name"
                                    value={formData.bank_name}
                                    onChange={handleChange}
                                />
                                </div>
                            </div>
                        </DashboardBox>
                    </div>
                </div>
        </div>
        {showImagePopup && (
            <ImageUploadPopup onClose={() => handleimageChange() } userType={"member"}/>
        )}
    </div>
  )
}

export default MemberProfile
