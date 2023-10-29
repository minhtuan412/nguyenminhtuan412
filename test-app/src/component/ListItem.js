import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Product from "./Product";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ListItem = ({ listProduct, setItemType }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [clickCount, setClickCount] = useState(0);
  const [listType, setListType] = useState([]);
  const [showAllButtons, setShowAllButtons] = useState(false);
  const [selectedButton, setSelectedButton] = useState(false);
  const [color, setColor] = useState("black");
  const [backGroundColor, setBackGroundColor] = useState("unset");
  const [colorAll, setColorAll] = useState("#fff");
  const [backGroundColorAll, setBackGroundColorAll] = useState("#1976d2");

  useEffect(() => {
    if (listProduct.length > 0) {
      const uniqueValues = [];
      const seenValues = {};

      listProduct.filter((item) => {
        const itemValue = item.type;

        if (!seenValues[itemValue]) {
          seenValues[itemValue] = true;
          const data = {
            value: itemValue,
            color: color,
            backGroundColor: backGroundColor,
          };
          uniqueValues.push(data);
          return true;
        }

        return false;
      });

      setListType(uniqueValues);
    }
  }, [listProduct]);

  useEffect(() => {
    handleResize();
  }, [listProduct]);

  const handleShowAllButtons = () => {
    setShowAllButtons(true);
  };

  const handleResize = () => {
    const screenHeight = window.innerHeight;
    const listItemHeight = 200;
    const gridHeight = listProduct.length * listItemHeight;

    if (gridHeight > screenHeight) {
      setShowAllProducts(true);
    } else {
      setShowAllProducts(false);
    }
  };

  const handleShowMore = () => {
    setClickCount(clickCount + 1);
  };

  const handleClickAll = () => {
    setColorAll("fff");
    setBackGroundColorAll("#1976d2");

    const newListType = listType.map((item) => {
      return {
        value: item.value,
        color: color,
        backGroundColor: backGroundColor,
      };
    });

    setListType(newListType);

    setItemType("All");
  };

  const handleClickTypeButon = (element) => {
    setColorAll(color);
    setBackGroundColorAll(backGroundColor);
    setItemType(element);
    const data = [];

    listType.filter((item) => {
      if (item.value === element) {
        data.push({
          value: item.value,
          color: "#fff",
          backGroundColor: "#1976d2",
        });

        return true;
      } else {
        data.push({
          value: item.value,
          color: color,
          backGroundColor: backGroundColor,
        });

        return false;
      }
    });

    setListType(data);
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <Button
          sx={{
            margin: "5px",
            backgroundColor: backGroundColorAll,
            color: colorAll,
          }}
          variant="contained"
          onClick={handleClickAll}
        >
          All
        </Button>
        {(showAllButtons ? listType : listType.slice(0, 5)).map(
          (item, index) => {
            return (
              <Button
                sx={{
                  margin: "5px",
                  backgroundColor: item.backGroundColor,
                  color: item.color,
                }}
                key={index}
                variant="contained"
                onClick={() => handleClickTypeButon(item.value)}
              >
                {item.value}
              </Button>
            );
          }
        )}
        {!showAllButtons && (
          <Button variant="icon-arrow" onClick={handleShowAllButtons}>
            <ArrowDropDownIcon></ArrowDropDownIcon>
          </Button>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container>
          {(listProduct || [])
            .slice(0, (clickCount + 1) * visibleProducts)
            .map((item) => {
              return (
                <Grid
                  key={item.id}
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  sx={{ padding: "5px" }}
                >
                  <Product productItem={item}></Product>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        {showAllProducts &&
          clickCount < listProduct.length / visibleProducts - 1 && (
            <Button variant="contained" onClick={handleShowMore}>
              View more
            </Button>
          )}
      </Grid>
    </>
  );
};

ListItem.propTypes = {
  listProduct: PropTypes.array,
  setItemType: PropTypes.func,
};

export default ListItem;
