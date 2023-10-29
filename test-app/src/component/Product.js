import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import PropTypes from "prop-types";

const Product = ({ productItem }) => {
  return (
    <Card sx={{ padding: "10px" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          image={productItem?.image}
          alt="Image"
          sx={{ width: "150px", height: "200px" }}
        />
      </div>
      <CardContent>
        <label>{productItem.name}</label>
      </CardContent>
      <CardActions disableSpacing>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span>{productItem.price}</span>
          <span>Sold: {productItem.sold}</span>
        </div>
      </CardActions>
      <CardActions disableSpacing>
        <div style={{ display: "flex", width: "100%" }}>
          {productItem.location}
        </div>
      </CardActions>
    </Card>
  );
};

Product.propTypes = {
  productItem: PropTypes.object,
};

export default Product;
