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
import Animalpurchase from '../../public/images/animalpurchase.png'
import Animaladopt from '../../public/images/animaladopt.png'
import Animallost from '../../public/images/animallost1.jpeg'
import Animaldescription from '../../public/images/animaldescription.png'
import Customersupport from '../../public/images/customersupport1.png'
import Developer from '../../public/images/developer.png'
import Question from '../../public/images/question.png'
import { TabView, TabPanel } from 'primereact/tabview';
import 'primeicons/primeicons.css';
import { Card } from 'primereact/card';
import { motion } from 'framer-motion';
import {Button} from 'primereact/button';

export default function Home() {

  const header1 = (
    <Image alt="Card" src={Animalpurchase} />
  );
  const header2 = (
    <Image alt="Card" src={Animaladopt} />
  );
  const header3 = (
    <Image alt="Card" src={Animallost} />   
  );
  const header4 = (
    <Image alt="Card" src={Animaldescription} />
  );
  const header5 = (
    <Image alt="Card" src={Customersupport} />
  );
  const header6 = (
    <Image alt="Card" src={Developer} />
  );

  const fadeInVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
      },
    }
  }  

  const fadeOutVariants = {
    initial: {
      opacity: 0,
      y: 0,
    },
    animate: {
      opacity: 1,
      y: 150,
      transition: {
        duration: 1.5,
      },
    }
  } 

  const fadeOpacity = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 2.5,
      },
    }
  }

  return (
    <> 
      
      <Layout className='flex items-center justify-center flex-col bg-[url("../../public/images/teste.jpeg")] bg-no-repeat bg-cover bg-center'>
      <AnimatedText text='PetSeeker' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/>
      
        <div className='w-full flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl text-gray-300'>
          <h1>Find your new best friend here!</h1>
        </div>
        <div className='w-full flex flex-row mt-4 space-x-4'>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400 '>
            <a href='/'>
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Dog}
                priority={true}
                alt="Dog"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Dogs</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </motion.div>
            </a> 
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2  shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400'>
            <a href='/'>
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Cat}
                priority={true}
                alt="Cat"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Cats</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </motion.div>
            </a>  
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400'>
            <a href='/'>
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Bird}
                priority={true}
                alt="Bird"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Birds</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </motion.div>
            </a>       
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400'>
            <a href='/'>
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Horse}
                priority={true}
                alt="Horse"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Horses</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Search</span>
              </motion.div>
            </a>  
          </div>
        </div>
        <div className='w-full flex items-center justify-center mt-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl text-gray-300'>
         <Button label="And more ..." severity="secondary" rounded className='p-2 shadow-lg shadow-white hover:scale-105 bg-blue-400'/>
        </div>
        <div id='aboutus' className='w-full flex font-bold text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] items-center justify-center mt-8 text-gray-300'>
          About Our App
        </div>
        <div className='w-full flex flex-col bg-blue-200 bg-opacity-75 border border-solid rounded-2xl p-8 mt-4 shadow-xl shadow-blue-300 text-center'>
          <div className='w-full flex flex-col hover:scale-105 items-center justify-center bg-blue-300 bg-opacity-25 border-2 rounded-lg p-4'>
            <motion.h2 className='text-xl mb-4 underline decoration-sky-500'
            variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}
            >Welcome to <b className=''>PetSeeker</b>, where your journey to find the perfect animal companion begins.</motion.h2>
            <motion.h2 className='text-lg'
            variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}
            >We are more than just a platform, we are your partner in creating lifelong bonds and unforgettable memories.</motion.h2>
            <motion.h2 className='text-lg'  
            variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}
            >Our mission is to make the process of buying or adopting animals as joyful and seamless as possible. We are here to help you find the ideal furry friend, feathered companion, or scaly buddy that fits your lifestyle and fills your heart with love.</motion.h2> 
          </div>  
          <h1 className='text-2xl text-gray-500 mt-4 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-2'> What set us apart from others:</h1>
          <motion.div className='w-full flex hover:scale-105 items-center justify-center bg-blue-200 bg-opacity-0'
          variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}
          >
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
              <TabPanel header="5rd Point" leftIcon="pi pi-star mr-2">
                  <p className="m-0">
                  24 hour support from dedicated and knowledgeable people
                  </p>
              </TabPanel>
          </TabView>
          
          </motion.div> 
          <p className="text-gray-600 mt-6 text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Join us in this journey of love, compassion, and the joy of finding your perfect animal companion. Your next adventure awaits!</p>  
        </div> 
        </Layout>
        <Layout className='flex bg-light'>
          <motion.div className='w-2/3 flex-col bg-yellow-900 bg-opacity-10 p-12 space-y-4 border border-solid rounded-2xl hover:border-blue-500 text-xl
          shadow-md shadow-yellow-950 hover:scale-105' variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
            <h1 className='text-4xl font-bold mb-8'>Have one of the following questions? Our app is perfect for you!</h1>
            <ul className='list-disc space-y-4 underline decoration-yellow-700'>
              <li><h1>Ready to welcome a new member to your family or farm?</h1></li>
              <li><h1>Curious about the joy of adopting a new friend?</h1></li>
              <li><h1>Ready to reunite lost pets with their families?</h1></li>
              <li><h1>Curious about the stories behind these lovely animals?</h1></li>
              <li><h1>Need a helping hand on your pet journey?</h1></li>
            </ul>
            
          </motion.div>
          <motion.div className='w-1/3 translate-y-16' variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
            <Image
            className=''
            src={Question}
            priority={true}
            alt="Questions Image"
            />
          </motion.div>
        </Layout>
        <hr/>
        <Layout className='flex items-center justify-center'>
        {/* <Layout className='flex bg-[url("../../public/images/garden.png")] bg-no-repeat bg-cover bg-center items-center justify-center'> */}
          {/* <motion.div className='w-1/3' variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
            <Image
            className=''
            src={Services}
            priority={true}
            alt="Services"
            />
          </motion.div> */}
          <div className='w-2/3 flex-col'>
            <h1 className='text-4xl text-center font-bold'> Our Services</h1>
            <motion.div className='w-full flex mt-8' variants={fadeInVariants} initial="initial" whileInView="animate" viewport={{once:true,}}>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Pet Purchase" header={header1} className="h-full">
                  <p className="m-0">
                  Search for a wide variety of animals and purchase them from trusted breeders and licensed sellers.
                  </p>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Animal Adoption" header={header2} className="h-full">
                  <p className="m-0">
                  Discover and adopt a wide variety of animals 
                  </p>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Help Lost Animals" header={header3} className="h-full">
                  <p className="m-0">
                  Help reunite lost animals with their owners or find new homes for them
                  </p>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Animal Profiles" header={header4} className="h-full">
                  <p className="m-0">
                  Explore detailed profiles of animals, complete with photos and descriptions.
                  </p>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Custommer Support" header={header5} className="h-full">
                  <p className="m-0">
                  Access our customer support and help resources for a smooth experience.
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </Layout>
        <hr/>
        <Layout className='flex bg-light items-center justify-center'>
          <div className='w-2/3 flex-col'>
            <h1 className='text-4xl text-center font-bold'> Our Team</h1>
            <motion.div className='w-full flex mt-8 items-center justify-center' variants={fadeInVariants} initial="initial" whileInView="animate" viewport={{once:true,}}>
              <div className='w-1/4 mx-2 hover:scale-105 '>
                <Card title="Tiago Bastos" header={header6} className="">
                  <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem'}}></i></a>
                  <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Miguel Tavares" header={header6} className="">
                  <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                  <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="João Torrinhas" header={header6} className="">
                  <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                  <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
            </motion.div>
            <motion.div className='w-full flex mt-4 items-center justify-center' variants={fadeInVariants} initial="initial" whileInView="animate" viewport={{once:true,}}>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="Diogo Torrinhas" header={header6} className="">
                  <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                  <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
              <div className='w-1/4 mx-2 hover:scale-105'>
                <Card title="David Raposo" header={header6} className="">
                  <a href='www.facebook.com'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                  <a href='www.instagram.com'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.linkedin.com'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  <a href='www.github.com'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                </Card>
              </div>
            </motion.div>
          </div>
          {/* <motion.div className='w-1/3 mt-16 items-center justify-center' variants={fadeOutVariants} initial="initial" whileInView="animate" viewport={{once:true,}}>
            <Image
            className=''
            src={Team}
            priority={true}
            alt="Team"
            />
          </motion.div> */}
        </Layout>
    
    </>
    
    
  )
}
