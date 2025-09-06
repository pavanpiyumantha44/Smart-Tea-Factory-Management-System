import prisma from "../lib/prisma.js";

export const addInitialData = async (req, res) => {
  try {

    const attendanceData = req.body;

    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      return res.status(400).json({ success: false, message: "No attendance data provided!" });
    }
    const currDate = new Date();
    currDate.setHours(0,0,0,0);;

    const existing = await prisma.attendance.findFirst({
      where: { currentDate: currDate }
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: `Attendance already exists for ${currDate}. Skipping insert.`
      });
    }
  
    const formattedData = attendanceData.map(item => ({
      personId: item.personId,
      personCode: item.workerId,
      startDttm: item.startDttm,
      endDttm: item.endDttm,
      status: item.status || '',
      workHours: item.workHours,
      currentDate:item.currentDate
    }));


    const result = await prisma.attendance.createMany({
      data: formattedData,
      skipDuplicates: true
    });

    return res.status(201).json({
      success: true,
      message: "Intial Attendance records inserted successfully",
      count: result.count
    });

  } catch (error) {
    console.error("Error inserting attendance:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to insert attendance records",
      error: error.message
    });
  }
};

export const getAllAttendance = async(req,res)=>{
    try {
        const allAttendance = await prisma.attendance.findMany();
        if(allAttendance){
            return res.status(200).json({ success: true, message: "All Attendance",data:allAttendance });
        }else{
            return res.status(400).json({ success: false, message: "Failed to fetch attendance"});
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: "Failed to fetch attendance "+error.message});
    }
}

export const markCheckIn = async(req,res)=>{
  try {
    const {id} = req.params;
    const {workerId,checkIn,status} = req.body;
    const updatedAttendance = await prisma.attendance.update({
      where:{attendanceId:id,personId:workerId},
      data:{startDttm:checkIn,status:status}
    });
    if(updatedAttendance){
      return res.status(200).json({ success: true, message: "Attendance Updated Successfully",data:updatedAttendance });
    }else{
      return res.status(400).json({ success: false, message: "Failed to update attendance"});
    }
  } catch (error) {
     return res.status(400).json({ success: false, message: "Failed to update attendance "+error.message});
  }
  
}
export const markCheckOut = async(req,res)=>{
   try {
    const {id} = req.params;
    const {workerId,checkOut,checkIn} = req.body;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end - start;
    const diffMinutes = Math.floor(diffMs / 1000 / 60);

    const updatedAttendance = await prisma.attendance.update({
      where:{attendanceId:id,personId:workerId},
      data:{endDttm:checkOut,workHours:diffMinutes}
    });
    if(updatedAttendance){
      return res.status(200).json({ success: true, message: "Attendance Updated Successfully",data:updatedAttendance });
    }else{
      return res.status(400).json({ success: false, message: "Failed to update attendance"});
    }
  } catch (error) {
     return res.status(400).json({ success: false, message: "Failed to update attendance "+error.message});
  }
}

export const markAbsent = async(req,res)=>{
  try {
    const {id} = req.params;
    const {workerId,workHours,status} = req.body;

    const updatedAttendance = await prisma.attendance.update({
      where:{attendanceId:id,personId:workerId},
      data:{status:status,workHours:workHours}
    });
    if(updatedAttendance){
      return res.status(200).json({ success: true, message: "Attendance Updated Successfully",data:updatedAttendance });
    }else{
      return res.status(400).json({ success: false, message: "Failed to update attendance"});
    }
  } catch (error) {
     return res.status(400).json({ success: false, message: "Failed to update attendance "+error.message});
  }
}

export const markLeave = async(req,res)=>{
  try {
    const {id} = req.params;
    const {workerId,workHours,status} = req.body;

    const updatedAttendance = await prisma.attendance.update({
      where:{attendanceId:id,personId:workerId},
      data:{status:status,workHours:workHours}
    });
    if(updatedAttendance){
      return res.status(200).json({ success: true, message: "Attendance Updated Successfully",data:updatedAttendance });
    }else{
      return res.status(400).json({ success: false, message: "Failed to update attendance"});
    }
  } catch (error) {
     return res.status(400).json({ success: false, message: "Failed to update attendance "+error.message});
  }
}

export const markHalfDay = async(req,res)=>{
  try {
    const {id} = req.params;
    const {workerId,checkIn,checkOut,status} = req.body;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end - start;
    const diffMinutes = Math.floor(diffMs / 1000 / 60);

    const updatedAttendance = await prisma.attendance.update({
      where:{attendanceId:id,personId:workerId},
      data:{endDttm:checkOut,status:status,workHours:diffMinutes}
    });
    if(updatedAttendance){
      return res.status(200).json({ success: true, message: "Attendance Updated Successfully",data:updatedAttendance });
    }else{
      return res.status(400).json({ success: false, message: "Failed to update attendance"});
    }
  } catch (error) {
     return res.status(400).json({ success: false, message: "Failed to update attendance "+error.message});
  }
}