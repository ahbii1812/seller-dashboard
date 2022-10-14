import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import AppHeader from "./components/app-header.component";
import { color } from "./theme/theme";
import DetailsForm from "./components/details-form.component";
import ImageAndPreview from "./components/image-and-preview.component";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required().label("Product Name"),
  category: Yup.string().required().label("Category"),
  image: Yup.array().of(Yup.string()).min(1).required().label("Thumbnail"),
  brand: Yup.array().of(Yup.object()).min(1).max(2).required().label("Brand"),
  description: Yup.string().required().label("Description"),
  quantity: Yup.number().required().label("Quantity"),
  declaration: Yup.boolean().oneOf([true], "Declaration must be checked"),
});

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));

  const PaddingYSize = isMobile ? "0px" : "150px";

  const submitForm = (values: any) => {
    console.log("WJ", values);
  };
  return (
    <AppHeader>
      <Formik
        validationSchema={validationSchema}
        onSubmit={submitForm}
        initialValues={{
          productName: "",
          category: "Collectibles",
          image: [],
          brand: [],
          description: "",
          condition: "New",
          season: "",
          retail: "",
          quantity: "",
          declaration: false,
        }}
      >
        <Grid container spacing={3} sx={{ marginTop: "85px" }}>
          <Grid
            item
            xs={isMobile ? 12 : 6}
            sx={{
              paddingTop: PaddingYSize,
              paddingBottom: PaddingYSize,
              borderRight: isMobile ? "0px" : `1px solid ${color.border}`,
            }}
          >
            <ImageAndPreview />
          </Grid>
          <Grid
            item
            xs={isMobile ? 12 : 6}
            sx={{ paddingTop: PaddingYSize, paddingBottom: "150px" }}
          >
            <DetailsForm />
          </Grid>
        </Grid>
      </Formik>
    </AppHeader>
  );
}

export default App;
