"use client";
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '@/config/FireBaseConfig';
import Image from 'next/image';
function LogoList() {
    const { userDetail } = useContext(UserDetailContext);
    const [logosList, setLogosList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (userDetail) {
            GetUserLogo();
        }
    }, [userDetail]);
    const GetUserLogo = async () => {
        if (!userDetail?.email) return;
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "users", userDetail.email, "logos"));
            const logos = [];
            querySnapshot.forEach((doc) => {
                logos.push(doc.data());
            });
            setLogosList(logos);
        } catch (error) {
            console.error("Error getting documents: ", error.message);
        } finally {
            setLoading(false);
        }
    };
    const ViewLogo = (image) => {
        const imageWindow = window.open();
        if (imageWindow) {
            imageWindow.document.write(`
                <html>
                    <head><title>Logo</title></head>
                    <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0;">
                        <img src="${image}" alt="Logo Image" style="max-width: 100%; max-height: 100%;"/>
                    </body>
                </html>
            `);
            imageWindow.document.close();
        }
    };
    return (
        <div className='mt-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((_, index) => (
                        <div key={index} className='bg-slate-200 animate-pulse rounded-xl w-full h-40'>
                        </div>
                    ))
                ) : logosList.length > 0 ? (
                    logosList.map((logo, index) => (
                        <div key={index} className='hover:scale-105 transition-all cursor-pointer' onClick={() => ViewLogo(logo?.image)}>
                            <Image
                                src={logo?.image}
                                width={400}
                                height={200}
                                className='w-full rounded-xl'
                                alt={logo?.title}
                            />
                            <h2 className='font-medium mt-2 text-lg text-center'>{logo?.title}</h2>
                            <p className='text-sm text-gray-500 text-center'>{logo?.desc}</p>
                        </div>
                    ))
                ) : (
                    <p>No logos found.</p>
                )}
            </div>
        </div>
    );
}

export default LogoList;
