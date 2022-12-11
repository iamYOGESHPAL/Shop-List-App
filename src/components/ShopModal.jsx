import React, { useState, useEffect } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import Select from "./Select";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addShop, updateShop } from "../slices/shopSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const ShopModal = ({ type, modalOpen, setModalOpen, oldShop }) => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [openingDate, setOpeningDate] = useState("");
  const [closingDate, setClosingDate] = useState("Currently Open");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && oldShop) {
      setName(oldShop.name);
      setArea(oldShop.area);
      setCategory(oldShop.category);
      setOpeningDate(formatDate(oldShop.openingDate));
      if (oldShop.closingDate !== "Currently Open") {
        setClosingDate(formatDate(oldShop.closingDate));
      }
    } else {
      setName("");
      setArea("");
      setCategory("");
      setOpeningDate("");
      setClosingDate("Currently Open");
    }
  }, [type, oldShop, modalOpen]);

  const reformatDate = (dateStr) => {
    var dArr = dateStr.split("-"); // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/2010"
  };
  const formatDate = (dateStr) => {
    if (dateStr === "Currently Open") {
      return "Currently Open";
    }
    var dArr = dateStr.split("/"); // ex input: "18/01/2010"
    return `${dArr[2]}-${dArr[1]}-${dArr[0]}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && area && category && openingDate && closingDate) {
      if (type === "add") {
        dispatch(
          addShop({
            id: uuid(),
            name,
            area,
            category,
            openingDate: reformatDate(openingDate),
            closingDate:
              closingDate !== "Currently Open"
                ? reformatDate(closingDate)
                : "Currently Open",
            createdAt: new Date().toLocaleString(),
          })
        );
        toast.success("Shop Added Successfully");
      }
      if (type === "update") {
        if (
          oldShop.name !== name ||
          oldShop.area !== area ||
          oldShop.category !== category ||
          oldShop.openingDate !== reformatDate(openingDate) ||
          oldShop.closingDate !== formatDate(closingDate)
        ) {
          dispatch(
            updateShop({
              ...oldShop,
              name,
              area,
              category,
              openingDate: reformatDate(openingDate),
              closingDate:
                closingDate !== "Currently Open"
                  ? reformatDate(closingDate)
                  : "Currently Open",
              createdAt: new Date().toLocaleString(),
            })
          );
          toast.success("Shop Updated Successfully");
        } else {
          toast.error("No changes Made");
        }
      }
      setModalOpen(false);
    } else {
      toast.error("Please fill all details");
    }
  };
  const checkDate = (date) => {
    if (Date.parse(date) > Date.parse(openingDate)) {
      setClosingDate(date);
    } else {
      toast.error("Shop not close before open,\n please enter valid date");
    }
  };
  const onlyAlphabets = (e) => {
    const l = e.length;
    const key = e.charCodeAt(l - 1);
    //     8 = backspace ,32 = space
    if (
      (key >= 65 && key <= 90) ||
      (key <= 122 && key >= 90) ||
      key === 8 ||
      key === 32
    ) {
      setName(e);
    } else {
      setName(e.slice(0, l - 1));
      toast.error("Only Alphabets allowed");
    }
  };
  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.close__button}
            onClick={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.form__title}>
              {type === "update" ? "Update Shop" : "Add Shop"}
            </h1>
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => onlyAlphabets(e.target.value)}
                placeholder="Enter name in alphabets"
              />
            </label>
            <div className="modal">
              <Select value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="all">Area</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Thane">Thane</option>
                <option value="Nashik">Nashik</option>
                <option value="Nagpur">Nagpur</option>
              </Select>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Baker">Baker</option>
                <option value="Chemist">Chemist</option>
                <option value="Stationery">Stationery</option>
              </Select>
            </div>
            <label>
              Opening Date
              <input
                type="date"
                value={openingDate}
                onChange={(e) => setOpeningDate(e.target.value)}
              />
            </label>
            <label>
              Closing Date
              <input
                type="date"
                value={closingDate}
                onChange={(e) => {
                  checkDate(e.target.value);
                }}
              />
            </label>
            <div className={styles.button__container}>
              <Button type="submit" varient="primary">
                {type === "update" ? "Update Shop" : "Add Shop"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ShopModal;
