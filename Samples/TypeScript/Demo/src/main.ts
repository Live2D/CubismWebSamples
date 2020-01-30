/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';

/**
 * ブラウザロード後の処理
 */
window.onload = (): void => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }

  LAppDelegate.getInstance().run();
};

/**
 * 終了時の処理
 */
window.onbeforeunload = (): void => LAppDelegate.releaseInstance();
