'use client';
import React from 'react'
import Image from 'next/image'
import PetSeekerlogo from '../../public/images/petSeekerlogo.png'
import {useState, useEffect, useRef} from 'react'
import {FaUserAlt} from 'react-icons/fa'
import axios from 'axios';

export const Navbar = () => {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const hasLoggedCode = useRef(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	const [token, setToken] = useState('');

	useEffect(() => {
		// Get the URLSearchParams from the current URL
		const searchParams = new URLSearchParams(window.location.search);
	
		// Retrieve the 'code' parameter
		const code = searchParams.get('code');
	
		if (code && !hasLoggedCode.current) {
			console.log(code);
			// Save the 'code' to your state or perform any actions with it
			hasLoggedCode.current = true;

			const CLIENT_ID = '4vfhkg69f4p5gufq53bpk0llo1'; // Your actual client ID
			const CLIENT_SECRET = 'jdspkdchsfjrlv9e3lccf4io2s8h9r6avpc5va58r99lqf5rmr0'; // Your actual client ID
			const token_data = {
				"grant_type": 'authorization_code',
				"client_id": CLIENT_ID,
				"code": code,
				"redirect_uri": 'http://localhost:3000/',
				// "client_secret": 'jdspkdchsfjrlv9e3lccf4io2s8h9r6avpc5va58r99lqf5rmr0'
			};
			const clientCredentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
			const base64Credentials = Buffer.from(clientCredentials).toString('base64');
			const headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': `Basic ${base64Credentials}`,
			};

			const formData = new URLSearchParams();
			formData.append('grant_type', token_data.grant_type);
			formData.append('client_id', token_data.client_id);
			formData.append('code', token_data.code);
			formData.append('redirect_uri', token_data.redirect_uri);

			console.log(token_data);
			axios.post('https://es-auth.auth.eu-north-1.amazoncognito.com/oauth2/token', formData, { headers })
			.then(response => {
				console.log('Token request was successful:', response.data);
				setToken(response.data.access_token);
				getUserInfo(response.data.access_token);
				setIsAuthenticated(true);
			})
			.catch(error => {
				console.error('Token request failed:', error);
			});
		} else {
			// If no 'code' is present, check local storage for authentication
			checkLocalStorage();
		}

	  }, []);

	function getUserInfo(token2){
		const headers = {
			'Authorization': `Bearer ${token2}`,
		  };

		  axios.get('https://es-auth.auth.eu-north-1.amazoncognito.com/oauth2/userInfo', { headers })
			.then(response => {
				console.log('User Info Request was successful:', response.data);
				setUsername(response.data.username);
				localStorage.setItem('username', response.data.username);
				localStorage.setItem('email', response.data.email);
			})
			.catch(error => {
				console.error('User Info Request failed:', error);
			});
	}

	function logout(){
		localStorage.removeItem('username');
		localStorage.removeItem('email');
		setIsAuthenticated(false);
	}

	function checkLocalStorage() {
		const storedUsername = localStorage.getItem('username');
		const storedEmail = localStorage.getItem('email');
	  
		if (storedUsername && storedEmail) {
		  // Both username and email are present in local storage
		  setUsername(storedUsername);
		  setEmail(storedEmail);
		  setIsAuthenticated(true);
		}
	  }

  return (

        <nav className="relative p-4 flex justify-between items-center bg-light shadow-xl rounded">
		<a className="text-3xl font-bold leading-none" href="/">
            <Image
                className='hover:scale-125'
                src={PetSeekerlogo}
                // layout="fill"
                width={100}
                priority={true}
                alt="Wish and Cook"
            />
		</a>
		<ul className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
			<li><a className="text-sm font-bold text-gray-400 hover:text-blue-500" href="/">Home</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm font-bold text-gray-400 hover:text-blue-500 " href="#aboutus">About Us</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm font-bold text-gray-400 hover:text-blue-500" href="#">Services</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm font-bold text-gray-400 hover:text-blue-500" href="#">Pricing</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm font-bold text-gray-400 hover:text-blue-500" href="#">Contact</a></li>
		</ul>
		{isAuthenticated ? (
			<div className="relative">
			<button
				onClick={toggleDropdown}
				className="text-white bg-gray-500 hover:text-black hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
				type="button"
			>
				{username} &nbsp;<FaUserAlt/>
				<svg
				className="w-2.5 h-2.5 ml-2.5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 10 6"
				>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="m1 1 4 4 4-4"
				/>
				</svg>
			</button>
			{isDropdownOpen && (
				<div className="z-10 absolute mt-2 bg-light w-full border border-solid rounded-xl">
					<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
						<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-200" >
							Profile
						</a>
						</li>
						<li>
						<a href="/myListings" className="block px-4 py-2 hover:bg-gray-200">
							My Listings
						</a>
						</li>
						<li>
						<a href="/account/settings" className="block px-4 py-2 hover:bg-gray-200">
							Settings
						</a>
						</li>
						<li>
						<a href="https://es-auth.auth.eu-north-1.amazoncognito.com/login?client_id=4vfhkg69f4p5gufq53bpk0llo1&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F" className="block px-4 py-2 hover:bg-gray-200" onClick={logout}>
							Sign out
						</a>
						</li>
					</ul>
				</div>
			)}
			</div>
		) : (
			<>
			<a className=" hidden lg:inline-block  lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="https://es-auth.auth.eu-north-1.amazoncognito.com/login?client_id=4vfhkg69f4p5gufq53bpk0llo1&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F">Sign In</a>
			{/* <a className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Sign up</a> */}
			</>
		) 	
		}
	</nav>
	
  
    
  )
}
