import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bloodGroups } from "../../../Data/DropDown";
import { useDisclosure } from "@mantine/hooks";
import { getPatient, updatePatient } from "../../../Service/PatientProfileServices";
import { formatDate } from "../../../Utility/DateUtility";
import { useForm } from "@mantine/form";
import { errorNotification, successNotification } from "../../../Utility/Notification";
import { PatientFormValues } from "./PatientFormValues";

// const patient = {
//   dob: "1998-05-14",
//   phone: "9876543210",
//   address: "Virar, Maharashtra",
//   aadharNo: "1234 5678 9012",
//   bloodGroup: "O+",
//   allergies: "Peanuts",
//   chronicDisease: "Diabetes",
// };

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [editMode, setEdit] = useState(false);
  const [opened, {open, close}] = useDisclosure(false);
  const [profile, setProfile] = useState<any>(null);
  useEffect(()=>{
    if(!user?.profileId) return;
    getPatient(user.profileId).then((data)=>{
      setProfile(data);
    }).catch((error)=>{
      console.log(error);
    })
  },[user]);

 const form = useForm<PatientFormValues>({
    
    initialValues: {
      dob: null as Date | null,
      phone: "",
      address: "",
      aadharNo: "",
      bloodGroup: "",
      allergies:  [],
      chronicDisease: [],
    },

    validate: {
        dob: (value) => (!value ? 'Date of Birth is required' : null),
        phone: (value) => (!value ? 'Phone number is required' : null),
        address: (value) => (!value ? 'Address is required' : null),
        aadharNo: (value) => (!value ? 'Aadhar Number is required' : null),
    },
  });

  const handleEdit=()=>{
    if (!profile) return;

    form.setValues({
      dob: profile.dob ? new Date(profile.dob) : null,
      phone: profile.phone || "",
      address: profile.address || "",
      aadharNo: profile.aadharNo || "",
      bloodGroup: profile.bloodGroup || "",
      allergies: profile.allergies || [],
      chronicDisease: profile.chronicDisease || [],
    });

    setEdit(true);
  };

  const handleSubmit = (values: PatientFormValues)=>{
    if(!profile?.id){
      errorNotification("Profile ID Missing");
      return;
    }
    const payload = {
      ...profile,
      ...values,
      dob: values.dob ? values.dob.toISOString() : null,
    };

    updatePatient(payload).then((data) =>{
      successNotification("Profile Updated Successfully");
      setProfile(data);
      setEdit(false);
    }).catch((error)=>{
      errorNotification(error?.response?.data?.errorMessage || "Update failed");
    });
    
  };

  if(!profile) return null;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}  className="p-10">
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
          <Table.Tbody>
            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 w-1/3 text-xl">
                Date of Birth
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  <DateInput {...form.getInputProps("dob")} placeholder="Date Of Birth" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{formatDate(profile.dob)}</Table.Td>
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
                Aadhar Number
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <NumberInput {...form.getInputProps("aadharNo")} maxLength={10} clampBehavior="strict" placeholder="Aadhar Number" hideControls/>
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{profile.aadharNo??'-'}</Table.Td>
              )}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                Blood Group
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <Select {...form.getInputProps("bloodGroup")} data={bloodGroups} placeholder="Blood Group"  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile?.bloodGroup ?(
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                  {profile.bloodGroup}
                </span>
                  ):(
                    '-'
                  )}
                </Table.Td>
              )}

              {/* <Table.Td className='text-xl'>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                  {patient.bloodGroup}
                </span> */}
              {/* </Table.Td> */}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                Allergies
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <TagsInput {...form.getInputProps("allergies")} label="Press Enter to submit a tag" placeholder="Allergies" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{profile.allergies??'-'}</Table.Td>
              )}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                Chronic Disease
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <TagsInput {...form.getInputProps("chronicDisease")} label="Press Enter to submit a tag" placeholder="Chronic Disease" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {profile.chronicDisease?? '-'}
                </Table.Td>
              )}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
      <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Profile Picture</span>}>
      </Modal>
    </form>
  );
};

export default Profile;
