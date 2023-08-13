import instance from "./axiosinstance";

export const AddINVOICEdata = async (payload) => {
    try {
        console.log(payload, "lllllllllllllllllll");
        const response = await instance.post('/api/users/invoice', payload);
        console.log(response, "vjj");
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



export const deleteInvoice = async (invoiceid) => {
    try {
        const response = await instance.delete(`/api/users/invoice/${invoiceid}`);;
        return response.data
    } catch (err) {
        return err.message;
    }
}


export const EditINVOICEdata=async(payload)=>{
    try {
        console.log(payload,"edit");
        const Invoiceid=payload._id
        const response = await instance.patch(`/api/users/invoice/${Invoiceid}`,payload);
        return response.data
    } catch (err) {
        return err.message;
    }
}