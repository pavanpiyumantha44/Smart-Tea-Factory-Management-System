import prisma from "../lib/prisma.js";

export const createStockItem = async(req,res)=>{
    try {
        const {name,category,quantity,unit,unitPrice} = req.body
        if(!name || !category || !quantity|| !unitPrice){
            return res.status(400).json({success:false,message:`All Valid fields required!`})
        }
        const stockItem = await prisma.stock.create({
            data:{name:name,category:category,quantity:parseFloat(quantity),unit:unit,unitPrice:parseFloat(unitPrice)}
        })
        if(stockItem){
            return res.status(201).json({success:true,message:"Stock Item created successfully!"});
        }else{
            return res.status(500).json({success:false,message:`Failed to create stock item!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in creating stock item!, ${error.message}`})
    }
}

export const getAllStockItems = async(req,res)=>{
    try {
        const stockItems = await prisma.stock.findMany({
            where:{isDeleted:'N'}
        })
         if(stockItems){
            return res.status(201).json({success:true,message:"Stock Items fetched successfully!",data:stockItems});
        }else{
            return res.status(500).json({success:false,message:`Failed to fetch stock items!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in fetching stock items!, ${error.message}`})
    }
}

export const getStockItem = async(req,res)=>{
    try {
        const {id} = req.params;
        const stockItem = await prisma.stock.findUnique({
            where:{itemId:id}
        });
        if(stockItem){
             return res.status(200).json({success:true,message:"Stock Item fetched successfully!",data:stockItem});
        }else{
            return res.status(500).json({success:false,message:`Failed to fetch stock item!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in fetching stock item!, ${error.message}`})
    }
}

export const updateStockItem = async(req,res)=>{
     try {
        const {id} = req.params;
        const {name,category,quantity,unit,unitPrice} = req.body
        if(!name || !category || !quantity || !unit || !unitPrice){
            return res.status(400).json({success:false,message:`All Valid fields required!`})
        }
        const updatedItem = await prisma.stock.update({
            where:{itemId:id},
            data:{name:name,category:category,quantity:quantity,unit:unit,unitPrice:unitPrice,updatedAt:new Date()}
        });
        if(updatedItem){
             return res.status(200).json({success:true,message:"Stock Item updated successfully!",data:updatedItem});
        }else{
            return res.status(500).json({success:false,message:`Failed to updated stock item!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in updating stock item!, ${error.message}`})
    }
}