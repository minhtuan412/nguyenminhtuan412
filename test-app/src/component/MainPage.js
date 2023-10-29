import Grid from "@mui/material/Grid";
import SearchMenu from "./SearchMenu";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3002/items")
      .then((response) => {
        if (response?.data?.length > 0) {
          setListData(response?.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReceivedData = (data) => {
    if (data === "All") {
      getData();
    } else {
      axios
        .get("http://localhost:3002/items")
        .then((response) => {
          if (response?.data?.length > 0) {
            const arr = [];
            response?.data.filter((item) => {
              if (item.type === data) {
                arr.push(item);
                return true;
              } else {
                return false;
              }
            });
            setListData(arr);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSearchData = (dataInput) => {
    axios
      .get("http://localhost:3002/items")
      .then((response) => {
        if (response?.data?.length > 0) {
          const filteredData = response?.data.filter((item) => {
            const values = Object.values(item);
            return values.some((value) =>
              value.toString().toLowerCase().includes(dataInput.toLowerCase())
            );
          });
          setListData(filteredData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchFilter = (filters) => {
    const { inputMin, inputMax, location, sold, price } = filters;
    axios
      .get("http://localhost:3002/items")
      .then((response) => {
        if (response?.data?.length > 0) {
          if (
            inputMin === "" &&
            inputMax === "" &&
            location === "All" &&
            sold === "" &&
            price === ""
          ) {
            setListData(response?.data);
            return;
          }

          let filteredData = [];
          if (inputMin && inputMax) {
            filteredData = response?.data.filter((item) => {
              return item.price >= inputMin && item.price <= inputMax;
            });
          }

          if (location !== "All") {
            if (filteredData.length > 0) {
              filteredData = filteredData?.filter(
                (item) => item?.location === location
              );
            } else {
              filteredData = response?.data?.filter(
                (item) => item?.location === location
              );
            }
          }

          if (sold === "low") {
            if (filteredData.length > 0) {
              filteredData = filteredData.sort((a, b) => a.sold - b.sold);
            } else {
              filteredData = filteredData.sort((a, b) => a.sold - b.sold);
            }
          } else if (sold === "high") {
            if (filteredData.length > 0) {
              filteredData = filteredData.sort((a, b) => b.sold - a.sold);
            } else {
              filteredData = response?.data.sort((a, b) => b.sold - a.sold);
            }
          }

          if (price === "low") {
            if (filteredData.length > 0) {
              filteredData = filteredData.sort((a, b) => a.sold - b.sold);
            } else {
              filteredData = filteredData.sort((a, b) => a.sold - b.sold);
            }
          } else if (price === "high") {
            if (filteredData.length > 0) {
              filteredData = filteredData.sort((a, b) => b.sold - a.sold);
            } else {
              filteredData = response?.data.sort((a, b) => b.sold - a.sold);
            }
          }

          setListData(filteredData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3} md={3}>
          <SearchMenu
            listProduct={listData}
            setDataSearch={handleSearchData}
            setSearchFilter={handleSearchFilter}
          ></SearchMenu>
        </Grid>
        <Grid item xs={9} sm={9} md={9}>
          <ListItem
            listProduct={listData}
            setItemType={handleReceivedData}
          ></ListItem>
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
