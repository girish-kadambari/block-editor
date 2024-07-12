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