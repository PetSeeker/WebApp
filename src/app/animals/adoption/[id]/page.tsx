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
import Image from 'next/image';
import { InputTextarea } from 'primereact/inputtextarea';
import imagexample from '../../../../../public/images/userdefault1.png';
import React from 'react';

export default function AdoptionID({params}: {params: {id: string}}){

    const [email, setEmail] = useState('');
    const [reply, setReply] = useState('');
    const [comment, setComment] = useState('');
    const [editReply, setEditReply] = useState('');
    const [editComment, setEditComment] = useState('');
    type ReplyDialogsState = {
        [key: string]: boolean;
    };
    const [replyDialogs, setReplyDialogs] = useState<ReplyDialogsState>({});

    type editReplyDialogsState = {
        [key: string]: boolean;
    };
    const [editReplyDialogs, setEditReplyDialogs] = useState<editReplyDialogsState>({});

    interface ShowRepliesMap {
        [key: string]: boolean;
    }

    type editCommentDialogsState = {
        [key: string]: boolean;
    };
    const [editCommentDialogs, setEditCommentDialogs] = useState<editCommentDialogsState>({});
    

    const openReplyDialog = (commentId: string) => {
    setReplyDialogs((prevDialogs) => ({
        ...prevDialogs,
        [commentId]: true,
    }));
    };
    
    const closeReplyDialog = (commentId: string) => {
    setReplyDialogs((prevDialogs) => ({
        ...prevDialogs,
        [commentId]: false,
    }));
    };

    const openEditReplyDialog = (replyId: string) => {
        setEditReplyDialogs((prevDialogs) => ({
            ...prevDialogs,
            [replyId]: true,
        }));
    };
    const closeEditReplyDialog = (replyId: string) => {
        setEditReplyDialogs((prevDialogs) => ({
            ...prevDialogs,
            [replyId]: false,
        }));
        };

    const openEditCommentDialog = (commentId: string) => {
        setEditCommentDialogs((prevDialogs) => ({
            ...prevDialogs,
            [commentId]: true,
        }));
    };
    const closeEditCommentDialog = (commentId: string) => {
        setEditCommentDialogs((prevDialogs) => ({
            ...prevDialogs,
            [commentId]: false,
        }));
        };
    const [showReplies, setShowReplies] = useState(false);
    const [showRepliesMap, setShowRepliesMap] = useState<ShowRepliesMap>({});
    const toggleReplies = (commentId: string) => {
        setShowRepliesMap(prevState => ({
          ...prevState,
          [commentId]: !prevState[commentId],
        }));
      };
    const [profileImages, setProfileImages] = useState<ProfileImages>({});
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
          `https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/listings/id/${params.id}`;
    
        // Make the API call using Axios
        axios
          .get(apiUrl)
            .then((response) => {
                // Set the data in the state
                //const body = JSON.parse(response.data.body);
                console.log(response.data.listing);
                setListing(response.data.listing);
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });
        }, [params.id]); // The empty dependency array ensures that the effect runs once after the initial render

        
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
        const [visible3, setVisible3] = useState(false);

        useEffect(() => {
            const storedEmail = localStorage.getItem('email');
            setEmail(storedEmail || ''); // Use an empty string as a default value if storedEmail is null
        }, []);

        //comments --------------------------------------------------
        interface Reply {
            reply_id: string;
            reply: string;
            commenter_email: string;
            created_at: string;
          }
          
          interface Comment {
            comment_id: string;
            comment: string;
            commenter_email: string;
            created_at: string;
            image: string; // Add this line for the image URL
            replies?: Reply[];
          }

          interface ProfileImages {
            [email: string]: string | undefined;
          }

        const [comments, setComments] = useState<Comment[]>([]);
        useEffect(() => {

            axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/comments/listing/${params.id}`)
            .then((response) => {
                console.log("API COMMENTS RESPONSE:", response.data.listing_data)
                setComments(response.data.listing_data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        }, []); // The empty dependency array ensures that the effect runs once after the initial render

        useEffect(() => {
            const fetchProfileImage = async (email: string) => {
              try {
                const response = await axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/profile/${email}`);
                console.log("API PROFILE IMAGE RESPONSE:", response);
                setProfileImages(prevImages => ({
                  ...prevImages,
                  [email]: response.data.image[0],
                }));
              } catch (error) {
                console.error(`Error fetching image for ${email}:`, error);
              }
            };
        
            // Fetch profile images for each email in comments
            comments.forEach(comment => {
              fetchProfileImage(comment.commenter_email);
              if (comment.replies) {
                comment.replies.forEach(reply => {
                  fetchProfileImage(reply.commenter_email);
                });
              }
            });
          }, [comments]); // Run only once when the component mounts

        async function sendReply(commentID: string){
            let email = localStorage.getItem('email');
            let isAdmin = localStorage.getItem('isAdmin');
            if (!email) {
                alert('Please log in to comment');
                closeReplyDialog(commentID)
                setReply('');
                return;
            }
            if(isAdmin === 'true'){
                alert('You are not allowed to comment as admin');
                closeReplyDialog(commentID)
                setReply('');
                return;
            }
            const token3 = localStorage.getItem('access_token');
            console.log("TOKEN", token3);
            // Assuming you want to provide a default email if localStorage.getItem('email') is null
            email = email || '';
            const formData = new FormData();
            formData.append('commenter_email', email);
            formData.append('reply', reply);
            await axios.post(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/comments/${commentID}/replies`, formData,{
                headers: {
                    Authorizer: `${token3}`,
                }
            })
            .then((response) => {
                console.log("API POST REPLY RESPONSE", response);
                window.location.reload();
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }

        async function deleteReply(commentID: string, replyID: string){
            const confirmed = window.confirm('Are you sure you want to delete the reply?');
            let email = localStorage.getItem('email');
            const token3 = localStorage.getItem('access_token');
            // Assuming you want to provide a default email if localStorage.getItem('email') is null
            email = email || '';
            if (!confirmed) {
                return;
            }
            await axios.delete(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/comments/${commentID}/replies/${replyID}`,{
                headers: {
                    Authorizer: `${token3}`,
                }
            })
            .then((response) => {
                console.log("API DELETE REPLY RESPONSE", response);
                window.location.reload();
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }

        async function sendEditedReply(commentID: string, replyID: string){
            let email = localStorage.getItem('email');
            const token3 = localStorage.getItem('access_token');
            const formData = new FormData();
            formData.append('new_reply', editReply);
            // Assuming you want to provide a default email if localStorage.getItem('email') is null
            email = email || '';
            await axios.put(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/comments/${commentID}/replies/${replyID}`,formData,{
                headers: {
                    Authorizer: `${token3}`,
                }
            })
            .then((response) => {
                console.log("API EDITED REPLY RESPONSE", response);
                window.location.reload();
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }

        async function deleteComment(commentID: string){
            const confirmed = window.confirm('Are you sure you want to delete your comment?');
            let email = localStorage.getItem('email');
            const token3 = localStorage.getItem('access_token');
            // Assuming you want to provide a default email if localStorage.getItem('email') is null
            email = email || '';
            if (!confirmed) {
                return;
            }
            await axios.delete(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/comments/${commentID}`,{
                headers: {
                    Authorizer: `${token3}`,
                }
            })
            .then((response) => {
                console.log("API DELETE COMMENT RESPONSE", response);
                window.location.reload();
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }

        async function sendEditedComment(commentID: string){
            let email = localStorage.getItem('email');
            const token3 = localStorage.getItem('access_token');
            email = email || '';
            const formData = new FormData();
            formData.append('new_comment', editComment);
            // Assuming you want to provide a default email if localStorage.getItem('email') is null
            email = email || '';
            await axios.put(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/comments/${commentID}`,formData,{
                headers: {
                    Authorizer: `${token3}`,
                }
            })
            .then((response) => {
                console.log("API EDITED COMMENT RESPONSE", response);
                window.location.reload();
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }

        async function createComment(){
            let email = localStorage.getItem('email');
            let isAdmin = localStorage.getItem('isAdmin');
            if (!email) {
                alert('Please log in to comment');
                setVisible3(false);
                setComment('');
                return;
            }
            if(isAdmin === 'true'){
                alert('You are not allowed to comment as admin');
                setVisible3(false);
                setComment('');
                return;
            }
            const token3 = localStorage.getItem('access_token');
            email = email || '';
            const formData = new FormData();
            formData.append('commenter_email', email);
            formData.append('comment', comment);
            formData.append('listing_id', params.id);


            // Assuming you want to provide a default email if localStorage.getItem('email') is null
            email = email || '';
            await axios.post(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/comments/`,formData,{
                headers: {
                    Authorizer: `${token3}`,
                }
            })
            .then((response) => {
                console.log("API ADD COMMENT RESPONSE", response);
                sendNotification();
                
                
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            
        }

        async function sendNotification(){
            const token3 = localStorage.getItem('access_token');
            const data = {
                "to_list": [listing.owner_email],
                "subject": "Your animal publication has been commented",
                "message": `Your animal publication ${listing.animal_name} has one more comment. Check it out!`
            }
            try {
                // Make the API call using axios
                const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications', data, {
                    headers: {
                        Authorizer: `${token3}`,
                    }
                });
          
                // Handle the response
                console.log('API Response:', response.data);
                window.location.reload();
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
        }

        async function sendAdoptNotification(){
            const user = localStorage.getItem('email');
            if (!user) {
                alert('Please log in to adopt');
                return;
            }
            console.log(user);
            console.log(listing.owner_email);
            if(listing.owner_email === user){
                alert('You cannot adopt your own animal');
                return;
            }
            const confirm = window.confirm('Are you sure you want to adopt this animal? An email will be sent to the owner!');
            if (!confirm) {
                return;
            }
            const token3 = localStorage.getItem('access_token');
            
            const data = {
                "to_list": [listing.owner_email],
                "subject": "You have an interested adopter!",
                "message": `You have an interested adopter for ${listing.animal_name}, the person email is ${user}. Contact the person when possible!`
            }
            console.log("DATA", data);
            try {
                // Make the API call using axios
                const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications', data, {
                    headers: {
                        Authorizer: `${token3}`,
                    }
                });
          
                // Handle the response
                console.log('API Response:', response.data);
              } catch (error) {
                // Handle errors
                console.error('Error making API call:', error);
              }
              const data2 = {
                "to_list": [user],
                "subject": "An adoption request has been sent to the owner!",
                "message": `You have sent an adoption request for ${listing.animal_name}, the owner email is ${listing.owner_email}. Wait for the owner to contact you!`
            }
            try {
                // Make the API call using axios
                const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications', data2, {
                    headers: {
                        Authorizer: `${token3}`,
                    }
                });
          
                // Handle the response
                console.log('API Response:', response.data);
                window.location.reload();
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
            <AnimatedText text={listing.animal_name + ""} className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-4 mt-8 '/>
            <Layout className='flex items-center justify-center flex-col text-center'>
                <div className='w-1/3'>
                {listing.images && listing.images.length > 0 ? (
                    <Slider {...settings} className="hover:scale-105">
                    {listing.images.map((image: string, index: number) => (
                        <div key={index} className='bg-white border-4 border-gray-500 rounded-xl'>
                        <Image
                        className='w-full h-96 object-cover'
                        src={image}
                        alt={`${listing.animal_name} Image ${index + 1}`}
                        width={600}
                        height={600}
                        />
                        </div>
                    ))}
                    </Slider>
                ) : (
                    <p>Loading</p>
                )}
                </div>
                <div className='mt-16'>
                    <h1 className='text-xl underline font-bold'>Animal Information</h1>
                </div>
                <div className='w-2/3 mt-2 bg-black'>
                    <table className="table-auto border-separate border border-slate-500 bg-white w-full hover:scale-105">
                        <thead>
                            <tr>
                            <th className="border border-slate-600">Animal Name</th>
                            <th className="border border-slate-600">Animal Type</th>
                            <th className="border border-slate-600">Animal Breed</th>
                            <th className="border border-slate-600">Animal Age</th>
                            <th className="border border-slate-600">Location</th>
                            <th className="border border-slate-600">Owner Profile</th>
                            <th className="border border-slate-600">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="border border-slate-700 p-2">{listing.animal_name}</td>
                            <td className="border border-slate-700 p-2">{listing.animal_type}</td>
                            <td className="border border-slate-700 p-2">{listing.animal_breed}</td>
                            <td className="border border-slate-700 p-2">{listing.animal_age}</td>
                            <td className="border border-slate-700 p-2">{listing.location}</td>
                            <td className="border border-slate-700 p-2">
                            <a href={`/account/profile/${listing.owner_email}`}><Button label="Owner Profile" className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 ' text raised/></a>
                            </td>
                            <td className="border border-slate-700 p-2">
                            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500' text raised/>
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
                {/* <div className='w-2/3 bg-white grid grid-cols-8 gap-2'>
                    <div className='w-full'>
                        
                    </div>
                </div> */}
                    <div className='w-2/3 mt-3 text-start grid grid-cols-2 gap-2'>
                        <div className='w-full text-start'>
                            <Button label="Add a Comment" icon="pi pi-file-edit" 
                            onClick={() => {
                                setVisible3(true);
                                }}
                            className='p-1 bg-gray-500 text-white hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' text raised/>
                            <Dialog header="Add a Comment" visible={visible3} style={{ width: '50vw' }} onHide={() => setVisible3(false)}>
                                <div className='w-full grid grid-cols-1 gap-2'>
                                    <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={5} cols={30} className='border-2 rounded-xl' />   
                                    <Button label="Send Comment" className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 ' text raised onClick={() => createComment()}/>
                                </div>
                            </Dialog>
                        </div>
                        <div className='w-full text-end'>
                            <Button label="Adopt animal" icon="pi pi-heart" 
                            onClick={() => sendAdoptNotification()}
                            className='p-1 bg-gray-500 text-white hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' text raised/>
                        </div>
                    </div>
                    { comments.length === 0 && (
                        <div className='w-2/3 bg-white mt-3 items-center justify-center
                        p-4 border-2 rounded-xl shadow-md  overflow-y-scroll'>
                            <div className='w-full bg-gray-300 p-2 border-1 rounded-xl shadow-md '>
                                <p>No comments yet</p>
                            </div>
                        </div>
                    )}
                    {comments.map(comment => (
                        <div key={comment.comment_id} className='w-2/3 bg-white grid grid-cols-8 gap-2 mt-3 items-center justify-center
                        p-4 border-2 rounded-xl shadow-md  overflow-y-scroll'>
                            <div className='w-full grid grid-cols-8 gap-2 col-span-8 border-b-4 border-gray-400'>
                                { email === comment.commenter_email && (
                                    <div className='w-full col-span-8 grid grid-cols-2'>
                                        <div className='w-full text-start mt-2'>
                                            {/* <button className='bg-gray-500 text-white px-2 rounded-md 
                                    hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' onClick={() => deleteComment(comment.comment_id)}>X</button> */}
                                        </div>
                                        <div className='w-full text-end mt-2'>
                                            <Button label="Edit Comment" icon="pi pi-file-edit" 
                                            onClick={() => {
                                                openEditCommentDialog(comment.comment_id);
                                                // Add your additional function call here
                                                setEditComment(comment.comment);
                                                }}
                                            className='p-1 bg-gray-500 text-white hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' text raised/>
                                            <Dialog header="Edit Comment" visible={editCommentDialogs[comment.comment_id] || false} style={{ width: '50vw' }} onHide={() => closeEditCommentDialog(comment.comment_id)}>
                                            <div className='w-full grid grid-cols-1 gap-2'>
                                                <InputTextarea value={editComment} onChange={(e) => setEditComment(e.target.value)} rows={5} cols={30} className='border-2 rounded-xl' />   
                                                <Button label="Send Edited Comment" className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 ' text raised onClick={() => sendEditedComment(comment.comment_id)}/>
                                                <Button label="Delete your comment" className='p-2 bg-red-500 text-white hover:bg-white hover:text-red-500 ' text raised onClick={() => deleteComment(comment.comment_id)}/>
                                            </div>
                                            </Dialog>
                                        </div>
                                    </div>
                                )}
                                <div className='w-full col-span-2 '>
                                <a href={`/account/profile/${comment.commenter_email}`} className='flex text-center items-center justify-center'>
                                    <Image
                                    className='w-full h-48 object-cover rounded-full'
                                    // src={image2}
                                    src = {profileImages[comment.commenter_email] || imagexample}
                                    alt={`${comment.commenter_email} Image`}
                                    width={500}
                                    height={500}
                                    style={{ height: '120px', width: '120px' }} // Adjust the height and width as needed
                                    />
                                </a>
                                </div>
                                <div className='w-full  flex flex-col col-span-6 text-left justify-center items-center mt-4'>
                                    <div className='w-full bg-gray-300 flex flex-col p-2 border-1 rounded-xl shadow-md '>
                                        <p>{comment.comment}</p>
                                        <p className='text-end mt-4 text-black text-opacity-0'>{comment.commenter_email}</p> 
                                    </div>
                                    <div className='w-full text-end'>
                                        <p className='text-end mt-6 text-black text-opacity-50'>
                                        {new Date(comment.created_at).toISOString().split('T')[0]}{' '}
                                        {new Date(comment.created_at).toISOString().split('T')[1].split('.')[0]}
                                        </p>
                                    </div>  
                                </div>
                                <div className='w-full col-span-4 text-end '>
                                    <button onClick={() => toggleReplies(comment.comment_id)} className='text-black text-opacity-50 hover:scale-105 hover:text-blue-500'>
                                    {showRepliesMap[comment.comment_id] ? 'Hide Replies' : 'Show Replies'}
                                    </button>
                                </div>     
                                <div className='w-full col-span-4 text-end mb-2 '>
                                    <Button label="Add a Reply" icon="pi pi-external-link" onClick={() => openReplyDialog(comment.comment_id)} className='p-1 bg-gray-500 text-white hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' text raised/>
                                    <Dialog header="Add a Reply" visible={replyDialogs[comment.comment_id] || false} style={{ width: '50vw' }} onHide={() => closeReplyDialog(comment.comment_id)}>
                                        <div className='w-full grid grid-cols-1 gap-2'>
                                            <InputTextarea value={reply} onChange={(e) => setReply(e.target.value)} rows={5} cols={30} className='border-2 rounded-xl' />   
                                            <Button label="Send Reply" className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 ' text raised onClick={() => sendReply(comment.comment_id)}/> 
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                            {showRepliesMap[comment.comment_id] && (
                                <>
                                    {comment.replies && comment.replies.length > 0 ? (
                                        comment.replies.map((reply, index) => (
                                            <React.Fragment key={index}>
                                                { email === reply.commenter_email && (
                                                <div className='w-full col-span-8 grid grid-cols-2'>
                                                    <div className='w-full text-start mt-2'>
                                                        {/* <button className='bg-gray-500 text-white px-2 rounded-md 
                                                hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' onClick={() => deleteReply(comment.comment_id, reply.reply_id)}>X</button> */}
                                                    </div>
                                                    <div className='w-full text-end mt-2'>
                                                        <Button label="Edit reply" icon="pi pi-file-edit" 
                                                        onClick={() => {
                                                            openEditReplyDialog(reply.reply_id);
                                                            // Add your additional function call here
                                                            setEditReply(reply.reply);
                                                          }}
                                                        className='p-1 bg-gray-500 text-white hover:bg-gray-300 hover:text-black hover:border-2 hover:border-black' text raised/>
                                                        <Dialog header="Edit Reply" visible={editReplyDialogs[reply.reply_id] || false} style={{ width: '50vw' }} onHide={() => closeEditReplyDialog(reply.reply_id)}>
                                                        <div className='w-full grid grid-cols-1 gap-2'>
                                                            <InputTextarea value={editReply} onChange={(e) => setEditReply(e.target.value)} rows={5} cols={30} className='border-2 rounded-xl' />   
                                                            <Button label="Send Edited Reply" className='p-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 ' text raised onClick={() => sendEditedReply(comment.comment_id, reply.reply_id)}/>
                                                            <Button label="Delete Your Reply" className='p-2 bg-red-500 text-white hover:bg-white hover:text-red-500 ' text raised onClick={() => deleteReply(comment.comment_id, reply.reply_id)}/>
                                                        </div>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                                )}
                                                <div className='w-full col-span-1'>
                                                
                                                </div>
                                                <div className='w-full col-span-2'>
                                                    <a href={`/account/profile/${reply.commenter_email}`} className='flex text-center items-center justify-center'>
                                                        <Image
                                                        className='w-full h-48 object-cover rounded-full'
                                                        //src={image2}
                                                        src = {profileImages[reply.commenter_email] || imagexample}
                                                        alt={`${reply.commenter_email} Image`}
                                                        width={500}
                                                        height={500}
                                                        style={{ height: '120px', width: '120px' }} // Adjust the height and width as needed
                                                        />
                                                    </a>     
                                                </div>  
                                                <div className='w-full col-span-5 text-left flex flex-col justify-center items-center mt-4'>
                                                
                                                    <>
                                                        <div key={reply.reply_id} className='w-full bg-gray-300 flex flex-col p-2 border-1 rounded-xl shadow-md '>
                                                            <p>{reply.reply}</p>
                                                            <p className='text-end mt-4 text-black text-opacity-0'>{reply.commenter_email}</p>
                                                        </div>
                                                        <div className='w-full text-end'>
                                                            <p className='text-end mt-6 text-black text-opacity-50'>
                                                            {new Date(reply.created_at).toISOString().split('T')[0]}{' '}
                                                            {new Date(reply.created_at).toISOString().split('T')[1].split('.')[0]}
                                                            </p>
                                                        </div>
                                                    </>
                                                </div>
                                                <div className='w-full col-span-8 border-b-2 border-dray-200'>
                                                </div>
                                                
                                            </React.Fragment>
                                    ))
                                    ) : (
                                    <div className='w-full col-span-8 mt-4'>
                                        <p>No replies yet.</p>
                                    </div>
                                    )}
                                    
                                </>
                            )}
                        </div>
                    ))}

                    
              
            

            </Layout>
            </>
        )
        }    
        </>
    )
}