import prisma from "../lib/prisma.js";

const addPlace = async (req,res)=>{
    try {
        const {name,description,placeCode,size} = req.body;
        if(name===""||description===""||placeCode===""||(size<0 || size>10000)){
            return res.status(400).json({success:false,message:`All Valid fields required!`})
        }
        const place = await prisma.place.create({
            data:{name,placeCode,description,size}
        });
        if(place){
            return res.status(201).json({success:true,message:"Place created successfully!",data:place});
        }else{
            return res.status(500).json({success:false,message:`Failed to create Place!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in creating place!, ${error.message}`})
    }  
}

const getAllPlaces = async(req,res)=>{
    try {
        const places = await prisma.place.findMany({
            where:{isDeleted:'N'}
        });
        if(places){
            return res.status(200).json({success:true,data:places});
        }else{
            return res.status(500).json({success:false,message:`Failed to get teams!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed to get teams!, ${error.message}`})
    }  
}

const deletePlace = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedPlace = await prisma.place.update({
            where:{placeId:id},
            data:{isDeleted:'Y'}
        })
        if(deletedPlace){
            return res.status(200).json({success:true,message:"Place Deleted Successfully!"});
        }else{
            return res.status(400).json({success:false,message:`Failed deleting place!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed deleting place!, ${error.message}`})
    }
}

const updatePlaceDetails = async(req,res)=>{
    const {id} = req.params;
    const {placeCode,description,size} = req.body;
    try {
        const updatedPlace = await prisma.place.update({
            where:{placeId:id},
            data:{placeCode:placeCode,description:description,size:size}
        })
        if(updatedPlace){
            return res.status(200).json({success:true,message:"Place Updated Successfully!",data:updatedPlace});
        }else{
            return res.status(400).json({success:false,message:`Failed updating place!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed updating place!, ${error.message}`})
    }
}

export {addPlace,getAllPlaces,deletePlace,updatePlaceDetails}