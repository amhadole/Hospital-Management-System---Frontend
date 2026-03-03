export interface PatientFormValues {
  dob: Date | null;
  phone: string;
  address: string;
  aadharNo: string;
  bloodGroup: string;
  allergies: string[];
  chronicDisease: string[];
}