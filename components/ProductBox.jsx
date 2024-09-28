import Link from "next/link";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import Loading from "./Loading";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const [ loading, setLoading] = useState(false);

  if (loading) {
    return(
      <Loading/>
    );
  }

  const url = '/product/'+_id;
  return (
    <>
      <div className="w-64 flex flex-col gap-2 product-box" data-aos='fade'>
        <Link href={url} onClick={() => (setLoading(true))} className="w-full h-auto ">
          <div className="w-full h-auto">
            <LazyLoadImage 
                effect="blur"
                wrapperProps={{
                    style: {transitionDelay: "0.5s"},
                }}src={images?.[0]} alt="" className="h-full w-full  object-cover rounded-lg"/>
          </div>
        </Link>
        <div className="p-3 flex flex-col  gap-3 rounded-lg bg-white">
          <div href={url} className="">{title}</div>
          <div className="flex">
            <div className="flex flex-grow mb-0 items-center text-xl font-black">
              Rs.{price}
            </div>
            <button 
            className="border items-center flex gap-2 border-lime-400 rounded-sm py-1 px-3 shadow-md" 
            block onClick={() => addProduct(_id)} primary outline>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 