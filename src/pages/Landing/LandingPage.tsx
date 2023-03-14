import './LandingPage.scss';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getFakeData, postSearchRequest } from '../../common/apis';
import SearchIcon from '../../assets/icons/search.svg';
import { ISearchResponse } from './interfaces/interfaces';
import AppButton from '../../ui-components/appButton/AppButton';
import AnswerContainer from '../../components/AnswerContainer/AnswerContainer';

const LandingPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResponse, setSearchResponse] = useState<ISearchResponse>(null);
  const { data, isLoading, mutate } = useMutation({
    mutationFn: postSearchRequest,
    onSuccess: ({ data }) => onSearchSuccess(data)
  });

  const onEnterKeySearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const onMouseClickSearch = () => {
    onSearch();
  };

  const onSearch = () => {
    if (true) {
      // mutate({
      //   body: {
      //     model: 'gpt-3.5-turbo',
      //     messages: [
      //       {
      //         role: 'user',
      //         content: inputRef.current.value as string
      //       }
      //     ]
      //   }
      // });
      setSearchResponse({
        "id": "chatcmpl-6u0jrAUV2Jan5UU3W38tS1oXT9M2h",
        "object": "chat.completion",
        "created": 1678807227,
        "model": "gpt-3.5-turbo-0301",
        "usage": {
          "prompt_tokens": 15,
          "completion_tokens": 283,
          "total_tokens": 298
        },
        "choices": [
          {
            "message": {
              "role": "assistant",
              "content": "\n\nAs an AI language model, I cannot provide actual code that is optimized and functional but below is the standard structure to create a React component: \n\n```jsx\nimport React from 'react';\n\n// Define your component as a function or class inheriting from React.Component\nfunction MyComponent(props) {\n  // your code here\n\n  return (\n    <div>\n       {/* your component JSX goes here */}\n    </div>\n  );\n}\n\nexport default MyComponent;\n```\n\nAnd, here is an example implementation of the counter component in React.js.\n\n```jsx\nimport React, {useState} from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  function increment() {\n    setCount(count + 1);\n  }\n\n  function decrement() {\n    setCount(count - 1);\n  }\n\n  return (\n    <div>\n      <h1>Counter: {count}</h1>\n      <button onClick={increment}>Increment</button>\n      <button onClick={decrement}>Decrement</button>\n    </div>\n  );\n}\n\nexport default Counter;\n```\n\nHere, we have used the useState hook to manage the state of the component. We have defined two functions to increment and decrement the count, and we have used the onClick event handlers to bind these functions with the buttons. Finally, we have rendered the count and the buttons."
            },
            "finish_reason": "stop",
            "index": 0
          }
        ]
      })
    }
  };

  const onSearchSuccess = (data: ISearchResponse) => {
    setSearchResponse(data);
  };

  return (
    <>
      <div className="h-100-vh w-100-vw flx-d-col d-flx a-itm-c j-con-c">
        <div className="input-cont d-flx a-itm-c j-con-c">
          <input
            autoComplete="off"
            className="input-text fs-24"
            type="text"
            onKeyDown={onEnterKeySearch}
            ref={inputRef}
          ></input>
          <AppButton className='ml-16' label="Search" size='large' onClick={onMouseClickSearch}></AppButton>
        </div>
        <div>
          {searchResponse?.choices.map((v, i) => {
            return <AnswerContainer key={i} size='medium' className='mi-40 mt-16' value={v}></AnswerContainer>;
          })}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
