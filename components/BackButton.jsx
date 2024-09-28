import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter hook

export default function BackButton() {
    const router = useRouter(); // Access the router object

    function goBack() {
        router.back(); // Go back to the previous page
    }

    return (
        <div onClick={goBack} className='backbtn fixed text-3xl z-10 bottom-10 right-10 btn bg-main p-3 cursor-pointer rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </div>
    );
}
