import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { doctorDepartments, doctorSpecializations } from "../../../Data/DropDown";
import { useDisclosure } from "@mantine/hooks";
import { getDoctor, updateDoctor } from "../../../Service/DoctorProfileServices";
import { useForm } from "@mantine/form";
import { DoctorFormValue } from "./DoctorFormValue";
import { formatDate } from "../../../Utility/DateUtility";
import { errorNotification, successNotification } from "../../../Utility/Notification";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [editMode, setEdit] = useState(false);
  const [opened, {open, close}] = useDisclosure(false);
  const [profile, setProfile] = useState<any>({});
 
   useEffect(()=>{
    getDoctor(user.profileId).then((res)=>{
       const data = res.data;
    setProfile({...data});
    }).catch((error)=>{
       console.log(error);
     })
   },[user]);
 
  const form = useForm<DoctorFormValue>({
     
     initialValues: {
       dob: null,
       phone: "",
       address: "",
       licenseNo: "",
       specialization: "",
       department: "",
       totalExp: "",
     },
 
     validate: {
         dob: (value) => (!value ? 'Date of Birth is required' : null),
         phone: (value) => (!value ? 'Phone number is required' : null),
         address: (value) => (!value ? 'Address is required' : null),
         licenseNo: (value) => (!value ? 'License Number is required' : null),
     },
   });
 
   const handleEdit=()=>{
     form.setValues({...profile, dob: profile.dob?new Date(profile.dob):undefined});
     setEdit(true);
   };
 
   const handleSubmit = (e: any)=>{
     let values = form.getValues();
     form.validate();
     if(!form.isValid()) return;
     console.log(values);
     updateDoctor({...profile, ...values}).then((_data)=>{
       successNotification("Profile Update Successfully");  
       setProfile({...profile, ...values});
       setEdit(false);
     }).catch((error)=>{
       errorNotification(error.res.data.errorMessage);
     })
   };
 
   if(!profile) return null;
 
   return (
     <div className="p-10">
       <div className="flex justify-between items-center">
         <div className="flex gap-5 items-center">
           <div className="flex flex-col items-center gap-3">
               <Avatar
             variant="filled"
             src="/doctorAvatar.jpg"
             alt="it's me"
             size={150}
           />
           {editMode && <Button size="sm" onClick={open} variant="filled">Upload</Button>}
           </div>
           
           <div className="flex flex-col gap-3">
             <div className="text-3xl font-medium text-neutral-900">
               {user.name}
             </div>
             <div className="text-xl text-neutral-700">{user.email}</div>
           </div>
         </div>
         {!editMode ? (
           <Button
             size="md"
             type="button"
             onClick={handleEdit}
             variant="filled"
             leftSection={<IconEdit />}
           >
             Edit
           </Button>
         ) : (
           <Button
             size="md"
             type="submit"
             onClick={handleSubmit}
             variant="filled"
           >
             Save
           </Button>
         )}
       </div>
       <Divider my="xl" />
       <div>
         <div className="text-2xl font-medium mb-5 text-neutral-900">
           Personal Information
         </div>
         <Table
           striped
           stripedColor="tealmedical.1"
           verticalSpacing="md"
           withRowBorders={false}
         >
           <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
             <Table.Tr>
               <Table.Td className="font-semibold text-gray-600 w-1/3 text-xl">
                 Date of Birth
               </Table.Td>
               {editMode ? (
                 <Table.Td className="text-xl">
                   <DateInput {...form.getInputProps("dob")} placeholder="Date Of Birth" />
                 </Table.Td>
               ) : (
                 <Table.Td className="text-xl">{formatDate(profile.dob)??'-'}</Table.Td>
               )}
             </Table.Tr>
 
             <Table.Tr>
               <Table.Td className="font-semibold text-gray-600 text-xl">
                 Phone
               </Table.Td>
               {editMode ? (
                 <Table.Td className="text-xl">
                   {" "}
                   <NumberInput {...form.getInputProps("phone")} maxLength={10} clampBehavior="strict" placeholder="Phone Number" hideControls/>
                 </Table.Td>
               ) : (
                 <Table.Td className="text-xl">{profile.phone??'-'}</Table.Td>
               )}
             </Table.Tr>
 
             <Table.Tr>
               <Table.Td className="font-semibold text-gray-600 text-xl">
                 Address
               </Table.Td>
               {editMode ? (
                 <Table.Td className="text-xl">
                   {" "}
                   <TextInput {...form.getInputProps("address")} placeholder="Address" />
                 </Table.Td>
               ) : (
                 <Table.Td className="text-xl">{profile.address??'-'}</Table.Td>
               )}
             </Table.Tr>
 
             <Table.Tr>
               <Table.Td className="font-semibold text-gray-600 text-xl">
                 License Number
               </Table.Td>
               {editMode ? (
                 <Table.Td className="text-xl">
                   {" "}
                   <TextInput {...form.getInputProps("licenseNo")} maxLength={10}  placeholder="License Number" />
                 </Table.Td>
               ) : (
                 <Table.Td className="text-xl">{profile.licenseNo??'-'}</Table.Td>
               )}
             </Table.Tr>
 
             <Table.Tr>
               <Table.Td className="font-semibold text-gray-600 text-xl">
                 Specialization
               </Table.Td>
               {editMode ? (
                 <Table.Td className="text-xl">
                   {" "}
                   <Select {...form.getInputProps("specialization")} data={doctorSpecializations} placeholder="Specialization"/>
                 </Table.Td>
               ) : (
                 <Table.Td className="text-xl">
                   {profile.specialization?? '-'}
                 </Table.Td>
               )}
             </Table.Tr>
 
             <Table.Tr>
               <Table.Td className="font-semibold text-gray-600 text-xl">
                 Department
               </Table.Td>
               {editMode ? (
                 <Table.Td className="text-xl">
                   {" "}
                   <Select {...form.getInputProps("department")} data={doctorDepartments} placeholder="Department"  />
                 </Table.Td>
               ) : (
                 <Table.Td className="text-xl">{profile.department??'-'}</Table.Td>
               )}
             </Table.Tr>
 
             <Table.Tr>
               <Table.Td className="font-semibold text-gray-600 text-xl">
                 Total Experience
               </Table.Td>
               {editMode ? (
                 <Table.Td className="text-xl">
                   {" "}
                  <NumberInput {...form.getInputProps("totalExp")} maxLength={2} max={50} clampBehavior="strict" placeholder="Total Experience" hideControls/>                 </Table.Td>
               ) : (
                 <Table.Td className="text-xl">
                   {profile.totalExp??'-'}
                 </Table.Td>
               )}
             </Table.Tr>
           </Table.Tbody>
         </Table>
       </div>
       <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
       </Modal>
     </div>
   );
 };

export default Profile;
