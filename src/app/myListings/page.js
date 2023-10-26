"use client";
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { Button } from 'primereact/button';
import { FaRegIdCard } from "react-icons/fa";

export default function MyListings(){
    
    
    return(
        <>
        <AnimatedText text='My Listings' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/>
        <div className='w-full flex ml-32 mb-4'>
            <a href='/createPub'>
                <button
                    className="text-white bg-gray-500 hover:text-black hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    Create publication &nbsp;<FaRegIdCard/>
                </button>
            </a>
            
        </div>
        <Layout className='flex items-center justify-cente'>
        </Layout>
        </>
    )

}