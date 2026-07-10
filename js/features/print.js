import { select } from "../utils/dom.js";

export const initPrintButton = () => {
  select("#printButton").addEventListener("click", () => window.print());
};
