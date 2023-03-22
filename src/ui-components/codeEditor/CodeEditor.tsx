import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeEditor.scss";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("py", python);

const CodeEditor: React.FC<any> = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, "")}
      style={tomorrow}
      language={match[1]}
      PreTag="div"
      showLineNumbers={true}
      wrapLines={true}
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeEditor;
