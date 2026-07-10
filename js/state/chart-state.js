import { modelKeys } from "../config.js";

const activeModels = new Set(modelKeys);

export const getActiveModels = () => modelKeys.filter(model => activeModels.has(model));

export const isModelActive = model => activeModels.has(model);

export const toggleModel = model => {
  if (activeModels.has(model)) {
    activeModels.delete(model);
  } else {
    activeModels.add(model);
  }

  if (activeModels.size === 0) {
    activeModels.add(model);
  }
};
