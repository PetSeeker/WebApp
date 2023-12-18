"use client";
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Image from 'next/image';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';

export default function Adoption(){

    const [loading, setLoading] = useState(true); // Add loading state
    const [listings, setListings] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const types = [
        { name: 'All animals', value: 'All Animals'},
        { name: 'Dogs', value: 'Dog'},
        { name: 'Cats', value: 'Cat'},
        { name: 'Birds', value: 'Bird'},
        { name: 'Horses', value: 'Horse'},
        { name: 'Rabbits', value: 'Rabbit'},
        { name: 'Small & Furry', value: 'Small & Furry'},
        { name: 'Scales, Fins & Other', value: 'Scales, Fins & Other'},
        { name: 'Barnyard', value: 'Barnyard'},
    ];

    const [selectedOrder, setSelectedOrder] = useState(null);
    const orders = [
        { name: 'Order by', value: 'Order by'},
        { name: 'Best Ratings', value: 'Best Ratings'},
    ];
   

    useEffect(() => {
        // Define the base API endpoint
        let apiUrl = 'https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings?listing_type=ADOPTION&listing_status=ACCEPTED';
    
        // Function to make the final API call
        const makeFinalApiCall = (url) => {
            console.log("AQUI URL ATUALIZADO", url);
            axios.get(url)
                .then((response) => {
                    // Set the data in the state
                    setListings(response.data.listings);
    
                    // Handle the response
                    response.data.listings.forEach((listing, index) => {
                        console.log(`Listing ${index + 1}:`);
                        console.log(`Listing ID: ${listing.listing_id}`);
                        console.log(`Owner Email: ${listing.owner_email}`);
                        console.log(`Animal Type: ${listing.animal_type}`);
                        console.log(`Animal Breed: ${listing.animal_breed}`);
                        console.log(`Animal Age: ${listing.animal_age}`);
                        console.log(`Animal Name: ${listing.animal_name}`);
                        console.log(`Location: ${listing.location}`);
                        console.log(`Listing Type: ${listing.listing_type}`);
                        console.log(`Animal Price: ${listing.animal_price}`);
                        console.log(`Description: ${listing.description}`);
    
                        // Images
                        if (listing.images.length > 0) {
                            console.log('Images:');
                            listing.images.forEach((image, imageIndex) => {
                                console.log(`Image ${imageIndex + 1}: ${image}`);
                            });
                        } else {
                            console.log('No images available.');
                        }
    
                        console.log('\n'); // Add a separator between listings for better readability
                    });
                })
                .catch((error) => {
                    console.error('Error fetching data:', error.message);
                })
                .finally(() => {
                    // Set loading to false when the API call is complete
                    setLoading(false);
                });
        };
    
        // Function to handle the second API call based on selectedType
        const handleSecondApiCall = (url, type) => {
            if (selectedOrder !== 'Order by' && selectedOrder !== null) {
                console.log("ENTROU NO BEST RATINGS AQUI URL ATUALIZADO:", url);
                axios.get('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/ratings/user')
                    .then((response) => {
                        const emailArray = response.data.users_ordered_by_rating;
                        const emailString = emailArray.join(',');
                        if (type !== undefined) {
                        url = `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings?listing_type=ADOPTION&animal_type=${type}&user_emails=${emailString}&listing_status=ACCEPTED`;
                        } else {
                            url = `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings?listing_type=ADOPTION&user_emails=${emailString}&listing_status=ACCEPTED`;
                        }
                        makeFinalApiCall(url);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error.message);
                        setLoading(false);
                    });
            } else {
                makeFinalApiCall(url);
            }
        };
    
        // Function to handle the first API call based on selectedType
        const handleFirstApiCall = () => {
            if (selectedType !== 'All Animals' && selectedType !== null) {
                apiUrl = `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings?listing_type=ADOPTION&animal_type=${selectedType}&listing_status=ACCEPTED`;
                if (selectedOrder !== 'Order by' && selectedOrder !== null) {
                    handleSecondApiCall(apiUrl, selectedType);
                } else {
                    makeFinalApiCall(apiUrl);
                }
            } else {
                
                handleSecondApiCall(apiUrl);
            }
        };
    
        // Make the first API call
        handleFirstApiCall();
    
    }, [selectedType, selectedOrder]); // The empty dependency array ensures that the effect runs once after the initial render

    return(
        <>
        {loading ? (
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : (
            <>
            <AnimatedText text='Animals for Adoption' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-12 mt-8 '/>
            <Layout className='flex flex-col items-center justify-center'>
                <div className='w-full flex flex-row justify-start items-center'>
                    {/* <h1 className='text-lg font-bold ml-8 mb-4'>Filter Listings</h1> */}
                    {/* <h1 className='text-xs  ml-20 '>Order by ratings?</h1> */}
                </div>
                <div className='w-full flex flex-row justify-start items-center p-float-label'>
                    <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types} optionLabel="name" placeholder="Select Type" 
                    filter className="w-1/8 h-12 ml-8" panelClassName='w-2 mt-1' />
                    <label className='ml-8' htmlFor="username">Select Type</label>
                    <div className='w-1/8 flex flex-col items-center p-float-label'>
                        {/* <label className='ml-24 -translate-y-9 text-xs' htmlFor="username">Order by Best Ratings</label>
                        <ToggleButton checked={checked} onChange={(e) => setChecked(e.value)} className='ml-8' /> */}
                        <Dropdown value={selectedOrder} onChange={(e) => setSelectedOrder(e.value)} options={orders} optionLabel="name" placeholder="Order by" 
                        filter className="w-1/8 h-12 ml-8" panelClassName='w-2 mt-1' />
                        <label className='ml-8' htmlFor="username">Order by</label>
                    </div>
                    
                </div>
                <div className='w-full grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 justify-center items-center'>
                {listings.length === 0 ? (
                    // No listings message or UI element
                    <p>No listings available for the selected filter.</p>
                 ) : (
                    <>
                {listings && listings.map((listing, index) => (
                    <a key={index} href={`/animals/adoption/${listing.listing_id}`}>
                        <div  className='max-w-sm flex flex-col bg-gray-300 shadow-md border-1 border-solid rounded-xl
                        hover:scale-105 hover:border-2 hover:border-gray-500 transition duration-300 ease-in-out
                        '>  
                            <h1 className='text-3xl my-2 font-bold text-center'>{listing.animal_name}</h1>
                            {listing.images.length > 0 ? (
                                <div className='w-full h-60 items-center justify-center text-center  border-2 border-white'>
                                    <Image
                                    className='w-full h-full object-cover'
                                    src={listing.images[0]}
                                    alt={'Animal Image'}
                                    width={500}
                                    height={500}
                                    />
                                </div>
                            ) : (
                                <div className='w-full h-60 bg-gray-300 flex items-center justify-center'>
                                    <span className='text-gray-500'>No Image Available</span>
                                </div>
                            )}
                            <hr/>
                            <div className='w-full max-w-md mx-auto p-6 bg-gray-300 grid grid-cols-2 gap-2'>
                                <div className='w-full mb-1'>
                                    <p className='text-md font-semibold'>Animal Type:</p>
                                    <p className='text-md'>{listing.animal_type}</p>
                                    <hr/>
                                    <p className='text-md font-semibold'>Animal Breed:</p>
                                    <p className='text-md'>{listing.animal_breed}</p>
                                    <hr/>
                                    <p className='text-md font-semibold'>Animal Age:</p>
                                    <p className='text-md'>{listing.animal_age}</p>
                                </div>
                                <div className='mb-1 w-full'>
                                    <p className='text-md font-semibold'>Location:</p>
                                    <p className='text-md'>{listing.location}</p>
                                    <hr/>
                                    <p className='text-md font-semibold'>Email to Contact:</p>
                                    <p className='text-md'>{listing.owner_email}</p>
                                    <hr/>
                                </div>                           
                            </div>
                            <div className='w-full mb-1'>
                                <Accordion >
                                    <AccordionTab header="Additional Description">
                                        <p className="m-0" >
                                            {listing.description}
                                        </p>
                                    </AccordionTab>
                                </Accordion>

                            </div>
                        </div>
                    </a>
                ))}
                </>
                )}
                </div>
            </Layout>
        </>
        )}
        </>
    )
}
    