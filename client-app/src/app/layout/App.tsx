import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Contacts from "../../features/contacts/Contacts";
import { useEffect, useState } from "react";
import { Contact } from "../models/contact";
import axios from "axios";
import Header from "./Header";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    axios
      .get<Contact[]>("http://localhost:5000/api/contact")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <Contacts contacts={contacts} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
