"use client";
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useState, useEffect, useRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import axios from 'axios';
import { get } from 'http';

export default function CreatePub(){
    const [types, setTypes] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [tokenApiPetFinder, setTokenApiPetFinder] = useState(null);
    const isMountedRef = useRef(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
        let isAdmin = localStorage.getItem('isAdmin');
        if(isAdmin === 'true'){
            alert('You are not allowed to create a listing as admin');
            window.location.href = '/account/admin';
            return;
        }
        const token3 = localStorage.getItem('access_token');
        try {
            const formData = new FormData();
            formData.append('owner_email', email); // Replace with actual owner email
            formData.append('animal_name', name);
            formData.append('animal_type', selectedType);
            formData.append('animal_breed', selectedBreed);
            formData.append('animal_age', age);
            formData.append('location', location);
            formData.append('listing_type', selectedGoal);
            if (selectedGoal === 'SALE') {
                formData.append('animal_price', price);
            }
            formData.append('description', description);
            // formData.append('animal_price', price);
            // formData.append('images', images);
            // Append each file with the key 'images'
            images.forEach((image, index) => {
                formData.append('images', image, `${image.name}`);
            });
            // images.forEach((image, index) => {
            //     const imageType = image.type.split('/')[1]; // Extracting the file extension
            //     const imageNameWithType = `image${index}.${imageType}`;
            //     formData.append('images', image, imageNameWithType);
            // });
            
            
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
                const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    'Authorizer': `${token3}`
                  }
                });
          
                // Handle the response
                console.log('API Response:', response.data);
                sendNot(name, selectedType);
                //window.location.href = '/myListings';
              } catch (error) {
                // Handle errors
                //console.error('Error making API call:', error);
                if (error.response && error.response.status === 401 && isMountedRef.current) {
                    // Unauthorized, handle accordingly (e.g., redirect to login)
                    console.error('Unauthorized request:', error.message);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('email');
                    localStorage.removeItem('username'); 
                    localStorage.removeItem('isAdmin');
                    alert("You are not authorized to access this page. Please login.");
                    isMountedRef.current = false;
                    window.location.href = 'https://main.dzgh2fc7t2w9u.amplifyapp.com/';
                    
                  } else {
                    // Handle other errors
                    console.error('Error:', error.message);
                  }
              }
        } catch (error) {
            // Handle errors
            console.error('API Error:', error.response || error.message || error);
        }
      };

      async function sendNot(name, type){
            const token3 = localStorage.getItem('access_token');
            const data = {
                "to_list": [email],
                "subject": "Publication Sent to approvation",
                "message": `Your publication of animal: ${name} has been send to the Admins for approvation. We will contact you later with the result.`
            }
            console.log("email: ", email)
            try {
                // Make the API call using axios
                const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications', data, {
                    headers: {
                        Authorizer: `${token3}`,
                    }
                });
          
                // Handle the response
                console.log('API Response:', response.data);
                window.location.href = '/myListings';
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
        }

        const [selectedType, setSelectedType] = useState(null);
        // const types = [
        //     { name: 'Dog', value: 'Dog'},
        //     { name: 'Cat', value: 'Cat'},
        //     { name: 'Bird', value: 'Bird'},
        //     { name: 'Horse', value: 'Horse'},
        // ];

        const [selectedBreed, setSelectedBreed] = useState(null);
        // const breeds = [
        //     { name: 'Mutt', value: 'Mutt'},
        //     { name: 'Spitz', value: 'Spitz'},
        //     { name: 'Husky', value: 'Husky'},
        //     { name: 'Labrador', value: 'Labrador'},
        //     { name: 'German Shepherd', value: 'German Shepherd'},
        //     { name: 'Wild', value: 'Wild'},
        //     { name: 'Siamese', value: 'Siamese'},  
        // ];

        useEffect(() => {
            const postData = {
                grant_type: 'client_credentials',
                client_id: 'NNFZ4qehsUtm4ND9wG2SjhIYdz8QWU4MiW1lHAWQvQtt86o5I5',
                client_secret: 'wHmIyfPrSwKpHwLNOtxBpZe18oVlbAkpD518E6i1',
            };
            axios.post('https://api.petfinder.com/v2/oauth2/token', postData)
                .then((response) => {
                    console.log(response);
                    setTokenApiPetFinder(response.data.access_token);
                })
                .catch((error) => {
                    console.log(error);
                });
          }, []);  
        
        // async function getTokenApiPetFinder() {
        //     const postData = {
        //         grant_type: 'client_credentials',
        //         client_id: 'NNFZ4qehsUtm4ND9wG2SjhIYdz8QWU4MiW1lHAWQvQtt86o5I5',
        //         client_secret: 'wHmIyfPrSwKpHwLNOtxBpZe18oVlbAkpD518E6i1',
        //     };
        //     await axios.post('https://api.petfinder.com/v2/oauth2/token', postData)
        //         .then((response) => {
        //             console.log(response);
        //             setTokenApiPetFinder(response.data.access_token);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }

          useEffect(() => {
            axios.get('https://api.petfinder.com/v2/types', {
                    headers: {
                        Authorization: `Bearer ${tokenApiPetFinder}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    const fetchedTypes = response.data.types.map((type) => ({
                        name: type.name,
                        value: type.name,
                      }));
                    setTypes(fetchedTypes);
                      
                    console.log(fetchedTypes);
                })
                .catch((error) => {
                    console.log(error);
                    // if (error.response && error.response.status === 401 && isMountedRef.current) {
                    //     // Unauthorized, handle accordingly (e.g., redirect to login)
                    //     getTokenApiPetFinder();
                        
                    //   }
                })
            
          }, [tokenApiPetFinder]);

          useEffect(() => {
            if (selectedType === null) {
                return;
            }
            axios.get(`https://api.petfinder.com/v2/types/${selectedType}/breeds`, {
                    headers: {
                        Authorization: `Bearer ${tokenApiPetFinder}`,
                    },
                })
                .then((response) => {
                    console.log(response);
                    const fetchedTypes = response.data.breeds.map((type) => ({
                        name: type.name,
                        value: type.name,
                      }));
                    setBreeds(fetchedTypes);
                      
                    console.log(fetchedTypes);
                })
                .catch((error) => {
                    console.log(error);
                })
            
          }, [selectedType]);

        //   useEffect(() => {
        //     axios.get(`https://app.zipcodebase.com/api/v1/search?codes=${location}`, {
        //             headers: {
        //                 apikey: 'ce850980-9465-11ee-83de-27b428bd6727',
        //             },
        //         })
        //         .then((response) => {
        //             console.log(response);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         })
            
        //   }, [location]);

    return (
        <>
        
        {isAuthenticated === null ? ( // Display nothing or a loading indicator while checking authentication
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : isAuthenticated ? ( // Content for authenticated users
            <>
            <AnimatedText text='Create a Publication' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-12 mt-8 '/>

            <Layout className='flex items-center justify-center'>
                <div className='lg:w-1/3 md:w-1/2 xs:w-full bg-gray-300 bg-opacity-50 border border-solid rounded-xl flex flex-col items-center justify-center p-8 space-y-6 shadow-lg'>
                    <div className='w-full grid grid-cols-2 gap-16'>
                        <div className="w-full p-float-label">
                            <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} className='h-12 w-full'  />
                            <label htmlFor="username">Animal Name</label>
                        </div>
                        <div className="w-full p-float-label">
                            {/* <InputText id="username" value={type} onChange={(e) => setType(e.target.value)} className='h-12 w-full' />
                            <label htmlFor="username">Animal Type</label> */}
                            <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="name" placeholder="Select a Type" 
                            filter className="w-full h-12" panelClassName='w-2 mt-1' />
                            <label htmlFor="username">Animal Type</label>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-16'>
                    {selectedType ? (
                        <div className="w-full p-float-label">
                        <Dropdown
                            value={selectedBreed}
                            onChange={(e) => setSelectedBreed(e.value)}
                            options={breeds}
                            optionLabel="name"
                            placeholder="Select a Breed"
                            filter
                            className="w-full h-12"
                            panelClassName='w-1/5 mt-1'
                        />
                        <label htmlFor="username">Animal Breed</label>
                        </div>
                    ) : (
                        <div className="w-full p-float-label"></div>
                    )}
                        {/* <div className="w-full p-float-label">
                            <Dropdown value={selectedBreed} onChange={(e) => setSelectedBreed(e.value)} options={breeds} optionLabel="name" placeholder="Select a Breed" 
                            filter className="w-full h-12" panelClassName='w-2 mt-1' />
                            <label htmlFor="username">Animal Breed</label>
                        </div> */}
                        <div className="w-full p-float-label">
                            <InputNumber id="number-input" value={age} onChange={(e) => setAge(e.value)} inputClassName='border-none rounded-md h-12 w-full' />
                            <label htmlFor="number-input">Age</label>
                        </div>
                    </div>
                    <div className='w-full  grid grid-cols-2 gap-16'>
                        <div className="p-float-label w-full">
                            <InputText id="username" value={location} onChange={(e) => setLocation(e.target.value)} className='h-12 w-full'/>
                            <label htmlFor="username">Location</label>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-16'>
                        {/* <div className="w-1/2">
                            <Dropdown value={selectedSize} onChange={(e) => setSelectedSize(e.value)} options={sizes} optionLabel="name" 
                            placeholder="Select a Size" className='h-2/3' />
                        </div> */}
                        <div className='w-full p-float-label'>
                            <Dropdown value={selectedGoal} onChange={(e) => setSelectedGoal(e.value)} options={goals} optionLabel="name" 
                            placeholder="Sale/Adoption" className='h-12 w-full'/>
                            <label htmlFor="username">Sale/Adoption</label>
                        </div>
                        { selectedGoal === 'SALE' ? (
                            <div className="p-float-label w-full">
                                {/* <input type="number" id="number-input" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <label htmlFor="number-input">Price</label> */}
                                <InputNumber id="number-input" value={price} onChange={(e) => setPrice(e.value)} inputClassName='border-none rounded-md h-12 w-full' />
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
                        <FileUpload name="images" url={'/api/upload'} multiple accept="image/*" maxFileSize={10000000000} onSelect={handleFileUpload} emptyTemplate={<p className="w-full m-0">Drag and drop images to here to upload.</p>} />
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