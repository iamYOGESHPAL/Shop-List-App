const getClasses = (classes) => {
  return classes
    .filter((item) => item !== "")
    .join(" ")
    .trim();
};
export default getClasses;
