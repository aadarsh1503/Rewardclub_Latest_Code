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

const baseUrl = import.meta.env.VITE_API_BASE_IMG_URL;

function ProductVendor() {


    const [loading, setLoading] = useState(true);
    const [detailPage, setDetailPage] = useState(false);
    const [selectedPosProd, setselectedPosProd] = useState();
    const [selectedProd, setSelectedProd] = useState({});
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [imageUploadType, setImageUploadType] = useState(0);
    const [submitButFlag, setSubmitButFlag] = useState(false);
    const [imageUploadStatus, setImageUploadStatus] = useState("Product Image");
    const [productImage, setProductImage] = useState("");
    

    
    const [formData, setFormData] = useState({
        search: "",

        title: "",
        description: "",
        price: "",
        offer_price: "",
    });

    const [formDataEdit, setFormDataEdit] = useState({
        title: "",
        description: "",
        price: "",
        offer_price: "",
    });


    const handleProductListClick = (index) => {

      console.log("Clicked index:", index);
      if (selectedPosProd == index )
      {
        setDetailPage(false)
        setselectedPosProd()
      }
      else
      {
        setFormDataEdit(products[index]);
        setselectedPosProd(index)
        setSelectedProd(products[index])
        setDetailPage(true)
      }
    };

    const handleImageButton = () => {
        setImageUploadType(0)
        setShowImagePopup(true)
        
    };

    const handleSubmitEdit = () => {
        updateProductDetails()
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
        console.log(selectedProd?.status)
        if(selectedProd?.status == 1)
        {
            updateProductStatus(0)
        }
        else
        {
            updateProductStatus(1)
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
            updateProductImage(data)
            setShowImagePopup(false)
        }
    };

    const onDeleteProduct = () => {
        console.log("SAVE BUTTON ACTION")
        deleteProduct()
    };

    useEffect(() => {
        fetchProducts();
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
    const fetchProducts = async () => {
        setLoading(true);
        try {
        const response = await apiClient.get("/vendor/get_product");
        if (response?.result?.status === 1) 
        {
            console.warn("Get Transaction successfully");
            setProducts(response.result.data);
            if(detailPage)
            {
                setFormDataEdit(response.result.data[selectedPosProd]);
                setSelectedProd(response.result.data[selectedPosProd])
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

    const addProduct = async () => {

        //setisLoading(true); // Show loader
        try {

            const payload = {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            offer_price: formData.offer_price,
            image: productImage 
            };

            console.log("SANTHOSH Vendor ID:", payload);
            const data = await apiClient.post("/vendor/add_product", payload);

            //if (data && data.result?.data.status === 1) {
            if (data?.result?.status === 1) {
                //setVendors(data.result.data);
                setShowPopup(false)
                fetchProducts();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };


    const updateProductStatus = async (status) => {
        //setisLoading(true); // Show loader
        console.log(status)
        try {

            const payload = {
                id: selectedProd?.id,
                status: status
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/update_product_status", payload);

            //if (data && data.result?.data.status === 1) {
            if (data?.result?.status === 1) {
                //setVendors(data.result.data);
                ///setShowPopup(false)
                fetchProducts();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };

    const updateProductImage = async (image) => {
        //setisLoading(true); // Show loader
        try {
            const payload = {
                id: selectedProd?.id,
                image: image
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/update_product_image", payload);

            if (data?.result?.status === 1) {
                fetchProducts();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };

    const deleteProduct = async () => {
        //setisLoading(true); // Show loader
        try {
            const payload = {
                id: selectedProd?.id
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/delete_product", payload);

            if (data?.result?.status === 1) {
                fetchProducts();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
            //setisLoading(false); // Hide loader
        }
    };


    const updateProductDetails = async () => {
        setSubmitButFlag(true); // Show loader
        try {
            const payload = {
                id: selectedProd?.id,
                title: formDataEdit.title,
                description: formDataEdit.description,
                price: formDataEdit.price,
                offer_price: formDataEdit.offer_price,
            };
            console.log(payload)
            const data = await apiClient.post("/vendor/update_product_details", payload);

            if (data?.result?.status === 1) {
                fetchProducts();
            }

        } catch (err) {
            console.error("Something went wrong fetching vendors", err);
        }
        finally {
             setSubmitButFlag(false); // Hide loader
        }
    };

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
                    <TitleView text={"Products"} />
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
                            <div className="grid-container-product">
                                {loading ? (
                                <div className="loader-container">
                                    <div className="spinner" />
                                </div>
                                ) : (
                                    products.map((proItems, index) => (
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
                                                    background: selectedPosProd === index 
                                                        ? 'linear-gradient(165deg, #fffef7 0%, #fff9e6 50%, #fff4cc 100%)'
                                                        : 'linear-gradient(165deg, #ffffff 0%, #f8f9fa 50%, #f0f2f5 100%)',
                                                    border: selectedPosProd === index ? '3px solid #f8d307' : '2px solid transparent',
                                                    boxShadow: selectedPosProd === index 
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
                                                    background: 'linear-gradient(90deg, #f8d307 0%, #ffd54f 50%, #f8d307 100%)',
                                                    borderRadius: '24px 24px 0 0'
                                                }}></div>
                                                
                                                {/* Product Image */}
                                                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '18px' }}>
                                                    <img 
                                                        src={proItems?.image ? baseUrl+proItems.image : "/public/dummy.jpg"} 
                                                        alt={proItems.title}
                                                        style={{
                                                            width: '100%',
                                                            height: '180px',
                                                            objectFit: 'cover',
                                                            borderRadius: '18px',
                                                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                                                            transition: 'transform 0.4s ease'
                                                        }}
                                                    />
                                                    {/* Price badge */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '12px',
                                                        right: '12px',
                                                        background: 'linear-gradient(135deg, #f8d307 0%, #e6c200 100%)',
                                                        padding: '8px 14px',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 4px 12px rgba(248, 211, 7, 0.4)'
                                                    }}>
                                                        <span style={{ fontSize: '16px', fontWeight: '700', color: '#222' }}>{proItems?.offer_price}</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Product Info */}
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
                                                    
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ fontSize: '14px', color: '#888', textDecoration: 'line-through' }}>{proItems?.price}</span>
                                                        <span style={{ 
                                                            fontSize: '12px', 
                                                            background: '#e8f5e9', 
                                                            color: '#2e7d32', 
                                                            padding: '4px 10px', 
                                                            borderRadius: '20px',
                                                            fontWeight: '600'
                                                        }}>Save {Math.round(((proItems?.price - proItems?.offer_price) / proItems?.price) * 100) || 0}%</span>
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
                                    <div style={{position: 'relative', width:'100%',justifyContent:'center', alignItems:'center'}}>
                                        <img className="prod-image" src={selectedProd?.image ? baseUrl+selectedProd.image : "/public/dummy.jpg"} alt={selectedProd.image} />

                                        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', zIndex: 1}}>
                                            <RoundButton icon={faPen} onClick={() => handleEditProdImage()} shadow={true} />
                                            <div style={{margin:'5px'}}/>
                                            <RoundButton icon={selectedProd?.status===1?faToggleOn:faToggleOff} iconColor= "white" onClick={() => handleChangeProdStatus()} shadow={true} style={{backgroundColor: selectedProd?.status===1? '#4CAF50' : '#f54b4b' }}/>
                                        </div>
                                    </div>

                                    <InputText placeholder={"Title"} name={"title"} value={formDataEdit.title} onChange={handleChangeEdit}></InputText>
                                    <InputText placeholder={"Description"} name={"description"} value={formDataEdit.description} onChange={handleChangeEdit}></InputText>

                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <div style={{width:'48%'}}>
                                            <InputText placeholder={"Price"} name={"price"} value={formDataEdit.price} onChange={handleChangeEdit}></InputText>
                                        </div>
                                        <div style={{width:'4%'}}>
                                        </div>

                                        <div style={{width:'48%'}}>
                                            <InputText placeholder={"Offer Price"} name={"offer_price"} value={formDataEdit.offer_price} onChange={handleChangeEdit}></InputText>
                                        </div>
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
                //setShowPopup(false);
                addProduct();
                }}
                >
                <TextView type="darkBold" text={"Create your Product"}/>
                <div style={{marginTop:'20px'}}></div>

                <InputText placeholder={"Title"} name={"title"} onChange={handleChange} maxLength={30}></InputText>
                <InputText placeholder={"Description"} name={"description"} onChange={handleChange} maxLength={150}></InputText>

                <div style={{display:'flex', flexDirection:'row'}}>
                    <div style={{width:'48%'}}>
                        <InputText placeholder={"Price"} name={"price"} onChange={handleChange}></InputText>
                    </div>
                    <div style={{width:'4%'}}>
                    </div>

                    <div style={{width:'48%'}}>
                        <InputText placeholder={"Offer Price"} name={"offer_price"} onChange={handleChange}></InputText>
                    </div>
                </div>

                <RoundButtonText icon={faPaperclip} text={imageUploadStatus} onClick={handleImageButton}/>

                
            </RightSidePopup>

             {showImagePopup && (
            <ImageUploadPopupCommon onClose={() => handleimageChange()} userType={"vendor"} onImageUploaded={handleImageUploaded} />
        )}
        </div>
    )
}

export default ProductVendor