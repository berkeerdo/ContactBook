import { List, ListItem } from "@mui/material";
import { Contact } from "../../app/models/contact";
import ContactCard from "./ContactCard";

interface Props {
  contacts: Contact[];
}

export default function Contacts({ contacts }: Props) {
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
