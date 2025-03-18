import { ACCESS_TOKEN_PATH, OAUTH2_ACCESS_TOKEN_PATH } from "@/constants/deskpro";
import { adminGenericProxyFetch, IDeskproClient, proxyFetch as deskproProxyFetch } from "@deskpro/app-sdk";
import { isResponseError } from "../api";
import { User } from "@/types/user";

/**
 * Returns the data of the active SurveyMonkey user
 * 
 * @param client  The Deskpro client
 * @param accessToken Optional access token used for authentication (SHOULD ONLY BE USED IN THE ADMIN DRAWER)
 */
export default async function getCurrentUser(client: IDeskproClient, accessToken?: string): Promise<User | null> {
    try {
        const proxyFetch = await (accessToken ? adminGenericProxyFetch : deskproProxyFetch)(client)
        const isUsingOAuth2 = (await client.getUserState<boolean>("isUsingOAuth"))[0]?.data

        const response = await proxyFetch(`https://api.surveymonkey.net/v3/users/me`, {
            headers: {
                method: "GET",
                "Content-Type": "application/json",
                // Set Authorization header based on the available credentials (Access token or OAuth2 token)
                Authorization: ` Bearer ${accessToken ?? (isUsingOAuth2 ? `[user[${OAUTH2_ACCESS_TOKEN_PATH}]]` : ACCESS_TOKEN_PATH)}`,
            },
        });

        if (isResponseError(response)) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch {
        return null
    }
}
