import { List, ListItem, Typography } from "@mui/material";
import { Contact } from "../../app/models/contact";

interface Props {
  contacts: Contact[];
}

export default function Contacts({ contacts }: Props) {
  return (
    <>
      <Typography>Kayıtlar</Typography>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>{contact.firstName}</ListItem>
        ))}
      </List>
    </>
  );
}
