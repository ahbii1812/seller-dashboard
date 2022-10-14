import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";
import { color } from "../theme/theme";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  maxLength: Number;
}

interface FormProps {
  name: string;
}

export default function FormFieldTextCounter({
  label,
  name,
  placeholder,
  required,
  maxLength,
}: Props) {
  const { values, setFieldValue, touched, errors, setFieldTouched } =
    useFormikContext<FormProps>();

  type ObjectKey = keyof typeof values;

  const showError =
    touched[name as ObjectKey] && typeof errors[name as ObjectKey] === "string";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: showError ? color.error : color.primary,
        }}
      >{`${label} ${required ? "*" : ""}`}</Typography>
      <TextField
        inputProps={{ maxLength }}
        placeholder={placeholder}
        variant="standard"
        sx={{ width: "100%" }}
        value={values[name as ObjectKey]}
        onChange={handleChange}
        multiline
        onBlur={() => setFieldTouched(name)}
        error={showError}
        helperText={showError ? errors[name as ObjectKey] : null}
      />
      <Typography variant="body2" sx={{ textAlign: "end" }}>
        {`${values[name as ObjectKey].toString().length} / ${maxLength}`}
      </Typography>
    </Box>
  );
}
