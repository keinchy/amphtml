/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import {getIframe, preloadBootstrap} from '../../../src/3p-frame';
import {listenFor} from '../../../src/iframe-helper';
import {isLayoutSizeDefined} from '../../../src/layout';


class AmpFacebook extends AMP.BaseElement {

 /**
  * @param {boolean=} opt_onLayout
  * @override
  */
  preconnectCallback(opt_onLayout) {
    this.preconnect.url('https://facebook.com', opt_onLayout);
    // Hosts the facebook SDK.
    this.preconnect.preload(
        'https://connect.facebook.net/en_US/sdk.js', 'script');
    preloadBootstrap(this.win, this.preconnect);
  }

  /** @override */
  isLayoutSupported(layout) {
    return isLayoutSizeDefined(layout);
  }

  /** @override */
  layoutCallback() {
    const iframe = getIframe(this.win, this.element, 'facebook');
    this.applyFillContent(iframe);
    // Triggered by context.updateDimensions() inside the iframe.
    listenFor(iframe, 'embed-size', data => {
      this./*OK*/changeHeight(data.height);
    }, /* opt_is3P */true);
    this.element.appendChild(iframe);
    return this.loadPromise(iframe);
  }
};

AMP.registerElement('amp-facebook', AmpFacebook);
