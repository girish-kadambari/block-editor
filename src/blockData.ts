export const blocks = [
  {
    type: "readonly_text",
    value: "Store the column number in the table ",
    isEncrypted: undefined,
    uuid: "0",
  },
  {
    type: "ui_identifier",
    value: "Account_Id",
    isEncrypted: undefined,
    uuid: "uiIdentifier",
    has_value: true,
    more_details: {
      templateId: 60455,
      allowedTypes: undefined,
      allowedValues: undefined,
      mapper: undefined,
      profile: false,
      parameter: false,
      appName: false,
      appVersion: false,
      sessionValue: false,
      testDataInfo: null,
      data: [
        {
          canEncrypt: "true",
          displayName: "testData1",
        },
        {
          canEncrypt: "false",
          displayName: "testData2",
        },
      ],
    },
  },
  {
    type: "readonly_text",
    value: " which contains the text ",
    isEncrypted: undefined,
    uuid: "2",
  },
  {
    type: "parameter",
    value: "Parameter 1",
    isEncrypted: false,
    uuid: "testData1",
    has_value: true,
    more_details: {
      templateId: 60455,
      allowedTypes: [
        "raw",
        "parameter",
        "runtime",
        "global",
        "random",
        "function",
        "phone_number",
        "mail_box",
      ],
      allowedValues: undefined,
      mapper: undefined,
      profile: false,
      parameter: false,
      appName: false,
      appVersion: false,
      sessionValue: false,
      testDataInfo: null,
      data: [
        {
          canEncrypt: "true",
          displayName: "testData1",
        },
        {
          canEncrypt: "false",
          displayName: "testData2",
        },
      ],
    },
  },
  {
    type: "readonly_text",
    value: " in ANY row into the variable ",
    isEncrypted: undefined,
    uuid: "4",
  },
  {
    type: "parameter",
    value: "Parameter 1",
    isEncrypted: false,
    uuid: "testData2",
    has_value: true,
    more_details: {
      templateId: 60455,
      allowedTypes: [
        "raw",
        "parameter",
        "runtime",
        "global",
        "random",
        "function",
        "phone_number",
        "mail_box",
      ],
      allowedValues: undefined,
      mapper: undefined,
      profile: false,
      parameter: false,
      appName: false,
      appVersion: false,
      sessionValue: false,
      testDataInfo: null,
      data: [
        {
          canEncrypt: "true",
          displayName: "testData1",
        },
        {
          canEncrypt: "false",
          displayName: "testData2",
        },
      ],
    },
  },
];

export function generateBlocks(a) {
  let steps = [];
  for (let i = 0; i < a; i++) {
    steps.push(blocks);
  }

  return steps;
}
