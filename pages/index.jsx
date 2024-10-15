import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Link from "next/link";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState, useEffect } from "react";
import Center from "@/components/Center";
import Particles from "@/components/magicui/particles";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import Hero from "@/components/Hero";
import HeroTwo from "@/components/HeroTwo";
import HeroThree from "@/components/HeroThree";

export default function HomePage({ categories, categoryProducts, id }) {
  const [catoID, setCatoID] = useState(id);
  const [color, setColor] = useState("#000000");

  //console.log('cate', categories);
 

  if (!categories) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center flex-col w-screen items-center">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
        <Header homeActive="open" />
        <Featured />
        <Center>
          <div className="text-3xl">Categories</div>
          <div className="py-24">
            <div className='w-full flex flex-wrap sm:gap-16 gap-10 justify-center category-list-container ease-in-out duration-300'>
              {categories?.length > 0 && categories.map(category => (
                category?.parent?.name && category.parent._id === catoID ? (
                  <Link key={category._id} href={`/Category/${category._id}`} className='category-container' data-aos='fade'>
                    {category.image && (
                      <LazyLoadImage 
                        effect="blur"
                        wrapperProps={{ style: { transitionDelay: "1s" } }} 
                        src={category.image} 
                        alt={category.name} 
                        className='w-64 h-64 object-cover rounded-t-md drop-shadow-xl bg-transparent'
                        />
                      )}
                    <div className='w-64 px-5 py-3 text-center rounded shadow-md tracking-wider bg-white/40'>
                      {category.name}
                    </div>
                    {category.description && (
                      <div className="category-disc absolute top-0 w-full h-full bg-white rounded-md p-7">
                        {/*category.description*/}
                      </div>
                    )}
                  </Link>
                ) : null
              ))}
            </div>
          </div>
        </Center>
          <Hero></Hero>
          <HeroTwo />
          <HeroThree />
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const id = "66d2e69e54f2b22a9fc18f4c";
  let categories = null;

  try {
    await mongooseConnect();
    categories = await Category.find().populate('parent');
    //console.log("cate", categories);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  return {
    props: {
      categories: categories ? JSON.parse(JSON.stringify(categories)) : [],
      id,
    }
  };
}
