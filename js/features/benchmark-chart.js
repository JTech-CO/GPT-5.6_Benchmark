import { benchmarks } from "../data/benchmarks.js";
import { models } from "../data/models.js";
import { modelKeys, modelClasses } from "../config.js";
import { getActiveModels, isModelActive, toggleModel } from "../state/chart-state.js";
import { select } from "../utils/dom.js";
import { formatValue, formatSignedValue } from "../utils/format.js";

const renderLegend = () => {
  const legend = select("#legend");

  legend.innerHTML = modelKeys.map(model => {
    const stateClass = isModelActive(model) ? "" : "off";
    const colorClass = modelClasses[model];
    return `<button class="${stateClass}" data-model="${model}"><span class="legend-dot model-color-${colorClass}"></span>${model}</button>`;
  }).join("");

  legend.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      toggleModel(button.dataset.model);
      renderChart();
    });
  });
};

const renderGridLines = ({ left, plotWidth, top, height, bottom, max }) => {
  let markup = "";

  for (let index = 0; index <= 5; index += 1) {
    const x = left + plotWidth * index / 5;
    const value = max * index / 5;
    markup += `<line x1="${x}" y1="${top}" x2="${x}" y2="${height - bottom}" stroke="rgba(255,255,255,.08)"/>`;
    markup += `<text x="${x}" y="${height - 6}" fill="#69758a" font-size="10" text-anchor="middle">${value.toFixed(max > 200 ? 0 : 1)}</text>`;
  }

  return markup;
};

const renderBars = ({ entries, left, plotWidth, top, height, bottom, max, unit }) => {
  const rowHeight = (height - top - bottom) / entries.length;
  let markup = "";

  entries.forEach((entry, index) => {
    const y = top + index * rowHeight + rowHeight * 0.18;
    const barHeight = rowHeight * 0.62;
    markup += `<text x="${left - 12}" y="${y + barHeight * 0.67}" fill="#cbd3e1" font-size="12" text-anchor="end">${entry.model}</text>`;

    if (entry.value == null) {
      markup += `<text x="${left + 7}" y="${y + barHeight * 0.67}" fill="#596377" font-size="12">미공개</text>`;
      return;
    }

    const width = plotWidth * entry.value / max;
    const valueX = Math.min(left + width + 9, 835);
    markup += `<rect x="${left}" y="${y}" width="${Math.max(width, 2)}" height="${barHeight}" rx="7" fill="${models[entry.model].color}" opacity=".88"><animate attributeName="width" from="0" to="${Math.max(width, 2)}" dur=".45s" fill="freeze"/></rect>`;
    markup += `<text x="${valueX}" y="${y + barHeight * 0.67}" fill="#f5f7fb" font-size="12" font-weight="800">${formatValue(entry.value, unit)}</text>`;
  });

  return markup;
};

const renderDeltas = (row, baseline) => {
  const focusModels = ["Sol", "Terra", "Luna"];

  select("#quickDeltas").innerHTML = focusModels.map(model => {
    const difference = row[model] != null && row[baseline] != null ? row[model] - row[baseline] : null;
    const stateClass = difference == null ? "neutral" : difference > 0 ? "up" : difference < 0 ? "down" : "neutral";
    const description = row[model] == null || row[baseline] == null ? "공통 수치 없음" : "선택 항목의 절대 차이";
    return `<div class="quick-delta"><span>${model} − ${baseline}</span><b class="${stateClass}">${formatSignedValue(difference, row.unit)}</b><span>${description}</span></div>`;
  }).join("");
};

export const renderChart = () => {
  renderLegend();

  const benchmarkIndex = Number(select("#benchmarkSelect").value) || 0;
  const row = benchmarks[benchmarkIndex];
  const baseline = select("#baselineSelect").value;
  const entries = getActiveModels().map(model => ({ model, value: row[model] }));
  const values = entries.filter(entry => entry.value != null).map(entry => entry.value);
  const max = Math.max(...values, 1);
  const svg = select("#barChart");
  const width = 900;
  const height = 320;
  const left = 150;
  const right = 68;
  const top = 15;
  const bottom = 26;
  const plotWidth = width - left - right;

  select("#chartHeading").textContent = row.name;
  select("#chartSubheading").textContent = `${row.category} · 단위: ${row.unit} · 기준: ${models[baseline].full}`;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML =
    renderGridLines({ left, plotWidth, top, height, bottom, max }) +
    renderBars({ entries, left, plotWidth, top, height, bottom, max, unit: row.unit });

  renderDeltas(row, baseline);
};
