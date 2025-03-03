import { getCurrentUser } from "@/api/SurveyMonkey";
import { nbsp, AUTH_ERROR } from "@/constants";
import { TSpan, Stack, Button } from "@deskpro/deskpro-ui";
import { useDeskproAppEvents, useDeskproAppClient } from "@deskpro/app-sdk";
import { useState, useCallback } from "react";
import styled from "styled-components";
import type { FC } from "react";
import type { User } from "@/types/user";

const Invalid = styled(TSpan)`
  color: ${({ theme }) => theme.colors.red100};
`;

const Secondary = styled(TSpan)`
  color: ${({ theme }) => theme.colors.grey80};
`;

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();
  const [user, setUser] = useState<null | User>(null);
  const [settings, setSettings] = useState<{ access_token?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const onVerifySettings = useCallback(() => {
    if (!client || !settings?.access_token) {
      return;
    }

    setIsLoading(true);
    setError("");
    setUser(null);

    return getCurrentUser(client, settings.access_token)
      .then((user)=>{
        if(user){
          setUser(user)
        }else{
          setError(AUTH_ERROR)
        }
      })
      .catch((e) => {
        setError(AUTH_ERROR);

      })
      .finally(() => setIsLoading(false));
  }, [client, settings]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={!settings?.access_token || isLoading}
      />
      {nbsp}
      {!user
        ? <Invalid type="p1">{error}</Invalid>
        : (
          <Secondary type="p1">
            Verified as &lt;{user.email}&gt;
          </Secondary>
        )
      }
    </Stack>
  );
};

export default VerifySettings
