const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/`;



const token = localStorage.getItem('authorization')
export const userApi = {
    getUsers: async () => {
        const response = await fetch(`${BASE_URL}api/users`, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }
}; 