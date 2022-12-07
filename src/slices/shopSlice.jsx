import { createSlice } from "@reduxjs/toolkit";

const getInitialShops = () => {
  // Getting Shop List
  const localShopList = window.localStorage.getItem("shopList");
  // If Shop List is not empty
  if (localShopList) {
    return JSON.parse(localShopList);
  }
  window.localStorage.setItem("shopList", []);
  return [];
};

const initialValue = {
  filteredShopList: [],
  shopList: getInitialShops(),
};

export const shopSlice = createSlice({
  name: "shop",
  initialState: initialValue,
  reducers: {
    addShop: (state, action) => {
      state.filteredShopList = state.shopList.push(action.payload);
      const shopList = window.localStorage.getItem("shopList");
      if (shopList) {
        const shopListArr = JSON.parse(shopList);
        shopListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("shopList", JSON.stringify(shopListArr));
      } else {
        window.localStorage.setItem(
          "shopList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateShop: (state, action) => {
      const shopList = window.localStorage.getItem("shopList");
      if (shopList) {
        const shopListArr = JSON.parse(shopList);
        shopListArr.forEach((shop) => {
          if (shop.id === action.payload.id) {
            shop.name = action.payload.name;
            shop.area = action.payload.area;
            shop.category = action.payload.category;
            shop.openingDate = action.payload.openingDate;
            shop.closingDate = action.payload.closingDate;
            shop.createdAt = action.payload.createdAt;
          }
        });
        window.localStorage.setItem("shopList", JSON.stringify(shopListArr));
        state.filteredShopList = state.shopList = shopListArr;
      }
    },
    deleteShop: (state, action) => {
      const shopList = window.localStorage.getItem("shopList");
      if (shopList) {
        const shopListArr = JSON.parse(shopList);
        shopListArr.forEach((shop, index) => {
          if (shop.id === action.payload) {
            shopListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("shopList", JSON.stringify(shopListArr));
        state.filteredShopList = state.shopList = shopListArr;
      }
    },
    updateFilter: (state, action) => {
      const { statusFilter, areaFilter, categoryFilter } = action.payload;
      if (state.filteredShopList.length <= 0) {
        state.filteredShopList = state.shopList;
      }
      if (
        statusFilter === "all" &&
        areaFilter === "all" &&
        categoryFilter === "all"
      ) {
        state.filteredShopList = state.shopList;
      }
      if (statusFilter !== "all") {
        const closedShops = [];
        const openShops = [];
        state.shopList.forEach((item, i) => {
          const currentDate = Date.parse(new Date().toLocaleDateString());
          if (item.closingDate !== "Currently Open") {
            const closedDate = Date.parse(item.closingDate);
            if (closedDate < currentDate) {
              closedShops.push(item);
            } else {
              openShops.push(item);
            }
          } else {
            openShops.push(item);
          }

          if (statusFilter === "Open") {
            state.filteredShopList = openShops;
          }
          if (statusFilter === "Closed") {
            state.filteredShopList = closedShops;
          }
        });
      }
      if (areaFilter !== "all") {
        state.filteredShopList = state.filteredShopList.filter(
          (item) => item.area === areaFilter
        );
      }
      if (categoryFilter !== "all") {
        state.filteredShopList = state.filteredShopList.filter(
          (item) => item.category === categoryFilter
        );
      }
    },
  },
});

export const { addShop, updateShop, deleteShop, updateFilter } =
  shopSlice.actions;
export default shopSlice.reducer;
