import axios from 'axios';
const BASE_URL = 'http://localhost:5001/v1/api';

const buildGetAllResourcesUrl = (userId, learningResourceType) => {
    let url = `${BASE_URL}/users/${userId}/${learningResourceType}/all`;
    return url;
};

const buildCreateResourceUrl = (userId, learningResourceType) => {
    let url = `${BASE_URL}/users/${userId}/${learningResourceType}/create`;
    return url;
};

const buildDeleteResourceUrl = (learningResourceType, resourceId) => {
    let url = `${BASE_URL}/${learningResourceType}/${resourceId}/delete`;
    return url;
};

export const apiRegisterUser = async userInfo => {
    try {
        const response = await axios.post(
            `${BASE_URL}/users/create`,
            userInfo
        );
        const { data } = response;
        return data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const login = async userInfo => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, userInfo);
        const { data } = response;
        return data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const apiChangePassword = async userInfo => {
    try {
        const response = await axios.post(
            `${BASE_URL}/change-password`,
            userInfo
        );
        const { data } = response;
        return data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const getLearningResources = async (
    userId,
    learningResourceType
) => {
    const url = buildGetAllResourcesUrl(learningResourceType, userId);
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const createLearningResource = async (
    userId,
    learningResourceType,
    data
) => {
    const url = buildCreateResourceUrl(userId, learningResourceType);
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const deleteLearningResource = async ({
    learningResourceType,
    resourceId,
}) => {
    const url = buildDeleteResourceUrl(learningResourceType, resourceId);
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

//Projects page is different than LearningResources pages
const buildEditProjectUrl = projectId => {
    const url = `${BASE_URL}/projects/${projectId}/edit`;
    return url;
};

const buildCreateProjectTaskUrl = projectId => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/create`;
    return url;
};

const buildEditProjectTaskUrl = (projectId, taskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/edit`;
    return url;
};

const buildDeleteProjectTaskUrl = (projectId, taskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/delete`;
    return url;
};

const buildCreateProjectTaskSubtask = (projectId, taskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/subtasks/create`;
    return url;
};

const buildDeleteProjectTaskSubtaskUrl = (
    projectId,
    taskId,
    subtaskId
) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/delete`;
    return url;
};

const buildEditProjectTaskSubtaskUrl = (projectId, taskId, subtaskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/edit`;
    return url;
};

const buildMarkTaskAsDoneUrl = (projectId, taskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/mark-task-as-done`;
    return url;
};

const buildMarkTaskSubtaskAsDone = (projectId, taskId, subtaskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/mark-subtask-as-done`;
    return url;
};

const buildCreateProjetTaskTagUrl = (projectId, taskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/tags/create`;
    return url;
};

const buildCreateProjectTaskSubtaskTagUrl = (
    projectId,
    taskId,
    subtaskId
) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/tags/create`;
    return url;
};

const buildDeleteProjectTaskTag = (projectId, taskId) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/delete`;
    return url;
};

const buildDeleteProjectTaskSubtaskTag = (
    projectId,
    taskId,
    subtaskId
) => {
    const url = `${BASE_URL}/projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/delete`;
    return url;
};

export const apiCreateProject = async ({
    userId,
    learningResourceType,
    data,
}) => {
    const url = buildCreateResourceUrl(userId, learningResourceType);
    try {
        const res = await axios.post(url, { projectTitle: data });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const apiDeleteProject = async ({
    projectId,
    learningResourceType,
}) => {
    const url = buildDeleteResourceUrl(learningResourceType, projectId);
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const apiEditProject = async ({ projectId, data }) => {
    const url = buildEditProjectUrl(projectId);
    try {
        const res = await axios.put(url, { projectTitle: data });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const apiCreateProjectTask = async ({ projectId, data }) => {
    const url = buildCreateProjectTaskUrl(projectId);
    try {
        const res = await axios.post(url, { taskTitle: data });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiEditProjectTask = async ({ projectId, taskId, data }) => {
    const url = buildEditProjectTaskUrl(projectId, taskId);
    try {
        const res = await axios.put(url, { taskTitle: data });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiDeleteProjectTask = async ({ projectId, taskId }) => {
    const url = buildDeleteProjectTaskUrl(projectId, taskId);
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiCreateProjectTaskSubtask = async ({
    projectId,
    taskId,
    data,
}) => {
    const url = buildCreateProjectTaskSubtask(projectId, taskId);
    try {
        const res = await axios.post(url, { taskSubtaskTitle: data });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiEditProjectTaskSubtask = async ({
    projectId,
    taskId,
    subtaskId,
    data,
}) => {
    const url = buildEditProjectTaskSubtaskUrl(
        projectId,
        taskId,
        subtaskId
    );
    try {
        const res = await axios.put(url, { taskSubtaskTitle: data });
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiDeleteProjectTaskSubtask = async ({
    projectId,
    taskId,
    subtaskId,
}) => {
    const url = buildDeleteProjectTaskSubtaskUrl(
        projectId,
        taskId,
        subtaskId
    );
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiCreateTag = async ({ type, config }) => {
    const { projectId, taskId, tag } = config;
    switch (type) {
        case 'task':
            const createProjectTaskTagUrl = buildCreateProjetTaskTagUrl(
                projectId,
                taskId
            );
            try {
                const res = await axios.post(createProjectTaskTagUrl, {
                    tag,
                });
                return res.data;
            } catch (err) {
                throw new Error(err.response.data.message);
            }

        case 'subtask':
            const { subtaskId } = config;

            const createProjectTaskSubtaskUrl =
                buildCreateProjectTaskSubtaskTagUrl(
                    projectId,
                    taskId,
                    subtaskId
                );

            try {
                const res = await axios.post(createProjectTaskSubtaskUrl, {
                    tag,
                });
                return res.data;
            } catch (err) {
                throw new Error(err.response.data.message);
            }
        default:
            return;
    }
};
export const apiMarkTaskAsDone = async ({ projectId, taskId }) => {
    const url = buildMarkTaskAsDoneUrl(projectId, taskId);
    try {
        const res = await axios.put(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiMarkTaskSubtaskAsDone = async ({
    projectId,
    taskId,
    subtaskId,
}) => {
    const url = buildMarkTaskSubtaskAsDone(projectId, taskId, subtaskId);
    try {
        const res = await axios.put(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};

export const apiDeleteProjectTaskTag = async ({ projectId, taskId }) => {
    const url = buildDeleteProjectTaskTag(projectId, taskId);
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
export const apiDeleteProjectTaskSubtaskTag = async ({
    projectId,
    taskId,
    subtaskId,
}) => {
    const url = buildDeleteProjectTaskSubtaskTag(
        projectId,
        taskId,
        subtaskId
    );
    try {
        const res = await axios.delete(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
