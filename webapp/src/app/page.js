"use client";
import Image from 'next/image'
import Layout from '../components/Layout'
import AnimatedText from '../components/AnimatedText'
import Dog from '../../public/images/dog.png'
import Cat from '../../public/images/cat.png'
import Bird from '../../public/images/bird.png'
import Horse from '../../public/images/horse.png'
import Services from '../../public/images/services.png'
import Team from '../../public/images/team.png'
import { TabView, TabPanel } from 'primereact/tabview';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';

        

export default function Home() {

  const header1 = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );
  const header2 = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );
  const header3 = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );
  const header4 = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
  );
  

  return (
    <> 
      
      <Layout className='flex items-center justify-center flex-col bg-[url("../../public/images/teste.jpeg")] bg-no-repeat bg-cover'>
      <AnimatedText text='PetSeeker' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/>
      
        <div className='w-full flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl text-gray-300'>
          <h1>Find your new best friend here!</h1>
        </div>
        <div className='w-full flex flex-row mt-4 space-x-4'>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 '>
            <a href='/'>
              <div className="flex flex-col items-center">
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Dog}
                priority={true}
                alt="Dog"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Dogs</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </div>
            </a> 
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2  shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105'>
            <a href='/'>
              <div className="flex flex-col items-center">
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Cat}
                priority={true}
                alt="Cat"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Cats</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </div>
            </a>  
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105'>
            <a href='/'>
              <div className="flex flex-col items-center">
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Bird}
                priority={true}
                alt="Bird"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Birds</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </div>
            </a>       
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105'>
            <a href='/'>
              <div className="flex flex-col items-center">
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Horse}
                priority={true}
                alt="Horse"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Horses</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </div>
            </a>  
          </div>
        </div>
        <div className='w-full flex items-center justify-center mt-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl text-gray-300'>
          And more ... ! 
        </div>
        <div id='aboutus' className='w-full flex font-bold text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] items-center justify-center mt-8 text-gray-300'>
          About Our App
        </div>
        <div className='w-full flex flex-col bg-blue-200 bg-opacity-75 border border-solid rounded-2xl p-8 mt-4 shadow-xl shadow-blue-300 text-center'>
          <div className='w-full flex flex-col hover:scale-105 items-center justify-center bg-blue-300 bg-opacity-25 border-2 rounded-lg p-4'>
            <h2 className='text-lg'>Welcome to <b>PetSeeker</b>, where your journey to find the perfect animal companion begins.</h2>
            <h2 className='text-lg'>We are more than just a platform; we're your partner in creating lifelong bonds and unforgettable memories.</h2>
            <h2 className='text-lg'>Our mission is to make the process of adopting or buying animals as joyful and seamless as possible. We're here to help you find the ideal furry friend, feathered companion, or scaly buddy that fits your lifestyle and fills your heart with love.</h2> 
          </div>  
          <h1 className='text-2xl text-gray-500 mt-4 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-2'> What set us apart from others:</h1>
          <div className='w-full flex hover:scale-105 items-center justify-center bg-blue-200 bg-opacity-0'>
            {/* <ul className="text-gray-600 list-disc ml-6">
              <li className='underline text-lg'>A wide variety of animals available for purchase and adoption.</li>
              <li className='underline text-lg'>Comprehensive profiles and information to help you make informed decisions.</li>
              <li className='underline text-lg'>A community that shares your passion for responsible pet ownership.</li>
              <li className='underline text-lg'>A user-friendly and secure platform designed with your convenience in mind.</li>
            </ul> */}
            <TabView panelContainerClassName='shadow-md shadow-blue-500'>
              <TabPanel header="1st Point" leftIcon="pi pi-star mr-2" headerClassName='' >
                  <p className="m-0">
                  A wide variety of animals available for purchase and adoption.
                  </p>
              </TabPanel>
              <TabPanel header="2nd Point" leftIcon="pi pi-star mr-2">
                  <p className="m-0">
                  Comprehensive profiles and information to help you make informed decisions.
                  </p>
              </TabPanel>
              <TabPanel header="3rd Point" leftIcon="pi pi-star mr-2">
                  <p className="m-0">
                  A community that shares your passion for responsible pet ownership.
                  </p>
              </TabPanel>
              <TabPanel header="4rd Point" leftIcon="pi pi-star mr-2">
                  <p className="m-0">
                  A user-friendly and secure platform designed with your convenience in mind.
                  </p>
              </TabPanel>
          </TabView>
          </div> 
          <p className="text-gray-600 mt-6 text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Join us in this journey of love, compassion, and the joy of finding your perfect animal companion. Your next adventure awaits!</p>  
        </div> 
        </Layout>
        <Layout className='flex bg-light'>
          <div className='w-1/3'>
            <Image
            className=''
            src={Services}
            priority={true}
            alt="Horse"
            />
          </div>
          <div className='w-2/3 flex-col'>
            <h1 className='text-4xl text-center'> Our Services</h1>
            <div className='w-full flex mt-8'>
              <div className='w-1/4 mx-2 hover:scale-105 '>
                <Card title="Title" header={header1} className="">
                  <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                  </p>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Title" header={header2} className="">
                  <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                  </p>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Title" header={header2} className="">
                  <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                  </p>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Title" header={header2} className="">
                  <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </Layout>
        <hr/>
        <Layout className='flex bg-light'>
          <div className='w-2/3 flex-col'>
            <h1 className='text-4xl text-center'> Our Team</h1>
            <div className='w-full flex mt-8 items-center justify-center'>
              <div className='w-1/4 mx-2 hover:scale-105 '>
                <Card title="Tiago Bastos" header={header1} className="">
                <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem',transform: 'translate(0, -5px)'}}></i></a>
                <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Miguel Tavares" header={header2} className="">
                <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="João Torrinhas" header={header2} className="">
                <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
            </div>
            <div className='w-full flex mt-4 items-center justify-center'>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Diogo Torrinhas" header={header2} className="">
                  <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                  <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="xxxxxx" header={header2} className="">
                <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
            </div>
          </div>
          <div className='w-1/3 mt-16 items-center justify-center'>
            <Image
            className=''
            src={Team}
            priority={true}
            alt="Horse"
            />
          </div>
        </Layout>
    
    </>
    
    
  )
}
