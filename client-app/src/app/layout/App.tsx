import { Container, CssBaseline } from "@mui/material";
import Contacts from "../../features/contacts/Contacts";
import { useEffect, useState } from "react";
import { Contact } from "../models/contact";
import axios from "axios";
import Header from "./Header";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

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
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Contacts contacts={contacts} />
      </Container>
    </>
  );
}

export default App;
