import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import ContactSearch from "../components/SearchBar/ContactSearch";

interface Props {
  darkMode: boolean;
  handleTeamChange: () => void;
}

export default function Header({ darkMode, handleTeamChange }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar className="flex justify-between items-center">
        <Box className="flex items-center">
          <Box
            component={NavLink}
            to={""}
            className="flex items-center space-x-2"
          >
            <GiNotebook className="h-6 w-6 mb-1" />
            <Typography variant="h6">Adres Defteri</Typography>
          </Box>
          <Box className="ml-4 flex items-center space-x-4">
            <Typography
              component={NavLink}
              to={"contacts"}
              variant="button"
              className="p-2 rounded-xl hover:bg-gray-400/40"
            >
              Kayıtlar
            </Typography>
            <Typography variant="button" className="text-xl">
              /
            </Typography>
            <Typography
              component={NavLink}
              to={"form"}
              variant="button"
              className="p-2 rounded-xl hover:bg-gray-400/40"
            >
              Kayıt Ekle
            </Typography>
          </Box>
        </Box>

        <Box className="flex items-center space-x-3">
          <ContactSearch />
          <Button
            onClick={() => handleTeamChange()}
            startIcon={darkMode ? <MdLightMode /> : <MdDarkMode />}
            color="inherit"
          >
            {darkMode ? "Light" : "Dark"} Mode
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
