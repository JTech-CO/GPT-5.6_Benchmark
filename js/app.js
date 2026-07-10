import { initBenchmarkSelectors } from "./features/benchmark-selectors.js";
import { initBenchmarkTable } from "./features/benchmark-table.js";
import { initCostCalculator } from "./features/cost-calculator.js";
import { renderSources } from "./features/source-list.js";
import { initPrintButton } from "./features/print.js";

const initialize = () => {
  initBenchmarkSelectors();
  initBenchmarkTable();
  initCostCalculator();
  renderSources();
  initPrintButton();
};

document.addEventListener("DOMContentLoaded", initialize);
