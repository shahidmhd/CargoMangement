import instance from "./axiosinstance";

export const AddCompanydata = async (payload) => {
    try {
        const response = await instance.post('/api/users/company', payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}

export const getallcompanies = async () => {
    try {
        const response = await instance.get('/api/users/company');
        return response.data
    } catch (err) {
        return err.message;
    }
}

export const editcompany = async (payload) => {
    try {
        console.log(payload._id);
        const response = await instance.patch(`/api/users/company/${payload._id}`, payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}

export const deletecompany = async (id) => {
    try {
        const response = await instance.delete(`/api/users/company/${id}`);
        return response.data
    } catch (err) {
        return err.message;
    }
}