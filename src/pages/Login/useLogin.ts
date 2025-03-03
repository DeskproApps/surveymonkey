import { ContextData, Settings } from "@/types/deskpro";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getAccessToken, getCurrentUser } from "@/api/SurveyMonkey";
import { OAUTH2_ACCESS_TOKEN_PATH, OAUTH2_REFRESH_TOKEN_PATH } from "@/constants/deskpro";
import { OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useCallback, useState } from "react";

interface UseLogin {
    onSignIn: () => void,
    authUrl: string | null,
    error: null | string,
    isLoading: boolean,
};

export default function useLogin(): UseLogin {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { context } = useDeskproLatestAppContext<ContextData, Settings>()

    const user = context?.data?.ticket?.primaryUser || context?.data?.user


    useInitialisedDeskproAppClient(async (client) => {
        if (context?.settings.use_deskpro_saas === undefined || !user) {
            // Make sure settings have loaded.
            return
        }

        // Ensure they aren't using access tokens
        if (context.settings.use_access_token === true) {
            setError("Enable OAuth to access this page");
            return

        }
        const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

        const clientId = context?.settings.client_id;
        if (mode === 'local' && typeof clientId !== 'string') {
            // Local mode requires a clientId.
            setError("A client ID is required");
            return
        }
        const oauth2 = mode === "local" ?
            await client.startOauth2Local(
                ({ state, callbackUrl }) => {
                    return `https://api.surveymonkey.com/oauth/authorize?${createSearchParams([
                        ["client_id", clientId ?? ""],
                        ["state", state],
                        ["redirect_uri", callbackUrl],
                        ["response_type", "code"] 
                    ])}`;
                },
                /\bcode=(?<code>[^&#]+)/,
                async (code: string): Promise<OAuth2Result> => {
                    // Extract the callback URL from the authorization URL
                    const url = new URL(oauth2.authorizationUrl);
                    const redirectUri = url.searchParams.get("redirect_uri");

                    if (!redirectUri) {
                        throw new Error("Failed to get callback URL");
                    }

                    const data = await getAccessToken(client, code, redirectUri);

                    return { data }
                }
            )
            // Global Proxy Service
            : await client.startOauth2Global("TW2mwcHyQwCmkrzNjgdMAQ");

        setAuthUrl(oauth2.authorizationUrl)
        setIsLoading(false)

        try {
            const result = await oauth2.poll()

            await client.setUserState(OAUTH2_ACCESS_TOKEN_PATH, result.data.access_token, { backend: true })

            if (result.data.refresh_token) {
                await client.setUserState(OAUTH2_REFRESH_TOKEN_PATH, result.data.refresh_token, { backend: true })
            }

            const activeUser = await getCurrentUser(client)

            if (!activeUser) {
                throw new Error("Error authenticating user")
            }

            navigate("/home")
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error');
            setIsLoading(false);
        }
    }, [setAuthUrl, context?.settings.use_deskpro_saas])

    const onSignIn = useCallback(() => {
        setIsLoading(true);
        window.open(authUrl ?? "", '_blank');
    }, [setIsLoading, authUrl]);


    return { authUrl, onSignIn, error, isLoading }

}