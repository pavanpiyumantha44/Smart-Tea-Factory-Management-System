import prisma from '../lib/prisma.js'

function createTaskObserver(prisma) {
  return async function updateTasks(weather) {
    if (weather === "RAIN") {
      await prisma.task.updateMany({
        where: { status: "IN_PROGRESS" },
        data: { status: "HOLD" }
      });
      console.log("⏸ All in-progress tasks set to HOLD due to rain.");
    }
  };
}

export default createTaskObserver;
