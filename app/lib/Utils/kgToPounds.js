import NP from "number-precision";
NP.enableBoundaryChecking(false);

export default function kgToPounds(value) {
  if (!value || typeof value !== "number") {
    return undefined;
  }
  const result = value * 2.205;
  return NP.round(result, 2);
}
