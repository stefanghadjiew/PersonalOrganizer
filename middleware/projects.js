const db = require("../db/index.js");
const { getAllResources } = require("../helperFunctions.js");

const allowedTags = [
  "blocker",
  "high priority",
  "low priority",
  "up next",
  "remember",
  "design",
  "bugs",
  "in progress",
  "investigate",
  "test",
];

const { Projects, LearningResources } = db;

const createProject = async (req, res, next) => {
  const { projectTitle } = req.body;
  const { userId } = req.params;
  try {
    const userLearningResources = await LearningResources.find({ userId });
    const allProjects = await Projects.find({
      _id: { $in: userLearningResources[0].projects },
    });

    if (allProjects.every((project) => project.title !== projectTitle)) {
      const createdProject = await Projects.create({
        title: projectTitle,
        learningResourcesId: userLearningResources[0]._id,
      });
      userLearningResources[0].projects.push(createdProject._id);
      await userLearningResources[0].save();
      res.status(200).json({ message: `Project ${projectTitle} created!` });
    } else {
      res
        .status(422)
        .json({ message: `Project ${projectTitle} already exists!` });
    }
  } catch (err) {
    return next(err);
  }
};

const createProjectTask = async (req, res, next) => {
  const { projectId } = req.params;
  const { taskTitle } = req.body;

  try {
    const project = await Projects.find({ _id: projectId });

    if (project[0].tasks.every((task) => task.title !== taskTitle)) {
      project[0].tasks.push({ title: taskTitle });
      await project[0].save();
      const createdTask = project[0].tasks.find((t) => t.title === taskTitle);
      return res.status(200).json({
        message: `Task ${taskTitle} added to project ${project[0].title}`,
      });
    } else {
      return res.status(422).json({ message: "Task already exists" });
    }
  } catch (err) {
    return next(err);
  }
};

const createProjectTaskSubtask = async (req, res, next) => {
  const { projectId, taskId } = req.params;
  const { taskSubtaskTitle } = req.body;
  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    if (task.subtasks.every((st) => st.title !== taskSubtaskTitle)) {
      task.subtasks.push({ title: taskSubtaskTitle });
      await project[0].save();
      const createdTaskSubtask = task.subtasks.find(
        (subt) => subt.title === taskSubtaskTitle
      );
      res.status(200).json({
        message: `Subtask: ${createdTaskSubtask.title} created for Task: ${task.title}`,
      });
    } else {
      return res.status(422).json({ message: "Subtask already exists" });
    }
  } catch (err) {
    return next(err);
  }
};

const createProjecTaskTag = async (req, res, next) => {
  const { projectId, taskId } = req.params;
  const { tag } = req.body;

  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    if (task.tags.includes(tag)) {
      return res.status(422).json({ message: "Tag already exists" });
    }
    if (!allowedTags.includes(tag)) {
      return res.status(403).json({ message: "Tag not allowed" });
    }
    task.tags.push(tag);
    await project[0].save();
    res.status(200).json({ message: `Tag ${tag} added to task ${task.title}` });
  } catch (err) {
    return next(err);
  }
};
const createProjectTaskSubtaskTag = async (req, res, next) => {
  const { projectId, taskId, subtaskId } = req.params;
  const { tag } = req.body;
  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    const subtask = task.subtasks.find((s) => s._id == subtaskId);
    if (!allowedTags.includes(tag)) {
      return res.status(403).json({ message: "Tag not allowed" });
    }
    if (subtask.tags.includes(tag)) {
      return res.status(422).json({ message: "Tag already exists" });
    }
    subtask.tags.push(tag);
    await project[0].save();
    res
      .status(200)
      .json({ message: `Tag ${tag} added to subtask ${subtask.title}` });
  } catch (err) {
    return next(err);
  }
};

const getAllProjects = async (req, res, next) => {
  const { userId } = req.params;

  let userLearningResources = await LearningResources.find({ userId });
  try {
    const allResources = await getAllResources(Projects, userLearningResources);
    res.status(200).json(allResources);
  } catch (err) {
    return next(err);
  }
};

const deleteProject = async (req, res, next) => {
  const { projectId } = req.params;

  try {
    const projectToRemove = await Projects.findById(projectId);
    await Projects.deleteOne(projectToRemove);
    res.status(200).json({
      message: `Project ${projectToRemove.title} removed successfully`,
    });
  } catch (err) {
    return next(err);
  }
};

const deleteProjectTask = async (req, res, next) => {
  const { projectId, taskId } = req.params;

  try {
    const project = await Projects.find({ _id: projectId });
    const taskToRemove = project[0].tasks.find((t) => t._id == taskId);
    const taskToRemoveIndex = project[0].tasks.findIndex(
      (t) => t._id == taskId
    );
    project[0].tasks.splice(taskToRemoveIndex, 1);
    await project[0].save();
    res.status(200).json({
      message: `Task: ${taskToRemove.title} removed from Project: ${project[0].title}!`,
    });
  } catch (err) {
    return next(err);
  }
};

