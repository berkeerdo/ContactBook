import { Link, useParams } from "react-router-dom";
import { Contact } from "../../app/models/contact";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import trLocale from "date-fns/locale/tr";

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Contact>(`http://localhost:5000/api/contact/${id}`)
      .then((response) => setContact(response.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
        setDate(
          contact?.birthDay
            ? format(new Date(contact.birthDay), "dd MMMM yyyy", {
                locale: trLocale,
              })
            : null
        );
      });
  }, [contact?.birthDay, id]);

  if (loading) return <div>Loading...</div>;

  if (!contact) return <div>Not found</div>;

  return (
    <Card className=" w-full ">
      <CardHeader
        className="w-full"
        avatar={
          <Avatar sx={{ bgcolor: "primary" }}>
            {contact.firstName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="h5">
            {contact.firstName +
              " " +
              (contact.middleName === null ? " " : contact.middleName) +
              " " +
              contact.lastName}
          </Typography>
        }
        subheader={
          "Doğum Tarihi : " +
          (date ? date : null) +
          " / " +
          "Cinsiyet : " +
          (contact.gender ?? null)
        }
      />
      <CardContent className="w-full">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableRow>
              <TableCell>Email :</TableCell>
              <TableCell>{contact.email ?? "Veri Yok"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cep Telefonu :</TableCell>
              <TableCell>{contact.phoneNumber ?? "Veri Yok"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ev Telefonu :</TableCell>
              <TableCell>{contact.homePhone ?? "Veri Yok"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>İş Telefonu :</TableCell>
              <TableCell>{contact.workPhone ?? "Veri Yok"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>İl :</TableCell>
              <TableCell>{contact.city ?? "Veri Yok"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Adres :</TableCell>
              <TableCell>{contact.address ?? "Veri Yok"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>İş Adres :</TableCell>
              <TableCell>{contact.workAddress ?? "Veri Yok"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Instagram :</TableCell>
              <TableCell>
                <Link
                  to={
                    contact.instagram
                      ? `https://www.instagram.com/${contact.instagram}?hl=tr`
                      : "https://www.instagram.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {contact.instagram ?? "Veri Yok"}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Facebook :</TableCell>
              <TableCell>
                <Link
                  to={
                    contact.facebook
                      ? `https://www.facebook.com/${contact.facebook}`
                      : "https://www.facebook.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {contact.facebook ?? "Veri Yok"}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Twitter :</TableCell>
              <TableCell>
                <Link
                  to={
                    contact.twitter
                      ? `https://twitter.com/${contact.twitter}`
                      : "https://twitter.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {contact.twitter ?? "Veri Yok"}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Snapchat :</TableCell>
              <TableCell>{contact.snapChat ?? "Veri Yok"}</TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions className="flex items-center justify-between mx-3">
        <Button color="primary" variant="contained">
          Düzenle
        </Button>
        <Button color="error" variant="contained">
          Sil
        </Button>
      </CardActions>
    </Card>
  );
}
