import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../store/configureStore";

interface Props {
  message?: string;
}

export default function LoadingComponent({ message = "Loading..." }: Props) {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      sx={{ backgroundColor: darkMode ? "#121212" : "#eaeaea" }}
    >
      <CircularProgress size={100} color="secondary" />
      <Typography
        variant="h4"
        sx={{ marginTop: 2, color: darkMode ? "#eaeaea" : "#121212" }}
      >
        {message}
      </Typography>
    </Box>
  );
}
