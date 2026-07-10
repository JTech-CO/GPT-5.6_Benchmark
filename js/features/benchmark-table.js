import { benchmarks } from "../data/benchmarks.js";
import { modelKeys } from "../config.js";
import { select } from "../utils/dom.js";
import { formatValue } from "../utils/format.js";

const createRow = benchmark => {
  const availableModels = modelKeys.filter(model => benchmark[model] != null);
  const best = availableModels.length ? Math.max(...availableModels.map(model => benchmark[model])) : null;

  const values = modelKeys.map(model => {
    const stateClass = benchmark[model] == null ? "missing" : benchmark[model] === best ? "best" : "";
    return `<td class="${stateClass}">${formatValue(benchmark[model], benchmark.unit)}</td>`;
  }).join("");

  return `<tr><td><span class="cat-chip">${benchmark.category}</span></td><td>${benchmark.name}</td><td>${benchmark.unit}</td>${values}</tr>`;
};

export const renderBenchmarkTable = () => {
  const query = select("#tableSearch").value.trim().toLowerCase();
  const rows = benchmarks.filter(item => `${item.category} ${item.name}`.toLowerCase().includes(query));
  select("#benchmarkBody").innerHTML = rows.map(createRow).join("");
};

export const initBenchmarkTable = () => {
  renderBenchmarkTable();
  select("#tableSearch").addEventListener("input", renderBenchmarkTable);
};
