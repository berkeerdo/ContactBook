import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup.string().required("Ad alanı zorunludur"),
  lastName: yup.string().required("Soyad alanı zorunludur"),
  email: yup.string().email("Geçerli bir e-posta adresi giriniz"),
  phoneNumber: yup.string().when("email", {
    is: (email: string) => !email || email.length === 0,
    then(schema) {
      return schema.required("Email veya telefon alanından biri zorunludur");
    },
    otherwise(schema) {
      return schema.notRequired();
    },
  }),
});
