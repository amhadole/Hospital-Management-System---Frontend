import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const successNotification = (message: string) => {
  notifications.show({
    title: "Success",
    message: message,
    color: "teal",
    icon: <IconCheck size={18} />,
    withCloseButton: true,
    radius:"md",
    styles: {
      root: {
        backgroundColor: "#E0F7FA", // tealmedical-50
        border: "1px solid #26C6DA", // tealmedical-400
      },
      title: {
        color: "#006064", // tealmedical-900
        fontWeight: 600,
      },
      description: {
        color: "#004D40",
      },
      icon: {
        color: "#00BCD4", // tealmedical-500
      },
    },

  });
}

const errorNotification = (message: string) => {
  notifications.show({
    title: "Error",
    message: message,
    icon: <IconX size={18} />,
    withCloseButton: true,
    radius: "md",
    styles: {
      root: {
        backgroundColor: "#E3F2FD", // hospital-50
        border: "1px solid #EF5350",
      },
      title: {
        color: "#0D47A1", // hospital-900
        fontWeight: 600,
      },
      description: {
        color: "#1565C0", // hospital-800
      },
      icon: {
        color: "#D32F2F",
      },
    },
  });
}

export  {successNotification, errorNotification};