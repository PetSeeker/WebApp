import Image from 'next/image'
import Layout from '../components/Layout'
import AnimatedText from '../components/AnimatedText'

export default function Home() {
  return (
    <> 
      <Layout className='flex items-center justify-center flex-col'>
        <div className='w-full flex mt-4'>
          <AnimatedText text='PetSeeker' className='text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'/>  
        </div>
        <div className='w-full flex items-center justify-center mt-10'>
          <p>Começar Conteúdo</p>
        </div>
      </Layout>
    </>
    
    
  )
}
