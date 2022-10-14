import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import { color } from "../theme/theme";

interface Props {
  label: string;
  name: string;
}

interface ImageProps {
  image: Array<string>;
}

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export default function ImageList({ label, name }: Props) {
  const {
    values,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    touched,
    errors,
  } = useFormikContext<ImageProps>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const showError =
    touched[name as ObjectKey] && typeof errors[name as ObjectKey] === "string";

  type ObjectKey = keyof typeof values;

  const onRemoveImage = (path: string) => {
    const tempDatadataToReturn = values[name as ObjectKey].filter(
      (item) => item !== path
    );
    setFieldValue(name, tempDatadataToReturn);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        disabled={values[name as ObjectKey].length >= 5}
        component="label"
        sx={{
          margin: "0px",
          minWidth: "90px",
          height: "300px",
          textTransform: "none",
          borderRadius: "0px",
          fontWeight: "light",
          padding: "0px",

          border: `1px solid ${color.border}`,
          ":hover": { backgroundColor: "transparent" },
          color: color.primary,
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <AddPhotoAlternateIcon />
          Add Image
        </Box>

        <input
          onClick={() => setFieldTouched(name)}
          type="file"
          name={name}
          hidden
          accept="image/*"
          onChange={(e) => {
            const { files } = e.target;
            if (files) {
              const selectedFIles = files[0];
              const allowedFileType = SUPPORTED_FORMATS.includes(
                selectedFIles.type
              );
              if (allowedFileType) {
                const fileReader = new FileReader(); // to preview the image
                fileReader.onload = () => {
                  if (fileReader.readyState === 2) {
                    const tempArr: string[] = values[name as ObjectKey];
                    tempArr.push(JSON.stringify(fileReader.result));
                    setFieldValue(name, tempArr);
                  }
                };
                fileReader.readAsDataURL(selectedFIles);
              } else if (!allowedFileType) {
                setFieldError(name, `Only ${SUPPORTED_FORMATS} are allowed`);
              }
            }
          }}
        />
      </Button>

      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{ color: color.border, textAlign: "center" }}
          >
            You may upload up to 5 images (including thumbnail) Supported file
            types: jpeg, jpg, png
          </Typography>
        </Grid>
        {values[name as ObjectKey].map((item) => (
          <Grid item xs={isMobile ? 12 : 4} key={uuidv4()}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => onRemoveImage(item)}
                sx={{
                  padding: "0px",
                  position: "absolute",
                  color: color.border,
                  top: "5px",
                  right: "5px",
                }}
              >
                <CancelIcon sx={{ fontSize: "18px" }} />
              </IconButton>
              <img src={JSON.parse(item)} alt="213" width="100%" />
            </Box>
          </Grid>
        ))}
      </Grid>

      {showError && (
        <FormHelperText error>{errors[name as ObjectKey]}</FormHelperText>
      )}
    </Box>
  );
}
