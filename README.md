# My Awesome Next.js Web App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Structure

The project structure is organized as follows:

- **Homepage:** `src/app`
- **Animals Pages:**
  - For Adoption: `src/app/animals/adoption`
  - For Sale: `src/app/animals/sale`
- **Individual Animal Pages and respective informations and functionalities related to it:**
  - Dynamic Route for Adoption: `src/app/animals/adoption/[id]`
  - Dynamic Route for Sale: `src/app/animals/sale/[id]`
- **Profile Pages:**
  - Dynamic Route for Profile (Displaying information and manage ratings): `src/app/account/profile/[id]`
  - Edit Profile: `src/app/account/profile`
  - Edit Settings: `src/app/account/settings`
- **Admin Page:**
  - For Accept/Reject Listings: `src/app/account/admin`
- **Create Listing Page:**
  - For create a listing: `src/app/createPub`
- **Personal Listings Page**
  - User Listings: `src/app/myListings`
  - Dynamic Route For Edit listings: `src/app/myListings/[id]`
- **Components (Navbar, etc)**
  - Built Components : `src/components`
- **Images**
  - Images path : `public/images`

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
