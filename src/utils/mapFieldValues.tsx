import { ReactElement } from "react";
import { StyledLink } from "../styles";
import { IJson } from "../types/json";
import { capitalizeFirstLetter, getValueByKey } from "./utils";
import { FieldMapping } from "../components/FieldMapping/FieldMapping";
import collectorJson from "../mapping/collector.json";

export const mapFieldValues = (
  metadataFields: IJson["view"][0],
  field: { [key: string]: unknown }
): {
  key: string | number;
  value: string | number | ReactElement;
}[] => {
  return metadataFields.map((metadataField) => {
    let value;
    switch (metadataField.type) {
      case "date": {
        if (!field[metadataField.name as keyof typeof field]) {
          value = null;

          break;
        }

        value = new Date(
          field[metadataField.name as keyof typeof field] as Date
        ).toLocaleDateString("en-UK");

        break;
      }

      case "capitalizeText": {
        value = capitalizeFirstLetter(
          field[metadataField.name as keyof typeof field] as string
        );

        break;
      }

      case "responses": {
        value = `${field[metadataField.name as keyof typeof field]} responses`;

        break;
      }

      case "collector": {
        value = (
          <FieldMapping
            fields={
              (field[
                metadataField.name as keyof typeof field
              ] as unknown as []) || []
            }
            type={"collector"}
            metadata={collectorJson.main}
          />
        );

        break;
      }

      case "number": {
        value = (
          field[metadataField.name as keyof typeof field] as number
        ).toString();

        break;
      }

      case "text": {
        value = field[metadataField.name as keyof typeof field];

        break;
      }

      case "url": {
        value = field[metadataField.name as keyof typeof field] ? (
          <StyledLink
            to={field[metadataField.name as keyof typeof field] as string}
          >
            {field[metadataField.name as keyof typeof field] as string}
          </StyledLink>
        ) : (
          ""
        );

        break;
      }

      case "percentage": {
        if (!field[metadataField.name as keyof typeof field]) {
          value = null;

          break;
        }

        value = `${field[metadataField.name as keyof typeof field]}%`;

        break;
      }

      case "contact": {
        value = field;

        break;
      }

      case "textInObj": {
        value = getValueByKey(field, metadataField.name as string);

        break;
      }

      default:
        value = field[metadataField.name as keyof typeof field];
    }

    return {
      key: metadataField.label,
      value: value as string | number | ReactElement,
    };
  });
};
