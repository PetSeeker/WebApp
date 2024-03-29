"use client";
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import imagexample from '../../../../../public/images/userdefault1.png';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import Rating2 from '@mui/material/Rating';
import { ProgressBar } from 'primereact/progressbar';
import { ToastContainer, toast } from 'react-toastify';


export default function ProfileID({params}: {params: {id: string}}){

    const [email, setEmail] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [interests, setInterests] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [avgRating, setAvgRating] = useState(0);
    const [star1Percentage, setStar1Percentage] = useState(0);
    const [star2Percentage, setStar2Percentage] = useState(0);
    const [star3Percentage, setStar3Percentage] = useState(0);
    const [star4Percentage, setStar4Percentage] = useState(0);
    const [star5Percentage, setStar5Percentage] = useState(0);
    const userRatings = [];
    const [ratingValue, setRatingValue] = useState(0);
    const [giveRating, setGiveRating] = useState(false);
    const [ratingID, setRatingID] = useState('');
    const [editRating, setEditRating] = useState(0);
    const [ratingsCount, setRatingsCount] = useState(0);
    const [token, setToken] = useState('');
    const isMountedRef = useRef(true);
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedToken = localStorage.getItem('access_token'); 
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (storedToken) {
            setToken(storedToken);
        }
        
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const email = localStorage.getItem('email');
        console.log("AQUIIIIIIIIIII", token);
        let id = decodeURIComponent(params.id);
        axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/profile/${id}`)
            .then((response) => {
                console.log("Resposta info utilizador:", response.data);
                if(response.data.firstName !== null){
                    setFirstName(response.data.first_name);
                }
                if(response.data.firstName !== null){
                    setEmailUser(response.data.email);
                }
                if(response.data.lastName !== null){
                    setLastName(response.data.last_name);
                }
                if(response.data.locality !== null){
                    setLocation(response.data.locality);
                }
                if(response.data.description !== null){
                    setDescription(response.data.description);
                }
                setImage(response.data.image[0]);
                setInterests(response.data.interests);
                console.log("AQUIIII:", response.data.interests )
                axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/ratings?user_email=${response.data.email}&rater_email=${email}`, {
                    headers: {
                        Authorizer: `${token}`,
                    }
                })
                .then((response) => {
                    console.log("Resposta, ja deu rating?", response.data);
                    if(response.data.rating_id === null){
                        setGiveRating(false);
                        
                    } else {
                        setGiveRating(true);
                        setRatingID(response.data.rating_id);
                    }
                })
                .catch((error) => {
                    // console.log("Erro:", error);
                    if (error.response && error.response.status === 401 && isMountedRef.current) {
                        // Unauthorized, handle accordingly (e.g., redirect to login)
                        console.error('Unauthorized request:', error.message);
                        
                        
                      } else {
                        // Handle other errors
                        console.error('Error:', error.message);
                      }
                })
  
            })
            .catch((error) => {
                //console.log("Erro:", error);
                if (error.response && error.response.status === 401 && isMountedRef.current) {
                    // Unauthorized, handle accordingly (e.g., redirect to login)
                    console.error('Unauthorized request:', error.message);
                   
                    
                  } else {
                    // Handle other errors
                    console.error('Error:', error.message);
                  }
            })

        axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/ratings/user/${id}`)
            .then((response) => {
                console.log("Resposta info ratings", response.data);
                if(response.data.average_rating === null){
                    setAvgRating(0);
                } else {
                    setAvgRating(response.data.average_rating);
                }
                setStar1Percentage(response.data.star_percentages[0]);
                setStar2Percentage(response.data.star_percentages[1]);
                setStar3Percentage(response.data.star_percentages[2]);
                setStar4Percentage(response.data.star_percentages[3]);
                setStar5Percentage(response.data.star_percentages[4]);
                setRatingsCount(response.data.ratings_count);
                
                // Iterate through the array and save each user rating
                response.data.raters.forEach((item: any) => {
                    // Assuming each item has a user email and a rating
                    const userEmail = Object.keys(item)[0];
                    const userRating = item[userEmail];

                    // Save the user rating in the ratings object
                    // console.log("userEmail:", userEmail);
                    // console.log("userRating:", userRating);

                    // Create an object with email and rating properties
                    const userRatingObject = {
                        email: userEmail,
                        rating: userRating,
                    };

                    // Push the object into the userRatings array
                    userRatings.push(userRatingObject);
                    
                });

            // Set the user ratings state
            // setUserRatings(ratings)
            })
            .catch((error) => {
                console.log("Erro:", error);
                if (error.response && error.response.status === 401 && isMountedRef.current) {
                    // Unauthorized, handle accordingly (e.g., redirect to login)
                    console.error('Unauthorized request:', error.message);
                    
                    
                  } else {
                    // Handle other errors
                    console.error('Error:', error.message);
                  }
            })
        
      }, [token,email,emailUser, params.id]);


    async function sendRating() {
        let username = localStorage.getItem('username');
        if(username === 'adminpetseeker'){
            alert('You are not allowed to rating as admin');
            setVisible2(false);
            setRatingValue(0);
            return;
        }
        const formData = new FormData();
        console.log("user_email:", emailUser);
        console.log("rater_email:", email);
        formData.append('user_email', emailUser);
        formData.append('rating', ratingValue.toString());
        formData.append('rater_email', email);
        // Log FormData entries
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        
        axios.post(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/ratings`, formData, {
            headers: {
                Authorizer: `${token}`,
            }
        })
        .then((response) => {
            console.log("Resposta info criar rating", response.data);
            setVisible(false);
            window.location.reload();
        })
        .catch((error) => {
            //console.log("Erro:", error);
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
        })
    }

    async function updateRating(ratingID: string) {
        console.log("EditRating:", editRating);
        const formData = new FormData();
        formData.append('rating', editRating.toString());
        await axios.put(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/ratings/${ratingID}`, formData, {
            headers: {
                Authorizer: `${token}`,
            }
        })
            .then((response) => {
                console.log(response.data);
                setVisible(false);
                window.location.reload();
            })
            .catch((error) => {
                //console.log("Erro:", error);
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
            })
    }

    async function deleteRating(ratingID: string) {
        const confirmed = window.confirm('Are you sure you want to delete your rating?');
        if (!confirmed) {
            window.location.reload();
        } else {
            await axios.delete(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/ratings/${ratingID}`, {
                headers: {
                    Authorizer: `${token}`,
                }
            })
            .then((response) => {
                console.log(response.data);
                setVisible(false);
                window.location.reload();
            })
            .catch((error) => {
                //console.log("Erro:", error);
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
            })
        } 
    }

    async function getRatingIDValue(ratingID: string) {
        console.log("TOKEN", token);
        await axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/ratings/${ratingID}`, {
            headers: {
                Authorizer: `${token}`,
            }
        })
            .then((response) => {
                console.log(response.data.rating)
                setEditRating(response.data.rating);
                
            })
            .catch((error) => {
                //console.log("Erro:", error);
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
            })
    }

    return(
        <>
            <AnimatedText text='User Profile' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-8 mt-8 '/> 
            <Layout className='flex items-center justify-center'>
                <div className='lg:w-3/4 md:w-full sm:w-full grid lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-1  gap-4 p-2 rounded-xl'>
                    <div className='w-full border-2 shadow-md p-4 grid grid-col-1 gap-2 text-center items-center justify-center
                    rounded-xl'>
                        <Image  src={image ? image : imagexample} width={200} height={200} className='rounded-full translate-x-3' alt='profile image'/>
                        <h1 className='text-2xl font-bold text-center'>{firstName} {lastName}</h1>
                        <h3 className=' text-xl text-center'>{location}</h3>
                    </div>
                    <div className='w-full border-2 shadow-md col-span-2 grid grid-cols-1  p-8 rounded-xl'>
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Full Name</h3>
                            <h3>{firstName} {lastName}</h3>
                        </div> 
                        <hr className='my-3' />
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Email</h3>
                            <h3>{emailUser}</h3>
                        </div> 
                        <hr className='my-3'/>
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Address</h3>
                            <h3>{location}</h3>
                        </div>
                        <hr className='my-3'/>
                        <div className='w-full grid grid-cols-2'>
                            <h3 className='font-bold'>Interests</h3>
                            {interests.length > 0 && (
                            <h3>{interests.map((interestObj: { interest: string }, index: number) => interestObj.interest).join(', ')}</h3>
                            )}
                        </div>
                        <hr className='my-3'/>
                        <div className='w-full grid grid-cols-2'>
                            <div className='w-full items-center justify-center'>
                                <h3 className='font-bold mt-4'>Description</h3>
                            </div>
                            <div className='w-full'>
                                <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} className='p-4 hover:bg-gray-500 hover:text-white'/>
                                <Dialog header="Description" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                                    <p className="m-0">
                                    {description}
                                    </p>
                                </Dialog>
                            </div>    
                        </div> 
                        {email === emailUser ? (
                            <>
                                <hr />
                                <div className='w-full grid grid-cols-2 mt-4'>
                                    <div className='w-2/3'>
                                        <a href='/account/profile'><Button label="Edit" className='p-3 bg-blue-500 text-white hover:bg-white hover:text-blue-500 px-8' text raised/></a>
                                    </div>   
                                </div>
                            </>   
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {/* <div className='w-full border-2 shadow-xl p-4 grid gap-2 items-center justify-center
                    rounded-xl'> */}
                   
                    <div className='w-full border-2 shadow-md lg:col-span-3 md:col-span-3 xs:col-span-3 p-4 grid grid-cols-3 gap-2 items-center justify-center
                    rounded-xl'>
                        <div className='w-full grid grid-cols-1 gap-2 items-center justify-center'> 
                            {/* { avgRating === 0 ? (} */}
                            <h1 className='text-5xl text-center'>{avgRating.toFixed(1)}</h1>
                            <div className='w-full items-center justify-center text-center'>
                                <Rating2 name="half-rating" value={avgRating} precision={0.5} readOnly />
                            </div>
                            <h3 className='text-center'>Average Rating</h3>
                            <div className='w-full text-black text-opacity-50'>
                                <h4 className='text-center'>Ratings Count: {ratingsCount}</h4>
                            </div>
                            
                        </div>
                        <div className='w-full col-span-2 grid grid-cols-1 gap-2'>
                            <div className='w-full grid grid-cols-3 gap-2'>
                                <div className='w-full col-span-2'>
                                    <ProgressBar value={star5Percentage} />
                                </div>
                                <Rating2 name="half-rating" value={5} precision={0.5} readOnly />
                                <div className='w-full col-span-2'>
                                    <ProgressBar value={star4Percentage} />
                                </div>
                                <Rating2 name="half-rating" value={4} precision={0.5} readOnly />
                                <div className='w-full col-span-2'>
                                    <ProgressBar value={star3Percentage} />
                                </div>
                                <Rating2 name="half-rating" value={3} precision={0.5} readOnly />
                                <div className='w-full col-span-2'>
                                    <ProgressBar value={star2Percentage} />
                                </div>
                                <Rating2 name="half-rating" value={2} precision={0.5} readOnly />
                                <div className='w-full col-span-2'>
                                    <ProgressBar value={star1Percentage} />
                                </div>
                                <Rating2 name="half-rating" value={1} precision={0.5} readOnly />
                            </div>
                        </div>
                        <div className='w-full col-span-2'> 
                        </div>
                        {email !== emailUser ? (
                            <>
                                {giveRating === false ? (
                                    <>
                                        <div className='w-full text-right mt-2 '> 
                                            <Button label="Give a Rating" icon="pi pi-external-link" onClick={() => setVisible2(true)} className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 -translate-x-5'/>
                                            <Dialog header="Give Rating" visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
                                                <div className='m-0 flex flex-col'>
                                                    <div className='w-full text-center'>
                                                        <Rating2
                                                        name="simple-controlled"
                                                        value={ratingValue !== null ? ratingValue : 0}
                                                        onChange={(event, newValue) => {
                                                            setRatingValue(newValue !== null ? newValue : 0);
                                                        }}
                                                        />
                                                    </div>
                                                <div className='w-full text-right'>
                                                        <Button label="Submit" icon="pi pi-external-link" onClick={sendRating} 
                                                        className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 -translate-x-5'
                                                        />
                                                </div>
                                                </div>
        
                                            </Dialog>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='w-full text-right mt-2 '> 
                                            <Button label="Edit Rating" icon="pi pi-external-link" onClick={() => {setVisible2(true); getRatingIDValue(ratingID)}} className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 -translate-x-5'/>
                                            <Dialog header="Edit Rating" visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
                                                <div className='m-0 flex flex-col'>
                                                    <div className='w-full text-center'>
                                                        <Rating2
                                                        name="simple-controlled"
                                                        value={editRating !== null ? editRating : 0}
                                                        onChange={(event, newValue) => {
                                                            setEditRating(newValue !== null ? newValue : 0);
                                                        }}
                                                        />
                                                    </div>
                                                <div className='w-full text-right mt-2'>
                                                        <Button label="Submit" icon="pi pi-external-link"  onClick={() =>updateRating(ratingID)} 
                                                        className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 -translate-x-5'
                                                        />
                                                        <Button label="Delete Rating"  onClick={() =>deleteRating(ratingID)} 
                                                        className=' ml-2 p-2 bg-red-500 text-white hover:bg-white hover:text-red-500 -translate-x-5'
                                                        />
                                                </div>
                                                </div>
        
                                            </Dialog>
                                        </div>
                                    </>
                                )}
                            </>
                            
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </Layout>
            
        </>
              
    )
}