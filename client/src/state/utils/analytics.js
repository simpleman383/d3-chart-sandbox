const reduceAsync = (array, reduceFn, initialAccumulatorState, chunkSize = 1000) => {
  if (!Array.isArray(array) || !Boolean(array)) {
    return Promise.resolve(initialAccumulatorState);
  }

  return new Promise(resolve => {
    let accumulator = initialAccumulatorState;
    let processed = 0;

    const processChunkSync = (accumulator, currentChunkSize) => {
      for (let i = 0; i < currentChunkSize; i++) {
        accumulator = reduceFn(accumulator, array[processed], processed, array);
        processed++;
      }
  
      return accumulator;
    };

    
    const asyncProcessingTick = () => {
      const countRemained = array.length - processed;

      if (countRemained === 0) {
        resolve(accumulator);
      }
      else {
        const currentChunkSize = countRemained > chunkSize ? chunkSize : countRemained;
        accumulator = processChunkSync(accumulator, currentChunkSize);
        setTimeout(asyncProcessingTick, 0);
      }
    };

    asyncProcessingTick();
  });
};


export const normalizeDataset = async (dataset) => {
  if (!Array.isArray(dataset) || !Boolean(dataset)) {
    return Promise.resolve(null);
  }
  else {
    const items = dataset;
    const types = await reduceAsync(dataset, (acc, item) => {
      const { type } = item;
      if (!acc.has(type)) {
        acc.add(type);
      }
      return acc;
    }, new Set());

    return { 
      items: items, 
      types: Array.from(types) 
    };
  }
};