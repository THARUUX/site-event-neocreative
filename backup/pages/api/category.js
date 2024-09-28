import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import React from 'react'

export default async function handel(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            const category = await Category.findOne({ _id: req.query.id }).populate('parent');
            //console.log(category);
            return res.json(category);
        } else {
            const categories = await Category.find();
            return res.json(categories);
        }
    }
}
