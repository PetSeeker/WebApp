"use client";
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import imagexample from '../../../../../public/images/userdefault1.png';

export default function profileID({params}: {params: {id: string}}){

    const [email, setEmail] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
            console.log(storedEmail);
        }
    }, []);

    useEffect(() => {
        axios.get(`https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/get-user/${params.id}`)
            .then((response) => {
                console.log("Resposta info utilizador:", response.data);
                if(response.data.firstName !== null){
                    setFirstName(response.data.first_name);
                }
                if(response.data.firstName !== null){
                    setEmailUser(response.data.email);
                }
                if(response.data.lastName !== null){
                    setLastName(response.data.last_name);
                }
                if(response.data.locality !== null){
                    setLocation(response.data.locality);
                }
                if(response.data.description !== null){
                    setDescription(response.data.description);
                }
                setImage(response.data.image[0]);
                setInterests(response.data.interests);

  
            })
            .catch((error) => {
                console.log("Erro:", error);
            })
      }, []);


    return(
        <>
            <AnimatedText text='User Profile' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/> 
            <Layout className='flex items-center justify-center'>
                <div className='w-3/4 flex grid grid-cols-3 gap-4  p-24 rounded-xl'>
                    <div className='w-full border-2 shadow-xl p-4 grid grid-col-1 gap-2 items-center justify-center'>
                        <Image  src={image ? image : imagexample} width={200} height={200} className='rounded-full' alt='profile image'/>
                        <h1 className='text-center text-2xl font-bold'>{firstName} {lastName}</h1>
                        <h3 className='text-center text-xl'>{location}</h3>
                    </div>
                    <div className='w-full border-2 shadow-xl col-span-2 grid grid-cols-1  p-8'>
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Full Name</h3>
                            <h3>{firstName} {lastName}</h3>
                        </div> 
                        <hr />
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Email</h3>
                            <h3>{emailUser}</h3>
                        </div> 
                        <hr />
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Address</h3>
                            <h3>{location}</h3>
                        </div> 
                        <hr />
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Interests</h3>
                            {interests.map((interest, index) => (
                                <h3>{interest}</h3>
                            ))}
                        </div> 
                        <hr />
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Description</h3>
                            <h3>{params.id}</h3>
                        </div> 
                    </div>
                </div>
            </Layout>
            
        </>
              
    )
}