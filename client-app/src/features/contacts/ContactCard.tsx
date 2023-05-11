import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  CardHeader,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Contact } from "../../app/models/contact";

interface Props {
  contact: Contact;
}

export default function ContactCard({ contact }: Props) {
  return (
    <Card sx={{ minWidth: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary" }}>
            {contact.firstName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          contact.firstName +
          " " +
          (contact.middleName === null ? " " : contact.middleName) +
          " " +
          contact.lastName
        }
        sx={{ pb: 0 }}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <CardContent>
          <Typography variant="caption" color="grey">
            {contact.email ? contact.email : "Email yok"}
          </Typography>
          <Typography variant="body1" color="darksalmon">
            Telefon Numarası :{" "}
            {contact.phoneNumber ? contact.phoneNumber : "Telefon yok"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Görüntüle
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
