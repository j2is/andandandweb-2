export default (obj1, obj2) => {
  Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(
      key => Object.keys(obj2).includes(key) && obj1[key] === obj2[key]
    );
};
