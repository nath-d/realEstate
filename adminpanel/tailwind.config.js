/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    // This is important to prevent conflicts with Ant Design
    corePlugins: {
        preflight: false,
    },
} 