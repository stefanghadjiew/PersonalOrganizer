import axios from 'axios';
const BASE_URL = 'http://localhost:5001/v1/api';

const buildGetAllResourcesUrl = (userId, learningResourceType) => {
    let url = `${BASE_URL}/users/${userId}/${learningResourceType}/all`;
    return url;
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

export const getLearningResources = async (
    userId,
    learningResourceType
) => {
    const url = buildGetAllResourcesUrl(learningResourceType, userId);
    console.log(url);
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        throw new Error(err.response.data.message);
    }
};
