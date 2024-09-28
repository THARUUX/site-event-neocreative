import styled from "styled-components";
import ProductBox from "@/components/ProductBox";


export default function ProductsGrid({products}) {
  return (
    <div className="flex gap-20 justify-between flex-wrap w-full ">
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
    </div>
  );
}