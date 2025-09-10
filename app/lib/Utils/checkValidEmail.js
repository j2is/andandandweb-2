export default function checkValidEmail(email) {
  if (!email) {
    return false;
  }
  const re = /\S+@\S+\.\S+/; // anystring@anystring.anystring
  return re.test(email);
}
