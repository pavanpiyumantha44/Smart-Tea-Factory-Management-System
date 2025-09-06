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

    console.log(formattedData);


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