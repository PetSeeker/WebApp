'use client';
import React from 'react'
import Image from 'next/image'
import PetSeekerlogo from '../../public/images/petSeekerlogo.png'
import {useState, useEffect} from 'react'
import {FaUserAlt} from 'react-icons/fa'

export const Navbar = () => {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	// const [token, setToken] = useState('');

	// useEffect(() => {
	// 	const url = window.location.href;
	// 	const urlParams = new URLSearchParams(url);
	// 	const accessToken = urlParams.get('code');
	
	// 	if (accessToken) {
	// 	  setToken(accessToken);
	// 	}
	// }, []);
	
	// useEffect(() => {
	// 	if (token) {
	// 		setIsAuthenticated(true);
	// 	}
	// 	else{
	// 		setIsAuthenticated(false);
	// 	}
	// 	// Log the token when it changes
	// 	console.log("access-token:", token);
	// 	console.log("está autenticado: ", isAuthenticated);
	// }, [token, isAuthenticated]);

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
				User &nbsp;<FaUserAlt/>
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
						<a href="#" className="block px-4 py-2 hover:bg-gray-200">
							Sign out
						</a>
						</li>
					</ul>
				</div>
			)}
			</div>
		) : (
			<>
			<a className=" hidden lg:inline-block  lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="https://es-auth.auth.eu-north-1.amazoncognito.com/login?client_id=4vfhkg69f4p5gufq53bpk0llo1&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F">Sign In</a>
			{/* <a className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Sign up</a> */}
			</>
		) 	
		}
	</nav>
	
  
    
  )
}
