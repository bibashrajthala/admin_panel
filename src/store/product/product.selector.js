export const selectTotalProducts = (state) =>
  state.product?.products?.total_records;
export const selectProducts = (state) => state.product?.products?.data;

export const selectProductsBrandList = (state) => state.product?.brandList;

export const selectProductsUnits = (state) => state.product?.units;

export const selectProductsCategories = (state) => state.product?.categories;

export const selectProductsWarehouses = (state) => state.product?.warehouses;

export const selectProductsWarehousesAndStocks = (state) =>
  state.product?.warehousesAndStocks;

export const selectProductsWarehouseInfo = (state) =>
  state.product?.warehouseInfo;

export const selectProductEditHistory = (state) => state.product?.history;

export const selectProductById = (state) => state.product?.product;

export const selectProductEditStatus = (state) => state.product?.editedStatus;
