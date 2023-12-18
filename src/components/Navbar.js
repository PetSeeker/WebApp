'use client';
import React, { use } from 'react'
import Image from 'next/image'
import PetSeekerlogo from '../../public/images/petSeekerlogo.png'
import {useState, useEffect, useRef} from 'react'
import {FaUserAlt} from 'react-icons/fa'
import axios from 'axios';
import { Link, animateScroll as scroll } from "react-scroll";

export const Navbar = () => {

	const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
	const hasLoggedCode = useRef(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	const toggleDropdown2 = () => {
		setIsDropdownOpen2(!isDropdownOpen2);
	};

	useEffect(() => {

		async function getUserInfo(token2) {
			try {
				const response = await axios.get('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/auth/userInfo', {
				params: { access_token: token2 }
				});
				const responseBody = JSON.parse(response.data.body); // Parse the JSON response body
				const username = responseBody.username; // Extract the username
				console.log("AQUIIIIIIIIII:", responseBody);
				// Update the local storage first
				localStorage.setItem('username', username);
				localStorage.setItem('email', responseBody.email);
				checkIfAdmin(username);
				
				sendNot(responseBody.email, username, token2)
		
				// Then update the state
				setUsername(username);
				setEmail(responseBody.email);
			} catch (error) {
				console.error('User Info Request failed:', error);
			}
		}

		async function fetchData() {
			checkLocalStorage();
			// Get the URLSearchParams from the current URL
			const searchParams = new URLSearchParams(window.location.search);
			// Retrieve the 'code' parameter
			const code = searchParams.get('code');

			if (code && !hasLoggedCode.current && !localStorage.getItem('access_token')) {
				// Save the 'code' to your state or perform any actions with it
				hasLoggedCode.current = true;
	
				try {
					const response = await axios.post('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/auth/token', { code: code });
					// Handle the response data
					const responseBody = JSON.parse(response.data.body); // Parse the JSON response body
					const access_token = responseBody.access_token; // Extract the access_token
					setToken(access_token);
					localStorage.setItem('access_token', access_token);
					getUserInfo(access_token);
					//setIsAuthenticated(true);
					
				} catch (error) {
					// Handle any errors
					console.error('Error:', error);
				}
			}
		}
	
		fetchData();
	}, []);

	async function checkIfAdmin(username2) {
		await axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/admin/user/groups?username=${username2}`)
			.then(response => {
				// Handle the response data
				console.log('Response Data See If Admin:', response.data);
				if(response.data.body[0] == "Admin"){
					setIsAuthenticatedAdmin(true);
					localStorage.setItem('isAdmin', true);
				} else {
					setIsAuthenticatedAdmin(false);
					localStorage.setItem('isAdmin', false);
					setIsAuthenticated(true);
				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error:', error);
			});
	}

	
	
	
	function logout(){
		localStorage.removeItem('username');
		localStorage.removeItem('email');
		localStorage.removeItem('access_token');
		localStorage.removeItem('isAdmin');
		setUsername(''); // Set the username state to an empty string
		setEmail(''); // Set the email state to an empty string
		setIsAuthenticated(false);
		setIsAuthenticatedAdmin(false);
		window.location.href = "https://es-deti-petseeker1.auth.eu-north-1.amazoncognito.com/logout?client_id=6v6kkovri0s114olnbbqe4e2iq&logout_uri=https://main.dzgh2fc7t2w9u.amplifyapp.com/";
		//window.location.href = "https://es-deti-petseeker1.auth.eu-north-1.amazoncognito.com/logout?client_id=6v6kkovri0s114olnbbqe4e2iq&logout_uri=http://localhost:3000/";
	}

	async function checkLocalStorage() {
		const storedUsername = localStorage.getItem('username');
		const storedEmail = localStorage.getItem('email');
		const storedToken = localStorage.getItem('access_token');
		console.log(localStorage);
		if (storedUsername && storedEmail && storedToken) {
		  // Both username and email are present in local storage
		  setUsername(storedUsername);
		  setEmail(storedEmail);
		  setToken(storedToken);

		  
		  await axios.get(`https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/admin/user/groups?username=${storedUsername}`)
			.then(response => {
				// Handle the response data
				//console.log('Response Data See If Admin:', response.data);
				if(response.data.body[0] == "Admin"){
					setIsAuthenticatedAdmin(true);
					localStorage.setItem('isAdmin', true);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticatedAdmin(false);
					localStorage.setItem('isAdmin', false);
					setIsAuthenticated(true);
				}
			})
			.catch(error => {
				// Handle any errors
				console.error('Error:', error);
			});
		}
	}

		

	function signIn(){
		axios.get('https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/auth')
		.then(response => {
			// Handle the response data
			console.log('Response Data:', response.data);
			// Get the redirect URL from the response headers
			const redirectUrl = response.data.headers.Location;
			// Redirect to the received URL
			console.log('Redirecting to:', redirectUrl);
			window.location.href = redirectUrl;
		})
		.catch(error => {
			// Handle any errors
			console.error('Error:', error);
		});
	}

	async function sendNot(email3, username3,token3) {
		if (isAuthenticatedAdmin) {
			return;
		}
		try {
		  console.log("email3: ", email3);
		  const requestData2 = {
			email: email3,
		  };
	  
		  
		  const response = await axios.post(
			'https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/notifications/verify-and-add-email/',
			requestData2
			, {
				headers: {
					Authorizer: `${token3}`,
				}
			});
	  
		  // Handle the response data
		  console.log('API Response:', response.data);
		  // const responseBody = JSON.parse(response.data.body); // Parse the JSON response body
	  
		} catch (error) {
		  // Handle any errors
		  console.error('Error:', error);
		}
		//CREATE USER PROFILE
		try {
			const formData = new FormData();
			formData.append('username', username3);
			formData.append('email', email3);
			//formData.append('gender', "male");
		
			const response = await axios.post(
			  'https://gqt5g3f1h4.execute-api.eu-north-1.amazonaws.com/v1/profile',
			  formData
			  , {
				headers: {
					Authorizer: `${token3}`,
				}
			});
		
			// Handle the response data
			console.log('API Response of User Profile:', response.data);
			// const responseBody = JSON.parse(response.data.body); // Parse the JSON response body
		
		  } catch (error) {
			// Handle any errors
			console.error('Error:', error);
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
		<ul className="hidden lg:absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
			<li><a className="text-sm font-bold text-gray-400 hover:text-blue-500" href="/">Home</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li>
				<Link
					to="aboutus"
					className="text-sm font-bold text-gray-400 hover:text-blue-500 hover:cursor-pointer"
					smooth={true}
					duration={500}
				>
					About Us
				</Link>
			</li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li><a className="text-sm font-bold text-gray-400 hover:text-blue-500" href="/animals">Animals</a></li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li>
				<Link
					to="services"
					className="text-sm font-bold text-gray-400 hover:text-blue-500 hover:cursor-pointer"
					smooth={true}
					duration={500}
				>
					Services
				</Link>
			</li>
			<li className="text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
				</svg>
			</li>
			<li>
				<Link
					to="contacts"
					className="text-sm font-bold text-gray-400 hover:text-blue-500 hover:cursor-pointer"
					smooth={true}
					duration={500}
				>
					Contacts
				</Link>
			</li>
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
						<a href={`/account/profile/${email}`} className="block px-4 py-2 hover:bg-gray-200" >
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
						{/* <a href="https://es-auth.auth.eu-north-1.amazoncognito.com/login?client_id=4vfhkg69f4p5gufq53bpk0llo1&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmain.dzgh2fc7t2w9u.amplifyapp.com%2F" className="block px-4 py-2 hover:bg-gray-200" onClick={logout}>
							Sign out 																		
						</a> */}
						<span className="block px-4 py-2 hover:bg-gray-200 hover:cursor-pointer " onClick={logout}>
							Sign out 																		
						</span>
						</li>
					</ul>
				</div>
			)}
			</div>
		) : isAuthenticatedAdmin ? (
			<div className="relative">
			<button
				onClick={toggleDropdown2}
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
			{isDropdownOpen2 && (
				<div className="z-10 absolute mt-2 bg-light w-full border border-solid rounded-xl">
					<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
						<li>
						<a href="/account/admin" className="block px-4 py-2 hover:bg-gray-200">
							Admin Page
						</a>
						</li>
						<li>
						{/* <a href="https://es-auth.auth.eu-north-1.amazoncognito.com/login?client_id=4vfhkg69f4p5gufq53bpk0llo1&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmain.dzgh2fc7t2w9u.amplifyapp.com%2F" className="block px-4 py-2 hover:bg-gray-200" onClick={logout}>
							Sign out 																		
						</a> */}
						<span className="block px-4 py-2 hover:bg-gray-200 hover:cursor-pointer " onClick={logout}>
							Sign out 																		
						</span>
						</li>
					</ul>
				</div>
			)}
			</div>
		  ) : (
			<>
			  <button onClick={signIn}>
				<a className="  lg:inline-block  lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-300 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
				  Sign In
				</a>
			  </button>
			  {/* Add your Sign Up button or other content for non-authenticated users */}
			</>
		  )}
	</nav>

	
  
    
  )
}

