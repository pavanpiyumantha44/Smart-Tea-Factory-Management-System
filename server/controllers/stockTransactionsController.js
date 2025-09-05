export const getAllTransactions = async(req,res)=>{
   try {
        const transactions = await prisma.stockTransaction.findMany({
            where:{isDeleted:'N'},
            include:{
                item:true
            }
        })
         if(transactions){
            return res.status(200).json({success:true,message:"Stock Transactions fetched successfully!",data:transactions});
        }else{
            return res.status(500).json({success:false,message:`Failed to fetch stock Transactions!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in fetching stock Transactions!, ${error.message}`})
    }
}