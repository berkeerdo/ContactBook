import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6">Adres Defteri</Typography>
      </Toolbar>
    </AppBar>
  );
}
