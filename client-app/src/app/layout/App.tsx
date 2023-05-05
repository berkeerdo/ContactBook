import { Typography } from "@mui/material";
import Contacts from "../../features/contacts/Contacts";
import { useEffect, useState } from "react";
import { Contact } from "../models/contact";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    axios
      .get<Contact[]>("http://localhost:5000/api/contacts")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <>
      <Typography variant="h1">Adres Defteri</Typography>
      <Contacts contacts={contacts} />
    </>
  );
}

export default App;
