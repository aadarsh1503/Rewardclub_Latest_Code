import React, {useState,useEffect} from 'react'
import RoundButton from '../../Components/Main/RoundButton';
import { faPlus,faPaperclip,faPen,faToggleOn,faToggleOff } from '@fortawesome/free-solid-svg-icons';
import TitleView from '../../Components/Main/TitleView';
import apiClient from '../../utils/ApiClient';
import DashboardBox from '../../Components/Main/DashboardBox';
import TextView from '../../Components/Main/TextView';
import RightSidePopup from '../../Components/Main/RightSidePopup';
import InputText from '../../Components/Main/InputText';
import RoundButtonText from '../../Components/Main/RoundButtonText';
import ImageUploadPopupCommon from '../../Components/Main/ImageUploadPopupCommon';
import CommonButton from '../../Components/Main/CommonButton';
import LoadingButton from '../../Components/Main/LoadingButton';
import CommonDatePicker from '../../Components/Main/CommonDatePicker';
import { dateConvert } from '../../utils/dateConvert';

const baseUrl = import.meta.env.VITE_API_BASE_IMG_URL;


function OffersVendor() {

  const [loading, setLoading] = useState(true);
    const [detailPage, setDetailPage] = useState(false);
    const [selectedPosOffer, setselectedPosOffer] = useState();
    const [selectedOffer, setSelectedOffer] = useState({});
    const [offers, setOffers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [imageUploadType, setImageUploadType] = useState(0);
    const [submitButFlag, setSubmitButFlag] = useState(false);
    const [imageUploadStatus, setImageUploadStatus] = useState("Product Image");
    const [productImage, setProductImage] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [startDateSelected, setStartDateSelected] = useState(new Date());
    const [endDateSelected, setEndDateSelected] = useState(new Date());
    

    
    const [formData, setFormData] = useState({
        search: "",

        title: "",
        description: "",
        discount: "",
        discount_code: "",
    });

    const [formDataEdit, setFormDataEdit] = useState({
        title: "",
        description: "",
        discount: "",
        discount_code: "",
    });


    const handleProductListClick = (index) => {

      console.log("Clicked index:", index);
      if (selectedPosOffer == index )
      {
        setDetailPage(false)
        setselectedPosOffer()
      }
      else
      {
        setFormDataEdit(offers[index]);
        setselectedPosOffer(index)
        setSelectedOffer(offers[index])
        setStartDateSelected(offers[index].start_date)
        setEndDateSelected(offers[index].end_date)
        setDetailPage(true)
      }
    };

    const handleImageButton = () => {
        setImageUploadType(0)
        setShowImagePopup(true)
        
    };

    const handleSubmitEdit = () => {
        updateOfferDetails()
    };

    const handleimageChange = () => {
        setShowImagePopup(false)
    };

    const handleEditProdImage = () => {
        console.log("EDIT IMAGE BUTTON ACTION")
        setImageUploadType(1)
        setShowImagePopup(true)
    };

    const handleChangeProdStatus = () => {
        console.log("SAVE BUTTON ACTION")
        console.log(selectedOffer?.status)
        if(selectedOffer?.status == 1)
        {
            updateOfferStatus(0)
        }
        else
        {
            updateOfferStatus(1)
        }  
    };

    

    const handleImageUploaded = (data) => {
        if (imageUploadType==0)
        {
            setShowImagePopup(false)
            setImageUploadStatus("Product Image Uploaded ✅")
            setProductImage(data);
        }
        else
        {
            updateOfferImage(data)
            setShowImagePopup(false)
        }
    };

    const onDeleteProduct = () => {
        console.log("SAVE BUTTON ACTION")
        deleteOffer()
    };

    useEffect(() => {
        fetchOffers();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setFormDataEdit(prev => ({
            ...prev,
            [name]: value,
        }));
    };

     ///API CALLING
    const fetchOffers = async () => {
        setLoading(true);
        try {
        const response = await apiClient.get("/vendor/get_offers");
        if (response?.result?.status === 1) 
        {
            console.warn("Get Offer successfully");
            setOffers(response.result.data);
            if(detailPage)
            {
                setFormDataEdit(response.result.data[selectedPosOffer]);
                setSelectedOffer(response.result.data[selectedPosOffer])
            }
        } 
        else {
            console.warn("No Transaction found or status != 1");
        }
        } catch (error) {
        console.error("Failed to fetch Transaction:", error);
        } finally {
        setLoading(false);
        }
    };

    const addOffer = async () => {

      console.log(dateConvert(startDate))

        //setisLoading(true); // Show loader
        try {

            const payload = {
            title: formData.title,
            description: formData.description,
            discount: formData.discount,
            discount_code: formData.discount_code,
            image: productImage,
            start_date: dateConvert(startDate),
            end_date: dateConvert(endDate) 
            };

            console.log("SANTHOSH Vendor ID:", payload);
            const data = await apiClient.post("/vendor/add_offers", payload);

            //if (data && data.result?.data.status === 1) {
            if (data?.result?.status === 1) {
                //setVendors(data.result.data);
                setShowPopup(false)
                fetchOffers();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };


    const updateOfferStatus = async (status) => {
        //setisLoading(true); // Show loader
        console.log(status)
        try {

            const payload = {
                id: selectedOffer?.id,
                status: status
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/update_offer_status", payload);

            //if (data && data.result?.data.status === 1) {
            if (data?.result?.status === 1) {
                //setVendors(data.result.data);
                ///setShowPopup(false)
                fetchOffers();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };

    const updateOfferImage = async (image) => {
        //setisLoading(true); // Show loader
        try {
            const payload = {
                id: selectedOffer?.id,
                image: image
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/update_offer_image", payload);

            if (data?.result?.status === 1) {
                fetchOffers();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };

    const deleteOffer = async () => {
        //setisLoading(true); // Show loader
        try {
            const payload = {
                id: selectedOffer?.id
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/delete_offer", payload);

            if (data?.result?.status === 1) {
                fetchOffers();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };


    const updateOfferDetails = async () => {
        setSubmitButFlag(true); // Show loader
        try {
            const payload = {
                id: selectedOffer?.id,
                title: formDataEdit.title,
                description: formDataEdit.description,
                discount: formDataEdit.discount,
                discount_code: formDataEdit.discount_code,
                start_date: dateConvert(startDateSelected),
                end_date: dateConvert(endDateSelected),
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/update_offer_details", payload);

            if (data?.result?.status === 1) {
                fetchOffers();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
             setSubmitButFlag(false); // Hide loader
        }
    };


    ////
    ///const items = Array.from({ length: 35 }, (_, i) => `Item ${i + 1}`);

  return (
        <div className='content-view'>
            <div style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                marginBottom:'10px',
                width:'100%'
                }}>
                <div>
                    <TitleView text={"Offers"} />
                </div>
                 <div style={{margin:'5px'}}/>
                <div style={{width:'80px'}}>
                    <RoundButton icon={faPlus} onClick={() => setShowPopup(true) }/>          
                </div>
                
            </div>

            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                gap: '16px'
                }}>


                    <div style={{
                    width: detailPage?'70%':'100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    transition: 'width 0.3s ease'
                        }}>
                            <div className="grid-container">
                                {loading ? (
                                <div className="loader-container">
                                    <div className="spinner" />
                                </div>
                                ) : (
                                    offers.map((proItems, index) => (
                                        <div key={index} style={{
                                            minHeight: '360px',
                                            width: '100%',
                                            maxWidth: '320px'
                                        }}>
                                            <div 
                                                onClick={() => handleProductListClick(index)}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '14px',
                                                    padding: '18px',
                                                    borderRadius: '24px',
                                                    position: 'relative',
                                                    height: '100%',
                                                    minHeight: '340px',
                                                    overflow: 'hidden',
                                                    background: selectedPosOffer === index 
                                                        ? 'linear-gradient(165deg, #fffef7 0%, #fff9e6 50%, #fff4cc 100%)'
                                                        : 'linear-gradient(165deg, #ffffff 0%, #f8f9fa 50%, #f0f2f5 100%)',
                                                    border: selectedPosOffer === index ? '3px solid #f8d307' : '2px solid transparent',
                                                    boxShadow: selectedPosOffer === index 
                                                        ? '0 16px 40px rgba(248, 211, 7, 0.35), 0 4px 12px rgba(0, 0, 0, 0.1)'
                                                        : '0 8px 24px rgba(0, 0, 0, 0.08)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            >
                                                {/* Top accent bar */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '5px',
                                                    background: 'linear-gradient(90deg, #ff6b6b 0%, #feca57 50%, #ff6b6b 100%)',
                                                    borderRadius: '24px 24px 0 0'
                                                }}></div>
                                                
                                                {/* Offer Image */}
                                                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px' }}>
                                                    <img 
                                                        src={proItems?.image ? baseUrl+proItems?.image : "/public/dummy.jpg"} 
                                                        alt={proItems?.title}
                                                        style={{
                                                            width: '100%',
                                                            height: '180px',
                                                            objectFit: 'cover',
                                                            borderRadius: '18px',
                                                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                                            transition: 'transform 0.4s ease'
                                                        }}
                                                    />
                                                    {/* Discount badge */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '12px',
                                                        right: '12px',
                                                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
                                                        padding: '8px 14px',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 4px 12px rgba(238, 90, 90, 0.4)'
                                                    }}>
                                                        <span style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>{proItems?.discount}% OFF</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Offer Info */}
                                                <div style={{ padding: '8px 4px', flex: 1 }}>
                                                    <h3 style={{ 
                                                        margin: '0 0 8px', 
                                                        fontSize: '17px', 
                                                        fontWeight: '700', 
                                                        color: '#1a1a2e',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>{proItems?.title}</h3>
                                                    <p style={{ 
                                                        margin: '0 0 12px', 
                                                        fontSize: '13px', 
                                                        color: '#666',
                                                        lineHeight: '1.4',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}>{proItems?.description}</p>
                                                    
                                                    {/* Discount code */}
                                                    <div style={{ 
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        gap: '8px',
                                                        padding: '10px 14px',
                                                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                                        borderRadius: '12px',
                                                        border: '2px dashed #dee2e6'
                                                    }}>
                                                        <span style={{ fontSize: '12px', color: '#666' }}>Code:</span>
                                                        <span style={{ 
                                                            fontSize: '14px', 
                                                            fontWeight: '700', 
                                                            color: '#1a1a2e',
                                                            letterSpacing: '1px'
                                                        }}>{proItems?.discount_code || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Disabled overlay */}
                                                {proItems?.status === 0 && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                        borderRadius: '24px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        zIndex: 5
                                                    }}>
                                                        <span style={{ 
                                                            background: '#ff5252', 
                                                            color: 'white', 
                                                            padding: '8px 20px', 
                                                            borderRadius: '20px',
                                                            fontWeight: '600',
                                                            fontSize: '14px'
                                                        }}>Disabled</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>


                    </div>

                    <div style={{
                    width: detailPage?'30%':'0%',
                    height: '100%',
                    display: detailPage ? 'flex' : 'none',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    minWidth: detailPage ? '280px' : '0'
                        }}>
                        <DashboardBox>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%',width:'100%' }}>
                                <div className="product-details-inside" style={{ padding: '20px', gap: '14px' }}>
                                    <div style={{position: 'relative', width:'200px', maxWidth:'500px',justifyContent:'center', alignItems:'center'}}>
                                        <img className="offer-image" src={selectedOffer?.image ? baseUrl+selectedOffer.image : "/public/dummy.jpg"} alt={selectedOffer.image} />

                                        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', zIndex: 1}}>
                                            <RoundButton icon={faPen} onClick={() => handleEditProdImage()} shadow={true} />
                                            <div style={{margin:'5px'}}/>
                                            <RoundButton icon={selectedOffer?.status===1?faToggleOn:faToggleOff} iconColor= "white" onClick={() => handleChangeProdStatus()} shadow={true} style={{backgroundColor: selectedOffer?.status===1? '#4CAF50' : '#f54b4b' }}/>
                                        </div>
                                    </div>

                                    <InputText placeholder={"Title"} name={"title"} value={formDataEdit.title} onChange={handleChangeEdit}></InputText>
                                    <InputText placeholder={"Description"} name={"description"} value={formDataEdit.description} onChange={handleChangeEdit}></InputText>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '10px',
                                        marginTop: '0px',
                                        justifyContent: 'space-between',
                                        padding: '0px',
                                    }}>
                                        <InputText placeholder={"Discount (%)"} name={"discount"} value={formDataEdit.discount} onChange={handleChangeEdit}></InputText>
                                        <InputText placeholder={"Discount Code"} name={"discount_code"} value={formDataEdit.discount_code} onChange={handleChangeEdit}></InputText>
                                    </div>

                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '0px',
                                        marginTop: '0px',
                                        justifyContent: 'space-between',
                                        padding: '0px',
                                    }}>
                                        <CommonDatePicker
                                            label="Start Date"
                                            selectedDate={startDateSelected}
                                            onChange={date => setStartDateSelected(date)}
                                        />


                                        <CommonDatePicker
                                            label="End Date"
                                            selectedDate={endDateSelected}
                                            onChange={date => setEndDateSelected(date)}
                                        />
                                    </div>
                                    
                                    <div style={{margin:'1px'}}></div>
                                    <LoadingButton onClick={handleSubmitEdit} isLoading={submitButFlag} text={"Save"} />
                                    <CommonButton text="Delete" color="var(--red)" onClick={onDeleteProduct} />

                                    
                                    
                                </div>
                            </div>
                        </DashboardBox> 
                    </div>

            </div>

            <RightSidePopup isOpen={showPopup} onClose={() => setShowPopup(false)} 
                onSubmit={() => {
                addOffer();
                }}
                >
                <TextView type="darkBold" text={"Create your Offer"}/>
                <div style={{marginTop:'20px'}}></div>

                <InputText placeholder={"Title"} name={"title"} onChange={handleChange} maxLength={30}></InputText>
                <InputText placeholder={"Description"} name={"description"} onChange={handleChange} maxLength={150}></InputText>

                <InputText placeholder={"Discount (%)"} name={"discount"} onChange={handleChange}></InputText>
                <InputText placeholder={"Discount Code"} name={"discount_code"} onChange={handleChange}></InputText>
                
                 <CommonDatePicker
                    label="Start Date"
                    selectedDate={startDate}
                    onChange={date => setStartDate(date)}
                 />


                 <CommonDatePicker
                    label="End Date"
                    selectedDate={endDate}
                    onChange={date => setEndDate(date)}
                 />

                <RoundButtonText icon={faPaperclip} text={imageUploadStatus} onClick={handleImageButton}/>

                
            </RightSidePopup>

             {showImagePopup && (
            <ImageUploadPopupCommon onClose={() => handleimageChange()} userType={"vendor"} onImageUploaded={handleImageUploaded} />
        )}
        </div>
    )
}

export default OffersVendor
