const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/auth`;

export const authApi = {
    login: async (credentials) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    }
}; 