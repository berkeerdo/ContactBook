import { List, ListItem } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactCard from "./ContactCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contacts() {
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
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ContactCard contact={contact} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
