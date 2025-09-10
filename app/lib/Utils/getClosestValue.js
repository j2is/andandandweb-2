export default function getClosestValue(array, value) {
  // only for sorted arrays
  let closest;

  array.some(function(a) {
    if (a >= value) {
      return true;
    }
    closest = a;
  });
  return closest;
}
