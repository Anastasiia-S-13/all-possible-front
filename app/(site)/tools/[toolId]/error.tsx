"use client";

interface ErrorProps {
  error: Error;
}

const ToolError = ({ error }: ErrorProps) => {
  return <p>Щось пішло не так. {error.message}</p>;
};

export default ToolError;
