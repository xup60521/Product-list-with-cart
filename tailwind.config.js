/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                c_Red: "hsl(14, 86%, 42%)",
                c_Green: "hsl(159, 69%, 38%)",
                c_Rose_50: "hsl(20, 50%, 98%)",
                c_Rose_100: "hsl(13, 31%, 94%)",
                c_Rose_300: "hsl(14, 25%, 72%)",
                c_Rose_400: "hsl(7, 20%, 60%)",
                c_Rose_500: "hsl(12, 20%, 44%)",
                c_Rose_900: "hsl(14, 65%, 9%)",
            },
            fontFamily: {
                red_hat_text: ["Red Hat Text", "sans-serif"]
            }
        },
    },
    plugins: [],
}

