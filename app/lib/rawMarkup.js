export default function rawMarkup(props) {
  const markup = props;
  return { __html: markup };
}
