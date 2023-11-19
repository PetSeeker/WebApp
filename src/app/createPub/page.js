"use client";
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';

export default function CreatePub(){

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState(null); // or useState(null);
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [images, setImages] = useState([]);
    const handleFileUpload = (event) => {
        const selectedFiles = event.files;
        setImages(selectedFiles);
      };
    // Initialize the sizes array with data. Replace this with your actual data.
    const goals = [
        { name: 'Sale or Adoption', value: null },
        { name: 'SALE', value: 'SALE' },
        { name: 'ADOPTION', value: 'ADOPTION'},
        // Add more Size objects as needed.
    ];

    

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setEmail(localStorage.getItem('email'));
        if (token && window.location.pathname === '/createPub') {
          setIsAuthenticated(true);
        } else if (window.location.pathname !== '/login') {
            setIsAuthenticated(false);
        }
      }, []);

    //   const [isAuthenticated, setIsAuthenticated] = useState(true); //for local development

    const sendData = async () => {
        try {
            const formData = new FormData();
            formData.append('owner_email', email); // Replace with actual owner email
            formData.append('animal_name', name);
            formData.append('animal_type', type);
            formData.append('animal_breed', breed);
            formData.append('animal_age', age);
            formData.append('location', location);
            formData.append('listing_type', selectedGoal);
            formData.append('description', description);
            formData.append('animal_price', price);
            // formData.append('images', images);
            // Append each file with the key 'images'
            images.forEach((image, index) => {
                formData.append('images', image, `image${index}`);
            });
            
            // Append price only if the listing type is 'sale'
            if (selectedGoal === 'sale') {
                formData.append('animal_price', price);
            } 
            

            const formDataObject = {};
            formData.forEach((value, key) => {
            formDataObject[key] = value;
            });
            console.log("Form Data: ", formDataObject)


            
            
            try {
                // Make the API call using axios
                const response = await axios.post('https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/createListings', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                  }
                });
          
                // Handle the response
                console.log('API Response:', response.data);
                sendNot(name);
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
        } catch (error) {
            // Handle errors
            console.error('API Error:', error.response || error.message || error);
        }
      };

      async function sendNot(name){
            const data = {
                "to": email,
                "subject": "Publication Created",
                "message": `Your publication of animal: "${name}" has been created`
            }
            console.log("email: ", email)
            try {
                // Make the API call using axios
                const response = await axios.post('https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/notification', data);
          
                // Handle the response
                console.log('API Response:', response.data);
                window.location.href = '/myListings';
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
        }

    return (
        <>
        
        {isAuthenticated === null ? ( // Display nothing or a loading indicator while checking authentication
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : isAuthenticated ? ( // Content for authenticated users
            <>
            <AnimatedText text='Create a Publication' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-12 mt-8 '/>

            <Layout className='flex items-center justify-center'>
                <div className='w-1/3 bg-gray-300 bg-opacity-50 border border-solid rounded-xl flex flex-col items-center justify-center p-8 space-y-6 shadow-lg'>
                    <div className='w-full flex'>
                        <div className="p-float-label w-1/2">
                            <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} className='h-10'  />
                            <label htmlFor="username">Animal Name</label>
                        </div>
                        <div className="p-float-label w-1/2">
                            <InputText id="username" value={type} onChange={(e) => setType(e.target.value)} className='w-full h-10' />
                            <label htmlFor="username">Animal Type</label>
                        </div>
                    </div>
                    <div className='w-full flex'>
                        <div className="p-float-label w-1/2">
                            <InputText id="username" value={breed} onChange={(e) => setBreed(e.target.value)} className='h-10'/>
                            <label htmlFor="username">Breed</label>
                        </div>
                        <div className="w-1/2 p-float-label">
                            <InputNumber id="number-input" value={age} onChange={(e) => setAge(e.value)} />
                            <label htmlFor="number-input">Age</label>
                        </div>
                    </div>
                    <div className='w-full flex'>
                        <div className="p-float-label w-1/2">
                            <InputText id="username" value={location} onChange={(e) => setLocation(e.target.value)} className='h-10'/>
                            <label htmlFor="username">Location</label>
                        </div>
                    </div>
                    <div className='w-full flex'>
                        {/* <div className="w-1/2">
                            <Dropdown value={selectedSize} onChange={(e) => setSelectedSize(e.value)} options={sizes} optionLabel="name" 
                            placeholder="Select a Size" className='h-2/3' />
                        </div> */}
                        <div className='w-1/2'>
                            <Dropdown value={selectedGoal} onChange={(e) => setSelectedGoal(e.value)} options={goals} optionLabel="name" 
                            placeholder="Sale/Adoption" className='h-full'/>
                        </div>
                        { selectedGoal === 'SALE' ? (
                            <div className="p-float-label w-1/2">
                                <input type="number" id="number-input" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <label htmlFor="number-input">Price</label>
                            </div> ) : <></>
                        }
                    </div>
                    <div className='w-full flex'>
                        <div className="p-float-label w-full ">
                            <InputTextarea id="username" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} className='w-full rounded-xl min-h-full'/>
                            <label htmlFor="username">Description</label>
                        </div>
                    </div>
                    <div className='w-full'>
                        <FileUpload name="images" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} onSelect={handleFileUpload} emptyTemplate={<p className="w-full m-0">Drag and drop images to here to upload.</p>} />
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <Button label="Create Listing" icon="pi pi-check" className='p-3 bg-blue-500 text-white hover:bg-white hover:text-blue-500' text raised onClick={sendData}/>
                    </div>
                </div>
            </Layout>
        </>
        ) : ( 
            <div className='w-full items-center justify-center p-8 border border-solid rounded-xl text-black text-center my-32 bg-sage2'>
                <p className='text-bold text-5xl'>You are not authenticated. Please log in.</p>
            </div>
        )}
        </>
    )
}