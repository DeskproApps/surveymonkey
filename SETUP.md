# SurveyMonkey Setup Instructions

Follow these steps to install and configure the SurveyMonkey app using either an Access Token or OAuth credentials.

## Using Access Token

First, go to the SurveyMonkey developer website ([developer.surveymonkey.com](https://developer.surveymonkey.com), or [developer.eu.surveymonkey.com](https://developer.eu.surveymonkey.com/) if you are based in EU) and log in to your account.

[![](/docs/assets/setup/surveymonkey_setup_01.png)](/docs/assets/setup/surveymonkey_setup_01.png)

Once you're logged in, click on the __"My Apps"__ tab at the top. After that click on __"Add a New App"__, and fill in the required fields, making sure to select Private App as the App Type.

[![](/docs/assets/setup/surveymonkey_setup_02.png)](/docs/assets/setup/surveymonkey_setup_02.png)

Head over to the __Settings__ tab in the SurveyMonkey website, and copy the Access token

On the __"Settings"__ tab in the Deskpro App, enter the Access token.

While on the settings tab in the SurveyMonkey developer website, scroll down to scopes and set __View Response Details__, __View Contacts__, __View Surveys__, __View Collectors__, __View Users__, and __View Responses__ to "Required", and click on Update Scopes.

[![](/docs/assets/setup/surveymonkey_setup_03.png)](/docs/assets/setup/surveymonkey_setup_03.png)

Once you're happy with your settings, click the "Install" button to install the app.

## Using OAuth

First, go to the SurveyMonkey developer website ([developer.surveymonkey.com](https://developer.surveymonkey.com), or [developer.eu.surveymonkey.com](https://developer.eu.surveymonkey.com/) if you are based in EU) and log in to your account.

[![](/docs/assets/setup/surveymonkey_setup_01.png)](/docs/assets/setup/surveymonkey_setup_01.png)

Once you're logged in, click on the __"My Apps"__ tab at the top. After that click on __"Add a New App"__, and fill in the required fields, making sure to select Private App as the App Type.

[![](/docs/assets/setup/surveymonkey_setup_02.png)](/docs/assets/setup/surveymonkey_setup_02.png)


On the "Details" page copy the `Client ID` and `Secret` and input the credentials in the settings tab in Deskpro.

[![](/docs/assets/setup/surveymonkey_setup_04.png)](/docs/assets/setup/surveymonkey_setup_04.png)

Head over to the __Settings__ tab in the SurveyMonkey website, and enter the `Callback URL` from Deskpro in the "OAuth Redirect URL" field.

While on the settings tab in the SurveyMonkey developer website, scroll down to scopes and set __View Response Details__, __View Contacts__, __View Surveys__, __View Collectors__, __View Users__, and __View Responses__ to "Required", and click on Update Scopes.

[![](/docs/assets/setup/surveymonkey_setup_03.png)](/docs/assets/setup/surveymonkey_setup_03.png)

Once you're happy with your settings, click the "Install" button to install the app.
