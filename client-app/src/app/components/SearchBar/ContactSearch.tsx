import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { setContactParams } from "../../../features/contacts/dashboard/contactsSlice";
import { AiOutlineSearch } from "react-icons/ai";

export default function ContactSearch() {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const { contactParams } = useAppSelector((state) => state.contacts);
  const [searchTerm, setSearchTerm] = useState(contactParams.searchTerm);
  const dispatch = useAppDispatch();

  //   const debouncedSearch = debounce((event: any) => {
  //     if (event.target.value === "")
  //       dispatch(setContactParams({ searchTerm: "" }));
  //   }, 6000);

  return (
    <TextField
      key="input"
      label="Kayıtları Ara"
      color="primary"
      variant="outlined"
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
        if (event.target.value === "")
          dispatch(setContactParams({ searchTerm: "" }));
      }}
      onKeyDown={(event: any) => {
        if (event.key === "Enter") {
          dispatch(setContactParams({ searchTerm: event.target.value }));
        }
      }}
      className="my-2"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={(event: any) =>
                dispatch(setContactParams({ searchTerm: searchTerm }))
              }
            >
              <AiOutlineSearch />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#333",
        borderRadius: "10px",
      }}
    />
  );
}
