import { toast } from "react-toastify";
import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("Ad alanı zorunludur"),
    lastName: yup.string().required("Soyad alanı zorunludur"),
    email: yup.string().email("Geçerli bir e-posta adresi giriniz"),
    phoneNumber: yup.string(),
  })
  .test(
    "emailOrPhone",
    "E-posta veya telefon numarası zorunludur",
    async (value) => {
      try {
        await yup
          .object()
          .shape({
            email: yup
              .string()
              .required("E-posta alanı ya da Telefon alanı zorunludur"),
            phoneNumber: yup
              .string()
              .required("E-posta alanı ya da Telefon alanı zorunludur"),
          })
          .validate(value, { abortEarly: false });
        return true;
      } catch (err: any) {
        throw toast.error(err.errors[0]);
      }
    }
  );
