import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Navbar} from '../components/Navbar'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { Footer } from '../components/Footer.js';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetSeeker',
  description: 'Generated by petSeeker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body className={`${inter.className} bg-light`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </PrimeReactProvider>
    </html>
  )
}