import { createBrowserRouter } from "react-router-dom";
import Home from "../../features/home/Home";
import App from "../layout/App";
import Contacts from "../../features/contacts/Contacts";
import ContactDetail from "../../features/contacts/ContactDetails";
import ContactForm from "../../features/contacts/form/ContactForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "contacts", element: <Contacts /> },
      { path: "form", element: <ContactForm /> },
      { path: "contacts/:id", element: <ContactDetail /> },
    ],
  },
]);
