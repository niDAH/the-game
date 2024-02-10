/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    daisyui: {
        themes: [
            'dark',
            'emerald',
            'forest',
            'garden',
            'light',
            'pastel',
        ],
    },
    plugins: [require('daisyui')],
};
