import prisma from '../lib/prisma.js';

export const createTask = async (req, res) => {
  try {
    const {
      taskName,
      description,
      taskType,
      taskStatus,
      createdBy,
      assignedSupervisor,
      placeId,
      startDateTime,
      teamId,
      workerId,
      items
    } = req.body;

    if (
      !taskName ||
      !description ||
      !taskType ||
      !taskStatus ||
      !createdBy ||
      !assignedSupervisor ||
      !placeId ||
      !startDateTime ||
      !teamId
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided!.",
      });
    }

    const task = await prisma.task.create({
      data: {
        taskName,
        description,
        taskType,
        taskStatus,
        startDateTime: new Date(startDateTime),
        createdBy,
        assignedSupervisor,
        placeId,
        teamId,
        ...(workerId && { workerId }),
      },
    });

    if (task) {
      if (items && items.length > 0) {
        const now = new Date();
        const defaultType = 'OUT';

        const stockTransactions = items.map((item) => ({
          itemId: item.itemId,
          taskId: task.taskId,
          date: now,
          type: defaultType,
          quantity: parseFloat(item.quantity),
        }));

        await prisma.stockTransaction.createMany({
          data: stockTransactions,
        });
      }
      return res.status(201).json({success: true,message: "Task created successfully!",data: task,});
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to create task!",
      });
    }
  } catch (error) {
    console.error("Create Task Error:", error);
    return res.status(500).json({
      success: false,
      message: `Server error in creating task! ${error.message}`,
    });
  }
};

export const allTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { isDeleted: 'N' },
      include: {
        assignedTeam: true,
        worker: true,
        supervisor: true,
        creator: true,
        taskPlace: true
      }
    });

    if (tasks && tasks.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Tasks fetched successfuly",
        data: tasks
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No tasks found."
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to get tasks! ${error.message}`
    });
  }
};

export const updateTaskStatus = async(req,res)=>{
  try {
    const {id} = req.params;
    const taskStatus = req.body.data;
    const updatedStatus = await prisma.task.update({
      where:{taskId:id},
      data:{taskStatus:taskStatus,updatedAt:new Date()}
    })
    if(updatedStatus){
       return res.status(200).json({success: true,message: "Tasks status updated successfuly",data: updatedStatus});
    }else{
      return res.status(404).json({
        success: false,
        message: "Failed to update tasks status."
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update task status! ${error.message}`
    });
  }
}

export const getTask = async(req,res)=>{
  try {
    const {id} = req.params;
    const task = await prisma.task.findFirst({
      where:{taskId:id,isDeleted:'N'},
      include: {
        assignedTeam: true,
        worker: true,
        supervisor: true,
        creator: true,
        taskPlace: true
      }
    })
    if(task){
       return res.status(200).json({success: true,message: "Tasks fetched successfuly",data: task});
    }else{
      return res.status(404).json({
        success: false,
        message: "Failed to fetch task."
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch task! ${error.message}`
    });
  }
}

export const updateTaskInfo = async(req,res)=>{
  try {
    const {id} = req.params;
     const {
      taskName,
      description,
      taskType,
      taskStatus,
      createdBy,
      assignedSupervisor,
      placeId,
      startDateTime,
      teamId,
      workerId,
    } = req.body;
    if (
      !taskName ||
      !description ||
      !taskType ||
      !taskStatus ||
      !createdBy ||
      !assignedSupervisor ||
      !placeId ||
      !startDateTime ||
      !teamId
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided!.",
      });
    }
    const updatedTask = await prisma.task.update({
      where:{taskId:id},
      data: {
        taskName,
        description,
        taskType,
        taskStatus,
        startDateTime: new Date(startDateTime),
        createdBy,
        assignedSupervisor,
        placeId,
        teamId,
        ...(workerId && { workerId }),
      },
    })
    if(updatedTask){
       return res.status(200).json({success: true,message: "Task updated successfuly",data: updatedTask});
    }else{
      return res.status(404).json({
        success: false,
        message: "Failed to update task."
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update task! ${error.message}`
    });
  }
}