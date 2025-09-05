import prisma from "../lib/prisma.js";

const addPerson = async(req,res)=>{
    const {firstName,lastName,nicNumber,email,phone,address,gender,roleId,dob} = req.body;
    if(firstName ==="" || lastName ==="" || nicNumber ==="" || address===""||gender===""||roleId===""){
        return res.status(401).json({success:false,message:"All fields are requried!!"});
    }
    else{   
        try {
            const roleName = await prisma.role.findUnique({
                where:{roleId:roleId}
            })
            const personCount = await prisma.person.count();
            const personCode = `${roleName.userRole.substring(0,3)}${personCount+1}`

            if(personCode!==""){
                const newPerson = await prisma.person.create({
                    data:{personCode,firstName,lastName,nicNumber,email,phone,address,gender,roleId}
                })

                if(newPerson){
                    return res.status(201).json({success: true,message: "Person created successfully!",data: newPerson});
                }else{
                    return res.status(500).json({success:false,message:`Failed to create new person!`})
                }
            }
            else{
                return res.status(500).json({success:false,message:`Failed to create new person! Something went wrong`})
            }
        } catch (error) {
             return res.status(500).json({success:false,message:`Failed to create new person!, ${error.message}`})
        }
    }
    
}

const getPersonCount = async(req,res)=>{
    try {
        const personCount = await prisma.person.count();
        if(personCount){
            return res.status(200).json({success:true,personCount:personCount})
        }else{
            return res.status(401).json({success:false,message:"Person not found!"})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed to fetch person count!, ${error.message}`})
    }
}

const getRoles = async(req,res)=>{
    try {
        const roles = await prisma.role.findMany();
        if(roles){
            return res.status(200).json({success:true,roles:roles});
        }else{
           return res.status(400).json({ success: false, message: "Roles not found!" });
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Roles fetching failed!"})
    }
    
}

const getAllPerson =async(req,res)=>{
    try {
        const allPerson = await prisma.person.findMany({
            where:{
                isDeleted:'N',
                role: {
                    NOT: {
                        userRole: 'ADMIN'
                    }
                }
            },
            include:{
                role:true,
                teamMemberships:{
                    include:{
                        team:true
                    }
                }
            }
        });
        if(allPerson.length>0){
            return res.status(200).json({success:true,allPerson:allPerson})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Failed fetching Person records!"})
    }
}

const getAllSupervisors = async (req, res) => {
  try {
    const allSupervisors = await prisma.person.findMany({
      where: {
        isDeleted: 'N',
        role: {
          userRole: 'SUPERVISOR'
        }
      },
      include: {
        role: true
      }
    });
    if(allSupervisors){
         return res.status(200).json({success:true,supervisors:allSupervisors});
    }else{
        return res.status(400).json({ success: false, message: "Supervisors not found!" });
    }
  } catch (error) {
    console.error("Error fetching supervisors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllworkers = async (req, res) => {
  try {
   const allWorkers = await prisma.person.findMany({
      where: {
        isDeleted: 'N',
        NOT: {
          role: {
            userRole: {
              in: ['SUPERVISOR', 'MANAGER','ADMIN'],
              mode: 'insensitive',
            }
          }
        }
      },
      include: {
        role: true
      }
    });
    if(allWorkers){
         return res.status(200).json({success:true,workers:allWorkers});
    }else{
        return res.status(400).json({ success: false, message: "Workers not found!" });
    }
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePerson = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedPerson = await prisma.person.update({
            where:{personId:id},
            data:{isDeleted:'Y'}
        })
        if(deletedPerson){
            return res.status(200).json({success:true,message:"Person Deleted Successfully!"});
        }else{
            return res.status(400).json({success:false,message:`Failed deleting person!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed deleting person!, ${error.message}`})
    }
}

const getAllTeaPluckers = async (req, res) => {
  try {
    const allTeaPluckers = await prisma.person.findMany({
      where: {
        isDeleted: 'N',
        role: {
          userRole: "TEA-PLUCKER"
        }
      },
      include: {
        role: true
      }
    });

    if (allTeaPluckers && allTeaPluckers.length > 0) {
      return res.status(200).json({ success: true, workers: allTeaPluckers });
    } else {
      return res.status(404).json({ success: false, message: "Workers not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error"+error.message });
  }
};


export {addPerson, getRoles, getPersonCount, getAllPerson,deletePerson,getAllSupervisors,getAllworkers,getAllTeaPluckers}