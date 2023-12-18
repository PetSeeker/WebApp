"use client";
import { useEffect, useState, useRef } from 'react';
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

    const isMountedRef = useRef<boolean>(true);
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
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [breed, setBreed] = useState<string>('');
    const [age, setAge] = useState<number | null>(null);
    const [location, setLocation] = useState<string>('');
    const [description, setDescription] = useState<string>('');
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
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            alert('You are not allowed to access this page as an admin');
            window.location.href = '/account/admin';
            return;
        }
        const token = localStorage.getItem('access_token');
        const email = localStorage.getItem('email');
        setEmail(email);
        if (token && window.location.pathname === '/createPub') {
          setIsAuthenticated(true);
        } else if (window.location.pathname !== '/login') {
            setIsAuthenticated(false);
        }
      }, []);

      useEffect(() => {
        // Define the API endpoint
        const apiUrl =
          `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings/id/${params.id}`;
    
        // Make the API call using Axios
        axios
          .get(apiUrl)
            .then((response) => {
                // Set the data in the state
                //const body = JSON.parse(response.data.body);
                console.log(response.data.listing);
                setListing(response.data.listing);
                
                // Set the state variables with the corresponding listing properties
                // only if they are not already set
                setName(response.data.listing.animal_name || '');
                setType(response.data.listing.animal_type || '');
                setBreed(response.data.listing.animal_breed || '');
                setAge(parseInt(response.data.listing.animal_age, 10) || null);
                setLocation(response.data.listing.location || '');
                setSelectedGoal(response.data.listing.listing_type || '');
                
    
                if (response.data.listing.animal_price === null) {
                    console.log("AQUIIIIIII")
                } else {
                    setPrice((prevPrice) => (prevPrice !== null ? prevPrice : parseInt(response.data.listing.animal_price, 10) || null));
                    console.log("AQUI É PARA VENDA---")
                }
    
                setDescription(response.data.listing.description || '');
                // ... set other state variables
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });
    }, [params.id]);

    const sendData = async () => {
        try {
            const formData = new FormData();
            formData.append('owner_email', email || ''); // Use an empty string if email is null
            formData.append('animal_name', name || '');
            formData.append('animal_type', type || '');
            formData.append('animal_breed', breed || '');
            formData.append('animal_age', age?.toString() || ''); // Convert age to string, use empty string if null
            formData.append('location', location || '');
            formData.append('listing_type', selectedGoal || '');
            formData.append('description', description || '');
            if (listing.animal_price !== null) {
                formData.append('animal_price', price?.toString() || ''); // Convert price to string, use empty string if null
            }
            // formData.append('images', images);
            // Append each file with the key 'images'
            images.forEach((image, index) => {
                formData.append('images', image, `image${index}`);
            });
            
            // Append price only if the liting type is 'sale'
            if (selectedGoal === 'SALE' && price !== null) {
                formData.append('animal_price', price.toString());
            }
            console.log(name)
            


            
            
            try {
                // Make the API call using axios
                const token = localStorage.getItem('access_token');
                console.log(params.id)
                const response = await axios.put(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings/${params.id}`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*',
                    'Authorizer': `${token}`,
                    }
                });
            
                // Handle the response
                console.log('API Response:', response.data);
                sendNot(name);
                } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
                
                }
            
        } catch (error: any) {
            // Handle errors
            //console.error('API Error:', error.response || error.message || error);
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
        };
        
        async function sendNot(name: string){
            const token3 = localStorage.getItem('access_token');
            const data = {
                "to_list": [email],
                "subject": "Publication Edited and sent to approvation",
                "message": `Your publication of animal: ${name} has been Edited and sent to approvation.`
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
                console.log('API Response Nots:', response.data);
                window.location.href = '/myListings';
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
        }

        const [tokenApiPetFinder, setTokenApiPetFinder] = useState(null);
        const [types, setTypes] = useState([]);
        const [breeds, setBreeds] = useState([]);
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
        
        useEffect(() => {
        axios.get('https://api.petfinder.com/v2/types', {
                headers: {
                    Authorization: `Bearer ${tokenApiPetFinder}`,
                },
            })
            .then((response) => {
                console.log(response);
                const fetchedTypes = response.data.types.map((type: any) => ({
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
        if (type === null) {
            return;
        }
        axios.get(`https://api.petfinder.com/v2/types/${type}/breeds`, {
                headers: {
                    Authorization: `Bearer ${tokenApiPetFinder}`,
                },
            })
            .then((response) => {
                console.log(response);
                const fetchedTypes = response.data.breeds.map((type: any) => ({
                    name: type.name,
                    value: type.name,
                    }));
                setBreeds(fetchedTypes);
                    
                console.log(fetchedTypes);
            })
            .catch((error) => {
                console.log(error);
            })
        
        }, [type]);

    return (
        <>
        {name === '' ? (
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : (
        <>
            <AnimatedText text={listing.animal_name} className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4 mt-8 '/>
            <Layout className='flex items-center justify-center flex-col'>
            <h1 className='text-center underline'>Change what you want about your publication</h1>
            <div className='lg:w-1/3 md:w-1/2 xs:w-full bg-gray-300 bg-opacity-50 border border-solid rounded-xl flex flex-col items-center justify-center p-8 space-y-6 shadow-lg'>
                    <div className='w-full grid grid-cols-2 gap-16 '>
                        <div className="w-full p-float-label">
                            <InputText id="username" value={name} onChange={(e) => setName(e.target.value)} className='h-12 w-full'  />
                            <label htmlFor="username">Animal Name</label>
                        </div>
                        <div className="p-float-label w-full">
                            {/* <InputText id="username" value={type} onChange={(e) => setType(e.target.value)} className='h-12 w-full' />
                            <label htmlFor="username">Animal Type</label> */}
                            <Dropdown value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="name" placeholder="Select a Type" 
                            filter className="w-full h-12" panelClassName='w-2 mt-1' />
                            <label htmlFor="username">Animal Type</label>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-16'>
                        {/* <div className="w-full p-float-label">
                            <InputText id="username" value={breed} onChange={(e) => setBreed(e.target.value)} className='h-12 w-full'/>
                            <label htmlFor="username">Breed</label>
                        </div> */}
                        {type ? (
                        <div className="w-full p-float-label">
                        <Dropdown
                            value={breed}
                            onChange={(e) => setBreed(e.value)}
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
                        </div>
                        { selectedGoal === 'SALE' ? (
                            <div className="p-float-label w-full">
                                <InputNumber id="number-input" value={price || 0} onChange={(e) => setPrice(e.value)} inputClassName='border-none rounded-md h-12 w-full' />
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