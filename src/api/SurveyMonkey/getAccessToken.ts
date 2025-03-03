import { IDeskproClient, proxyFetch } from "@deskpro/app-sdk";

export default async function getAccessToken(
    client: IDeskproClient,
    code: string,
    callbackURL: string
) {
    try {
        const fetch = await proxyFetch(client);

        const response = await fetch(`https://api.surveymonkey.com/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: "__client_id__",
                client_secret: "__client_secret__",
                code: code,
                redirect_uri: callbackURL,
            }).toString()
        });

        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching access token");
    }
}