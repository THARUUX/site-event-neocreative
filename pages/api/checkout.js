import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";


export default async function handler(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,contactNumber,
    district,streetAddress,city,
    pickupFromStore,deliveryFee,total,Final,weightTotal,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({_id:uniqueIds});
  
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'Rs',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,name,contactNumber,city,pickupFromStore,deliveryFee,total,Final,weightTotal,
    streetAddress,district,paid:false,
  });
  
  const session = '/thank';

  res.json({
    url:session
  })

}