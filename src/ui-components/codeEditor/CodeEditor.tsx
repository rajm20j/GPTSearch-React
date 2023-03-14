import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IAnswerContent } from '../../common/interfaces/Answer';

import './CodeEditor.scss';

type CodeEditorProps = {
  value?: IAnswerContent;
} & React.HTMLAttributes<HTMLDivElement>

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('py', python);

const CodeEditor: React.FC<CodeEditorProps> = ({ value, className }) => {

  return (<div className={`${className}`}>
    <SyntaxHighlighter language={value.language} style={darcula}>{value.code}</SyntaxHighlighter>
  </div>)
}

export default CodeEditor;