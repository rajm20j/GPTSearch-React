import { getRandomColor } from "../../common/utils";
import "./GptLoading.scss";
import React from "react";

const GptLoading: React.FC = () => {
  const numberOfBlocks = 6;
  return (
    <div className="loading-cont p-4 bg-white d-flx">
      {[...Array(numberOfBlocks)].map((_, index) => {
        return (
          <div
            className="loading-cont-block flx-1 mi-4"
            style={{
              backgroundColor: getRandomColor(),
              animation: `loadAnim ${numberOfBlocks}s ${index}s steps(1) infinite`
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default GptLoading;
