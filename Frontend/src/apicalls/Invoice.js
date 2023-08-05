import instance from "./axiosinstance";

export const AddINVOICEdata = async (payload) => {
    try {

        const response = await instance.post('/api/users/invoice', payload);
        console.log(response,"vjj");
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const getallinvoices = async () => {
    try {
        const response = await instance.get('/api/users/invoice');
        return response.data
    } catch (err) {
        return err.message;
    }
}

export const getselectedinvioce = async (invoiceid) => {
    try {
        const response = await instance.get(`/api/users/invoice/${invoiceid}`);;
        return response.data
    } catch (err) {
        return err.message;
    }
}




