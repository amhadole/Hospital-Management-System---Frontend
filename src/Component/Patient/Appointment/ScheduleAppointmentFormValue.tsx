export interface ScheduleAppointmentFormValue{
    doctorId: string;
    patientId: string;
    appointmentDate: Date | null;
    slot: string;
    reason: string;
    note: string;
}