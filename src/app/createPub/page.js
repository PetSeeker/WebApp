"use client";
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { InputText} from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';

export default function CreatePub(){

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    // const [selectedSize, setSelectedSize] = useState(null);
    // // Initialize the sizes array with data. Replace this with your actual data.
    // const sizes = [
    //     { name: 'Select a Size', value: null },
    //     { name: 'Small', value: 'small' },
    //     { name: 'Medium', value: 'medium' },
    //     { name: 'Big', value: 'big' },
    //     // Add more Size objects as needed.
    // ];
    const [selectedGoal, setSelectedGoal] = useState(null);
    // Initialize the sizes array with data. Replace this with your actual data.
    const goals = [
        { name: 'Sale or Adoption', value: null },
        { name: 'Sale', value: 'sale' },
        { name: 'Adoption', value: 'adoption'},
        // Add more Size objects as needed.
    ];

    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    return (
        <>
            <AnimatedText text='Create a Publication' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/>

            <Layout className='flex items-center justify-center'>
                <div className='w-1/3 bg-gray-300 bg-opacity-50 border border-solid rounded-xl flex flex-col items-center justify-center p-8 space-y-8'>
                    <div className='w-full flex'>
                        <div className="p-float-label w-1/2">
                            <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="username">Animal Name</label>
                        </div>
                        <div className="p-float-label w-1/2">
                            <InputText id="username" value={type} onChange={(e) => setType(e.target.value)} className='w-full' />
                            <label htmlFor="username">Animal Type</label>
                        </div>
                    </div>
                    <div className='w-full flex'>
                        <div className="p-float-label w-1/2">
                            <InputText id="username" value={breed} onChange={(e) => setBreed(e.target.value)} className='h-2/3'/>
                            <label htmlFor="username">Breed</label>
                        </div>
                        <div className="p-float-label w-1/2">
                            <InputNumber id="number-input" value={age} onValueChange={(e) => setAge(e.value)} className='w-full' />
                            <label htmlFor="number-input">Age</label>
                        </div>
                    </div>
                    <div className='w-full flex'>
                        {/* <div className="w-1/2">
                            <Dropdown value={selectedSize} onChange={(e) => setSelectedSize(e.value)} options={sizes} optionLabel="name" 
                            placeholder="Select a Size" className='h-2/3' />
                        </div> */}
                        <div className='w-1/2'>
                            <Dropdown value={selectedGoal} onChange={(e) => setSelectedGoal(e.value)} options={goals} optionLabel="name" 
                            placeholder="Sale/Adoption" className='h-2/3'/>
                        </div>
                        { selectedGoal === 'sale' ? (
                            <div className="p-float-label w-1/2">
                                <InputNumber id="number-input" value={price} onValueChange={(e) => setPrice(e.value)} />
                                <label htmlFor="number-input">Price</label>
                            </div> ) : <></>
                        }
                    </div>
                    <div className='w-full flex'>
                        <div className="p-float-label w-full">
                            <InputTextarea id="username" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} className='w-full'/>
                            <label htmlFor="username">Description</label>
                        </div>
                    </div>
                    <div className='w-full'>
                        <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="w-full m-0">Drag and drop images to here to upload.</p>} />
                    </div>
                </div>
            </Layout>
        </>
    )
}