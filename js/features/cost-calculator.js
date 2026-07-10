import { models } from "../data/models.js";
import { modelKeys, modelClasses } from "../config.js";
import { select } from "../utils/dom.js";

export const renderCosts = () => {
  const inputTokens = Math.max(0, Number(select("#inputTokens").value) || 0);
  const outputTokens = Math.max(0, Number(select("#outputTokens").value) || 0);
  const costs = modelKeys.map(model => ({
    model,
    cost: inputTokens * models[model].input + outputTokens * models[model].output
  }));
  const max = Math.max(...costs.map(item => item.cost), 1);

  select("#costResults").innerHTML = costs.map(item => {
    const width = item.cost / max * 100;
    const colorClass = modelClasses[item.model];
    return `<div class="cost-row"><span>${item.model}</span><div class="cost-bar"><i class="model-bg-${colorClass}" style="width:${width}%"></i></div><span class="cost-value">$${item.cost.toFixed(2)}</span></div>`;
  }).join("");
};

export const initCostCalculator = () => {
  renderCosts();
  select("#inputTokens").addEventListener("input", renderCosts);
  select("#outputTokens").addEventListener("input", renderCosts);
};
