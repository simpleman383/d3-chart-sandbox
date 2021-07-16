import { initializeServer } from "./app";


const configuration = {
  port: 3001,
  publicPath: WEBAPP_PUBLIC_PATH,

  services: {
    dataset: {
      staticDatasetFilename: DATASET_FILENAME,
      staticDatasetDelimiter: ","
    }
  }
};


const main = async () => {
  try {
    const server = initializeServer(configuration);
    const success = await server.run();

    if (success) {
      console.log(`Server successfully started on port: ${configuration.port}`);
    }
    else {
      console.log("Failed to start server");
    }
  }
  catch (err) {
    console.error(err);
  }
};


main();