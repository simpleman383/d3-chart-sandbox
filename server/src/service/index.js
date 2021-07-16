import DatasetService from "./dataset";

export const setupServices = (servicesConfig) => {
  let datasetService = null;

  if (servicesConfig.dataset) {
    const { staticDatasetFilename, staticDatasetDelimiter } = servicesConfig.dataset;

    datasetService = new DatasetService({ 
      datasetFilename: staticDatasetFilename, 
      datasetDelimiter: staticDatasetDelimiter 
    });
  }
  else {
    throw new Error("Failed to initialize Dataset Service - check configuration file");
  }

  return {
    DatasetService: datasetService
  };
};