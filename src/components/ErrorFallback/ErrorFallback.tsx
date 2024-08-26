import { ErrorBlock } from "../ErrorBlock";
import { Container } from "../Layout";

export const ErrorFallback = ({ error }: { error: Error }) => {
  const message = JSON.parse(error?.message || "{}")?.error?.message;

  // eslint-disable-next-line no-console
  console.error(error.message);

  return (
    <Container>
      <ErrorBlock text={message}/>
    </Container>
  );
};
