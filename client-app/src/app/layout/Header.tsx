import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { NavLink } from "react-router-dom";

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
          <Box className="ml-4 space-x-4">
            <Typography variant="button" component={NavLink} to={"contacts"}>
              Kayıtlar
            </Typography>
            <Typography variant="button" component={NavLink} to={"form"}>
              Form
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center ml-2">
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
