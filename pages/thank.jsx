import React, { useContext, useEffect } from 'react';
import { CartContext } from '@/components/CartContext';
import Header from '@/components/Header';
import Center from '@/components/Center';

export default function Thank() {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
        localStorage.removeItem('cart');
    }, [clearCart]);

    const handleBackClick = () => {
        window.location.href = "/";
    };

    return (
        <>
            <Header />
            <Center>
                <div className='w-screen h-screen flex justify-center items-center'>
                    <div className='flex justify-center flex-col'>
                        <h1 className='text-3xl text-center'>Thanks for your order!</h1>
                        <p>We will contact you when your order will be sent.</p>
                        <div className='text-center flex justify-center'>
                            <button onClick={handleBackClick} className='btn bg-lime-500 text-white py-1 mt-5 px-5 rounded shadow-md flex gap-2 items-center'>
                                Back
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Center>
        </>
    );
}
