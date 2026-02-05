import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHeartbeat } from "@tabler/icons-react";
import { Link} from "react-router-dom";
import { loginUser } from "../Service/UserService";
import {
  errorNotification,
  successNotification,
} from "../Utility/Notification";
import { useDispatch } from "react-redux";
import { setJwt } from "../Slices/JwtSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) => (!value ? "Password is required" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    loginUser(values)
      .then((res) => {
        const token = res.data; 
        dispatch(setJwt(token));
        successNotification("Logged in Successfully.");
      })
      .catch((error) => {
        const message =
          error?.response?.data?.message || "Invalid email or password";
        errorNotification(message);
      });
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
            Login
          </div>
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
          <Button
            className="bg-hospital-600 hover:bg-hospital-700 text-white font-semibold"
            fullWidth
            radius="md"
            size="md"
            type="submit"
          >
            Login
          </Button>

          <div className="text-hospital-100 self-center">
            Don't have an account?
            <Link to={"/register"} className="underline text-hospital-200">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
