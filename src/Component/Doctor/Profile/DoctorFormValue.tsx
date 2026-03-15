export interface DoctorFormValue{
    dob: Date | null;
    phone: string;
    address: string;
    licenseNo: string;
    specialization: string;
    department: string;
    totalExp: string;

    workStart: string;
    workEnd: string;
    breakStart: string;
    breakEnd: string;
    slotDuration: number | string;
}