"use client";
import Info from './_components/info';
import React from 'react'
import LogoList from './_components/logolist';
function Dashboard() {
    return (
        <div className='mt-20'>
            <Info />
            <LogoList />
        </div>
    )
}

export default Dashboard;
