export default function MakeTitleCase(str) {
  const strArray = str.toLowerCase().split(" ");
  const array = [];
  strArray.map(word => {
    array.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return array.join(" ");
}
