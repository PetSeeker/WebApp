"use client";
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { FaRegBell } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { request } from 'http';

export default function AccountSettings(){
    
    const [isToggled, setIsToggled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [email, setEmail] = useState('');
    const [notification_preference, setNotification_preference] = useState('0');
    const isMountedRef = useRef(true);
    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    const [isLoading, setIsLoading] = useState(true);

    const handleApply = async () => {
        const token = localStorage.getItem('access_token');
        console.log("Estado atualizado:", isToggled);

        // Define requestData before the try block
        const requestData = {
            email: "",
            notification_preference: "",
        };
    
        try {
            const notificationPreferenceValue = isToggled ? '1' : '0';  
    
            // Update state and wait for it to be completed
            await new Promise(resolve => {
                setNotification_preference(prevNotification => {
                    requestData.email = email;
                    requestData.notification_preference = notificationPreferenceValue;
    
                    // Resolve the promise to indicate that state update is complete
                    resolve();
                    
                    return notificationPreferenceValue; // Update state with the latest value
                });
            });
    
            // Now, requestData should be updated
            console.log("email para enviar:", requestData.email);
            console.log("notification_preference para enviar:", requestData.notification_preference);
            console.log("token para enviar:", token);
            // Proceed with your API call
            const response = await axios.put(
                `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications/preference/${requestData.email}?notification_preference=${requestData.notification_preference}`,
                null,
                {
                  headers: {
                    Authorizer: `${token}`,  // Use Authorizer instead of Authorization
                  }
                }
              );
            console.log('Resposta:', response);
            window.location.reload();
        } catch (error) {
            console.log("Erro:", error);
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

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            alert('You are not allowed to access this page as an admin.');
            window.location.href = '/account/admin';
            return;
        }
        const token = localStorage.getItem('access_token');
        const email2 = localStorage.getItem('email');
        setEmail(email2);
        if (token && window.location.pathname === '/account/settings') {
            setIsAuthenticated(true);
        } else if (window.location.pathname !== '/login') {
            setIsAuthenticated(false);
        }
        console.log("Email:", email2);
        axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications/preference/${email2}`, {
            headers: {
                Authorizer: `${token}`,
            }
        })
            .then((response) => {
                console.log("Resposta:", response.data.users[0].notification_preference);
                if (response.data.users[0].notification_preference === 1) {
                    setIsToggled(true);
                } else {
                    setIsToggled(false);
                }
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
            .finally(() => {
                // Set loading state to false when the API call is complete
                setIsLoading(false);
            });
      }, []);

    
    return(
        
        <>
        {isAuthenticated === null ? ( // Display nothing or a loading indicator while checking authentication
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : isAuthenticated ? ( // Content for authenticated users
        <>
        <AnimatedText text='Account Settings' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-8 mt-8 '/>
        <Layout className='flex items-center justify-center'>
            <div className='lg:w-2/3  xs:w-full border border-solid rounded-xl bg-white flex-col p-4 shadow-lg'>
                <div className='w-full flex items-center justify-center flex-row '>
                    <div className='w-1/5'>
                        <FaRegBell className='text-3xl'/>
                    </div>
                    <div className='w-3/5 flex flex-col'>
                        <h1>Notifications</h1>
                        <h1>Get notifications from our app and other senders</h1>
                    </div>
                    <div className="w-1/5 flex items-center">
                        <label
                            htmlFor="auto-update"
                            className="mt-px ml-3 mb-0 cursor-pointer select-none font-light text-gray-700 mr-2"
                        >
                            Off/On
                        </label>
                        <div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
                        {isLoading ? (
                                // Render a loading state or spinner while waiting for the API call
                                <p>Loading...</p>
                            ) : (
                                // Render the input when isLoading is false
                                <input
                                    id="auto-update"
                                    type="checkbox"
                                    checked={isToggled}
                                    onChange={handleToggle}
                                    className="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-blue-gray-100 transition-colors duration-300 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                                />
                            )}
                            <label
                            htmlFor="auto-update"
                            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500"
                            >
                            <div
                                className="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
                                data-ripple-dark="true"
                            ></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='w-full items-end justify-end text-end mt-4'>
                    <button onClick={handleApply} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-16'>
                        Apply
                    </button>
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