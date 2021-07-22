import React from "react";
import cls from "classnames";
import classes from "./styles.module.scss";

import { DatasetType } from "state/types/analytics";
import { SelectableBadgeGroup, Input } from "views/elements";
import { useDebouncedCallback } from "utils/debounce";

const renderDataSourceOption = option => {
  if (!option) {
    return null;
  }

  switch (option.key) {
    case DatasetType.Random:
      return "Random";
    case DatasetType.Static:
      return "Static";
    default:
      return null;
  }
};



const DataSource = ({ currentDataSource, dataSourceOptions, onDataSourceChange, randomDatasetSize, onDatasetSizeChange, className }) => {

  const [ size, setSize ] = React.useState(randomDatasetSize.toString());
  const [ sizeError, setError ] = React.useState(false);

  React.useEffect(() => {
    if (size !== randomDatasetSize.toString()) {
      setSize(randomDatasetSize.toString());
      setError(false);
    }
  }, [ randomDatasetSize ])

  const handleDataSourceChange = (nextSource) => onDataSourceChange(nextSource); 

  const handleDatasetSizeChange = useDebouncedCallback((nextSize) => {
    if (typeof(onDatasetSizeChange) === "function") {
      try {
        const numberValue = Number.parseInt(nextSize);
        if (Number.isNaN(numberValue)) {
          setError(true);
        }
        else {
          if (1 <= numberValue && numberValue < 1000) {
            onDatasetSizeChange(numberValue);
          }
          else {
            setError(true);
          }
        }
      }
      catch(err) {
        console.warn(err);
        setError(true);
      }
    }
  }, 400, [ setError, onDatasetSizeChange ]);

  React.useEffect(() => {
    handleDatasetSizeChange(size);
  }, [ size ]);


  const handleSizeInput = React.useCallback((event) => {
    const { value } = event.target;

    if (sizeError) {
      setError(false);
    }

    setSize(value);
  }, [ sizeError, setError, setSize ]);
  

  return (
    <div className={cls(classes.root, className)}>
      <div className={cls(classes.block, classes.block_type, classes.root__block)}>
        <SelectableBadgeGroup
          options={dataSourceOptions}
          value={currentDataSource}
          renderButtonLabelFn={renderDataSourceOption}
          onChange={handleDataSourceChange}
        />
      </div>

      {
        currentDataSource === DatasetType.Random && (
          <div className={cls(classes.block, classes.block_size, classes.root__block)}>
            <div className={cls(classes.field)}>
              <label htmlFor="dataset-size" className={cls(classes.field__label)}>Dataset size (1 - 999):</label>
              <Input 
                className={cls(classes.field__input)} 
                error={sizeError}
                id="dataset-size" 
                type="number" 
                min={1} max={999} 
                step={10}
                value={size} 
                onChange={handleSizeInput} 
              />
            </div>
          </div>
        )
      }

    </div>
  );
};

export default DataSource;