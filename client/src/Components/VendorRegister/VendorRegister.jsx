import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import il from "./il.jpg";
import { FaTrash, FaTag, FaFileSignature, FaMoneyBillWave, FaPercent, FaToggleOn,  FaUser, FaPhone, FaBuilding, FaIdCard, FaEnvelope, 
  FaGlobe, FaMapMarkerAlt, FaCity, FaPaperclip,FaCheck, FaArrowRight, FaShieldAlt, FaPlus, FaFileAlt, FaTimes  } from "react-icons/fa";

const VendorRegister = () => {
  const { t, i18n } = useTranslation();
  
  // RTL Logic
  const isRTL = i18n.dir() === "rtl";
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState(null);
  
  // --- 1. Main Form State ---
  const [formData, setFormData] = useState({
    vendor_name: "",
    vendor_phone: "",
    company_name: "",
    company_reg_number: "",
    email: "",
    country: "",
    state: "",
    city: "",
    address: ""
  });

  // --- 2. Properties State ---
  const [properties, setProperties] = useState([]);

  // Handle Text Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttachmentClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAttachment(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    document.getElementById("fileInput").value = "";
  };

  // --- Property Logic ---
  const addProperty = () => {
    setProperties([...properties, { 
      id: Date.now(), 
      category: "", 
      name: "", 
      amount: "", 
      status: "active", 
      point_a: "", 
      point_b: "" 
    }]);
  };

  const removeProperty = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  // Generic handler for property fields
  const updateProperty = (id, field, value) => {
    // If it's points, apply the number logic you had before
    if (field === 'point_a' || field === 'point_b') {
       value = value.replace(/[^0-9.]/g, "");
       const parts = value.split(".");
       if (parts.length > 2) value = parts[0] + "." + parts[1];
       if (parts[0].length > 2) parts[0] = parts[0].slice(0, 2);
       if (parts[1]?.length > 2) parts[1] = parts[1].slice(0, 2);
       value = parts.join(".");
    }

    const updated = properties.map(p => {
        if(p.id === id) return { ...p, [field]: value };
        return p;
    });
    setProperties(updated);
  };

  // --- Submit Logic ---
  const handleSubmit = async () => {
    if(!formData.vendor_name || !formData.vendor_phone || !formData.email) {
        alert("Please fill in Name, Phone, and Email");
        return;
    }

    setLoading(true);
    const dataToSend = new FormData();
    
    // Append Form Data
    Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
    
    // Append Fixed Values
    dataToSend.append("user_type", "3");
    
    // Append File
    if (attachment) dataToSend.append("attachment", attachment);
    
    // Append Properties (as JSON string)
    dataToSend.append("properties", JSON.stringify(properties));

    try {
        const response = await fetch("/api/admin/register", {
            method: "POST",
            body: dataToSend
        });
        const result = await response.json();
        
        if(response.ok) {
            alert("Vendor Registered Successfully");
            // Clear form
            setFormData({
                vendor_name: "", vendor_phone: "", company_name: "", 
                company_reg_number: "", email: "", country: "", state: "", city: "", address: ""
            });
            setProperties([]);
            setAttachment(null);
            setIsChecked(false);
        } else {
            alert(result.error?.[0]?.message || "Registration Failed");
        }
    } catch (error) {
        console.error(error);
        alert("Network Error");
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl -mt-4 rounded-md font-sans bg-white mx-auto">
      <div  className="w-full shadow-lg rounded-lg relative overflow-hidden">
        {/* Image Background */}
        <img
        dir="ltr"
          src={il}
          alt="Decorative"
          // Changed 'right-1' to 'end-1' for RTL support
          className="absolute end-1 w-[600px] h-full z-0 opacity-80 pointer-events-none"
        />

        <h2 className="text-3xl top-12 font-bold text-center mb-6 relative z-10">
          {t("vendor_register")}
        </h2>

        <div className="p-4">
          <div className="bg-yellow-300 top-8 p-4 text-center font-semibold mb-8 relative z-10">
            RETAIL00-8848
          </div>
        </div>

        {/* Basic Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4">
    
    {/* 1. Vendor Name */}
    <div className="relative group z-10">
      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="text" 
        name="vendor_name"
        value={formData.vendor_name}
        onChange={handleInputChange}
        placeholder={t("vendor_name")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>

    {/* 2. Vendor Phone */}
    <div className="relative group z-10">
      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="text" 
        name="vendor_phone"
        value={formData.vendor_phone}
        onChange={handleInputChange}
        placeholder={t("vendor_phone")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>

    {/* 3. Company Name */}
    <div className="relative group z-10">
      <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="text" 
        name="company_name"
        value={formData.company_name}
        onChange={handleInputChange}
        placeholder={t("company_name")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>

    {/* 4. Registration Number */}
    <div className="relative group z-10">
      <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="text" 
        name="company_reg_number"
        value={formData.company_reg_number}
        onChange={handleInputChange}
        placeholder={t("company_reg_number")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>

    {/* 5. Email */}
    <div className="relative group z-10">
      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="email" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder={t("vendor_email")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>

    {/* 6. Country */}
    <div className="relative group z-10">
      <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="text" 
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        placeholder={t("select_country")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>

    {/* 7. State */}
    <div className="relative group z-10">
      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="text" 
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        placeholder={t("select_state")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>

    {/* 8. City */}
    <div className="relative group z-10">
      <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#827127] transition-colors rtl:right-4 rtl:left-auto" />
      <input 
        type="text" 
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        placeholder={t("select_city")} 
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 focus:border-transparent transition-all shadow-sm rtl:pr-10 rtl:pl-4" 
      />
    </div>
  </div>

  {/* --- SECTION 2: ADDRESS --- */}
  <div className="px-4">
    <div className="relative z-10">
        <textarea 
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder={t("address")} 
          rows="3"
          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#827127]/50 transition-all shadow-sm resize-none"
        ></textarea>
        {/* Decorative corner accent */}
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gray-300 pointer-events-none rtl:left-2 rtl:right-auto rtl:border-r-0 rtl:border-l"></div>
    </div>
  </div>

  {/* --- SECTION 3: ACTIONS & ATTACHMENT --- */}
  <div className="px-4 pb-6 pt-4">
    <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
      
      {/* File Input (Hidden) */}
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Button 1: Add Attachment (Outlined Style) */}
      <button
        onClick={handleAttachmentClick}
        className="flex items-center cursor-pointer justify-center gap-2 px-6 py-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#827127] hover:text-[#827127] hover:bg-[#827127]/5 transition-all w-full md:w-auto font-semibold"
      >
        <FaPaperclip className="text-lg" />
        {t("add_attachment")}
      </button>

      {/* Button 2: Add Property (Primary Filled Style) */}
      <button
        onClick={addProperty}
        className="flex items-center cursor-pointer justify-center gap-2 px-8 py-3 rounded-lg bg-[#827127] text-white hover:bg-[#6e6020] hover:shadow-lg hover:shadow-[#827127]/30 transition-all w-full md:w-auto font-bold tracking-wide shadow-md"
      >
        <FaPlus className="text-sm" />
        {t("add_property")}
      </button>

      {/* ATTACHMENT DISPLAY CARD (Shown only if file exists) */}
      {attachment && (
        <div className="flex items-center gap-3 p-3 pl-4 pr-3 bg-blue-50 border border-blue-100 rounded-lg animate-fade-in w-full md:w-auto md:ml-auto rtl:md:mr-auto rtl:md:ml-0">
          <div className="p-2 bg-white rounded-md shadow-sm text-blue-500">
            <FaFileAlt />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">File Attached</span>
            <span className="text-sm text-gray-600 truncate max-w-[150px]">{attachment.name}</span>
          </div>
          <button
            onClick={removeAttachment}
            className="p-2 ml-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-full transition-all rtl:mr-2 rtl:ml-0"
            title="Remove file"
          >
            <FaTimes />
          </button>
        </div>
      )}

    </div>
  </div>

<div className="space-y-6 p-4">
  {properties.map((property, index) => (
    <div 
      key={property.id} 
      className="group relative flex flex-col md:flex-row bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#827127]/30 transition-all duration-300 overflow-hidden"
    >
      
      {/* LEFT SIDE: INPUT FORM GRID */}
      <div className="flex-1 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* 1. Category */}
        <div className="lg:col-span-2 space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">{t("select_category")}</label>
            <div className="relative">
                <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 rtl:right-3 rtl:left-auto" />
                <input 
                  type="text" 
                  value={property.category}
                  onChange={(e) => updateProperty(property.id, 'category', e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-[#827127] transition-all outline-none rtl:pr-9 rtl:pl-4"
                  placeholder={t("select_category")}
                />
            </div>
        </div>

        {/* 2. Property Name */}
        <div className="lg:col-span-2 space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">{t("property_name")}</label>
            <div className="relative">
                <FaFileSignature className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 rtl:right-3 rtl:left-auto" />
                <input 
                  type="text" 
                  value={property.name}
                  onChange={(e) => updateProperty(property.id, 'name', e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-[#827127] transition-all outline-none rtl:pr-9 rtl:pl-4"
                  placeholder={t("property_name")}
                />
            </div>
        </div>

        {/* 3. Amount */}
        <div className="lg:col-span-1 space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">{t("property_amount")}</label>
            <div className="relative">
                <FaMoneyBillWave className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 rtl:right-3 rtl:left-auto" />
                <input 
                  type="text" 
                  value={property.amount}
                  onChange={(e) => updateProperty(property.id, 'amount', e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-[#827127] transition-all outline-none rtl:pr-9 rtl:pl-4"
                  placeholder="0.00"
                />
            </div>
        </div>

        {/* 4. Status */}
        <div className="lg:col-span-1 space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">{t("select_status")}</label>
            <div className="relative">
                <select 
                    value={property.status}
                    onChange={(e) => updateProperty(property.id, 'status', e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-[#827127] transition-all outline-none appearance-none cursor-pointer">
                  <option value="" disabled selected>{t("select_status1")}</option>
                  <option value="active">{t("active")}</option>
                  <option value="disable">{t("disable")}</option>
                </select>
                <FaToggleOn className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none rtl:left-3 rtl:right-auto" />
            </div>
        </div>

        {/* 5. Points Inputs (Full Row on Mobile, Split on Desktop) */}
        <div className="lg:col-span-3 space-y-1">
             <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">{t("Point_A")} %</label>
             <div className="relative">
                <FaPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 rtl:right-3 rtl:left-auto" />
                <input
                  type="text"
                  value={property.point_a}
                  onChange={(e) => updateProperty(property.id, 'point_a', e.target.value)}
                  placeholder="00.00%"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-[#827127] transition-all outline-none text-center rtl:pr-9 rtl:pl-4"
                />
             </div>
        </div>

        <div className="lg:col-span-3 space-y-1">
             <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ml-1">{t("Point_B")} %</label>
             <div className="relative">
                <FaPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 rtl:right-3 rtl:left-auto" />
                <input
                  type="text"
                  value={property.point_b}
                  onChange={(e) => updateProperty(property.id, 'point_b', e.target.value)}
                  placeholder="00.00%"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-[#827127] transition-all outline-none text-center rtl:pr-9 rtl:pl-4"
                />
             </div>
        </div>

      </div>

      {/* RIGHT SIDE: SEPARATE ACTION SECTION */}
      {/* Displays a divider and a nice big delete button */}
      <div className="md:w-16 flex flex-col border-t md:border-t-0 md:border-l border-gray-100 rtl:border-r rtl:border-l-0">
        <button
          onClick={() => removeProperty(property.id)}
          className="flex-1 w-full flex items-center justify-center p-4 bg-gray-50 text-gray-400 hover:bg-red-50 cursor-pointer hover:text-red-500 transition-colors duration-200 group-hover:bg-red-500 group-hover:text-white"
          title={t("remove")}
        >
          <FaTrash className="text-lg transition-transform duration-200 group-hover:scale-110" />
        </button>
      </div>

    </div>
  ))}
</div>

        {/* Terms and Conditions */}
        <div className="pt-6 mt-4 border-t border-gray-100">
  
  {/* --- 1. TERMS & CONDITIONS (Custom Checkbox) --- */}
  <div className="px-4 mb-8">
    <label className="flex items-start gap-3 cursor-pointer group select-none relative z-10">
      
      {/* Hidden Native Checkbox */}
      <input
        type="checkbox"
        id="terms"
        className="peer sr-only"
        onChange={() => setIsChecked(!isChecked)}
      />

      {/* Custom Visual Checkbox */}
      <div className="relative mt-0.5 w-6 h-6 flex-shrink-0 border-2 border-gray-300 rounded-md bg-white peer-checked:bg-[#827127] peer-checked:border-[#827127] transition-all duration-300 shadow-sm group-hover:border-[#827127]/50">
        <FaCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity duration-200 scale-50 peer-checked:scale-100" />
      </div>

      {/* Text Content */}
      <div className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
        {t("terms_vendor")}
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <FaShieldAlt className="text-[#827127]" /> 
          Secure Registration
        </p>
      </div>
    </label>
  </div>

  {/* --- 2. REGISTER BUTTON --- */}
  <div className="px-4 mb-4">
  <button
    onClick={handleSubmit}
    disabled={!isChecked || loading}
    className={`
      relative w-full py-4 px-6 rounded-xl group overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${isChecked && !loading
        ? "cursor-pointer shadow-[0_10px_40px_-10px_rgba(130,113,39,0.5)] transform hover:scale-[1.02]" 
        : "cursor-not-allowed opacity-60 bg-gray-200"
      }
    `}
  >
    {/* --- LAYER 1: THE CORE BACKGROUND --- */}
    {/* Transitions from Gray Stone to Liquid Gold Gradient */}
    <div className={`absolute inset-0 transition-all duration-500 ${isChecked ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#827127] via-[#9e8b36] to-[#827127]"></div>
      
      {/* Animated Pulse Ring behind (Glowing Aura) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[500%] bg-white/10 rotate-45 group-hover:rotate-90 transition-transform duration-700 blur-xl"></div>
    </div>

    {/* --- LAYER 2: THE "LASER SHEEN" (High Speed Swipe) --- */}
    {isChecked && !loading && (
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 ease-in-out group-hover:left-[200%]"></div>
      </div>
    )}

    {/* --- LAYER 3: TECHNICAL BRACKETS (The Futuristic HUD feel) --- */}
    {/* Left Bracket */}
    <div className={`absolute top-1/2 left-6 -translate-y-1/2 h-1/2 w-[2px] bg-white/50 transition-all duration-500 ${isChecked ? "group-hover:h-3/4 group-hover:left-8 group-hover:bg-white" : "opacity-0"}`}></div>
    <div className={`absolute top-1/2 left-6 -translate-y-1/2 h-[2px] w-0 bg-white/50 transition-all duration-500 ${isChecked ? "group-hover:w-3 group-hover:left-8" : "opacity-0"}`}></div>

    {/* Right Bracket */}
    <div className={`absolute top-1/2 right-6 -translate-y-1/2 h-1/2 w-[2px] bg-white/50 transition-all duration-500 ${isChecked ? "group-hover:h-3/4 group-hover:right-8 group-hover:bg-white" : "opacity-0"}`}></div>
    <div className={`absolute top-1/2 right-6 -translate-y-1/2 h-[2px] w-0 bg-white/50 transition-all duration-500 ${isChecked ? "group-hover:w-3 group-hover:right-8" : "opacity-0"}`}></div>

    {/* --- LAYER 4: TEXT CONTENT --- */}
    <span className="relative z-10 flex items-center justify-center gap-3">
      
      {/* Text Label */}
      <span 
        className={`
          font-black uppercase tracking-[0.2em] text-sm transition-all duration-500
          ${isChecked 
            ? "text-white group-hover:tracking-[0.35em] drop-shadow-md" 
            : "text-gray-400 tracking-widest"
          }
        `}
      >
        {loading ? t("processing...") : t("register")}
      </span>

      {/* Status Indicator Dot */}
      {isChecked && !loading && (
        <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse"></span>
      )}
    </span>

  </button>
</div>

</div>
      </div>
    </div>
  );
};

export default VendorRegister;