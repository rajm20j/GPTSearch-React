import './LandingPage.scss';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postSearchRequest } from '../../common/apis';
import { IMessage, ISearchResponse } from './interfaces/interfaces';
import AppButton from '../../ui-components/appButton/AppButton';
import useCheckDevice from '../../hook/useDevice';
import MarkdownContainer from '../../components/MarkdownContainer/MarkdownContainer';
import VoiceSearchIcon from '../../assets/icons/voice-search.svg';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const LandingPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const markdownListRef = useRef<HTMLInputElement>(null);
  const [searchResponse, setSearchResponse] = useState<ISearchResponse>(null);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const isMobile = useCheckDevice();
  const [markdownList, setMarkdownList] = useState<any>([]);
  useMemo(updateMarkdownList, [searchResponse]);
  useMemo(scrollToAnswer, [markdownList]);
  const { isLoading, mutate } = useMutation({
    mutationFn: postSearchRequest,
    mutationKey: ["chat"],
    onSuccess: ({ data }) => onSearchSuccess(data)
  });
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const onEnterKeySearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const onMouseClickSearch = () => {
    onSearch();
  };

  useEffect(() => {
    console.log("useEffect called");
    console.log([...messageList]);
  })

  const onSearch = () => {
    console.log("Called");
    if (inputRef.current.value) {
      const message: IMessage = {
        role: 'user',
        content: (inputRef.current.value as string).trim()
      }
      mutate({
        body: {
          model: 'gpt-3.5-turbo',
          messages: [
            ...messageList,
            message
          ]
        }
      });
      setMessageList([
        ...messageList,
        message
      ]);
    }
  };

  const onSearchSuccess = (data: ISearchResponse) => {
    console.log("onSearchSuccess called for data: ", data);
    setMessageList([
      ...messageList,
      { ...data.choices[0].message }
    ]);
    data.choices[0].message.content = `**${inputRef.current.value}**\n\n${data.choices[0].message.content}`;
    setSearchResponse(data);
    if (inputRef.current.value) {
      inputRef.current.value = '';
    }
  };

  function updateMarkdownList() {
    if (searchResponse) {
      setMarkdownList([
        ...markdownList,
        <MarkdownContainer
          key={markdownList.length}
          className={`mb-16`}
          size={`${isMobile ? 'small' : 'medium'}`}
          value={searchResponse.choices[0].message.content}
        ></MarkdownContainer>
      ]);
    }
  }

  function scrollToAnswer() {
    if (markdownListRef) {
      setTimeout(() => {
        markdownListRef.current?.lastElementChild?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }

  const onVoiceSearchClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browser does not support speech recognition');
    }
    resetTranscript();
    listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening();
  };

  const onResetClick = () => {
    setMarkdownList([]);
    setSearchResponse(null);
    setMessageList([]);
  };

  return (
    <>
      <div className="landing-cont h-100-p w-100-p flx-d-col d-flx a-itm-c j-con-c">
        <div className={`heading-cont ${searchResponse ? 'heading-cont-is-collapsed' : ''}`}>
          GPT<span className="search-txt-cont">Search</span>
        </div>
        <div
          className={`input-cont d-flx a-itm-c j-con-c ${isMobile ? 'flx-d-col' : ''}`}
          style={{
            bottom: searchResponse ? '0px' : '200px',
            maxWidth: searchResponse ? '100%' : '768px',
            background: searchResponse ? 'white' : 'unset',
            paddingBlock: searchResponse ? '16px' : 'unset',
            paddingInline: searchResponse ? '32px' : 'unset',
            boxShadow: searchResponse ? '0px -5px lightgray' : 'unset'
          }}
        >
          <input
            className="input-text fs-24"
            type="text"
            onKeyDown={onEnterKeySearch}
            ref={inputRef}
            defaultValue={transcript ?? ''}
            autoFocus
          ></input>
          <div className={`d-flx a-itm-c ${isMobile ? 'mt-16 w-100-p j-con-flx-e' : ''}`}>
            <AppButton
              className={`ml-16 ${markdownList.length !== 0 ? '' : 'd-none'}`}
              label="Reset"
              size={isMobile ? 'medium' : 'large'}
              onClick={onResetClick}
              style={{
                order: 1
              }}
              shadowColor="red-shadow"
            ></AppButton>
            <AppButton
              className="ml-16"
              label="Search"
              size={isMobile ? 'medium' : 'large'}
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
              size={isMobile ? 'medium' : 'large'}
              onClick={onMouseClickSearch}
              isLoading={isLoading}
              style={{
                order: isMobile ? 2 : 3
              }}
            ></AppButton>
          </div>
        </div>
        <div className="markdown-cont w-100-p" ref={markdownListRef}>
          {markdownList}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
