import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Contact } from "../../../app/models/contact";
import { schema } from "./yupValidation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/tr";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  contactSelectors,
  createContactAsync,
  fetchContactAsync,
  fetchContactsAsync,
  updateContactAsync,
} from "../dashboard/contactsSlice";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.contacts.status);
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const contact = useAppSelector((state) =>
    contactSelectors.selectById(state, id!)
  );
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("tr");

  useEffect(() => {
    if (!contact && id) {
      dispatch(fetchContactAsync(parseInt(id)));
    }
  }, [contact, dispatch, id]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<Contact>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: contact?.firstName ?? "",
      middleName: contact?.middleName ?? "",
      lastName: contact?.lastName ?? "",
      gender: contact?.gender ?? "male",
      birthDay: contact?.birthDay ?? dayjs().format("DD/MM/YYYY"),
      email: contact?.email ?? "",
      phoneNumber: contact?.phoneNumber ?? "",
      homePhone: contact?.homePhone ?? "",
      workPhone: contact?.workPhone ?? "",
      city: contact?.city ?? "",
      address: contact?.address ?? "",
      workAddress: contact?.workAddress ?? "",
      instagram: contact?.instagram ?? "",
      facebook: contact?.facebook ?? "",
      twitter: contact?.twitter ?? "",
      snapChat: contact?.snapChat ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: Contact) => {
    try {
      let response;
      if (id) {
        response = await dispatch(updateContactAsync({ ...data, id: id }));
      } else {
        response = await dispatch(createContactAsync(data));
      }
      if (updateContactAsync.fulfilled.match(response)) {
        dispatch(fetchContactsAsync()).then(() => {
          reset();
          navigate(`/contacts/${id}`);
        });
      } else if (createContactAsync.fulfilled.match(response)) {
        const newId = response.payload.id;
        dispatch(fetchContactsAsync()).then(() => {
          reset();
          navigate(`/contacts/${newId}`);
        });
      } else {
        console.log((response.payload as Error).message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth={"md"}>
      <Paper sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <TextField
            label="Ad"
            variant="outlined"
            fullWidth
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="İkinci Ad"
            variant="outlined"
            fullWidth
            {...register("middleName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Soyad"
            variant="outlined"
            fullWidth
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <FormControl fullWidth>
            <InputLabel id="gender-label">Cinsiyet</InputLabel>
            <Select
              labelId="gender-label"
              value={watch("gender")}
              label="Cinsiyet"
              {...register("gender")}
            >
              <MenuItem value="male">Erkek</MenuItem>
              <MenuItem value="female">Kadın</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Doğum Tarihi"
                format="DD/MM/YYYY"
                maxDate={dayjs().subtract(18, "year")}
                sx={{ width: "100%" }}
                value={dayjs(watch("birthDay"))}
                onChange={(value) =>
                  setValue("birthDay", value?.toISOString() || "")
                }
              />
            </LocalizationProvider>
          </FormControl>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Telefon Numarası"
            variant="outlined"
            fullWidth
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            label="Ev Telefonu"
            variant="outlined"
            fullWidth
            {...register("homePhone")}
          />
          <TextField
            label="İş Telefonu"
            variant="outlined"
            fullWidth
            {...register("workPhone")}
          />
          <TextField
            label="Şehir"
            variant="outlined"
            fullWidth
            {...register("city")}
          />
          <TextField
            label="Adres"
            variant="outlined"
            fullWidth
            {...register("address")}
          />
          <TextField
            label="İş Adresi"
            variant="outlined"
            fullWidth
            {...register("workAddress")}
          />
          <TextField
            label="Instagram"
            variant="outlined"
            fullWidth
            {...register("instagram")}
          />
          <TextField
            label="Facebook"
            variant="outlined"
            fullWidth
            {...register("facebook")}
          />
          <TextField
            label="Twitter"
            variant="outlined"
            fullWidth
            {...register("twitter")}
          />
          <TextField
            label="Snapchat"
            variant="outlined"
            fullWidth
            {...register("snapChat")}
          />
          <LoadingButton
            loading={
              status === "pendingCreateContact" ||
              status === "pendingUpdateContact"
            }
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {id ? "Güncelle" : "Kayıt Oluştur"}
          </LoadingButton>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactForm;
