import prisma from "../lib/prisma.js";

export const summaryStats = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalProductionAgg = await prisma.teaPlucking.aggregate({
    _sum: { weightKg: true },
    where: { 
        date: {
        gte: startOfDay,
        lte: endOfDay
        }
    }
    });
    const totalKgs = totalProductionAgg._sum.weightKg ?? 0;
    const activeWorkers = await prisma.person.count({
      where: {
        isDeleted: 'N',
        role: { userRole: { not: 'ADMIN' } }
      }
    });

    const totalStockItems = await prisma.stock.count({
      where: { isDeleted: 'N' }
    });

    const rawStockValue = await prisma.$queryRaw`
      SELECT COALESCE(SUM("unit_price" * "quantity"), 0) as total
      FROM "stock"
      WHERE "is_deleted" = 'N';
    `;
    const stockValue = rawStockValue[0]?.total || 0;

    return res.status(200).json({
      success: true,
      message: "Summary stats fetched successfully",
      data: {
        totalKgs,
        activeWorkers,
        totalStockItems,
        stockValue
      }
    });

  } catch (error) {
    console.error("Error fetching summary stats:", error);
    return res.status(500).json({
      success: false,
      message: `Server error in fetching dashboard stats! ${error.message}`
    });
  }
};
