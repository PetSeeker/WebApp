"use client";
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { FaRegIdCard } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Image from 'next/image'

export default function MyListings(){
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [email, setEmail] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setEmail(localStorage.getItem('email'));
        if (token && window.location.pathname === '/myListings') {
          setIsAuthenticated(true);
        } else if (window.location.pathname !== '/login') {
          setIsAuthenticated(false);
        }
      }, []);

      const [listings1, setListings1] = useState([]);
      const [listings2, setListings2] = useState([]);

    useEffect(() => {
        // Define the API endpoint
        console.log(email)
        if (email !== null){
            const apiUrl = `https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/getListingsUserEmail?user_email=${email}&listing_type=ADOPTION`;
        
            // Make the API call using Axios
            axios
            .get(apiUrl)
            .then((response) => {
                // Set the data in the state
                const body = JSON.parse(response.data.body);
                console.log(body.user_listings)
                setListings1(body.user_listings);
                // Handle the response
                // Example: Log the information for each listing
                body.user_listings.forEach((listing, index) => {
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

            //For Sale ------------------
            // Make the API call using Axios
            const apiUrl2 = `https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/getListingsUserEmail?user_email=${email}&listing_type=SALE`;

            axios
            .get(apiUrl2)
            .then((response) => {
                // Set the data in the state
                const body = JSON.parse(response.data.body);
                setListings2(body.user_listings);
                console.log("FOR SALE AFTER THIS LINE")
                // Handle the response
                // Example: Log the information for each listing
                body.user_listings.forEach((listing, index) => {
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
        }
      }, [email]); // The empty dependency array ensures that the effect runs once after the initial render

      const handleDeleteClick = (listingId, animalName) => {
        const confirmed = window.confirm('Are you sure you want to delete the publication?');
        
        if (confirmed) {
            // Perform the deletion logic here
            console.log('Delete confirmed for listing_id:', listingId);
            axios.delete('https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/deleteListings', {
                data: { listing_id: listingId },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                // Handle the response
                console.log('API response:', response.data);
                window.location.reload();
                sendNot(animalName);
            })
            .catch((error) => {
                // Handle errors
                console.error('API Error:', error.response || error.message || error);
            });
        } else {
          // Do nothing or handle cancellation
          console.log('Delete cancelled.');
        }
      };

      async function sendNot(animal){
        const data = {
            "to": email,
            "subject": "Publication Deleted",
            "message": `Your publication of animal: "${animal}", has been Edited`
        }
        console.log("email: ", email)
        try {
            // Make the API call using axios
            const response = await axios.post('https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/notification', data);
      
            // Handle the response
            console.log('API Response Nots:', response.data);
            window.location.href = '/myListings';
          } catch (error) {
            // Handle errors
            console.error('Error making API call:', error);
          }
    }
    
    return(
        <>
        {isAuthenticated === null ? ( // Display nothing or a loading indicator while checking authentication
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : isAuthenticated ? ( // Content for authenticated users
        <>
        <AnimatedText text='My Listings' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/>
        <div className='w-full flex ml-16'>
            <a href='/createPub'>
                <button
                    className="text-white bg-gray-500 hover:text-black hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    Create new publication &nbsp;<FaRegIdCard/>
                </button>
            </a>
            
        </div>
        <Layout className='flex items-center justify-center flex-col'>
            <h1 className='text-xl underline'>Your publications for Adoption</h1>
            <div className='w-full grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 justify-center items-center'>
                {listings1.map((listing, index) => (
                        <div key={index} className='max-w-sm flex flex-col bg-gray-300 shadow-md border-1 border-solid rounded-xl
                        hover:scale-105 hover:border-2 hover:border-gray-500 transition duration-300 ease-in-out
                        '>  
                            <div className='flex justify-between'>
                                    <button className='bg-gray-500 text-white px-4 rounded-md
                                    hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' onClick={() => handleDeleteClick(listing.listing_id, listing.animal_name)}>X</button>
                                    <a href={`/myListings/${listing.listing_id}`}><button className='bg-gray-500 text-white p-1 rounded-md
                                    hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black
                                    '>Edit Publication</button></a>
                                </div>
                            <h1 className='text-3xl my-2 font-bold text-center'>{listing.animal_name}</h1>
                            {listing.images.length > 0 ? (
                                <div className='w-full h-60 items-center justify-center text-center border-2 border-white'>
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
                ))}
            </div>
        </Layout>
        <hr/>
        <Layout className='flex items-center justify-center flex-col'>
            <h1 className='text-xl underline'>Your publications for Sale</h1>
            <div className='w-full grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 justify-center items-center'>
                {listings2.map((listing, index) => (
                        <div key={index} className='max-w-sm flex flex-col bg-gray-300 shadow-md border-1 border-solid rounded-xl
                        hover:scale-105 hover:border-2 hover:border-gray-500 transition duration-300 ease-in-out
                        '>  
                                <div className='flex justify-between'>
                                    <button className='bg-gray-500 text-white px-4 rounded-md
                                    hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' onClick={handleDeleteClick}>X</button>
                                    <a href={`/myListings/${listing.listing_id}`}><button className='bg-gray-500 text-white p-1 rounded-md
                                    hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black
                                    '>Edit Publication</button></a>
                                </div>

                            <h1 className='text-3xl my-2 font-bold text-center'>{listing.animal_name}</h1>
                            {listing.images.length > 0 ? (
                                <div className='w-full h-60 items-center justify-center text-center border-2 border-white'>
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
                ))}
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