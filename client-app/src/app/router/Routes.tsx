import { createBrowserRouter } from "react-router-dom";
import Home from "../../features/home/Home";
import App from "../layout/App";
import Contacts from "../../features/contacts/dashboard/Contacts";
import ContactDetail from "../../features/contacts/dashboard/ContactDetails";
import ContactForm from "../../features/contacts/form/ContactForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "contacts", element: <Contacts /> },
      { path: "form", element: <ContactForm /> },
      { path: "form/:id", element: <ContactForm /> },
      { path: "contacts/:id", element: <ContactDetail /> },
    ],
  },
]);
