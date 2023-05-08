import "./InputBox.scss";
import React, { useCallback, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postSearchRequest } from "../../common/apis";
import AppButton from "../../ui-components/appButton/AppButton";
import useCheckDevice from "../../hooks/useDevice";
import VoiceSearchIcon from "../../assets/icons/voice-search.svg";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { IMessage, ISearchResponse } from "../../pages/Landing/interfaces/interfaces";
import useKeyPress from "../../hooks/useKeyPress";

type InputBoxProps = {
  searchResponse?: ISearchResponse;
  setSearchResponse?: (val: ISearchResponse) => void;
  markdownList?: JSX.Element[];
  setMarkdownList?: (val: JSX.Element[]) => void;
};

const InputBox: React.FC<InputBoxProps> = ({
  searchResponse,
  setSearchResponse,
  markdownList,
  setMarkdownList
}) => {
  const { isMobile } = useCheckDevice();
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const { isLoading, mutate } = useMutation({
    mutationFn: postSearchRequest,
    mutationKey: ["chat"],
    onSuccess: ({ data }) => onSearchSuccess(data)
  });

  const onSearch = useCallback(() => {
    if (inputRef?.current.value) {
      const message: IMessage = {
        role: "user",
        content: (inputRef?.current.value as string).trim()
      };
      mutate({
        body: {
          model: "gpt-3.5-turbo",
          messages: [...messages, message]
        }
      });
      setMessages([...messages, message]);
    }
  }, [inputRef, mutate, messages]);

  useKeyPress("Enter", {
    callback: onSearch
  });

  const onSearchSuccess = useCallback(
    (data: ISearchResponse) => {
      setMessages([...messages, { ...data.choices[0].message }]);
      data.choices[0].message.content = `**${inputRef?.current.value}**\n\n${data.choices[0].message.content}`;
      setSearchResponse(data);
      if (inputRef?.current.value) {
        inputRef.current.value = "";
      }
    },
    [inputRef, messages]
  );

  const onMouseClickSearch = useCallback(() => {
    onSearch();
  }, [onSearch]);

  const onVoiceSearchClick = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition");
    }
    resetTranscript();
    listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening();
  }, [browserSupportsSpeechRecognition, resetTranscript, listening]);

  const onResetClick = useCallback(() => {
    inputRef?.current?.blur();
    setMarkdownList([]);
    setSearchResponse(undefined);
    setMessages([]);
  }, []);

  useKeyPress("Escape", {
    callback: onResetClick
  })

  const focusInputBox = useCallback(() => {
    inputRef?.current?.focus();
  }, []);
  useKeyPress("Slash", {
    callback: focusInputBox,
    event: "keyup"
  })
  
  return (
    <div
      className={`input-cont d-flx a-itm-c j-con-c ${isMobile ? "flx-d-col" : ""}`}
      style={{
        bottom: searchResponse ? "0px" : isMobile ? "200px" : "400px",
        maxWidth: searchResponse ? "100%" : "768px",
        background: searchResponse ? "white" : "unset",
        paddingBlock: searchResponse ? "16px" : "unset",
        paddingInline: searchResponse ? "32px" : "unset",
        boxShadow: searchResponse ? "0px -5px lightgray" : "unset"
      }}
    >
      <input
        className="input-text fs-24"
        type="text"
        ref={inputRef}
        defaultValue={transcript ?? ""}
        autoFocus
      ></input>
      <div className={`d-flx a-itm-c ${isMobile ? "mt-16 w-100-p j-con-flx-e" : ""}`}>
        <AppButton
          className={`ml-16 ${markdownList?.length !== 0 ? "" : "d-none"}`}
          label="Reset"
          size={isMobile ? "medium" : "large"}
          onClick={onResetClick}
          style={{ order: 1 }}
          shadowColor="red-shadow"
        ></AppButton>
        <AppButton
          className="ml-16"
          label="Search"
          size={isMobile ? "medium" : "large"}
          onClick={onVoiceSearchClick}
          isLoading={listening}
          shadowColor="pink-shadow"
          render={<img className="icon speech-icon" src={VoiceSearchIcon} />}
          style={{
            order: isMobile ? 3 : 2
          }}
        ></AppButton>
        <AppButton
          className="ml-16"
          label="Search"
          size={isMobile ? "medium" : "large"}
          onClick={onMouseClickSearch}
          isLoading={isLoading}
          style={{
            order: isMobile ? 2 : 3
          }}
        ></AppButton>
      </div>
    </div>
  );
};

export default InputBox;
