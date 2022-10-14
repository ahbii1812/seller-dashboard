import {
  Box,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { color } from "../theme/theme";

const AddedBrandContainer = styled(Box)({
  padding: "8px",
  border: `1px solid ${color.border}`,
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
});

interface Props {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
}

export default function BrandField({
  label,
  name,
  placeholder,
  required,
}: Props) {
  const [text, setText] = useState("");
  const [brandList, setBrandList] = useState([]);
  const { setFieldValue, errors, touched, setFieldTouched, values } =
    useFormikContext<Props>();
  type ObjectKey = keyof typeof values;

  const showError =
    touched[name as ObjectKey] && typeof errors[name as ObjectKey] === "string";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const keyPress = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      const tempArr: object[] = brandList;
      tempArr.push({ label: text, id: uuidv4() });
      setBrandList(brandList);
      setText("");
      setFieldValue(name, brandList);
    }
  };

  const onRemoveBrand = (removeId: string) => {
    const tempDatadataToReturn = brandList.filter(({ id }) => id !== removeId);
    setBrandList(tempDatadataToReturn);
    setFieldValue(name, tempDatadataToReturn);
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
        onKeyDown={keyPress}
        placeholder={placeholder}
        variant="standard"
        sx={{ width: "100%" }}
        value={text}
        onChange={handleChange}
        disabled={brandList.length >= 2}
        onBlur={() => setFieldTouched(name)}
        helperText={showError ? errors[name as ObjectKey] : null}
        error={showError}
      />
      {brandList.length > 0 && (
        <Grid container spacing={1} sx={{ marginTop: "5px" }}>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: color.border }}>E.g.</Typography>
          </Grid>
          {brandList.map(({ id, label }) => (
            <Grid item key={id}>
              <AddedBrandContainer>
                <Typography sx={{ color: color.border }}>{label}</Typography>
                <IconButton
                  onClick={() => onRemoveBrand(id)}
                  sx={{
                    padding: "0px",
                    color: color.border,
                    marginLeft: "10px",
                  }}
                >
                  <CancelIcon sx={{ fontSize: "18px" }} />
                </IconButton>
              </AddedBrandContainer>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
