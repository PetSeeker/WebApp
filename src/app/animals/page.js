"use client";
import Layout from '@/components/Layout';
import { FaMoneyBill, FaHandHoldingHeart } from "react-icons/fa";
import {useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Animals() {

    

  return (
    <>
        <Layout className='flex items-center justify-center mb-32'>
            <div className='w-full flex flex-col items-center justify-center bg-gray-200 p-8 border-1 border-solid rounded-2xl shadow-lg'>
                <h1 className='text-5xl text-center text-gray-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-12 mt-8 '>Search animals for sale or adoption!</h1>
                <div className='flex flex-row items-center justify-center mb-16'>
                    <a href='/animals/sale' className='flex-grow mx-16 flex-col '>
                        <button
                            className="shadow-lg w-full text-white bg-gray-500 hover:text-black hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            Animals for Sale &nbsp;<FaMoneyBill/>
                        </button>
                    </a>
                    <a href='/animals/adoption' className='flex-grow mx-16'>
                        <button
                            className="shadow-lg w-full text-white bg-gray-500 hover:text-black hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            Animals for Adoption &nbsp;<FaHandHoldingHeart/>
                        </button>
                    </a>
                </div>      
            </div>
        </Layout>
    </>
  );
}