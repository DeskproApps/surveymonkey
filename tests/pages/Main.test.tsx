import { lightTheme, ThemeProvider } from "@deskpro/deskpro-ui";
import { cleanup, render, waitFor } from "@testing-library/react/";
import React from "react";
import { Main } from "../../src/pages/Main";

const renderPage = () => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <Main />
    </ThemeProvider>
  );
};

jest.mock("../../src/api/api", () => {
  return {
    ...jest.requireActual("../../src/api/api"),
    getSurveysWithCollectors: () => [
      {
        id: 1,
        date_created: new Date(),
        response_count: 1,
        status: "Open",
        title: "Survey title",
        collectors: [{ name: "Collector name", type: "weblink" }],
      },
    ],
  };
});

describe("Main", () => {
  test("Main page should show all data correctly", async () => {
    const { getByText } = renderPage();

    const surveyTitle = await waitFor(() => getByText(/Survey title/i));

    const collectorName = await waitFor(() => getByText(/Collector name/i));

    await waitFor(() => {
      [surveyTitle, collectorName].forEach((el) => {
        expect(el).toBeInTheDocument();
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();

    cleanup();
  });
});
