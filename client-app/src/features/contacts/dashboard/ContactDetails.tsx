import { Link, useNavigate, useParams } from "react-router-dom";
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
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  asyncDeleteContact,
  contactSelectors,
  fetchContactAsync,
  fetchContactsAsync,
} from "./contactsSlice";
import { LoadingButton } from "@mui/lab";

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const contact = useAppSelector((state) =>
    contactSelectors.selectById(state, id!)
  );
  const status = useAppSelector((state) => state.contacts.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
            <TableHead>
              <TableRow>
                <TableCell>Email :</TableCell>
                <TableCell>{contact.email ?? "Veri Yok"}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions className="flex items-center justify-between mx-3">
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate(`/form/${id?.toString()}`)}
        >
          Düzenle
        </Button>
        <LoadingButton
          loading={status === "pendingDeleteContact"}
          color="error"
          variant="contained"
          onClick={() =>
            dispatch(asyncDeleteContact(id?.toString()!)).finally(() => {
              navigate("/contacts");
              dispatch(fetchContactsAsync());
            })
          }
        >
          Sil
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
