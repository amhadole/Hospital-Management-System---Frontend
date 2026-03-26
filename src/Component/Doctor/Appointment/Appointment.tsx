import React, { useState, useEffect} from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { ActionIcon, Button, Modal, SegmentedControl, Select, Text, Textarea, TextInput } from "@mantine/core";
import { IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { getDoctorDropdown } from "../../../Service/DoctorProfileServices";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { ScheduleAppointmentFormValue } from "./ScheduleAppointmentFormValue";
import { cancleAppointment, getAllAppointmentByDoctor,  getAvailableSlots, scheduleAppointment } from "../../../Service/AppointmentService";
import { useSelector } from "react-redux";
import { errorNotification, successNotification } from "../../../Utility/Notification";
import { appointmentReasons } from "../../../Data/DropDown";
import { formateDateWithTime } from "../../../Utility/DateUtility";
import { modals } from "@mantine/modals";
import { Toolbar } from "primereact/toolbar";
import { useNavigate } from "react-router-dom";


interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  image: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string | Date;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

const Appointment = () => {
  const navigate = useNavigate();
  const [opened, { close }] = useDisclosure(false);
  const[doctors, setDoctors] = useState<any[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [tab, setTab] = useState<string>('Today');
  const [appointment, setAppointment] = useState<any[]>([]);
  const user = useSelector((state: any)=>state.user);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    doctorName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    reason: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
     note: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    status: { value: null, matchMode: FilterMatchMode.IN }, 
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  
  const [statuses] = useState<string[]>([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
  ]);

  const getSeverity = (status: string) => {
    switch (status) {
      case "CANCELLED":
        return "danger";

      case "COMPLETED":
        return "success";

      case "SCHEDULED":
        return "info";

      default:
        return null;
    }
  };


  // Load Doctor
  useEffect(() => {

    fetchData();

    getDoctorDropdown().then((res)=>{
        const data = res.data;
        console.log(data);
        setDoctors(data.map((doctor:any)=>({
            value: doctor.id.toString(),
            label: doctor.name
        })));
    }).catch((error)=>{
        console.error("Error fetching Doctors:", error);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = ()=>{
    getAllAppointmentByDoctor(user.profileId).then((res)=>{
      setAppointment(res.data);
    }).catch((error)=>{
      console.error("Error fetching appointment:", error)
    });
  }

  const form = useForm<ScheduleAppointmentFormValue>({
    initialValues:{
        doctorId:"",
        patientId: "",
        appointmentDate: null,
        slot:"",
        reason:"",
        note:""
    },

    validate:{
        doctorId:(value)=>!value?'Doctor is required' : undefined,
        appointmentDate: (value) =>!value ? 'Appointment Date is Required':undefined,
        reason:(value) => !value ? 'Reason for appointment is required' : undefined
    }
  })

    useEffect(()=>{
    if(!form.values.doctorId || !form.values.appointmentDate) return;
    const dateObj = 
    form.values.appointmentDate instanceof Date
        ? form.values.appointmentDate
        : new Date(form.values.appointmentDate as any);

    const formattedDate = dateObj.toISOString().split("T")[0];

    getAvailableSlots(form.values.doctorId, formattedDate)
      .then((res: any) => setSlots(res.data))
      .catch(() => setSlots([]));
  }, [form.values.doctorId, form.values.appointmentDate]);

 

 

 

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

// Schedule Appointment Button
  // const renderHeader = () => {
  //   return (
  //     <div className="flex flex-wrap gap-2 justify-between items-center">
  //       <Button leftSection={<IconPlus />} onClick={open} variant="filled">Schedule Appoinment</Button>
  //         <TextInput
  //           leftSection={<IconSearch />}
  //           fw={500}
  //           value={globalFilterValue}
  //           onChange={onGlobalFilterChange}
  //           placeholder="Keyword Search"
  //         />
  //     </div>
  //   );
  // };



 
  

  

  const statusBodyTemplate = (rowData: Customer) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  



  const handleDelete = (rowData: any)=>{
    modals.openConfirmModal({
    title: <span className="font-serif font-semibold">Are you sure</span>,
    centered: true,
    children: (
      <Text size="sm">
        You want to cancel this appointment? This action cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: () => {
      cancleAppointment(rowData.id).then(()=>{
        successNotification("Appointment Cancelled Successfully")
        setAppointment(appointment.filter((appointment)=>appointment.id !== rowData.id? {...appointment, status: "CANCELLED"}: appointment));
      }).catch((error)=>{
        errorNotification(error.response?.data?.errorMessage || "Failed to cancle Appointment");
      });
      
    },
  });

  }

  const actionBodyTemplate = (rowData: any) => {
    return <div className="flex gap-2">
        <ActionIcon  onClick={()=> navigate(""+ rowData.id)}>
          <IconEye />
        </ActionIcon>
        <ActionIcon color="red" onClick={()=> handleDelete(rowData)}>
          <IconTrash />
        </ActionIcon>
    </div>
  };

  // const header = renderHeader();

  const handleSubmit = (values:any)=>{
    if(!values.slot){
      errorNotification("Please Select Slot");
      return;
    }

    const dateObj = values.appointmentDate instanceof Date ? values.appointmentDate : new Date(values.appointmentDate);

    const appointmentTime =  dateObj.toISOString().split("T")[0] + "T" + values.slot;
    const payload = {
    patientId: user?.profileId,
    doctorId: Number(values.doctorId),
    appointmentTime,
    reason: values.reason,
    note: values.note,
  };
  scheduleAppointment(payload)
    .then(() => {
      successNotification("Appointment Schedule Successfully");
      close();
      form.reset();
      fetchData();
      setSlots([]);
    })
    .catch((err: any) => {
      errorNotification(err.response?.data?.message || "Error scheduling appointment");
    });
  };
const timeTamplat=(rowData: any)=>{
  return <span>{formateDateWithTime(rowData.appointmentTime)}</span>
}
// const leftToolbarTemplate = () => {
//         return (
//         <Button leftSection={<IconPlus />} onClick={open} variant="filled">Schedule Appoinment</Button>
//         );
//     };

    const rightToolbarTemplate = () => {
        return <TextInput
            leftSection={<IconSearch />}
            fw={500}
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
    };

    const centerToolbarTemplate =()=>{
      return <SegmentedControl
      value={tab}
      onChange={setTab}
      variant="filled"
      color={tab === "Past"? "red" : tab === "Today" ? "blue" : "green"}
      data={[
        "Past", "Today", "Upcoming"
      ]}
    />
    };

    const filteredAppointments = appointment.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentTime);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const appointmentDay = new Date(appointmentDate);
      appointmentDay.setHours(0, 0, 0, 0);
      if(tab === "Today"){
        return appointmentDay.getTime() === today.getTime();
      } else if(tab === "Upcoming"){
        return appointmentDay.getTime() > today.getTime();
      } else if(tab === "Past"){
        return appointmentDay.getTime() < today.getTime();
      }
      return true; 
    });

  return (
    <div className="card" >
      <Toolbar className="mb-4" start={centerToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
      <DataTable
        value={filteredAppointments}
        paginator
        size="small"
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={[
          "patientName",
          "reason",
          "note",
          "status",
        ]}
        emptyMessage="No appointment found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        {/* <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column> */}
        <Column
          field="patientName"
          header="Patient"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="appointmentTime"
          header="Appointment Time"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "14rem" }}
          body={timeTamplat}
        />
        <Column
          field="reason"
          header="Reason"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="note"
          header="Notes"
          sortable
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="status"
          header="Status"
          sortable
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
        />
        <Column
          headerStyle={{ width: "5rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
      <Modal opened={opened} onClose={close} size="lg" title={<div className="text-xl font-semibold">Schedule Appoinment</div>} centered>
        <form onSubmit={form.onSubmit(handleSubmit)} className="grid grid-cols-1 gap-5">
            <Select {...form.getInputProps("doctorId")} withAsterisk data={doctors} label="Doctor" placeholder="Select Doctor" />
            <DatePickerInput minDate={new Date()} {...form.getInputProps("appointmentDate")} withAsterisk  label="Appointment Date" placeholder="Pick date"/>
             {/* Slots */}
            <div className="grid grid-cols-4 gap-2">
            {slots.length === 0 ? (
            <p>No slots available</p>
            ) : (
            slots.map((slot) => (
            <Button
            key={slot}
            type="button"
            variant={form.values.slot === slot ? "filled" : "outline"}
            onClick={() => form.setFieldValue("slot", slot)}
            >
            {slot}
            </Button>
            ))
            )}
            </div>
            
            <Select {...form.getInputProps("reason")} data={appointmentReasons} withAsterisk label="Reason for Appointment" placeholder="Enter Reason for Appointment"/>
            <Textarea {...form.getInputProps("note")} label="Additional Notes" placeholder="Enter any additional notes"/>
            <Button type="submit" variant="filled" fullWidth>Schedule</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Appointment;
