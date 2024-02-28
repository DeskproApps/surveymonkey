import { ErrorBlock } from "../ErrorBlock";

export const ErrorFallback = ({ error }: { error: Error }) => {
  const message = JSON.parse(error?.message || "{}")?.error?.message;

  // eslint-disable-next-line no-console
  console.error(error.message);

  return (
    <ErrorBlock text={message}/>
  );
};
