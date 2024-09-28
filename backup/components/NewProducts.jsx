import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

export default function NewProducts({products}) {
  return (
    <Center>
        <div className="p-0">
            <div className="text-3xl mb-10 ml-2" data-aos="fade-right">New Arrivals</div>
            <ProductsGrid products={products} />
        </div>
    </Center>
  );
}