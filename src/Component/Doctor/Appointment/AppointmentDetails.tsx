import { Badge, Breadcrumbs, Card, Group, Tabs, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAppointmentDetailWithName } from "../../../Service/AppointmentService";
import { formateDateWithTime } from "../../../Utility/DateUtility";
import { IconClipboardHeart, IconPrescription, IconReportMedical} from "@tabler/icons-react";
import AppointmentReports from "./AppointmentReports";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<any>({});
  useEffect(() => {
    getAppointmentDetailWithName(id)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setAppointment(data);
      })
      .catch((err) => {
        console.error("Error fetchning appointment details:", err);
      });
  }, [id]);
  return (
    <div>
      <Breadcrumbs mb="md">
        <Link
          className="text-blue-400 hover:underline"
          to={"/doctor/dashboard"}
        >
          Dashboard
        </Link>
        <Link
          className="text-blue-400 hover:underline"
          to={"/doctor/appointment"}
        >
          Appointment
        </Link>
        <Text className="text-blue-400">Details</Text>
      </Breadcrumbs>

      <div className="p-2">
        <Card shadow="sm" padding="lg" radius="md" mb={10} withBorder className="transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
          <Group justify="space-between" mb="md">
            <Title order={2}>{appointment.patientName}</Title>
            <Badge color={appointment.status === 'CANCLLED' ? 'red' :'green'} variant="light">{appointment.status}</Badge>
          </Group>
        <div className="grid grid-cols-2 gap-5 mb-2">
            <Text size="sm" mb="xs">
            <b>Patient Email:</b> {appointment.patientEmail}
          </Text>
            <Text size="sm" mb="xs">
            <b>Patient Phone:</b> {appointment.patientPhone}
          </Text>
        </div>
          <div className="grid grid-cols-2 gap-5">
            <Text size="sm" mb="xs">
            <b>Reason:</b> {appointment.reason}
          </Text>
            <Text size="sm" mb="xs">
            <b>Time:</b>{" "}
            {formateDateWithTime((appointment.appointmentTime))}
          </Text>
        </div>
          <Text size="sm" mb="xs">
            <b>Note:</b> {appointment.note}
          </Text>
        </Card>

        <Tabs variant="pills" my='md' defaultValue="medical">
      <Tabs.List>
        <Tabs.Tab value="medical" leftSection={<IconReportMedical size={20} />}>
          Medical History
        </Tabs.Tab>
        <Tabs.Tab value="prescription" leftSection={<IconPrescription size={20} />}>
            Prescriptions
        </Tabs.Tab>
        <Tabs.Tab value="report" leftSection={<IconClipboardHeart size={20} />}>
          Report
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="medical">
        Medical
      </Tabs.Panel>

      <Tabs.Panel value="prescription">
        Prescription
      </Tabs.Panel>

      <Tabs.Panel value="report">
        <AppointmentReports/>
      </Tabs.Panel>
    </Tabs>
      </div>
    </div>
  );
};

export default AppointmentDetails;
