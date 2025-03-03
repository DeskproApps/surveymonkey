import { ErrorBlock } from "@/components/ErrorBlock";
import { FC, useState } from "react";
import { getCurrentUser } from "@/api/SurveyMonkey";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, ContextData } from "@/types/deskpro";
import { Stack } from "@deskpro/deskpro-ui";
import { useNavigate } from "react-router-dom";

const LoadingPage: FC = () => {
    const { client } = useDeskproAppClient()
    const { context } = useDeskproLatestAppContext<ContextData, Settings>()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isFetchingAuth, setIsFetchingAuth] = useState<boolean>(true)

    const navigate = useNavigate();

    // Determine authentication method from settings
    const isUsingOAuth = context?.settings.use_access_token !== true
    const user = context?.data?.ticket?.primaryUser || context?.data?.user

    useDeskproElements(({ registerElement, clearElements }) => {
        clearElements()
        registerElement("refreshButton", { type: "refresh_button" })
    });

    useInitialisedDeskproAppClient((client) => {
        client.setTitle("SurveyMonkey")

        if (!context || !context?.settings || !user) {
            return
        }

        // Store the authentication method in the user state
        client.setUserState("isUsingOAuth", isUsingOAuth)

        // Verify authentication status
        // If OAuth2 mode and the user is logged in the request would be make with their stored access token
        // If access token mode the request would be made with the access token provided in the app setup
        getCurrentUser(client)
            .then((user) => {
                if (user) {
                    setIsAuthenticated(true)
                }
            })
            .catch(() => { })
            .finally(() => {
                setIsFetchingAuth(false)
            })
    }, [context, context?.settings])

    if (!client || !user || isFetchingAuth) {
        return (<LoadingSpinner />)
    }
    if (isAuthenticated) {

        navigate("/home")
    } else {

        if (isUsingOAuth) {
            navigate("/login")
        } else {
            // Show error for invalid access tokens (expired or not present)
            return (
                <Stack padding={12}>
                    <ErrorBlock text={"Invalid Access Token"} />
                </Stack>
            )
        }

    }



    return (
        <LoadingSpinner />
    );
};

export default LoadingPage;
