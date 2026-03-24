import axiosInstance from "../Interceptor/AxiosInterceptor"

const getAvailableSlots = async(doctorId: any, date: any)=>{
    return axiosInstance.get(`/appointment/availableSlots/${doctorId}?date=${date}`)
    .then((response:any)=> response.data)
    .catch((error: any)=>{throw error;})
}

const scheduleAppointment = async(data: any)=>{
    return axiosInstance.post('/appointment/schedule', data)
    .then((response:any)=> response.data)
    .catch((error:any)=>{throw error;})
}

const cancleAppointment = async(id:any)=>{
    return axiosInstance.put('/appointment/cancel/'+id)
    .then((response:any)=> response.data)
    .catch((error:any)=>{throw error;})
}

const getAppointment = async(id: any)=>{
    return axiosInstance.get('/appointment/getDetail/'+id)
    .then((response: any)=>response.data)
    .catch((error:any)=>{throw error;})
}

const getAppointmentDetailWithName = async(id: any)=>{
    return axiosInstance.get('/appointment/get/details/'+id)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error;})
}

const getAllAppointmentByPatient = async(patientId: any)=>{
    return axiosInstance.get('/appointment/getAllByPatient/'+patientId)
    .then((response:any)=> response.data)
    .catch((error:any)=>{throw error;})
}

export {getAvailableSlots, scheduleAppointment, cancleAppointment, getAppointment, getAppointmentDetailWithName, getAllAppointmentByPatient}