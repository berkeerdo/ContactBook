import { List, ListItem } from "@mui/material";
import ContactCard from "./ContactCard";
import { useAppSelector } from "../../../app/store/configureStore";
import { contactSelectors } from "./contactsSlice";

export default function Contacts() {
  const contacts = useAppSelector(contactSelectors.selectAll);

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
