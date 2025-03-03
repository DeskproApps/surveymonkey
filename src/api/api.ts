import { ACCESS_TOKEN_PATH, OAUTH2_ACCESS_TOKEN_PATH } from "@/constants/deskpro";
import { ICollector, ICollectorWithDetails } from "@/types/collector";
import { ISurvey, ISurveyWithDetails } from "@/types/survey";
import { proxyFetch, IDeskproClient } from "@deskpro/app-sdk";

export type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export const getSurveysWithCollectors = async (client: IDeskproClient) => {
  const surveys = await getSurveys(client);

  const surveysWithDetails = (
    await Promise.all(
      surveys.data.map(async (survey) => {
        const surveyWithDetails = await getSurveyById(client, survey.id);

        return surveyWithDetails;
      })
    )
  ).flat();

  const collectors = await Promise.all(
    surveysWithDetails.map(async (survey) => {
      const collectors = await getCollectorsBySurveyId(client, survey.id);

      return collectors;
    })
  );

  const collectorsWithDetails = await Promise.all(
    collectors.map(async (collectorData) => {
      const collectorsWithDetails = await Promise.all(
        collectorData.data.map(async (collector) => {
          const collectorWithDetails = await getCollectorByIdBy(
            client,
            collector.id
          );

          collectorWithDetails.parentId = collectorData.parentId;

          return collectorWithDetails;
        })
      );

      return collectorsWithDetails;
    })
  );

  return surveysWithDetails.map((survey) => {
    const collectorsBelongingToSurvey = collectorsWithDetails
      .flat()
      .filter((collector) => collector.parentId === survey.id)
      .map((e) => ({ ...e, surveyName: survey.title }));
    return {
      ...survey,
      status: collectorsBelongingToSurvey.some((e) => e.status === "open")
        ? "Open"
        : "Closed",
      collectors: collectorsBelongingToSurvey,
    };
  });
};

export const getCollectorByIdBy = async (
  client: IDeskproClient,
  collectorId: string
): Promise<ICollectorWithDetails> => {
  const collector = await request(client, `/collectors/${collectorId}`, "GET");

  return collector;
};

export const getCollectorsBySurveyId = async (
  client: IDeskproClient,
  surveyId: string
): Promise<{ data: ICollector[]; parentId: string }> => {
  const collectors = await request(
    client,
    `/surveys/${surveyId}/collectors`,
    "GET"
  );

  collectors.parentId = surveyId;

  return collectors;
};

export const getSurveyById = async (
  client: IDeskproClient,
  surveyId: string
): Promise<ISurveyWithDetails[]> =>
  request(client, `/surveys/${surveyId}`, "GET");

export const getSurveys = async (
  client: IDeskproClient
): Promise<{ data: ISurvey[] }> => request(client, "/surveys", "GET");

export const request = async (
  client: IDeskproClient,
  url: string,
  method: RequestMethod,
  data?: { [key: string]: unknown }
) => {
  const fetch = await proxyFetch(client);

  const isUsingOAuth2 = (await client.getUserState<boolean>("isUsingOAuth"))[0]?.data

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${isUsingOAuth2? `[user[${OAUTH2_ACCESS_TOKEN_PATH}]]` : ACCESS_TOKEN_PATH}`,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(
    `https://api.surveymonkey.net/v3${url}`,
    options
  );

  if (isResponseError(response)) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const isResponseError = (response: Response) =>
  response.status < 200 || response.status >= 400;
