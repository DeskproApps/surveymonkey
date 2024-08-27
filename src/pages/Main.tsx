import {
  LoadingSpinner,
  useInitialisedDeskproAppClient,
  useQueryWithClient,
} from "@deskpro/app-sdk";
import { getSurveysWithCollectors } from "../api/api";
import { FieldMapping } from "../components/FieldMapping/FieldMapping";
import { Container } from "../components/Layout";
import surveyJson from "../mapping/survey.json";

export const Main = () => {
  useInitialisedDeskproAppClient((client) => {
    client.setTitle("SurveyMonkey");

    client.registerElement("refreshButton", { type: "refresh_button" });

    client.registerElement("nutshellHomeButton", {
      type: "home_button",
    });
  });

  const surveysWithCollectorsQuery = useQueryWithClient(["abc"], (client) =>
    getSurveysWithCollectors(client)
  );

  if (surveysWithCollectorsQuery.isLoading) return <LoadingSpinner />;

  const surveyWithCollectors = surveysWithCollectorsQuery.data as Awaited<
    ReturnType<typeof getSurveysWithCollectors>
  >;

  return (
    <Container>
      {surveysWithCollectorsQuery && (
        <FieldMapping
          externalChildUrl={surveyJson.externalUrl}
          idKey={surveyJson.idKey}
          childTitleAccessor={(survey) => survey.title}
          fields={surveyWithCollectors}
          metadata={surveyJson.main}
        ></FieldMapping>
      )}
    </Container>
  );
};
