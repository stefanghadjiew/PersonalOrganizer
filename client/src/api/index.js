import axios from "axios"

const BASE_URL = 'http://localhost:5001/v1/api'

export const login = async (userInfo) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`,userInfo)
        const { data } = response
        return data
    } catch(err) {
        throw new Error(err.response.data.message)
    }
}

export const getLearningResources = async (userId) => {
    try {
        const res = await axios.get(`${BASE_URL}/users/${userId}/learning-resources/all`)
        return res.data
    } catch(err) {
        throw new Error(err.response.data.message)
    }
}
