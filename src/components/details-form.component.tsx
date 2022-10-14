import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import BorderButton from "./border-button.component";
import BrandField from "./brand-field.component";
import FormCheckBox from "./form-checkbox.component";
import FormFieldTextCounter from "./form-field-text-counter.component";
import FormFieldText from "./form-field-text.component";
import FormSubmitButton from "./form-submit-button.component";
import PriceForm from "./price-form.component";
import QuantityField from "./quantity-field.component";
import CategorySelect from "./select.component";
import ThumbnailImage from "./thumbnail-image.component";

export default function DetailsForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  return (
    <Grid container spacing={6} sx={{ paddingLeft: isMobile ? "0px" : "20px" }}>
      {!isMobile && <Grid item xs={12} />}
      <Grid item xs={12}>
        <FormFieldText
          label="Product Name"
          name="productName"
          placeholder="Name your listing. Keep it short and sweet"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item>
            <CategorySelect
              name="category"
              label="Category"
              required
              list={["Collectibles", "Accessories", "T-Shirts"]}
            />
          </Grid>
          {!isMobile && (
            <Grid item sx={{ display: "flex", flex: 1 }}>
              <ThumbnailImage name="image" label="Thumbnail Image" />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <BrandField
          name="brand"
          label="Brand (up to 2)"
          placeholder="Add a keyword and press Enter"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormFieldTextCounter
          maxLength={200}
          label="Description"
          name="description"
          placeholder="Add more information about the product"
          required
        />
      </Grid>
      <Grid item xs={6}>
        <QuantityField
          label="Available Qty"
          name="quantity"
          placeholder="Enter available quantity"
          required
        />
      </Grid>
      {isMobile && (
        <Grid item xs={6}>
          <ThumbnailImage name="image" label="Thumbnail Image" />
        </Grid>
      )}
      <Grid item xs={12}>
        <CategorySelect
          name="condition"
          label="Condition"
          required={false}
          list={["Bad", "Fair", "Good", "New"]}
        />
      </Grid>
      <Grid item xs={6}>
        <FormFieldText
          label="Season"
          name="season"
          placeholder="SS20"
          required={false}
        />
      </Grid>

      <Grid item xs={6}>
        <PriceForm
          label="Retail"
          name="retail"
          placeholder="400"
          required={false}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>Authenticity</Typography>
        <Typography sx={{ padding: "4px 0px 5px" }}>100%</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormCheckBox
          label="Declaration"
          required
          name="declaration"
          message="I hereby declare that my item is 100% authentic and in the original packaging. In the event that any information given in this application proves to be false or incorrect, I shall be responsible for the consequences."
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>* indicates required</Typography>
      </Grid>
      <Grid item xs={12} />
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <BorderButton onClick={() => console.log("Cancel")}>
          <Typography>Cancel</Typography>
        </BorderButton>
        <Box sx={{ marginLeft: "10px" }} />
        <FormSubmitButton>
          <Typography sx={{ color: "white" }}>Publish</Typography>
        </FormSubmitButton>
      </Grid>
    </Grid>
  );
}