const deleteProjectTaskSubtask = async (req, res, next) => {
  const { projectId, taskId, subtaskId } = req.params;

  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    const subtaskToRemove = task.subtasks.find((s) => s._id == subtaskId);
    const subtaskToRemoveIndex = task.subtasks.findIndex(
      (s) => s._id == subtaskId
    );
    task.subtasks.splice(subtaskToRemoveIndex, 1);
    await project[0].save();
    res
      .status(200)
      .json({ message: `Subtask ${subtaskToRemove.title} removed!` });
  } catch (err) {
    return next(err);
  }
};

const markTaskAsDone = async (req, res, next) => {
  const { projectId, taskId } = req.params;

  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    task.done = true;
    await project[0].save();
    res.status(200).json({ message: `Task ${task.title} completed!` });
  } catch (err) {
    return next(err);
  }
};

const markTaskSubtaskAsDone = async (req, res, next) => {
  const { projectId, taskId, subtaskId } = req.params;
  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    const subtask = task.subtasks.find((s) => s._id == subtaskId);
    subtask.done = true;
    await project[0].save();
    res.status(200).json({ message: `Subtask ${subtask.title} completed` });
  } catch (err) {
    return next(err);
  }
};

const editProject = async (req, res, next) => {
  const { projectId } = req.params;
  const { projectTitle } = req.body;
  try {
    const project = await Projects.find({ _id: projectId });
    project[0].title = projectTitle;
    await project[0].save();
    res
      .status(200)
      .json({ message: `Success! New project title: ${project[0].title}` });
  } catch (err) {
    return next(err);
  }
};

const editProjectTask = async (req, res, next) => {
  const { projectId, taskId } = req.params;
  const { taskTitle } = req.body;
  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    task.title = taskTitle;
    await project[0].save();
    res.status(200).json({ message: `Success! New task title: ${task.title}` });
  } catch (err) {
    return next(err);
  }
};

const editProjectTaskSubtask = async (req, res, next) => {
  const { projectId, taskId, subtaskId } = req.params;
  const { subtaskTitle } = req.body;
  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    const subtask = task.subtasks.find((s) => s._id == subtaskId);
    subtask.title = subtaskTitle;
    await project[0].save();
    res
      .status(200)
      .json({ message: `Success! New subtask title: ${subtask.title}` });
  } catch (err) {
    return next(err);
  }
};

const deleteProjectTaskTag = async (req, res, next) => {
  const { projectId, taskId } = req.params;
  const { tag } = req.body;
  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    if (!task.tags.includes(tag)) {
      return res
        .status(422)
        .json({ message: `Tag ${tag} not applied to task ${task.title}!` });
    }
    if (!allowedTags.includes(tag)) {
      return res.status(403).json({ message: "Tag not allowed" });
    }
    const tagIndex = task.tags.findIndex((t) => t === tag);
    task.tags.splice(tagIndex, 1);
    await project[0].save();
    res
      .status(200)
      .json({ message: `Tag ${tag} removed from task ${task.title}` });
  } catch (err) {
    return next(err);
  }
};

const deleteProjectTaskSubtaskTag = async (req, res, next) => {
  const { projectId, taskId, subtaskId } = req.params;
  const { tag } = req.body;
  try {
    const project = await Projects.find({ _id: projectId });
    const task = project[0].tasks.find((t) => t._id == taskId);
    const subtask = task.subtasks.find((s) => s._id == subtaskId);
    if (!allowedTags.includes(tag)) {
      return res.status(403).json({ message: "Tag not allowed" });
    }
    if (!subtask.tags.includes(tag)) {
      return res.status(422).json({
        message: `Tag ${tag} not applied to subtask ${subtask.title}!`,
      });
    }
    const tagIndex = subtask.tags.findIndex((t) => t === tag);
    subtask.tags.splice(tagIndex, 1);
    await project[0].save();
    res
      .status(200)
      .json({ message: `Tag ${tag} removed from subtask ${subtask.title}` });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createProject,
  createProjectTask,
  createProjectTaskSubtask,
  createProjecTaskTag,
  createProjectTaskSubtaskTag,
  getAllProjects,
  deleteProject,
  deleteProjectTask,
  deleteProjectTaskSubtask,
  deleteProjectTaskTag,
  deleteProjectTaskSubtaskTag,
  editProject,
  editProjectTask,
  editProjectTaskSubtask,
  markTaskAsDone,
  markTaskSubtaskAsDone,
};
