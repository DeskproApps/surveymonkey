import { Stack } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { SurveyMonkeyLogo } from "../SurveyMonkeyLogo/SurveyMonkeyLogo";
import { StyledLink } from "../../styles";

export const LogoAndLinkButton = ({ endpoint }: { endpoint: string }) => {
  const { theme } = useDeskproAppTheme();

  return (
    <StyledLink to={`${endpoint}`} target="_blank">
      <Stack
        style={{
          backgroundColor: "#F3F5F7",
          borderRadius: "10px",
          padding: "2px 5px 2px 5px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        <SurveyMonkeyLogo />
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          style={{
            marginLeft: "10px",
            alignSelf: "center",
            width: "10px",
            color: theme?.colors?.brandShade100,
          }}
        ></FontAwesomeIcon>
      </Stack>
    </StyledLink>
  );
};
