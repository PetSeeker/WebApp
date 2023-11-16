"use client";
import Layout from '@/components/Layout';
import AnimatedText from '@/components/AnimatedText';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function Sale(){

    const [listings, setListings] = useState([]);

    useEffect(() => {
        // Define the API endpoint
        const apiUrl =
          'https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/getListings?listing_type=SALE';
    
        // Make the API call using Axios
        axios
          .get(apiUrl)
          .then((response) => {
            // Set the data in the state
            const body = JSON.parse(response.data.body);
            setListings(body.listings);
            // Handle the response
            // Example: Log the information for each listing
            body.listings.forEach((listing, index) => {
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
          });
      }, []); // The empty dependency array ensures that the effect runs once after the initial render

    return(
        <>
        {listings.length === 0 ? (
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : (
            <>
            <AnimatedText text='Animals for Sale' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-12 mt-8 '/>
            <Layout className='flex items-center justify-center'>
                <div className='w-full grid grid-cols-3 gap-4 p-8'>
                {listings.map((listing, index) => (
                    <a href={`/animals/sale/${listing.listing_id}`}>
                        <div key={index} className='max-w-sm flex flex-col bg-gray-300 shadow-md border-1 border-solid rounded-xl
                        hover:scale-105
                        '>  
                            <h1 className='text-3xl my-2 font-bold text-center'>{listing.animal_name}</h1>
                            {listing.images.length > 0 ? (
                                <div className='w-full h-60 items-center justify-center text-center'>
                                    <img src={listing.images[0]} alt={"Animal Image"} className='w-full h-full object-cover'/>
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
                                    <p className='text-md font-semibold'>Animal Price</p>
                                    <p className='text-md'>{listing.animal_price}$</p>
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
                </div>
            </Layout>
        </>
        )}
        </>
    )
}