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

export {getAvailableSlots, scheduleAppointment}