import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { doctorDepartments, doctorSpecializations } from "../../../Data/DropDown";
import { useDisclosure } from "@mantine/hooks";

const doctor = {
  name: "Dr. Rajesh Sharma",
  email: "rajesh.sharma@example.com",
  dob: "1990-08-12",
  phone: "9876543210",
  address: "Virar, Maharashtra",
  licenseNo: "MH-2020-456789",
  specialization: "Cardiologist",
  department: "Cardiology",
  totalExp: 8
};

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [editMode, setEdit] = useState(false);
  const [opened, {open, close}] = useDisclosure(false);
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
            onClick={() => setEdit(true)}
            variant="filled"
            leftSection={<IconEdit />}
          >
            Edit
          </Button>
        ) : (
          <Button
            size="md"
            onClick={() => setEdit(false)}
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
                  <DateInput placeholder="Date Of Birth" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{doctor.dob}</Table.Td>
              )}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                Phone
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <NumberInput maxLength={10} clampBehavior="strict" placeholder="Phone Number" hideControls/>
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{doctor.phone}</Table.Td>
              )}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                Address
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <TextInput placeholder="Address" />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{doctor.address}</Table.Td>
              )}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                License Number
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <NumberInput maxLength={10} clampBehavior="strict" placeholder="License Number" hideControls/>
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{doctor.licenseNo}</Table.Td>
              )}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                Specialization
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <Select data={doctorSpecializations} placeholder="Specialization"  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                    {doctor.specialization}
                  </span>
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
                Department
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                <Select data={doctorDepartments} placeholder="Department"  />
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">{doctor.department}</Table.Td>
              )}
            </Table.Tr>

            <Table.Tr>
              <Table.Td className="font-semibold text-gray-600 text-xl">
                Total Experience
              </Table.Td>
              {editMode ? (
                <Table.Td className="text-xl">
                  {" "}
                  <NumberInput maxLength={2} max={50} clampBehavior="strict" placeholder="Total Experience" hideControls/>
                </Table.Td>
              ) : (
                <Table.Td className="text-xl">
                  {doctor.totalExp}
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
