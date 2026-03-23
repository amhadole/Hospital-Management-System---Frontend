import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import AppRoutes from "./Routes/AppRoutes";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import { PrimeReactProvider } from 'primereact/api';
import Store from "./Store";

const theme = createTheme({
  focusRing: "never",
  fontFamily: "Poppins, sans-serif",
  headings: {
    fontFamily: "Merriweather, serif",
  },
  colors: {
    hospital: [
      "#E3F2FD",
      "#BBDEFB",
      "#90CAF9",
      "#64B5F6",
      "#42A5F5",
      "#2196F3",
      "#1E88E5",
      "#1976D2",
      "#1565C0",
      "#0D47A1",
    ],
    tealmedical: [
      "#E0F7FA",
      "#B2EBF2",
      "#80DEEA",
      "#4DD0E1",
      "#26C6DA",
      "#00BCD4",
      "#00ACC1",
      "#0097A7",
      "#00838F",
      "#006064",
    ],
  },
  primaryColor: "hospital",
  primaryShade: 4,
  defaultGradient: {
    from: "hospital.4",
    to: "hospital.8",
    deg: 132,
  },
});
function App() {
  return (
    <Provider store={Store}>
      <MantineProvider theme={theme}>
        <PrimeReactProvider>
          <Notifications position="top-center" />
          <AppRoutes />
        </PrimeReactProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
