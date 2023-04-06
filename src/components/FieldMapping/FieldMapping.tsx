import {
  Button,
  H1,
  H3,
  HorizontalDivider,
  P5,
  P8,
  Property,
  Stack,
  useDeskproAppClient,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { ReactElement } from "react";
import { StyledLink } from "../../styles";
import { IJson } from "../../types/json";
import { mapFieldValues } from "../../utils/mapFieldValues";
import { LogoAndLinkButton } from "../LogoAndLinkButton/LogoAndLinkButton";
import { PropertyRow } from "../PropertyRow/PropertyRow";

const SpaceBetweenFields = ({
  field: field,
}: {
  field: {
    key: string | number;
    value: string | number | ReactElement;
  };
}) => {
  return (
    <Stack
      style={{
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <H1>{field.key}:</H1>
      <H1>{field.value}</H1>
    </Stack>
  );
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: any[];
  internalUrl?: string;
  externalUrl?: string;
  metadata: IJson["view"];
  idKey?: string;
  internalChildUrl?: string;
  externalChildUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childTitleAccessor?: (field: any) => string;
  title?: string;
  type?: "survey" | "collector";
};

export const FieldMapping = ({
  fields,
  externalUrl,
  internalUrl,
  metadata,
  idKey = "",
  internalChildUrl,
  externalChildUrl,
  childTitleAccessor,
  title,
  type,
}: Props) => {
  const { theme } = useDeskproAppTheme();
  const { client } = useDeskproAppClient();

  return (
    <Stack vertical gap={5} style={{ width: "100%" }}>
      {type === "collector" && (
        <HorizontalDivider
          style={{
            margin: "8px 0px 8px 0px",
            width: "115%",
            backgroundColor: theme?.colors.grey10,
          }}
        />
      )}
      {title ||
        internalUrl ||
        (externalUrl && (
          <Stack
            style={{
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            {title && internalUrl ? (
              <StyledLink title="title" to={internalUrl + fields[0][idKey]}>
                {title}
              </StyledLink>
            ) : (
              title && <H1>{title}</H1>
            )}
            {externalUrl && (
              <LogoAndLinkButton endpoint={externalUrl}></LogoAndLinkButton>
            )}
          </Stack>
        ))}
      {fields.map((field, i) => (
        <Stack vertical style={{ width: "100%" }} gap={8} key={i}>
          {(internalChildUrl || childTitleAccessor || externalChildUrl) && (
            <Stack style={{ justifyContent: "space-between", width: "100%" }}>
              {internalChildUrl && childTitleAccessor && (
                <StyledLink to={internalChildUrl + field[idKey]}>
                  {childTitleAccessor(field)}
                </StyledLink>
              )}
              {!internalChildUrl && childTitleAccessor && (
                <H3>{childTitleAccessor(field)}</H3>
              )}
              {externalChildUrl && (
                <LogoAndLinkButton endpoint={field[idKey]}></LogoAndLinkButton>
              )}
            </Stack>
          )}
          {metadata?.map((metadataFields, i) => {
            const usableFields = mapFieldValues(metadataFields, field);

            switch (usableFields.length) {
              case 1:
                return (
                  usableFields[0].value && (
                    <Stack vertical gap={4} key={i} style={{ width: "100%" }}>
                      <P8 style={{ color: theme?.colors.grey80 }}>
                        {usableFields[0].key}
                      </P8>
                      <P5 style={{ whiteSpace: "pre-line", width: "100%" }}>
                        {usableFields[0].value}
                      </P5>
                    </Stack>
                  )
                );
              case 4:
              case 3:
              case 2:
                return (
                  <Stack style={{ width: "100%" }} vertical gap={5}>
                    <PropertyRow key={i}>
                      {usableFields
                        .filter((_, i) => i !== 2)
                        .map((e, ii) => (
                          <Property title={e.key as string} key={ii}>
                            <P5>{e.value != null ? e.value : "-"}</P5>
                          </Property>
                        ))}
                    </PropertyRow>
                    {usableFields[2]?.value === "open" && (
                      <Button
                        text="Insert Link"
                        intent="secondary"
                        onClick={() =>
                          client
                            ?.deskpro()
                            .appendLinkToActiveTicketReplyBox(
                              field.url,
                              "Survey"
                            )
                        }
                      ></Button>
                    )}
                  </Stack>
                );

              default:
                return (
                  <Stack gap={20} vertical style={{ width: "100%" }} key={i}>
                    {usableFields
                      .filter((e) => e.key)
                      .map((usableField, usableFieldI) => (
                        <Stack
                          vertical
                          style={{ width: "100%" }}
                          key={usableFieldI}
                        >
                          <SpaceBetweenFields
                            field={usableField}
                          ></SpaceBetweenFields>
                        </Stack>
                      ))}
                  </Stack>
                );
            }
          })}
          {type === "collector" && (
            <HorizontalDivider
              style={{
                margin: "8px 0px 8px 0px",
                width: "115%",
                marginLeft: i === fields.length - 1 ? "-20px" : "0px",
                backgroundColor: theme?.colors.grey10,
              }}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
};
