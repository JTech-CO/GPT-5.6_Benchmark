import { benchmarks } from "../data/benchmarks.js";
import { models } from "../data/models.js";
import { modelKeys } from "../config.js";
import { select } from "../utils/dom.js";
import { renderChart } from "./benchmark-chart.js";

const renderBenchmarkOptions = () => {
  const category = select("#categorySelect").value;
  const previousValue = select("#benchmarkSelect").value;
  const filtered = category === "전체" ? benchmarks : benchmarks.filter(item => item.category === category);

  select("#benchmarkSelect").innerHTML = filtered.map(item => {
    const index = benchmarks.indexOf(item);
    const selected = String(index) === previousValue ? "selected" : "";
    return `<option value="${index}" ${selected}>${item.name}</option>`;
  }).join("");

  renderChart();
};

export const initBenchmarkSelectors = () => {
  const categories = ["전체", ...new Set(benchmarks.map(item => item.category))];

  select("#categorySelect").innerHTML = categories.map(category => `<option>${category}</option>`).join("");
  select("#baselineSelect").innerHTML = modelKeys.map(model => {
    const selected = model === "GPT-5.5" ? "selected" : "";
    return `<option value="${model}" ${selected}>${models[model].full}</option>`;
  }).join("");

  renderBenchmarkOptions();

  select("#categorySelect").addEventListener("change", renderBenchmarkOptions);
  select("#benchmarkSelect").addEventListener("change", renderChart);
  select("#baselineSelect").addEventListener("change", renderChart);
};
