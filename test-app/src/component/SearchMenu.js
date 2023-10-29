import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SearchMenu = ({ listProduct, setDataSearch, setSearchFilter }) => {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [listLocation, setListLocation] = useState([]);
  const [selectedSold, setSelectedSold] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [inputMin, setInputMin] = useState("");
  const [inputMax, setInputMax] = useState("");

  useEffect(() => {
    if (listProduct?.length > 0) {
      const uniqueValues = [];
      const seenValues = {};

      listProduct.filter((item) => {
        const itemValue = item.location;

        if (!seenValues[itemValue]) {
          seenValues[itemValue] = true;
          uniqueValues.push(itemValue);
          return true;
        }

        return false;
      });

      setListLocation(uniqueValues);
    }
  }, [listProduct]);

  const handleSearchChange = (event) => {
    setDataSearch(event.target.value)
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleInputMinChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue === "" || (Number(inputValue) >= 0 && !isNaN(inputValue))) {
      setInputMin(inputValue);
    }
  };

  const handleInputMaxChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue === "" || (Number(inputValue) >= 0 && !isNaN(inputValue))) {
      setInputMax(inputValue);
    }
  };

  const handleSoldChange = (event) => {
    setSelectedSold(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleResetFilter = () => {
    setSelectedSold("");
    setSelectedPrice("");
    setSelectedLocation("All");
    setInputMin("");
    setInputMax("");
  };

  const handleSearch = () => {
    setSearchFilter({
      inputMin: inputMin,
      inputMax: inputMax,
      location: selectedLocation,
      sold: selectedSold,
      price: selectedPrice
    })
  }

  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search ..."
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ marginTop: "15px" }}>
        <label>PRICE RANGE</label>
        <Grid container sx={{ marginTop: "5px" }}>
          <Grid item xs={5} sm={5} md={5}>
            <TextField
              label="(VND) Min"
              variant="outlined"
              fullWidth
              placeholder="(VND) Min"
              type="number"
              value={inputMin}
              onChange={handleInputMinChange}
            />
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {" "}
              -{" "}
            </div>
          </Grid>
          <Grid item xs={5} sm={5} md={5}>
            <TextField
              label="(VND) Max"
              variant="outlined"
              fullWidth
              placeholder="(VND) Max"
              type="number"
              value={inputMax}
              onChange={handleInputMaxChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ marginTop: "15px" }}>
        <label>LOCATION</label>
        <Select
          value={selectedLocation}
          onChange={handleLocationChange}
          sx={{ width: "100%", marginTop: "5px" }}
        >
          <MenuItem value="All">All</MenuItem>
          {listLocation.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ marginTop: "15px" }}>
        <label>SOLD</label>
        <FormControl fullWidth sx={{ width: "100%", marginTop: "5px" }}>
          <InputLabel id="sold-label">Sold</InputLabel>

          <Select
            value={selectedSold}
            onChange={handleSoldChange}
            labelId="sold-label"
          >
            <MenuItem value="low">Lower to Higher</MenuItem>
            <MenuItem value="high">Higher to Lower</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} sx={{ marginTop: "15px" }}>
        <label>PRICE</label>
        <FormControl fullWidth sx={{ width: "100%", marginTop: "5px" }}>
          <InputLabel id="price-label">Price</InputLabel>
          <Select
            value={selectedPrice}
            labelId="price-label"
            onChange={handlePriceChange}
            label="Price"
          >
            <MenuItem value="low">Lower to Higher</MenuItem>
            <MenuItem value="high">Higher to Lower</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={handleResetFilter}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HighlightOffIcon></HighlightOffIcon>
            <label style={{ paddingLeft: "5px" }}>Reset filter</label>
          </div>
        </Button>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Grid>
    </>
  );
};

SearchMenu.propTypes = {
  listProduct: PropTypes.array,
  setDataSearch: PropTypes.func,
  setSearchFilter: PropTypes.func
};

export default SearchMenu;
