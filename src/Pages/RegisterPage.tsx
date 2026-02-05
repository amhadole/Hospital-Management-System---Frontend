import {
  Button,
  PasswordInput,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHeartbeat } from "@tabler/icons-react";
import {Link, useNavigate } from "react-router-dom";
import {registerUser} from "../Service/UserService";
import { errorNotification, successNotification } from "../Utility/Notification";


type RegisterFormValues = {
  name: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    initialValues: {
      name:"",
      role: "PATIENT",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) =>(!value ? "Name is required":null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,15}$/.test(value)
          ? null
          : "Password must be 8–15 characters, include uppercase, lowercase & special character",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Password don't match",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    registerUser(values).then((data)=>{
      console.log(data)
      successNotification("Registered Successfully.");
      navigate("/login");
    }).catch((error)=>{
      const message = error?.response?.data?.message || "Registration failed";
      console.log(error)
      errorNotification(message);
    })
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-hospital-50">
      <div className="   text-hospital-700 py-3 flex gap-1 items-center">
        <IconHeartbeat stroke={2.5} size={40} className="text-hospital-600" />
        <span className="font-heading font-semibold text-3xl">Pulse</span>
      </div>

      <div className="w-[500px] bg-hospital-900 p-10 rounded-2xl shadow-xl">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="flex flex-col gap-6 [&_input]:placeholder-white [&_.mantine-Input-input]:!border-white [&_.mantine-Input-input]:!border [&_input]:!p-2 [&_svg]:text-white [&_input]:!text-white"
        >
          <div className="self-center font-medium font-heading text-white text-2xl mb-2">
            Register
          </div>
          <SegmentedControl
            {...form.getInputProps("role")}
            fullWidth
            size="md"
            radius="md"
            data={[
              { label: "Patient", value: "PATIENT" },
              { label: "Doctor", value: "DOCTOR" },
              { label: "Admin", value: "ADMIN" },
            ]}
            classNames={{
              root: "bg-hospital-700 p-1 rounded-lg border border-hospital-500",
              indicator:
                "bg-white text-hospital-900 shadow-md rounded-md border border-hospital-300",
              control:
                "text-white data-[active=true]:text-hospital-900 font-medium transition-all",
            }}
          />
           <TextInput
            {...form.getInputProps("name")}
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Name"
          />

          <TextInput
            {...form.getInputProps("email")}
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Email"
          />
          <PasswordInput
            {...form.getInputProps("password")}
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Password"
          />
          <PasswordInput
            {...form.getInputProps("confirmPassword")}
            variant="unstyled"
            size="md"
            radius="md"
            placeholder="Confirm Password"
          />
          <Button
            className="bg-hospital-600 hover:bg-hospital-700 text-white font-semibold"
            fullWidth
            radius="md"
            size="md"
            type="submit"
          >
            Register
          </Button>

          <div className="text-hospital-100 self-center">
            Have an account?
            <Link to={"/login"} className="underline text-hospital-200">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
