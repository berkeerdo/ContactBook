import { Grid, List, ListItem } from "@mui/material";
import ContactCard from "./ContactCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  contactSelectors,
  fetchContactsAsync,
  setPageNumber,
} from "./contactsSlice";
import { useEffect } from "react";
import AppPagination from "../../../app/components/Pagination/Pagination";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function Contacts() {
  const contacts = useAppSelector(contactSelectors.selectAll);
  const { contactsLoaded, metaData } = useAppSelector(
    (state) => state.contacts
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!contactsLoaded) dispatch(fetchContactsAsync());
  }, [dispatch, contactsLoaded]);

  if (!contactsLoaded)
    return <LoadingComponent message="Kayıtlar Yükleniyor..." />;

  return (
    <Grid container columnSpacing={3}>
      <Grid item xs={12}>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <ContactCard contact={contact} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
