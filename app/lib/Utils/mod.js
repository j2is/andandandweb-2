export default function(num, mod) {
  const remain = num % mod;
  return Math.floor(remain >= 0 ? remain : remain + mod);
}
