"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';

export default function SaleID({params}: {params: {id: string}}){


    const [listing, setListing] = useState({
        animal_age: '',
        animal_breed: '',
        animal_name: '',
        animal_price: null,
        animal_type: '',
        description: '',
        images: [],
        listing_id: '',
        listing_type: '',
        location: '',
        owner_email: '',
      });
    const [name, setName] = useState<string | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [breed, setBreed] = useState<string | null>(null);
    const [age, setAge] = useState<number | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [images, setImages] = useState([]);
    const handleFileUpload = (event: { files: any; }) => {
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

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token && window.location.pathname === '/createPub') {
          setIsAuthenticated(true);
        } else if (window.location.pathname !== '/login') {
            setIsAuthenticated(false);
        }
      }, []);

      useEffect(() => {
        // Define the API endpoint
        const apiUrl =
          `https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/getListingsID?listing_id=${params.id}`;
    
        // Make the API call using Axios
        axios
          .get(apiUrl)
            .then((response) => {
                // Set the data in the state
                const body = JSON.parse(response.data.body);
                console.log(body.listing);
                setListing(body.listing);
    
                // Set the state variables with the corresponding listing properties
                // only if they are not already set
                setName((prevName) => (prevName !== null ? prevName : body.listing.animal_name || ''));
                setType((prevType) => (prevType !== null ? prevType : body.listing.animal_type || ''));
                setBreed((prevBreed) => (prevBreed !== null ? prevBreed : body.listing.animal_breed || ''));
                setAge((prevAge) => (prevAge !== null ? prevAge : parseInt(body.listing.animal_age, 10) || null));
                setLocation((prevLocation) => (prevLocation !== null ? prevLocation : body.listing.location || ''));
                setSelectedGoal((prevSelectedGoal) => prevSelectedGoal || body.listing.listing_type);
    
                if (body.listing.animal_price === null) {
                    console.log("AQUIIIIIII")
                } else {
                    setPrice((prevPrice) => (prevPrice !== null ? prevPrice : parseInt(body.listing.animal_price, 10) || null));
                    console.log("AQUI É PARA VENDA---")
                }
    
                setDescription((prevDescription) => (prevDescription !== null ? prevDescription : body.listing.description || ''));
                // ... set other state variables
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });
    }, [params.id]);

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
            if(listing.animal_price !== null){
                formData.append('animal_price', price);
            }
            // formData.append('images', images);
            // Append each file with the key 'images'
            images.forEach((image, index) => {
                formData.append('images', image, `image${index}`);
            });
            
            // Append price only if the listing type is 'sale'
            if (selectedGoal === 'sale') {
                formData.append('animal_price', price);
            } 
            


            
            
            try {
                // Make the API call using axios
                const response = await axios.put(`https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/editListings/${params.id}`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    }
                });
            
                // Handle the response
                console.log('API Response:', response.data);
                sendNot();
                } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
                }
            
        } catch (error: any) {
            // Handle errors
            console.error('API Error:', error.response || error.message || error);
        }
        };
        
        async function sendNot(){
            const data = {
                "to": email,
                "subject": "Publication Edited",
                "message": "Your publication has been Edited"
            }
            console.log("email: ", email)
            try {
                // Make the API call using axios
                const response = await axios.post('https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/notification', data);
          
                // Handle the response
                console.log('API Response Nots:', response.data);
                // window.location.href = '/myListings';
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
        }

    return (
        <>
        {listing.animal_name === '' ? (
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : (
        <>
            <AnimatedText text={listing.animal_name} className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4 mt-8 '/>
            <Layout className='flex items-center justify-center flex-col'>
            <h1 className='text-center underline'>Change what you want about your publication</h1>
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
                                <InputNumber id="number-input" value={price || 0} onChange={(e) => setPrice(e.value)} />
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
                        <Button label="Update Listing" icon="pi pi-check" className='p-3 bg-blue-500 text-white hover:bg-white hover:text-blue-500' text raised onClick={sendData} />
                    </div>
                </div>
            </Layout>
        </>
        )}       
        </>
    )
}