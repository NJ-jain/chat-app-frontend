import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/`;

const token = localStorage.getItem('authorization');

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
    },
});

export const messageApi = {
    getAllMessages: async () => {
        try {
            const response = await api.get('api/messages');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getPersonalMessages: async (partnerId) => {
        try {
            const response = await api.get(`api/personal-messages/${partnerId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 