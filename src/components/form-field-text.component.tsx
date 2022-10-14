import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormikContext } from "formik";
import { color } from "../theme/theme";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
}

export default function FormFieldText({
  label,
  name,
  placeholder,
  required,
}: Props) {
  const { values, setFieldValue, touched, errors, setFieldTouched } =
    useFormikContext<Props>();

  type ObjectKey = keyof typeof values;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.value);
  };

  const showError =
    touched[name as ObjectKey] && typeof errors[name as ObjectKey] === "string";

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: showError ? color.error : color.primary,
        }}
      >{`${label} ${required ? "*" : ""}`}</Typography>
      <TextField
        helperText={showError ? errors[name as ObjectKey] : null}
        onBlur={() => setFieldTouched(name)}
        error={showError}
        placeholder={placeholder}
        variant="standard"
        sx={{ width: "100%" }}
        value={values[name as ObjectKey]}
        onChange={handleChange}
      />
    </Box>
  );
}
