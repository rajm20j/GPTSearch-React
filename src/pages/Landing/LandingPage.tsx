import "./LandingPage.scss";
import React, { useCallback, useRef, useState, useMemo, lazy } from "react";
import { ISearchResponse } from "./interfaces/interfaces";
import useCheckDevice from "../../hooks/useDevice";
import LazyLoadingComponent from "../../common/LazyLoadingComponent/LazyLoadingComponent";
const InputBox = lazy(() => import("../../components/InputBox/InputBox"));
const MarkdownContainer = lazy(() => import("../../components/MarkdownContainer/MarkdownContainer"));

const LandingPage: React.FC = () => {
  const markdownListRef = useRef<HTMLInputElement>(null);
  const [searchResponse, setSearchResponse] = useState<ISearchResponse>(null);
  const { isMobile } = useCheckDevice();
  const [markdownList, setMarkdownList] = useState<JSX.Element[]>([]);

  const updateMarkdownList = useCallback(() => {
    if (searchResponse) {
      setMarkdownList([
        ...markdownList,
        <MarkdownContainer
          key={markdownList.length}
          className={`mb-16`}
          size={`${isMobile ? "small" : "medium"}`}
          value={searchResponse.choices[0].message.content}
        ></MarkdownContainer>
      ]);
    }
  }, [searchResponse, markdownList, isMobile]);

  const scrollToAnswer = useCallback(() => {
    if (markdownListRef.current) {
      setTimeout(() => {
        markdownListRef.current?.lastElementChild?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      }, 100);
    }
  }, [markdownListRef]);

  useMemo(updateMarkdownList, [searchResponse]);
  useMemo(scrollToAnswer, [markdownList]);

  return (
    <>
      <div className="landing-cont h-100-p w-100-p flx-d-col d-flx a-itm-c j-con-c">
        <div className={`heading-cont ${searchResponse ? "heading-cont-is-collapsed" : ""}`}>
          GPT<span className="search-txt-cont">Search</span>
        </div>
        <LazyLoadingComponent>
          <InputBox
            searchResponse={searchResponse}
            setSearchResponse={setSearchResponse}
            markdownList={markdownList}
            setMarkdownList={setMarkdownList}
          />
        </LazyLoadingComponent>
        <div className="markdown-cont w-100-p" ref={markdownListRef}>
          {markdownList}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
