import prisma from "../lib/prisma.js";

export const addSingleRecord = async (req, res) => {
  try {
    const { personId, weightKg, ratePerKg, totalPayment, date } = req.body;

    if (!personId || !weightKg || !ratePerKg || !totalPayment || !date) {
      return res.status(400).json({ success: false, message: "All valid fields are required!" });
    }

    const recordDate = new Date(date);

    const existingRecord = await prisma.teaPlucking.findFirst({
      where: {
        personId: personId,
        date: recordDate,
      },
    });

    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message: "Tea plucking record already exists for this worker on this date.",
      });
    }

    const teaRecord = await prisma.teaPlucking.create({
      data: {
        personId: personId,
        date: recordDate,
        weightKg: weightKg,
        ratePerKg: ratePerKg,
        totalPayment: totalPayment,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Tea Record created successfully!",
      data: teaRecord,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error in creating Tea Record! ${error.message}`,
    });
  }
};

export const addBulkRecords = async (req, res) => {
  try {
    const teaRecords = req.body;

    if (!teaRecords || !Array.isArray(teaRecords) || teaRecords.length === 0) {
      return res.status(400).json({ success: false, message: "No tea records provided!" });
    }

    const formattedRecords = teaRecords.map(record => ({
      personId: record.personId,
      date: new Date(record.date),
      weightKg: record.weightKg,
      ratePerKg: record.ratePerKg,
      totalPayment: record.totalPayment,
    }));

    const results = [];

    for (const record of formattedRecords) {
      const exists = await prisma.teaPlucking.findFirst({
        where: {
          personId: record.personId,
          date: record.date
        }
      });

      if (exists) {
        results.push({ ...record, status: "skipped", reason: "Already exists for this date" });
      } else {
        await prisma.teaPlucking.create({ data: record });
        results.push({ ...record, status: "inserted" });
      }
    }

    return res.status(201).json({
      success: true,
      message: "Tea Records processed",
      results
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error in creating Tea Records! ${error.message}`
    });
  }
};

export const getAllRecords = async(req,res)=>{
    try {
        const allTeaRecords = await prisma.teaPlucking.findMany({
            where:{isDeleted:'N'},
            include:{
                person : true
            }
        })
        if(allTeaRecords){
            return res.status(201).json({success:true,message:"Tea Records fetched successfully!",data:allTeaRecords});
        }else{
            return res.status(500).json({success:false,message:`Failed to fetch tea records!`})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:`Server error in fetching tea records!, ${error.message}`})
    }
}