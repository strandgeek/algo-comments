import { FC } from "react";
import { useParams } from "react-router-dom";
import { useProjectInfo } from "../hooks/useProjectInfo";
import { AppLayout } from "../layouts/AppLayout";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 as dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface IntegrationPageProps {}

const generateCodeSnippet = (projectId: string) => `<script src="https://algo-comments.strandgeek.com/widget-v1.js"></script>
<script>
  window.AlgoComments = window.AlgoComments || {}
  window.AlgoComments.projectId = '${projectId}'
  window.AlgoComments.slug = 'my-page-slug'
</script>
`;


const CONTAINER_CODE = `<div id="algo-comments-widget"></div>`

const CodeHighlighter: FC<{ children: string; language?: string }> = ({
  children,
  language = "typescript",
}) => (
  <SyntaxHighlighter
    language={language}
    style={dark}
    customStyle={{ background: "#15191F", padding: "24px", fontSize: "14px" }}
  >
    {children}
  </SyntaxHighlighter>
);

export const IntegrationPage: FC<IntegrationPageProps> = (props) => {
  const params = useParams();
  const projectInfo = useProjectInfo(params.projectId as string);
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl mt-24">
      <div className="card card-compact bg-base-100 shadow-md mt-8 p-8">
          <h1 className="text-3xl font-bold mb-8">
            {projectInfo?.name}: Integration Guide
          </h1>
          <h2 className="text-lg font-bold mb-2">1 - Import the script</h2>
          <p className="mb-4">
            Include in the <strong>{"<header>"}</strong> tag on the HTML:
          </p>
          <SyntaxHighlighter
            language="html"
            style={dark}
            customStyle={{
              background: "#15191F",
              padding: "24px",
              fontSize: "14px",
            }}
          >
            {generateCodeSnippet(projectInfo?.id!)}
          </SyntaxHighlighter>
          <h2 className="text-lg font-bold mb-2 mt-8">2 - Add the container</h2>
          <p className="mb-4">
            Include in the container below on the area that the widget should be present:
          </p>
          <SyntaxHighlighter
            language="html"
            style={dark}
            customStyle={{
              background: "#15191F",
              padding: "24px",
              fontSize: "14px",
            }}
          >
            {CONTAINER_CODE}
          </SyntaxHighlighter>
      </div>
      </div>
    </AppLayout>
  );
};
