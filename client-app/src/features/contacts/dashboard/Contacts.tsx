import { List, ListItem } from "@mui/material";
import { Contact } from "../../../app/models/contact";
import ContactCard from "./ContactCard";
import { useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Contacts.list()
      .then((response) => {
        setContacts(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Kayıtlar Yükleniyor..." />;

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
