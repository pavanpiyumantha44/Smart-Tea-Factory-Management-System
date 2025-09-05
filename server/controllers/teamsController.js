import prisma from "../lib/prisma.js";

const getAllTeams = async(req,res)=>{
    try {
        const teams = await prisma.team.findMany({
            where:{isDeleted:'N'}
        });
        if(teams){
            return res.status(200).json({success:true,data:teams});
        }else{
            return res.status(500).json({success:false,message:`Failed to get teams!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed to get teams!, ${error.message}`})
    }  
}

const createTeam = async(req,res)=>{
    try {
        const {name,description} = req.body;
        if(name===""||description===""){
            return res.status(400).json({success:false,message:`All fields required!`})
        }
        const team = await prisma.team.create({
            data:{name,description}
        });
        if(team){
            return res.status(201).json({success:true,message:"Team created successfully!",data:team});
        }else{
            return res.status(500).json({success:false,message:`Failed to create team!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in creating team!, ${error.message}`})
    }  
}
const deleteTeam = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedTeam = await prisma.team.update({
            where:{teamId:id},
            data:{isDeleted:'Y'}
        });
        if(deletedTeam){
            const deleteMembers =await prisma.teamMember.deleteMany({
                where:{teamId:id}
            })
            if(deleteMembers){
                return res.status(200).json({success:true,message:"Team deleted successfully!"});
            }else{
                return res.status(500).json({success:false,message:`Failed to delete team!`})
            }
            
        }else{
            return res.status(500).json({success:false,message:`Failed to delete team!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in deleting team!, ${error.message}`})
    }  
}
const soloWorkers = async(req,res)=>{
    try {
        const personsNotInAnyTeam = await prisma.person.findMany({
            where: {
                teamMemberships: {
                none: {} // No entries in TeamMember relation
                },
            },
            include:{
                role:true
            }
        });

        if(personsNotInAnyTeam){
            return res.status(200).json({success:true,data:personsNotInAnyTeam});
        }else{
            return res.status(400).json({success:false,message:`Failed to get teams!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed to get teams!, ${error.message}`})
    }  
}

const getTeamInfo = async(req,res)=>{
    try {
        const {id} = req.params;
        const team = await prisma.team.findUnique({
            where:{teamId:id}
        })
        if(team){
            return res.status(200).json({success:true,data:team});
        }else{
            return res.status(400).json({success:false,message:`Failed to get team!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed to get team!, ${error.message}`})
    }
}
const updateTeamInfo = async(req,res)=>{

    try {
        const {id} = req.params;
        const {description} = req.body;
  
        const updatedTeam = await prisma.team.update({
            where:{teamId:id},
            data:{description:description}
        })
        if(updatedTeam){
            return res.status(200).json({success:true,message:"Team Updated Successfully!"});
        }else{
            return res.status(400).json({success:false,message:`Failed to update team!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Failed to update team!, ${error.message}`})
    }
}

const addNewTeamMember = async (req, res) => {
  const { teamId, personId, joinedDate } = req.body;

  if (!teamId || !personId || !joinedDate) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: teamId, personId, or joinedDate",
    });
  }

  try {
    const existing = await prisma.teamMember.findUnique({
      where: {
        teamId_personId: {
          teamId,
          personId,
        },
      },
    });

    if (existing && existing.isDeleted === "N") {
      return res.status(409).json({
        success: false,
        message: "This person is already an active member of the team.",
      });
    }


    const newTeamMember = await prisma.teamMember.upsert({
      where: {
        teamId_personId: {
          teamId,
          personId,
        },
      },
      update: {
        joinedDate: new Date(joinedDate),
        isDeleted: "N",
        updatedAt: new Date(),
      },
      create: {
        teamId,
        personId,
        joinedDate: new Date(joinedDate),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Team member added successfully!",
      data: newTeamMember,
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to add team member. ${error.message}`,
    });
  }
};

const getTeamMembers = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing required teamId",
    });
  }

  try {
    const members = await prisma.teamMember.findMany({
      where: {
        teamId: id,
        isDeleted: "N",
      },
      include: {
        person: {
          include: {
            role: true, // ✅ include role through person
          },
        },
      },
      orderBy: {
        joinedDate: "asc",
      },
    });

    // ✅ Flatten and merge properties into a single object
    const formattedMembers = members.map((m) => ({
      joinedDate: m.joinedDate,
      ...m.person, // spread all person properties
      role: m.person.role, // keep role as nested or you can do roleName: m.person.role?.name
    }));

    return res.status(200).json({
      success: true,
      data: formattedMembers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch team members. ${error.message}`,
    });
  }
};

const deleteTeamMember = async (req, res) => {
  const { teamId, personId } = req.body;

  if (!teamId || !personId) {
    return res.status(400).json({
      success: false,
      message: "Missing required teamId or personId",
    });
  }

  try {
    const deletedTeamMember = await prisma.teamMember.delete({
      where: {
        teamId_personId: {
          teamId,
          personId,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
      data: deletedTeamMember,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to delete team member. ${error.message}`,
    });
  }
};




export {getAllTeams,createTeam,deleteTeam,soloWorkers,getTeamInfo,updateTeamInfo,addNewTeamMember,getTeamMembers,deleteTeamMember};