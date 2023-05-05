import React, { Suspense } from "react";
import GptLoading from "../../ui-components/gptLoading/GptLoading";
import "./LazyLoadingComponent.scss";

type LazyLoadingComponentProps = {
  children: React.ReactNode;
};

const LazyLoadingComponent: React.FC<LazyLoadingComponentProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="lazy-load-cont pos-abs h-100-p w-100-p">
          <GptLoading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoadingComponent;
