import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Contact } from "../../../app/models/contact";
import { schema } from "./yupValidation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ContactForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Contact>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      birthDay: dayjs().format("DD/MM/YYYY"),
      email: "",
      phoneNumber: "",
      homePhone: "",
      workPhone: "",
      city: "",
      address: "",
      workAddress: "",
      instagram: "",
      facebook: "",
      twitter: "",
      snapChat: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: Contact) => {};

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
            label="Soyad"
            variant="outlined"
            fullWidth
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Cinsiyet</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              defaultValue="male"
              {...register("gender")}
              onChange={(e) => setValue("gender", e.target.value)}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Erkek"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Kadın"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Doğum Tarihi"
                format="DD/MM/YYYY"
                sx={{ width: "100%" }}
                value={dayjs()}
                onChange={(value) =>
                  setValue("birthDay", value?.format("DD/MM/YYYY") || "")
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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactForm;
