import './AnswerContainer.scss';
import React from 'react';
import { IChoice } from '../../pages/Landing/interfaces/interfaces';
import { ISize } from '../../common/interfaces/Size';
import { IAnswer, IAnswerContent } from '../../common/interfaces/Answer';
import CodeEditor from '../../ui-components/codeEditor/CodeEditor';

export type AnswerContainerProps = {
  value?: IChoice;
  size?: ISize;
} & React.HTMLAttributes<HTMLDivElement>;

const getDimension = (size: ISize): string => {
  switch (size) {
    case "small": {
      return 'fs-12'
    }
    case "medium": {
      return 'fs-20'
    }
    case "large": {
      return 'fs-24'
    }
    default: {
      return 'fs-20'
    }
  }
}

const splitMessageAndCode = (content: string): IAnswer[] => {
  const message = content.split("```");
  const answer: IAnswer[] = [];

  message.forEach((content: string, index: number) => {
    const language = index % 2 === 0 ? undefined : content.split("\n")[0];
    answer.push({
      type: index % 2 === 0 ? "message" : "code",
      content: index % 2 === 0 ? content : {
        language: language,
        code: content.slice(language.length + 1, content.length)
      }
    }
    )
  })
  return answer;
}

const AnswerContainer: React.FC<AnswerContainerProps> = ({ value, className, size }) => {
  // splitMessageAndCode(value.message.content).forEach((value: IAnswer) => {
  //   console.log(value.content);
  // })
  return (
    <div className={`ans-cont p-16 ${className} ${getDimension(size)}`}>
      {splitMessageAndCode(value.message.content).map((value: IAnswer) => {
        return value.type === "code" ? <CodeEditor className='mt-8' value={value.content as IAnswerContent}></CodeEditor> : <div className='mt-8'>{value.content as string}</div>
      })}
    </div>
  );
}

export default AnswerContainer;