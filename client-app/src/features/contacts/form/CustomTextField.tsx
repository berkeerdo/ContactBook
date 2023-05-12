import { FormControl, FormLabel } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

export default function CustomTextField(props: Props) {
  const [field, meta] = useField(props.name);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <FormControl fullWidth error={!!errorText}>
      <FormLabel>{props.label}</FormLabel>
      <input {...field} {...props} />
    </FormControl>
  );
}
