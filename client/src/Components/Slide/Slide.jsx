import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Slide.css";
import { useTranslation } from 'react-i18next';

// Images
import i2 from "./i2.png";
import i5 from "./i5.png";
import i6 from "./i6.png";
import i7 from "./i7.png";
import i100 from "./i100.png";
import i101 from "./i101.jpg";
import i10 from "./i10.png";
import i12 from "./i12.png";

const Slide = () => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    // Combined data for cleaner handling
    const partners = [
        { src: i2, link: "https://alshaheen.pro/" },
        { src: i5, link: "https://alshaheenexpress.com/" },
        { src: i6, link: "https://gvscargo.com/" },
        { src: i101, link: "https://gvscargo.net/" },
        { src: i7, link: "https://gvs-bh.com/" },
        { src: i10, link: "https://www.aquacare.me/" },
        { src: i12, link: "https://arabiaseel.com/" },
        { src: i100, link: "https://alzyara.com/" }
    ];

    useEffect(() => {
        // Preload logic
        let loadedImages = 0;
        const totalImages = partners.length;

        partners.forEach((partner) => {
            const img = new Image();
            img.src = partner.src;
            img.onload = () => {
                loadedImages += 1;
                if (loadedImages === totalImages) setIsLoaded(true);
            };
        });
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 3000, // Slower speed for smoother continuous scroll
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0, // Continuous effect
        cssEase: "linear", // Smooth continuous movement
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    };

    return (
        <section className="relative py-16 w-full overflow-hidden bg-white/50 backdrop-blur-sm">
            
            {/* Background Decorative Blobs (Optional for extra sexiness) */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header with Gradient Text */}
                <div className="text-center mb-12">
                    
                    <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-black drop-shadow-sm">
                        {t('trusted_brands')}
                    </h1>
                    <div className="w-24 h-1 mx-auto mt-6 bg-Green rounded-full"></div>
                </div>

                {/* Slider Container */}
                <div className="slider-container-mask py-4">
                    {isLoaded ? (
                        <Slider {...settings}>
                            {partners.map((partner, index) => (
                                <div key={index} className="px-4 py-2 outline-none">
                                    <a 
                                        href={partner.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="group block relative w-full h-32 flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="absolute inset-0  rounded-xl transition-opacity duration-300"></div>
                                        <img
                                            src={partner.src}
                                            alt={`Partner ${index + 1}`}
                                            className="relative z-10 w-auto h-16 md:h-20 max-w-[80%] object-contain filter  group-hover:opacity-100 logo-transition "
                                        />
                                    </a>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        // Sexy Skeleton Loader
                        <div className="flex justify-between items-center overflow-hidden gap-4">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <div key={n} className="w-full h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Slide;