/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import "./styles.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { BlockWrapper } from "BlockWrapper";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="App">
      <BlockWrapper />
    </div>
  </React.StrictMode>
);
