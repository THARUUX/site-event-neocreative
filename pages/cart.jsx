import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Center from '@/components/Center';
import { CartContext } from '@/components/CartContext';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import BackButton from '@/components/BackButton';
import Image from 'next/image';

export default function CartPage() {
    const router = useRouter();
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pickupFromStore, setPickupFromStore] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            //setLoading(true);
            try {
                const response = await axios.post('/api/cart', { ids: cartProducts });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                //setLoading(false);
            }
        };
        fetchData();
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('success')) {
            setIsSuccess(true);
            clearTheCart();
        }
    }, []); 

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    async function placeOrder() {
        if (pickupFromStore) {
            if (!name || !contactNumber) {
                alert('Please fill in the order information');
                return;
            }
        } else {
            if (!name || !contactNumber || !city || !district || !streetAddress) {
                alert('Please fill in the order information');
                return;
            }
        }

        try {
            setLoading(true);
            const response = await axios.post('/api/checkout', {
                name, contactNumber, city, district, streetAddress, pickupFromStore,
                cartProducts,
            });
            if (response.data.url) {
                router.push(response.data.url); // Use Next.js router for navigation
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
            alert('Error placing order. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    let total = products.reduce((acc, product) => {
        const price = product.price || 0;
        return acc + price * cartProducts.filter(id => id === product._id).length;
    }, 0);

    let weightTotal = products.reduce((acc, product) => {
        const weight = product.weight || 0;
        return acc + weight;
    }, 0) / 1000;

    let deliveryFee = 400 + Math.floor(weightTotal) * 80;
    let Final = pickupFromStore ? total : deliveryFee + total;

    function clearTheCart() {
        localStorage.removeItem('cart');
    }    

    useEffect(() => {
        if (isSuccess) {
            router.push('/thank');
             // Use Next.js router for navigation
        }
    }, [isSuccess, router]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full flex flex-col items-center'>
                <Header />
                <Center>
                    {isSuccess ? (
                        <div className='w-screen h-screen flex justify-center items-center'>
                            <div className='flex justify-center flex-col'>
                                <h1 className='text-3xl text-center'>Thanks for your order!</h1>
                                <p>We will contact you when your order will be sent.</p>
                                <div className='text-center'>
                                    <button onClick={() => (window.location.href = "/")} className='btn bg-lime-500 text-white py-1 mt-5 px-5 rounded shadow-md flex gap-2 items-center'>
                                        Back
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='py-16 min-h-screen cart-container-main'>
                            <div>
                                <h2 className='text-2xl ml-1 mt-5'>Cart</h2>
                                {!cartProducts?.length && (
                                    <div className='w-full h-full flex justify-center flex-col items-center mt-24 text-xl.'>
                                        Your cart is empty
                                        <Link href={'/products/'}  className='mt-5 shadow-md hover:shadow-lg transition cursor-pointer hover:bg-lime-400 btn bg-main text-white px-3 py-2 rounded-sm '>Shop Now</Link>
                                    </div>
                                )}
                                {products?.length > 0 && (
                                    <table className=' mt-10 w-full max-h-screen'>
                                        <thead className='bg-white'>
                                            <tr className='border'>
                                                <th className='border py-2'>Product</th>
                                                <th className='border py-2'>Quantity</th>
                                                <th className='border py-2'>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product._id} className='h-40 border-b-2 border-gray-300 cart-item-row'>
                                                    <td className='flex h-40 items-center gap-5 text-xl p-5 cart-item-row-column-one'>
                                                        <div className='h-full'>
                                                            <img src={product.images[0]} alt="" className='cart-images h-32  rounded shadow-md' />
                                                        </div>
                                                        {product.title}
                                                    </td>
                                                    <td className='cart-item-row-column-two'>
                                                        <div className='flex justify-center gap-5 cart-item-row-column-two-inner'>
                                                            <button className='bg-white px-3 shadow-md'
                                                                onClick={() => lessOfThisProduct(product._id)}>-</button>
                                                            <div>
                                                                {cartProducts.filter(id => id === product._id).length}
                                                            </div>
                                                            <button className='bg-white px-3 shadow-md'
                                                                onClick={() => moreOfThisProduct(product._id)}>+</button>
                                                        </div>
                                                    </td>
                                                    <td className='cart-item-row-column-three'>
                                                        <div className='justify-center items-center flex' >
                                                            Rs.{cartProducts.filter(id => id === product._id).length * product.price}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className='col-span-2 text-start pl-5'>Total</td>
                                                <td className=''></td>
                                                <td className=' text-center font-bold'>Rs.{total}.00</td>
                                            </tr>
                                            <tr className={` ${pickupFromStore ? 'hidden' : ''}`}>
                                                <td className='col-span-2 text-start pl-5'>Weight</td>
                                                <td className=''></td>
                                                <td className=' text-center font-bold'>Kg {weightTotal}</td>
                                            </tr>
                                            <tr className={` ${pickupFromStore ? 'hidden' : ''}`}>
                                                <td className='col-span-2 text-start pl-5'>Delivery Fee</td>
                                                <td className=''></td>
                                                <td className=' text-center font-bold border-b-2 border-slate-500'>Rs.{deliveryFee}.00</td>
                                            </tr>
                                            <tr>
                                                <td className='col-span-2 text-start pl-5'>Final Bill</td>
                                                <td className=''></td>
                                                <td className=' text-center font-bold border-b-2 border-slate-500'>Rs.{Final}.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            {!!cartProducts?.length && (
                                <div className='mt-10 mb-10 billing'>
                                    <h2 className='text-2xl'>Order information</h2>
                                    <div className='flex flex-col gap-10 my-10'>
                                        <div className="flex items-center text-sm">
                                        <input
                                            id="default-checkbox"
                                            type="checkbox"
                                            checked={pickupFromStore}
                                            onChange={ev => setPickupFromStore(ev.target.checked)}
                                            className="w-4 h-4 text-lime-600 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-main-dark">
                                            Pickup from store
                                        </label>
                                        </div>
                                        <span className='text-xs text-red-500'>*If you are able to pickup from our store, the delivery fee will not be added.</span>
                                        <input type="text"
                                            className='px-3 py-2  border-slate-300 rounded-sm shadow-md'
                                            placeholder="Name"
                                            value={name}
                                            name="name"
                                            onChange={ev => setName(ev.target.value)} />
                                        <input type="tel"
                                            className='px-3 py-2  border-slate-300 rounded-sm shadow-md'
                                            placeholder="Phone Number"
                                            value={contactNumber}
                                            name="contactNumber"
                                            onChange={ev => setContactNumber(ev.target.value)} />
                                        <input type="text"
                                            className={`px-3 py-2 border-slate-300 rounded-sm shadow-md ${pickupFromStore ? 'hidden' : ''}`}
                                            placeholder="Street Address"
                                            value={streetAddress}
                                            name="streetAddress"
                                            onChange={ev => setStreetAddress(ev.target.value)} />
                                        <div className='flex flex-col md:flex-row lg:flex-row gap-10'>
                                            <input type="text"
                                                className={`px-3 py-2  border-slate-300 rounded-sm shadow-md  ${pickupFromStore ? 'hidden' : ''}`}
                                                placeholder="City"
                                                value={city}
                                                name="city"
                                                onChange={ev => setCity(ev.target.value)} />
                                            <input type="text"
                                                className={`px-3 py-2  border-slate-300 rounded-sm shadow-md  ${pickupFromStore ? 'hidden' : ''}`}
                                                placeholder="District"
                                                value={district}
                                                name="district"
                                                onChange={ev => setDistrict(ev.target.value)} />
                                        </div>
                                    </div>
                                    <button black block
                                        className='btn bg-lime-500 px-4 py-2 rounded shadow-lg'
                                        onClick={placeOrder}>
                                        Place the order
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </Center>
                <Footer />
                <BackButton/>
            </div>
    );
}
