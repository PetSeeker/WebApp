This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



#set($owner_email = $input.params().form.get('owner_email'))
#set($animal_type = $input.params().form.get('animal_type'))
#set($animal_breed = $input.params().form.get('animal_breed'))
#set($animal_age = $input.params().form.get('animal_age'))
#set($listing_type = $input.params().form.get('listing_type'))
#set($animal_price = $input.params().form.get('animal_price'))
#set($description = $input.params().form.get('description'))
#set($images = $input.params().form.get('images'))
{
    "owner_email": "$owner_email",
    "animal_type": "$animal_type",
    "animal_breed": "$animal_breed",
    "animal_age": $animal_age,
    "listing_type": "$listing_type",
    #if($animal_price.matches("\\d+"))
        "animal_price": $animal_price
    #else
        "animal_price": "$animal_price"
    #end,
    "description": "$description",
    #if($images.size() > 0)
        "images": $images
    #else
        "images": []
    #end
}


# Make a POST request to the Cognito token endpoint
        response = requests.post(ENDPOINT, data=data)