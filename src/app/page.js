"use client";
import Image from 'next/image'
import Layout from '../components/Layout'
import AnimatedText from '../components/AnimatedText'
import Dog from '../../public/images/dog.png'
import Cat from '../../public/images/cat2.png'
import Bird from '../../public/images/bird3.png'
import Horse from '../../public/images/horse.png'
import Services from '../../public/images/services.png'
import Team from '../../public/images/team.png'
import Animalpurchase from '../../public/images/animalpurchase-removebg-preview.png'
import Animaladopt from '../../public/images/animaladopt.png'
import Animallost from '../../public/images/animallost1.jpeg'
import Animaldescription from '../../public/images/animaldescription.png'
import Customersupport from '../../public/images/customersupport1.png'
import Developer from '../../public/images/developer.png'
import Question from '../../public/images/question3.png'
import Ratings from '../../public/images/rating2-removebg-preview.png'
import user1 from '../../public/images/user1.jpeg'
import user2 from '../../public/images/user2.png'
import user3 from '../../public/images/user3.jpg'
import user4 from '../../public/images/user4.png'
import user5 from '../../public/images/user5.jpg'
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
    <Image alt="Card" src={Ratings} className='mb-16 translate-y-8' />
  );
  const header6 = (
    <Image alt="Card" src={user3} className=' w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid mt-4' />
  );
  const header7 = (
    <Image alt="Card" src={user1} className=' w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid mt-4' />
  );
  const header8 = (
    <Image alt="Card" src={user4} className=' w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid mt-4'/>
  );
  const header9 = (
    <Image alt="Card" src={user5} className=' w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid mt-4' />
  );
  const header10 = (
    <Image alt="Card" src={user2} className=' w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid mt-4' />
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
      <Layout className='flex items-center justify-center flex-col bg-[url("../../public/images/imageteste.png")] bg-no-repeat bg-cover bg-center'>
      <AnimatedText text='PetSeeker' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-16 mt-8 '/>
      
        <div className='w-full flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl text-gray-300'>
          <h1>Find your new best friend here!</h1>
        </div>
        <div className='w-full flex flex-row mt-4 space-x-4'>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400 '>
            {/* <a href='/'> */}
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Dog}
                priority={true}
                alt="Dog"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Dogs</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400"></span>
              </motion.div>
            {/* </a>  */}
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2  shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400'>
            {/* <a href='/'> */}
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Cat}
                priority={true}
                alt="Cat"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Cats</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400"></span>
              </motion.div>
            {/* </a>   */}
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400'>
            {/* <a href='/'> */}
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Bird}
                priority={true}
                alt="Bird"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Birds</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400"></span>
              </motion.div>
            {/* </a>        */}
          </div>
          <div className='w-1/4 flex flex-col mt-2 bg-sage2 bg-opacity-80 p-2 shadow-xl shadow-white border border-solid rounded-2xl hover:scale-105 hover:border-blue-400'>
            {/* <a href='/'> */}
              <motion.div className="flex flex-col items-center" variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
                <Image
                className='w-32 h-32 mb-2 rounded-full shadow-lg object-cover border-2 border-solid'
                src={Horse}
                priority={true}
                alt="Horse"
                />
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">Horses</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400"></span>
              </motion.div>
            {/* </a>   */}
          </div>
        </div>
        <div className='w-full flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-300 mt-6'>
          <h3>and much more ...</h3>
        </div>
        <div className='w-full flex items-center justify-center mt-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl text-white'>
          <a href='/animals'>
          <Button label="See our animals" severity="secondary" rounded className='p-2 shadow-lg shadow-white hover:scale-105 bg-sage2 bg-opacity-80'/>
          </a>
        </div>
        </Layout>
        <Layout className='flex bg-light items-center justify-center'>
          <motion.div id="aboutus" className='w-2/3 flex-col bg-gray-200 p-12 space-y-4 border border-solid rounded-2xl hover:border-blue-500 text-xl
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
          {/* <motion.div className='w-1/3 translate-y-12' variants={fadeOpacity} initial="initial" whileInView="animate" viewport={{once:true,}}>
            <Image
            className='w-2/3 ml-32'
            src={Question}
            priority={true}
            alt="Questions Image"
            />
          </motion.div> */}
        </Layout>
        <hr/>
        <Layout className='flex items-center justify-center bg-gray-200'>
          <div id="services" className='w-2/3 flex-col'>
            <h1 className='text-4xl text-center font-bold'> Our Services</h1>
            <motion.div className='w-full flex mt-8' variants={fadeInVariants} initial="initial" whileInView="animate" viewport={{once:true,}}>
              <div className='w-full grid lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-2 '>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="Pet Purchase" header={header1} className="h-full text-center p-2">
                    <p className="m-0 text-center">
                    Search for a wide variety of animals and purchase them from trusted breeders and licensed sellers
                    </p>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="Animal Adoption" header={header2} className="h-full text-center p-2">
                    <p className="m-0 text-center">
                    Discover and adopt a wide variety of animals 
                    </p>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="Help Lost Animals" header={header3} className="h-full text-center p-2">
                    <p className="m-0 text-center">
                    Help reunite lost animals with their owners or find new homes for them
                    </p>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="Animal Profiles" header={header4} className="h-full text-center p-2">
                    <p className="m-0 text-center">
                    Explore detailed profiles of animals, complete with photos and descriptions
                    </p>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105 items-center'>
                  <Card title="Rating System" header={header5} className="w-full h-full text-center p-2">
                    <p className="m-0 text-center">
                    Take advantage of our user profile and ratings system to make your best choice
                    </p>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </Layout>
        <hr/>
        <Layout className='flex bg-light items-center justify-center'>
          <div id="contacts" className='w-2/3 flex-col'>
            <h1 className='text-4xl text-center font-bold'> Our Team</h1>
            <motion.div className='w-full flex mt-8 items-center justify-center' variants={fadeInVariants} initial="initial" whileInView="animate" viewport={{once:true,}}>
              <div className='w-full grid lg:grid-cols-5 md:grid-cols-3 gap-2 text-center'>
                <div className='w-full mx-2 hover:scale-105 text-center items-center justify-center'>
                  <Card title="Tiago Bastos" header={header6} className="flex flex-col text-center items-center justify-center"  style={{ height: '350px' }}>
                    <a href='https://www.facebook.com/' target='_blank'><i className="pi pi-facebook" style={{ fontSize: '1.5rem'}}></i></a>
                    <a href='https://www.instagram.com/' target='_blank'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://pt.linkedin.com/' target='_blank'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://github.com/' target='_blank'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="Miguel Tavares" header={header7} className="flex flex-col text-center items-center justify-center" style={{ height: '350px' }}>
                    <a href='https://www.facebook.com/' target='_blank'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                    <a href='https://www.instagram.com/' target='_blank'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://pt.linkedin.com/' target='_blank'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://github.com/' target='_blank'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="João Torrinhas" header={header8} className="flex flex-col text-center items-center justify-center" style={{ height: '350px' }}>
                    <a href ='https://www.facebook.com/' target='_blank'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                    <a href='https://www.instagram.com/' target='_blank'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://pt.linkedin.com/' target='_blank'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://github.com/ ' target='_blank'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="Diogo Torrinhas" header={header9} className="flex flex-col text-center items-center justify-center" style={{ height: '350px' }}>
                    <a href='https://www.facebook.com/' target='_blank'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                    <a href='https://www.instagram.com/' target='_blank'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://pt.linkedin.com/ ' target='_blank'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://github.com/' target='_blank'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  </Card>
                </div>
                <div className='w-full mx-2 hover:scale-105'>
                  <Card title="David Raposo" header={header10} className="flex flex-col text-center items-center justify-center" style={{ height: '350px' }}>
                    <a href='https://www.facebook.com/' target='_blank'><i className="pi pi-facebook" style={{ fontSize: '1.5rem' }}></i></a>
                    <a href='https://www.instagram.com/' target='_blank'><i className="pi pi-instagram" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://pt.linkedin.com/' target='_blank'><i className="pi pi-linkedin" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                    <a href='https://github.com/' target='_blank'><i className="pi pi-github" style={{ fontSize: '1.5rem', marginLeft: '0.5rem'}}></i></a>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </Layout>
    
    </>
    
    
  )
}
