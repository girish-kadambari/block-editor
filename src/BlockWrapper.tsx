import React, { useState, useEffect } from "react";
import App from "./App"; // Adjust the import path
import { generateBlocks } from "./blockData"; // Adjust the import path

export const BlockWrapper = () => {
  const [count, setCount] = useState(20);
  const [blocksofblocks, setBlocksofblocks] = useState(() =>
    generateBlocks(20)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCount(value);
    }
  };

  useEffect(() => {
    setBlocksofblocks(generateBlocks(count));
  }, [count]);

  return (
    <>
      <div className="mb-4">
        <input
          type="number"
          value={count}
          onChange={handleInputChange}
          className="px-4 py-2 mr-2 border rounded"
          min="1"
        />
      </div>
      <div>
        {blocksofblocks.map((block, index) => (
          <App key={index} blocks={block} />
        ))}
      </div>
    </>
  );
};

export default BlockWrapper;
