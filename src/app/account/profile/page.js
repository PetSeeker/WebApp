"use client";
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import Image from 'next/image';
import imagexample from '../../../../public/images/userdefault1.png';
import axios from 'axios';
import { Label } from 'flowbite-react';

export default function AccountProfile(){

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [interests2, setInterests2] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState('');
    const [selectedInterests, setSelectedInterests] = useState(null);
    const interests = [
        { name: 'Dogs', value: 'Dogs'},
        { name: 'Cats', value: 'Cats'},
        { name: 'Birds', value: 'Birds'},
        { name: 'Horses', value: 'Horses'},
    ];

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setEmail(localStorage.getItem('email'));
        setUsername(localStorage.getItem('username'));
        if (token && window.location.pathname === '/account/profile') {
          setIsAuthenticated(true);
        } else if (window.location.pathname !== '/login') {
        setIsAuthenticated(false);
        }
    }, []);

      useEffect(() => {
        const email2 = localStorage.getItem('email');
        axios.get(`https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/get-user/${email2}`)
            .then((response) => {
                console.log("Resposta info utilizador:", response.data);
                if(response.data.firstName !== null){
                    setFirstName(response.data.first_name);
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

                // Extract the interests array from the response
                const interestsArray = response.data.interests;

                // Create an array of strings from the interests
                const ingredientsArray = interestsArray.map((interestObj) => interestObj.interest);

                // Set the ingredients state with the array of strings
                setIngredients(ingredientsArray);
  
            })
            .catch((error) => {
                console.log("Erro:", error);
            })
      }, []);
      
      async function sendData(){
        console.log("entrou");
        const formData = new FormData();
        const confirmed = window.confirm('Are you sure you want to edit your profile?');
        if(confirmed){
            const joinedValues = ingredients.join(',');

            formData.append('locality', location);
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('description', description);
            formData.append('interests', joinedValues);
            if (image instanceof File) {
                formData.append('image', image);
            }

            axios.put(`https://kov0khhb12.execute-api.eu-north-1.amazonaws.com/v1/edit-user-profile/${email}`, formData)
            .then((response) => {
                console.log("Resposta info editada do utilizador:", response.data);
                window.location.href = `/account/profile/${email}`;
            })
            .catch((error) => {
                console.log("Erro:", error);
            })
        }

        const formDataObject = {};
            formData.forEach((value, key) => {
            formDataObject[key] = value;
            });
            console.log("Form Data: ", formDataObject)
      }

      const toast = useRef(null);

      const handleFileUpload = (event) => {
        const selectedFiles = event.files;
      
        if (selectedFiles.length > 0) {
          const firstFile = selectedFiles[0];
          setImage(firstFile);
        }
      };

    

    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        setIngredients(_ingredients);
    }
    return (
<>
        {isAuthenticated === null ? ( // Display nothing or a loading indicator while checking authentication
        // Loading indicator or placeholder
        <p>Loading...</p>
        ) : isAuthenticated ? ( // Content for authenticated users
        <>
        <AnimatedText text='Edit Profile' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/>
        <Layout className='flex items-center justify-center'>
            <div className='w-2/3 grid grid-cols-3 gap-8 border-2 shadow-xl p-24 rounded-xl'>
                <div className='w-full col-span-2'>
                    <div className="w-full p-float-label">
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} className='h-12 w-full p-4' disabled  />
                        <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className='w-full bg-gray-100 row-span-4 grid grid-col-1 gap-2 items-center justify-center  p-float-label'>
                    <div className='w-full h-full'>
                        <Image
                        className='w-full h-full object-cover rounded-3xl shadow-lg'
                        src={image ? image : imagexample}
                        alt={'Animal Image'}
                        width={800}
                        height={800}
                        />
                    </div>
                    <div className='w-full items-center justify-center text-center'>
                        <Toast ref={toast}></Toast>
                        <FileUpload mode="basic" name="demo[]"  accept="image/*" maxFileSize={1000000} onSelect={handleFileUpload} chooseLabel='New Image'
                          className='mt-2' />
                    </div>
                </div>
                <div className='w-full col-span-2 '>
                    <div className="w-full p-float-label">
                        <InputText id="username" value={email} onChange={(e) => setEmail(e.target.value)} className='h-12 w-full p-4' disabled />
                        <label htmlFor="username">Email</label>
                    </div>
                </div>
                <div className='w-full'>
                    <div className="w-full p-float-label">
                        <InputText id="username" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='h-12 w-full p-4'/>
                        <label htmlFor="username">First Name</label>
                    </div>
                </div>
                <div className='w-full '>
                    <div className="w-full p-float-label">
                        <InputText id="username" value={lastName} onChange={(e) => setLastName(e.target.value)} className='h-12 w-full p-4'/>
                        <label htmlFor="username">Last Name</label>
                    </div>
                </div>
                <div className='w-full '>
                    <div className="w-full p-float-label">
                        <InputText id="username" value={location} onChange={(e) => setLocation(e.target.value)} className='h-12 w-full p-4'/>
                        <label htmlFor="username">Location</label>
                    </div>
                </div>
                <div className='w-full'>
                    <div className="card flex flex-wrap justify-content-center gap-3">
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient1" name="pizza" value="Dogs" onChange={onIngredientsChange} checked={ingredients.includes('Dogs')} />
                            <label htmlFor="ingredient1" className="ml-2">Dogs</label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient2" name="pizza" value="Cats" onChange={onIngredientsChange} checked={ingredients.includes('Cats')} />
                            <label htmlFor="ingredient2" className="ml-2">Cats</label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient3" name="pizza" value="Birds" onChange={onIngredientsChange} checked={ingredients.includes('Birds')} />
                            <label htmlFor="ingredient3" className="ml-2">Birds</label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient4" name="pizza" value="Horses" onChange={onIngredientsChange} checked={ingredients.includes('Horses')} />
                            <label htmlFor="ingredient4" className="ml-2">Horses</label>
                        </div>
                    </div>
                </div>
                <div className='w-full col-span-2'>
                    <div className="p-float-label w-full ">
                        <InputTextarea id="username" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} className='w-full rounded-xl min-h-full'/>
                        <label htmlFor="username">Description</label>
                    </div>
                </div>
                <div className='w-full'>

                </div>
                <div className='w-full '>
                    <div className="w-2/3 ">
                        <Button label="Edit Profile" icon="pi pi-check" className='p-3 bg-blue-500 text-white hover:bg-white hover:text-blue-500' text raised onClick={sendData}/>
                    </div>
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