import { Box, Grid, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { v4 as uuidv4 } from "uuid";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { color } from "../theme/theme";

interface FormProps {
  productName: string;
  category: string;
  image: Array<string>;
  brand: Array<{ id: string; label: string }>;
  description: string;
  condition: string;
  season: string;
  retail: string;
  quantity: string;
  declaration: boolean;
  label: string;
}

export default function Preview() {
  const { values } = useFormikContext<FormProps>();

  const getBrandLabel = () => {
    const tempArr: string[] = [];
    values.brand.map((item) => tempArr.push(item.label));
    return tempArr;
  };

  return (
    <Grid container spacing={3}>
      {(values.productName !== "" || values.retail !== "") && (
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {values.productName !== "" && (
              <Typography variant="h5">{values.productName}</Typography>
            )}
            {values.retail !== "" && (
              <Typography
                sx={{
                  fontWeight: "bold",
                  minWidth: "100px",
                  textAlign: "end",
                }}
              >{`S$ ${values.retail}`}</Typography>
            )}
          </Box>
        </Grid>
      )}
      {values.image.length > 0 && (
        <Grid item xs={12}>
          <Carousel showThumbs>
            {values.image.map((item) => (
              <img
                key={uuidv4()}
                src={JSON.parse(item)}
                width="100%"
                alt="prod-img"
              />
            ))}
          </Carousel>
        </Grid>
      )}
      {values.brand.length > 0 && (
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }}>Brand</Typography>
          <Typography variant="body2" sx={{ color: color.placeholder }}>
            {getBrandLabel().join(" ,")}
          </Typography>
        </Grid>
      )}
      {values.description && (
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
          <Typography variant="body2" sx={{ color: color.placeholder }}>
            {values.description}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12}>
        <Typography sx={{ fontWeight: "bold" }}>Category</Typography>
        <Typography variant="body2" sx={{ color: color.placeholder }}>
          {values.category}
        </Typography>
      </Grid>

      {values.quantity !== "" && (
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }}>Quantity</Typography>
          <Typography variant="body2" sx={{ color: color.placeholder }}>
            {values.quantity}
          </Typography>
        </Grid>
      )}

      {values.condition !== "" && (
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }}>Condition</Typography>
          <Typography variant="body2" sx={{ color: color.placeholder }}>
            {values.condition}
          </Typography>
        </Grid>
      )}

      {values.season !== "" && (
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }}>Season</Typography>
          <Typography variant="body2" sx={{ color: color.placeholder }}>
            {values.season}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
