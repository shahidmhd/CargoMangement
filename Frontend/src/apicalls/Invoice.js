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
        return err.response.data;
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


export const EditINVOICEdata = async (payload) => {
    try {
        console.log(payload, "edit");
        const Invoiceid = payload._id
        console.log(Invoiceid);
        // Create a new object without the _id field
        const payloadWithoutId = { ...payload };
        delete payloadWithoutId._id;
        const response = await instance.patch(`/api/users/invoice/${Invoiceid}`, payloadWithoutId);
        return response.data
    } catch (err) {
        return err.message;
    }
}

export const searchdatas = async (startdate,enddate) => {
    try {
        console.log(startdate,enddate,"hhhhh");
        const data={startdate:startdate,enddate:enddate}
        console.log(data,"gg");
        const response = await instance.post("/api/users/searchinvoice",data);
        console.log(response.data,"hghghghg");
        return response.data
    } catch (err) {
        return err.message;
    }
}
export const fetchcompanyinvoices = async (companyId) => {
    try {
        console.log("kkk");
        console.log(companyId,"jjjjbb");
        const data={companyId:companyId}
      
        const response = await instance.post("/api/users/searchcompanyinvoice",data);
        // console.log(response.data,"hghghghg");
        return response.data
    } catch (err) {
        return err.message;
    }
}
export const fetchserviceinvoices = async (servicename) => {
    try {
        console.log("kkk");

        const data={servicename:servicename}
      
        const response = await instance.post("/api/users/searchserviceinvoice",data);
        // console.log(response.data,"hghghghg");
        return response.data
    } catch (err) {
        return err.message;
    }
}
