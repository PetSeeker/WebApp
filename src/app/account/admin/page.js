"use client";
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

export default function AdminAccount(){
    
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [visible3, setVisible3] = useState(false);
    const [comment, setComment] = useState('');
    

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const email2 = localStorage.getItem('email');
        const isAdmin = localStorage.getItem('isAdmin');
        if (token && window.location.pathname === '/account/admin' && isAdmin === 'true') {
            setIsAuthenticated(true);
        } else{
            setIsAuthenticated(false);
        }
      }, []);

    const [listings1, setListings1] = useState([]);
    const [listings2, setListings2] = useState([]);

    useEffect(() => {
        // Define the API endpoint
        const email = localStorage.getItem('email');
        console.log(email)
        if (email !== null){
            const apiUrl = `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings?listing_type=ADOPTION&listing_status=PENDING`;
        
            // Make the API call using Axios
            axios
            .get(apiUrl)
            .then((response) => {
                // Set the data in the state
                console.log(response.data.listings);
                //const body = JSON.parse(response.data.body);
                setListings1(response.data.listings);
                // Handle the response
                // Example: Log the information for each listing
                // response.data.user_listings.forEach((listing, index) => {
                //     console.log(`Listing ${index + 1}:`);
                //     console.log(`Listing ID: ${listing.listing_id}`);
                //     console.log(`Owner Email: ${listing.owner_email}`);
                //     console.log(`Animal Type: ${listing.animal_type}`);
                //     console.log(`Animal Breed: ${listing.animal_breed}`);
                //     console.log(`Animal Age: ${listing.animal_age}`);
                //     console.log(`Animal Name: ${listing.animal_name}`);
                //     console.log(`Location: ${listing.location}`);
                //     console.log(`Listing Type: ${listing.listing_type}`);
                //     console.log(`Animal Price: ${listing.animal_price}`);
                //     console.log(`Description: ${listing.description}`);

                //     // Images
                //     if (listing.images.length > 0) {
                //     console.log('Images:');
                //     listing.images.forEach((image, imageIndex) => {
                //         console.log(`Image ${imageIndex + 1}: ${image}`);
                //     });
                //     } else {
                //     console.log('No images available.');
                //     }

                //     console.log('\n'); // Add a separator between listings for better readability
                // });
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });

            //For Sale ------------------
            // Make the API call using Axios
            const apiUrl2 = `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings?listing_type=SALE&listing_status=PENDING`;

            axios
            .get(apiUrl2)
            .then((response) => {
                // Set the data in the state
                //const body = JSON.parse(response.data.body);
                setListings2(response.data.listings);
                console.log(response.data);
                // Handle the response
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });
        }
      }, []); // The empty dependency array ensures that the effect runs once after the initial render

    async function handleAcceptClick(listingID, animalName, email2, type){
        const token3 = localStorage.getItem('access_token');
        console.log(listingID);
        const formData = new FormData();
        formData.append('listing_status', 'ACCEPTED');
        await axios.put(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings/${listingID}/status`, formData ,{
            headers: {
                Authorizer: `${token3}`,
            }
        })
        .then((response) => {
            console.log(response);
            sendNot(animalName, token3, email2, type)
            //window.location.reload();
        })
        .catch((error) => {
            console.error('Error fetching data:', error.message);
        });
    }

    const handleDeleteClick = (listingId, animalName, email2) => {
        const confirmed = window.confirm('Are you sure you want to reject this publication?');
        const token = localStorage.getItem('access_token');
        if (confirmed) {
            // Perform the deletion logic here
            console.log('Delete confirmed for listing_id:', listingId);
            axios.delete(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings/${listingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorizer': `${token}`,
                }
            })
            .then((response) => {
                // Handle the response
                console.log('API response:', response.data);
                sendNotRejection(animalName, token, email2);
                
            })
            .catch((error) => {
                // Handle errors
                // console.error('API Error:', error.response || error.message || error);
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
            });
        } else {
          // Do nothing or handle cancellation
          console.log('Delete cancelled.');
        }
      };

    async function sendNot(animal, token, email2, type){
        const data = {
            "to_list": [email2],
            "subject": "Publication Accepted and Published",
            "message": `Your publication of animal: ${animal}, has been accepted and published.`
        }
        
        try {
            // Make the API call using axios
            const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications', data, {
				headers: {
					Authorizer: `${token}`,
				}
			});
            // Handle the response
            console.log('API Response Nots:', response.data);
            try {
                let typetosearch = "";
                if(type === 'Dog'){
                    typetosearch = "Dogs";
                } else if(type === 'Cat'){
                    typetosearch = "Cats";
                } else if (type === 'Bird'){    
                    typetosearch = "Birds";
                } else if (type === 'Horse'){
                    typetosearch = "Horses";
                }
                else if (type === 'Rabbit'){
                    typetosearch = "Rabbits";
                }
                else if (type === 'Small & Furry'){
                    typetosearch = "Small & Furrys";
                }
                else if (type === 'Scales, Fins & Other'){
                    typetosearch = "Scales, Fins & Others";
                }
                else if (type === 'Barnyard'){
                    typetosearch = "Barnyards";
                }
                // Make the API call using axios
                console.log("TYPE TO SEARCH:", typetosearch);
                const response = await axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/profile/users/${typetosearch}`);
          
                // Handle the response
                console.log('API Response SEARCH USERS WITH INTEREST:', response.data);
                let emails = response.data;
                //window.location.href = '/myListings';
                try {
                    console.log("EMAILS: ", emails)
                    
                    const data2 = {
                        "to_list": emails,
                        "subject": `New Publication of your interest (${type})`,
                        "message": `A new publication of your interest: ${type}, with name ${animal} has been published in the webapp, check it out! `
                    }
                    // Make the API call using axios
                    const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications', data2, {
                        headers: {
                            Authorizer: `${token}`,
                        }
                    });
              
                    // Handle the response
                    console.log('API Response to all emails:', response.data);
                    
                  } catch (error) {
                    // Handle errors
                    console.error('Error making API call:', error);
                  }
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
            window.location.reload();
          } catch (error) {
            // Handle errors
            console.error('Error making API call:', error);
          }
    }

    async function sendNotRejection(animal, token, email2){
        const data = {
            "to_list": [email2],
            "subject": "Publication Rejected",
            "message": `Your publication of animal: ${animal}, has been rejected for that reason: ${comment}`
        }
       
        try {
            // Make the API call using axios
            const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications', data, {
				headers: {
					Authorizer: `${token}`,
				}
			});
            // Handle the response
            console.log('API Response Nots:', response.data);
            window.location.reload();
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
        <AnimatedText text='Admin Page' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-8 mt-8 '/>
        <Layout className='flex items-center justify-center flex-col'>
            <h1 className='text-xl underline'>Publications Pending for Adoption</h1>
            <div className='w-full grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 justify-center items-center'>
                {listings1 && listings1.map((listing, index) => (
                        <div key={index} className='max-w-sm flex flex-col bg-gray-300 shadow-md border-2 border-solid rounded-xl
                        hover:scale-105 hover:border-2 hover:border-gray-500 transition duration-300 ease-in-out 
                        '>  
                            <div className='flex justify-between'>
                                <Button label="Accept Listing" icon="" 
                                onClick={() => {
                                    handleAcceptClick(listing.listing_id, listing.animal_name, listing.owner_email, listing.animal_type);
                                    }}
                                className='p-1 bg-green text-white hover:bg-white hover:text-green hover:border-2 hover:border-green' text raised/>
                                <Button label="Reject Listing" icon="" 
                                onClick={() => {
                                    setVisible3(true);
                                    }}
                                className='p-1 bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500' text raised/>
                                <Dialog header="Reason of Rejection" visible={visible3} style={{ width: '50vw' }} onHide={() => setVisible3(false)}>
                                <div className='w-full grid grid-cols-1 gap-2'>
                                    <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={5} cols={30} className='border-2 rounded-xl' />   
                                    <Button label="Send Reason of Rejection" className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 ' text raised onClick={() => handleDeleteClick(listing.listing_id, listing.animal_name, listing.owner_email)}/>
                                </div>
                                </Dialog>
                            </div>
                            <h1 className='text-3xl my-2 font-bold text-center'>{listing.animal_name}</h1>
                            {listing.images.length > 0 ? (
                                <div className='w-full h-60 items-center justify-center text-center border-2 border-white'>
                                    <Image
                                    className='w-full h-full object-cover'
                                    src={listing.images[0]}
                                    //src="https://animals-man-bucket.s3.eu-north-1.amazonaws.com/c575b1cf-c223-413e-8fd2-0416b4f37a51_Untitled.jpeg"
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
            <h1 className='text-xl underline'>Publications Pending for Sale</h1>
            <div className='w-full grid gap-4 p-8 md:grid-cols-2 lg:grid-cols-3 xs:grid-cols-1 justify-center items-center'>
                {listings2 && listings2.map((listing, index) => (
                        <div key={index} className='max-w-sm flex flex-col bg-gray-300 shadow-md border-2 border-solid rounded-xl
                        hover:scale-105 hover:border-2 hover:border-gray-500 transition duration-300 ease-in-out border-yellow-400
                        '>  
                                <div className='flex justify-between'>
                                <Button label="Accept Listing" icon="" 
                                onClick={() => {
                                    handleAcceptClick(listing.listing_id, listing.animal_name, listing.owner_email, listing.animal_type);
                                    }}
                                className='p-1 bg-green text-white hover:bg-white hover:text-green hover:border-2 hover:border-green' text raised/>
                                <Button label="Reject Listing" icon="" 
                                onClick={() => {
                                    setVisible3(true);
                                    }}
                                className='p-1 bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500' text raised/>
                                <Dialog header="Reason of Rejection" visible={visible3} style={{ width: '50vw' }} onHide={() => setVisible3(false)}>
                                <div className='w-full grid grid-cols-1 gap-2'>
                                    <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={5} cols={30} className='border-2 rounded-xl' />   
                                    <Button label="Send Reason of Rejection" className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 ' text raised onClick={() => handleDeleteClick(listing.listing_id, listing.animal_name, listing.owner_email)}/>
                                </div>
                                </Dialog>
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
                <p className='text-bold text-5xl'>You are not the Admin.</p>
            </div>
        )}
        </>
    )

}