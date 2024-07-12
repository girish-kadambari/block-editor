import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

import { AttributeNode } from "./nodes/AttributeNode";
import ExampleTheme from "./ExampleTheme";
import AutoPopulatePlugin from "./plugins/AutoPopulatePlugin";

import { UiIdentifierNode } from "./customenode/UiIdentifierNode";
import { ParameterNode } from "./customenode/ParameterNode";
import { RuntimeNode } from "./customenode/RuntimeNode";
import { GlobalNode } from "./customenode/GlobalNode";
import { ReadOnlyNode } from "./customenode/ReadOnlyNode";
import TreeViewPlugin from "./plugins/TreeViewPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some text...</div>;
}

const editorConfig = {
  namespace: "TestCaseEditor",
  nodes: [
    UiIdentifierNode,
    ParameterNode,
    RuntimeNode,
    GlobalNode,
    AttributeNode,
    ReadOnlyNode
  ],
  theme: ExampleTheme,
  onError(error: Error) {
    throw error;
  },
};

const blocks = [
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

export default function App() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <AutoPopulatePlugin blocks={blocks} />
          <TreeViewPlugin/>
        </div>
      </div>
    </LexicalComposer>
  );
}
