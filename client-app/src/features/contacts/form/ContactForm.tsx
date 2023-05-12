import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Contact } from "../../../app/models/contact";
import agent from "../../../app/api/agent";
import { Box } from "@mui/material";
import CustomTextField from "./CustomTextField";

export default function ActivityForm() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [contact, setContact] = useState<Contact>({
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
  });

  const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Sadece rakam olmalı")
      .min(11, "Tam 11 hane olmalı")
      .max(11, "Tam 11 hane olmalı")
      .required("Gerekli"),
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

  useEffect(() => {}, []);

  function handleFormSubmit(contact: Contact) {
    if (!contact.id) {
      contact.id = uuid();
      agent.Contacts.create(contact).then(() =>
        navigate(`/contact/${contact.id}`)
      );
    }

    function handleChange(
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      const { name, value } = event.target;
      setContact({ ...contact, [name]: value });
    }

    if (loading) return <LoadingComponent message="Loading activity..." />;

    return (
      <Box>
        <Formik
          validationSchema={ContactSchema}
          enableReinitialize
          initialValues={contact}
          onSubmit={(values, { setSubmitting }: FormikHelpers<Contact>) => {
            console.log(values);
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <CustomTextField placeholder="Ad" name="firstName" />
            </Form>
          )}
        </Formik>
      </Box>
    );
  }
}
