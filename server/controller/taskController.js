import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskSchema.js";
// import { sendMail } from "../helpers/sendMail.js";

export const createTask = catchAsyncErrors(async (req, res, next) => {
  const { title, description,dueDate,dueTime} = req.body;
  const createdBy = req.user._id;
  const userMail=req.user.email;
  const task = await Task.create({
    title,
    description,
    dueDate,
    dueTime,
    createdBy,
    userMail,
  });
  
  // scheduleReminder(task);

  res.status(200).json({
    success: true,
    task,
    message: "Task Created",
  });
});

// const scheduleReminder = (task) => {
//   const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
//   const reminderDate = new Date(dueDateTime.getTime() - 15 * 60 * 1000); // 15 minutes before due date and time
  
//   const currentDate = new Date();

//   if (currentDate < reminderDate) {
//     // Schedule email reminder
//     setTimeout(() => {
//       sendMail(task);
//     }, reminderDate - currentDate);
//   }
// };

export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task Deleted!",
  });
});
export const updateTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }
  task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Task Updated!",
    task,
  });
});
export const getMyTask = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const tasks = await Task.find({ createdBy: user });
  res.status(200).json({
    success: true,
    tasks,
  });
});
export const getSingleTask = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let task = await Task.findById(id);
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }
  res.status(200).json({
    success: true,
    task,
  });
});
