import { NLP_BLOCK_TYPE, TestDataType } from "./nlp-contants";

const getType = (key, template, dataMap) => {
  if (template.allowedValues?.[key]) {
    return "selectable";
  } else if (dataMap[key]?.type) {
    return dataMap[key]?.type;
  } else if (key == "salesforceObjectForm" && dataMap["salesforceObjectForm"]) {
    return TestDataType.salesforce_object_form;
  } else {
    return TestDataType.raw;
  }
};

const assignValuesToTextBlock = (
  textBlocks,
  template,
  stepDataMap,
  stepMapperData,
  stepDataGenerators    
) => {
  const dataMap =
    stepDataMap?.testData || template?.data?.testData || template?.testData;

  return textBlocks.map((block, idx) => {
    const match = block.match(/[$@#]\{(.*)\}/);

    if (match) {
      const key = match[1].trim();
      let type, value, hasValue;

      if (block.startsWith("$")) {
        type = getType(key, template, dataMap);
        value =
          dataMap[key]?.value == ""
            ? dataMap[key]?.value
            : dataMap[key]?.value || dataMap[key];
        hasValue = Boolean(
          stepDataMap?.testData?.[key]?.value || stepDataMap?.[key]
        );
      } else if (block.startsWith("#")) {
        type = "ui_identifier";
        value = stepDataMap?.[key] || "element";
        hasValue = Boolean(stepDataMap?.[key]);
      } else if (block.startsWith("@")) {
        type = "attribute";
        value =
          stepDataMap?.[key] == "" ? type : stepDataMap?.[key] || "attribute";
        hasValue = Boolean(stepDataMap?.[key]);
      }

      const testDataKeyValue = dataMap?.[key]?.value || dataMap?.[key]; // TODO: Algolio change @jayavel

      const parameter = testDataKeyValue == "parameter" || key == "parameter";
      const profile =
        testDataKeyValue == "test data profile" || key == "testDataProfile";
      const appName = testDataKeyValue == "app-name" || key == "appName";
      const appVersion =
        testDataKeyValue == "app-version" || key == "appVersion";
      const sessionValue =
        testDataKeyValue == "session-name" || key == "sessionValue";

      const moreDetails = {
        templateId: template?.id,
        allowedTypes: template?.allowedTypes?.[key],
        allowedValues: template?.allowedValues?.[key],
        mapper: stepMapperData,
        profile,
        parameter,
        appName,
        appVersion,
        sessionValue,
        testDataInfo: stepDataGenerators?.[key] || null,
        ...(profile && stepDataMap?.testData?.testDataProfileId
          ? { profileId: stepDataMap?.testData?.testDataProfileId?.value }
          : {}),
        data: template?.dataAttributes?.data,
      };
      const isEncrypted = dataMap[key]?.isEncrypted;

      return generateBlock(
        type,
        value,
        key,
        hasValue,
        moreDetails,
        isEncrypted
      );
    } else {
      return generateBlock(NLP_BLOCK_TYPE.readonly_text, block, idx);
    }
  });
};

type DynamicTypes =
  | "raw"
  | "parameter"
  | "runtime"
  | "global"
  | "random"
  | "function"
  | "phone_number"
  | "mail_box"
  | "null"
  | "ui_identifier"
  | "attribute"
  | "selectable";

const generateBlock = (
  type: string,
  value: string,
  uuid: string,
  hasValue: boolean | undefined = undefined,
  more_details: object | undefined = undefined,
  isEncrypted?: boolean
) => {
  return {
    type: <DynamicTypes>type,
    value: typeof value === "string" ? value?.replace(/\n/g, "\\n") : value,
    isEncrypted: isEncrypted,
    uuid: uuid,
    ...(hasValue == undefined ? {} : { has_value: hasValue }),
    ...(more_details == undefined ? {} : { more_details: more_details }),
  };
};
