import prisma from "../lib/prisma.js";

export const getAll = async(req,res)=>{
    try {
        const allAccounts = await prisma.account.findMany({
            include:{
                user:true
            }
        });
        if(allAccounts){
            return res.status(201).json({success:true,message:"Accounts fetched successfully!",data:allAccounts});
        }
        else{
            return res.status(500).json({success:false,message:`Failed to fetch account!`})
        }
    } catch (error) {
         return res.status(500).json({success:false,message:`Server error in fetching account!, ${error.message}`})
    }
}

export const deleteAccount = async(req,res)=>{
    try {
        const {id} = req.params;
        const deactivateAccount = await prisma.account.update({
            where:{accountId:id},
            data:{isDeleted:'Y'}
        });
        if(deactivateAccount){
            return res.status(201).json({success:true,message:"Accounts deactivated successfully!",data:deactivateAccount});
        }
        else{
            return res.status(500).json({success:false,message:`Failed to deactivate account!`})
        }
    } catch (error) {
         return res.status(500).json({success:false,message:`Server error in deactivate account!, ${error.message}`})
    }
}

export const updateAccount = async(req,res)=>{
    try {
        const {id} = req.params;
        const {username,personId,status} = req.body;
        const updatedAccount = await prisma.account.update({
            where:{accountId:id},
            data:{username:username,personId:personId,isDeleted:status}
        });
        if(updatedAccount){
            return res.status(201).json({success:true,message:"Accounts Updated successfully!",data:updatedAccount});
        }
        else{
            return res.status(500).json({success:false,message:`Failed to Updated account!`})
        }
    } catch (error) {
         return res.status(500).json({success:false,message:`Server error in Updated account!, ${error.message}`})
    }
}