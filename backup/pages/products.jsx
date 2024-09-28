import Header from "@/components/Header";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default function ProductsPage({products ,  loading}) {
  if (loading) {
    return(
      <Loading />
    );
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex justify-center">
        <Center>
            <div className="p-10">
                <div className="text-2xl tracking-tight mb-10 ml-2" data-aos="fade-right">All Products</div>
                <ProductsGrid products={products} />
            </div>
        </Center>
      </div>
      <Footer />
    </>
    
  );
}

export async function getServerSideProps() {
  let loading = true;
  try{
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
      props:{
        products: JSON.parse(JSON.stringify(products)),
      }
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
  } finally{
    loading = false;
  }
}
