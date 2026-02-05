import { Avatar, Text } from "@mantine/core";
import {
  IconCalendarCheck,
  IconHeartbeat,
  IconLayoutGrid,
  IconUser
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    url: "/patient/dashboard",
    icon: <IconLayoutGrid stroke={1.5} />,
  },
  {
    name: "Profile",
    url: "/patient/profile",
    icon: <IconUser stroke={1.5} />,
  },
  {
    name: "Appointments",
    url: "/patient/appointments",
    icon: <IconCalendarCheck stroke={1.5} />,
  },
];

const Sidebar = () => {
    const user = useSelector((state: any) => state.user);

  return (
    <div className="flex">
      <div className="w-64">

      </div>
    <div className="w-64 fixed h-screen overflow-y-auto hide-scrollbar bg-hospital-700 text-white flex flex-col gap-8 items-center ">
      <div className=" fixed z-[500]  bg-hospital-700 py-3 flex gap-1 items-center">
        <IconHeartbeat stroke={2.5} size={40} />
        <span className="font-heading font-semibold text-3xl">Pulse</span>
      </div>

      <div className=" flex flex-col mt-20 gap-5">
      <div className="flex flex-col gap-1 items-center">
        <div className="p-1 bg-white rounded-full shadow-lg">
          <Avatar
            variant="filled"
            src="/doctorAvatar.jpg"
            alt="it's me"
            size="xl"
          />
        </div>
        <span className="font-medium">{user?.name}</span>
        <Text c="white" size="xs">
          {user?.role}
        </Text>
      </div>
      <div className="flex flex-col gap-1">
        {links.map((link) => {
          return (
            <NavLink
              to={link.url}
              key={link.url}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full font-medium  px-4 py-5 rounded-lg ${
                  isActive ? "bg-tealmedical-500" : "hover:bg-hospital-600"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Sidebar;
