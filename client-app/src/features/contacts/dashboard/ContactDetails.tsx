import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { useEffect } from "react";
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
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { contactSelectors, fetchContactAsync } from "./contactsSlice";

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const contact = useAppSelector((state) =>
    contactSelectors.selectById(state, id!)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!contact && id) {
      dispatch(fetchContactAsync(parseInt(id)));
    }
  }, [contact, dispatch, id]);

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
          (contact.birthDay
            ? dayjs(contact.birthDay).locale("tr").format("DD.MM.YYYY")
            : null) +
          " / " +
          "Cinsiyet : " +
          (contact.gender === "Female" ? "Kadın" : "Erkek" || "Veri Yok")
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
