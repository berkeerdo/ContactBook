import React from "react";
import { Formik, Form, Field, FieldProps, FormikProps } from "formik";
import * as Yup from "yup";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";


const ContactSchema = Yup.object().shape({
  id: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Required"),
  homePhone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  workPhone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  workAddress: Yup.string(),
  instagram: Yup.string(),
  facebook: Yup.string(),
  twitter: Yup.string(),
  snapChat: Yup.string(),
  birthDay: Yup.date().required("Required"),
});

const initialValues = {
  id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
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
  birthDay: "",
};

const CustomTextField = ({
  field,
  form,
}: {

  field: FieldProps<any>;
  form: FormikProps<any>;
}) => {

  const { field: inputField } = field;

  const { name } = inputField;
  const { errors, touched } = form;

  const errorMessage = errors[name] && touched[name] ? errors[name] : null;

  return (
    <TextField
      {...field}
      error={!!errorMessage}
      helperText={typeof errorMessage === "string" ? errorMessage : undefined}
    />
  );
};

const CustomRadioGroup = ({
  field,
  form,
  ...props
}: {
  field: FieldProps<any>;
  form: FormikProps<any>;
}) => {
  const { field: inputField } = field;
  if (inputField) {
    const { name } = inputField;
    const { errors, touched } = form;


    const errorMessage = errors[name] && touched[name] ? errors[name] : null;
    const handleError = (event: React.SyntheticEvent<HTMLDivElement>) => {

      console.log(event);
    };

    return (
      <RadioGroup {...field} {...props} onError={handleError}>
        <FormControlLabel value="male" control={<Radio />} label="Erkek" />
        <FormControlLabel value="female" control={<Radio />} label="Kadın" />
        <FormControlLabel value="other" control={<Radio />} label="Diğer" />
      </RadioGroup>
    );
  } else {

    return <div></div>;
  }
};

const ContactForm = () => {

  const handleSubmit = (values: any) => {

    console.log(values);
  };

  return (
    <div>
      <h1>Address Book Formu</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" label="Ad" component={CustomTextField} />
            <Field
              name="middleName"
              label="İkinci Ad"
              component={CustomTextField}
            />
            <Field name="lastName" label="Soyad" component={CustomTextField} />
            <Field
              name="gender"
              label="Cinsiyet"
              component={CustomRadioGroup}
            />
            <Field name="email" label="E-posta" component={CustomTextField} />
            <Field
              name="phoneNumber"
              label="Telefon Numarası"
              component={CustomTextField}
            />
            <Field
              name="homePhone"
              label="Ev Telefonu"
              component={CustomTextField}
            />
            <Field
              name="workPhone"
              label="İş Telefonu"
              component={CustomTextField}
            />
            <Field name="city" label="Şehir" component={CustomTextField} />
            <Field name="address" label="Adres" component={CustomTextField} />
            <Field
              name="workAddress"
              label="İş Adresi"
              component={CustomTextField}
            />
            <Field
              name="instagram"
              label="Instagram"
              component={CustomTextField}
            />
            <Field
              name="facebook"
              label="Facebook"
              component={CustomTextField}
            />
            <Field name="twitter" label="Twitter" component={CustomTextField} />
            <Field
              name="snapChat"
              label="SnapChat"
              component={CustomTextField}
            />
            <Field
              name="birthDay"
              label="Doğum Günü"
              type="date"
              component={CustomTextField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              Gönder
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
