import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
import ReactMarkdown from "react-markdown";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <div>
      <MdEditor
        value={markdown}
        style={{ height: "500px" }}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        onChange={({ text }) => setMarkdown(text)}
      />
    </div>
  );
};

export default MarkdownEditor;
