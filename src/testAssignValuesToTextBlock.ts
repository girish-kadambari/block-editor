export const NLP_BLOCK_TYPE = {
  raw: 'raw',
  parameter: 'parameter',
  runtime: 'runtime',
  global: 'global',
  random: 'random',
  function: 'function',
  phone_number: 'phone_number',
  mail_box: 'mail_box',
  ui_identifier: 'ui_identifier',
  attribute: 'attribute',
  readonly_text: 'readonly_text',
};

export type BlockType = {
  type: string;
  value: string;
  uuid: string;
  has_value?: boolean;
  more_details?: object;
  isEncrypted?: boolean;
};

export const generateBlock = (
  type: string,
  value: string,
  uuid: string,
  hasValue: boolean | undefined = undefined,
  more_details: object | undefined = undefined,
  isEncrypted?: boolean
): BlockType => {
  return {
    type,
    value: typeof value === 'string' ? value.replace(/\n/g, '\\n') : value,
    isEncrypted,
    uuid,
    ...(hasValue === undefined ? {} : { has_value: hasValue }),
    ...(more_details === undefined ? {} : { more_details }),
  };
};

export const splitTextByTemplate = (value: string): string[] => {
  if (typeof value !== 'string') return [];
  if (!value.length) return [];
  return value.match(/(\$|\@|\#){[^{}]+}|[^$@#{}]+/g)?.filter((i) => i.length) || [];
};
  
  const getType = (key: string, template: any, dataMap: any) => {
    return dataMap[key]?.type || 'readonly_text';
  };
  
  const assignValuesToTextBlock = (
    textBlocks: string[],
    template: any,
    stepDataMap: any,
    stepMapperData: any,
    stepDataGenerators: any
  ): BlockType[] => {
    const dataMap = stepDataMap?.testData || template?.data?.testData || template?.testData;
  
    return textBlocks.map((block, idx) => {
      const match = block.match(/[$@#]\{(.*)\}/);
  
      if (match) {
        const key = match[1].trim();
        let type, value, hasValue;
  
        if (block.startsWith('$')) {
          type = getType(key, template, dataMap);
          value = dataMap[key]?.value === '' ? dataMap[key]?.value : dataMap[key]?.value || dataMap[key];
          hasValue = Boolean(stepDataMap?.testData?.[key]?.value || stepDataMap?.[key]);
        } else if (block.startsWith('#')) {
          type = 'ui_identifier';
          value = stepDataMap?.[key] || 'element';
          hasValue = Boolean(stepDataMap?.[key]);
        } else if (block.startsWith('@')) {
          type = 'attribute';
          value = stepDataMap?.[key] === '' ? type : stepDataMap?.[key] || 'attribute';
          hasValue = Boolean(stepDataMap?.[key]);
        }
  
        const testDataKeyValue = dataMap?.[key]?.value || dataMap?.[key];
  
        const parameter = testDataKeyValue === 'parameter' || key === 'parameter';
        const profile = testDataKeyValue === 'test data profile' || key === 'testDataProfile';
        const appName = testDataKeyValue === 'app-name' || key === 'appName';
        const appVersion = testDataKeyValue === 'app-version' || key === 'appVersion';
        const sessionValue = testDataKeyValue === 'session-name' || key === 'sessionValue';
  
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
  
        return generateBlock(type, value, key, hasValue, moreDetails, isEncrypted);
      } else {
        return generateBlock(NLP_BLOCK_TYPE.readonly_text, block, idx.toString());
      }
    });
  };
  
  // Example data
  const template = {
    "id": 60455,
    "applicationType": "Salesforce",
    "keyword": "storeColumnNumber",
    "grammar": "Store the column number in the table #{uiIdentifier} which contains the text ${testData1} in ANY row into the variable ${testData2}",
    "data": {
      "uiIdentifier": "element",
      "testData": {
        "testData1": "test data1",
        "testData2": "test data2"
      }
    },
    "allowedTypes": {
      "testData2": ["raw", "parameter", "runtime", "global", "random", "function", "phone_number", "mail_box"],
      "testData1": ["raw", "parameter", "runtime", "global", "random", "function", "phone_number", "mail_box"]
    },
    "dataAttributes": {
      "data": [
        {
          "canEncrypt": "true",
          "displayName": "testData1"
        },
        {
          "canEncrypt": "false",
          "displayName": "testData2"
        }
      ]
    }
  };
  
  const stepDataMap = {
    "uiIdentifier": "Account_Id",
    "testData": {
      "testData2": {
        "type": "parameter",
        "value": "Parameter 1",
        "isEncrypted": false
      },
      "testData1": {
        "type": "parameter",
        "value": "Parameter 1",
        "isEncrypted": false
      }
    }
  };
  
  const stepMapperData = undefined;
  const stepDataGenerators = {};
  
  const textBlocks = splitTextByTemplate(template.grammar);
  
  const blocks = assignValuesToTextBlock(textBlocks, template, stepDataMap, stepMapperData, stepDataGenerators);
  
  console.log(blocks);