import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchContactsAsync } from "../../features/contacts/dashboard/contactsSlice";
import { toggleDarkMode } from "../store/themeSlice";
import LoadingApp from "./LoadingApp";

function App() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(true);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    dispatch(toggleDarkMode());
  }

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchContactsAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingApp message="Sistem başlatılıyor..." />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
        autoClose={5000}
      />
      <Header darkMode={darkMode} handleTeamChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
