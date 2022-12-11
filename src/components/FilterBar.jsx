import React, { useState, useEffect } from "react";
import Button from "./Button";
import Select from "./Select";
import styles from "../styles/modules/app.module.scss";
import ShopModal from "./ShopModal";
import getClasses from "../utils/getClasses";
import { useDispatch } from "react-redux";
import { updateFilter } from "../slices/shopSlice";

const FilterBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [areaFilter, setAreaFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFilter({ statusFilter, areaFilter, categoryFilter }));
  }, [statusFilter, areaFilter, categoryFilter, dispatch]);

  return (
    <div className={getClasses([styles.appHeader, "filter-bar"])}>
      <span>
        <Button
          type="submit"
          varient="primary"
          onClick={() => setModalOpen(true)}
        >
          Add Shop
        </Button>
        <Select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </Select>
      </span>
      <span>
        <Select
          id="area"
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
        >
          <option value="all">Area</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Thane">Thane</option>
          <option value="Nashik">Nashik</option>
          <option value="Nagpur">Nagpur</option>
        </Select>
        <Select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Category</option>
          <option value="Grocery">Grocery</option>
          <option value="Baker">Baker</option>
          <option value="Chemist">Chemist</option>
          <option value="Stationery">Stationery</option>
        </Select>
      </span>
      <span>
        <ShopModal
          type={"add"}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </span>
    </div>
  );
};

export default FilterBar;
