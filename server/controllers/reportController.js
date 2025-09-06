import prisma from "../lib/prisma.js";

export const reportData = async (req, res) => {
  try {
    const { reportType, fromDate, toDate } = req.body;

    if (!reportType || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const startDttm = new Date(fromDate);
    startDttm.setHours(0, 0, 0, 0);

    const endDttm = new Date(toDate);
    endDttm.setHours(23, 59, 59, 999);

    let data;

    switch (reportType) {
      case "inventory":
        const stockData = await getStockData(startDttm, endDttm);
        if(stockData){
            data=stockData;
        }
        break;

      case "tasks":
        const taskData = await getTaskData(startDttm, endDttm);
        if(taskData){
            data=taskData;
        }
        break;
      case "attendance":
        const attendanceData = await getAttendanceData(startDttm, endDttm);
        if(attendanceData){
            data=attendanceData;
        }
        break;
      case "tea_plucking":
        const teaData = await getTeaPluckingData(startDttm, endDttm);
        if(teaData){
            data=teaData;
        }
        break;

      case "salary":
        const salariesData = await getSalaryData(startDttm, endDttm);
        if(salariesData){
            data=salariesData;
        }
        break;

      case "workers":
        const personData = await getPersonData(startDttm, endDttm);
        if(personData){
            data=personData;
        }
        break;
      case "place":
        const placeData = await getPlaceData(startDttm, endDttm);
        if(placeData){
            data=placeData;
        }
        break;

      default:
        return res.status(400).json({ error: "Invalid report type" });
    }

    return res.status(200).json({
      success: true,
      message: `${reportType} data fetched successfully!`,
      reportType: reportType,
      data:data,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


const getStockData = async (fromDate, toDate) => {
  return prisma.stock.findMany({
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};


const getTaskData = async (fromDate, toDate) => {
  return prisma.task.findMany({
    where: {
      createdAt: { gte: fromDate, lte: toDate },
    },
    include:{
        creator:true,
        supervisor:true,
        worker:true,
        taskPlace:true,
        assignedTeam:true
        }
    });
};

const getTeaPluckingData = async (fromDate, toDate) => {
  return prisma.teaPlucking.findMany({
    where: {
      createdAt: { gte: fromDate, lte: toDate },
    },
    include:{
        person:true
    }
  });
};

const getSalaryData = async (fromDate, toDate) => {
  return prisma.salary.findMany({
    where: {
      createdAt: { gte: fromDate, lte: toDate },
    },
    include:{
        person:true
    }
  });
};

const getPersonData = async (fromDate, toDate) => {
  return prisma.person.findMany({
    where: {
      createdAt: { gte: fromDate, lte: toDate },
    },
    include:{
        role:true
    }
  });
};
const getPlaceData = async (fromDate, toDate) => {
  return prisma.place.findMany({
    where: {
      createdAt: { gte: fromDate, lte: toDate },
    },
  });
};
const getAttendanceData = async (fromDate, toDate) => {
  return prisma.attendance.findMany({
    where: {
      createdAt: { gte: fromDate, lte: toDate },
    },
    include:{
        person:true
    }
  });
};