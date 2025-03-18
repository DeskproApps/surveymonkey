import { AnchorButton, H3, Stack } from "@deskpro/deskpro-ui"
import { ErrorBlock } from "@/components/ErrorBlock"
import { FC } from "react"
import { useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk"
import useLogin from "./useLogin"

const LoginPage: FC = () => {
    useDeskproElements(({ registerElement, clearElements }) => {
        clearElements()
        registerElement("refreshButton", { type: "refresh_button" })
    })

    useInitialisedDeskproAppClient((client)=>{
        client.setTitle("Login")
    }, [])

    const { onSignIn, authUrl, isLoading, error } = useLogin();

    return (
        <Stack padding={12} vertical gap={12} role="alert">
            <H3>Log into your SurveyMonkey account.</H3>
            <AnchorButton
                disabled={!authUrl || isLoading}
                href={authUrl || "#"}
                loading={isLoading}
                onClick={onSignIn}
                target={"_blank"}
                text={"Log In"}
            />

            {error && <ErrorBlock text={error}/>}
        </Stack>
    )
}

export default LoginPage