import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

export default function CustomRadioGroup(props: Props) {
  const [field] = useField(props.name);

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
}
