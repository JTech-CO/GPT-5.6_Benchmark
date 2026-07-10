import { sources } from "../data/sources.js";
import { select } from "../utils/dom.js";

export const renderSources = () => {
  select("#sourceList").innerHTML = sources.map(source => {
    return `<a class="source" href="${source.url}" target="_blank" rel="noopener"><b>${source.title} ↗</b><span>${source.note}</span></a>`;
  }).join("");
};
