import NP from "number-precision";
NP.enableBoundaryChecking(false);

export default function mmToInches(value) {
  if (!value || typeof value !== "number") {
    return undefined;
  }
  const result = NP.divide(value, 25.4);
  return NP.round(result, 2);
}
