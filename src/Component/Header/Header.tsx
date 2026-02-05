import { ActionIcon, Button } from "@mantine/core";
import {
  IconBellRinging,
  IconLayoutSidebarLeftCollapseFilled,
} from "@tabler/icons-react";
import ProfileMenu from "./ProfileMenu";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeJwt } from "../../Slices/JwtSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout=()=>{
    console.log("Logout");
    dispatch(removeJwt());
     navigate("/login", { replace: true });
  }

  return (
    <div className="bg-tealmedical-600 shadow-md text-white w-full h-16 flex justify-between px-6 items-center">
      <ActionIcon
        variant="subtle"
        size={"xl"}
        aria-label="Toggle Sidebar"
        color="white"
        className="hover:bg-hospital-500 transition rounded-lg p-1"
      >
        <IconLayoutSidebarLeftCollapseFilled
          style={{ width: "90%", height: "90%" }}
          stroke={1.5}
        />
      </ActionIcon>
      <div className="flex gap-5 items-center">
        {user ? (
          <Button
            onClick={handleLogout}
            radius="md"
            size="md"
            className="bg-white text-hospital-700 font-semibold hover:bg-hospital-100 transition shadow-sm"
          >
            Logout
          </Button>
        ) : (
          <Link to={"login"}>
            <Button
              radius="md"
              size="md"
              className="bg-white text-hospital-700 font-semibold hover:bg-hospital-100 transition shadow-sm"
            >
              Login
            </Button>
          </Link>
        )}
        {
          user&&<>
          <ActionIcon
              variant="subtle"
              size={"lg"}
              aria-label="Notification"
              color="white"
              className="hover:bg-hospital-500 transition rounded-lg p-1"
            >
              <IconBellRinging style={{ width: "90%", height: "90%" }} stroke={2} />
            </ActionIcon>

          <ProfileMenu /></>
        }
            
      </div>
    </div>
  );
};

export default Header;
