import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  if (!content?.trim()) return null;

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-xl font-semibold text-gray-800 mb-3"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-lg font-bold text-slate-800 mb-2 mt-4"
              {...props}
            />
          ),
          h4: ({ node, ...props }) => (
            <h4
              className="text-md font-semibold text-slate-700 mb-2"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-gray-900" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside space-y-1 mb-4 ml-4"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="w-full border-collapse border text-sm"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-gray-300 px-3 py-2 bg-teal-50 text-left font-semibold text-xs text-gray-700"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="border border-gray-300 px-3 py-2 text-xs"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              className="text-gray-700 leading-relaxed text-sm mb-2"
              {...props}
            />
          ),
        }}
      />
    </div>
  );
};

export default MarkdownRenderer;
