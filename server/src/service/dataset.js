import fs from "fs";
import readline from "readline";


const generateType = () => {
  const types = [ "licensing", "suit", "resolved" ];
  return types[Math.floor(Math.random() * 100) % types.length];
};


class DatasetService {
  static staticDataset = null;

  constructor({ datasetFilename, datasetDelimiter = "," }) {
    this.datasetFilename = datasetFilename;
    this.datasetDelimiter = datasetDelimiter;
  }

  async fetchStatic() {
    if (DatasetService.staticDataset !== null) {
      return DatasetService.staticDataset;
    }

    if (!this.datasetFilename || !fs.existsSync(this.datasetFilename)) {
      return [];
    }

    const data = [];
    const stream = fs.createReadStream(this.datasetFilename, { encoding: "utf8" });

    const fileReader = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    for await (const line of fileReader) { 
      const [ source, target, type ] = line.split(this.datasetDelimiter);
      data.push({ source, target, type });
    }

    DatasetService.staticDataset = data;
    return data;
  }

  async generateRandom(size) {
    return new Promise(res => {
      const data = [];

      const chunkSize = 1000;

      const generateDatasetSync = (datasetLength) => {
        return Array(datasetLength).fill(null).map(() => {
          const source = Math.floor(Math.random() * size);
          const target = Math.floor(Math.random() * size);
          const type = generateType();
          return { source, target, type };
        });
      };

      const generateAsync = () => {
        if (data.length === size) {
          res(data);
        }
        else {
          const remainCount = size - data.length;
          const nextChunkSize = remainCount > chunkSize ? chunkSize : remainCount;
          const nextChunk = generateDatasetSync(nextChunkSize);
          data.push.apply(data, nextChunk);
          setTimeout(generateAsync, 0);
        }
      };

      generateAsync();
    });
  }
};

export default DatasetService;