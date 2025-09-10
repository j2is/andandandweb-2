export default n =>
  !Number.isNaN(parseFloat(n)) && Number.isFinite(n) && typeof n === "number";
