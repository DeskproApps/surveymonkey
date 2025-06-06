import { FallbackRender } from "@sentry/react";
import { ErrorBlock } from "../ErrorBlock";
import { Container } from "../Layout";

export const ErrorFallback: FallbackRender = ({ error }) => {
  const message = JSON.parse((error as Error | undefined)?.message || "{}")?.error?.message;

  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <Container>
      <ErrorBlock text={message}/>
    </Container>
  );
};
