import { useState, useCallback } from "react";
import styled from "styled-components";
import { TSpan, Stack, Button } from "@deskpro/deskpro-ui";
import { useDeskproAppEvents, useDeskproAppClient } from "@deskpro/app-sdk";
import { getCurrentUser } from "../api/api";
import { nbsp, AUTH_ERROR } from "../constants";
import type { FC } from "react";
import type { Settings } from "../types/settings";
import type { User } from "../types/user";

const Invalid = styled(TSpan)`
  color: ${({ theme }) => theme.colors.red100};
`;

const Secondary = styled(TSpan)`
  color: ${({ theme }) => theme.colors.grey80};
`;

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();
  const [user, setUser] = useState<null|User>(null);
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null|string>(null);

  const onVerifySettings = useCallback(() => {
    if (!client || !settings?.api_key) {
      return;
    }

    setIsLoading(true);
    setError("");
    setUser(null);

    return getCurrentUser(client, settings.api_key)
      .then(setUser)
      .catch((err) => {
        try {
          setError(JSON.parse(err?.message || "{}")?.error?.message);
        } catch (e) {
          setError(AUTH_ERROR);
        }
      })
      .finally(() => setIsLoading(false));
  }, [client, settings]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <Stack align="baseline" style={{ margin: "0 -8px" }}>
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={!settings?.api_key || isLoading}
      />
      {nbsp}
      {!user
        ? <Invalid type="p1">{error}</Invalid> || ""
        : (
          <Secondary type="p1">
            Verified as &lt;{user.email}&gt;
          </Secondary>
        )
      }
    </Stack>
  );
};

export { VerifySettings };
