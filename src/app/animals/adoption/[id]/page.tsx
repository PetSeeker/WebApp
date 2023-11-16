"use client";
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


export default function AdoptionID({params}: {params: {id: string}}){

    // const [listing, setListing] = useState<any>({});
    const [listing, setListing] = useState({
        animal_age: null,
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
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });
        }, []); // The empty dependency array ensures that the effect runs once after the initial render

        
        const SamplePrevArrow = (props: any) => {
            const { onClick } = props;
            return <div className="slick-arrow slick-prev" onClick={onClick} style={{ color: 'red' }}>&#8592;</div>;
        };
        
        const SampleNextArrow = (props: any) => {
            const { onClick } = props;
            return <div className="slick-arrow slick-next" onClick={onClick}>&#8594;</div>;
        };
        
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: <SamplePrevArrow />,
            nextArrow: <SampleNextArrow />,
        };

        const [visible, setVisible] = useState(false);


    return (
        <>
        {listing.animal_name === '' ? (
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : (
            <>
            <AnimatedText text={listing.animal_name + ""} className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4 mt-8 '/>
            <Layout className='flex items-center justify-center flex-col text-center'>
                <div className='w-1/3'>
                {listing.images && listing.images.length > 0 ? (
                    <Slider {...settings} className="hover:scale-105">
                    {listing.images.map((image: string, index: number) => (
                        <div key={index} className='bg-white border-4 border-gray-500 rounded-xl'>
                        <img className='w-full h-96 object-cover' src={image} alt={`${listing.animal_name} Image ${index + 1}`} />
                        </div>
                    ))}
                    </Slider>
                ) : (
                    <p>Loading</p>
                )}
                </div>
                <div className='w-2/3 mt-16 bg-black'>
                    <table className="table-auto border-separate border border-slate-500 bg-white w-full hover:scale-105">
                        <thead>
                            <tr>
                            <th className="border border-slate-600">Animal Name</th>
                            <th className="border border-slate-600">Animal Type</th>
                            <th className="border border-slate-600">Animal Breed</th>
                            <th className="border border-slate-600">Animal Age</th>
                            <th className="border border-slate-600">Location</th>
                            <th className="border border-slate-600">Owner Email</th>
                            <th className="border border-slate-600">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="border border-slate-700">{listing.animal_name}</td>
                            <td className="border border-slate-700">{listing.animal_type}</td>
                            <td className="border border-slate-700">{listing.animal_breed}</td>
                            <td className="border border-slate-700">{listing.animal_age}</td>
                            <td className="border border-slate-700">{listing.location}</td>
                            <td className="border border-slate-700">{listing.owner_email}</td>
                            <td className="border border-slate-700">
                            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} className='p-4 hover:bg-gray-500 hover:text-white'/>
                            <Dialog header="Description" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                <p className="m-0">
                                {listing.description}
                                </p>
                            </Dialog>

                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </Layout>
            </>
        )
        }    
        </>
    )
}