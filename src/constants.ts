export enum NLP_BLOCK_TYPE {
  "readonly_text" = "readonly_text",
  "raw" = "raw",
  "parameter" = "parameter",
  "runtime" = "runtime",
  "global" = "global",
  "random" = "random",
  "function" = "function",
  "phone_number" = "phone_number",
  "mail_box" = "mail_box",
  "upload_path" = "upload_path",
  "ui_identifier" = "ui_identifier",
  "attribute" = "attribute",
  "selectable" = "selectable",
  "editable_text" = "editable_text",
  "set_name" = "set_name",
  "salesforce_connection" = "salesforce_connection",
  "salesforce_object" = "salesforce_object",
  "salesforce_application" = "salesforce_application",
  "salesforce_tab" = "salesforce_tab",
  "salesforce_object_form" = "salesforce_object_form",
  "action" = "action",
}

export interface NLP_BLOCK {
  type: NLP_BLOCK_TYPE;
  value: string;
  isEncrypted: boolean;
  uuid?: string;
  more_details?: MORE_DETAILS_TYPE;
  has_value?: boolean;
  canEncrypt: boolean;
}

export enum KibbutzParameterType {
  ELEMENT = "ELEMENT",
  TEST_DATA = "TEST_DATA",
  TEST_DATA_PROFILE = "TEST_DATA_PROFILE",
  TEST_DATA_SET = "TEST_DATA_SET",
  ENVIRONMENT_DATA = "ENVIRONMENT_DATA",
}

export type MORE_DETAILS_TYPE = {
  allowedTypes?: NLP_BLOCK_TYPE[];
  allowedValues?: string[];
  templateId?: number;
  placeholder_type?: "mobile" | "web" | "mobile-web";
  elementOverride?: {};
  testdataOverride?: {};
  forloopOverride?: {};
  parameterType?: KibbutzParameterType;
  setNameType?: "start-set-name" | "end-set-name" | "filterParameter";
  testDataProfile?: { [key: string]: any } | null;
  mapper?: [{}];
  profileId?: number;
  appUploadId?: number;
  appPath?: string;
  sessionValue?: string;
  testDataFunction?: {};
  isObjectBased?: boolean;
  actionName?: string;
  isReadOnly?: boolean;
  onChangeClearNextBlocks?: boolean;
};

export type getTestDataSelectedValue = {
  text: string;
  more_details?: MORE_DETAILS_TYPE;
};

export type getTestDataType = (
  getTestDataProps: any
) => Promise<{ selected: getTestDataSelectedValue }>;

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

//Split nlp templates
const splitTextByTemplate = (value) => {
  if (typeof value != "string") return value;
  if (!value?.length) return [];
  return value.match(/(\$|\@|\#){[^{}]+}|[^$@#{}]+/g).filter((i) => i.length);
};
