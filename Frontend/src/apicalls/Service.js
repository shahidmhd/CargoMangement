import instance from "./axiosinstance";

export const Addservicedata = async (payload) => {
    try {

        // console.log(payload, "hhhhhhhhh");
        // payload.GST = Number(payload.GST);
        // payload.SGST = Number(payload.SGST);
        // payload.CGST = Number(payload.CGST);
        // payload.Rate = Number(payload.Rate);
        // payload.UOM = Number(payload.UOM);
        // console.log(payload,"hhhhhhhhhhhhhfffffffffffffffffffffffff");
        const response = await instance.post('/api/users/service', payload);
        console.log(response,"vjj");
        return response.data
    } catch (err) {
        return err.message;
    }
}

export const getallServices = async () => {
    try {
        const response = await instance.get('/api/users/service');
        return response.data
    } catch (err) {
        return err.message;
    }
}