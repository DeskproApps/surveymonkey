import { AppElementPayload, LoadingSpinner, useDeskproAppEvents, useDeskproLatestAppContext, useInitialisedDeskproAppClient, useQueryWithClient, } from "@deskpro/app-sdk";
import { Container } from "@/components/Layout";
import { ContextData, Settings } from "@/types/deskpro";
import { FieldMapping } from "@/components/FieldMapping/FieldMapping";
import { getSurveysWithCollectors } from "@/api/api";
import { useLogout } from "@/hooks/deskpro";
import surveyJson from "@/mapping/survey.json";

const Main = () => {
  const { logoutActiveUser } = useLogout()
  const { context } = useDeskproLatestAppContext<ContextData, Settings>()
  const isUsingOAuth = context?.settings?.use_access_token !== true


  useInitialisedDeskproAppClient((client) => {
    client.setTitle("SurveyMonkey");

    client.registerElement("refreshButton", { type: "refresh_button" });

    client.registerElement("homeButton", {
      type: "home_button",
    });
    if (isUsingOAuth) {
      client.registerElement("menuButton", { type: "menu", items: [{ title: "Logout" }] });
    }
  });

  useDeskproAppEvents({
    onElementEvent(id: string, _type: string, _payload?: AppElementPayload) {
      switch (id) {
        case "menuButton":
          if (isUsingOAuth) {
            logoutActiveUser()
          }

          break;
      }
    },
  })

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

export default Main
