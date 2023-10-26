/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'aboutus': "url('/public/images/backgroundAboutus.png')",
      },
      colors:{
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96", // 240,86,199
        primaryDark: "#58E6D9", // 80,230,217
        green: "#008000", // 0,128,0
        roseQuartz: "#BFACB5", // 191,172,181
        pale: "#E5D0CC", // 229,208,204
        charcoal: "#444554", // 68,69,84
        sage: "#CDC6A5", 
        sage2: "#fefbf5",
        green2: "#B1DE5E",
        grayhome: "#59656F",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}

