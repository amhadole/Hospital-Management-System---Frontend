import { Fieldset, MultiSelect, Textarea, TextInput } from "@mantine/core";
import React from "react";
import { symptoms, tests } from "../../../Data/DropDown";

const AppointmentReports = () => {
  return (
    <div>
      <Fieldset
        className="grid grid-cols-2 gap-4"
        legend={
          <span className="text-lg font-medium text-hospital-400">
            Personal information
          </span>
        }
        radius={"sm"}
      >
        <MultiSelect
          className="col-span-2"
          withAsterisk
          label="Symptoms"
          placeholder="Pick Symptoms"
          data={symptoms}
        />
        <MultiSelect
          className="col-span-2"
          label="Tests"
          placeholder="Pick Tests"
          data={tests}
        />
        <TextInput
          label="Diagnosis"
          placeholder="Enter Diagnosis"
          withAsterisk
        />
        <TextInput label="Referral" placeholder="Enter Referral" />
        <Textarea className="col-span-2" label="Note" placeholder="Enter any additional notes" />
      </Fieldset>
    </div>
  );
};

export default AppointmentReports;
