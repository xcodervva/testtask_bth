import api from '@/lib/axios';

export function useAuthApi() {
    const login = async (credentials) => {
        const { data } = await api.post('/login', credentials);
        return data;
    };

    const me = async () => {
        const { data } = await api.get('/me');
        return data;
    };

    return {
        login,
        me,
    };
}
