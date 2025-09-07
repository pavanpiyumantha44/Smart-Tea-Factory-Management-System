import prisma from '../lib/prisma.js';

export const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, totalSalary, approvedBy } = req.body;

    const normalizedMonth = new Date(month);
    normalizedMonth.setHours(0, 0, 0, 0);

    const updatedPayroll = await prisma.payroll.update({
      where: { payrollId: id },
      data: {
        month: normalizedMonth,
        totalSalary,
        approvedBy,
        updatedAt: new Date(),
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Payroll updated successfully!", data: updatedPayroll });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server error in updating payroll! ${error.message}` });
  }
};

export const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.payroll.delete({
      where: { payrollId: id },
    });

    return res
      .status(200)
      .json({ success: true, message: "Payroll deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server error in deleting payroll! ${error.message}` });
  }
};

export const getAllPayroll = async (req, res) => {
  try {
    const allPayroll = await prisma.payroll.findMany({
      include: {
        person: {
          include: { role: true, teamMemberships: { include: { team: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Payroll fetched successfully!",
      data: allPayroll,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Server error in fetching payroll! ${error.message}` });
  }
}

export const getTeaPluckersSalary =async(req,res)=>{
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        const results = await prisma.teaPlucking.groupBy({
            by: ["personId"],
            where: {
            date: {
                gte: startOfMonth,
                lt: endOfMonth,
            },
            },
            _sum: {
            totalPayment: true,
            },
        });
        const enrichedResults = await Promise.all(
            results.map(async (r) => {
            const person = await prisma.person.findUnique({
            where: { personId: r.personId },
            select: { firstName: true, lastName: true, personCode: true },
            });

            return {
            personId: r.personId,
            name: `${person?.firstName} ${person?.lastName}`,
            personCode: person?.personCode,
            totalPayment: r._sum.totalPayment ?? 0,
            };
        })
        );
        if(enrichedResults){
            return res.status(201).json({success:true,message:"Salary fetched successfully!",data:enrichedResults});
        }else{
            return res.status(500).json({success:false,message:`Failed to fetch salary!`})
        }
    } catch (error) {
         return res.status(500).json({success:false,message:`Server error in fetching stock items!, ${error.message}`})
    }
}

export const otherWorkersSalary = async(req,res)=>{
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        const otherWorkers = await prisma.person.findMany({
            where: {
                role: {
                userRole: {
                    notIn: ["TEA-PLUCKER","ADMIN"],
                },
                },
                isDeleted: "N",
            },
            include: {
                role: true,
            },
            });

         // 2. Get Defined Salaries for roles
        const definedSalaries = await prisma.definedSalaries.findMany({
        where: { isDeleted: "N" },
        });

        const salaryMap = definedSalaries.reduce((acc, ds) => {
        acc[ds.roleId] = ds.basicSalary;
        return acc;
        }, {});
        const response = otherWorkers.map(worker => {
        return {
            personId: worker.personId,
            personCode: worker.personCode,
            name: `${worker.firstName} ${worker.lastName}`,
            role: worker.role.userRole,
            salary: salaryMap[worker.roleId] || 0,
        };
        });
        if(response){
            return res.status(201).json({success:true,message:"Salary fetched successfully!",data:response});
        }else{
            return res.status(500).json({success:false,message:`Failed to fetch salary!`})
        }
    } catch (error) {
         return res.status(500).json({success:false,message:`Server error in fetching salary!, ${error.message}`})
    }
}

export const addSalary = async (req, res) => {
  try {
    const { approvedBy, basicSalary, month, otPayment, personId, totalSalary } = req.body;

    // Normalize month to 0:0:0
    const normalizedMonth = new Date(month);
    normalizedMonth.setHours(0, 0, 0, 0);

    // Check if a salary record already exists for this user and month
    const existingSalary = await prisma.salary.findFirst({
      where: {
        personId,
        month: normalizedMonth,
      },
    });

    if (existingSalary) {
      return res.status(400).json({
        success: false,
        message: "Salary record already exists for this user for the selected month.",
      });
    }
    
    const salary = await prisma.salary.create({
      data: {
        basicSalary,
        month: normalizedMonth,
        otPayment,
        totalSalary,
        approvedBy,
        personId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Salary added successfully!",
      data: salary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error in adding salary! ${error.message}`,
    });
  }
};

