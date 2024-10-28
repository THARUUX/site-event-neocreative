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
    const [pickupFromStore, setPickupFromStore] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [total, setTotal] = useState(0);
    const [weightTotal, setWeightTotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [finalBill, setFinalBill] = useState(0);

    // Fetch cart products data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/cart', { ids: cartProducts });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching cart data:", error.message);
            }
        };
        fetchData();
    }, [cartProducts]);

    // Recalculate totals whenever products, cart, or pickup option changes
    useEffect(() => {
        const newTotal = products.reduce((acc, product) => {
            const price = product.price || 0;
            return acc + price * cartProducts.filter(id => id === product._id).length;
        }, 0);

        const newWeightTotal = products.reduce((acc, product) => {
            const weight = product.weight || 0;
            return acc + weight * cartProducts.filter(id => id === product._id).length;
        }, 0) / 1000; // Convert to kg if needed

        const newDeliveryFee = pickupFromStore ? 0 : 400 + Math.floor(newWeightTotal) * 80;
        const newFinalBill = newTotal + newDeliveryFee;

        setTotal(newTotal);
        setWeightTotal(newWeightTotal);
        setDeliveryFee(newDeliveryFee);
        setFinalBill(newFinalBill);
    }, [products, cartProducts, pickupFromStore]);

    // Clear cart and navigate to success page if order was successful
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
            router.push('/thank');
        }
    }, [isSuccess, clearCart, router]);

    const handleLessProduct = (id) => removeProduct(id);
    const handleMoreProduct = (id) => addProduct(id);

    const handleOrder = async () => {
        if (!name || !contactNumber || (!pickupFromStore && (!city || !district || !streetAddress))) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('/api/checkout', {
                name, contactNumber, city, district, streetAddress, pickupFromStore, cartProducts, total, weightTotal, deliveryFee
            });
            if (response.data.url) {
                router.push(response.data.url);
            }
        } catch (error) {
            console.error("Error placing order:", error.message);
            alert('Error placing order. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <Center>
                {isSuccess ? (
                    <div className='w-screen h-screen flex justify-center items-center'>
                        <div className='flex flex-col justify-center'>
                            <h1 className='text-3xl text-center'>Thanks for your order!</h1>
                            <p>We will contact you when your order is ready.</p>
                            <button onClick={() => router.push('/')} className='btn bg-lime-500 text-white py-1 mt-5 px-5 rounded shadow-md flex gap-2 items-center'>
                                Back
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='py-16 min-h-screen'>
                        <h2 className='text-2xl ml-1 mt-5'>Cart</h2>
                        {!cartProducts.length ? (
                            <div className='w-full h-full flex justify-center flex-col items-center mt-24 text-xl'>
                                Your cart is empty
                                <Link href='/products' className='mt-5 shadow-md hover:shadow-lg transition cursor-pointer hover:bg-lime-400 btn bg-main text-white px-3 py-2 rounded-sm'>
                                    Shop Now
                                </Link>
                            </div>
                        ) : (
                            <table className='mt-10 w-full max-h-screen'>
                                <thead className='bg-white'>
                                    <tr className='border'>
                                        <th className='border py-2'>Product</th>
                                        <th className='border py-2'>Quantity</th>
                                        <th className='border py-2'>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id} className='h-40 border-b-2 border-gray-300'>
                                            <td className='flex items-center gap-5 text-xl p-5'>
                                                <img src={product.images[0]} alt={product.title} className='h-32 rounded shadow-md' />
                                                {product.title}
                                            </td>
                                            <td className=''>
                                                <div className='flex gap-5'>
                                                    <button className='bg-white px-3 shadow-md' onClick={() => handleLessProduct(product._id)}>-</button>
                                                    <div>{cartProducts.filter(id => id === product._id).length}</div>
                                                    <button className='bg-white px-3 shadow-md' onClick={() => handleMoreProduct(product._id)}>+</button>
                                                </div>
                                            </td>
                                            <td className='justify-center items-center'>Rs.{cartProducts.filter(id => id === product._id).length * product.price}</td>
                                            {/*<td className='flex items-center gap-5 text-xl p-5'>
                                                <img src={product.images[0]} alt={product.title} className='h-32 rounded shadow-md' />
                                                {product.title}
                                            </td>
                                            <td className='flex justify-center gap-5'>
                                                <button className='bg-white px-3 shadow-md' onClick={() => handleLessProduct(product._id)}>-</button>
                                                <div>{cartProducts.filter(id => id === product._id).length}</div>
                                                <button className='bg-white px-3 shadow-md' onClick={() => handleMoreProduct(product._id)}>+</button>
                                            </td>
                                            <td className='flex justify-center items-center'>Rs.{cartProducts.filter(id => id === product._id).length * product.price}</td>
                                        */}</tr>
                                    ))}
                                    <tr>
                                        <td className='text-start pl-5'>Total</td>
                                        <td></td>
                                        <td className='text-center font-bold'>Rs.{total}.00</td>
                                    </tr>
                                    {!pickupFromStore && (
                                        <>
                                            <tr>
                                                <td className='text-start pl-5'>Weight</td>
                                                <td></td>
                                                <td className='text-center font-bold'>Kg {weightTotal}</td>
                                            </tr>
                                            <tr>
                                                <td className='text-start pl-5'>Delivery Fee</td>
                                                <td></td>
                                                <td className='text-center font-bold border-b-2 border-slate-500'>Rs.{deliveryFee}.00</td>
                                            </tr>
                                        </>
                                    )}
                                    <tr>
                                        <td className='text-start pl-5'>Final Bill</td>
                                        <td></td>
                                        <td className='text-center font-bold border-b-2 border-slate-500'>Rs.{finalBill}.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                        {!!cartProducts.length && (
                            <div className='mt-10 mb-10'>
                                <h2 className='text-2xl'>Order information</h2>
                                <div className='flex flex-col gap-10 my-10'>
                                    <label className='flex items-center text-sm'>
                                        <input
                                            type='checkbox'
                                            checked={pickupFromStore}
                                            onChange={() => setPickupFromStore(!pickupFromStore)}
                                            className='w-4 h-4 text-lime-600 border-gray-300 rounded'
                                        />
                                        <span className='ml-2 text-sm text-main-dark'>Pickup from store</span>
                                    </label>
                                    <span className='text-xs text-red-500'>*If you choose store pickup, the delivery fee will not be added.</span>
                                    <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} className='px-3 py-1 rounded-sm input' />
                                    <input type='tel' placeholder='Phone Number' value={contactNumber} onChange={e => setContactNumber(e.target.value)} className='px-3 py-1 rounded-sm input' />
                                    {!pickupFromStore && (
                                        <>
                                            <input type='text' placeholder='Street Address' value={streetAddress} onChange={e => setStreetAddress(e.target.value)} className='px-3 py-1 rounded-sm input' />
                                            <input type='text' placeholder='City' value={city} onChange={e => setCity(e.target.value)} className='px-3 py-1 rounded-sm input' />
                                            <input type='text' placeholder='District' value={district} onChange={e => setDistrict(e.target.value)} className='px-3 py-1 rounded-sm input' />
                                        </>
                                    )}
                                </div>
                                <button onClick={handleOrder} className='w-full bg-lime-500 text-white px-4 py-2 rounded shadow-lg'>Place Order</button>
                            </div>
                        )}
                    </div>
                )}
            </Center>
            <Footer />
            <BackButton />
        </div>
    );
}
