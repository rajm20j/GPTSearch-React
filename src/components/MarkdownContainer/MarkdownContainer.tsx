import "./MarkdownContainer.scss";
import React from "react";
import { ISize } from "../../common/interfaces/Size";
import CodeEditor from "../../ui-components/codeEditor/CodeEditor";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export type MarkdownContainerProps = {
  value?: string;
  size?: ISize;
} & React.HTMLAttributes<HTMLDivElement>;

const getDimension = (size: ISize): string => {
  switch (size) {
    case "small": {
      return "fs-16";
    }
    case "medium": {
      return "fs-20";
    }
    case "large": {
      return "fs-24";
    }
    default: {
      return "fs-20";
    }
  }
};

const MarkdownContainer: React.FC<MarkdownContainerProps> = ({ value, className, size }) => {
  return (
    <div className={`ans-cont p-16 ${className} ${getDimension(size)}`}>
      <ReactMarkdown
        components={{
          code: CodeEditor
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContainer;
