import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category'; // Import Category model
import { Product } from '@/models/Product'; // Import Product model
import Link from 'next/link';
import Loading from '@/components/Loading';
import ProductsGrid from '@/components/ProductsGrid';
import BackButton from '@/components/BackButton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CategoryInner({ categories, categoryProducts }) {
    const [parentCategory, setCategoryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    //console.log(categoryProducts);
    //console.log(categoryProducts.length);
    //console.log("categories", categories);


    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchCategory = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/category?id=' + id);
                console.log('Response data:', response.data);
                setCategoryInfo(response.data);
                //console.log('Parent category after setting:');
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();

    }, [id]);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className='min-h-screen w-full flex justify-center'>
                    <Center>
                        <div>Error: {error}</div>
                    </Center>
                </div>
                <Footer />
            </>
        );
    }


    return (
        <>
            <BackButton />
            <Header />
            <div className='w-full min-h-screen flex justify-center'>
                <Center>
                    <div className='pt-10'>
                        <div className=''>
                            <div className='text-lg text-main-dark flex flex-wrap items-center' data-aos="fade-right">
                                <Link href={'/categories'} className='text-main-dark text-2xl'>
                                    Categories
                                </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                {parentCategory.parent?.name ? (
                                    <div className='flex items-center text-nowrap text-lg'>
                                        <Link key={parentCategory._id} href={`/Category/${parentCategory.parent._id}`}>
                                            {parentCategory.parent.name}
                                        </Link>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                ) : null}
                                <div className='text-nowrap'>
                                    {parentCategory && parentCategory.name}
                                </div>
                                
                            </div>
                        </div>

                        <div className='py-10 text-sm sm:text-base sm:py-10 text-main-dark'>
                            {parentCategory._id ? parentCategory.description : null}
                        </div>

                        <div className='w-full flex flex-wrap sm:gap-16 gap-10 sm:justify-normal justify-center category-list-container ease-in-out duration-300'>
                            {categories?.length > 0 && categories.map(category => (
                                category?.parent?.name ? (
                                    category.parent._id === parentCategory._id ? (
                                        <Link key={category._id} href={`/Category/${category._id}`} className='category-container' data-aos='fade'>
                                            {category.image ? (
                                                <LazyLoadImage 
                                                effect="blur"
                                                wrapperProps={{
                                                    style: {transitionDelay: "1s"},
                                                }} 
                                                src={`${category.image}`} 
                                                alt="" 
                                                className='w-64 h-64 object-cover rounded-t-md drop-shadow-xl bg-transparent'
                                                />
                                            ) : null}
                                            <div className='w-64 px-5 py-3 text-center rounded shadow-md tracking-wider bg-white/40'>
                                                {category.name}
                                            </div>
                                            {category.description?  (<cato className="category-disc absolute top-0 w-full h-full bg-white/70 rounded-md p-7">{category.description}</cato>) : null}
                                        </Link>
                                    ) : (
                                        null
                                    )
                                ) : null
                            ))}
                        </div>

                        <div className='w-full mt-10 sm:mt-16'>
                            <div className='mb-10 text-lg text-main-dark w-full justify-center flex'>
                                { categories?.length > 0 ? ( categoryProducts?.length ? "Available products from this category" : "No available products from this category" ) : null}
                            </div>
                            <ProductsGrid products={categoryProducts} />
                        </div>
                    </div>
                </Center>
            </div>
            <Footer />
        </>
    );
}


export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    await mongooseConnect();
    const categories = await Category.find().populate('parent');
    const categoryProducts = await Product.find({ category: id });
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
        }
    };

}


/*categoryProducts?.length > 0 && categoryProducts.map(categoryProduct => (
                                            <div key={categoryProduct._id}>{categoryProduct.name}</div>
                                        ))*/