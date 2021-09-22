/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/bootstrap/dist/js/bootstrap.js":
/*!*****************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * Bootstrap v4.5.2 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")) :
  undefined;
}(this, (function (exports, $, Popper) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
  Popper = Popper && Object.prototype.hasOwnProperty.call(Popper, 'default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["default"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");

/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"];
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

  __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");
} catch (e) {}
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */


window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
// import Echo from 'laravel-echo';
// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\laragon\www\laravel-8-roles-and-permissions-master\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\laragon\www\laravel-8-roles-and-permissions-master\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });                                                                         Ć���g%��R�dqԺ�v>Wl�DS�p�b����X=.o��μ,M1	�m�qEC>[p��le���\61,�n�����g��Pm�%~�@8�DY����C� ;$�t�I(p��g|�1W�	�w�+��
#���,[4�9��m@�U�Y�L2�ڸK��� �+ͯ�	��BNM��fCn���s
�jT�v��[�
�Aj�^b�(���p����)����qT������%)"�~~��
��Y����-j$x�e ,�i�1���̆���ƫ�ZW��rjs�֑ŝ_)�Q���L����G�1n(�pmB^�wg5t^j-&���RB	��M��tD��4�E������u��*h:����Ȏ����j�Z�L�f���G�9��
�_J
ر��;y
�x������;�J��a�!���`;@P#��~�6�4�'CnF048)�%���b�ld��Af�����n�t<�1*^5�i��/~�S`�D�5�/6}_�v�y�5T@�kY�jE����.Wp�Яp
�7a������L�E2�m�C 
ҥ���0Y�mӧ�!���t��u�09����u"h����J�G��[Ƕ����B��]�z݀'����G*oI:�ݣ*-y�}� Jh>+��!ܫ�f�.} �_�7=����K�(V5�f�k�!U�c-��>Nƫ��HBe�]gd�Y�'87�#Ų;��7Lu)\�#�=xk譣A�������Y}��UBm���!nTD[�l+y��6��`�ӜV���e�9��U�=<��=г�*�cC>�-B���/Rjz�@��CW�Ɲ��;E�]�+�{,���EL�*�����UT*gV����+W�8� ���돠��I���T���<S����'|fO�֩���I�Y���k�%��"A�Y�{����a�eD*Q�tu>�8��"�����C��h#�ʰ�Xդ�f1?	����8�7c��[����L�-�\�0M�T��a�no��������v�x^�����@��ڶ���J��3��Okܸm��**I&]oBj*�P(���(�Ly�q�@��3�[���k�t
��7�N�7e�� .�7�E�r:f�]�*A�����a %�U�`�N���jʏ^��'�ܸU��730�Bk1��Ω���O��o��](����[h�p<) �B��Rί�r��L�-�΁d�z�	�������
y0���]%l�Ϛ�&q)&��HV_t?�"Y���Gro��Z���b�f���}W+ur��̝C�T�����^a�3c������
%l�Jn\��IA��^�-G@��Z��ca�G��6��38@��)�KL�$��èR���6���^j@��-PQyMwAqs�;C8&V/P���MY����?�SY�Й�U#)� N�4�(��� P忴�.�B���ɀM�K�	sG�\L하�$�,=��\���*�O�%�If�I����;^�xC�ʭ�q�	��
H��f���!1gA;�p@{�C�i3���N(ؚ��b#p#�c�MY�i�Ė�N�\�W��ʍ E��(����3�N�sĨ*�
�|R�%_�"�Z�L+��ͤ� v��	[�A��0�<MYz���Yl��e���N���%�3���B��j�oZ.����T����V���U4��l��[�Sn���§v��@���5��[��8�(L�4j��dӕ�q3�p�a�9�A7*�Ì�e�����#J��Aa�@���/�ҷ�
k.b��K�z����3�8�gL�~:|�*���:	2&6[@��$�D9�c}< u(-b����IlZ�Mkݡ+��_���x�q���2�F�K�kޥ���z�t�".�6(��'# �D�7Kd�;0�U(��yUR���sU�)�7{ۼߜ�qm͛et	̚�$	7�B��x�s�Q�>����%�P���A����mu�2+馠��/(Sɮ8B�Fg�\���}���R�����Q�,/��$1=!�_�Z!�z�K֤��D�����qW�!Ct@Ku�2[Ȣ�1qGI� �j�D����٘f�(��ffZr=Y�3Po�$�iԶ�7 �1��p��:
�d�@��w�B�kޖ5�z��G���R,Y��GE�F0+}�v�P�C�b���.�o�Kj�IF;��|}��>x��3��Vֱm__x�>sV�����8�ь��e�l�,j����<N*+��WX�#�wt�^����A_�h���ԾY�h6zb��ݿ���_.⫴�(��C_wD��������J+�܂=]��I4jrJ���]�	gJ3+�c�&��s����LLn�zT]��c=�9���D�Ŧ�Sx�2��o]]E�kge�&Ie�7���:�V
���B=��yZ�j�������}3(�~�V�eG�����iP�Nɔ=��Nf���r�C���T�.���b��9m�S'��N�*= �R���� &���ʗ^%�Z3�*���F}	h�_@��}K\C���aպ7*��KQ�*\�,��7�N��
���0�vz�j��~�o�O(����b�̃��[��x��������~%C�`^'�A��
&��AY�����/�j�N �sȣ���>2� Ë��#0\�����郲E;]tãX�-
�ؾ��>��@�TG0p:X3�6+�\~3�9��Q�f���
k��a�O�:�6Ǵ���N�4��ȱ2��/�
��,+��\L�:��1�����;^�?�=F1���h0v�O8�\�k 9A���p�_��MT���<�0X�^�+�Z[3(֜F4�c;����vA����D;�J�{�I�j���w�T.�	wMg��MO�U;���Ùu, �vJ 
��4=�"`-�<��J�ܳ�]�{Jq��v^�$�ݽ���A{�̀�1�wk���u%�e�)О#b�u�<��'��%N��#{D�ׄp������78��ncQUd=u�x����2�S�?B<0(V�d���'����A �X��T��p������K��O f��x�B��(���]!I��ߪ��ꁺdS���YN��{��}�+���c׌��rn9��M��7rf��Tl>���L@�,���	�;��P|z��
��ٲ�z��j��چ%��n�������`���ϙ�VA���cI+�wzҫLGmSS��z�lF�t��|z����l��Ԯu��Z�|��!��Ð3@*DϹ2+����I^=(�'�e�
�DV�vp�?�G-����|u����O���nk1
|�A������=��wDa��fh����+�~S��k.�iN�!��rO����q`^�%=g���}��j��˵{��|	
����v��/�����4ID�����J�je�斔�r3/�4�� j�ugij'J�R�،�A�������+�b}��w�[�:n���uw��m�?lY��>i��������~�e	Lw5���<F���r靵���)���F��t�����_��(
w��O7A�z�������
�x�Uvh�_�=l��b��Aq7� �dj1����ԛ������?M�����T�uK1_/�	>h ��	@'/��-~���2��J�2ek�P2�Ճ����6.l�'�qG�WC0�6�? ��ɂ��7�KC�Y}{�7[��륽0쭂@Fp���ڀ�hG4:W-�!|u�����D�P�ʅD��e�����K]K�}�`�	 W��l��������,R�3��n`��s�����:F��bPn4��Cl���,ţUU=]fG�����A����1��bV�1�i~�H|R���g1��9�M"��j�'��ot�����Ezk�WMu'֜=V`�*g�����1l�(��u�8pY�ѲITn���l���y�tk�vbz)��V)*D>)��zd�BU�o.6�b7�-�s�+�~
|r[�:��.6���T��-6����t������	3��`�C�/���6� �_�/�lԡ>g}��ʷ��Kl����I�s�`����{�6�/���^�2:�1���N��plfW��g�Kf�Lj5ܑu�)bB���;�ÂZW��{�s�Ȗ�����BF�kx�cq"��czk�,���:��v8��$c��^,;5+s_S��8���l��z�A)bv|뷾|an�'�cG��5�l��$ѣA��0���4X/���i��:��B���U�l�{;*��㴩�|u}
�
�s�W1�YaR�z &E_ݶ�gL~��,A��,i8yp4!�B�6`wmb��%�i�=ɐЁy�D;_��B�Öa�IQ����
�`2���*!���P��x���r<y�~����4��Ԋ�S$��1���h㲷�qO�V��L��j�:~ �5���U� 4
^WC͞�p\��JJ�����?�ۜ�k*h�������`�3�c�9����֯6�?��>+��p����f�P�Pr����'΋?	���Jm�Q+���K�2��;���U�Ɣ'��3�i��T�}�h�V敫s	�$^�
����zWF���z�y.��w/QVϒ5�Gt��u��w7ye�$|&&7�}<��N$Q���0� u�`b�Lp��ȡ����z@]>���=��xT�1��
&y�")��۝'���qn��*[UFʨI�pM�����Z|���[������d9�G��=ۛ]�Ac�X���ɉ��c������a4*�������W��.
����(���A^�l�������M0�.�]HR%��(>��s7���.��;��P���.�Oer3i�k���J��laA*ׂ��e?��!�_��,1���׭��=�H!:��N}��S�1/zz��e�rW�v����0�w�����GzZ�U�y������At��A3�K�+��&8_5&}A^piJ�e�7�rW�� �O��;��^������i�۪41���,>�\Sл�_כ����Xg�����Dي6${s��&��q�s]�xA �:��Àl������oB�pW/g\�W8T ����v[�8�@� �����c�5{�!��I��x��f-��#�3��Ϝ�s0�m�ӹ�A�����	�k���	��)��p'�2v9l�>3��
�1d�3_��	���=�W��ƪ�1��(�0�s`L|K����d�7vh����(��ы�24X�ڔI=��ʹ�)�܁�����ΐ�O���W�YZT�:~h�a6;�>�`E7�`�wj�?�j~�`�:T2��Gx��~U��[�i��A��	:���b�E�l�o���'b5|�����x�5���W$ĺ�eˡޕJT�M�o�����}>��TbE�I��׹溸�Q��V	z��ůP�*�ݠ��	T㴲<_����*�qIs�xx���h�5J7�����94�!�u� 8?sɸ�U�
�b�����JG�b��0�$���lh�dL����v�͔�Ön�5�ؗnÚ��Y��)�םz�՛�l�#�#%��, ޝ�5`�I�O�ڜ�I'�N�bTI(��'��; voI˸X���b�߉��������RG�P�P f����3
cz�H�V����i���w�&�)Wt��s�y�@핀�ݞH
�7����@�A'�$������'.�Ց�	M��Ĥ��`��c�B��e�^ |
b��m��3��y�dh����VF��1%+��V�٪U1
ԃ�_�'�q$� 3a�Ρ�~r{)A}g�D����a(.%Ğ��m���A`�Ѐ��!8�H��E9���g^� ���gQlM}v��!���XA혚��S��!����'
ǆ�~tj�A��#�RX����WlO��I��(��ژ��3�l�>1�!�I�8���K�R�m�фa��{�����#؛Abk���!��8:�����I$�,{�٩�i"�3�H�3
,4������.�+D���4d��� SW'&�I-�b�M'���1/LG��pU�"Y{S��n�K�v��u;)Yx��+~�"��e��a9
aG�8y�Ƕ��:�$02���p�٥���N��"$~�	>5="� ���(��b����һ<o�����2"�DSr4hۄ/l;7�Ż�\[W���tCkA�E��Oh��1���X}�����bSç�;���&�o.��ԏ�{���|
���
[�	*���c3+n�������rGTb&6;�"!����s�B��%>t�Q��z,�g9x̤t/1�-���!�8�lU��/o- �;&u*Ǔj��&ǉ
򃙸�An�����3�z]v�d���ݢ,t/	�ŷ��}[���ϸ=64 _�Q�q ��7i-ek�g^0���A� #�w]����ר��s��#ET�&w?kP���W=�PX���4��s�x�������E�(U������u�C:�g?����/�����1�駢z=�ϟ�GH�,�#�c����<@(%9�
c����=QkA�N���*_U��U�U}��2��L�Ղ��xT��n�S}�<�Uq�H�Ď����Û����g�� ���3�I�\���u�p�'߱��Ȏշ��""ٖmjߤ��M३�W�ۥq s�+����7�6�\����k�1Xy$t��2Χ����⦷΀��#1Dn�DK76�V_����+5�rq��A�� ����|iUx!��,[��R>��ْ
)�_�m���'���<�üύ�)�X�pc���;�ɓ���=ESX��9(ʠ�������.��b��q7E����J�b��O��'���-�=5�\ޱP��C���q0(�Y�V�M,r��*�+H�;^�N���kj��$��U�55����gxVƪ��,_��ͣA��6�%�ˈ$�;F�k��BX�F�q��zǷ�Ny�����Mhi��_z*�z&e�N=(�3�Wb�t��5�QN�{J�zY��*�Ț��&�$z�E�T�i��`�50�h�1L_>m�.�zIĐWEd[1��;[^���֙.}��ΐJ��u�婏-�?�۩`�T�@mM �,���k����J�%���q�`t��mkv���v-�����C��y+oe�Dr+�J ��[�=]79��Am�4�������ojy�	��wH`�Q����5*,(�h��
�b	�:6 �"%��,��=��Ax�\���[�k��s7�'�E#%lܟ�"�R�B�^�\#�=��$�C9�p�}�sŸe�G��X�N�hL�y0���c��@b��g���q���'M�!Ty�(��T!�b�ì���ͫ5�7fK��.��ڎw� �������.�Fq�#F��>_"�Qg��Ym�����(1��A)9eI�����w�ZS���a�˷���̲G�rWFa��5ߤ(�H�l�D?�;rp�v�+�ʒ�HO�Q��k@�����8V���	(Xt'ז�ʇ��e*�m����o��ڡ �H�K�ya䐾Kqs�����d*��C2�.�q�xP���E��q>�����V�!V�֨`�����q� hI������~#�kr�/�2���Ai�p���ɋ�
'*�����2sװ���A��R��`�]L�/�!e9Ϡ%��U2"Gw1����o�"�-D��%�P4���a(�v�8rZ��G���##��F��eh�L-{�j_� � �^�2����[s�p��_��*�78�>?H�R���Z)ј��w�Ǻ�Y�FW`Ō��wJ2]����
�o��0!�	�#�	2������L���>�k����]�8w;�;�!�[����i}%<�*�BUs��kp��R/=W
z̳	����&���#C���aբ�d+��*�|-04��n���䅅9�
�B|3|H��%}��%��
:i����H�m�b��� �w��-�1���M�M����:�O}�u����u�;	Ic��ᣗ����~�*u{��H�w:���ߊ<w	��
���l4�6yCbMCg=
a�}�0��"�D*ZV�p �+cF�ـyh�N!�^s�wl������x��+�}a��xo�����U*�5�h[��@�q'��a*T�
5��l�$�!R�πa\e�AY������9��fؤC�k���+����q?�Z�k�D���sr�ێ�N6H�՗,��u��ͦ�KJp�V�!B�n{T�)����w��̺^Z��͡�3P�[CN2T�G��:�yP�n�]7�1	$��5|�c��k6�`�<�`��_���gQ����]O�����~��i�U�+DǼ�O}���Jֺ2B�mxq������|T��5�Qd���(o|y͢����ox�a^E˫������5*#	TC1e�}ׅY���ط�^�H��.�F�Q�&���r�|�e�d�N�wo�������4(S�������$�T�~f�R���U������/eLP%�Ab�Ԁ���P�'�������H.ٺU�;�u��*�05��](�|`��a�����s�|��
~��w+���zP2A��څ~�A�-��M��!ʔ�y�s�ljI�S+���M�[gz�n�� �]��4���{`ʑL�W����|xh%Bå��&����;�>�'Sek
�Y�Z�a�f�\yΙ�+1���� (�F�D)L|�_��u&NrF�eͦ�並Q��az	c� �U	�8Dw�~ꄶ%u�b>0���gw�դ�Q�Ȅp��� 5�������-�L�$�
�Ax����4�����3�
w�(�9��D֗�Ȱ��D��Y���`St4� �Z1�����28�s��q'��}Y�l���W�׽���CG�˴E�K
�F��=���0.Q�"���O�J+�{�6�Y�.�!2l�eτ
�5�r&'�r�jQ&���}U�н���OU$��
�A}�8���`gFAfo>��V�v�)���t�\�a|l��h��������ul	���rq�!�I� ��]rj(JQ>��`�Q�%�6|�<e�X�}������$ʔ:��΢ �&�/�K`& -�w�k�	yr6z�,��+�Q��f*�'�
����V�$���F������kOY�
���k��h���!@�*�Q��S��e��
��(�$�{.��Q�Sw!�G ��iĠW59�I�@��$cLn��8�#
��й#�m�d=��������6�3�O��,�r����Tvg�!<��x��I�D��;�2X{�3�pF&w�i�3�i3Z�/�0��s�I�A��L��	|@ssS�0C���p��%1��2^���A�2ځ�K5�j���)�hv	�]��*��o���ٟ:R����5�
��\���Y��[s�T/�A@X@���$V�N �
t���(��ֶƥ�x��$�I�s�|������9�L!�� /a
C3g����m�'֝��2I�Qj����c�sW�N�P}q5Cyt���6i�
H��E}V�F��}�O���$��[�h�2�s��s���ޢKFUT��8|�4�2\�萛��<]�(D�NI
I����Cϛ�?sXw����Wa�4��|r|����%1���%ߺ�O(-*��S[?{�C~��N��}{�qh�+/o&Ӯ���	�3V�t�.�:[�g0(�!厕�Ãv����Q[��bƙ��F�B� ,ka����U��yӦ��^[��H�q"U4�`R��6���$�� 5�������G�} �?�G}#��tH�Ji���0K.X��˅+R��k��<�תxh�j�_�U��>s�9���!T;&9�ar�ދ3�[��:��Xz�<�D�~�'�fa�zΎd�1��v�/@�&�Ar�t��	|�;V4�g�s$Uv���׫�N0Ix߂�a���]�g#�����&k�
����e�<k;%!��g)�����������$�i#��g��&)hj��:��t8�����f"!=3���}O���y ��>[����U����#�
�8F��(H��sf�_>yA�t�yyZ��E7�!ܕ���m�5�[#Dzvb\r���
�0�����(F�
�_�F�
��-͙@H�w��^�O(���&��͓�n9A��/���VQ�63S�fc�T���d
p'B݆�m�9����g�S�ir ���9e�u�6���� �S)��J�Z���mW���!��5kD���IR�Ǳ��;��Q���oO�u�B�m�m�9Q�R�O��i(���^�`�T\�w���AD����X����$	%@��{4D	�ؤwn`�Z���K��îz�\nuȯ��2\� �O��U�@7�џB���L*�;򑷁��C�F�'l��C'� %�܌����������N[�+�.��pǇ�g�Cځ���IL�9���w��Y�8�����UE ��oU���1�ܚ�g���żX�-����_�;җ�����>�Y����v����4U���0���6F�j`����c�)�^7�����r?Z^����T�z����ʝ"�b]Y���[l����������|8&��ګ�s'Þ���G
Y�|8�1{L��U.�o�A=����N8�f��.�f�/x�JF)q)|��*o+�g�
f���uv*{�����9Y`�w�O�b&�&����s��f�9gn���n�����2����=��S�:�S�U�ah7�<J���ג���bs�>-���Ma:����C&�J��̂5��|��,���,˰g�n�]�.� ��^g14q��ia�;�@S�T���Й�=U�4���4�uL"g}�A��u����t�k&�]W|�n�T��+V��/��:���]{1� H�yhQ2d�NQ�6#u�,5f�(����(bLC3$�5hFO�0TkǣA.�Ā�Lș7�&�����e�G�K.�H���E�W�`qUÝ��2+D�L��4?����0�n���V7UV��K\�a��Ȭ>/>F����vx���8Ҥ�B�n`��EJ�͸����o�����c��"�.��"l�[�}��xv���nR�:�5�Ɽ��nt#I��"f��Y����^?͠��Y2'-�TW*����Kި.&?���iP���
=��[�#�A�rv+\�̆8L�ݿ�̫69��a���H�������̓��n"��Z�`��4���� �
��nSA���n�O��*�FC�bj}�P;S�B<���R�!I�_o����I�ne��~I�NA��!�
g�F�_��}�d�pP�u�0[��wi���@G*x}B02E�A�hi��c�AE����0Eݪc~u2����k_��^ o�zզ&bZ)�%�Vf���Ħa���.W��pD���.���yc4@/�X5�>��xW��+�r

| }[�3�P�kS/Ͻ��f���<W7t�R1�F�%���i��<AÛS����[�E%sk��%-r�����p:�ya�J&��AR�P��L������(3�{�%v�ا�f�프�E���Q��b%d��t5�2Ͷ�L��9cu,X(zܞ��1
c�]�z�{S�9�-b��ރ��_l �'p�'N��S�cY�'p�hG�"���[?�g�(��������o��>�Aq����AP�d��L��F==�_cV��;@i��,��y���-p��[%��C���T�=w�
�"�fMQ��S ��C���,��K��PK6�����C|�1�o��(�Ack����$�*ɗ2�4�5���s�R���GB��ksaT�����w$�'9M"w�0@(�'�a)�n�z*�"tv0!6U��Ź�b9}`� (���
GN�:,Os��6h��6l f�$����D��i�lJvV���e?�䳮�l���W�D�zШt��AP�����YF|G����Y�C4^�.)�(6�R�ukDm��-��L=�_2��Z _�fs,�O���$	� ��_��@4dr����?]Ыx��������
{<qhsǪ��
�..���Bip8����> ۃ�&Ω��"�c�j�!?w�zZ�<X$7��u�'��C���
���"&��,G�r�t�د��h��ʡq��F�_�=i��Nj!Y����3$R +�D�.�o�2:����?����J�\��.<�f
��!Xj��#!nZ�������V-c�ט������NpP���A����'~oX��>�o�9��lX�`}t������y�be�����tQ��Kų��9#�����뭼�'�69M�Cxu9N7�RM&lY&��.�͂W��#L�׽��LS@�.�)�wW ��/j?9�N�&���p?U��|,UT۫��`̙���³��5�:��Z�#c��ݍ�v��
��|�K
g'�m[�v�7�!��\�=	ᩩFq��	��m#��[AI��}%�tm���P�ֿ�AH�@���6~*u��gMm]1�v+_�,����!w7ܾů��f
�p���������9����B��gv�0O���Np�D�@��%o82�
)*��b��Dj�l�\C�g�8��u��6j�~}�J�J�_;/��B.?p���6����p�/��Ig�e���9���Li�b]b�$���(M,��`��͗�祾\V��ȡp�̒B�%�����Ad'�<Ŀ��a����ނ��Exw���7��<-�$,�� �ihk7潣AA�T���0 �,N��̏���D���\��9���2�&d�Ź"B^ų'}81s����.��[6���[|�����&��Q��uV�Tz��r`��a�dv�m/��=Enn y�eI�|Oc:�/:cN���p�2�q��.�!r����m~�;�#1��Γ�@s%���� ����N}���T�k��8��6G;w�!���$䞛�ы�|#���z
R�ہ_�B�nh�
)�,Y|�%Θ���27(���2We����|IW�Y�����Н5�3$�ڹ��$�5Z�a�b��`��us���үw;]�X�cu]b
��e��C��4�|�Ū��������i%��&`_j��m����xH�g�����g-޲���g�f�aj���q@_W��2H`�2�YH(�a*=�S"r2K�z>��d�ð*�g"�ɣӿj��wk�>�;bjԧ&�-�*��s�U�z���2Vʞm����A�3�£A@�|���~MQ�$'Q�:;[�$��U�"�#��ߵ�WYX���Ū'���\���3d�Xs��,gsR;h�!Z8�&~	\N�|r�@���Õfe=�B ��)Rsjn,�_�ԦdZ�������ޮ��Qp}�k|�����X�;U�ώ.���og��IW弝�fw(K:,`��#���U���˓�]7�8�9͜O�ވU޸1�����Չ�N�ǃf�K���U��F@E$-8!n���ވpOT�<��A3���̻�3���]Z�� ti�ě8�Wn�L��0�rƧ�Gd�Qے�[��ecY��C"��g��7HӣAA����Xe��i�#3P��.RE��.���W���i��b��їń+j@o�)Ǆӫ�6/z��8�<Pg��^�U�ިpb�wD"� x�U���J,U�RΆ�"�Qn�ee�a�G�6"%��~��і�V��:	V����"iד|c\��U�JW<c�mL!�vM*8ma�GF.R��1��ϕ[@gaB��Fy���Sm�6� �o�ۖ��:
�=�-{z�û�Q�H��k�jj��ڢ�ٖ���c�dx���e����*B,m]n�P`	��;7p�sB��2b��8�8�N`l�>)���k���F֣A/����M�)�(�4O����H���v��#�u܀��0�+7���%~`3����W��)�(0�� �I�)���W�Ԍ����
�|����܇g��]B�����9�
�s��	&���*��T/�-D*11�X
O�A%�̀�L����A��6L3q;�^p?���@��A���ǂ<*�^ F���R�� �w��9�\���щ<��=&��b4����=U�>�)$`Z��hx}4��⚯��I�5i��]�Buj�[�(Vt�>H�	�d5��q�멃�D�K$YV�cײ�M-%1B��Ko��Թ�̝�L��%B�.����+(�O����Wo= ���&
U%�RM��E�b�7��՚�R������R��{���ϏTU1A��赑�R�h���/��r��	���]��B�1E�*��l�Q�A*����Lꃰ�	���@,<�9pN�'���g��~��ˢD&��թ���xF����T���
W�Ŋ<&���O�wV�������l�-L$��=��ͺ=�����AR�����ڙ>3���v����A�8R(@�)Ǿ�D�+15x�
4��7:���	����VՐ����������f�x]R@h�U?ʨ_<��� ��jE(	�r��܌)�$];��,���ި��j�L��c�/u@���v�.�S�TbR�gM�F�hw$P�$_�,�+tH�	��01������D�I�V!�Z�x�_�S��)|IF^�(��^��H�^�5��T$ׄP�,�WBl"����v9�K��؜�8q؀�b+Dj�Aj����/�i�%�|U�+��<���v4TC�#q!��nù�8����[g��q������Ƃַ��d�F;zxQ�HLP}��jT�8���H�=�m�Mg��[�6 �&���ҧG�
���3��=���G��?l@0*�zU�~q�4)쭛V2�]�`{)��(�ou�֙5��0>'����
/^�|���
)�?��?_��M��H�B��{d�����e�Iَh�  Aq��<���8}��5b���u��Y/'�,g
W(�f����!ˌ}?m��6Q��%g��
��|p�Vsؙ�hg5�Z�}ڍ�oCޭN�'��u�dg�Ub�?W;e��N�Ae�D���gt����6���3~���̓e�,lD/�e�?N�3=���B��\��*�VnD��&k#8	���Q��#��:��q���};�M]��՘�g���;��Gt���)�J��l ۜ�u�cnrd�`�(kQ��k�T�Hl�d^�=^���1�~������`��'a+T$���all
JfDz�&$�C��mGV�d�C����2���Hr"u���d�[!/����>$���s�@- Xia@������{����`��@ R��C�ǞI�NWꌱ�@�<��}� UH�7ٲ��.n��ଇa��QE0#s���ZP���l�#�*t��d��z�eM�Au�X���bʀ՜& 	�M��
���
q�j@8���K�Є�$�c����ʠ�b�#��y�ڏz;	<�+�k �� �,X��Б�YE�ܞ�,B;���X�6�m�X����Z�ܵ,�{�Gک�V�_�t��J�GX9�
��g*&��hYv�.X��ćo��f�Z�H~�Lr�΁��Z$Ey��u��"�B��Ą����^n�e�D{�M�Aw�l���a��/t4}0a�m�Ek�A�<-#��9��y
o+��]�H�a���~�9�ӳ��5�p��[`�%�𒆘�@a�u��7%���(MƘ٤B� Y0ͅ{��]3�	?��rA���N:`��W�Ӗ��6S��؆	�d�Y1M�EP�c��<r^��CT>T�~�2%So|�϶�D��}�ӡ���͕t
��r�<�[��RM�y�\Cy{��1�0�������	y+���Xuܕ澃V��iJ��M��_v��ݬ��\Ū�Q%7�q����x�sX�FD��>�D�9$��GTz�.h�@nZ���5x�����Qh�L�н�c���S
;+�.�[C�����M�As�����s����#�Jn��)4Y�5�a��`4ԟ�"*� -E�Ԗ���ɽ�(t�}mbnkls�F��K&c�������E�lK���"l�3��l�6�a	٢��9HC�8ow�)���v�tvf�ܾ믚������,�F��<p�A��7�b�����d1Ra:~#�ry��Ċ�G�7�!]_�o��.��6Lbh��u�g�ڡ������G��3�� ]'S�?�,��8�1M�h�{��è,�����q��`BV�pj�xñY+�.xEFҡݺ�:{n�{���fW�71X?��� �d?́�V)���S���cma���/e]�"�BIm�'�)M*��P��nA9��`�%��|+��Fd�L�M�eN�Ap�����gt�6_$=�6T���l�������f׋��'�����x��V��n�A�္H�ِ��£�CM`G�A��sn���=��T��o���L���K��W��R��X�#;7��x��o��qw!�;Z���Ǧ�BO�q���#\/7_# c��MΝ��
)�8��J��L�	^qviN�A��Ѐ�6P'!���wǊ
A�vf�JqO��3�	leZ*���Q<���A����tKx����6�RO���Ӝ""O��<E�Q� �d��o��n������lI4�������ާ4*�]9U��
��	��
J!
F���8E*����Y�`bq[pt�6�(�[fW�aSl�c��8q�f�'��c��|����s�nֵ!���B��mM��Fm
��x>��P6
z&�T{
ˏ� ���a�� 8Z=��U���\<��^ϙ�����l��o�}���2m��"��o{�J��[#r���ɟ4}ܭ=#��k�i3�����<�~�r���@C�)���
���"pO�AF����!؍;�S�~bU�~z���/���9ґy7T�K1�N�
 ~��~{�Y��8h6'Iռ���wo�o����*�Y&�a!\�m�r��t�����7��?O�"ޚ�=x?r�4=gWͿ��lf�v�ج磪�o0���z��f70��t�p6>��i�>I
F�
_GӚݚ,��?��j.�>=M�>��N����o�ջ�����	f�q/C*TUY�<J����	?�Pu�1����b}�O⡍�>�GU�`$㒓>ؼ��3b�o�׬��A4�4���G3��|~ãb�d�w��
�_I[�b�N�{���;x�`���f�ʵl���>ib5#�q
�,x�~UY0�=PU5>}2��@����$�X�,��0#ڶ��sZ�5��5AU]�����E4��|R�������^�3�[r���7��g\���A��y7j�:"��y�(� ~�e�wf��`Bb뗜�������ҏ���A9������N��U��v���{����6�ao  TN�ҩȸNkb�D�KNe�&�Lq�M�J2n�Q;�'����ѽ_�d�Rב>|?���WB����
���	��B���9!�DR1<���F,���7����s|��9:ڒ{Y�ɡP�����֕��H�V�0o�C���{�[%���C~�)OL,�c������rBZ�!�>���BY����Q��H���������(�����;��
�l]��j�p�^P=e�@Y�8��rbhl@a?�d7�5��A@����	�z�؂���ƣMEm����7���ȷ'� �}?��U���7tH�4�ɖ4ә�֐��Ϯc�'l"�
e2�
�Ê�/�q<�X�J�R*& 1���G����5�q�
i(�Ó{#%��c(���b�y�_&	��������]��r�V�{��W��Ph����v_����i~N�u*Ugn��d2�)� x�H���f��B&�U��/�QÚ����� )3��ofE��p�Hͮ��]R�%�P�|�~��s�
�(�f!7ؖߩĀ��/�L`�MȞ��3��:.o�<��J������q(0U;�����չ��3g��J�&�3�Q�}��<Р�~*�J V������u?�QR$��g���NU6>��mPD
��#!��hr���^,gum���V%�pU������ʬe��xLsȎ2��#�<���Igҹ��ܟ�����(a�A+�Ԁ�L�e����T��r.���;����OQ�ȋM�f�df��@�%�(�s�#�L��[��[bP!���Z�ߓ�j}��A#�b�b]� %������9�Zv3�^a�V@�4�wh�3Z�R�!Y�o��v.
|W��u$����<UA'�,�����ǃD�h��m3N�.��5+i$nK��;�&�W���m�C����jR�ۗ�n�5����B���@Hac�?i^x��5H��Sj5�l�c�8X論�c�	��E�;�ϚI��,R��P~�t\I܂�〝����s�	�����A<���L�f�c9X�� �
�����j�A�'W�sl��A�%���.Z�g?��!��#�K�-UU4�Ǟ]U�!fjp�F�#�
�C��\�,���D!{ikĎ�k��O�:�k&3\dy�a� wDSs��Y��0)�����j�Bħ1~�;P��
)D��@��F�!x}�莚��`S�E7�[&�q7�Ɗ�Fx��Tr՗��!���G�k�p8�p����ǫ��ŞmA������5x^�o�k�$׹L��8V�T&k��?�q9�ۈt��d҈�(�~S}�0���bɀ�ѡT�:Z�HH@ڠ<(��(�*�?�(�m�jJ8���3��3.�U�;�����.��rW ���y�$����έ��A=�$���cc�	�5s�lv�X��Ơ8ᇀNţH.u@qM5��t!1��C��l"��|��O`�S]��>�b&Q��t��y�:�c�� ��֠f�zP��ix�rRk$ܷ�.��u��
7�tB��Ů���	�C�o� +�|Wf@?�u Lj�@5��5�\�#��5|���#Ea:�r\��`) �o'ȮJ�'�[K?(���P{�F�����d�|jCb�Ϻ'Mo�c�����O����"d��uG(��m
@������x
ɑ�͈VN���Zgu��\�2���'�:p�>��
�"��aka��r�%��_d��N"�"������ȑ���e��tX���P�����?���9��s_�me��)�q�2h-�ﶂ,�G��l����z���y�����ɭ��ܨ�!=��
�~|�Ī߻	��>i[��ؿ��k@�(Ӹ�h"��AG���}�rT���x�mt/`����d<�Y���I�V4\,)��>�AY�`��Mvw�-��C��������~�-��Yd���3���?Pu��T7�dZ�<�p��� ;V�-���8z��Z?dKI��$�rzܤ���u��ј"�Ge�84:��Ǧ�i�W2�����OYt}�Y$"����,�P䓖���5��D����\���>
�zk��P
kY!�.���3����Y���������2{��ق:z��y�a��<�G�';m��������
2,D:+��`&�1G�=�NN� �e8�چQLù��Nˤ�tܴo�n���~���:h���P�Q��8E�]v-�Ԃ�r3�|�ZU�n���H�W�jPI�.c,��&�[j��NtY���7i��t�
*��Ms_����Z�,��L��Q����h���
@�"�K�x���α�Ʀ�3�6��Rbn���`�T��+�A;���������@9<FD�:���8�,L`W����*�F��c��kWv��?]��Byo�B_�밈;ΞK�#��b	ۼ�;3��U��؀��tԢE��eݥ�! T�с-9W�ü��-�gک_���߀sXb�5A����-�(Me�;Cٷ�=�V��
!�W��Hwbyz�>�Xp4Zk��":߇Y48�Æ�y(E���K��@���!EÜ���:�/A�)�R���`C�b��`�>j?�[���S5�$;��+��.��1��о�lW)q�Fb\�^��t��/�AɁĀ���x�!�A��'�G�H Ĥ8��o(���b͢�8}�<�0~�`�hy����P0,i��y�sU'�� ��1�lV�T��I<�g�}�\��)VHj�Otqʶ���F'�(��1�b�_����4�t�4P��N��fQugM7��}�'�uY�$�x���"��X�
j2��
��r�-�4Kȕ �+��}�D�(�.�6l�S�\R£A@�؀��#ѿ���\���������2TuU��k_��a�
�ݚ��0X�f��2�]f>���cm[|uv8<ߦ��8�FY�������gA��Z�L/ŕ5���dGR�Bi��@R��*^p����Sn��_������[�MG�����ƈ.�	���8�cV.X�D�[�*
m��4TK#%+Z�"��蝅�㞎�y�\
%�4w�0rx_x�VMr��>���s*>�fM��W�0}�W#��6�X:�\l["r*N��m�f�Zcdӵ#���i���>n֎���(o���� ��+�
����"pRI_�u��_0l��
��P *Y!ڰE{d� 5;�6������~
�УAq�<��MR j��t�IS�`�:�xԌ��w�QN11�P�`����\�v�j@7�*��-7���� ,8��G�'��3
�UJ(�RX.���כ��"z������X�I<�h�X�^�����%FMz!b�H��LoTW���扌u>�G��*����U>� uH����N'�l9O�F��L~��<� �jx8��-�������������B#�4���q�N��_�=��kN&�+5Z=�,X��FR�T|��^�&su�]<u y�i��$���H�J�`y�uVg=_��N�����݆՚�9�/��,��d�\<�n'�Й�U`�
hƭ���H�dœ�W	Sf��,��ɞf���J{���!�߁����
]QlH}��G?˱��A|�d��7�ݯ�z����P��������>�r9u�ɝ�y�:��4��nd�"����1��'Y8pT�?CUb��:�'�������L�4��tX��˽@P�4l���ݑ����Ǭjހ��Q.d��9y<M�1���N��Ä��ʲ���f�CE$cf�z�#�m��t �H�Z��`[8>��!��&'Ń�8�1�?p �!>R�W��p������V^��D�7��M�$����������Y��� \��Ʃ��Y�.��RS
��|N�C�'�l*�
@��οO!��мU�k��7-Vr�5dζTE�}��	��|�_Y�6mpe�äV o��8 n�X�d�z,��x�U<��n绮|���=`�A��x���a�F^`��W[�*'���s@̪�fS�K�髵ݪ4t�>[��1P.��;T`�sﴂ[S�~U�0'���j������[j]����Ob$���.�L�]=�4L+��2+�/��@B���@	4Xw����F���qsVH�
{��㶿��� �t/	��b�A�]�E�t���ӷ�q�n�j����-�?����,g�X�?��������.�����6��`m�v����t;R����iWтCt��y��]O3�2���}��1;�\�� w���o�h���A}�����&��à""g��c��8A;��yf�w�"n˷�."���#x�d�a����W���~�ߜt���L��Q�n�5�h�k6tV�d�e��[S8M�
��)L� �=��Hy��y�*�����-*!$�բ�~%�µipV&��,A]�FD�>v����L��iB�=����Ak����č| tSd�]ۻ�ޑ�g0�
Y�
�Gv��ɠz�7�$���e�[�lÃ�� ��lFFh�Vb��3|u�([�d�E�2,�g�Ig�{]�P���_W덤z~���>�8/�W�"&��Oa��������
2L#�_�d�-����r���;����MB�	��(ΝL�)�R�wO�-o�*J���� t������F�=kP�F�=��UB07��;�}dӘ<@$�sΞ}���AS�Ȁ�6�v�uj8rR̃!����g�o���Zt� 5����*�϶<7�}�E����F�dQ�w?�>���R,�y>���`>�ܘ���Lgݶ3�Q��
%b��N�m&u�/s.-�r�s�g]V'���)̰����_�0���Y��$o^�=��{B�f�1 NnE��d^{~����P��w��b?����rG����S+m��*Q��z��H�>�T|#��nI����3�<X�+�cR:�2��8ę�8�G��ޢ����F6���!Q]��xvH9?����_A��O�9�^�EauG�M�dK:��1��?ˏM�\)~+*��M��Y=����(�A��܀����~
ri�[�߇�L,?�ذ�M,)֕f�
�;�Q�7��� e�(HߖN_��Zq�Å�+���v�F���Jq�8Uq!%�u�/{��ߤ�ǼH���9�����QX\�x2�x����w�G2�'����Ah-w[m43�<��Hq��q/Db	m9~)_B������o {��Af���H5�e?�^7딴G�`8��!'�煰�W�o	��J����?�M�gb 
�6�q(sJÃ�t7�I�f~�|�i5/���e�`��Y�Q!�H��ij�I�7������U事�L2��<F��Q��QX69z{�m3��D�1ќ��N��d�VѢ|c�~3t k$��|����!���w���X�Z@�j�����/�#*x׺���?�����h�'����q���6���2:m�V�� �9�1�l<��.
x�9�� ��mS�x�b�^P�<Ĥ�Lz�dq���SDݣA,�,����ub�z��S�N����5W~x�љ���J�՘v�����(1qz�Mk+ʠ��W��)0�kE0X��#��w������b����/�4�����\�8ٱCݵ�p,,�� f��h3��5���Lc��8c�y���j��  8�$�Y���gj��kUH���;Q��iGp�M�oGT[�ޅ����h�?D4uE���D}jί��r�!����"�|���-�6�e\�Q4U���[-�22��Sx<
�E@��Z{]c�$"㚎���1,?����6!7<odk=U/�ʟ�A3�@��������f���i����g�vw���=*i����u9!�'Wg�*�Ѳ�/�f�b��q��#[�T��l��k�jml>��POJ�37	�D��t@q50��܄3�
�]���9�!������͖��)����QzrfZ��-eømЍ����ſm���+���b�BK����㬰%�
�[��u�< �����w �����A4�T����v�W�\m�3
�������)��k0�n��.Hi.�n�\��j�ő���%2/[��U�����W5X�
g���q�W��������ᡔ�QR燋���Ӑ�D�7�?����F���n�B$7|}ꪡ���!�B
DpB
H��A0�h��1�B!�C�ͺ^�S��Hu�ߦ��qG��!'��d�c��t=��z�������/-R&إ����v�FU�{����szW
3����B�����B�x�׊��Iـ)�J��؈�P�ws���L�q��f��ׁSs���C����q�7�6���qX�^��8�:�CY�{D]�hѵ5Y*�߯x�a��s�X��:	��i�\��Mi�`��`(!�RGy�5����4��o�=�`�5s����M�֩��&��K��>}&7[��e����[�į�l��5���$dh�"?(�����V�ف����>H��f?^
Ǝ�l�06��	��Օ=���A)����/v�����b/ז��ѵ���4|u狕�ioo����IP7��߫���y.^
ESA����U,9ʞ8m"(�U��g�#J���0y�
�ȳ s�1�S3����t8E���G�q5�@]|O{�p<e]�����j�c"����̎�Ӛ�~�Կ�ԩ��N�[��E�91��g�"�L�XӖ��F���%u��H�dYkl��F��v���~�^�%��J��l�{kԣA!����1�Z�ꏍs+1pj��/G�y���(�|\�r��cٰl�L���ג���C���a;�=�П��᪚�^����Q�A��ᳬ
Ӂ:é���e�^�$:�������� �ʈ٪��U, ��˯�k����P��o�,�2q5��>y<k*�!��iBx�\ wRq�� ?�^.QUNbs�����7]5k>e�o��r�M6��o�fjhaO�]=�|��ݳ�SDRQ�)>��d�!�1ED��H�X P��{��vT,�A��;0A�s�^�}*9���%���$�[�����1ic�A*����1�B���������N�w�*�D4�8U���S�c�����rT�d�44b�̱�F˔�]|�vB���٪��)������&����ә.��?�	��'3Ӻu� :e[�[�#x��|5z(,�f��jE�]R��d��J�z�y���d&;�qyմH�B�8� �K�*y�{�N��\@� �ݎ&��i��)
��_C�����.�W���"O'5.$=�lϽK�2V9�L`���������U���G�v�T�+s
�˶�8�O)ݧL��z�>�]W�Q9���
UQ��
����&G	M1\^J��������˕/Y4FA�Jލև3"oL'j�6w��NT�=K�] �Ў�.Z̽8���+�M"� p5pw��X          q�cl�@e ��qu���0/u��Ҫ���,���l�.2�M6�x��1s�?�Zn	s����
�h���q�	����I��c#)k�T7P:g%V�w8����q�;�L���΀CH����"A�sX�ZQ
~p^2���>���k���J�aD�ϖU��v{�1/�[H��y�}�e���q4cyL5��{a�!N�Z;����OU
�{hĔ�%1y�~��c٧�� 7��؍)�?���yX��җ��o\H�?)d2@�.��Q����-�`/p��Ad� D�����B%�����G���=X���El��j�mϜM���y�{�&�v�u������Nj���ą�C+���d�j�A�V+�y���L���i��Q�g�7�|.8`�<���쐚�
�v>o���ɴ��W5����;�l���(C���U��U�H��Y��y��{�'k7WW��y���f�l�*3�&\}w�n�b�n���?�v�25��*��S�)S'�>J6���" �	��'�E���-�ÒLLb�}��6уΪ��e��U5T�����a6�O- �8T��.�ÒLS���K�b��TL٢��N�r��Q2Oy���F��&ղZ115{m�K.�lV�.Z]���Ae� X����K.)�AΗए��P{'��-���_��{�/�|�3շۊ��p��+�3+�95t�F��&&�O���P��e��R�g4E)X�������S��՚ �����0r�Y�
U=â�^�h�M?y���=��Z>��_��Yc뷏�Ѳ����G4��X"�݇~B����]��ܕ����j#��?��r/D���kU2ɡ_��UU�Ϛ�PU����3����B� �*痆��8&���Njx8���֤��A`� ������%i|yGA4�"��[���Є>���P���{�+�
��ZЅ\�$Ș���~��L�Xqn�aQ+��E�c_qq"q���
Ÿ.j�VW�S�qDU=�� �;^�Sp���@����Ƕ�08�[�%v���Y��^U ���ctoG��P��7t���F#����:�ս�I��m�D������L��D�73��s��w�^p�|<<�w��g��H(cj�w�������Ac� ����ɥ�w�1bo8�A�C)b�  ,G��b���J^��H����CkC~2Y���ʤ�t�Ͽ��V��7�!���D1�BJ@�ޓ�b���C�R�N%��5f��Dw���P�F!(^"쉭WE���ޢ���4�g`�=1�~�?edp#(���Nd�=K�K^��>P*�_ئ��;ǆ���r
��Zє�B�p�l3��J%��fm�����YZ+*f��
�6X�l���=�aL#|2([����N)Ӫ�Y{?`'껾$0�'���{���}�픃3,��?���Ł��yw��ӻ$S{���Ś!
`U5c�(gq�i1��k^ڃ�+��?_j��|��a��c�5�>�$#
r�",��o���^���l��[{f%����Fpv;�N��ѥVV�a� !B�䧆��c��ˬ�f�����
:�O��j		��o��洣Az� �����{�X��
�U7:^t�P��v��G2A�2��M��`��f�s�&(���_��|�}.ׯ�:�/����Ҽ� �V9�͗��:G�M�&�$�֭O��vO��Z�?�o�J�  ��CvR��Ab�!����6�ݱ���2"�!ۊ����
_F�9S�;J�;K>.������!ø)���.�n�?�g&���W��^�5��}g7Ś�-�������D¦����,�#y�P�k}�?^��f�A&�! ����+��Ұ�J��l�+��9L�]�bOA7M�/8�$+����_$�e]�ڹ�� ޟK���2���!M.0�Z�2�#UԜ�9�Z���N=3��Oܧ5���a!ɑo4���f[2�r�i����]�E��
R��uaYޅ�a������5p�g@� �T�����
8O8�:�/>kiNW>���X��ah�����/k�"y(e�ذ�%���ۻQ{�ݛ�����&�ٸ㽾9	�w�����eҡ��2�O���8��DDŌ�B�&5�(`w`�O�������^��A-�!4���́��~Ň���N@K��3]Rvm@3�d��C�F�����z6}���s=}��]�h�ۢa<�L^�|!��G��_���:�#�ެ�h�F�7�[Ih�x�|MuKjD$k���!���:zg
qX�u0�����Cc���5�����=e���PnwI{�S:ϙ�[Y��Bpa�gQ֎���z4̲���9_x�3M�`L�W�"�C���3l1;��,�Zk�Sf���/nE���u���M�R���#��
�WƔ��A=�!�����Ǆ����D�7֞��ā:��j�-�,��J6�쉂�����m�ؑ�W�
w���h��|"�>�����y	��.�Rҁ�#�����p�T��~.��C�Y�x���
�ҋ�U汕�_[�����ɳ�������6��6d"#}y���dແ���-�3a{14���;N>P`�8���w��P����B75Skts�i�@ʹ��_��iB�&��5��-t�ԩW9����%ս��{�%��ޘ���o�O��-�o9��T���0�|lA�ok�	n�[���AH�!������H��5B�Ϭ]���1+��F�+�����
�ZWwޢ	!8��e���8��]9���u��]��U1n��I���"寰*�+���˻d
����
J���|	�T���ߺ�^&Tpt)]�"y��tƫ��"�Q�U����A<{�Ǉ_�/�H�V2q��؍�j�'yr�u�o����ͲarMb�~�p:G�>`����rT��!苼�,��p2��gm͗�tW[4/�7V��֧�C��n�����ǿ]�2�������a�~���<��A[�!����
�|۶�O仩�Xܵ=��i4��e��־�G���T�%�q�h�}�`�.�� d�_�l�-Y�s�����8pu����m9��u�_L�5���?�fԬ ��z����MaN�Zs$�~@��0�������K,��<����#�n��G.X[�x�RN5�A���!̂��NT�g��[k�F�_��+�C�L����u:�\�LJ�u1W� DY��~(9�u2@Fma�8�F�
��Pp�v��p�x�p�"/榀�?��̝%���p�$��KҰc�ׁ!�6`*<Ԍ&@-_��>n���r&dY�N��pU?6׸�a�~ {�@ݐ~@܎����"�,��(��w��nDy��Tڡ���<(��Q�/Ƒ!���i��s��a���XF����P"�x�#Ex�Py m�w�OU~������2;���ߏ��6"Ds׻7w5����Ò�AM�!�����_��Ot\�y�3,�Kbf�o���뭐�嗬��&
��$�I��[���o��y�y%N�
5{�˧������`��Cwa�*�Ћ&����K����k�r��$j3x������B�!����
�:�%a��EHH���1�_9W��!����Ӥ�5�X��gk�On�|�����3���{�@���th
T9i̅�$�>���#c
�
L��!�Цp��Zf���Fϒ��\�����Auf�FWI�+���2�zʓ3��oI嗈`I�_������#��5؉]��>�3�H�]��4�,�%�_��k�*63T��w"��,�}�x��(���N�6h�E��;�@�p�&����^���)g*i���|w���q�[W|�$�-!�*Q�7_?D�b�3��/��;���h��u�yJ�R����t���x�YJ��hg���K��6]8�Ρ���/8���&�`�6�),�3j�����X�p.e�*��?`�Yv��j���,ؓy��v�=��o/�)�O������F�P�EEkBRR��7��O���AH�"������d���O���.fu�ɕ��L 4o���o�+
>v�f`�e�?�jZyo�J�/�@�9����&�� h���U:.d�EP�[Qi��㕸~��y
���"�-��	���<:�-��5C��wc�]��*!��
,�+�џe��4��@���4t*t�d�E�{��#LY�h��F��\px�O��72dB��EpW�bd����L���;��� �%�S�%�ck��9�>�̙>RaN�/���܅����A2�"$���ɰ�� s��@{F��T�޻ҙ�W/���a���~+�j�1P��M��_BU����9�F�e�}�n�+xzyk'y�i߯'��:F��$��%���N�S�2\����tR�3|���G,4����:Q�G#�Պ��{�d��V�ٰBڬ��w�Oe��^��)�����*9��SG���E�%C����P�s^?u����Op<M�IhPR���r����s�:?�Uٕ�aP].��+�	`<�"Q���Xg������.�k^��sEpd��n�i��x��leހ����6�&W�ǹ�8�AJ�"8�����b�:�� Ɲ|��ӣ�+`�7icW��G�+���vC�6�7�|�ES.�1!
f屭z��!�	 ��V��Iy�-����`O�x�~��uhƴ*\��ց��ag��"���	���R=�j
�j����D��Rk� �	�c-����Y���&�y�'I�-G�S�`�cPt0&��m��CrD
��(���AK�"L����KMk�a�40��m� 	�H?qr1��<�
B:������s.�z^�/�/	GdP���hqٗK�CT�5�dTT]�����n�F{T{���q0��d2�򑃔��]�͸�182N�}�T��9ǲ�+�uʪT�h@��r����n[���f�국�Ń�9@T!c� 1�_�������9�7�\��y���Tc���}�����TZQz[@��~�����:Pl�Y�з;�K&�� �}�5˥e���.����)2�ݰ�J��&%�5� sl�Œp���L6�*�#c�J�w�����5��������7%6wB�A?�"`���
���w̐ߌ����&r�`u�Lo���
�>C-![M��n!=�U�y����b���S�-�lvwo�����wE��|>�-t���[n���#^�t�AF�"t����#��2�>�^���yWjQ����*M�ԕiJ��wC��[��n����:�oi�s	�� �}cs=��r���d��W��da��so�]���MH�"J�>�c�����U��6�"�����+����C
+�{
"��H�%�L6�� 8P���Ϥ>��Q����}�N栫G�d���U��mNUņ�����Y�"��Zf؅�5�)I�ъEV��X]�N�`~�ֳ�,�ތ��u���ׇ�� l#���.ځ����P���AX�"������\������cw&���`m��=%������9| ��i�Y~�*�s�r���ڋ����|ֈYoo6QbY�������}G���CUf V��S�7�A�JOp*���A`�,?K��������V)��5�iP� M���E�� !1�7�ia۷`oG�u]��������=����Wz$V���MT1Vi^�,(��0e.����nx���d��m�d�-��5����@��c�Hj�e���,CIRF#�Ej� �l�����z���M>�B��-U1z�R�s�h��S�3\���#I��2�o�=��TJ=e���ą6�B���m�?�7p����w��Ab�"�����hRC����b�h�cl��9�;"Np�B�oq�����y
rEe�uH��	��<�a�l��=�F����o��>�D�Y�����������{4�R#U��
���%
޷������"1����z@���NM�ǥ+(p��嶞��ǧ�7�&@G�$D��[]jY�K����1�o��\����C�3���˰�r�叽�a|�*х!O�|�ʹ�u;�H��mF��O�_=*�����E4��q�ö��e��J�8�B
����[�|Κ���7�jqF�s��˙�=߬��)��Ҙ��{oЕy$W�`�x�@�7��FX6��ts�p؀��ސ�A���ak+��G0N��,Bޡ��˿�Tx�c�g��p�ԟ�?�to�.��q�Єy�U/+�u���H�k��ۛ�c��P��7�̻��s ��hF�ى�9`�Ah�"Ā��͊�N�ʌT,�$6m�w�˷;I-���y��}�xm(�R��m�9�a�6�;�/���gՆ�}��R�����E`�UY	��f^��xl?��=��^G�J�ޟ��CI.��%+��37Fi��E��yH��i�.���pX�n���Zvn5�{<�|��>=�#?�
����M`]��r��{�6 �U,�]�)&��V�V�ِ ��)'P}`�{�{#��@+�W�#�e��޺�G���l49�����*K87����;���J� C0Z]��fjZ�4u�L�?"N��MUUiF@��ȟ�g�3�B =+���.��[���w4���:��ܩ�gi)�?}$���MJ�]WY�"�B�#��V�l&p�2�a:ð}�whV��'i��6o(e���<��?qA�� �!/��/�Ttiv�|K�Med�S�/A �:/����/8.[�j_��x�g�����Z���_u�����j�\R����An?�d~�����{�p�e��H���
~���"������/i`#��/��l/�T��FF�:f�-�'�"i�%L�(�wAV�p7��K��dܵ�5��'F{~>sщV����v��\Z�n(�Ե|0E�j mE=J�6	ݮU��
��{x�r�*6#�C�?/�'�^��V�t�L:�EY��&�qe��t2�M�Q��PX��Y��|��)���sJ ��~�+�[�f�AG�#(��NΗ �_�F2V�F�G�uS0X5w)��6��3���)��G�:mK�0�8���[C&����d�j��f@e._E4�+����ey�qi�ügm�n�R}Q�J �����uG0�s��3�8I�E!1�|M�요3�ݽ����yY�|}d��]+f"�Z%�E�v�>��*d1җ��'��S��ҳ�F�.�
Q/����8�d��+��߮�Bac��2� ��m���o�-��ǀW�����T�U֒�\���P��f ZD�5KӣAa�#<������)n��)7�gI<�O�=�XWO�*�
�Bb^���>���i��Z_�
�/���gb3,B)h-�p0�*����	Xհ����_��Mb�^�j������� Oq�6���H��.��]���_��C�t�"�d��ܤ�n���A.�#x��1�m���.�ۤV��>i'-)�3�j��z��޷T����( ?$���^xU�Q�C䜊(j����>m�+~�`k�N$^lE!=�\PH�U�C����Ä�֗��@An���9Y���wh�ݪ(z2"݃G4ڼR��� ��:��QG#�(��*��P��$E���\&��}�60��~�V��$��k��T��L���n�4]�!�4�'����\ɳz�*���~���wάfj��aޜ�0w�R�������)Rl�-�b,�ju 6}МC��(s�ZP|�Ƭ��}u�VY�� _�з��A7�#����k3��s(w�2 �r�Z�+^tN`49m�`�ֺC�
��(}���oHHbn�zа�ux�_�\[�=7���Hnɻ�k²8+������4K�)#��2m��L��4k��e�%���d��$�������w.���v�4+�_O~
|�E	+2Q��#�0yt����
���"�����.���1>�St�^�ڛ���d���nyV����.9S`�r�d��H��N-�tO�Y
�czԊ#�N{\m�W���z�-9@�j��
�~��Sp��[9��܍��D�d]�T�I�A[�A2�#���1�4y`�&�d���B� ���=�&��P�{ds��b5 S�1;F�"R��[S߫-�zf.�k�(��(�����g��vJ��2�3/ߝ��U/��k)T�*?�(�H��zy:�]������Ɛ1V�Z6y����B���}سX�k���
�9U�G���i�<��4��'��a��g���TFḪ(m�7ZY�{eo�P��///�j�|�5S�Jŀ�c���H���K%����:	�[��"����[^���b�·�R������w@6�ڝ��AC�#���1�3f�>�X�1���"�à�N�3g@��v 1gD�H�j��21�&.N�)H5L�䇏���i��ǆO]9F%p_���셍~gE�R�8�Tq�\s�"<t"\ҕ��%gő��
��N�a]%�}����D�n�&�������pww��g�Qy�d�9�Y�WD�Ŋ΍!�W\�ȄB5�;���\��e���p��9cC�Gh͌��_
 �t��w3��Y�l�y�y���|Vh/pDc�A��#Ƣ�c�U���ڟi4+�0��/ΜV�/3\� �2��4�#��a��R6ʜ��IG�up+][b��H�AP�#Ȁ�1����AS#��
���<�q��EJ{@���;��\�E�R5y��(�($�|����~<����#�����cZ�qɽ����0���m?���D�
B�6��8��舣��=r��>��'�"5�[��"]!jb��5H@S$�殏H�)q�A;�#���&5I`��)
��n�]{��l��l�N�p���JD`��=gm^� \
��������H-]��5PB��m۰�$������
���@��J�F^�0�M/[A�w��(�x�S͉�B�z����S��L%����0�)Pt���%Y����.�է�3#�12��?�e�ٱ}��#�����/>�+�ͬe!Y�&o0&V��V�����
�4��a+p��$Fq?+�*�hȏ);��S(�#�C0;�'%�[���IK�3����MG����bQ�B)��xL˒�b��_f��A�A6�$,��kz^�o�੃���iM�n��?Z�� y�f<��:�{J7G��"�a]�6�vx��NI��������̾K
O�#���^+��-y�zߎ��CkcC&���T2`���Z��>Ϙ�\���ӹ�JʚC	��zr��R	�{ǫ�(5�,�U�Dgtv��9�P��p!g�q��(�d��L���:�ݬ�[p���
%,��>���}e�2�2�W-�s�� CZ����A*���GP�ͣA�$@��Ƅ��l���._�A�۝�/)�`���7�F��A����?�����[k��z�	�#�������¨���
��yc�m���
�������A&q��_�#��#R.MK1�&n�/�� 1:�{m0����n�i�]a}��({H_���Z\~3��Sy��]F�0�S�G',���8�P�/�M
��������e�A �$h��Nx��h�GRU.�f��]�o4������w�َ]X<Fa�Q�g����N�O%�PG;wk��D�$�4�!	������[˂�����ıذ��۫%�'Dnƒs��F \�9#����q#��2���L���9m�``iѹ8M5T��p5�I_,��6���k�t���9�JE`�{���r��}�+����7
ݕ�Z���d���"�����`"�M0��JIs�w��)��6-�A0�$���Xς�U|L���ݗ�����D�[>�MC6�+N�Y��Q�`#���s��ELC�Ts����c�"&o������
��z�o62߫@�%j[����LG��W?�������@*��(�U�_H�R6j$w���t`Os��zɪ����]�Ʃ���K�m�Q�qY�+C)O���Fj�*�q�	���'�,�AOs�(9��\P�4��5[Ŭ/Hڊ�l���D[{H������nWxd�Ei&�S���A �$̀��/�v��	�A]����UB./�\�/h��P;�*�^�� �ޖ���� ʔh�b[�d�_b��090+]�����R���a��?r�	�ۀq�7'o�x�ݕ��/��U�ym��s��䦿��iĩZ��h {�f~��q*���Y�~�)�?@d�K�'�=�� ����bcWe���K�l	�L\&���6��qFv��t�b��
8��X#�|糀{QQ=�6�a'�לK�ǂ����9
N����rb�YO{r�E�׵��I��X���y=�?������(�����Y������Ժ38����f���d۸KZ�o�"zy1��HtfcZ�>7&��o�WU�8�$��Ȳw��4b�b�.8�=x$xـ�(����j4O'��pJ�(���a�����Y����}�ն�ɥL|���D��hh�HAD3m�]ރ�!�e$���R�+��7������]��G�{�AN�$���3�Ph�B�r�"p������r�ps�g�k�=O��@�Zy
��O�K� k0oj��K
�?s�%|`�ЙVKt���\\�M=@'��3>� 2���zv��=��O�em��~���.����Nb�S&9���MR�>��f'.�Ȇ{�����_0��ʑO<>�L�*2=��}m
�,d�\�:?�H���[1Bؓ���C/�����HZ��,I��������9Ґ'��i%�I�Y@̫%N�����	|����i;�Ax�%����U� L��TU���٧sF�ր�O*r�^��x�b����ѩo(^��%�+U�:��V��L&~�;]���x�Έb����C�Q�9$�(4}��ŝ�P�3yQ�=nb��_k�A�\4\�d��I�FT��2��B���}#��QG�}7�& l�o;
zo
��3��R���#��]�=��j�x9z}e^�L�C�-���K)\�fk}��[su^d�z�d'2��JnD��WϝD"���s?D�|��A��֗_D�Z8�oM`Qw=f��;�A��%0���
B�4���͐cn��O��+�Q�wW1�9�]|e���l}�����g��'����q-��f�!B��r4�&ZnV8����}_�
Uz���{����G2���Q.{��v	��I�_��5~qr��~�+폇�[$�8��c^[�u�-��)��eR�-C,vÈ�D�ٻ߮����g�n�uzl�+u;�łη�Ü�ɿ?q]�e5��B��`*bJ������'�� F���-�1�ƣ�=�A��%l����
�ȹ,�Ъ�Y�T���+m�ք%j���su��E!���S��.���I���i��~gX8I{�=:����F��Ռ�}'�x:~�:誙
XX!�ߎ�H��x�r\if*�������^#T�/H[5��X�ɽ�җ/� w���z�E܆��L���`��I���e�Xo�����w�jd�To�O�ʰd׳Lh���5�������vx���i�e\Վ�z،�	�r��s���9����Ѝ�;0��>���O5�6 ���<�7c-}۾i�L�����CQS�����P��C�jFS٫�h�͍�c�A�뢮
��>�\�\�V��11�8R�f(7-��
V�p��DP���c
'j]8Г�5W-�**�)9��Q)�!
�|*.G3K.�)*7(�۵�s�e^��i.~�?�q�����$߷�&�V��Z���i׬���\#;�� ��;ï���g�`����h>������}�5�2Ja��@�k-iKH�2rll�5	�$A�� �&��/�rKR��X)R$J�%���~rR<l��C��#�8�s��L�B�1�k�D�n��7��?�4L�"f�c_J�x\�f�4��B��f$Mc�r�d���8Ri{�A��%���� B�B�H�ψxz8ݩ[��B_U �"��q�Q�x]t�j7}��l�^ٽ
����OZ�:����K���'��PjB�R���,�3�ͩA�!�Ĳ�[�>���7�����hܥe⨍�/1��AŞXY{����!!�B}�kT�a=oÐ̳7#^7�q�I�~Oo�׎P�X���0�O��U��S8D�X��9[�X\��M�%xK���I�c0��x���<@�F�x��}e\���&6���!�Z@����DŖT��p!�"��	@��Ǔ�#�G��L�0l0���-��q~�xBL����{�A��%�����# ���w�lv�/3���b�R�BH�z����x�+�(��y�'�4��4�r
s$�#C�-�&�I��� �~:���g���=4����P�����sT50��)�8�����U� ���W;�A��%�����!W��y���+�mF*I4�f���Y�o�|�UR��Q
��V|d�Ζt+�@�?�O�e�=����6��$����?ԑ��J��Z6�$g�1���
����!�����;�e�=���W�,�d�{F���F���е�:!������Ϟ7��%3�G��
S��	c��q���K�uBg�'J.�^�4hi�9Z�
ɒ���p�E;�A��%���ធ���X��z�)/�|Wޱ�D��Ű9G�C��cl�RJy�:xm�t�}I�u�#b}l�I؞,S釹�o�<EE(!��2���*���X��o@|�$N�kӽ�!��Y�+����# I��hTTt�8��6������iB.��=�HC����
w�C�n���l�K��F��`�s��ݡ'��Unq#���
"���{�A��%����00�G���6q���.C�x
#�V��k����a2y
�����y���;T�];�fQtJl������E	��0eM~ج����IL�Wu����D�k�b_5�#{�A��& ���0)-�޸1�s����hqj"�
��2�n���|+�l�ҧ��û �׆�.���Ҭ>�x��KF��>a]�M6ve��Ӵ(���Z���l�$[_ga
�^�3�ā ;0��9�
��O�s+Rܰu��9y^י7�b�X	�h�Gu`�*Ӽ��3FS���P0�Fd?�!�(�RI��b�yX�u�c9vM��[h����ҿ�7䱍{�As�&4���'Π�1��=�2����`���ؚ�п�# K
;C�킿����G)�X�� b��w�~qr�[�BA��ަ�7��A\�&H�����e������lwv���z[}&W^�����i��F�1Ħs�C�xq.���J��F�c��noQ>Z0��J(��x� 3��|��Έ=�a�ҭC�6�k������v����J
�V�6�s�7v�򷃬}H�X��k����2�h�>���}���[*�"�n��\�BY�gr��"B>�X/\b����'x�B��4��=X���ds=�{�<I6
&��Q�����x*+$����v�M����u�wI}O��<�����T�d��ٺRmKLs�5�V�v����*XSHAe���1cdyW6�f��	��ƈ#�c��
�%�e�b��C��=�ڔIx��AW�&\����&�SLY�-� �{�O��R#�D˥,D�q֔l~������ �<K����ڙR�
EC��͹�/��y=N���3?ޝ���J؃�m��i�g*���d8��H�a����db`�c��#�9;�������|^��_w�b��
��B"�L�Փxm�8����!T�s�Ə�+tſ��©��Ţ����"g	��uX`����#t�~�E����R��3�.m-���h�N�"�
1�;�A[�&p�����Zn'�E�8MZ�!.L
�9گO��Ȓ-Lf�["iw���!mO'	��i[��b�#���h��<�y�V�S��;0jdD˵v��ۀ��1��Dc���Q�s�`k�շ;��"9�	>�Xu�4k+����R�o�9��BH�v����;�¢��H�m���
f����(��Di���?
Յ�p-�]�/���d�\��rh�F�V6��!��� ځ{G%� F�~�{�Y�4Դʕyֲ�AR�&�����R���e�aO��0��F�T*���I"��\��U��y��<N^�:���� �w�eυp|e¹�+�;xs=F���$צ-B4A�x
��Ԡd�YG�]�䒸FEl�?A�f��V�0��7�AN�b����b����.��Fb�qjQ�� x�S}X�ONy�7�Q�='����I���h���k��
u��m�7���4��(a`+JUV�����!���O�N�-Ն��+o�+�[��� g�K-�%њ}匛Dq�S^� �r�W�:�RY�P@��AS�&�����CB�h�.5��i�1_�o(�$��? ���IӾ\6d/�G>=���Ӫ}s��[uT`�n�N
�)'[�0̷�kЁ����d&q���u/���x[;Cy~�D�w���	��b̎�Hy�B��j���bI%�A�,�+|��H�i�����&�0 a���O�������M-�a\���pu��1�p6��r��r�����m�"���4�A��&Ԁ��7����<�����N'Z;��~�y<���|]���
E��D;�������5[�}(`�耫��;>v�AE�&���̼2I��Z�u�mشY���f�p�H"81�w��-�k�v臤o]6��c��sDtYQϙ�D��jW).��p��>곆h`��!�������&�;\��׬	�V�^*,�-B�L�Ν�	�}��"\i��oET�J3+Ի�a�C#�A��2���A'�mu.Z���	B� 9�Kp���O�#�.�)����LOΨ)'�y��J]Һ�7n<�,H�ϥl]�r�h��UXo�jy5&��Q~�Ml���$��� 17(O|t(�e5��AH�Osb���b���y���ً�iߔ��7�ԉ���rLg��r���vՃ�.�����2�A_�&�����-
�����,;��Q�i
��y8���}�����U�%�	��n	�׃�6��m3+�?�:�����7�L`L,G�}󬭸�����^�4C�N�*+O�,{�P
���r\���j���ܴj�ý~���;�q>��� �ϡ�1�+
�
%3�k�"8�	�G>K�#�^�����YۇK��I�F
�����8�U	�n�;^^Lٸ�PQY���Z;�y%=CYu��`5YI�x��`Zd}ٹ5FPC�z�V�$HW����S�ҶQ��Iw�� z5��eۙ­���AR���R[���Ncߐ�0�ڝ��[�a�l�
�ӎ���k��Ȃa� �O{e[W������|��!�E�����;�P/í�곞�!6���I��1�w�N�w��-,t)���i�(�_T-0�W\T-�����d���H�����D�a���W!�rx��r.~zǏ����մM�ux�{��[���!Q#�C��&�
u@xo�7\^��_�D$��/��}FQ_��+�����<����c��WPZ���M�_�C�a��TMx��
�]c 0��:�D@��r�' 	�G�e/�>��59T]%�Cơ���cV�Rv�G���_1�!�s~1���������f.�j]t��k\�<a�̌)o���u�6��>) ��^�m���{1�f%��� 2�uu>EJ��MGly@#x?*%Ф"ϱ o�]R�C͑"�������7�|{i��Cj<�n��}	`����Q���q0`���c�7[`�Z�ܣ��@0�W��QX�q����i��"9�E�,���B�� (����D$����m�bz�k� r����1��n�������Pq��?^����
�@�M�Zv�-�}��xVJ��f���*HS({��3@:�+�R`��9�;ҭ�.��;!t��X�fc��l�(�HoS5���j�&�JK��Ws�
p��f�j�ޱ��d��n�ꘈ�*]kBj��M��
0֢����D��A;� <���&U���w��?�v��³e�����z�� �!��|qV�;���־�ss��V16�e�k��2 � BKܼ���R�s���_Q�.9+��������>�))0D����g��?
��*�8D���'$�_H:J��9�!�3�<��^;��9j5��`��Y�UH�߰��;��sB��w�'��
�ت�������"�����h߳��)bU�IA�/c�=Dd:�D>_�h�R���0�LN4�$�y�d�sՃ鸍�g�N*�[�\$���	�d��DB����ь�x��A=� P���ֻZtC�	o�=a�u�*հ��}:��D�I�]v����X�a�
V�,�{�����/1�J�+2N��AO� d���ɮ�0�Ú�f�v r�; Έ���'㑠���S`Ɇ�[��q/",�<i-(��Z�u���}��9�]F�޴;��Ҭ��![���-�J�v5�`��ڪ��o
�\�#h����o-�6����5��������Z���	�K��`7%��e�I!K�&� ���l�2��W���enE�󥀼�H:�>�˄)L}?V�ι�3�o�2c� 62�x��I0ʐ<�!�Rjj����M`}�N������_@�#Q�+�P�:�f��Brp��
[gmұ���:{������B4��9�p�\N����z�����I�Fͮ�
!��m���!Ef�{A�2n��3z����0'�
��D�yX@u�k�1��Y�B���?�H�ߟ׹:m(�ghw�H�����D��N�sF1�&�%��X��W��!*�AS� ����ޢ�	&�^�>U4�KB�g�[XB�Rs[I�/e@�jg����w7��L'��a��f�p�ar�ɥ�y� �Ul[qgה�@i�[Q��au��7�SK�oi���,C7� Y����8���eo��
\�
�Az�m�>>'��8A��:���PZn�pR!�+��j�d�D�D!bXa��9y�=�=R��L���<L��= Kk�s�p���4?<�#�흠R?�zB�EX�k2����[�o0�����c�3&��(M\k6KM��g��ϣt#-�7�v��HZ�@.��lC��8:�`�����#@����ܳt_�)�AT� ܀��ޯ.�����u;c��k���(�I���:���WA�u�E�3�y��Ʉg�k~[�|D�P>��H�4㓥?`�>�����n �a�������5�ơ
�zN�ӵ'�e|NKz��+h����l♿��c��Ga�"?C���mh�!KS��Z\#� ��W��e��U^�ܷM����K�v�ǖ�i2ʟ�8Q�l,����v�*d{2⃍ɿ�)���p�#.��<{�l��[��P<�o2��/Cp�hA�	}EQ�G֌�xY�Ĝ�q�G�������l�Ν�VmRu1�w>��Q
b݂?j��B����ϥl�@)�cLG�k¸�O���_Zɍ��yC����rK8}4��+ͽ�E
.b/�����=�|���R��F�Γ>�m�2Wa��~8~7�L@pv���y�aѲ�����u`ym���w��A݅�AC���&�Ä(N|�4q^kep�^���t�9�P
W���^���ۓȆ�1D����N�~vW�`��^�oB��e�Z����x�����+%;'|cX������$�2Ae�xl
�ng�M�:�@>;,SD��`@dzi9����Y�$2���M�~V�p�/�:5y�����a�wWM�t� 
\�A��@��w�C���
>2S�@f@�L3�bECJ/�PȠ̡���"��Tc�؇&C�<2�:�G��F�_&��" ��A�f����R/�iIdŁ���ts#����I� E� 
LE`X��
�X����
�B������vpﱾ�z�q�c��pv	�吤�&,՗
P�CqcI��B�����/������
;����$�ɋ�i�71a1%�q�=�N�Z�R���}��A"�h��ܽ��V��H=.�����3��z�p�F�����9������6�5� �ɲ���+�8K���j���I��$�	{��/KÆ|?�\�^�ɀ�Q<m����e<�X���f���Ψ�n�nK�_�� zw�mwmZ3��%�KZ�@�6��3�u�[�����kWis����Y��^f�]��U�a@y����Щ[6;��f����zGd!+�4���*��/�w''4��VN�tc�ɘ�t$�!.�:n��Y�{b����ܓZ��cC�N�_��١�T�h� ya�A�|��NM�n�>�P�M�=��-0|(U&�a�b	�)�`����؉��<��H~暩��?W�� f�  ��h��gI�Q��p�of0�Gw`��l�%��@��pn�5PΪ'�!Re��o��+`<��Q�>Ϭ�Љ��?\�X����O�h��9����c}%,�c5���/�x*�w
|%n礣"�z���J�3��d
/���a��y�ɵ5�$�Gϧ�ݟ���2���`Nu�� �nY�o\�&
G�*c�� }@ra�NA�؍e��fEcF�AN�����P� �{�z-�[�D��!f)��Oz�����z^.>�-s�r�'�E�dQ�Ӂ��2�Yt~�^O[�~A����lO��������LM�`���q�C8nr����� ���KY�Si�����O��>���$�R��r������=x����(�ه
7[=3u�q����)��pjR9�je����*+��
34ىKYh���xM���ˍe\昃^̎ı�_k�H�~,s�.0t�n�Kq��
"�o����UP6�!EY�*ڛ9B~С�]���O!��O�_H7P�"��Q�l2�#�>���a�^�AL������)��s�5i��]zT�����(�k:w�	���dM:��a��>�0�|��;�n�gM6P��d=(0��!K�1��Я`�CA�5����e��c[���I��:���gUp�Ͻ��Ű��ӗ�Ϗs��y���hd��1��\u�F��b'S�Dt��T'�$P�g��8��4�`T�g��tkz�+���)0�"?Kg�v�n�����Y�\"�"a(��ֿg�\X��֍�AfS�2�u�f��Q�5��E�8h�D��B�!壁ΐ}�0�WF(��jF�
l
��k��Mk���DȈ�f�L�G{�]�����x3,����Ra�_N��P6��Y��p{kC�.��3�	��\Π�/�=�ʊ:0�d�&կN(�:���
f�Av�����>��x��U|�2e��2�/�yV�+����2���a䀤r�������[��³(�\��84ź��~!��%{�di�h�a2���}T kq	�Tj��G��YO�pgy�Ip6�[�m5��

ԌА��,j��+<_��1f���`r,�cܝF�O>�����3
!��r?�n^��}���ު$L�A����2ϱ�8�S����ek�J^��o�	VW���!�-�ͺ�l�杁�Lh2�j5�����nZ7#e�}�&�6t�-�4X�دY��H�:�$�K��_�ܓ7���w��-@��a��-:0��v\-3[c�*��N����{��jZKp�YM'yd±�Hz�E��;�~�\z@��gջ�1~�	)���F�G�c}�ʧ�U	}◽�m�O
ͣ�,&)��C)r�2 h��=����z��Õ5��x!&��"\�2�����A����.m��[V݂ 
�ݭh<z��s��0�/��i�+I��6�6*A	��l��+�����F��4ł�6�q������AV)�Ȯ�n>	�
�@��<aV�2E�����Ƨ [G%Te��[��{�����쯾�}����{�3��C7���w��PWGS�_շ��'��jv��Ʋ@H ��C���mE�EJV����-��L�6�S�,C}z9��s<�ߣ�j֏>}��p��/I-�����{+�Y
���$83ټ�~q%Hk$j �&f�헗{��@�4k�B �X���L��j��n�IP��ϵ�l��T����"��Y�z�N��䜺.����{���6y�k�����+�@sG��c2R827�uq�0��L�AP$�N��H��N޹��[���pD.�bH1E��%�w���"��M`4�S83�_4�7���h^�)��Z'�n�e`���O�4��<&'�_T����\#�mӅqE��Ub6�CD�W8FY��ksP�[px}���W�b��b:2
��

õ@K�x����r��al<��g�`k��!�6_s�yN���i<�A������
i�;.�RFE�gɌY["�+󢉙�w��z᪉O|�8������-H�W<�An�Ѐ�����q����R�W����=ˍY�7�d�9��T�D��O�-����,|t��ߟ<���#�)# ��"߰2e|�'�e-���h*o��]"��K��N�]HQ����������G�{n��x4'yީ�
��`�5��΄�.���)��'��ꞇ�:K��yy�����\�*�_��LN���������|��ċ��P��^0�Krp��;�쨧���b��G��5h:<�&Af�"�Wu�_�E��$�+D�#����P�K%��9_K�/"mK��M�0
^�թ:��ʪ������W�B(*�cJT��ލʐ�v�2d|�@`aj�f��^u��)/;0&����Ho�n�qʂ4T��4������a%�w�+VԮ�=^��V���AC[�Q1���
�V���`��l�����El���.j�RQ�*�~�V|�3�R��0A��=-gM�F��w�y��yQ]���Fu �`�E�l���Sc���3/���o�����ƻ�{|���o-�P�J7�;�@�
,������@W0?:�{n9��� �
�CMc������
�{{n��`�]Y����6����4	��6CM���u���kʎ���/�8G$W�b�da[P�_)a[_���uav6H��:��yp�2B�P�/ ���
d]֕�˂��z�uq������6Qp2�&w�DHauiD?�`�lW`>eɄ����/���|�=f��gi*���D�M'.�6��c���`�J�m�R,�/!�w0cz0��x�R����xY��X4�Ne��wic�{J��6WC��d����ނI-r^�k�A{h�ǃvɲ�̃���G�W;�A�� ��L��P8S�}�>d�����WRf��A��9DDz��?<~F�S�����Dk#�Qy�Kw99 5�Yp��y�-xA�9\�9�,^�Z�a�9�Z�.B�(�Y��j���{��!�"i����*��7T>H ߿��Sޑ�2"�w��~�ٰԁ��+�Q���	z�r�9��k\���=N��v�@�>��e�_�<n�]��ȴSں����dǳǙ���xg��f�,�K<1�,��`X{&��{�%&�g!���֝g2�3�>�� IX'|�|�tD���1������+cT��m�#Y
�>��ȨP0�VI{���X�ۑ5��������"�Y�A��4�����KR�Ж��؟�	G����`i���ڛn��P)��̞�i��qm�R�����)�����v��CO�_��=JEX�V���ڡE�6U�&�郃`��P��3]カ.�����6o��:�j5���x�����20�4H���+ǩ=�iOC<�=��y�#Z.Z��^c���غ�|����@}
,�� lɿ���!;g��/)��f�6�o�\dh�����;!?�А��E���ּF�j���R��<B]�n�C�ly�ɩ��3�WZ�o�њ"?jM<��;Ad�Y��k����A�@��|��^���1�L��~Fٵ7�������Ӓ��V%x��&�B�FtQ?�K��z����8�b��IGhsZ������3�AL���\�0�u�!٪G�t�=h�D��m@B��
�!HE��(��ZU�*p��=y���+�R���H���5N�d��.\���p�62��-W{�AY�H���M�@�D�����*���Ln5�
�x�O�-��rNd⦖�bv�ݔ��9@�F R|�����._�IGdU�ũ��|dO~�%�m�Kz߼�qk�MRm�������#9�7�2w�K���%�_z��텺�C���/�����[FQgi�؛��2[�Y��� 'y���3
�~ȩO �u=ֹ�5��'l���F���A�7d�њ�r�%n�kl��ﰁ!��h���rx�{ټ:��T���^�L4���h�Ԑ��(^9�<��x��l�7�i�/q�_��_3{�B{�\���MM]v�����D��AV��^7��-��$�}��
�ұiY����(���!����H�o���D���$%�"t]ew�[��u�%�����-CVr`Z���:��=mp����CL݈�����F��
l�?�8����������}
��
4 jL4أ^{+�lB�K�_0|��Gկ�U8'
z��θe��S���؊�-~~NlT��)�< ~�~� �}����"]����Z��7�z�YgL֔���W���xK�!�ӶŪ:��S�B`���,ɼ$���K�i�����PS~gt�F��Z5!�p�V��A?�����x?qu��sf�XَhC���w�����(�pfv�":(��J��/�W�����mcV��N��?[����Z�m�%T�$C6�5Pbm�0�A�k��c
�4	Q��,p�3�]�G�gMȤ�N����)?hh"�l��?���ѮtL�O.ҁN�C�G1�d��M�2M�	�^�ZLq^��j��ՓK�f̛�T��RH0A�q!�l� t�v�E�$T�M(�bK��&�5.4J�'�[�K�p���!����s��Z	�olߵT�H�{$a?����AS������Y��Ɗ��gA+ܵ�q��
��iZH0�	�E��ñ
5q]�����M�c^��1@�Rs��v�]s�7Cc��H�����!ٲ{�K�����A��
�����:��Z�1��קvG�W�P8� �c@'���5�s�Am���2zi�!�9������o�����^�9��yz�(6�	�S5�H\�Ƭ\d�JI�I䔊��*�6h�%4w� ��[�>a/oYt�L��ΌI�c�ɼY���w�+.����י�ʂ���̥��|d�E[LS}�ުPI��9Oזz���b��6¯��-���E�?�B�,�T��nl҆b5�IB4T!�y���M����Ns|Ͽ��$�i��^�N�Nu��ƹw~!��S����Z8�_�0�n���W��4j��zQ?�l�t�yt#n�L�=]���[�E��Q�d��w\��:sb�X��#�b�mS;=�Z�~>��g�-9ތ��{c���~�b�[dE�W,:�4�AE�����=z1~�_���%x�����̺�I������f[E+Jc#������ޤM� �H
���?�Y���$	��'�l�m���+�/��̠�3�}UY�VN�xQ	�THc�4�I恶�#�h��[�ƨa2�j�{{� :��pL�8)��i���J:��?���.`5�ln�ca��M��.����R��p=o˦w6�g&1Z��O!�r�$YY�q���m(/"�X̔l Zd�y�2��g�����`x�p�Rj�/D܊���J��OAYW�d�ڥ��{8�ØnB��A:���i��8�h}q�=9�&�%9�t���	41�����<�AK�������qJ'	��y�Su��'Z��*OR�(z��=᠖��O JaLfc@דUV�����,
r��X�qMd���d��bo����W��E���G,q��@3(������I\��2�u�#\������g�*¿fi�7RG�/�.�+�
Y�%��WB�(��
�gd0_�$!(g���b�%��3C��~����>� ��}�G�2���$B�X�t��gs��u7�����[ڢY>�ˆF�J��ÎG��مd��K<(�I�]]�����w|����o��q�"[�\�(���x�=N�JLD�b\���N�U�wG��"?���1�]�Ey�AQ�L�����"������K�_uͳ񂘊�d�Eu��Ì�v�7-���V�|3cG�k2�o��T<����Rz�W(��c�1�W_��<�QJ��ΐ��TS���Z	A]$�����q�1>��|?�쨰7{����a��W��4���w(����Y(X�O°
~��@��ș^�i�y�Tw��~A�����"T���8��`���m	#����w��U���$�A�A�J�=���,K�_�� 4��X�#M�g���t�/�**W`�uH	K�h�tL:��8�V��㔪�/Y-��7�BU��]���5Y�����Hzy^�o�ڏ�
�0���K��4�K�_��]>Sc�].�N Q��NVx�0�x�I���)~�`��K��=�	��Ij�/b
���0�sd��l���ö��_#s`l�I��	}Z�����"c��t3�>?#�ė`�C�GX���:��pMd�\Ζr�A�D^l\g�hPc*h�jQ�=Z(��t�.�VVe�ȚZ���Y��t�R͑���������+�Jǃ'XUa��reR�k�U����J�$'2+�pD��A��t��U�P��"��f�Zq6�{Z{O⍄�/֑|[l�e6^��b�E����o�_��p�0�g���i�5�Tg�|�����3`Z\�zo'=�<m�"���?5�m�"���,��	gl�O$E��wu t��bˤ^$�8K��g�-��l�|t߷��I�s�LX�oL����[A��6��\����Ol�:���!Bh����$���3D�w�-��4˖�O>E&�B��&�	/�W/�򷃘����䛯	u�eP"�Zp��+�;΂8��Q�|:1�?l�G庩 �m�|�;���)W� �Gx�,#c�^���mc�ǥ�V��!h.үݚ��h;��r�n<�(x&��ѻ�����t&���㇗�)��86a�0C1��G��u1���`KkA�]�|px� E-���+�/4�������xU
z`�=ZJ�@�32?HD���b-����q]E�&��@/��=�ڹ�E
ҙ����j7��N�A�.a�7
0�Ng��j6f�P���k��Jp���~��g �NM�[��Ri��d���ʶ�KY�ܒ:pk6���9u�o���ty��9�W\Q��L��ju�n�)x��h~�P�i�޵�����7`bV����y-�5���ǲs��#3���(ZJ�a|�Ӥ�5XW,���X/����Dy���t���������R�n�oYX�����j�9	%��qr3�΃��
�:���,,��c��.�����}�`0�U�]����I)�r'��-{�96�]���b!v�\�?#BWn�Y�)&��g���r|�Y�B��
�%0�-�]S���2��c��3��tq.��_�X��<��8�[���/jN,v�]�gL�0 ������i�,i����Kߜ�0ְ��ī�Wq�"_GWA�w��OK��jy�X{ٷ��r�|���Y�cv�\�W��ͱF�\��6�M	�'������~>�BV� ��Om�3��C�}.��W��vg��2v�n� `]duPU�eb��VL���5��|>�����H4��������j��U��lpHSm:�o!B@�V���X ����� ײ"�$��P�a�}�<A/�\���ݖA[��f��m�=	�@2Z�_q��<($:�Ύ%����%�È�T�ߩxQ�t�����m��됹��gK�ƍ�n$;A.5��o�o���
5�#h|yU�ު�߷@z���p�K��#5�	>�:�t��`�̰�&/�	`0�:%�������=-V>y��Z0�Հ���= es"TV1�6�)ͥo���ʰ��G����$���E(�N�?��4�n11%�;�!���e+�_��al�2����J���=�v��IO��f������$gl1k
���~b6�XC���fg�n����F�s�P��z�Q�nvT�h��ѽ�Ѻ�~=T���bsW��MRH?�!�_���gЦ41$�eV��fqކ^�Ђ���'80�n�}q�6xXq@���تb��|Ȍ���^h<A�J���(�y5��3'��R�	
ރ�9��C��d�ml�s�}T	ٲn�A[�������f�<+w�uv.�M��5r�yix���[?&��R�L8�uS\�*����ꠟ�s����c�U��;3��|��_@�v�"g:��o��/����E�z����V��r���p=]�xn>��:�#DQZ�����^��|�pk`�@yT"��w /�A��TJ!��	�2�P94���]/ݴ?3�Z���/3_�=>t�z�_u0�7Z����XHH�p:�%�/�{O �{�.��|�j�wo8�/QN��G2�Ӗ񗾥�;�d]�f�f|����m����?^�~��qYKG���LXu(&:�DR,v������Ȳ}Q&yS~��6��a\m:����Al�(��f-AEŖ��c�ʎ�<!�D��X%8�1����wa����u�4�`��tDt�ׇm��F@/򣩙3 o���t[�	~dI�� ��y�#�s��$�53��t���"�>�7hݷNR�"2�3���U�A1'�GZ�&4��h���5..#g,�&	�ԧ�5BU�j8sn��oTZh}�.����XZ�����ʐ`�N���HnH�
�Q���Q���9W�}�1-D*W��S��bN�I�1� %|*N�(���[�E
耈~p��e��>�T�(E��{�x�pV
�k�
b�!jJbih��e ���E�X�B�T�>1R=�Y����,���7ea󑈩O�VHw���r�:+�Ai�<������(0�+�@8`��ua��u�|lVx�:~!3y󿧱�KI���(�Ef�,�G�B����c�~�K��3!�����F�2ޭ�_3y4��"�z�8�?'�:�]�<���f���V�;�6-�3��w1������W�vё�#�$�n�l�u��>���!9钺�|�Ż����h��Rx��&G9���ܮ6Z���VdK��b�q����\��S�f�� ^��k!WZ��h��R7��ں��#�gk#�D;˒����<�O�)Q{�a��ٔH�Ɇ����9z0��;�E��S�Aj͗��&0?�-�?�������x���p<� �`���[����h6�t�[s����#r���Am�P����r�Jy��V�*I��B��x��h���ĕr�^<7�Ķ��|	�&��2/;G���n�{ �����]٢���b7��Ȼ"��վx�oZ�ӄc��`��Mqo�k4LV�p�#�L4a�����=��j:������,�����7��:�%(-�a�V���V���+J�OY]��+`b ׫I�t3;�7��	���@�XE��>��Q��yͷ�m�x�
�6h��7wz�zB�8Gw����.�畠-�DV֪ۤݣi�x����Q-�B�0�c� e��;�N^q��-��0Z����'8 W����6�o8yM$8�<�[��@ra���0îp��rI�B�x>�1A3
�b���At�d����J�̭�lKW�pF��V�#qǱ��sd��'ކ�~Ք��p�*S�AֵFS��|g���b}�&o�T�x�*[�F�o����"Vş��&��_YR�]�N� ��TP���\A��t��y�N������]��X���2��S�j���beǂ��E?w:��;��sJ"3���>��)��,d���OP}!a��k�7Pӽ��v�38+Uy�-�t�i�� �a�$h/�~+,��B�q(
�@�����!���2u�Tx��.U�dw��V��,
5sua�=��f�� �I��k�*�y�Ө� �q��,J�v���;��3��]�Rm),U�[�!��-��Ƈ�5w� ����6z��B��x��{6��z����Һ�
����\�vIpF�t8	�G�B���-��Z��4�t��go޴�	���*cE(�)�f����:
�n +����1�4,�V�����
n��OLwٹ�ln�Ђ�a�a��]H	��C��BEs�&����ը���Y���Ա�nۆ?�,\� �ӟ���
BR��]\qaD~bvH߿�.o�����{�ϡ�_ܦ9���Z�����I�:!�ݾ}�v����wԯV�HR�����rA,�k�����=�Tn��
�#d�%����=�@5����T/�4�����D����@yԸ�C�La!��^�&Ր�������y��j������zt
3`a�A�}�S�'���R��-%~�whQ���1��g۟�j�>x��̏o�Ě&T�2
��k|�A^�Ȁ���D�(%�������
-WT:����/C�͐��ycڙ�*6S1��i�~Ȧ`�uk<9���ך-����)_����W/��}�M�ԏ#�͢Y}�r���+��բV0���J�;���u��d�:"�~/?�2:X��U�ܺn�f�F�k����08뙰c:ۨ ���Rs����gM�On����pԏ_����{�ɤ�C
���^���a~ɳ`��O�򉕛���W��s���X�(�>+ct	]7B}��7�����eӋ���v�C7:��v�m9��?-]��g�VTi�uwG��?��OEhx�����z�:e��Xi������T�䏼{H 
�o���0"=�-�^�3�[a�{t�h/;TE���^�M;Wϐ�sn���?`0��&�B}Y\�m�(���/>'q������c�)F5f,��� ^�h���l=J�\���V��IfՔ��A�d��?h�5�x�gۍJz��@��Ǭ�s�c�C���+<K_Q.�����16B�:W��*=j�h�^�J�K�kTmG*�{�"(t�P���5'o^��
K��G��8��&��B$>������X'�_$&
�&�/���)܅l����d��lO=�f�Rg9�	]��.��N��>.�Ŏ�#`/l��"
���<���A��e'�zSg��^j�B(n5r(�2:+=����\{R�D�I�d<�s������
����%㧂�疻�+���4������+d�:��0}�b}�O_�A^�T���B#&v�Jnb�c�XH��z"���G@���`�*��}�Ĳ�T���x�a�xS�&��$7R�h>��sŽ�(,���[�A�aI�� �����zzi�(��"<���(Rda[�.l���^���r������y���:�KwG�`q8�&,��hm�tǺ�
�E�n�{���H�[4U�	`
jC�)���2���_�Ae�h�����;����X筘*�/� #8x츌��	ٺ�a�*s�F �'�Z�w�jt0��Z�o�m3ø+'RAp�B��`�j̖@���K$+Y	I��(? �q;�¼��"D�X.P��1{�\H�G�*F�����@��oH:ιP�������O�yb��<����0���M>߬���H/R�8�9�i5	|��g�� ^�iG����埰^`KX�C���x���~!�?s�'c�D���QxQH�I��xh�qj�#t�PP�Au�Lfϑߣ[3ѶH���h4����b3��t��G ����[�&15����A�$�@�������N�"�M���?�ē.o���D��n{Vk�S�[Rd�^�A��|������	�D�� OS��vamm�/������j�m��(&�x��;�Zd�����M�\݉ڐY�I܏\�OV��VI�ˍ���#*�ǖ�����A���֞ǞB�Ul�[����2�V���rA�l�w@}�-;隝&��CZ��s�%� o�2u��Zc
L�VA��j^��Vg�/���bbDR�B�\)eίHD݅�`'QEFq6!Ӹ��^zR�9���[|/F�d���%��[�(�O�b���D��qz��Q�W:���tٖ�}�PmT�xCYN��E �e�z��{M�!-��-���C�e|*�o��D��4'Xk���I,��#ovp��������j���RF�\N�/�]���>��Z١��^�Bm����VD�3H{ϸ��Ǎsy
֎�d�eP38sf���Q�+ՃЀ楘����ԥ}>WXɿ��PL�V��6� U���9,�����%����¢�+B-�#w�]J7��1:"�	s��2�{�rښ�s�z�}'F$��uf�Rd�7^���Bp&XL�uˬ�����ן����p&A���0M_Y���i,�~8��Zx���s7O������)��Ij7�����y��nT ���T�֑�Eؙ�_�(�	K�n�@U�M�@S�M�Z�����H�c�G�_          ��Q��M
RR�['��l*��������]s���ҍ^0��Df"�9�TX���~���/��
��c�t�渨,�ݿ����>�Ꞑ��L)�ײ�Q��G͎&��V,#LL��bI$�a ���`	u����I2z�ݿl��2��P�%�#T��� �H�Q~�A ����L�m���ߣv�'R�B�ϲ"�m�M2�¶ã�\u'�S���@�[�t�x��oD9m�y��2�-��Q�t���)��5,BfI�C�Ģ9���1�1۸ړ9u�z�0�4j[�I�l��cJ���U��RdD���G���tg�ϳ��w��S.jD26�_|�H5��z~U[��?�~D���`.�0��k|Q���ؐ
-�"�]�������D�&�R�XY���U��;�K�F�"�UQ�_�ec����̄�;��,{�N׿�@�w�0�m'-qz�o�e�u��D�F�<��Nڞk����і�h�=�������1%6�_�L�?���2��Vz#��A���L�������J�WBM�2F='N��z�=���?�k^�;�E�Ŷ<��*�#uÌQ��2{O0�*u�������u)߇l*�2)����7`�X�ʚ��qzcg�E�T;6���	���H
������p˗|�Y��v�</F{7�H�H	�7��b�L�T�T��j�'�Zʵ�=�������$ó3@��� p��a��C��A"����϶yK�țP(�+��ۨ��ݴ[`i���ޖ�e椰��ö7w�"L �\�yY�4
V��C��2qM�Ju�0M��(���. QO���k�7���&����y�]#}�Զ��`E��2��k��i���Zߍ�CKy ��������\���x�@�i0�2�5�����ڟ��ﭮ7�Cz{7wv�I�@�C�y��]� f�V��e򝱌"�;�u����̉~N��2�=Ir���=#TW��v�a��O$+�>�k9�(�*t����݉w�^>)d�t^���A:�0��L�k*�n�{t�Y
4y�[R��̏����Ԅ5qm���˛+�+������q��s��9�싧6@k�:����L��3QX��B����f�
������z��&31�B���vo9aOvz����h��3Z�w�O!p��z�
���ײ*�|�E�����0�C?�93*��$,�bg'D�;�,�AӁX���Lߗ�F�b0:�1h�G�=�:b!�֌�ox��\l�
'�/��Y7O�P�P��d�{�����@[��d���n#	.���p��Y�c����i�cH0��f�V�yqCDC�W��|!/ͬu�p/E�thB2r�}^
�b|��>4��P6����P���M��Lե�AA�l����8�99`��o`6�z�NӀ~��ڻ��6��Fa��r��҇Q�/�����)�*!R�/k�
�+s��ݡM/u
�セ{H���?��.'����"��}��OD�%�F������]_1j��bv�Y��
�ծ�Mf.�P7�=�KF�K1
��}�y��|`�a7t�@�>��t_�3��s)M����5="��ߓ�����e�Ӝr�gVu�|�ܑ���Gs�)���`[�*-�'>��Ew#_�Y� pcl���>�����'u��6�tV��E��B/����|����^zJ8�
\�:TVp�j�Mq��d���є+�������Ӝ��2�� �x|�`	�GӉ�v�.ǳL���gpY-�����x�bM��L<����(_����� �7í���>w�}�s#�� 7mJ�BD�KD0�O�e�����o5�b�e_1D��p��R�6��=/R��Q������5�	�c>�[�z���7u���Sv�d�ⶩN4Kn��&,��.��p1<�'=N��#��M\��q>.���fiH��r�D(̵{#�1Ly;#],�kn~7^�W�_D¦Z�c�9��ƎkȈ�A�K�"&X��@�2�_؟��A$t�D�
=����X�@ɻ��+�KX|��!ͧ���<�x�|�����\Qy	��]��"	���~�y���<p3��W����6�t�ߩ>E��0�wK]9/��͖���~u�*��a�3�3^� Ԧ��ӋC�Ô'����"ނ=e	���B��t�"����kmN�q�4�A����1���%�wq�?B�1����?H[.j�}�#�=E���N?�io-Ӿ#������x���*�nB�(O����p$�!8�?���_��	X@�!s\���i���s��/){3�vX�()g���0m�(��g�`��Vǒ��0t��G&�?r���>�p�P�b����`m�qpk�端�������\�G�IJ�r<��k����}�;�'�()�/H��������.��yGq@���3ʽ�=�X�c�e,�A�������0�cC�%�x� q�-zS���y�Y�]t<Ϥxޘ.)t�
�9.�i�� A�FNQQr�r��w
$j�[:+�<vX�@��i������*Č{�7��1]��ٱ�m޿��t���ݏ��!�P�\k���X�|ԥޯl?2�\���SՐ���� ���g����2z��QQ�u��W�Q:����P��B�Y�,��w��L:�ɥ�]��gg�"�c���򵮠t���9��}�H1�Нf�B���^k��E?�A?�Ѐ��څ*��L���%�Q%2�����J��JY1A�M�@�M]��Ka}֫q������VYS�{˒��2��
���G�,�Q��$�J�@HϞ�;�$��gg9p�aè9^z�ڌ�Ѿ����l�هEoO��k87��%3ꝀŹiD����vq'�W��,����?�U┣¼�4D7k{��ն3�jKM�E�~CQ/��xic���q#o�d��kL8Ȓ��i�yȽ�r�����3���m��|[|U�U��ȡ9h�(����qT�Ź��B�7�WuP�=�U�p- �'���Uos=�Af����*�f��l� yF$@�mW���.���ߐL��#h�s�>2��3�)������l�7��� �4�Tދ���@y�^hc�E�[P�G)��2��:Y�`�1[�NQ�Ĉtdq�?�%f�M�!+�'����Ê�y�X����s�?�^F�ʷ��U����=�w�\N����������L%O]�� )n��*���C�@���ވ�5�8�ðk5|'.I��s�� u��@:w%NͶ�gu���b'�`�T��I��(�F�� ��:j49�����~R�X�=d1o|.�WI&7��Y��#7~�4$�%/���ʣft�{n�j����ӥ�S!�c�}�A|�����
�����>�2��8f>L	q���ݒi��,W-����݉b��6Lю��	�x7�1�k��o1R�u?j�#�#y���4O���+�������XMF۱���u��:Cส��Z�k<��s��!�cV�B�Ũ�_�l�������W��t��w�4k~^:,c����n&�rk�r��������@Oȅ�[ �
��g���6�mw<ソ�ӯ��V^���R���!� �"�ac5wY�~�l�3����x_B�wW3�~z�1�q>E~?0>y�;Ў�s�Q�q��Hn|nj�1!'�{�A�� ���1m�����U�b���B�t{���J�����M0�0���c!3�5�|��n�q����o��?��\Y���5=� {c�̗<�~�4Dڕ��,�f��Z��;�	�s^�&�CLɧ���<�VQh��_���<���ty�`��
p	iCX\�+�������M�gnٌ�K�����i���{�A��4���0Cɖ$d̯o=dI��s�6eK�<��SQ.�9�iUq�ªd�2�.}��Ⱦ��ot�"#4+�e������q'η������s-��?�m�R���|L�G#�>����p�V�H��Z��~}��sO�<�����h���Ƀ֙Z����^\�5�A*D����|0��h�NR|��#\�����Ƙ����uҒ�[p��[o���EW]Ak	ޛ�=�/��e��?^2um��)zJ��s��W�T���!Iƃ)pj�Nj��4Uw�=3P���#n2Nu"ti�,G��q�$��O�k��$�OV�bk��'E�l���w�d�t�T�{+Q]}��l�y�i����cŊ�G�ϋ�
�Kd������?ә^���R�8.U&D�� A�N;��^�7��3����� ��u ����b��x��z�"9��-��7����ЧDZ`/V��#���y��E<c��@� �@���#�E���@@y�J����+����.�~!1P°�6�%��,Ld��LIvt+��*����dh��ۙ��,J��]����Q��ñ����&D�KǑw�[?��J�9�|A�V�;>�[q�t��Of�z�΁G�l�}@AWP7���;��!��d��_T�A}����1ٴ�2��}4��$룝7�� WP��������M�̝ƍ���A��mw�ZBd�݋/�\�?_ྲྀ��l�k���A~��'�{�AÁ\���
�ٷP�;��g|EH	�W�|��_�/Y/���p��v"�����@��� XTl5�;�P
{�krg;��B��3qɃ��ŷH�B�g-�!Q��f�n.�_ϰ���
MEuQ�trz-�$�	�����Æ�/�T��.V�+�AU�sU6�\ ��7�P�bi&
���KH�N7=y.
h�ݤ悬_^���5=�ǚ���Uq:�@�a��{q�����{j���u(�yzcT��?v��
���e�ҡ�"g|�ɀi�߹�C��7��[�I�(!I1�{r盀.9���d S�u'T��r��ب'���Rgb,�ϵ�zOԳ�Ќ��3��\�������O�J]�Y��B�p�Ow���;A�YG$d]�T��1#��T��8s.SQ�� �|k�aK��(�,�gn��d�Ə�>�� ��| r-�Ƨ�bhlD�% ��5�R�8[�u�Rzp���v����>�5�"a���������0Ԑ߻$L!��D��Iq��5�%�n0�� \������/
w�d-�A��R$��<xP)g;��5��?�qu���A)���E�eU����#m���u����X�O�k^�̈�Of����'3���䬎h�W����.����ϗ�}�G�C���rs�<�-��Æ�+��6�"ֆ�/Fq*?�4�o��bC�A��c�p���\4U�����/o�����~|�I�#b2%���{ͨƾ�{�B4�����
پfu�B��^P2i�l�#�0^��ײ�������)�j���<���+�u�la'G����5�:L���Y�^�*�1H��l��3��g�Q6z���5��6WZ�"Df�]�襺� K������S�!����_�b3}�(���le��
<���>�F!�.���w".�N�q�
n�x,�S�O�Y����/$Jϝ���_��+踌��P��`*<��q�^�R�e�ng����q��S,P�<Rj�
R�.H���Կ3����6��k4�@x 
��ڿ���Ѐ�u�j�����xL��۳z����8X��g�� �`f��3��o_LQ5�>����'�5�C�H��Do��؀�F�g�E�����HB1�6��v�.
�ڗ��~�z�1��rP�3
�)+y	���ǎE����71)�0�8Iȹ���ӛ8��j�yC�LIEf�Ӏ� �����/*�:F����{��JNB��J�t@�7�1'�� �����������M��]���i�R�j�7�Ē�a��["���Ԗ�&Վ鵼6��� y��Y7[��x��XE�Wi����6�����ҊMlP��?�u�,��ۄ�)����Q9�c�����Az�����`�
�M�MT��n�@������
�w��1Zh��p�C]X�}�V �)Oy�Yns�q�*t=?��\7���D�;�P�������A,��N�p��m��A����^o��^H�އ椦M�[���\��3s/�q�$��%SBh�:�#���i������b\�9໳<�s�c��!������{����^�J�]F�I��\�d,�m����������u�UC�OE$V�3c�b���i�)�M���ZO�BNsn�4��EE=A�w�`�5����4��^�^��4=R��Z�6ٲ��V�7�L-���p�)&L�,��K��M�ݡ)�l�K�3��hOF��c+vV�
�sz�O8��ِan���il7���~q��/�
#��a�Ud~{O��s *�b�N��ӯB�eg�\��/v ϵ���������&)v~
V�	ɏw�Z�{Cd�f8����ܹ֘~q0m�6o�4-CS�������Rj�G4]�߮�
��6���2�?�<"����쨁d�y&w�&�.f�@�SBe/G��C$��(���y|
e�d8���H���j�Ꮜ�u�ڀ�@ۺq�ණoؔ]%L��A�Bi.�;��3�FH�AY������ҋ���p����U:�M�ծ]_G���tC�v��&��i^vcѐP2��V��N�w5v���qVq���0U�'���$�e	:�bu�v���ʘ��Jf�,�B�)�Q�K�x�IfSO���W٫��(�!���6�3	.�W��"�ۋ<���1{�ǐ�6`��{�_:z��
���I4���΂�V���s��`���OF�T�[�Ŋ�Cj��
��DC�֖�l�\�Q��ݮK��e��?n��[��gf��9�K�LXj:�Qm�,� �h�b��d��^�
R���{��9���P��nĺ��	=��q4,�2I.Ĕ��sfull7�ک�AX�	����v�nO�z��Yk��8-����,����)T)܂�:�2_u���pe�t���xUS_ S$w�u��3�h��>JSA�G�H���`nk��H~.�`�t7��!sS��Ծ�3D���X��x��.6'��: ���D��ቹ�(��pR/
���#��rFE��rǃ���)�C��dG�������s߱�AK�	8���ɤ@?�0��VN`����J\9@i*Fz����j"�s{ g@��z�v	aE]�څ1��2{D��񌻂 �N�dU!>p��>(�y�G
@|M�P!Rr8�I��}�B/�����g��d����� Ӷ�E~_��&
߃Ȼ�o� ���޵�n�Tmnb�����/\	�/G�]~�h5����Ӵ^�J�[ħ�J����o��m���K��k��G\���g��jTb��<���
%W��Gg1)0k1� ��A��	����(���h��i�g�+�;�+�\3f8<�p��[�J7�gA� �楀L�pzp̪��330�R��\o}?��:ѭXM��z�D��O�ml����P�p-(
���Pe��6Aןʪ�{k��3�`�U`3.3��*�!�f�03�4B�(�
����^�)wZQ���	Q��_�J��9��
�ٶ��7�up@��~���u��Ϟ诸�z`"�S����	l`ـ�~,1ՂJ�!?/-Xw��_�of����^�5V�v
��|�u�A?�	�����R�Zh�|aSgTG9!�x����}�.ja?�ԛ��F#
���)G����iU�r_�E�.
�[��>�9�ܮΨ�O/��ǂ?��)U@Ϸ��'k$= ��xڟL۸n�Cl�
�@[���9�N�9.��=�A�;Q�Ĵ��Ű�Xx-J��:�s`Ӣ}V6�=�#^�/�D��X�}�(j���r�o�I�re���:��M-�� B�k(���AW�	Ā�1�(N�hfq,2�Ic��.��(bP6���X�}4H�gq�����)K.�O5+9TFh��|~��5^Y����~H*"_���j�������_�8�У��ʲ����y��\|׬�
�I�7�w����'�ֵC"���
��F���\�t���5�<�n��$p.i�*�c|�;	X�ݽ�2C�h�_U���u$�F��;��p�;���]
�FX� �7�Dh�qQ,@.�3���B�^��Z�Uq�A6�Wi`,����HWaZ�IG�:Mb�]d8]�<>4�$���}�����(�јh^�L��?�n5IHXE����<�k�,+���n�m��O3jl��ˑ�Mw4��U����{.��M �t?)��� �,�+�È�V��s:#�����Ռkr6�
�"��2���5x-��A.�T۲_�mmq��9q��1rV=�ʓ ��s��	u;�AU�
 ����#*���3�гC�m꿃]��8��k^T���M��5n)�����#�ԥ�Uw�`@aM�>�<mΘ|$8
��c��%�bk�7�ax����d��}K˔5��)��H��+�$u��>Kq���M��ڋUI�������)��))�ނ痷�(��|C�뚩��5 �Er�If��dȪ�iJBG"޺�lUF^���*XEc�2:�r&�����*���oC�X[հ�Y�q�����1V1?m��Q�f���e˰v�C��p�_j���q�t��d�J\r�7�Y�םvj����
R�
��I���s�M��O���:>�}�&>M��	��D��"Q���A6�
���̉��]���eB�8����;ɪ��X���߶_�yW�=�	W3������|ϺoUż���e��A�o�FAG��>�ݸ��ֆ��v�꒯�^Q��渫,��{[w/�=�+j�~��<3W�l�ۤ7n�⸍S�<�J,�44���K�j{�a*[ăC���fʑ��p>4�S��Eo��TO�+�"^�&�g�|~�H��>����%j��RVo1-���JĈfB�b.�� l]�������X$�3���yr������t~��SH���޴OU(���o5b����V���i�B�{�AF�
(�����s�@Ce�(�]nZ`�{)���,�O�_b$����ɻ������1٦��=����Nۍv���iI?; uX���}JLA���EZ]��w�r�b�jΝ*�Mݟ���>���M3/�x�*5}Cy����Zd��C��n�$~>$1�Ec,��o{�+�ۙ��������X�����t��y�w�uj�Ve�l�sT�È�f#�~��0e��(5���5R�i���y�7fl�'U�I����]
܂"X	��'q�ݝ�,�G��`����w
<������d[��] ,�.H�H�
R.n��~�|5x~��"ce#��S�"�.�C9�Je��g^�~r+s}��:��[��dҵ��wЬ$qC�p]�1�G��p,=��0��/��*�:+�nύ*�^¬�'�b��";����c���}����\$�����
�����.Eܢ�&�
�l4�G�F�8���$�RS䭏�Th�����[i�
P�����
Sa����R��-��
�KJ���C�(���ge��DDlI):�'�+�J�h����C��p8kg�C�A�mOZ8�H�i���G٨&���Tuf�tq�C�a*�$AV���P/�I�T�	�y�urTд	����
<����	\{uD6� �p3G4��M�}��<6� v���z;�� �=�O6��fV�<|.�cc�cR1.԰?�g	��s�O�	��< ��\��T6�Y�a�z�MW��:d����.�O׀����E�ܱ�ŧn�c>�}�ӈ-.S�4��E�}>�~�)��;�LN"ut�R����* ��³S��$��7;{�A�
d������E}[e���"a��k+�e~����Rx<6�~��ٰ\
&�읒RX6d�%mk��@dԧ��E�����Z��Y��c����
W=�ݛ��ț�顳����zx��!��ΣB8f=I������K�=��5:�0#��Syk���@{p�Ù�Ƶ�k�yZx)�m���3����2��E:�m
x����ݫ��"g�e�&�Η��,�����b'��w�S�q�:�N|�6�ڐoQ�瞸%���޺X�dS���5D+O�oe�ͳ�[rI4�����숻wu��#w��'#��ђG��ͬ��H�Y�ɮ�V(M��
���&n��V��stȉ�
��������45��^~	��}b�Y@�����uR3��d��SJW |sY��1{L�-ܚ�����>d;��/5�7�1J e��E�Vm,�T@C�%�qi�h��S~j��v� }O[����;ݜ�t<6�Ã֓��Ok����?P&�XuV=�x472��H�iF�
�����,�sYM����˥x�w�	O��R�yJ
	�W��\�e����;q�bIP7���D�x�W����2"a���]��Y�ʡ>V~^q*���,�Y\?�y��Y{�A��
������R 5����t�<�H�`�Q�൱��$�@v����]܉p���e�ȷf%�̘f�s�w�F .�����6�p)��/�����e̫�����w�|��-d:R����c��T�s]k�2@��$j��1m�ֵ���÷dS?���l�x�L��f̳D��� ��w��p���A'�/Z�o�Z)V�$���.��� �sJ A�]�^�T��aS��$s��+i��0,��9��.Nl֘���y�.��̕�Z �ݚu��W�@�����@ʼe0�`1�oV�!$&Y6h,I��2��Wүy�+@R���J�K���f�ӱ'��Yv��(Q�Qd<��=ˣ��r�w�N�M�E��*=�v�g�1��@�O�M2醔�
Ȁ���rkDs+�� ����	��
G�{ߓS���+�dGz�D�MC�V��m��L��SW�Zxe�t�i���S�����Xq�7X~/G��x�<��9vÖZpw��a��������G6.\�>\�I��)*[g�%���GyĞ��y�>��J'M����L8�%$��/�"�5W�~Y*��L�q���pb�������u^��M�<u�hs�ԣ��"��G�qa]o�!b�3^���
9ȩǪb��1�<c�)?VG���D
�q�O�`g��~/�| M9�؅�?��R@���|�n@o�J�J'���F������=��"��H�41�"Am(��Ax�
܀��¬�Sg�+�i�sy �N&��u>v��MqXw���t�+�$����>J]�30К�ǲ~>�[�C�<�e�Fz�f�23�_�3<��N8|�sɡ"}&&�
�3�ԭ� c�:[z�M������#�zc��,d�Uh��7z�e���=�d�}hT^�8��A{�
�����|�n����
y�6��kNǻQ��P{��r����;������[����w]�4�dT�bs��5���S*k�d�$�Q���ϔ�׀fθu�.F,��5w�c��o7���sj��܃�{E�*��ur�TH� ��i�������̳ErV�z�<�}� �0�+��'�N�>L$� cu��=��uD���W ��U�
\�1$�f}�P���`{Vly�42+���x<+�FA٣��AÞ�c���={N3�`F?$�� I{�Ay�����I%�����&�$�Ʒik�<mC������Vсc��"��7��3����0?�സ0[KX:9������He�����b��O�a&��I�P�Н��yU��0v�#�@�N>�k�	 ҃���R��>eFԭu�"�E�0�pB���������F;�u:�i>q��I���^����,}����?1�j�x����� �oڥڭD(
��4v�[��!��Kʢlk�B1RΚ��&�L�ʀh���h���Zh2@�Fc9`[i��zE�ue�h���(�?;���1�	HYM����x޶W�Y�By���l3���j��Td�-����!��V�/B��o�D�Ȝ!qq@7��K{�Au�����!Q�9V��P��t��y�MM�yD���ͺ7����Jm7�I�D%Ŭ��0OB�����Ɩ]�3�+���@Cj�J���/p=�ڂ.���5s$�!o ��VG�>�
����i��st�8E�+R�sn�)#N2D�ٓ]aH���L����|�c\����|��񮩸�HL9SS̊�r��h�ϖ�X�没�_�ޘ�������O�}�оqr�&!�&9�6����T^Aw��_�{tE�Z�����rY@P'���R����֩ќ�v�s&IZ�S���%�.�Tjc�Syx��5�O��i�o4`l�l�i��@WW�Z��M.���
)3���@�y,������������g�{�At�,�����Ȳ����y���9c>�u�xg)E�k�o�:�Ё�>�@r�x�%Z�́��'��4�a,<zŎC�����K|��c������ڇlK��fy�69|,:J-��}�'�&�ל
}���&��&����p���⟡��r~T�����	dԀ{h����O�_Ks7���գ �v��z�;T`z��F���x���q��'�aŎ�_hA�r��@��o���yM�F�ч�T�p.�C��u��8Μ fW"��fX�e�l�C����R���?����3�g:�eKC�l�� zo�)�mO�6!��%�����!xQzm�"̧�7*�$	WE�����,�y>z�36�`�P���{�A��@����d���m.�O`ޙ�ɱ�+eh�i�;%B�d?9tL�M�����	�����;�
��%m
z�w�C�{�A���>�[��c��h�S7uHN��*�+��Eu��k�&,�:����x�_Zљ�"���8�LV�m�e�͌�A_?��Q`��ݘ��}�I��!�b`�RA����n�c����tD-'[�e�bL	6ķ\�[X����(]\�@M�hi%#����8���O�9�(4�D6��l���V��z�L
n�̕�Io�5��!!S"u󁚥}QޕT_�y^�U�*2*Xf��`2L0��@)�$�N����%v�a�:�=0`xp�;:;�pGV*�lY�͊Q��|��-�d�p�_N�	'��4:�s �I��_��,v�v<�t��X��m30�!8���3z�Nn����L��f�6��
Aw=��I���Mt��^���O�Ӊ�$Ep
.����Z���{Ot�h�Z9;�A`�h�������%�SQ܇s]V����	S��O�@����t
°aH�WEɟ����ߑ4��2µ�'�
z�-c!J���˓[4BA߾�*�	�
�����s�N�<��B����Y|H�x�`"�aK�/9�h�9��d�!�i���j ���X[۹�����f1�;-�B�e���9j��C����k$W~�(���N��!e���H?������k��;�X���[��+��T��MRV�o�=�w�����ݳ�!��M,O�
��V=+��
@y�h��{	�obR��V�+�������"�"@���m���H��G��9ȋE�v���j�$<� 2-I�0��e!O+��� �k�6�V�Fv���?A�_�љ Ww��LN���&m�O;}��xd��lK��>-�f)4�A�6�?*"�u
���7��ol����Q���,aM�P�<tх4��0HW}\=�Dd0���f2 B�JO9����=A*��I�σ1Đ<���)��.���,7:�M�yoe�Y;�ɫ�G"���;�	x��_Bk��o��S!�&h�4�����T8`��+\$�%�(����J~Z72)���
͛I��`��[�~�!���d�����ͫ4:1��s�'��B~����z������ �^��a�roI�(Od��žlqaG'��W6�1�%��(�^h=�<ۀ�����zI6��M�U$�?��Q%D����l3V���Wըt��˖�刏M9Ô]�4x�.쇳������
zMTYf��9
���$��{=?_�������OR����s��m�s��z�c�/�m]�۾o����j��ݑ�w��b��N�m:��f��A�"7�pM:������	�AG����M{fq� ��F+m�����+�5�����^{?�UR�!�q�a������x�n@�$%8�	��[�(�5��u�����;�3a��``u��䢎7���&d�P3���oa`/:s��(������&I��p»hxJ4������m�s/�y��6�2�"'�����o�Tw_��b�=ޑJ	ګ�<at�[�S�L8�Ǹ���z5��i��-Y� �k_��03��(��52H�m<��&Uޠ������&��\#K~�Z4�	����K���zLf9<߾�H�����@}v8��_��n�k��q9�3V"A��߿l�Y�A?���M���b9��Y#vS�0�I��4E��4�a���j�&��j�'�� ������)�1oz��:-���p��J2���8|E���}��c��22�Eد������w�����kL�lp��]��x�j}��s����圖�Eۢ���
��)����]����K�Cق�fj�
� )��O�G+���æW�}�2&�d�R�*�"��]���s/�
�����={�3j2��ɺ��/j�}��J��������ǳ�����^H�>�F�}�xЭ*�Ρ$���Wf�[{�_���p�b��֒�A��F�6�<�
�ޭ�A]������FlYu��x�K���Y`�}zw~�60K�0Ǒ�{|\
٢���<�nex�i�B�b^K!���F�B���'S27^yt�Rs��[s+�z-#�p��7�U4��6��vy}�2�E�"ذ�_R�8�Z̭ ���Ѩ�6k����J��>~M� ~(`�6�VUcT�}��A��!�����
!��+��!���A�Z�>��������B��d���3An���|��!
3Q��i���nz-!M�Wvg�G��A�5(%`$�^ή9�P��Q�l�6h�7���5r�|��x"sx�hb���%���m`�`G}�È=�<�rj
�[�|c�a��B�An�0��1����V�h�~{֌jy�d� �"�&���������4_+�������s:�T� �Тt�k?3��$x�E���-_n�R������B=�i��,=��T�Ԭ�|�h��\\>E�c����_P�6>�
A�Cl�!X��s�њuA�8�6���Y��l���t���>��$p�<;��}S�����ힱ!+�K�:�6Y�v+&0�u��{7`�ƍ77�{Z�YJI�:E�6�cJ�|��G�^yݧ���+'
4r>���(��p��`S��U��w������j��Ay�D��1�C�z�_]���mkvI�(Je�'Ӝ�ɕ�Ղ�z���b0��U�q*1c
I5F&}
x,��k�+��k3<A	�*�w���
�Vm1�h���>.���RK?ב��N�w�����9+[I�	��!�(��?a%,�f�����F��I��6Z��r5Iy��Գ�V�FY��}%K/r!������7����6�"���!SQQ�~E}�~.��+R]Ϸ�͞�g���CM%#�`����>�������[�R�w�>K�q�%;�r��?dtgb˚���㦮)�.Uh&�-jq�*aQ7��t}ݪ�`����0�U|q�	rV����d;b�B�Ao�X���v�^K�6J�7g��Pa^�Z�a�k`n�Ҭ��ˋD�Ō/SQv�UX��?�x�J1�0i�Cp?;~�_ۊ�+��A��"�.�U��r�����)�F��-�K���, �!�֥��ʞ�����G��Ҿ�Պ�>P��{ej��Ί���&`a\6������#�CЙ
���;!�H�z�V&Ðt�r+ٖ&�}���������Ll�e0�8`��HI�R���T��V^Is�*cs�i;4���V�ѤZN��-�V�]#�
΄�3 `���>Y'�_�S���n���%_'�ֹ�.����V;�j���3�i���A��5�A]�l���x�W|@kg~�5���ڽ|\���Nª	�; ˚;�H�ꎎS�8�)�#A�~������Ws|��XS�����/���·8Oٕl� �
�4<LsE��.J��R�s럠HW�at
��r�����YP>���u$�3�@K����� ������K����� ��5=�5�lwγ�H��6�I�h<%o�ߘ��ۆ)�ʨ����ˢ���Be�]���#� ����t\Vc�C�=|�?�8�3 �q�X��	|�u��9_���0���Wʅ���Q:��NǄ��S�_�|��m�*|윙qS���J@[��.��U�m��1g���g׌`���Es�|D'�,S����>���h��y�A�����)8������vgex��r�Xz�F6 g�C�a���r?�
 �>�j~�{/P`��N��jR`��U��J��o�`J���c��B_䁴���wPړGt�Z�o�x�m����f�E����WR��D"9�s�������y�S>��~�RԖ=�mpp��m��}
���m9B��|�8D�c�É���� ���0H�L8*���Z�)H��V�͇��;-�v�+2��I�i@Bmp��F�� 6� �m��(�ݺA�}�I��*�z+�kSIO}�~�;�͞�80E����b�x��0s�>v]3?F%�Iݲ�/�Z�-��B}ʄ�<�Y2���T��V>-Vʊ��S6���[D��<(�d��$�p�n+�n~��&�.�L���d�A�ԕ�W:�h��(��O\���tZ4[�����v�a�
��<Z�B���Xg�<T�[w~�,�٧4�i/S>�!&Є��� �Vs,+[��E(�:��Z8��_y0��!kܰ���CVZ��7�߷�s�4������2�]�q,l�Й�ҳq8{2g�����;6�C\Eq��dՃc\�x�6ic7ĉ��S�
��P���xW�~����S|F�!e]����Oe���M
���鍃9�P�m>�7>*=z�����M�D�Y�_v�.K��Lš��l�������u?x[�hF��D�"?x�
C���"z�P
6�;��+�� ��oy)�9�T�G.���/_|��?
���m��
�7n��~�AM�\Kc�#�N�{pE��f�����l��]Y�7�~M����n�Y�k1��A�#�	K�?9$�>h����b6�AQ����؍3��\]�ܴ���%�%�q�����p�xw���-T����z-l�5�?��_�؇����BӰp��kK �ػ�{� 2Y�M���4�P�ܐK��
a�\����7#=�W�	��^-*i��TAlņS�䆘{��'��9�(e��,�%;��2�b�� �=�#u�K�7�AJ�
��#6�s^Osꍩ7L$�&��}R6p:)��x�I.��$�U�\�0a���\g��
D|�_���WR&Ci�&���ٓ���a��R�m����oa�0	��lkC/�l1}!3(���l0T��#uz��__��(1��t|�-X	�<��h��2��\ O��J�=%�aJ�-_�L�!8��[�<�J�/���m��v���NSyec�����t�4��	v�%�s&�=�A�/�AP�
�N��UU�a�a,��H�7��;>ğ�Yسse-����ZQq���uP���>v��d��+��A���g XJ
)>c���ᑟ���ae��~9V����}��)B�+�J2��O17�����;�SU��9��;u�[KdI�r>/s)�EC�Bo�z�l�k�$?�P��ԬN�/��c�JM@ԐQ���{߆��<�z��$O�6����h����Wu�X�x^&�� �=[Yy����N��:�7�w�3���cGEi�sgn<�W��Lvq����w���Sm1�5��� %�t�C��!o�l�
=��؛з98��
2H��2�
���f��q��z��ȩ0�\�
WGX���kJ�T�"��~Ju��kc�IB+)�;�郛�8���~�И��aLgu}���~0�׀�8���]W��]����F���[��ش����҄(
uيW�%3᪾��W��CQ��1��UhJf����Z�%��wט�Pxo-��(y�y\J8B��>�D'�j�L$<H�[��Μ�n�Iu����.�F���M̼pUưh�����R�\��zf���CPwC$��K���YU���5[���A2��PwA�ֹK�G����� ��B��
�7��Ab�
0�G��� ���K����<��Q��8��W��,mk�n�-
|��~$mMe�cg���w-MF�Q�ȗ��Ȍ�pq� ?XxtLb�Ǣcmu)�\������N��Aѯ��n𵮧���Pˀ���1�Q�&�X
A_��Nr��=�[�����ڻ���>���=3�ײF�vh6pO�P&��ɚ$.�V�:�t2jD���� ��o�qx!K��_8��΅�|�q}E���ի�nbu�+_�Ϯ����C~M�c�Ad�
��4{�X����9�g���AY�O����.xR��XAP�W��/�H���b�{��6�X�u?q��E]E��XR��3�74�(���Kw���m
=�X)�t���K�P��[���4��
�F���z��d�_L��z�/���2*����Gsjܞa%ma�U�+�d'���%��ӿ�*�nX	��E�+׉������:����R2O���x�An�
��F$�!�ʑ��-l�G�}���a�t��gLR�m�
{�~0鮕�(�V�/�R4C`�Zd#�����:� ��v��/�8Y������*q�6�x��WMuWn	}�u�R�x�_�qI��mF)�BfNr��>�| ��cĽ���3���.�#<��[��H��A��
�21���>&�i+\�`��J?V��z��3��u.�?���,�%aϸJ���S
O�n����#�oz�@��e��>�<���
��(<=eRrz�p�-���^�+*RɭrZWj�*��k�V�(2,�˕r��Q���٣A?���/�W���W���q��^n�.��
j)�V	��m�y��t��؞���8�/�M���%�|�Fe^��4�����q Qu豤����_�v�0��$r>�Cv�G�La(��Bɪ�ZK�G��;sA�a]���|����u���\E�"���<-�wx��a�����+��+���/�-��"O���PP��}��N���8�K�/܎����0հ2x%�0D0��HMY�L �
�Ϣ�J��o�}C
+�з�%�h�f�M����"�<�;l`����;5��ԁ��{j���K�7\�M}Dma�9�n].�vC��h�3���f|�Xʘ=�&��AX|�\7c�b�����{x-
%�s@��N��Ad.��	_���U�2vn���D5�������b���T���xA�L�`����'8���j�1�v杽N��9���з���UZ��J?ˣ9���
B��~�K��a��;W ���
�I¾Պ�$����mC��4p� �4�YZ���B�uJ���P���B���눳:��x|p�B��凓/w`EţAq�L����[���ji�荄�~��`��D�.
���I�>8w�G"]�o<���_&͊;��������%_��ӏ��0��ŕ�է;�T���>�M�r��U#l؁�=0��E���ت�0�6�uX�p�"ָ�*�oܣo����B\����,Zjp���;� ݸۚx��ތ��u�����y��>>�$�m�:b+�W�,^��N�"�1V���2ĉ�Cv�*J>:�%
 l��ME��G�F2�v����K9��ʆ�jV��؃7������P0/�.�͏�W"�#Rg�1O03Exb��u��C�����Q��ʟ�
ܞ�����|.����`���T:S�u:/z��@��% ������>׾eY!/�5��R���e���|��E8(f���,�x!���?�4��編KX�� �T�JT���>�М@���(g԰�}G��(�$m��i�� K������l�:ZE	�a��*ŧ0����EV���x��j����V�-�T�t~�[/�d	�E�X��S -NWNϣAz�t��N;������.�|���]�

f~%W��O�`[$�J����S&�&�c�rbc=��U��SK��� ���É���%�-^���8;���m��(*��([��O�hY�`�oA���ԁ��P��@t�z�cV���6��&@�Q�L�u�/Ӣ��	�9�_B���i���zx<�f5�D,�����OY�UQ ��a�b��e4�B��ߧ\��.-U�c�_�G��q|�6�\�J$O�$�N����u����I��
�z@jhK���終�s�N�Z�"����r׭�]h����=�d��8�lȭ �7���f	c����y?���	�~�i���A6n�T�A-����}���-���V��ޫ���ƣA~����L�M7 ��[j}ͬC�ʅZ�R���_�^�
�ψ��WyK<�QmQ�V �0X��~k����L����چi����}~��:���^0)�bX��ƿl?=u
h���5�	.����ʙ�)��[
�~̗�u���ȚK���FXl�՜�P�q�2��W�Б�o�1��G����~K�	�нlU
8�rQ�;�z�+ڰ��> ���Ur��,[���X�/�#
��h��1JU���0Tox�
E���v,�U.��'��ݵ]1M|ͅ��W�v
f�)�ʑPK�NI|=~q�w��������� �\oJi�9�YJĨ��/����R���%N���Ӣڂ�pR����iއ
n	 4�Y���S�U�����ɳ���O�6F��h��#4�|�X���W>��;eɋ�����a�'`?��~�H�7��a5���[Ed���iV	?*OزCB�;���m�:��X�0�[�	�
/(��
N�Dz�{d��hdcc@5f�s��Q4�����A��Ā���`�}33����:!Bq��j��1I�u.A���m\-q��?4�IC�Q�.��
�"����d1��DH�W��M�LH�����;������;\-�ѡ1��A~��B�Z�%��ƍ�2fM�R_˴��,�D ��a�k'�S�2�W�jp��>�փ)��?	j*yQ|V�WS%�c��.ۿ?!O�B�V�jn(�4X��:WZ$8�i��YIC�r�
K9g��D��b��vteg�p�{�X ��� ��ݡ�pʠB�E�'H���{�t�9��e�)t�����'e� �vJhS�gN^��{�5�"|a��&&�Uۉ�+��m
��w��t:W:l��L(�Y�|>킦����C��<[e�B�R*ay�;����;�G+���&yE�Yd!�cr��� ��5O%&��t�ּ� <}R�0V�s��^����V�J��͹��޼���U�=���A����a��9F0���|�cZ^�~h�����|�"�����RhB�F�?���:aE�R�\��8��n����k
�A����9Z�-���VE�ȋ��C�$�`ѓ6�d2T�Y�7W�3"���V��C�;��݅ڇ��z)�V���Q�vU{�p�H��A����:�ʃ$�3��j��G�
B񲹣�O�L+�=�wνi���V0-s�#0��]rI����X���G✁���b�{w�j���@�4��x�X�׏8��Y�f���Cv�!���
�AT7�0��ڽm��!�z�~������RX1P��Xy������	�B깺�n=�|_48nNvѓ�]�?(�z�U�/:U�$$R�7���Ԥ�i�͎r�j��4��2��Ai� �������P�%,�Z� �d����x�hx� ���]QX�T���;V�p��0��C
[F�
�����w�<㇄@���Wu
a�&p5 �8Df~����5�Q����ìTg4�z.gv�-�TK�v�;�*�-Ր���:j��{�9�ݐ�k�����Z�:B�]K�i�3r�][��9�5}�+U[! ��wN���?���3�Z9�ꉜsM���z�Ǹ�]6�f�_�c�
�S���ɢ�YlJ	� :�?s�r�E#13���x�o�BM��D�֢z��Z��$��7b�(aX�#�D��*k��U4�Mf�KJ����"���'�d�����r�P�^!X��WN��J�"��o�o�v��	BЅ�@��y��U��&~0
���"�J�p��R�#���
X�Z�;4�OR���ޠ��@�:�.�6��K�2窔P�k;ϰ��G�Ǹ�q��|�g
�N����S�=e��xK��{�6��:�X������LC��k���`�������U?�q@�#��$̣A8�<����u��Ŗ�������Z��L�Ў��΂�?s�^����onc�����j�$]��Gye&�Xgg���:�A��qd�]��.})@#�{�A��Sqm��Έ����>q��ß���#�>�:o�� ?��n0��&�̲�JZeE�CM�-9 ���;(k$N�����=�v]������@3�5>�:�7�9r;
?"��F�%�!���BfbD�F֚c����M������B_v�=���M������	
Zl�x/�4��Y
 ?	���r~�$F�īuJW��AA�P���V���ΐ�:"������X�F~,�4RhYa���H8�=e+��+����!1����]�H�o8�	��:*��|��}Ұ(�&���B�R)w���oz�9�9�NB�kmJ�T	r�f�������F�@��*,���_���k�e3��i�+��N�{�����V{Ye݅S gl�yh1��Z�?���xϾ�����C���wz��g&
����)Q�'�GFRp�ܕ�j�� 9�b�,�Q>��ř�S�������0�o�.� �?A1j��s�����ǭ�@����R��:�E�)�|���$��A?�d����F\��H𜀹)�95������T���� q��?�S.�)+�Z�ih�>a5�u�W���}����hgb�Aю�3M:�Z̳Wx�a���I������'��
_~o�M�ۚ��jK��-�\dT�k��0����pfv[`�d�.����A@�����
�W�l�_�0ՂE_/J;.WÞA�L6�* �莓��Z�����sS,�� �h�Q@����7]l3$X�Ձ����K�TyCv�rQ�*����t�n�XM�h�`~�֪
�3��l5�@1E���uYa�Z�T�,)uX�T�[)K��T�5nT\Y�D:΍M��%�Ӟ1>�k։��Z����X1�֜��ªl)c�^��䴳h�6���a���q3}R��6~�<���3fZU��Y=���B�:�����v<@C����P�_/WP~?WxV��La�&`{��A�0�|�芵�Wݵj*
z|)�ޫ.�ɖ9
�������9�d�YW�Ck->³O�޿��A�ӆra�F(�b!N��/��5�%���M	�0�T�;?�P���>�X��!��{m+^%�v�0_:��ua⸎Ko�a]�.��Þ`�K����t�<�[r�Լqn��!�}�B�厎�3%�Y�?&�snpT�U;1���i���Ǯ�T�N5G|���J��[s	����12R�� 4�KA�>\b �����Cl�������̟�+z�m��~B��!R��P����_O��%|I;pI��'�qD78b��A7�Ȁ���[�]@y��� G�S.W�,]��8��Z��m=\�-_
��l���wON��b��f��'��
�ty��S��p�oܝ��㺀ʃ~���,ܺ�ԝQ_��	��\%i�ʓ̉��9ѭ8��1�
��V�?v��C3����ȏ�ȚF�^�3�4�Ղ�u桻��l{�̓�������X4�hd�c��Ї�����您aX��d�.�H�.��|��zM�[����vO&	"��L�3��2\(��P�>��*k�;ϣ-���4Ɗ�����I�S�Hg�9o�%�KvA6���טT0fͣA2�܀��~��s/3{�0$��7�҉
��w÷���v�$���q��\�~�%��^�Uo`��4f/��Z,��O���𢎯�?�ᗫ��T�􆬁��v�	ڬ��B_"���p����[�Yj3��̈j�e&�k�bUK��a!E#p�l�������>;8e5V�%�U!M��[zȸPN�@V����M+Њ9�V�~h}2�&��ka%���'Z����	�[���{�05UHO��8�pc�t
=|;?���$Z[��Q٠�˴�A�	��| E�#�P&���L��r_�4#���8�<\^���g5(V4>���+��H1{��o'�l �C�A(c�\!=�������+���OG V�x�_F�u� �sQ���.%��>���A@����~�S�n�t�l˹@΋��j'��K�qaY~�5�|P9?�6�}�P���
�w�9v^���|���N�7{q2�QpĺӝP��J)�1A�g�G��${ ��r����^�h�T!��'�+4����m�*�j��@�H������J �R��0�<�@�l�V�U���~
�@Y�+����k�87��@g8���3��q�Q�#?a�v�Nƞ�s��l sv��bI՟ř�R�'���t5oQ�!Y3��J���������L� >qs��'?
���QGqP��Ģ��1m���t��3T�C�X����m4z�}�6��A2�,���7�=�{��w��%���uA�&����<����8m�(�-�,��M�qs��8�Lڌ��|�S)��NXd_^�
�P4��?��^���@F�$�qS��E7����	��I�i�@�&Y��-_ߠ�	�o��"M�u�{GE*��k\a{)�m
J���|�)��5=bRX#����7D2��^��y-�/�nv _ֲ�A?�@���w����ce ��I�Ee�Ͱ�#�V�h��`����X��h ǉ4&��Z���Y����_���Y�� #�$yTD��fG#Ug����1�59��u�� 	>Z��v+��҉����l4��2�36�}Qa<��w�T��.�9K��]�gS�DX`�V������A��_�m������*38�zb���H���J3c���_�|٦5S�;�샒��H=G�F���9��j��*|)�dP���?���f�5�Я�A1eD����ɜA޽m�����(W�������IDW{�W���N�ݐ���OI�]J�#�F����A4�T���}�l��'��Sg sp��#aS����@W��]TukmL�R�X�U_;����7��-;�r���<�A�Ҵ������
!y3�8���a�?�:�EN�f��H$�/'F�A%F��1�=�:����#�<�2���� Zw�����*$�$0S��]�%��~{��Aɲ]R�P�EV�o��������a������zs4�;�a�9ɠ�2I��#d�lŧ�dl%U��d<��X��2D~`-g�B_4-��IDUr���>t(���H��Z,/�wa���qQ~��a�K8{/uC���	,�tJ��9��A��*fd<Jx��'�
h���d�J�s pw�uN( ��p�QNY�:�����">�r/����a��g��i� ��}��o��j,�m�7�AI���z�<�c��V��҅I�Q$7G�|<�x�"���`�S_�0þ)�	U�4�����A5�����3���,'3�.�r��a)��W����y^r��V��N	���^���x�+�} �TS҅���H�r�S�;�t�D��Am�𾝦�����Ǖ��H�'2AF�׎��ˇY�[�Y5d�jG�K�� h��RUt��¼^�������t��.�8�!?�d�$I\��M,��<�΂Lu�i#�Cna�9/>f��.)Ȟ�A>P��J�вo�	��@��=$�/Y�U����� fw^�վw&u����X�'�<Ц��KTuǗ����oT��i.~I���h��Qi��A4�����>
��\ ���	��%Z���
yBJ�ぃB�eQǸv�RWoO
��z٦�'G5?߹�-����H�V]���˂rێI�Plާ�
�A�5��w(�얔�EeU���Q?V�B�	:rd��;R��h1���z��dBZ�����Q�z�ե����q���O��,�އ��@��r"eL)wRF2�AKGʚ�4:!��;�h���lmB�!W�d�s���"ή��YMŇ���-���?�q!�ϲ�]��|��#��É��$U��O�; �"��(�g�z��x/�|�~��G�<���oա�
}:��|奉]�5����h��AI�����֑1�m�nR��I;Ż�Fd3�c�mF�
��Kv��JƁ��ۥ5&�͌�4���K�<��x��[���ix���� � +Kq1q3.-�eS�5��_��H��A9�0��꩚�ܾR����Dc'j-Ve�E�ƫ�HGjÄ�늭�G�H_gm�`�KpOj�K;��;�axlaI�ݫ9(��P.��:�mO�\���c�!���h�$�:=PMV��h�[~�?��e�տSQo�U�D��E]�|�C������+޳ޖN������Y~�����Y����d�ץo�4COnk/��=�����G��r6R����ylצ�;��R�D(�5���Կ6�/1�f�Q;(�ծf*Tw�$��R�Ǯ��Z�z�T�@"3V���~��KS�!��8o�ίNN�M��,��G{�adi��ر�AV�D���͠}IVL�Ju��xv���0iڼ:��-�AD?��i/_|+z�uJ�ҧ�OlS�� �w!
�sүOp&�s��_uk�H�[R�@L���" ܇�x2N�V�e�0Qg�Z�\�7(��ט���#~���o�����SeX�ݢ�pJ��J�y����ij�v��y���Z"N6���ɪ���Q�q4˧�a�P�h���	�*Ϋt��R��mdԥ.!�B�.��\���F���~��}>@��W�H2��9���s �}q̮�'��l�s1Bqr�4�#2&S�)l�TΒS͐��ۍ?���RvG�����Q��@�m�K>��H��A3�X����^{��ɠ��U��x:.�'\@�3DR-��2H�<pP�L@ݟF:_�_6oR2��M+x+���T��	Č��/�#ˊ��7Hh7�3���
�Nɛ��6�W��r���*�9�<�6�..}3�}ۣ+�����eW~�VК��N0T����(W�eN�ץJ�����|'��Uy�`�Ъ�X�_ >a*��;��UK4ď�_,fG��pbީ�����>��Z������X,H��P�!M��7��o`)�ЖV?3f�
͇(�_��(��A)�l���ih��,�<��ʌ��P���'����qA�\����9��ò�y��4�;F�Ad�ĵ�����}HЃ�Y���(K[�)�MXKe^����0��Ѧ��#/>�uv NA�ț��Z�Ϡ�V�B?�o87���4�5Q���#�8w�~�}��?��8.��ٙ�E������~
��+�O�kk�]�{B?G������Pk�V:����
I5k���'׃��'C���o|�u������hrӖ��� W�N��C*��[�'��	}�B��t�
���^�3zC��$��j���~﫾�_�����"���v8��A.�����?6���\�Mۭ�7]VoUvc����g%
�9��dF�#xڢ��u��}xa8h¸���Y�ϥ�*�6PG�
�@!���2���q��h�arY� N�{��ܐ���{��.Rm~VbQ&��h)�����ʅ �N��»��� d�*|������Z�����擭^�ڸ^�]>L�/�w9�������I����.�뫦�M��5�a��{��6
𿊙���~(r2�7e�OڱC���K�M��!FvIn�ц���k��������'T��R�M0 0~]��n�,��[���j��^N���d����fͅt���k7���]�b�h�ʻ�g@7��ORK�Z��qH[��z���K���$�ƽ�S�Z�ZP�����<9XRT<w�X����q(��� y!������E>:�1qq���g����Sٌ8h*��B:�c�4�5��=�'t��R��ط�A;����L��	��7.^iEs[����D��]Z�=D��� �A������e���3^}�O�:AW�mC\���C�	�YC����X��T�ca*�,��<	���߫�E2��]yo�+�m�oW�������#א���R���;�d�N��6�o�����I���x?>T���a�o��m�W�c7q����2�&�i0�,U�M��A��b6��9�{m�|k����F�ʷ�����'K`��0@韛���־�\�%�k�x�}R�+I�t ���(_C��	;Pm�Ȍ�taU��C!�F��\��$
)�Z���O"��$�]��`��F�S��ņ�<�J��+a��wM<�������R-���$uЃ�'�J�[����~I��0'`��Jvͷ|&*M㚂��+�2`ÁG�Y~��Gn�G�bj�gg\ٳB��!1���]F��2J�@�� ���/&�o�?�������5�a�t�G:�iZ��}7��O�Obʳ�
�}��Wcݤ�
��Ұ�q���;��^bH��Q��x�z��9`����@p��vgKP[�&'���g8j����6��
�tI1� �tO�A9�\�����nH�r�݇�9�jBGڙz�!˺�^�
���ST�����ߦx���8����Ћi�TE?��H󡿓bYcY��
_��3,�}��K.�cA�
�����֐���j;���c^fC�OZ���=	k���$�X�oܫb];C�gI���١]m�U'kE���䢡>�q1�Lg	�c�S>0@N��ޓk��m��;mu&�9�|
���{G0y�ȁd���������)6M�7�Ȉ!�Z�I
�A�o��n]
;�#I�����%".��.�Zm^��EX�$�z�'w���&���1��+	D{,�-&�U�r°��rd (WH�t������7�|�e/~�ƴH�j�X

�G������� �~�2���l��Ou_[������_���d (�PؗL�>�fO�5�vo
 yRHJ�ʣA������U�mu����۵x`ddS��l�F ��E��<�	*���З���*2
Hy�{7ǎ9|�x��`��l�Ê�{^�Kq�i>M�n����
��0�u�3އ��(?^.��1��HO�[�{9p�� C[�ߖ�(��۴nu�F#Ί
�W,��R����?g�]|4h]*����ML��r� m�o���
Qu\���� ���tR����>��򿓷�#)��2�"oB�Mo����&�/�(Po�Q#��:>�t_��<��
�6�-)���P��)��]&��e!�C�C,uL���:���U8&D8 ,v��B���t̷���6P�:���5��C]�b�&�S�����
@�Y��uD���� ����Ȫ�+���B��N��Uu�U�M�����0��>�K�Y-�j�?13�5ؒݱ��X~�W���ǹ������3^
�0VLl�fڄˑ����&N'�o�=:��P���g뚏qo��}��8~�U�1>i1��*�}����R�
�L���/U��vn3�b��DG�I�:-;�����nہc>Hæ��q����%�a���}WoW��:ya��Z��M/8}<13V��+)[�0����G��O.\{J��ʴ��VtvFf;����O1ZK��U��SS3��6>6�B_�$��q8�Vf��#�30�$BT���Q%��=�6K�YS��SY����!~R�H=�b����ث3�!)ؚ2�?�{]��&��0�����,a��Y v�1������K�١"d"� H�� ���m�p��0l_Wr�i�bǇLf��<��4X+����\�����|�p�Rl��Z��9o$32A_�Hn5�-�!��U��O��<_o�H��@p[c@(���n�%��͝e��Zqyp
�U��8Q�þ�       �3N"���[ �U�,p�`{�.��s��q�aIq�MǼ��ӓ��y)C�PnS9@v/=�SVTO
��j\)F�?���R'k��G"�U�Q�����Ct�
��`�B���,[�o��ޏ��+��ꛄ^��%�T�� ��5[�8��N)Ag]�$T�l:(�O��ת0���+�?ء�6������N�AVf!̬c%���Ղ)�ndk�~F/΅8,m�>�IJ����8�<�U3�����%,
?�
]��2��3�e��T�A�L��X�"�oI���7�V���ϰ�]��>>,���I����`�bj���
n@�>�z�n�=�R12A�[�6� k�ڳU�@;773��8���s>���*��`��W��pp�y�A�y�A���Ӣ&�vj��GɚYQ�74rF ���_����Ŕp8�&E�0A��4Ơ�l��[9� 	�(m~aYg����8A�6q��٩�J������&��v�����e�,q[�5��'ad[Y/fr��0�f!}���J�-��E(ׇ�����A#�`��M^ ��NwY��F@p��r,M��$���M��u8 �4�:AN ���`���y��l.p��tZ+	E��vIC��?�����S)�y!̈�Γ�}6�a0�;�+��[�H݋�b�ً0�KVO���ۿE�Q�-#�M�����~e�k�����7 �N���
)�_>�nT��@.�H�����4���]?q����7�gH�@�8����?�1���w�u���J��Jߑ��v����d�A%����NM�c��Noz[s�[�캧q;aQo&q�8�>[<	tEOA*,/þ����!�+F=����̨�䌍��;�J�ѭ�G��Q�N��z��Ԧ�TN���c�.�fG�%�V1Q~2�a�m������ʌr�O*�]�ƀl���)̡}�3%���������OV�\�j=�G;�%_^73/ 6SQ��=�P^X�tMw�*���
5ē<�|"i
���2s�_}|f�b�zu�ĺ�u�}��@	J<k�k<�q�����Htu��.(]Mɳ.w!�^��+��A����1	�{ �Cӊ�J�P�K� e��e f[8����qiH�@ѹ��I���~Ƨq7/�����e5Z�A0�����-�@qr��)
>H1���A?�؀��X"�*Q�巐
f�6��������^6K�o��;X�tإ��X!���;G�s+�n�E�#9��ה(v��h�/a�
�!P2��TU%��٤ Z5�����-�d����a0g�$���Z���]AS�B�AU�(����0 �pW�I�g���Ag)e��[Β"��I��&��.])A��Q�^�d
��E�Θw�� ��>�M�7�k�t�ZL 73D�Gב��o���E����YAg�����������7��M�0Æ�ԞyG��r��N0�2�qu@�3��$k�	���&��3��t�.�9f_k��t+}��*4��4
H8މmY�AS?9�wں@8$eX0����a�CW�UJ�p�0I�1Qj����y���Lm2�$��0�A[�<��L����:�a@���Q��fm'�,��9l���Ќ�ݗ��op���V��ņ�@�2�*���]�r龺��%OW����*�x��C!WIi�}�Vgq��
<�|��}���p�qj���'s%X��(����~n�/�@~�e�X�8iŴ,R��?��TԲ[���}�S$��6g�q�0$]C��%�[�e�������q�9:��VϬ2���z9�r���������H�}>N��*N�`7�^[���ʴk3���'�M��<c�{^;�_t�f
����ē ��	0��wb{�$�^�JTvy-�)��1�����,B(%��u�T�B��B���pm�����( ��:h��V';oL��h:�CԤ�i���v*Y����%[[
 �/S���b�r�!�ظIn[+����ɞ�X�!�c����rWd�����Ǿ���IQM��hx#j/�j��X��mW�m�����ܹ��Ɣ�u!i��wx^Ɋ-��V5]�-;����
�l�h�m�U�8
3:?�����;p�n*�]}
:�
'���oEÓqɿ�:��IH�^V��A���:w�|�$w�1��>\
����WZ�n�tT��֧�ح,��JxSŞ��x)�K�u=�f>��%՞��_���bj�u�����-:)t�J:������C��B��1-x�����Jc�:���(�J�����0k��c7v�z�2U8x�o|��=H��0s-ᘣ�V����$^�%¹L���\W�L�#i3�=�����=��jc'�k)@�rDM��4�5�����op�Z�N����
F-�?�k�
�F,��6g�Q�EbB����X�ؾ��bA�$�L eJ��v��A�T�g�%���W3���/*<���J>#�9\�}���
��J|ؕ�}쬹�v�����.��c$�6�R���+V$�9_���A������^L۶���N�*�[K���ݝ?��)ɍ�É�yq��vՀ������@�6f�/�8�9J�v!`f�B�����s��uѲB�6������8�&9:��R�
`o�k�M6� 4t+���@ �Y���r�g}iGGO���=��C�p��qb��#5N�����2)��վq����/�:-�`��gH����E1Hz��oC�`����}�1���6f�܌��]�-`����������H�/��}���JHX��$m�����PѮ<ʆ�o[�P)���Yc`�_-B�
^WzҬb��(�իe����W�
�0�){�����YZ�Zl)$�6/Y���ӡ��}&/Թw�C�b^
�ɥ���U#�č��΀��� �F���Z@�xH�����_���A)������`/k*|8�����G2�h��&	��oK�ꄑ��Ɨ{��es&��S�ox���2��oư!e�=b�%>)	jި$���0�E��߬���R�֑M���-Gp�il���"��1[���A���A��܀��{�}J�]��0'Q��0[h ��<5�E��D����>�|H��'��4v��`&]�s�[o��(�����{0" �`��������i6�����؎>�A]�8ֱ��C+e��M��?p��[H�2Y�]s^�Na:���y�8)��XnnJ�׿箢	TK�xxG~b�
�п]n��fJ9�b�F�C��4�S�jv_+s3Sݚ��/Vp�6�ї@���t������W�$�3A��Ƞ��]�����Et�d�#P߸�5���U�3�uO�`��f��{�)�~�\Ủަ4bw��z����z|y ������Y�+�l�NF<���Q���%�]��#j���:��Ä�"w0�
&��ɲ��As�����S3C����lj[V�z���L�"�"�pi&�9e�����
1�$K5���j}KԬ��7	�W'"&�H�������TQu�VH$�pn���99c��7�P���4"^����d���RB��!�vH���A�����q���t�"0�͡�[���K�h��R���̺,ew���
G����#)�Uf"�c�?�E;%L`�@���*�G���ftf��a?wn¾ګk��f�y�N�;������9��<!Vh�9��#i�T��TέPse�.�M�q5����%��8 ����9�,��U�x=�
菄�����y�J)E}��J)�>h_�����{�;��}��zz"��2����|>�=���!2�Oj�A[���	D��IY���\�P���M�@&����֒����l4^�j/���Q|֕��q%�ӱ��C��*��ql:�ge{�v�.�:�w3��va�D���4��қ��fJ�~���c��A}����X���H1 �g�6=�_�k/|u«�s�c��+y��23|h"�=���f6���Ax]0�, z�f��m|�v��{ڴ_����< �z��t���}=����U��D��H��j$#��`:��;u�-P���B�G�cƛ$�]9��HD2�k���8~���eP�,�~����F�+,��ۚo��(5�B�/�a��!��%Xj�f���Vn[u��r1R�)�<���uj�I����>��4�{����u����-a��}n����f��֐!Y�-�6&���i$��a�eG�da':_Vܝ.�8E�==u,�D��mfȨ:���9Ι�!��b��z������
�3��6z_y�������Ae�,����\�8���E�4 4bCl�����'��G��{9��`��%)�QSS׶��oF�l'%�Ba���{�D���Hy�[7�?.��d�t,S�=0#{�6خ:��S���R��Yta�\��:����G��H�Q|娺{�@����(�J�Y%#����"�(�.��jh��2{K�r��%6Ǔ9ǈl�W���т -f��s ���p��AA���k��f^&��?����ˤ�v�~��̧-�;a�		I xS\(�
I�5�# ��ĵ���3d�Y��H��%�<f!����Ϝ
۪�l%�=0禵V5�k�5�[�(���T7
����� Za�f;"��P�B�OۭLL
�1�̄~HM+�;����1���^��,F&R��:��VU�M�T���@  pS�}��U|�M����~�+(�����s8�E�ݜ�V�&�s7�������9�����I�>AR��/�t��e1�fB���h���N�Xm P� ��~�|k� �mghT�����#`�Y�uT6�ۦ�G�f��CZ�c�.�G�C��g��9.X�;]�+bЬV����%M���k�ݗ��,4��9��5n�� �JO����@&���(hk��t����)�C��t_�R+��4 �:B�!<O���LOP� �#�ō/�U���1��nq��9-��'�����Vi�lD��?�ix��m��u!g�����]�O�r��E�fjb�A1�h��X���Uk
�2���``g=�S�D�S�90���G��CR����"�PfjV��CA
��7��Պޛ5��C`��b� �a\�
�o�I�����KC��{B����ߞ<��� !��j�v�l�s��B�l�?h�
��T��r% {{[U�y��������
b�x�êa���@0WJ���`B���4�}I��B�y5I)moۺ���Qp�A�|��X�h���H�8���~	a �l�󫱨�=�Q�yv�tv#�1�7�c�*y��o4DV��Fz��k43*w��[�6*dַ�"�I�
J�=���w}F�{��é��s݇�ӤZ��q%̭"G�cQ��_�`|�^-R��uJ�YO����o�yԆ��	=��+a���#��;�Ғ;�ܔ���u���A(����L�8|9ӯ�{�	r����(
�Kz����͛b��;A��̈]$4���V&�
`�T��q�Ƀ6Q2���:$�{��1%�ǑE�K܊e�P:t�?Q��z{�up��V��.#N���T|cԿ�AD����Mz�z�>4	�M�7rğ�JT@��#�jS�o�j���hj���=l�hE��U�X(��
߮z��b�t�VVi:N�9;��n5<��S�p�[׆[�M¤^@�[��l@�by6/�%��b�v�D^��lK-�J�H�h���`X�+�6<�f����� e����_���C9�]�q�w��e�)f���Ϻ�N����V���S|�?uGW�����Q�+g���\�jp'�hr�rk$R��[�n��nb��<��Cd����h��?3B�ɏ��K�X�?��ۛ8KV�LDR�t�Ӑx�nI�Ik���u��AM�̀�X�K�(%�}�ySJ�#��>а�{�!�Ջ&[���;䴺���*���Τ��OFq�p�����n�?�i�hm��:�ɓU�]���o��C��.Xn�A���wE]�oJǟ��r�7�q�x�9�S�+�������e���H���ko,���Q*�t�=��Ez��_=2+���o�~ו���κ]���ie��,�0�i��X�;�ŃqD�{l�,+��_��@D
iZ�MOp��τ�U��5J,���LI3�|u^^��\����[E��yYq@����`���'r䒠G�-	�����&;HX^���A9����Mz�?���eF4ζ
�-rb4�? M
e��ز����-�I��S6v��٭Ҋށ��+�L���>��(T,W.5�fS&L����ڻ\~��oN���f�Ua_>ؒ��\�
I�k�I�'~��+��]��-Wt�o�c�T:�'�Z#q��Բ��Т�·�xj�b)1����5{���({���(;�E
�t�����M�У�v?�8��׵�}���qf�6[�����@Ǘ�ʶ8�:�xk���!.���wvɓ��rDU��ӻ(�c!}-�A[�l��X�W��}����H6I �HV�X� ̦�)L?�����'�ʢ#�8~ ���ś�\�����a爝��!�Ƚ���p�ԍOx�v,v�:���XM���	�Ku�@\����<H���)��e�j��Q��\���6(�ǐr�?*~ٝ��ݲ��r���͟ݎ���2:�&ſ$�mk� �%�ǟ$^��Pۛ��i�^M�m�@���*L{������JF���d?�:F��g��)m޶E����̋S�L�C��[n��eJY�|��8�S�I�����/z���L|��y9:-�x^��꣨^�3�C����p)*�m�j(�*��<ĳM$#&�j ��I�A�������٥E#����f�K�c5Z�r�@�wV3wL���~���[�ٜ�?M`#PP�Z9^�d
��������m)8c���ha������l��ޖ<�An����LȽR;�
�����[�$H����to�1��%u�TX"��'������$<g���H�v3�/�T�|��o�4�P��:�D3���O�$,�&��P�o�
�7��d����J?�\�?H;4
z>����8�B�*R�iX��F��.���A�˖�� �?��%���%���K�QDU+(Í�I�W�m1�c���`���
��_�E�<T����ҪCf��̀���#=�����6C?��?�\�6~~#���nu�)��1��+��!�����$���P4���#΃�Pފ�J�G�*�\pk��t�Ad����1�Ywm+I&����������%B��
2�����@�!�)���YULi'�9��s�r���95r3��,*��t}� �u~�p�V3w��P)�Ц�zI�S>�&��D ��-!�8�]����3�a6ğl
�}5
�	b������nqn8fP�	��B�� 9T�A�����C�K`�H��@��Κ]�(-�5�S�[tʌ��~��!��0S:Hj�1+�{��
+�6�2���DA�4�R�[��R�8yῶ�A٪�a���R|	HU�w��w����I���@�1Y�`as�^eí"���ĭ,��[�Ӡ��4��h�4�g���u>-`��$c�Ϣ�X�6H%�\Q����QyM���G^`I�Q#� ��:?S�T��N`y�
+vlP%Ɏ�"�
�B�ҹӝ����,L����jvx͒��q萱�3���Z��ZF��)�yK��r��Vq��?HR�9�bM�`ވ�J截�.���c��Ĺ�_ϸD�sf�K�dԨW��G#LVI����������S�Q�M�x���w�E�qyL�����	�=W�As���� �r��/tRo�Ek�R��>����������}�4�B����K�dL33����}T�T��.@p,&�1|L�WԦi��8�`K�7t��T��hxvwY@d���/��j���c!�C�~5�)v*�(�/�?9N]`:t��ޜ3b����#��
Sb���Z�䃏�/���z�}Y%jI�,��Q���L��VT����߫�'yn^Ҙ���#��M�dQ��23h[���u��w�
�����%U?�\R`��ٔZ&�A[	�6�oYBf�0L;�
�#Yd�z8����NE��g�s��h�a��[c��x�R΃4�W�,/]j��*�1�Y����种��"�<ŹVI�_��'�=�B%��������(:aL�0��^�c���!��^e]�[װk;�T������ Κ�x�8u�����5�v8A�ca�^[_N��I��ŋ��J�R4?e�z��`Cq.����3�'��b��MQ�yp�1
���E��f�\� ��6 J�*��U�d�"]�KC��@<V���)�bԃ���	�}D��!_��y)��� Ewelm¾g�^SĒ��߬�ˊ�;p�P/v��T�b�A.� ��옷��qҒL�{{���,����d��b~2�H�D؛�i�C�9NFIk$����[��Sg����88�n�� ��a�r�B��P�|���iN9��j�%gվ�]�}���e���!�'��]�'���ޫC-[)�_�[��Ш�)����iʦ���H�����<��֡��I�և����ñ�1T��T��k�#,ݛ�~�C݄�Z1L@h�1�� �g�l��^嵀>�W�4��j��pi�,�QB�8kS��lA����f#�YB�K��E��	�S*%BpY�ŁFW��XJ(cTe�AJ�4�����e�����j����v���~K
m)�b�soAV���B��_�y�U�#�9���
��ʳ-&�l	)��.� ��였a���$���~fX0c6sa5�@R��=��]?ņ��7L�- �蟍W�?aSGG��a�R\�ܾ3���<(�)dsʛ2����$��ϵ��5r�ҫ��[�mro�#�v#���S�����GDA@rqyײؼ�t������9vb��aB&d�B�H��V?T:�����-Һ�l#��6��b~�/��.T������N�H^n��a��\m.�,��W��
���.i�ݥm;��GnOAe�~zV��j�ᾖ��:X�ɾ!ߥN�g��\���X�
O���/�>3�b�����-;�Mفiv��o�� �V$�!�oi�7����{���D�;�I�u"Hآ��=
'?���g&eO	����4q�����w�=�ӂ��k4\�B_\/⾖�jsJڵ�|��3X�T���FO�h����O/�gU��B�Vq1W�nkE�Ľ�&I%R@�~�
����|s�����v�����[�#���>vY�;��knҞa��5�'�]�3����T�@��+�
��]l��gq������-Ʉ�Ҵ� 	ko=p��0�F�˔�o�~7l��<��⫞~�ڌgm�|,"3>���-��{ж���)�o�`n�j�^	�$����"�T�E
������iM��G�ۡ�����h|`"��ut���&��T[t�٢���!��?� ���;�U��Tf�)������	]T&-o:B��%�������(��SD1��b/��Tcx5bm��X�����t��C�	.�c>��h{�gs���Lhٔ�b>����%^G^m�x�@��0pu/s���Z���(-^��$�A%����X��\��E�E�f�61􌭷$��о�N��g#zo�h<�Y��=(4�|Z`I3�g5��R3��m_���&��vd��) t7�.6�XQi�'};�g��;D�������Zr�������Uj�
I闖|:�� Qk�W������_�RK�s9?r�g�X<	��˿�	+[l$�[��3&ע�A'����X��̹��U���D ��-�H|�9������^��d��oxf	�&0�E3�VbK5z�1��6S�6_ܠ|��9.�Wkt��FAɆ�� �����
S�H�I�9$6혎@�]�_�A"�����i!)s��	
������~��7}��ޟ�G�� [��	�ՠ]��M�KF��mR����� �W�,dq�Cb@}������C�u�h����߻w7<���Vg�5\�I_NT���L? ������/N<b/ @e���i�}��D@�"��&hWf7�]�^k�Id�M�H�Q�Ŷ��E2_hc�}o��
���[���ʮ@��M�Е�zH����g�%��O A^�C	6f��>~ސ(�HO��͚�76�FG�N��ѾlE	�JhO&S7k�\�i�A�A%����X �2������|�n>��kh��W��^E?��W3�3�Ҫ  -��:�򒘛�{���h��Yc���v��-jw�ǒM�Eʹe�������iϠ=vG�<K����v�!�mR�|����|%&Z}��p\{���[��Uy{y�'C�N����ͳ��6P��0]����Z��
|���Sc;���s�׮č��c̉s-m��iӶ�݊m�զ����A1���L�=O�&�I�9���4������g
�����l�c�4 b�h}V��aР��Y��F_�r�-��L�@�٣Hp��h�s��1����ڷ㒹�LQ���У�_��1���^l�a���kX��b[�J����ʴD��8�}���f,r�ʀV�A��g;NrQ0�]4�o�N=�R��`L��a(�̷�g��?�cKJ�H�i&	)�<���!��n]��L��l� ��˦�J
�Y�dm��blrЋ�_��^:Vș� <1�9\�x!�-]�A���D=Q����Bd�)
T���|s}�^�S�+^x"���f`�|��g�{ͪ���~�گǾ�d�_ZR�U�T��F��R���D˓��ɟ����Ag��E93Ts��KB-�%�fg-ˁ�}J�Uh�T�u���"�a�'%*�X��3`�h��� �Hq9iسuG��[�������GL��~hR�����i2��p��@���� ����D�$��.�f|�fE��Ӹ�N:��Y@Z�B
Y�,הIK`�&��Z�Vu �!/�J_�0.2�J��<��Η@0�W��Z��Y>N�����u�k��=�`Mp�,��ǣA'����1�|Q[M��"t��3�ǖR�_���|����;����+��кj/Sh8UWq{s��f<�������`�auL,u��ُ\ѥƠch��E��,	�<t ��z��w��I5B8,Hx#1I�Y�;�`�)�-�dhF�RѦ�,��WXN�����!�8��;E��^��Ȗ��%s�����JE@+/�K�l�V9F��Gf=���$��6�7�ѹE�k
�JF�l�5*y�l�H�_��"���T���?|�,O*q]�2�Q�ζ�]���y�&]ۮ��g���|�?ޣ���/�A9����L���1�c˽��ձ����
�!�DfP�mg�Zg�I5��U�Ϊ}� ���)9�P�f���	d��uMŏ�-���L��N�������Hk�hJ
���Nѽ�ϟ���n����~�p�F4R@���o��w�Aኞ��������2S#`5MS7� B��F�-����NDg�u�����/�!���ٔ��V�'��z���Q��g��<<�Lm-ϛjn�7�S`A�z	Ӷ��
5v���\��I��/��ݝ�j@|ef�&o��C�+m��ȏ�sW�빔���>�f�	f��11��1�áb�AK�Ā��87�e�V,�TP\�s�	����ܭ�dJ������L8���o*�:x�q��Kb�hG��FsB�G��#�h?ĕOՀ�(ĸ��A?xǚ������^6#~`{De��;)�}�/��1I�:�V��t<u:�A��U@2����"P�h�.�q�_6��:j˟�>��+�U�pO#���jC6��!/ؑ�8��|f�z����l�J���F�	W��r�����������9%I�c
�t��փ���
�:g�-G�a	���aY=e!��z:Lj�6�8�?�U��{�ά�0�cˋ��7`�`�m{t3
I\��-�t�f^ǧ�O-�^[�I?����\���?�Y�?�O�Y��x���=P�2�$Ղ}i�"4�Z�F��yVE+��i���T#i.�CnP3L���]��.8�&.����ٗ�,
�1
�s6�az���sk��<��O�>���"�@g}k�p��?�]'Xq �����`��{�G��/���c@Ӕ$���ZR<�&W�l��d-��0c��bF��I����5~:-�f�m����������ȥ5���e-EO����s�
���sə~ؘ��R]�7�1��0�X3}i���|k(N�3T���h��Q�w�)�~�o��rַ����<~A@�et�s�[<6��e��ίx�/mfHf������z�|�μT��/��s �좡�f��N--����w�vQ�K�$��F�w1���.���\mȉ�p�_B�О� �{2���19���~լ���w��s�]� (zy������m��G��!c\��d���2��@XĂ�VSD�qђЎ��0ft@��Ú~��(˱o/�Ʀ��_�:������pd�
�Nݺ�Ao�P��6Znn�SC\�+$ں�Yx;��P�Gz{����C�����*��[�����b��
�&cə�܄��-��(�E	\��-:� @�|��c���м�p�S���0�8 {��5�Ŝ��h�m����jEdGc�Z��f��� ��g��T�"d���C2X��Ha^۶���
B�%�&5��r���K�<�L�RU��+<��*O�c�U�ˠ���Wu�`�E1͓Bg�y%m�<n�K
��L[�>h�'
i���My�<
fC�+�3�[~c]����� ���t��,�|bFk�Zcf%��a��|�!�)�oo!a�
��aDF܉�X��nҿW�ʚ��5֐�̓FajYX�O�VYF�
��iX�њ,�(*��������'V3A[�ס"=����\����а�7�A����Xо��Ȃ�Ǩ�v��iО�NaX4PT�����s
�$���\�f�;��,vȴn`s�d,�+$ӟu��;!;ܝ^f-���?UW��������)'�1����W�m�r;+>,�ɧjʖ�R9��£A����X��]�0"���ߊt#��?<����� ,�T:П:"'�#�k�Αo��f6������1ju"�����t�=5���&������ʲ� C~�r�(�W
1���ks�"����A-�Ȁ�X�|L8i�i�q���Ԩ�h�lUo���{T�b[��I�c˵!��Q䨦B����OO/�ȡ&P�Iת�=�J�p��"4�#Ю2!�[ح�Zs�$B��ܝ!�z^�Ϲt9q'�m�������K|�>&��`�Ng٧��\3f|���;��u
ܡ�4ܱ���A�'y�}�Ҷ�+��V����vE!��1@#��-ie�6�#����H("͖�t׽/:�ɻ�)��dU��T���A�I� i�.�)L���	�rOK�#�P�e�B�fnY�ofe�
��T�׳�ƅRd��kc���u�AC��������*<qD�4\;�k�d��2���5Z�,���r�6�����7޽�s� �b��ǁ�F "��l����/2�_f��a��d�,�L}1��,y?�����+���0nD63)�+�a��&ྛ��)�I�}�X~��hoLX�Z+U�AY�r5�����^&�ib2"ɱ'�aD��40�p8��f}'�6����$�5j���ӪM~Q�J6�+Qs6����:_����[���/ ��ш�^��ȣ,K���z=���IgFf{��!�ڞQ����3)`��}�q����P&�ӊ2������~�J�����Ɛ�$v�A6������*�J��a���[D��$�-^�|���N��}�f�$ß�_��	i�:K���߅vf��m���lHDѩ[��8ۻ�.�?"���7�R� �B��'�L������}������R�=Z����=	C! vz����4VK�x�M��y~���̎��q�����;�J��؍��,��^���)2y㇫�%۲8���Q�"����쀋���ďr86d�N��i�o{)x|�\�|Z|x��,W$GŎ��EJ�y�v�!"KنM���'Jb����ц��/e=g�n�D�p�?�X�V�AJ�,���F-�Ʌ'��̧��`_A*��[D�/�Q�@�k-�~���/ ��I���
��O��}�\�!����K`u�h&�8iK�DRd��m��5eXb/�;S�#,-fs�"]�1�Dk3x��`�����H�J�UA�V��ˮ,�'�{�z���[d�A_�T�������ޔJ�<
�v�ji���È�������(�C�|���9�&an/�b���0�$J�0:�ח���Yc��HK	
���,���F��(�<)뇫H�6USn#�x3�j��P���#$�{�q�����s���ފ��f(员�p�����
��ڊ�'}�S�RZ�Ԑ���	O�&p<u���%�q�c��A\�h����X���8sm����q���v%D���.[��G��z�o3�������OgF%ϖ��T64sC����$���9lq�'�:D���Y����H#I�LWհ�fQ�]{��氮3�Y����� 8�og~�ܨzZ�����n�㮲f^|��5tm�0c��=�.3��+4�O��l2�x=�G�	��NA���#	�9jbT����76qK�)fs�P��UZ�@�옂����e�~Iy��Ϯ��yB�Q'��w�a�u�b�o/��B�EZs�E���""�U��Ps��o�2L�VD�G�P�i�?7�<�e`;`嶳:[�ͦ�߈Z�`�S)z24o��
\+l�A\�|����j<!�J�K�-�VH�I���ߝO���5`yG-P
��D6Α�ki���+R^X�ʡ���r"�i�Ǡ
e֩2�#�\�������@apA,�`HE׏K�Ȫ��ǌ�0*<�~�u$�\�q���S>����>X��H���d����p7�G{���6)��lE��W������X��Qƭg!�SA���5|	�aQ�=6�!]���y����O���u5������_���*q(؋��3:GǼ�	8׶�@���@�A�P ��Z%����,w���A^������9���(v�o�BWKN%�7�����{�I��H�4�HF�����'"��e�)����p
�w�����ˆ
�:�����ѣ�T��+�/#p�d��J!d���_x?��#a��)�kCH~o��2҆����:���8���b,P*�f�2	�z[�)jc�NЙ�N�?XV��e٭,qB?��p7$_��w���2C�$S)�X��+������NR�AU����.�!]5��������y�b�I}ɷy4۠���[���L/y�#����غ#"����4;2�Pd-"�,��J�]}t����'縅:p!>��d���Z���������x*�ҫ8�o-=��:_��	]�ɂ�Ԫ��^C�&O|���	;�YG�����k��@��}�Ӣ�ywU�'��+�Z^����c���^��^������C�a�)c�0�Ch���?���i���i�\l
(	2mN�h�Յ
�n/���s�R�ERt�_�����+:C�-��8	�!?� �i��פּ9��٢��u����,�p���6����t6g0�]w���*��裱 )��c�F��W�P����9��o�w�}_��w½r��)=�X �cX�>P�݀r�_gr��H�#O�(�����0Kh0׿c����hK0�	>/D����&�Kj�ĎmE���Sy�g���1���&Q��x��P;1r���3"�|K� g�H��~���P�1�����B:�W�}YA ۂȠ�цz���J���@ǻ�����F�t*��P��V��;��W�'�AK������j7͔f�Ӵ��1)��O�4��Է�
l��] �u=��0�
%���~�C���+��-0�k��B��f�r�|�y2�f�He��ލL��\��d[fx�`Rh��ǋYB�W���H͗�����x��U����p}�䵲ZT:@�>�'I(K���y�+ɲ��D��\G�Wf�A.�W�m�璕 ���9�*�,��/[�B�^'��h �̯hqC��PS�B��ZtE;g���}� C� �'��r~��P|W�Fc�����l��7�t�ȁq
�	�逽&	�4�%����qoP��]i5�g�M���w�V4��}��g�M J$�쨉�S����L�[j��!H5�]���}��䫬��(�5
դ�ܺ�(}!�O�'q��\4�/t��r�_؝H�����������i���3�<��b��'kyh�Q�3�؄zl�cS���c��;�)��1�{����)��n��a�w$�AQ�����j:�{��qK.
KD���5�E�d�2��k����ˊ��&h
R�[�~�t�p֌�RVf�*��[+��z�>x,C��}S)��S���$�{�R[�-����zk��A4�0��������J�R������Jzm��7����͵h�(.xf�F��	��#�U�+���-��f�B�q��D_Gշn���T�����]M.,�L���IYTe�B��O���ߧ�� Ì{|&��D|�k��:��D	�W�?�:;8��[��i�fG��U��f�]FJLc^B�����ol'�Мe6��q��U7loM�u�D�J��z�d��7�B��c(����3A>���\$h��ai�$�^@ �9In}\
��^����,W�a��ޕ+�r�4hZ�z��dێQFS���I5�AN�D����"T����6�-s���SK
�ۈ!
o�M��\h:R�d�jw�;�ϞW��z��
<׍�Ȣp���~��e��p��s����n�����)%2��� 6�������2�
��mY�/b��[PP��x6��[�	�� %�R����ቓ�[u�b%`3B$�k�+y��y�� g8@�����٤;���\[�� 6qhl�h��(t��JX&��j�))��|?��9Ӷ�
i���+�I	:�.��jm�O�a0�7�74�AX�X������S˵���A���ӨQ���цua,��GV�a`��k�Q��o�5Lu"��L�n>sN��Onޓ��a䯵=mA
�N-���G�;A�	);�{"o�7߬��Wj���{��/Ox�0Y�y����(���\T��#CÔ)#W��e�6����'��a-\�[}����Ы.
�$��������-]W.���s73�Đ�q���|�4K��t{�b�&�����A;�����~]L�l~W�~�'O���qw�TPu�P)�S`�UJ���a�x�L!�#Ip�u�ŵ�(�{���kܮ��-�
:r�Q��r1�4�jYc������9$+ܼ�<�/�Z���a���l���M#7d�9s�k
���7�� �h���/Q����Lr�ҁD���T:���:��-b���5x�F�����?��(�.Bm;��g���k���ʬ�ް�}�Lj[ޢ��8��u�ߵbqh|�4:X)S��0�z���A6������0j��L�0��ްԷ��b��7&�|`aU������#��]j��w�g8�Jyo�S�p��-�(�����;��V끚O���]�>5���x����f�f��P>,��W
�8�Mm㪦�o��8CÄ ��869�AT@s9k�)��BWuF��`�룖1����loZ��B �-*�ޢ�x�ג�Ѫ���V����)+�XLȈ�$�`�x�~�Ĥ�Jȭ�:�4���C�"h�Slx2���Br����l�2'��Q�u�ɵڈ�
�z��#�o��q �G��S2
�g}fX?��sm��wT��
ݵݠc�øK2ZUŘ�;��_�b�5ai�[�@                ��'�8���,�]8Ć�����dG� ��d�N��-=ač-��hA��SD>̲"\3CpN��WE�
7V�}
^��O��ǏsQ��y�	�+�,�;�0�3J����zQ�`Z���Lvq ދ�必��o��
��X��3�U��jʷn���&�|y/������I�hړ�2�4@�X=��1oT�I\fT^l��1���)hc(u5
q�Z���� �lҳջI���Q���Bf�7C�ْ6rAW��-�����O���c9���+~��U��h�`8��B��kq����R��<���	^��G}?#�	 �����nR�s��]@EH���:�8�p�s��t����
���UU��YM?��P$�A*�Ѐ��m�e|l(VK��9��t��i���2+4L�rz�>��#�IYeD$ �뼊�sw����R���:��q��JQ���Ac�t)�j#/�ӍWis3���n�9˾�v���RRJyl� &p������즵yGΐ���z�la�~L%�=��a��yC,�^��9�p�����x�<t"�X��Μ����l3�j� �r1DK���R���b�w�"OYɐ�MOr��b�z���Iמ��0ր����	;�О?{[�M�L�z�1�>�Y<��
#B	s�[���O&p���\�'u#UG�2Rg�
Y��_�Ղ� *�p�w��࿜M��[E'�W= ����?q�Jv��ќ��>��!O�6�K^`�6��HDuE$�����S�����0�^0ʺ���u�{���l�஬�����*�.G�5O䅤�̴;��?��[�b��c�XtS漊@�ܢ�ήR:�ray�Gz�`\�[���d������-]�P�A;�����e��͠`�g�l�=��i
�` �`���Ņ���H���e���ҝ{*���?g^ߢfD�N���wuk:�M�Fm��u�
�⣙�2c�As�$tYh9T��|��%��3��T��
���S�s�2d�O�{l\���ss�,(T���t���f�Q(�9|I��M#�9�*��"@9���-�����G�_��s�B�B+WS�(G}�F��	9�a�7�O�"��e�&�W@\�S�j�C���Dl�`�ހ��kW�̯����A4���X��{��j���8: �Ӧv�3�k��P�:��.�*��׬�b$!q���I���P��37�t�'���� s�� �������Յ���h�a��n:	���Q��+_H�\)�c�H"y�?�����3�L�wʉ�Sq��ILn�~l��p�0x�vVyu_5+P��i��/%��BC L��-4��~l�λ%\�������;������%V�ع@�\Q4߷'�T�JGY�� �v"Cm:mf9�t��sY��Z4�*��$�t�18&~�w�}Ԗ^޷�hw�%E���s�ɵ�t�%I�A5� �����k��{�w���]��a���af`��'����O�tP��8N7 ���O���j�-��\��B�`�L:�x�2
��ȓ�Ix3	����C|���AFQ�}h��>�x���s4ف��`�G�EL|���l�:�@2���!L�tL����6�[kn�(��,`��T�K��xG�KX
���(��鱈Of�*�q�):��������Z�\��jj;�h ���\.pH�jK �@:�AX�p��M0K�7��K��j�v����%%5g{cT�̔� ���a���,�m*M�4Ӏ��ja��0��K��)R����(��e�=�x�,{C]�a�j�<$��ym��R`�G��������- ����m�� ��T	����P�M �v��K��%�Qd1�S��6[��@&��I�i�0 ���hZ���6������iҮ#��#V#x�Q˨�#�VMC!�ӡH��Zy���� Q�(gû��"4�yZ�%��,=�Z\���N�֏߶p�=RvC�'7�|��J.�Q&�X7�j���ޖ�����i�����`��[�����ŋTG}�j���b?�?���AS����.��\v��;�z�`���8U�b�_f�f#�uFSi:����
�G`�	9�[�V�9�w�>'�q���t�Z�(_S����nnP�v�"�Z>����Za,�*�����$z��[A'�܁�כc~�%&Ӑd;�����%Fb���ځ�����4�6$���rV��A�tL�h�sj]�����p� +���|�״�;$��P�z�n�j�t���F;��E�N���q���@���rI_ ���c"��A{��1|')�#���~�N��z��ve��P�P�>����L�9�TT���|P��kÊ;ܺ�H�{�T��?$����A�����ߕ@{�L!=��y�n�*�>�s�-$�d~)s�yX�©�*���6z��+/)x���CW��֖y˗���2��.����z��7ja��~m
OP�����u��ιZ�o�UJ<�>��/;�dY�Isj�� ٸQ��3 �/{��N/��g�.��t�Ы����[G�;:��C�kG�2��ܟA݆�O5P6��9�p�L�S����;r�:�R�T)��Eo���c�А����kY(;e'8�X���eV�&\�j��j�#,uݿ�+T��P�>T���%2d�I�+h?FC�+v�����$P� O�z��k�o��̐��S�� ���n��e|U�ٮȯ� ���2��������S�ғ$9����'{x�@��8A;n!��^��l�s"bH�{t�O�a�G�Ӳ������.�q���-�9�\�k�_��^�B^�����0��2�8��cSSՕaٗO �ݎF�s5��7���L�.�}� �'�BO'(�T��&�r:�y����K���
@��Q~=I�D{D����<:ƒ�u4^�!���і��Q���'�C��ק#��vZJ���P�/��~xE.�uf�ZQő������b�=	v���s�� �\�#��v��D!�� ��W��1�8��q�X:t�:k�	1��&�R5�B�H��.[�1�����H���FЊhy��i�N;ݣA����|?ѥ>[�L8��Rpt�@	�t��zk\�iD� ����U�\;:Ĺ�]>���K���x|�����O�j��ڵK�
*�����,Ƌ��qV���*B,�A���^��Spr��Íwcه�p�N �����B����5�T�)i���K �`dX�	}aLX�îQo�0m�
Bq(��Ư���k^�GPr���m�� ��2?��I*�@;�_�I]�O`jV)N\{ .��%tMR�����YO��o�
��;���[WW��*Y����:���N�u���y+mTv�d�>$P��X��;�Ӝ�Z�h�W��^I�yj��`9�tLU��I�a-�5�cJ'liOZ�^Ӟ2t(~�V7�4ulȬ��Z}�\(��A�����|aW�����-�X���G�uҮ��ުW�p��_��B�T��p���W�ܡ���n$��}��j]��sO��Y=��� ��&R�	���i�QD���� �ϒ=5�i�+'�v
^�����~������ͭ#0k�)Q^[Mpw�{A�����b	Q�N�� ��4 �z>�t�H)�5��k�r]F�yP�jT,�^+kS���1�G�E ��-�M�F������k$�i�猖���1�'��ܓ]�'Qr�(i��@����2xC�8�:�O,s�>��d�\�}�.ΓֶͭH�X��\��p=Û?�\˼�YU��[!�;�l�	uBA@���	'#R/UZ9�cs��/�%�,���!��S�n��@
�9�EH�L�b����C��]����J%و�c+$�&L�V�$��W^�#_֯4�%�Fz �cq�]�˵W���B�o~	��6�UP��#���c�~�T��2|H�{��깂3��
�����%���ql�Ș�>e��u����KМ���� ��c#���@��T�K��t�p��~�'�����n�W�Z�n��}����h5ܡ�R�ү��&X�^���(�����/C�1��z�Av�`���� ��eDI�P�Jo�'�)� ZPt!�uںZ�[9�b��;2����Ѫ'#:�ct�}�['���P�Z,���X����
���6��a<PDK`���@]���Q�&/��f�P��6�x��,{-86	Jmɕ]�z�r�`����6�U����tx5�O^����z�Q�
e��*Ik�z�8�P_/k�ai��i��ohpO��*�fJ�h�F��&P�M���ϔ'u���h�5��[�olV��h�b+��t�3cDF��j�'|NNþPFmkVm�D�6���maC��Sݜm�
w
�^$�^��F/,j�ʛ4�Bv���:��nS���ㄟOZq|���-N֑��#p	�p5�}�7�u%{�AM�t���ɻ>���f�e+lRO6�j�����6���pM�|3XU�T�Y���E9�橘�L���v��F��{R�f�W����h??օ��}E���s�0��qU���e�y��A��4"g�\�S�wN4/�B�9�sM����kY��^u�ٌ�7)�.����
�>̀p����������~s�����:��C������Ԙn���n|:]�-�<g�L�Z8�h�����:.�؀�;g���,�D˓g��IȨ� ��%�t'��_��(x��>����˅R����`�I ��j�š��ࣟ�D=.*R�sp�G
�����A�M �������Iz+�R9{�Aρ����t��ҍn{�4�D�:�p��7�S�b��ǐ�"���;I��;��K��\�X�(�O2��z�Cy��_����+�ơQ�XA����^c�i�V�A[�ll>27� J��x4eb#K��*�=�ܹ%M�Q	C��C��˩e*F��vt�����Xh�6p�Y_������P�+r�Np�I��	<1v�_�	�3}�����	b�7+�,W��o���V�x�c yjD;�UL�gKV�*y����d ����*�Ɔm!	fd�E��Vo�٨�k��ʹ���~�:�<���<�M�YhPI��V��R�>Z��ߒh���������$.�G��>�l�ɲB���#�$�҉8�-���i�F#��@�I�� eM
�s?����Vx��b0�H���|	����������n
]�}Ԁ1w�E��!����y7T4�ߵ��MD%��`�4���Bu:~���@	Y�Ag�Ā��/��]�"���K�߶�-��9F'LS�P�`;$�r3+Z���6�L`ၪ��_k(a�&
�
(���}~�����b���k��B�,�kr�t>�	Q�n7��2Jf�Ig_re����,�����~G8�4lO���	���(kW�w�� �]}N���Y�n��ֿh��i��;�W%����|�-��(DP.|���s��I3�X��rM��RT=ӄ5B#
W/k��A>���
MFy�����&L�q�|��oT%|��,���%g\,s{����\�$�o�c�7mRѧ6��S3������q�ǂ�	��ش$ԛ�P��o���K���A���]���&��bQ7 �7��o.����rfL_��uq��g��R��J�>U�
>Jb������|GI�_&8�����g��l-�f�JF˲��A5��~����UK�k�)�E~#����|� ��b���*%�.�[���>6dư�@�@� ��X���A#�����\0�u�'���*p�����Y��ZQ�MC�����[fF��[f4���5_�v0��
���\4»W%��@�:��b,���B�&j9	�.HWhaI�A
���X���f������{����?�+T,=�CAs
�8h.rq2Ae�Z�>fe��H������K���?&4
�&��0Y����z��1�$�����p�ϛo~c�^ĥK�7L6		�dSI6O�&����g���A�<���
��v!69��� \��U����%#d��X�W�5�AE�P������i�B�ڜp���n�w5������T߮� ���3DY��n����Q	De�V-��8oQ�q��A��r<���R�_�<�5}�.R�Y������7�d+���'�����yl��ߙ�������rj�2u��Q
:������xQ� kEA&P^&Z�c�D��g�T�#��x;QA��|�)�>��j"k �b,>��G�=�����b_yd\I#����n�Q����T�egI�I�L�V��
$�/y!���l�r'gœ+���!z1|�M�O�Z�R����P�OD
�I�&�h(�6[�e��B����m4�AV�d��MsK�Ѯ	Ċ� Joe#ͦܭP��_�sd~��cՅ>�m��%����L߽��Y;v�0�`	��V�D�e94o\��W60g�)|�N��P����C����>L㤧�5)���A_��}c����IP<�1�T�[5��C�B�������Mib9>I�̆�"m�v�^�jf�J�YCz(��+
�6�􇘡sE
.��r�s����� ��e�G��\ՠ��+�L
�ݫD��AԪ-�U�Űi|�ȗm�~�$�P_Nۜ%s�YK��{�cé6b�8�N��]�lC� �,gp{p�R�=_��{�9a���:l�l�v�Ȕ�ǄI`��F-��������U�uHF�e��������_T��A�����c(FE�e���q/ɫ:�[���ʢt�zy�m�}^*�M�fRg�j�RI:H���qe���P<���o�8����)2�L��ؕ��<Qؔ�x�> �Զ�a>�y"{?":���jAv�$�|.^��)1��l���;�-L?=C��Uf[����#NR���nd�0>d�:>(K#-�%�]�L�	@c�*��}�y�K�Sd]��
�*��@p��\���CM@G2�2����m�7���YnA+�RU6F.Ulc!j=M���GJ}j�Rsz-��ۃ�{�>4g��L|ɂ=���v��@���,	-��6�����P3��A�,���bqtX@[k=[ɂ{��t
$z���8
�sȠ����'��b%�ݦ�|����i��A!�T���3s�����̗{�pIӬ��6+�FX�3d��X�-��߇�H����,��Bw�e��b�=/ ��}o������ѯ�^g8ct�%#�����)IK�����R�EL�18��mw\@?~_kE9?O$)�;��,����6"[�pK�,w�
%�3;��D��.*P[��,�5箘�p�$1���t9���f��( �[(z�>�%l����Y3d7�����u�E�:�A�h�����W�%�;l�H����X,��= {{�����P��WC�j�ef��f�x���ઋ�
��L���qg��po�'�)���=|2�2�KjO0dd����9G�����W"�2*	W�bԷG�k���t��߄
�� C\۝�*�-L�j��D���7��F����J�@�f;�s�	���oV���J+s}�U<:y?�+u��5���GՔ����|1��-����x�O��Cݮ�p����C�Q��7�m3�~vNQΛ�N��*Ah2�+蹱j*@���#�K�����̃ܼg|�Ϯ
��@U��*��f��!}�d��P�\<dd뤼܂��퇂��|����M����\��6�7m�Fե[�����;�AW�����
�$$3��Q8��=����N�3�6���Lj��|�M;/�9�D���	ͤ� �ۚD&��SR�B��iՅ�C�P'c#Z��j�uq<���LY��c���?k����Rw�am���hOs^c���7�W�e����)/]^��7Q�D���+�`�|�ϫ2n�g�����
�X��C�ҭ�I���U�o��4B]�S�����
͟@�����I;����<��S��o��X,���3Z�5�P���g
�R랧�N�gӒ�Z�Z�.�����?"��&]*}�4P���yA��MG�����R����+�k�"�G$����I������K"r 	\��ܤ�i�|��;�AT�̀��0**����?W�@�t�O�ej>lr�`� :���� }������O.K3���>�F�\�A|P�p�ë7��H
7� �I���QD���aA ����d�P�^�7�S�����1b^@R*n���������o}vo�	� �
h��M=�˄V}M�{�ܓ]3�8I�s~,�(�z<"�RB���Xʲ�u��1b� �x��z[_�.�#E����!���3�ކn<
N}^N��*��k��4�D�����ڳhl��ٛ\�l��	�
r�v�d�;�B~�����W(0��q-?���D&Tu_�Q�q���Ptܔ���L	ALT� JW��_��V#��a�9R��L!T��Y-�$E�.�e�w���q�4;�#�~x��W-�yKj��{"�Z�| J3*Z��	}O{�y"Aӈ�q'rS]f2t��[���ni[��Ɨ��J&��y�"A�TJ�)Ʒ���O������oJ>3��)x��%�vI��������4��9n?,Hb�Դ��D_Tݨ`"��bk�ڄu�}d˨,rZ��ѻB?���P~�>            �0��y53�W��;��Ϣ˱R����+wgr^�+��%�wR
YN�QU0�o5AyZ�/���������O2�[̤�mpO�W���� W��@���Iʸ�"IbDU�ݿ����Oj��K��H�?�' gJ���"�M�(:tJ�[8ݍ9��|(h�h^[�o�, ����R�S��Y~9���@M�~-�e#l¦5�7��1�l��u�R/�bb�L��J ����Ҿ�aB���*��dscH�ܐ������BTޛJ��@
s�ͯ( ��	*,.�F�J�:����ܹ9J�<�?���}L�d��� ����AUڕH�ƞfs�D����`+%��==���k�c-0�ۖ4�brM1g;
澀x*��R����v�OTO�=M\{;��c��BP���[�0::�P��pP����g�v�`�$-��+uTə"ߨ��@�F���F�]dz^kx�Xj���0Y���$QT���ot�q\�W�5����& f��F�^��7֘��X|��*�~�-p`���F�k�Z�ӻ`�	/[��I�̡�CeV���*���?A����S���qou�WGɬ�zy,�2��i��@�e1�U�{�Ve���1��$����+�X,�T_'p����T7$�6�|+}U�P�x9N��A$� ���v��[HoͪpA�E%�x����h&��w]����1��u���V�u@cU\��X���5qh"��L�b��g>E�Yh��1��Is	�1�=�C���p���YV������fD�/R�F+�ި ̤el�gN�� ��(%����j�|��.h-����K̰���D
��������!<��v>���3>(��@s� <6-���W��G�:��@,��6�;VPy��˾�?�-
��c�;��W5}�����T�R{�Wҧ}�ʎ� ����[�W���1�昨Y1h]��"����^hkqk������.�~�h������I���J�j��9G��V����%�{bMt�U��ֵ�K�e��2R2�M�'��ϒQd�tol)9��LR͆�AT�����Y|�}w	�?]D�j1c��~w+C�.�x��*ҷm���t��,����A2� 0���bz��e����P �R9��I��R�'f� M�M�΃�b*�rCG<-�Trm~_J*1���t���nB&�i�X�x�x3.|��j^�Ճ��:t�_h��Igt�g�i�R��
OX-y���qS�T/��w\�=�vCi��`�
�(��ɀF����W�{�5�(Z�����J�mx��޲!�h��0Ĳ8ܸ+9J���ق���sK� ��qw�f�gv�N ����a!9�� �f!`�	zkK�l��V��q�j����=A2@�A4� D���B
�l&�>�s�2]�H�'�ԕN�5LݿϘ���sɎ�a�
�0��7\�"�R�M��Q}�ĕ6��(0%[:�,�+Ŋ�}8�tA&�c�q���X�	ѕ!ѐ`U�����eQ@H	x�<��g�@m4���űTB<U�.+	<���Yƭ�Q��M�VI�_��al2�KE4�
M�*`
Nf�; ��g�+~G�ޤcvc �=�.:$�����W��R"�82�B>����Z�g�ow��8�$ݾ��f$�H�����-P��0֓~u�	4v7�������Y"���%��Jq
k�
�yk����=c�?zX�Z�9���	�x���"�|�ί��xe��$�C���:@����{��Iľ��%x�¥u�*���� �Bv�R��OD݇�#ԋk�������Ӻ�o�� ���E��L?�.�����*�^.�.$��y�b>�`Ԝ�x���vA����C1��Ŝ일�a1��<p"�_�Ov
WLb�b��V4�T�B�%"mF=�Bn;�!������/Vb
 ��do%Q�	�P}(�
���A�$)V8���!��㈈�_)-&i���U���d�\�̶{-_���9u��1�d5w'PJ��#l�_/�R�9�p8�LL'�S�$��
Z������Q�	ء.V!������.�]H@��H�H݂o,xw*~�w���W��y�Ŷez7)��j��������%.$yK)*�#�n;sȗ�V���d�,�km9�ȞS0�>��_��0i����ׅi�r��#
�To&F���A&� ��2c�V35�2��X(8�.��n
8�k�I�3
M-��5��Ɏ>	����z��������TZ�Pv�GE+���_���ڱ`oc���SHy�@���x��-'eA&����ȿ����6n�b��Д
���X�p�[��d�SW6��l��&d����Љ{g�6G�z6��}q7/�D��|@*�么�d詯ٟ^FQy8���8"��)Z���oo���}P�*���
F���z1n{�nP*Pj�$�=.�!a.��Hu��c�ɓ���F�ICζ�s��ۭ�Z����QPP��"Ќ���.ڹ�ͷG�C���������fM��L�	�����3~9n�.�L|U�@b>�H��}L,����!l���?�-��%#�2*߂g�/w���WʶJCfd��}�6�Up�_)�?Y]��C}o-ƴ���my}<��[�jZ����X�[]��>0���~f��_�yJ��>���9�w�a&��!eyȘ}���ڶ���<u�	m|�A�*��A/�!\��� ��$�3�_?��ǃ��b6���I^� �f��N�0����*p���U۽���m��*��b!;��z"]$Ԫ��د��2��V��[K��!9���� uG��	��y��I�a���x7�P���I�)�-�V�ñ#dq�p�dRsFm���D$����Ru��&0��X�ex�1H�҈������V��a��`Hh�U������K�w�c|{��X�'I�hR�	lr��t8@���}3��r��'��5���S]=�˯L�B�RY�ކuZ�d�;K����tO'��C�p.q:#�`��e��A2�!p��1�*�
`�����"'�wp��s���AH�!����+p����4� ?���u~��|�,-uff����d��SÀ:��l��T���b�3W��1zj����e�Z����
Di��LA5�!Q+�	D�)��U%�uiCB��Q
����{j����8Jݒ)�J8���(+ۚ,��T�)�WYkӼ�,��� ���K��1]`�l��AX�!Ԁ��{I���`6���Ŏy�w�:�S#>�;�Cfu
��'M%Ea羉&~	<����(9��un-X��:�"��_��WZ��A�$v�SˠGxs����a&dM�?rp^!R�`��E1s������������{ ѵ��n���3�w��EJO�$����;�R 1�ڽ��:�7�s���fL�r���!���OR��4 ���W�`�g�E��)~�1��f����_���$�˘H�?�&�n�?Z��5����­���}@���U�45����ϣ~�6c�z=�d\@�����D=K���?����<��M���]7�:~\U2� ���h�)#��-�E�AJ�!���!y�
$�7�1Crڮ�0<����I_߅=����[�Ddp�Z3����1l��n�Xss����o��� �y���v6��0��X�������kj��ѥm���`=��0>��=E�V��=�f�E78��:D��2y�wT��"�ɚ �R߇@F��ge�
�)k8R7��{_�(u��M�R3#݉��;��{ߥ�
X}0�é�������Z�(j�ȁ�B�s�a���|����*�IY#� ���m�r��ǲ�/qfE�y�������
5̂�W�u�WF[=�H��(�����bmT؍��f��)!?�����m
)���]�D+0d+V�qGi�����o��0o���a�ӣ@��"$��X��7�����M������5Y3��PJǥ������п�l�nM}���;�uk���㴬��1	��	��a�@Rq
P��ڧv���]=��[[A��,TXg���Կ�?��F<�"���������Z���K>X�{�V�[�|�7`�-Í���a�l�:�-�R��;5�td��(��Alvl�������exx�ܺ�f��@�+{Y̱˺��e��g��Y�^!�T�
������T���W�;���A�"8��X���V�X�cH�3�H	-��?"��>{(a@N��6K��e6���:�6{�����*';�����'[�,�F62�J��$n�����z�br4��nBBn�T}��-Ʒ�ȵpV ő����ʀ�p�5C���3�&��
j�|rjl���'�x�B��'��r��I�\��{�~���j42v<0g��8\�76NI��F��������v�V�8 �R�ʉ?yNǥ҄�ϯ��I7r���Dά���i)5�=��[ɣA�"L��X�xdI1%�bInՍS�K�b����\�<�X�/S	��j����1�L6��&�O�"k��-�\4
W�Z<Y%L����a��CkY.Ŕ�Azը�%O� ]�F�}��K�tr�w��ĎF;�;�����rI@4�r
�
b�@39�kM s�M� )��E
���}�qn��^&�8�?�����$I��A�D
<� ^����_}g�m#�����YtI� �ocWW�'�|sk�J��_���& Njo+��W�?��nҊ�O�c�r*7�.K�z���Di(f�?Dlf�=̻�*�v�{�2�[t?B����@�oF�%^hP��q��A�"����b5�X5�c�zv��>h�ů��Poh"�H�QO%Y}�xQ�#���0���9�J\�&˪���R �/���h��@AFH�"�@�Kp��� �Z ���Ż�<V�+�i��k��^�G?2�4�B8�΁������(��FyX9=)@���;���گ��|�_�v���9��p_
au\��%_�;;�Mn����]���V��x5(��x�n��a��u<d(��z��%+�O^֓V�`CǴo�S+�hee��?�����:PWt��I�N�ń^bz-@��w���K�0�{C_�8*�;al32""}�@���VI�i�M�� ��H4�'�<�A=�"������6�\	e��O�4u+����ܳL�/��1\?��ީ���=p։�����}�7��ğfw�@C���p���
w��r�jϒV�� z)�3���黁��~��ip�c����$��u�@J������7��i)u	9��w,��s=tՠ�RO�7�%f~��s݊1�v����N����'�w�"Xy�w�έ������Z5�S�I�J� 0��Eaj��"H�;�c�9ӰC5�Bƍq��oPT-kC��۫%�y�x��ƛ���׵W�'�QB����ǯ�D��H"AQ"
�C��yq�K �M#q}^H�����h�1P.$�t�y�8��}l���8�h�]S��3��m��I����s;�Qq�ɮ��+e[�ko���Pl��C\����[0]��B���q�����QG�f	`��":G��>�j�.	%���ϕB�毥��ᔒ���X��
�pU_�o�������/��R~u�bȥ����i��*g��4	4M?�#g�?������h��6���g�Ax#.D��kQ'=g�`��2�G�CH�w^�0������4a�t���'7{�AD�"؀�2z8�fK_�*�n+�in�Ĭ
Ցo�zU@b�I4�bT�o��?���O�����b��-
p}��?\&,�?�mŶ7W}�����ҢΚ�լ<Ýl`"��#�4&�Z�����^�nE�2��ߣ�S�$�xAG�\mQ;[��$�����_Y}�A�#����ث�n��/&������Ⱥ����δ�cJe��j��C\ ��n&�r~Hg.�=߬�7;d�w�$��o�_
���q5 ��C[�%,��=Sl-��%�P!�t���e�+{���P�t���s���.�����_�8�貇����+�y#��,�T�ܒ2��������QdHӧ22�N����p�ğe���p� }����B�Hö�#�F�&��6Si ��u��WL
Ap�x��Z�?-������o~�s�W�L�壶R��y��xJ6��޾1bR�k�����dG� �#�'A{��nt���gtxw��u��
�?术]��w�#A�	����"%���y5v .��!�n�7Zts#[
�����?���I债&lV�@+����0VĶ]��o-\�r`K�ѯ��&9'�4�i;����$��a�+`m%���d���[S���A9�#P���.�{�6!�'����,q���5�<�E���y��a��Bp!�`Ku�F�8OfKq=l�'�%����ʶsYl{���uZ���������=�.uA��/L���t�G�Xc6���x�x�\��{ȝf'_
)^���������
�_R5J5#,�ק�a�gD��2()�FFcMH�\�������sךF����r]�ƕ.��������ߐ�p�#gx�
vV|&��� 0����� ����e�~з�k����7�|Eʿ���i��}5���Sli���.��}?
�9.�=�l.L!��]�z�yB�K�]��_|��a�~�o�S��V���a��l\�6=�&N��J�TU�e�v|�#�[�gPll�����8�-�TVƶ>� ]�
���
��؟ÆY�$�qp ڨL���jAa����RX�|5/I����N��2g�� ����&,9����Wa+8��tv��{�ME\Z��B]�b���<V�R���+/���L�6��$��=9��Q|�����'��<�pLi�g���*�:�v�5�u�E��D|��AF�#x���
���!�.��K_v�I��eJ�8�_6�ې���=-ǅJ��K��_f�jY	E�O-ernx��������˟��N
/kӧ9�;Dz`Z1�[��%r�[�ژm&#I	U�~-��w��
����AX�#����
�6�"w3��@�)Ӡ�0/���p�%e����D	{���{�L���p��F	�P��85SQ�8Q��@��V9��7���Q��h��L�p��r(�-���D))0�����P�)+�	�
��V4��������"b
��ٶ :��YC�D2�R����A>�#���L�C4�}T�E0� �#��+ǰ���(��
;��@eeR��R7���)l�%=+N�	�Y#2E&}J��Y�Nq�xږ*<}���DХ��� �rϚ.�J����AcGi�3�0�����^SQ��.�Q�,b�il~�0mj���i�
�m�xbٽ�*C�J�a��/�U+�ɫ��ߴ���!�/�S��q��RG��O]I�������U�+A���y����k"��K8��T�5�Zd gB�
��*Ёs0�Ia�^쵳�,�:��@��=�Sj�j�F� ?qB�m������OO�p�^��;2�3�
}�IZ�����E�X,��&���?�A�#Ȁ��|hBGS|���߼�%��V�W�x2�Y2�'!G���h��>�Z��T��} ��х�`�0�>���d��k�W%�,�z��ﹾQ�H��:H����08��0������*�3�T�g@�hӢjk�k۵Uь^�:�|*���B-��^
ʀy�wj���q���
j!�>(좹�Z��.1
��lG*�I臝��m����.���(�v4��׺}��r��@3^m=�=M��[�l/�Q�!p]�U�h��xS؂+c�E(�N����4�>�/U�]ذ�.�
^�F�ɑ�a�Ԍ�lI��K����^i,�]��âv��|+�f����L�Y^;��7T<7���7���H:c��\��,R��v	��,�#���Oթ1��������O�CM>ܟj�]��.~P	<��|�;�A�#܀������vk���ЫS�ꄘ�>e�t���ށ������J<��O��~:Y��o�
 ����G����$J��p)��<��O���T�6șHhM���7Lސ߅g#^�F�?&�M�=wx0(B9Vѱ�#�'����mM���P���Ĵ<�'�S�z�������<�T�"�M����!OZ�99��J>�(���K{u�66�Cig���ED@�����"�k���Д�b���e����J#�ph�z4��0��4
14	x�������.W���!��m;�j� l��Nx�b��� �{�	��������:��,w76�B�s|�U�c��z���#m���@:��_��g3��rg@С��F���oe)��A[#~#�E��}���|�'�x	�MxV�����&������}����%���ei��k�fv���ӹ�?�Ǉ�N����t��KǮ�m�������k�{
/c�]B�m��D� �����^��`�Ad�$���Ϲ���-E�ݺ%}�p���:x�z�옍K��'y�ǅ!mf�z�g�Л����$*���#\(��*y�S��ӨQ+C1�yi�ts�[g���=������?m�~p|ㆍ�] `����Sg�"���G���Z�% C�5=( ]��^�Y��1�SSC�&G����(�b$����4�A�S+��θ�Q����񎒘J�y�0�l�Α���-{ǝ��eva�Q�	�J�7|f��=����gʿ� 
x8e
d��f��.*3p��%8/�+.���Wn�D
)���%�:01�a�����8jmF�T��P��$6�r P�@�W0�iEr��?�"�$��k["ATϒ�n�O��AC�$,��L�#a��x-S� e�`ʂ��b�j�G�(TNj� =х^-���Q/��/dry�� ���L̺�	��j��7Eq��2��2}ʟ�E�i"=f.y=DH�:�|�2�g*8��ݹ���P�ⶉ�{� C5gn�Rf$l�ک�-3\ru�RG5$���=>ޜ ���6!V����.��0R���O�$i�%8hp�ծr�Ic�P��ܒ=��+tB��x�)�4��/�;�ob.BFl�3�܊:Z@'�x7Zpl��@o��oi�d
��Y��^!>5s F�o
�GJ�]�A!�$@���9
���/��?h����(���Aa5�xtx&v]B�O6���o�aF�?_�z��� d8��5�􁰝%�S��s��9y��g6	���`��0���#+�f�8��Mw��>��P`��R��g� ./W4�U
�L*���A �$T���
��B�7�?����o?��^��c��+����ዃ��d{$�3���+�<���)	-�*$M��ɝu��׃+͈���}����"�+;Zy�NFy 
2]*7_����Z��m Mh��a|e����p�q�]�o�����@���j�+���	��M�[Z�E���\)�yJ��m&�������Y��-j�u��'�UN�8ӌ�}��JD�V�5-?�� U���A'�$h���������|~�=iM�ȤÆ����(��[�P����qO���~�����52v��.N|����Y���c;0^|+�yps̆c�-j�.�%�y�8L�E���d�0CT���)m |$Q��;��m���E
�������8����C��мz
i�܍8�6)�pw�,U'þAd��lވc��K���y�_صl��їlC�xsb@�`h����A.�$|��X�^�`��NNr�=#�W�&�ϚŲ�kb�3=�H�]��_?�;�Sc��?��w'Ejf�[I�.�,�"��s;�{���NV��C2����v�}���:ﭬN��<��?��;�%�c�(7�iJﱯD'�p�ײ1[*b�g-F��B{��X���lȼ�E�B.!���Q���Jk������Үۙ��Y�7�"},긵�j���)��w�x#�ƙ�wɒ���xB��,T+R[ه{+c��ϖ��L����,���l
_���J�7�[�TtIl&��s,��a���������)l��]	��T��4/|�ۥ~ԃuE���'�OV$>�_5�����.He�[QqN)|^Գ-�l���C���څ���?���z�����gCcܗ���O![j`M�`�c��D�5��Ѫ�ڡp,�5���.U�_�M/_O/גY�<�*F��ĔU��Q�BWs�Ί�M��;��1�k⵩Q
m����,�!��RwڢwB~U"�.��T��g�1��I��M��z'�����bk`RN+U֍ �X)r�[�����V�Į��-;I�ց�f' ����̞�� ���,!����5"���
�s&(�Jc��1�#-���PMʹ�β�p6��
Zo{y�:����R�8<X��$�l]p�tJǔ��;&�{bHr?ܺM8����ܥґAE�[�[n��Ӊ>v*����HY� ��T?�9����23E�E�?/h. 
��H�|��B�cNo�8	�z�����Ϳ�w��!�E
�3=V*�W� ����vY]����J9�1�`���|�)��](��oL������i��G�����=�2U�k�R�U�^�Z��/l���*�����c	���Ю^ȋFb4N��~��i1�F�zJ�loPQ�Mr�|ɿO��gcvz���}$)�����{[�I~L���I)|U�U����X��Q�!C8�0^����,�ز����_��誟���ɷ��̉j�R�U+�^�Ƭ��_s��,�p���B�#*����b�Pl,�Y�
�D����E13���$�J[�<k�Յg�w��4�AO�$��6Q���S��^m]G�<�ʊYt�M��˽�f�P{W��x�vs���8d�@g�����^�)��<p���y�F�(q~��K评|��w#��0y5u�θ�l�6� T�xQ(c_����6���$��L:����c�J�zQ�i�`��x]�Js���Q��-!r2�x�`�r�f{䵌F#.#�7��%%K:k���-a����)h3.�/�7�>{P�q��;eD���\9�%�%��?*i��r޽�{PT����0�sZ�QU+Ή؋�T)H�<k��4L���:��Zi�v��	���!
ǾG��h���nV�/��AV�%���}soUz��(�$KU��Hhx��	g�$*���	�5D����mܶ�E��r�#>=qu(1�8�x�
a	L�Z��M�h�_�
 Ě�,�����<�'n4H�R�4��E��O�ʡ`�[>��p�
0�<��;��N���'����ϔ9`��3�̜��
\4y�X%D�W�0Z��,G���f�q�B$v����l�E�i��:
�9v�[|��͗«x6���f�����8���9�8C�Gf��y�t0�w�%���8
)�NL�����.���A,
v��$�S��y�m� v�,8���4��0���G��
}\�Vy��Sz$>���gd�����+�ڳ��I�v9��I:��%�Q�X�~
w����6�6%VI��
'�φ�Ľ��-MS��"`hiB$+���)��i{� $�\"#�rIی��&8�),c��W����-�����E���%��u�I	�l�-�]ug,ϟd?��hi�H�T��XhC���_1:LC��H�$E��@&O�Ɠ�|O�6^٣@��%X��ą�ɮ,h`�!�úu<��n�GJ������0��P[T�n�U���k�����Ȩъ����Uw�x�{ň$<�Q��eKػ�g���]��>�s����hN��[�\���	L��o�§!h^�kiț�xhr���,p�?z�ங�h�Tn�&Ɗ��]]�����q��SSFB0����s����1�6
��b�)xJN�8�<��c���ՠMN��Jʵ�el�}�A@x��};�l�X{� 9�@��%l��M|��9B�uk~b����~(�Ĵ�{�xR�'LS�ް�Y-��4���%Y����(
���],�A�v���]]�wc,���{�h|X�QF�Z����L�9�S�j#��O��`��w.��`��<�U@��#(�>�ؒ/r�R2��1'n~�Ƹzp���;`����tU!�uZ��g���u���%�Pb����I\����S~�"(A�k�Ѱ�A��%����ś�<�&���A����
��F�y
�Įp�s��R��A�%����~ޯй���r��)il[߬n&Nt���_z������x��C-�-�2SZ�PPz��G���Юc��SW�'�(n��N#��U����?�d1�(�
���ʉ�r`
n��fBK��dJ,=V}�Er�vC���U
�#��/���K0zz~��E:?�d|��4~�vR�)�<�5hl>�Mۯ���*�1�Ĳ��^?�t�P�HGO.Q�O���r�d�>8����M�=u���$D)yZ7�$�:��AS�%Ѐ�1���ʰ�^��y�
F����#�~Ժ-l)�JRiW~��X�q#���Y�C�U4�����R���Xnt���)⡆x�|%�C`Q�L�H.9�]W�	Nm�y�T��ы��ۡ�ݞFY��J�}�/i��/�)
�	u��
�eӳ��z����
����}_�7|�
:�p�S( Wh��`�#��֪"ہ�A0Mm+�=>"���K�JfkY_������
���yfF!<�80 ���{���{��C[K����e34';ot�=���
3�6tM%�]M �}򞮮Z`�g��E���+p��T܀�eI.��B���b��?!�2���� [��l
�J�=��0ap�m�.�))}u��r[��@�~�A{�%�������n)O�Ie�N���O�"v�[9 ������l�A��
R����V��3��
�)Zo��v�$*���K�,���&x����	Qs.1Eɏ���%��S���K�#�](�ѣ��-d��O� E/_�}VYk1�C�c:�xG�U��9��4�<s�d�e'fD��D���o"[.��X�r�.���L�|YW}+xb��<�km@���q3,��_Ux~O'���(�{E�aOtM�!M"\��c�l�~��\��� ?o2��������9�c+uA�?6�g����>{��4*�S?�~U�焝䪨yXX��!c��W�_Þ/x���u� �2W!SOd��˹�V<K����Ӭ�j���@�Au�&���4��Y̋����@�U�j7�H� ]E���Q��6�v�^vN��h�m��.�ܳ�)1����%as9q_+����$��6UjU�]�	�	%��n��$������!���n�+.
`J��@w��TͨsgK�T��%�j��x"�ux����]=�.���E�.������iѽ@�'l�%��1���[��0G/M�ޢ����i�r��&R��#O�@|;�O�#����3�1�2cV
ƚ3zi��6�U	�N�{�28�����ޢy]������A�y��d)����5vΑ��3ˤ�^X�q�瘢�1��-��>[2�L�I���4�F�P��� |lgNֺ�R�Hê�7)�5~��9,\Q-钪^��/�[=����j]��Lݝ�EYD
�|-@��FzK�+1}�ʗ�'��.&_��։{��%�8�<B���~)�CS;�:��?[��FY"3�/T���C�t"�	������ψ]����Q�@0qxۼ�b��cD�_H15�9*��֏�(�J���~�����NZ��x�̳��((��2_� Saw�,rjl6(��n�����^9��U�GbN����~&Ze��V�~v�d\>LlH�kT�s z6��M �,�'π�l���A�&\��X�(�2K��mS|>�9���N�r.��cq��tMV��43av)�X}�ދ^�i9�z�!����U��R���wr�%��+���*����Q���������hC����0��r�wj�\
~5ZN�Uދ��8(yn��02�����U���d/�\�%(��,}<��+�~%k�;P�A�&p��X�Z9�qj����֋"�n��*~$�$y0#���V��(��]G�U��ޭ�2�\�K�ueÊf-FK��X
��7A���LK2"���`6�X@_ ���P@�A�&���X�l B����X�p�����DW_����\�Bё8H?ϝ
��x� �k���'(�N�#�p��ߙ N2PwE�]5��'E�'�5�3i��xVu����~�<� eяp�b	$�xP��0I�A0�&���MWy�'�L�z�k�\N��f��M�S�� ��$�k�1h�p�ܑ��fZ6��9,��VA�����>hK.�o��]cLb��G�jpX}л'�>
]��(M�~=���V1H�ջ��\mQ�^:��ͻ1���{Dn�HI��9����g���q�~��������Yӝ:���J�WRp[(�����^H/p�ȋc�~��Kz�4ڻ�B-:HJ�1�9��m���)�嶓�	�h!��9��b P���"Z֨��
&�a�'rR�u�*d-�U��0�#�d�D����y
��̅t��ܥIAB�
�?ǿ,���D�I�@��
�?Ǿ,���iK#���z�%�,���iK#���z�%�,���iK#���z�%�,��s�9�v:�	m3f,��s�9�v:�	m3e,��s�9�v:�	m3d,��s�9�v:�	m3c,��$g̀}��O����z�,��$g̀}��O                                        t e x t               
      0                                                t e x t               
      0                                                t e x t               
      0                     
      q                           t e x t               
      0       8      0       8                                                                 X                                               https://codepen.io                    P   $   a 8 1 d b a 4 b - 8 7 b d - 4 a 6 7 - a 6 a f - b 2 5 e 3 9 b 1 d 7 9 2               P   $   9 6 3 9 0 4 a 7 - 1 4 9 a - 4 8 7 5 - b 0 0 5 - 3 4 4 1 4 4 c 6 d 7 d 7       https://codepen.io                    P   $   b 6 b e 0 a 3 3 - c 6 b 7 - 4 3 a 2 - 9 5 b 9 - 1 1 e 9 5 5 7 8 1 a d 2               P   $   e 8 e 4 c 1 e 4 - b 9 b c - 4 e 1 7 - 8 8 8 7 - 3 2 1 2 5 a 8 4 0 f f f         E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTU=      +   https://codepen.io/chireenjavier/pen/ZpObJr     4��4
/     �          ��t4
/ ��t4
/ ��������           �vj�
/ yt        K   https://www.programshelp.com/help/php/call_stored_procedure_in_laravel.html     C a l l   s t o r e d   p r o c e d u r e   i n   l a r a v e l $                                      �      x              `              h             `      :D��v� ;D��v� �      �      �      �      (                            �   K   h t t p s : / / w w w . p r o g r a m s h e l p . c o m / h e l p / p h p / c a l l _ s t o r e d _ p r o c e d u r e _ i n _ l a r a v e l . h t m l                 6      h t t p s : / / d u c k d u c k g o . c o m /                               8      0       8                                                                                                                  https://duckduckgo.com                P   $   4 c d 6 3 5 c 6 - 7 3 8 6 - 4 f 7 d - 9 d 5 5 - 5 a e d b 5 c a 5 b 9 a               P   $   9 e a e 1 2 b 2 - 6 7 8 3 - 4 9 c d - 8 e d a - 7 e 7 5 3 f e 0 a 6 1 1            https://duckduckgo.com/    K   https://www.programshelp.com/help/php/call_stored_procedure_in_laravel.html     �B�+/     �          �B�+/ ����������������          *�j�
/ �
      �
      8                            ^   +   h t t p s : / / w w w . y o u t u b e . c o m / w a t c h ? v = K Z G H C S I b 9 Q 0                 �   <   h t t p s : / / w w w . y o u t u b e . c o m / r e s u l t s ? s e a r c h _ q u e r y = s q l + o n + l a r a v e l +                                    �  �   ��
 
 
      1                                                c h e c k b o x               
      1                           o n     8      0       8                                                                                                                  �      �      x       �       �               P             H      ���u� ���u� �      �      �      �                                        a b o u t : b l a n k                 8      h t t p s : / / w w w . y o u t u b e . c o m /               n   3   < ! - - d y n a m i c F r a m e A 4 A 5 2 2 6 2 3 4 4 C 7 D 6 4 9 C 1 0 7 C 7 5 2 1 2 E F 8 E F - - >          8      0       8                                                                                                                  https://www.youtube.com               P   $   0 9 a 2 0 f b a - 6 7 0 3 - 4 c 2 3 - a f e 5 - e 5 b 0 2 c 6 4 1 c e c               P   $   6 6 6 c 7 0 c 3 - 5 9 8 2 - 4 0 9 3 - a a e 4 - 8 9 e c 1 a 7 b f 0 8 c �      x       �       �               P             H      ���u� ���u� �      �      �      �                                        a b o u t : b l a n k                 8      h t t p s : / / w w w . y o u t u b e . c o m /               n   3   < ! - - d y n a m i c F r a m e 0 4 8 3 2 8 1 C 7 6 1 9 C 1 3 1 7 5 C 5 8 C C 8 1 B 5 9 6 4 0 9 - - >          8      0       8                                                                                                                  https://www.youtube.com               P   $   8 a f 6 5 e b 6 - a 5 e e - 4 1 a 8 - b 8 e b - 7 8 f d 2 3 e 8 8 0 3 4               P   $   7 8 c d 7 6 7 d - 8 e b 7 - 4 0 9 6 - b c b c - 8 6 d c a f 8 d 2 d 9 7       https://www.youtube.com               P   $   4 a 2 b 4 1 5 1 - f 3 f d - 4 3 7 3 - 9 5 4 6 - 6 e 4 8 8 5 7 0 2 e 9 d               P   $   3 c 5 a 0 c 3 2 - 8 4 d d - 4 e b a - 8 8 1 6 - 9 9 3 3 6 a a 1 a 9 3 7         <   https://www.youtube.com/results?search_query=sql+on+laravel+   +   https://www.youtube.com/watch?v=KZGHCSIb9Q0     *��I+/     �          :�v:+/ :�v:+/ ��������    �
      �
                                   �   L   h t t p s : / / w w w . y o u t u b e . c o m / r e s u l t s ? s e a r c h _ q u e r y = s e n d + v i e w + t o + c o n t r o l l e r + l a r a v e l               �   <   h t t p s : / / w w w . y o u t u b e . c o m / r e s u l t s ? s e a r c h _ q u e r y = s q l + o n + l a r a v e l +                                    R  �   ��
 
 
      1                                                c h e c k b o x               
      1                           o n     8      0       8             �?                                                  @                                               �      �      x       �       �               P             H      ���u� ���u� �      �      �      �                                        a b o u t : b l a n k                 8      h t t p s : / / w w w . y o u t u b e . c o m /               n   3   < ! - - d y n a m i c F r a m e A 4 A 5 2 2 6 2 3 4 4 C 7 D 6 4 9 C 1 0 7 C 7 5 2 1 2 E F 8 E F - - >          8      0       8                                                                                                                  https://www.youtube.com               P   $   0 9 a 2 0 f b a - 6 7 0 3 - 4 c 2 3 - a f e 5 - e 5 b 0 2 c 6 4 1 c e c               P   $   6 6 6 c 7 0 c 3 - 5 9 8 2 - 4 0 9 3 - a a e 4 - 8 9 e c 1 a 7 b f 0 8 c �      x       �       �               P             H      ���u� ���u� �      �      �      �                                        a b o u t : b l a n k                 8      h t t p s : / / w w w . y o u t u b e . c o m /               n   3   < ! - - d y n a m i c F r a m e 0 4 8 3 2 8 1 C 7 6 1 9 C 1 3 1 7 5 C 5 8 C C 8 1 B 5 9 6 4 0 9 - - >          8      0       8                                                                                                                  https://www.youtube.com               P   $   8 a f 6 5 e b 6 - a 5 e e - 4 1 a 8 - b 8 e b - 7 8 f d 2 3 e 8 8 0 3 4               P   $   7 8 c d 7 6 7 d - 8 e b 7 - 4 0 9 6 - b c b c - 8 6 d c a f 8 d 2 d 9 7       https://www.youtube.com               P   $   f 2 9 5 4 3 0 d - 0 e 6 5 - 4 e 8 a - a 2 1 c - 4 0 d 8 1 9 2 a 0 f 0 f               P   $   d 5 2 4 3 a 8 e - 4 f 8 5 - 4 9 c 8 - 8 c d 7 - b d 9 d 8 e f 9 9 6 3 9         <   https://www.youtube.com/results?search_query=sql+on+laravel+   L   https://www.youtube.com/results?search_query=send+view+to+controller+laravel    ��I+/     �          :�v:+/ :�v:+/ ��������    %        Y   https://www.youtube.com/results?search_query=pass+data+from+controller+to+view+in+laravel   ;   ( 1 9 )   p a s s   d a t a   f r o m   c o n t r o l l e r   t o   v i e w   i n   l a r a v e l   -   Y o u T u b e   T  P     H                              �      x       @      �      �      P            �      ���u� ���u�              �
             X                            �   Y   h t t p s : / / w w w . y o u t u b e . c o m / r e s u l t s ? s e a r c h _ q u e r y = p a s s + d a t a + f r o m + c o n t r o l l e r + t o + v i e w + i n + l a r a v e l                     �   <   h t t p s : / / w w w . y o u t u b e . c o m / r e s u l t s ? s e a r c h _ q u e r y = s q l + o n + l a r a v e l +                                    l  �   ��
 
 
      1                                                c h e c k b o x               
      1                           o n     8      0       8             �?                                                                                                 �      �      x       �       �               P             H      ���u� ���u� �      �      �      �                                        a b o u t : b l a n k                 8      h t t p s : / / w w w . y o u t u b e . c o m /               n   3   < ! - - d y n a m i c F r a m e A 4 A 5 2 2 6 2 3 4 4 C 7 D 6 4 9 C 1 0 7 C 7 5 2 1 2 E F 8 E F - - >          8      0       8                                                                                                                  https://www.youtube.com               P   $   0 9 a 2 0 f b a - 6 7 0 3 - 4 c 2 3 - a f e 5 - e 5 b 0 2 c 6 4 1 c e c               P   $   6 6 6 c 7 0 c 3 - 5 9 8 2 - 4 0 9 3 - a a e 4 - 8 9 e c 1 a 7 b f 0 8 c �      x       �       �               P             H      ���u� ���u� �      �      �      �                                        a b o u t : b l a n k                 8      h t t p s : / / w w w . y o u t u b e . c o m /               n   3   < ! - - d y n a m i c F r a m e 0 4 8 3 2 8 1 C 7 6 1 9 C 1 3 1 7 5 C 5 8 C C 8 1 B 5 9 6 4 0 9 - - >          8      0       8                                                                                                                  https://www.youtube.com               P   $   8 a f 6 5 e b 6 - a 5 e e - 4 1 a 8 - b 8 e b - 7 8 f d 2 3 e 8 8 0 3 4               P   $   7 8 c d 7 6 7 d - 8 e b 7 - 4 0 9 6 - b c b c - 8 6 d c a f 8 d 2 d 9 7       https://www.youtube.com               P   $   e b 1 5 e 1 5 a - 0 c 4 4 - 4 7 c 8 - b e 2 1 - 5 d e c e d 6 6 6 d a b               P   $   9 0 b 6 6 e 6 8 - 4 4 4 0 - 4 e 5 c - 8 d 9 7 - d e 6 c 9 d 3 b 9 5 6 4         <   https://www.youtube.com/results?search_query=sql+on+laravel+   Y   https://www.youtube.com/results?search_query=pass+data+from+controller+to+view+in+laravel       m���+/     �          :�v:+/ :�v:+/ ��������          ��k�
/ 	           chrome://newtab/   N e w   T a b   t  p     h                              �      x               �               �              �       	+��v� 
+��v�       (                     x                            (      c h r o m e : / / n e w t a b /                             8      0       8             �?8       P                                                                 h t m l                                                                     P   $   f 4 b a 5 4 d 1 - 2 a 1 4 - 4 f e c - 9 d d 2 - b c d c 9 c 7 5 4 d f 7               P   $   7 a a c 2 b 8 a - a 7 f a - 4 3 6 6 - 8 e b 7 - f 4 c d e d a 6 0 6 a 8                  chrome://newtab/    �:�+/     �          �:�+/ ���������:�+/     �	�	       ?   https://duckduckgo.com/?q=call+view+query+sql&atb=v290-7&ia=web !   c a l l   v i e w   q u e r y   s q l   a t   D u c k D u c k G o   �  �     �                              �      x                            `             �      4��v� 4��v� �            (      @      �                            �   ?   h t t p s : / / d u c k d u c k g o . c o m / ? q = c a l l + v i e w + q u e r y + s q l & a t b = v 2 9 0 - 7 & i a = w e b                                      D  �   ��
 
 
      1                            s t a t e _ h i d d e n                     t e x t               
      0       8      0       8             �?                                                  �                                               �      x       �                     �             x      4��v� 4��v� �      �      �      �      @                            J   !   h t t p s : / / d u c k d u c k g o . c o m / p o s t 3 . h t m l                     6      h t t p s : / / d u c k d u c k g o . c o m /                 n   3   < ! - - d y n a m i c F r a m e A B F A D 5 E F A 2 6 4 1 7 3 5 C 7 9 6 4 A B 9 E B E 6 C D 6 B - - >          8      0       8                                                                                                                  https://duckduckgo.com                P   $   6 3 7 d 3 7 1 d - 3 b 4 2 - 4 a 5 6 - b 8 2 a - f 4 9 b b b 0 9 c 1 8 b               P   $   e 5 a 2 5 9 5 e - 1 d b 7 - 4 2 2 6 - b c 2 9 - 1 7 f e c 7 b f 8 a 1 2       https://duckduckgo.com                P   $   0 f b 5 8 9 8 2 - b 3 0 b - 4 9 e 9 - b b b 8 - 6 0 a 4 e 9 0 9 e 0 7 a               P   $   5 1 2 a 2 5 1 3 - a c b c - 4 4 5 6 - 9 7 9 4 - b 7 f 1 1 7 6 d 0 9 4 f                8   https://duckduckgo.com/?q=call+view+query+sql&atb=v290-7    �
/     �          ��/ 
/ ��/ 
/ ��������          LRl�
/ 	           chrome://newtab/   N e w   T a b   t  p     h                              �      x               �               �              �       �� �v� �� �v�       (                     x                            (      c h r o m e : / / n e w t a b /                             8      0       8             �?8       P                                                                 h t m l                                                                     P   $   e 3 6 7 7 6 4 9 - f 3 3 3 - 4 a 5 1 - a 9 2 8 - 5 7 2 2 4 3 0 e 9 6 b f               P   $   5 6 f 9 6 4 5 9 - 8 9 2 8 - 4 0 3 c - 9 0 3 c - 7 d b 0 4 4 3 2 c 2 a 1                  chrome://newtab/    $���+/     �          $���+/ ��������$���+/     
 
       L   https://duckduckgo.com/?q=call+stored+procedure+on+laravel&atb=v290-7&ia=web.   c a l l   s t o r e d   p r o c e d u r e   o n   l a r a v e l   a t   D u c k D u c k G o �  �     �                              �      x                     (      �             �      ��!�v� ��!�v�        8      P      h      �                            �   L   h t t p s : / / d u c k d u c k g o . c o m / ? q = c a l l + s t o r e d + p r o c e d u r e + o n + l a r a v e l & a t b = v 2 9 0 - 7 & i a = w e b                                    R  �   ��
 
 
      1                            s t a t e _ h i d d e n                     t e x t               
      0       8      0       8             �?                                                                                                   �      x       �                     �             x      ��!�v� ��!�v� �      �      �      �      @                            J   !   h t t p s : / / d u c k d u c k g o . c o m / p o s t 3 . h t m l                     6      h t t p s : / / d u c k d u c k g o . c o m /                 n   3   < ! - - d y n a m i c F r a m e 1 B 9 6 3 9 A B 4 D 3 7 4 E B E A A 2 2 3 2 6 9 3 B 8 E 0 3 6 3 - - >          8      0       8                                                                                                                  https://duckduckgo.com                P   $   7 1 8 f 5 9 d 1 - 3 8 7 0 - 4 f 5 e - b 1 7 3 - 8 5 f 1 0 4 a 5 2 1 d 5               P   $   e c 5 4 c 1 7 d - e d a f - 4 0 d 0 - 9 4 7 f - 0 1 5 7 e 2 7 c 5 4 4 e       https://duckduckgo.com                P   $   2 8 8 f c 7 8 e - 4 a 4 b - 4 2 3 5 - 8 d 1 6 - 5 8 9 1 1 a 6 f 8 4 5 3               P   $   c 4 c 1 6 2 0 2 - 7 7 7 0 - 4 4 0 d - 9 e f 5 - 1 1 7 5 e 6 a 4 b 5 3 5              :   https://duckduckgo.com/?q=call+stored+procedure+on+laravel      �9�+/     �          �_��+/ ���������_��+/            l�
/ up        6   https://www.tutorialspoint.com/sql/sql-using-views.htm     S Q L   -   U s i n g   V i e w s   d  `     X                              �      x       �       8              @             �      ��G�v� ��G�v� �      �      �            h                            t   6   h t t p s : / / w w w . t u t o r i a l s p o i n t . c o m / s q l / s q l - u s i n g - v i e w s . h t m                   6      h t t p s : / / d u c k d u c k g o . c o m /                        8      0       �       �       �                                   h   0   
 
 
      1                        
   t e x t _ n o t e s                         t e x t a r e a               
      0       8      0       8                                                                                                                  https://duckduckgo.com                P   $   6 5 c 6 b 1 e a - d 3 9 f - 4 f 9 1 - a 1 a b - 3 d e f 7 8 7 8 0 0 6 b               P   $   8 4 8 2 9 5 2 3 - 6 b 5 5 - 4 9 4 7 - 8 f e f - d 7 a d 6 2 6 e 7 5 7 7            https://duckduckgo.com/    6   https://www.tutorialspoint.com/sql/sql-using-views.htm      lB�
/     �          lB�
/ ����������������           ��l�
/ ��        L   https://stackoverflow.com/questions/24783256/how-to-use-views-in-sql-queries=   s q l   s e r v e r   -   H o w   t o   u s e   V I E W S   i n   S Q L   Q u e r i e s   -   S t a c k   O v e r f l o w           �
                              �      x              `              h             @	      2�&�v� 3�&�v� �	      �	      �	      �	      
                            �   L   h t t p s : / / s t a c k o v e r f l o w . c o m / q u e s t i o n s / 2 4 7 8 3 2 5 6 / h o w - t o - u s e - v i e w s - i n - s q l - q u e r i e s               6      h t t p s : / / d u c k d u c k g o . c o m /                        (  $          �      �      �      �      �            `      p      �      �      �                   8      �      �      �      �      (      H      `      x      H      `      �      �      �      �      �            0      H      `      �      �                    h   0   
 
 
      5                                                t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / q / 2 4 7 8 3 2 5 6                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 2 4 7 8 3 5 6 5                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 2 4 7 8 3 4 7 5                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 2 4 7 8 3 3 3 8                     f e e d - u r l                     t e x t               
      0                     �   `   h t t p s : / / s t a c k o v e r f l o w . c o m / q u e s t i o n s / 2 4 7 8 3 2 5 6 / a n s w e r / s u b m i t   [ q u a l i t y B a n W a r n i n g S h o w n   r e f e r r e r   ]   # 0               
      4                            d i s p l a y - n a m e                     t e x t               
      0                        	   m - a d d r e s s                           t e x t               
      0                           a u t h o r                         t e x t               
      0                        	   p o s t - t e x t                           t e x t a r e a               
      0       8      0       8             �?                                                  �                                               https://duckduckgo.com                P   $   9 2 f 8 2 b 3 e - 9 a c b - 4 a d 5 - b 0 3 8 - 7 8 f 8 b f 9 8 d c 7 7               P   $   c 5 1 f b c b 5 - 0 f f b - 4 f d 7 - a 6 d 7 - c 8 6 3 a 9 0 c a 9 4 5            https://duckduckgo.com/    L   https://stackoverflow.com/questions/24783256/how-to-use-views-in-sql-queries    t �
/     �          t �
/ ����������������           �m�
/ ��        T   https://stackoverflow.com/questions/30498227/how-to-call-stored-procedure-on-laravel?   p h p   -   H o w   t o   c a l l   s t o r e d   p r o c e d u r e   o n   L a r a v e l ?   -   S t a c k   O v e r f l o w   <
  8
     0
                              �      x       0      p              x             x      N=�v� O=�v� �      �      �      �      @	                            �   T   h t t p s : / / s t a c k o v e r f l o w . c o m / q u e s t i o n s / 3 0 4 9 8 2 2 7 / h o w - t o - c a l l - s t o r e d - p r o c e d u r e - o n - l a r a v e l               6      h t t p s : / / d u c k d u c k g o . c o m /                                     p      �      �      �      �      �                   8      �      �      �      �      (      8      P      h      �      �      �      �      �                    8      P      x      �      �      �      �                    h   0   
 
 
      4                           f e e d - u r l                     t e x t               
      0                                                t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / q / 3 0 4 9 8 2 2 7                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 3 5 4 9 9 3 8 4                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 3 0 5 1 1 0 1 4               �   `   h t t p s : / / s t a c k o v e r f l o w . c o m / q u e s t i o n s / 3 0 4 9 8 2 2 7 / a n s w e r / s u b m i t   [ q u a l i t y B a n W a r n i n g S h o w n   r e f e r r e r   ]   # 0               
      4                        	   m - a d d r e s s                           t e x t               
      0                           a u t h o r                         t e x t               
      0                            d i s p l a y - n a m e                     t e x t               
      0                        	   p o s t - t e x t                           t e x t a r e a               
      0       8      0       8             �?                                                  X                                               https://duckduckgo.com                P   $   3 6 a 4 c e c c - 6 0 f 4 - 4 a c 7 - a a 7 b - c e b e 2 d 7 b 2 2 f 8               P   $   5 e 5 7 c 9 b 1 - 7 b 4 d - 4 d 9 7 - a 4 a c - 9 f 2 c 8 7 1 6 8 a d 1            https://duckduckgo.com/    T   https://stackoverflow.com/questions/30498227/how-to-call-stored-procedure-on-laravel    �[��+/     �          �[��+/ ����������������           
/ yt        Y   https://stackoverflow.com/questions/34497063/how-to-execute-stored-procedure-from-laravel   C   p h p   -   H o w   t o   e x e c u t e   S t o r e d   P r o c e d u r e   f r o m   L a r a v e l   -   S t a c k   O v e r f l o w   �  �     �                              �      x       @      �              �             �      > ��v� ? ��v� 8      P      P      h      �                            �   Y   h t t p s : / / s t a c k o v e r f l o w . c o m / q u e s t i o n s / 3 4 4 9 7 0 6 3 / h o w - t o - e x e c u t e - s t o r e d - p r o c e d u r e - f r o m - l a r a v e l                     6      h t t p s : / / d u c k d u c k g o . c o m /                        H  H   @      �      �      �      �      �      �             8      P      x      �      �      �      �      �            0      P      h      �      �      �      �            (      @      X      �      �      �      �      H      X      p      �      �      �                   x      �      �      �      	       	      8	      P	      �	      �	      �	      �	      @
      P
      h
      �
      �
      �
                   p      �      �      �                  0      H      �      �      �      �                    h   0   
 
 
      4                        	   p o s t - t e x t                           t e x t a r e a               
      0                        	   m - a d d r e s s                           t e x t               
      0                            d i s p l a y - n a m e                     t e x t               
      0                           a u t h o r                         t e x t               
      0                           N o   o w n e r                     1 4                         f e e d - u r l                     t e x t               
      0                                                t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / q / 3 4 4 9 7 0 6 3                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 3 4 4 9 7 1 1 4                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 3 9 2 6 2 2 2 1                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 5 0 4 8 7 0 7 8                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 5 1 7 6 3 1 1 4                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 5 2 1 3 0 9 3 7                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 4 8 7 3 1 0 6 0                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 5 5 7 9 0 3 7 7                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 5 0 7 5 2 4 0 3                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 5 1 7 0 0 8 3 3                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 5 9 9 1 0 1 2 7                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 6 4 1 7 8 1 3 5                                          t e x t               
      1                     P   $   h t t p s : / / s t a c k o v e r f l o w . c o m / a / 6 6 0 1 8 4 1 2 8      0       8                                                                                                                  https://duckduckgo.com                P   $   b 6 8 c 3 c 3 6 - 8 5 3 b - 4 c 3 b - a f c a - e 5 4 1 0 e f 4 2 9 5 6               P   $   9 b c 4 a d 4 d - 1 3 a 1 - 4 3 4 a - a e 2 7 - 1 3 a 4 c c 4 d 8 8 3 4            https://duckduckgo.com/    Y   https://stackoverflow.com/questions/34497063/how-to-execute-stored-procedure-from-laravel       �b,�+/     �          �b,�+/ ����������������           �o�
/         V   https://medium.com/coding17/how-to-execute-stored-procedure-using-laravel-8d067c306154  T   H o w   t o   E x e c u t e   S t o r e d   P r o c e d u r e   U s i n g   L a r a v e l   |   b y   N i s h i t   M a h e t a   |   c o d i n g 1 7   |   M e d i u m <  8     0                              �      x       8      x              �             x      �p��v� �p��v� �      �      �      �      @                            �   V   h t t p s : / / m e d i u m . c o m / c o d i n g 1 7 / h o w - t o - e x e c u t e - s t o r e d - p r o c e d u r e - u s i n g - l a r a v e l - 8 d 0 6 7 c 3 0 6 1 5 4                   6      h t t p s : / / d u c k d u c k g o . c o m /                               8      0       8             �?                                                                                                   https://duckduckgo.com                P   $   0 1 4 b 4 3 9 0 - 4 2 c 1 - 4 a d 6 - b b 0 8 - 1 0 b 9 6 0 6 b 0 9 5 6               P   $   6 4 e 4 8 5 a 0 - 4 c 0 b - 4 1 1 0 - b 1 c 5 - 2 7 0 5 6 b 1 d 7 b 1 6            https://duckduckgo.com/    V   https://medium.com/coding17/how-to-execute-stored-procedure-using-laravel-8d067c306154      ݹ%�+/     �          ݹ%�+/ ����������������           �m��
/         4   https://www.mockplus.com/blog/post/search-bar-designC   2 0   C r e a t i v e   S e a r c h   B a r   D e s i g n   I n s p i r a t i o n s   w i t h   H T M L / C S S /   B o o t s t r a p   �  �     �                              �      x       �       0              8             �      ��v� ��v� (      @      @      X      �                            p   4   h t t p s : / / w w w . m o c k p l u s . c o m / b l o g / p o s t / s e a r c h - b a r - d e s i g n               6      h t t p s : / / d u c k d u c k g o . c o m /                        P   	   H       �       �       �                    0      @      X                    h   0   
 
 
      2                                                t e x t               
      0                                                t e x t               
      0       8      0       8             �?                                                  �                                               https://duckduckgo.com                P   $   9 5 6 7 7 8 b 1 - 8 a 5 9 - 4 a c e - 9 6 a 3 - 3 4 b b d 7 1 1 6 b c 8               P   $   b 9 a f d 1 1 7 - 8 0 6 3 - 4 b d d - b a 8 d - 4 5 9 2 b e 6 9 3 d 7 d            https://duckduckgo.com/    4   https://www.mockplus.com/blog/post/search-bar-design    ��
/     �          ��
/ ����������������           R���
/          \   https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=data-table-with-search-box&   L i v e   D e m o :   B o o t s t r a p   S i m p l e   D a t a   T a b l e D
  @
     8
                              �      x       @                     (             �      /��v� 0��v� �            �      �      H	                            �   \   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / c o d e l a b . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x               �   e   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x                            x      p       �                    (      H      `      x      �      �      �      �      �                          h   0   
 
 
      3                                                c h e c k b o x               
      1                           o f f                       c o d e                     t e x t a r e a               
      0                                                t e x t a r e a               
      1                            8      0       8                                                                                                                  �      x               �               �                     1��v� 2��v� `      x      x      �      �                                  a b o u t : b l a n k                       p r e v i e w   @      8       �       �       �       �                                  h   0   
 
 
      1                                                t e x t               
      1                           t h o m a s     8      0       8                                                                 r                                          (       https://www.tutorialrepublic.com              P   $   8 6 f 2 0 6 f e - f b b 1 - 4 b 3 5 - a d 0 a - b 6 6 a 2 c f 4 2 7 4 b               P   $   1 e c 1 0 a 8 4 - 3 c 1 f - 4 7 9 b - a 0 e 1 - 4 1 c 9 5 d d e b 5 0 d (       https://www.tutorialrepublic.com              P   $   5 e 9 f c 7 7 4 - 1 d 5 f - 4 5 a d - b 6 8 3 - 6 b 2 8 9 1 8 a 6 a 1 a               P   $   9 8 e 1 4 5 c 1 - e f 6 5 - 4 4 4 2 - 9 c e 8 - 7 5 c 2 2 2 9 9 e a 9 c         e   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=data-table-with-search-box      \   https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=data-table-with-search-box    o�
/     �          o�
/ ����������������    ��        \   https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=data-table-with-search-box&   L i v e   D e m o :   B o o t s t r a p   S i m p l e   D a t a   T a b l e �
  �
     �
                              �      x       @                     (             �      /��v� 0��v� �            x	      �	      �	                            �   \   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / c o d e l a b . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x               �   e   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x                            x      p       �                    (      H      `      x      �      �      �      �      �                          h   0   
 
 
      3                                                c h e c k b o x               
      1                           o f f                       c o d e                     t e x t a r e a               
      0                                                t e x t a r e a               
      1                            8      0       8                                                                                                                  �      x               @              X             �      3��v� 2��v�                     @      �                            �   ]   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / c o d e l a b . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x #                           p r e v i e w   @      8       �       �       �       �                                  h   0   
 
 
      1                                                t e x t               
      1                           t h o m a s     8      0       8                                                                                                            (       https://www.tutorialrepublic.com              P   $   0 a 2 e 5 7 c 2 - 3 b 6 b - 4 c 2 9 - b 6 b b - d 8 8 e b e 8 9 4 b 2 4               P   $   8 8 5 8 5 e 0 b - b f 7 2 - 4 3 3 e - a 2 6 3 - 6 2 5 9 5 3 5 3 7 a 4 5 (       https://www.tutorialrepublic.com              P   $   5 e 9 f c 7 7 4 - 1 d 5 f - 4 5 a d - b 6 8 3 - 6 b 2 8 9 1 8 a 6 a 1 a               P   $   9 8 e 1 4 5 c 1 - e f 6 5 - 4 4 4 2 - 9 c e 8 - 7 5 c 2 2 2 9 9 e a 9 c         e   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=data-table-with-search-box      \   https://www.tutorialrepublic.com/codelab.php?topic=bootstrap&file=data-table-with-search-box    ��
/                o�
/ o�
/ ��������     !      ���
/ I#D#  !      &   https://codepen.io/shaban07/pen/BxwqyR  #   P a g i n a t i o n   t a b l e   w i t h   s e a r c h   o p t i o n   L"  H"     @"                              �      x               �       �       �              (      ���v� ���v� �      �      �       �       P!                            T   &   h t t p s : / / c o d e p e n . i o / s h a b a n 0 7 / p e n / B x w q y R                                              ��
      8
      X
      p
      �
      �
      �
      �
             8      `      x      �      �      �      �                   H      h      �      �      �      �       
 
 
      1                     "   
      0                           N o   o w n e r                     2 7                   &      j s - p r e p r o c e s s o r                    
   s e l e c t - o n e                   
      2                           n o n e               
      0                        	   a u t o - s a v e                           c h e c k b o x               
      1                           o n                         t a b - s i z e                  
   s e l e c t - o n e                   
      2                     
      2                     
      1                            h e a d - c o n t e n t                     t e x t a r e a               
      0                            e x t e r n a l - c s s                     t e x t               
      0                            e x t e r n a l - c s s                     t e x t               
      0                           p r e f i x                         r a d i o                     
      1                           o f f                       p r e f i x                         r a d i o                     
      1                           o f f                       p r e f i x                         r a d i o                     
      1                           o n                         e x t e r n a l - j s                       t e x t               
      0                           e x t e r n a l - j s                       t e x t               
      0                        
   s t a r t e r c s s                         r a d i o                     
      1                           o f f                    
   s t a r t e r c s s                         r a d i o                     
      1                           o f f                    
   s t a r t e r c s s                         r a d i o                     
      1                           o n                   *      h t m l - p r e p r o c e s s o r                        
   s e l e c t - o n e                   
      2                           n o n e               
      0                           i n d e n t - w i t h                       r a d i o                     
      1                           o n                         i n d e n t - w i t h                       r a d i o                     
      1                           o f f                       z o o m - c h o i c e                    
   s e l e c t - o n e                   
      2                           1 . 0                 
      0                     $      f o r m a t _ o n _ s a v e                         c h e c k b o x               
      1                           o f f                        h t m l - c l a s s e s                     t e x t               
      0                     (      c s s - p r e p r o c e s s o r                  
   s e l e c t - o n e                   
      2                           n o n e               
      0                                                t e x t a r e a               
      1                                                                     t e x t a r e a               
      1                                                                     t e x t a r e a               
      1                                                                     t e x t a r e a               
      0                                                t e x t a r e a               
      0                           a u t o - r u n                     c h e c k b o x               
      1                           o n     8      0       8             �?8       P                                                                 h t m l                                                             X      �      x       �                     (             H      �)�v�  �)�v� �                  (      �                            X   (   h t t p s : / / c d p n . i o / s h a b a n 0 7 / f u l l p a g e / B x w q y R               .      h t t p s : / / c o d e p e n . i o /                       C o d e P e n   `      X       �       �                     H      `      x      �      �      �                    h   0   
 
 
      2                           s t a t e                        
   s e l e c t - o n e                   
      2                           1 0                   
      0                                                t e x t               
      0       8      0       8               8       �                                         C                 P   $   h t m l > b o d y > d i v > . h e a d e r _ w r a p > . n u m _ r o w s         ��C  �                                             https://codepen.io                    P   $   e e 9 0 9 6 9 b - c e 1 3 - 4 1 5 5 - b b 4 1 - b 3 8 a c 7 2 f b c 0 d               P   $   8 7 e 1 a 4 b f - f 4 f c - 4 b 8 e - b 5 1 4 - 6 6 b 5 2 f 0 e 0 5 f 4 �      x       P      �              �             8      !�)�v� "�)�v� x      �      �      �                                   �   c   h t t p s : / / c d p n . i o / c p / i n t e r n a l / b o o m b o o m / i n d e x . h t m l ? k e y = i n d e x . h t m l - f f 7 4 7 6 d 4 - a 2 d a - 9 9 a 0 - 7 2 e c - c 3 2 4 a 0 3 0 c 2 2 3                 .      h t t p s : / / c o d e p e n . i o /                 n   3   < ! - - d y n a m i c F r a m e 7 6 2 4 3 C 4 0 5 4 2 2 2 4 1 5 9 4 6 1 8 C B 5 8 B A 7 B B 8 5 - - >   h      `       �       �             (      P      h      �      �      �      �      �                    h   0   
 
 
      2                           s t a t e                        
   s e l e c t - o n e                   
      2                           1 0                   
      0                                                t e x t               
      1                            8      0       8                                                                                                                  https://codepen.io                    P   $   a 6 b e 0 8 8 e - 4 2 b 6 - 4 a 2 e - 8 c e 6 - 6 0 a b 5 3 c 9 8 9 e 3               P   $   6 7 4 f 3 c c 3 - 8 7 8 2 - 4 0 2 a - b 2 4 a - b 5 7 1 e 3 d a 1 5 7 4       https://codepen.io                    P   $   1 3 7 9 3 6 8 c - 7 1 a 0 - 4 b a 1 - 8 9 f 3 - a 1 0 3 0 f 3 1 6 8 b f               P   $   e 1 e 0 7 c 5 1 - 5 8 f 6 - 4 c b 2 - a 5 c e - 2 4 d 7 8 2 9 5 d f a 5               &   https://codepen.io/shaban07/pen/BxwqyR      /�O
/     �          �.
/ ���������.
/     ��  !     "   https://codepen.io/accounts/signup  >   P R O   P l a n s   |   C o d e P e n :   B u i l d ,   T e s t ,   a n d   D i s c o v e r   F r o n t - e n d   C o d e . t  p     h                              �      x       �       0              8             �      ���v� ���v� �                         x                            L   "   h t t p s : / / c o d e p e n . i o / a c c o u n t s / s i g n u p                   T   &   h t t p s : / / c o d e p e n . i o / s h a b a n 0 7 / p e n / B x w q y R                          8      0       �       �       �       �                           h   0   
 
 
      1                                                t e x t a r e a               
      0       8      0       8             �?8       P                                                                 h t m l                                                             https://codepen.io                    P   $   9 1 6 0 d 3 e 3 - f 5 1 5 - 4 2 0 3 - b 5 a f - d f 4 d d 2 c 1 8 5 3 b               P   $   e d 3 d 9 4 a 9 - c f 8 9 - 4 0 a d - a c a 8 - a 3 9 3 b 2 7 2 7 1 0 9    @    &   https://codepen.io/shaban07/pen/BxwqyR     &   https://codepen.io/shaban07/pen/BxwqyR      �c1M
/     �          �c1M
/ �.
/ �.
/      "     ����
/ ��  "     E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTI=      C o d e P e n   S e a r c h t  p     h                              �      x             �      �      �             �      X�F�v� G�F�v� �                         x                            �   E   h t t p s : / / c o d e p e n . i o / s e a r c h / p e n s ? q = t a b l e + s e a r c h & c u r s o r = Z D 0 x J m 8 9 M C Z w P T I =                     v   7   h t t p s : / / c o d e p e n . i o / ? c u r s o r = Z D 0 x J m 8 9 M C Z w P T E m d j 0 2 M j M 5 N w = =                                      $      ��
 
 
      4                                             
   s e l e c t - o n e                   
      2                        	   R E L E V A N C E                     
      0                                             
   s e l e c t - o n e                   
      2                        
   E V E R Y T H I N G                   
      0                                                c h e c k b o x               
      1                           o f f                                            t e x t a r e a               
      0       8      0       8             �?8       P                                                                 h t m l                                                             https://codepen.io                    P   $   2 0 3 3 e 9 9 9 - d 4 2 4 - 4 f 4 d - b 8 4 0 - a 0 3 4 3 b 5 8 7 b d a               P   $   b a c b 1 f f b - d d 7 e - 4 a 1 c - 9 5 8 b - 9 7 2 c b 8 e 6 0 d 3 d        7   https://codepen.io/?cursor=ZD0xJm89MCZwPTEmdj02MjM5Nw==    E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTI=       `5k0
/     �          ���
/ hX�/
/ ��
/     ��  "        https://codepen.io/login
 
 
      1                           e m a i l                           t e x t               
      0                           N o   o w n e r               
      1                                                t e x t a r e a               
      0                     b   -   h t t p s : / / c o d e p e n . i o / l o g i n # 0   [ f o r g o t - e m a i l   ]   # 0                     
      1                            f o r g o t - e m a i l                     t e x t               
      0       8      0       8             �?8       P                                                                 h t m l                                                             https://codepen.io                    P   $   6 e 9 f 5 7 3 c - d 8 c 0 - 4 f e a - b a 0 f - 2 7 f 4 7 8 4 2 8 4 4 b               P   $   e 9 8 0 5 c 5 c - e 8 7 6 - 4 a 4 2 - a 9 4 9 - 9 4 8 3 7 b 8 8 e 1 f b         E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTI=         https://codepen.io/login    Ǵ�0
/     �          Ǵ�0
/ ���
/ ��
/     
�	  "     F  https://github.com/login?client_id=1d46d447dfcd2ccd7b18&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D1d46d447dfcd2ccd7b18%26redirect_uri%3Dhttps%253A%252F%252Fcodepen.io%252Fauth%252Fgithub%252Fcallback%26response_type%3Dcode%26scope%3Duser%253Aemail%252Cgist%26state%3D320c02369b3e64090fd9deda552c72427ca33a264b2b0a7f     S i g n   i n   t o   G i t H u b   �   G i t H u b �  �     �                              �      x             P              X             �      �h�v� �h�v� h      �      �      �      �                            �  F  h t t p s : / / g i t h u b . c o m / l o g i n ? c l i e n t _ i d = 1 d 4 6 d 4 4 7 d f c d 2 c c d 7 b 1 8 & r e t u r n _ t o = % 2 F l o g i n % 2 F o a u t h % 2 F a u t h o r i z e % 3 F c l i e n t _ i d % 3 D 1 d 4 6 d 4 4 7 d f c d 2 c c d 7 b 1 8 % 2 6 r e d i r e c t _ u r i % 3 D h t t p s % 2 5 3 A % 2 5 2 F % 2 5 2 F c o d e p e n . i o % 2 5 2 F a u t h % 2 5 2 F g i t h u b % 2 5 2 F c a l l b a c k % 2 6 r e s p o n s e _ t y p e % 3 D c o d e % 2 6 s c o p e % 3 D u s e r % 2 5 3 A e m a i l % 2 5 2 C g i s t % 2 6 s t a t e % 3 D 3 2 0 c 0 2 3 6 9 b 3 e 6 4 0 9 0 f d 9 d e d a 5 5 2 c 7 2 4 2 7 c a 3 3 a 2 6 4 b 2 b 0 a 7 f                   .      h t t p s : / / c o d e p e n . i o /                        X   
   P       �       H      `      �      �      �      �      (      @                    h   0   
 
 
      2                           l o g i n                           t e x t               
      1                     6      e m a u r i c i o a @ m i u m g . e d u . g t                 .      r e q u i r e d _ f i e l d _ 7 d c e                       t e x t               
      0       8      0       8             �?8       P                                                                 h t m l                                                             https://codepen.io                    P   $   7 b 7 2 1 c 5 d - c 5 c 9 - 4 a c 0 - a 6 a c - 8 4 6 d b 1 f 4 5 b a 2               P   $   d 7 c 8 7 a 7 e - 1 c f 3 - 4 0 9 7 - b 1 6 c - 5 d e 2 5 8 7 c 4 b 6 9           https://codepen.io/       https://codepen.io/auth/github      h��1
/     �          h��1
/ Ǵ�0
/ ��
/     up  "     E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTI=      C o d e P e n   S e a r c h �  �     �                              �      x                                         �      ��v� ��v� �            h
      �
      �
                            �   E   h t t p s : / / c o d e p e n . i o / s e a r c h / p e n s ? q = t a b l e + s e a r c h & c u r s o r = Z D 0 x J m 8 9 M C Z w P T I =                     �  �   h t t p s : / / g i t h u b . c o m / l o g i n / o a u t h / a u t h o r i z e ? c l i e n t _ i d = 1 d 4 6 d 4 4 7 d f c d 2 c c d 7 b 1 8 & r e d i r e c t _ u r i = h t t p s % 3 A % 2 F % 2 F c o d e p e n . i o % 2 F a u t h % 2 F g i t h u b % 2 F c a l l b a c k & r e s p o n s e _ t y p e = c o d e & s c o p e = u s e r % 3 A e m a i l % 2 C g i s t & s t a t e = 3 2 0 c 0 2 3 6 9 b 3 e 6 4 0 9 0 f d 9 d e d a 5 5 2 c 7 2 4 2 7 c a 3 3 a 2 6 4 b 2 b 0 a 7 f                      �      �             0      H      X      �      �      �      �      �            (      P      h      x      �      �      �      �      �                    h   0   
 
 
      4                                             
   s e l e c t - o n e                   
      2                        	   R E L E V A N C E                     
      0                                             
   s e l e c t - o n e                   
      2                        
   E V E R Y T H I N G                   
      0                                                t e x t a r e a               
      0                                                c h e c k b o x               
      1                           o f f   8      0       8                                                                                                                  �      x       �                     �             �      �)�v� �)�v�                    0      �                            `   ,   h t t p s : / / c d p n . i o / r y a n s p o o n e / f u l l c p g r i d / N P E y R e               .      h t t p s : / / c o d e p e n . i o /                 n   3   < ! - - d y n a m i c F r a m e C A 0 2 7 B B 6 8 9 F D E 8 D 8 2 F B C D 3 3 E A 1 3 4 E 7 F C - - >          8      0       8               8       `                                                              
   # i n p u t - d i v                  �A                                             https://codepen.io                    P   $   f 1 a d c 0 1 b - 0 8 0 3 - 4 8 0 7 - b b 7 8 - 5 c f 2 7 5 f 7 f b 8 e               P   $   2 c 1 d a 5 8 c - 5 e c d - 4 1 b 6 - 8 a 0 c - 6 9 9 5 6 c 7 a 8 f e 5       https://github.com                    P   $   d 5 0 6 3 3 3 6 - 2 8 b 9 - 4 d d 6 - 9 c 7 3 - e a 7 8 5 5 0 1 c b b f               P   $   7 9 f 4 c 9 3 9 - 6 c 4 0 - 4 3 4 d - 9 7 b e - 9 3 5 f 8 b 2 5 d 5 d 9    @    �   https://github.com/login/oauth/authorize?client_id=1d46d447dfcd2ccd7b18&redirect_uri=https%3A%2F%2Fcodepen.io%2Fauth%2Fgithub%2Fcallback&response_type=code&scope=user%3Aemail%2Cgist&state=320c02369b3e64090fd9deda552c72427ca33a264b2b0a7f   �   https://github.com/login/oauth/authorize?client_id=1d46d447dfcd2ccd7b18&redirect_uri=https%3A%2F%2Fcodepen.io%2Fauth%2Fgithub%2Fcallback&response_type=code&scope=user%3Aemail%2Cgist&state=320c02369b3e64090fd9deda552c72427ca33a264b2b0a7f    ��P2
/     �          ��P2
/ ��P2
/ ��������    �|  "     E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTM=      C o d e P e n   S e a r c h \
  X
     P
                              �      x             P      `      �             8      ��v� ��v� x      �      �      	      `	                            �   E   h t t p s : / / c o d e p e n . i o / s e a r c h / p e n s ? q = t a b l e + s e a r c h & c u r s o r = Z D 0 x J m 8 9 M C Z w P T M =                     .      h t t p s : / / g i t h u b . c o m /                                      $      ��
 
 
      4                                             
   s e l e c t - o n e                   
      2                        	   R E L E V A N C E                     
      0                                             
   s e l e c t - o n e                   
      2                        
   E V E R Y T H I N G                   
      0                                                t e x t a r e a               
      0                                                c h e c k b o x               
      1                           o f f   8      0       8                                                                                                                  �      x       �                     �             �      
   # i n p u t - d i v                  �A                                             https://codepen.io                    P   $   5 b 2 7 4 b d 9 - 4 3 6 1 - 4 1 e 9 - 8 a b a - c f 0 e 1 7 f b b 6 4 f               P   $   2 b d 9 c 4 8 d - 1 d 8 5 - 4 6 3 2 - a 0 7 a - f 6 c 6 2 1 2 5 2 e 1 7       https://codepen.io                    P   $   e 1 2 9 4 5 7 4 - 9 8 c e - 4 a 8 a - a 7 4 1 - 5 5 a 3 7 5 9 c b 1 e 9               P   $   3 7 7 e 5 2 c 2 - 2 b 1 d - 4 5 0 0 - a 1 d a - f 8 6 9 f 6 f 8 0 e 0 1    @       https://github.com/    E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTI=       �,3
/     �          ��P2
/ ��P2
/ ��������    ��  "     E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTQ=      C o d e P e n   S e a r c h �  �     �                              �      x             P      `      �             8      ��v� ��v� x      �      0      H      �                            �   E   h t t p s : / / c o d e p e n . i o / s e a r c h / p e n s ? q = t a b l e + s e a r c h & c u r s o r = Z D 0 x J m 8 9 M C Z w P T Q =                     .      h t t p s : / / g i t h u b . c o m /                                      $      ��
 
 
      4                                             
   s e l e c t - o n e                   
      2                        	   R E L E V A N C E                     
      0                                             
   s e l e c t - o n e                   
      2                        
   E V E R Y T H I N G                   
      0                                                t e x t a r e a               
      0                                                c h e c k b o x               
      1                           o f f   8      0       8                                                                                                                  �      �      x       �       (              �             �      �)�v� �)�v�        8      8      P      �                            l   2   h t t p s : / / c d p n . i o / m i l a m e n n a b a r r e t o / f u l l c p g r i d / P X V w r G                   .      h t t p s : / / c o d e p e n . i o /                 n   3   < ! - - d y n a m i c F r a m e D 0 2 5 3 3 B E 8 9 B 9 6 E C 0 5 B 0 F 6 8 6 6 9 2 3 0 9 1 D 5 - - >   p   
 
 
      1                     $      t a b e l a 1 _ l e n g t h                      
   s e l e c t - o n e                   
      2                           1 0                   
      0                     x   8   h t t p s : / / c d p n . i o / m i l a m e n n a b a r r e t o / f u l l c p g r i d / P X V w r G   [ ]   # 0               
      1                                                t e x t               
      0       8      0       8               8       �                                                           @      # h e a d e r - t a b l e > . s e a r c h - b u t t o n          "D  B                                             https://codepen.io                    P   $   6 a b 3 5 5 a 6 - 2 2 e e - 4 4 8 c - b a 3 b - 6 5 0 7 1 b 4 0 4 7 9 3               P   $   2 6 8 a f e 3 3 - c d 9 3 - 4 d f 1 - b 4 8 3 - b 6 1 5 b f b e 0 6 9 3 �      x       �                     �             �      �)�v� �)�v� �      �      �      �      H                            \   *   h t t p s : / / c d p n . i o / v a e d a s t i / f u l l c p g r i d / J V Z E g E                   .      h t t p s : / / c o d e p e n . i o /                 n   3   < ! - - d y n a m i c F r a m e B 7 9 D 4 6 A 8 7 4 3 E 6 8 4 C 1 E 8 7 8 2 E 6 F 9 0 E A 7 4 A - - >          8      0       8                                                                                                                  https://codepen.io                    P   $   b c a c 9 2 a 0 - f 0 d e - 4 2 3 3 - b 0 4 1 - b 8 7 e d 2 3 f d 1 8 d               P   $   4 4 3 0 1 d 6 3 - 5 1 7 9 - 4 2 5 f - a a 3 d - 7 8 0 1 3 2 7 8 9 e 8 8       https://codepen.io                    P   $   4 3 0 4 7 d 2 3 - 2 0 1 a - 4 f 5 4 - a 8 f 2 - 9 0 2 5 1 e 2 7 f 1 2 7               P   $   e e e 1 3 e 0 7 - 8 a c 8 - 4 7 5 8 - a a 5 6 - 8 a f c 6 b 6 1 d 3 3 5    @       https://github.com/    E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTM=       �}3
/     �          ��P2
/ ��P2
/ ��������    YT  "  	   E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTU=      C o d e P e n   S e a r c h 4
 
 
      4                                             
   s e l e c t - o n e                   
      2                        	   R E L E V A N C E                     
      0                                             
   s e l e c t - o n e                   
      2                        
   E V E R Y T H I N G                   
      0                                                t e x t a r e a               
      0                                                c h e c k b o x               
      1                           o f f   8      0       8                                                                                                                  �      x       �                      �             �      �)�v� �)�v� �      �      �            `                            f   /   h t t p s : / / c d p n . i o / c h i r e e n j a v i e r / f u l l c p g r i d / Z p O b J r                 .      h t t p s : / / c o d e p e n . i o /                 n   3   < ! - - d y n a m i c F r a m e 0 5 F 3 8 F D 1 1 0 C 6 F 3 1 5 3 2 0 B 5 7 B 6 9 F F 9 F 5 0 0 - - >   �      �                     8      H      `      x      �      �      �      �      �      �                   8      P      h                    h   0   
 
 
      5                                                t e x t               
      0                                                t e x t               
      0                                                t e x t               
      0                                                t e x t               
      0                     
      q                           t e x t               
      0       8      0       8                                                                                                                  https://codepen.io                    P   $   2 3 e 4 1 6 b c - 8 9 6 1 - 4 c 6 7 - b 1 1 2 - f 8 0 2 d c 3 5 f b 7 1               P   $   8 9 c f d 5 e 1 - f a a d - 4 6 f e - 8 1 c 6 - 5 5 1 e 9 5 3 f 9 8 8 5       https://codepen.io                    P   $   8 1 9 d b 8 4 4 - d 1 2 3 - 4 f 9 7 - a a 2 0 - 5 1 8 5 0 8 a c 9 3 a 4               P   $   0 7 b e 5 a 4 3 - 7 4 b 8 - 4 3 f a - a b d 4 - e b d 9 d 6 3 a 3 b 2 3    @       https://github.com/    E   https://codepen.io/search/pens?q=table+search&cursor=ZD0xJm89MCZwPTQ=       ��4
/     �          ��P2
/ ��P2
/ ��������     #      ���
/   #      9   https://www.w3schools.com/howto/howto_js_filter_table.asp   #   H o w   T o   C r e a t e   a   F i l t e r / S e a r c h   T a b l e   �  �     �                              �      x              @              H                   ��o�v� ��o�v� X      p      p      �      �                            z   9   h t t p s : / / w w w . w 3 s c h o o l s . c o m / h o w t o / h o w t o _ j s _ f i l t e r _ t a b l e . a s p                     6      h t t p s : / / d u c k d u c k g o . c o m /                        X   
   P       �       �       �                    8      H      `      x                    h   0   
 
 
      2                                                t e x t               
      0                                                t e x t               
      1                            8      0       8             �?                                                  �                                               https://duckduckgo.com                P   $   8 1 f 7 d 5 8 d - 5 e 5 f - 4 b 0 0 - 9 2 a c - 6 7 d 3 8 3 9 9 5 8 5 1               P   $   2 1 6 1 0 8 e d - 1 7 5 b - 4 d 5 4 - 8 3 a 9 - d 6 3 b 3 3 4 e c 7 9 7            https://duckduckgo.com/    9   https://www.w3schools.com/howto/howto_js_filter_table.asp       ��
/     �          ��
/ ����������������     $     �K��
/ �
�
  $      e   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=data-table-with-search-box   -   B o o t s t r a p   D a t a   T a b l e   w i t h   S e a r c h   B o x   T e m p l a t e   4	  0	     (	                              �      x       X      �              �             �      y
��v� z
��v�       (      �      �      8                            �   e   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x                     6      h t t p s : / / d u c k d u c k g o . c o m /                               8      0       8             �?8       X                                         �                      # p r e v i e w              /�                                             �      x       0                    X             �      {
��v� |
��v� 8      P      P      p      �                            �   R   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / b o o t s t r a p / d a t a - t a b l e - w i t h - s e a r c h - b o x . p h p                   �   e   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x                     H       < ! - - f r a m e P a t h   / / < ! - - f r a m e 0 - - > - - > @      8       �       �       �       �                                  h   0   
 
 
      1                                                t e x t               
      1                            8      0       8               8       `                                                              	   h t m l > b o d y                    �A                                       (       https://www.tutorialrepublic.com              P   $   6 c 4 2 d a e 7 - a c e a - 4 e 1 b - a 3 2 c - 6 2 8 8 0 a a 5 8 b 6 c               P   $   9 a e 9 d b 3 7 - d 0 0 0 - 4 a 2 2 - 9 0 d a - e c a 5 6 d f c 2 f 0 b       https://duckduckgo.com                P   $   2 b a 3 e 5 d 6 - d 7 0 c - 4 2 6 8 - b 1 6 c - c a 2 f a a 5 a 7 7 9 d               P   $   5 a 6 8 6 c d f - 7 3 3 0 - 4 8 9 e - 9 f c 7 - 9 e 7 4 b c 9 9 3 1 f 2            https://duckduckgo.com/    e   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=data-table-with-search-box       ��:
/     �          ��:
/ ����������������    ql  $     w   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=crud-data-table-for-database-with-modal-form ?   B o o t s t r a p   C r u d   D a t a   T a b l e   f o r   D a t a b a s e   w i t h   M o d a l   F o r m   T e m p l a t e   4  0     (                              �      x       x      X              `             X      
��v� �
��v� �      �      �      �      8                            �   w   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = c r u d - d a t a - t a b l e - f o r - d a t a b a s e - w i t h - m o d a l - f o r m                 �   e   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x                                   8      0       8             �?8       X                                         �                      # p r e v i e w              /�                                             �      x       P      P              �             �      �
��v� �
��v� p      �      �      �       
 
 
      4                                                t e x t a r e a               
      0                                                e m a i l                     
      0                                                t e x t               
      0                                                t e x t               
      0                           N o   o w n e r               
      6                                                c h e c k b o x               
      1                           o f f                    	   o p t i o n s [ ]                           c h e c k b o x               
      1                           o f f                    	   o p t i o n s [ ]                           c h e c k b o x               
      1                           o f f                    	   o p t i o n s [ ]                           c h e c k b o x               
      1                           o f f                    	   o p t i o n s [ ]                           c h e c k b o x               
      1                           o f f                    	   o p t i o n s [ ]                           c h e c k b o x               
      1                           o f f                         [ ]   # 1                   
      4                                                t e x t a r e a               
      0                                                e m a i l                     
      0                                                t e x t               
      0                                                t e x t               
      0       8      0       8               8       `                                                              	   h t m l > b o d y                    �A                                       (       https://www.tutorialrepublic.com              P   $   f f b 2 a 1 3 c - 5 3 7 5 - 4 6 1 2 - 8 a 8 a - b 2 6 5 6 7 1 6 1 3 c b               P   $   1 c e 5 3 7 1 c - 1 0 5 e - 4 a 2 8 - 8 f 0 6 - 8 5 1 4 a 5 0 7 3 6 8 9 (       https://www.tutorialrepublic.com              P   $   8 0 2 4 b 1 c 9 - 3 3 f 2 - 4 7 3 9 - 9 9 f 6 - c b 2 3 f 5 8 9 f f 9 2               P   $   e 1 8 d 3 7 c f - 4 e a 4 - 4 9 0 d - 9 d 6 d - 9 9 7 8 6 7 d 2 6 d e d         e   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=data-table-with-search-box      w   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=crud-data-table-for-database-with-modal-form     6qR
/     �          6qR
/ ��:
/ ��������    ��  $     e   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=data-table-with-search-box   -   B o o t s t r a p   D a t a   T a b l e   w i t h   S e a r c h   B o x   T e m p l a t e   �	  �	     �	                              �      x       X      X              `             X      �
��v� �
��v� �      �             @      �                            �   e   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x                     �   w   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = c r u d - d a t a - t a b l e - f o r - d a t a b a s e - w i t h - m o d a l - f o r m                               8      0       8                                                                                                                  �      x       0                    X             �      �
��v� �
��v�                     @      �                            �   R   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / b o o t s t r a p / d a t a - t a b l e - w i t h - s e a r c h - b o x . p h p                   �   e   h t t p s : / / w w w . t u t o r i a l r e p u b l i c . c o m / s n i p p e t s / p r e v i e w . p h p ? t o p i c = b o o t s t r a p & f i l e = d a t a - t a b l e - w i t h - s e a r c h - b o x                     H       < ! - - f r a m e P a t h   / / < ! - - f r a m e 0 - - > - - > @      8       �       �       �       �                                  h   0   
 
 
      1                                                t e x t               
      1                           t h o m a s     8      0       8                                                                                                            (       https://www.tutorialrepublic.com              P   $   a 9 e 2 9 5 7 6 - 6 d 9 3 - 4 d f c - 9 0 6 c - 4 c 5 d 5 7 1 6 5 5 5 6               P   $   5 b 0 b b 8 f d - 0 8 b 4 - 4 0 7 6 - a 4 3 d - c b 0 6 5 6 9 3 0 a a 9 (       https://www.tutorialrepublic.com              P   $   e 3 5 e 1 0 d b - a 7 3 9 - 4 9 d b - 9 9 b 2 - 7 1 6 b 8 6 4 5 8 b 9 7               P   $   a d e e d 2 4 5 - a 8 7 5 - 4 c 9 1 - 8 9 8 0 - a 2 1 8 8 f a e 2 d 4 e         w   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=crud-data-table-for-database-with-modal-form    e   https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=data-table-with-search-box       ��
/     �          ��
/ 6qR
/ ��������     %     Fj��
/ 	  %         chrome://newtab/   N e w   T a b   t  p     h                              �      x               �               �              �       '��v� (��v�       (                     x                            (      c h r o m e : / / n e w t a b /                             8      0       8             �?8       P                                                                 h t m l                                                                     P   $   8 c 3 7 7 7 d c - 2 8 1 b - 4 7 5 6 - 9 1 b 9 - 7 3 8 b b 9 7 e 4 b 7 0               P   $   6 c 7 3 6 9 c 8 - d 2 e a - 4 8 a 5 - 8 6 0 6 - a b e 3 6 8 6 1 5 f a 6                  chrome://newtab/    �F�
/     �          �F�
/ ���������F�
/     

  %     O   https://duckduckgo.com/?q=template+table+with+search+bar+html&atb=v290-7&ia=web 1   t e m p l a t e   t a b l e   w i t h   s e a r c h   b a r   h t m l   a t   D u c k D u c k G o   �  �     �                              �      x                      0      �             �      jv�v� kv�v� (      @      X      p      �                            �   O   h t t p s : / / d u c k d u c k g o . c o m / ? q = t e m p l a t e + t a b l e + w i t h + s e a r c h + b a r + h t m l & a t b = v 2 9 0 - 7 & i a = w e b                                      V  �   ��
 
 
      1                            s t a t e _ h i d d e n                     t e x t               
      0       8      0       8             �?                                                                                                 �      x       �                     �             x      nv�v� ov�v� �      �      �      �      @                            J   !   h t t p s : / / d u c k d u c k g o . c o m / p o s t 3 . h t m l                     6      h t t p s : / / d u c k d u c k g o . c o m /                 n   3   < ! - - d y n a m i c F r a m e 7 1 1 E E 7 0 E 9 6 8 E 8 C 1 1 8 7 2 4 9 C B D F 7 9 8 5 C 7 4 - - >          8      0       8                                                                                                                  https://duckduckgo.com                P   $   6 8 e 0 1 3 3 6 - 9 5 3 e - 4 1 e 7 - 9 d 5 d - 0 8 a e 0 a 9 7 0 3 0 2               P   $   1 8 2 f e c d 6 - 5 8 0 3 - 4 a d 7 - 9 0 8 3 - c 5 f 5 5 2 f 4 c 1 b 3       https://duckduckgo.com                P   $   6 d c d 7 0 f c - d 0 4 f - 4 a d b - 9 b 5 5 - 9 b b 9 f d 3 c 3 1 4 c               P   $   8 0 3 2 c 0 f d - d 8 8 7 - 4 1 2 f - b 2 a 4 - d 1 1 5 2 6 c d 8 0 6 2              =   https://duckduckgo.com/?q=template+table+with+search+bar+html       ��
/     �          ���
/ �����������
/      -      jhA+/ Q
L
  -      [   https://dtuto.com/questions/777/laravel-right-way-to-import-javascript-into-blade-templates D   L a r a v e l ,   r i g h t   w a y   t o   i m p o r t   j a v a s c r i p t   i n t o   B l a d e   T e m p l a t e s   -   D t u t o �  �     �                              �      x       @      �              �             �      �c޿w� �c޿w�       (      (      @      �                            �   [   h t t p s : / / d t u t o . c o m / q u e s t i o n s / 7 7 7 / l a r a v e l - r i g h t - w a y - t o - i m p o r t - j a v a s c r i p t - i n t o - b l a d e - t e m p l a t e s                 6      h t t p s : / / d u c k d u c k g o . c o m /                        �      �             H      `      �      �      �      �      �      �      �      �            (      H      `      x      P      h      x      �                    h   0   
 
 
      1                           s e a r c h                         t e x t               
      0                     �   b   h t t p s : / / d t u t o . c o m / q u e s t i o n s / 7 7 7 / l a r a v e l - r i g h t - w a y - t o - i m p o r t - j a v a s c r i p t - i n t o - b l a d e - t e m p l a t e s #   [ ]   # 1                   
      1                                                t e x t               
      0                     "   
      1                           s e a r c h                         t e x t               
      0                     �   b   h t t p s : / / d t u t o . c o m / q u e s t i o n s / 7 7 7 / l a r a v e l - r i g h t - w a y - t o - i m p o r t - j a v a s c r i p t - i n t o - b l a d e - t e m p l a t e s #   [ ]   # 0                   
      1                                                t e x t               
      0       8      0       8             �?                                                                                                   https://duckduckgo.com                P   $   2 b 1 7 3 3 e a - e 4 c 5 - 4 3 3 4 - 9 8 7 4 - c 8 1 8 1 9 5 3 1 6 f f               P   $   f 5 e 3 0 2 b 9 - 9 4 6 3 - 4 7 8 d - 9 1 d f - 1 f 7 3 b d f 5 f 6 d d            https://duckduckgo.com/    [   https://dtuto.com/questions/777/laravel-right-way-to-import-javascript-into-blade-templates     �d+/     �          �d+/ ����������������     6      ���I+/ ��  6      >   https://scotch.io/tutorials/simple-laravel-layouts-using-blade  .   S i m p l e   L a r a v e l   L a y o u t s   U s i n g   B l a d e      S c o t c h . i o |  x     p                              �      x             H              P             �      /?�w� /?�w�       (            (      �                            �   >   h t t p s : / / s c o t c h . i o / t u t o r i a l s / s i m p l e - l a r a v e l - l a y o u t s - u s i n g - b l a d e                   6      h t t p s : / / d u c k d u c k g o . c o m /                        8      0       �       �                    @                    h   0   
 
 
      1                     
      q                           s e a r c h                   
      0       8      0       8             �?                                                  �/                                               �      x       �                     P            H      �X�w� �X�w� �      �      �      �                                  P   $   h t t p s : / / w w w . d i g i t a l o c e a n . c o m / s c o t c h /               ,      h t t p s : / / s c o t c h . i o /                   H       < ! - - f r a m e P a t h   / / < ! - - f r a m e 0 - - > - - >        8      0       8                                                                                                                  https://scotch.io                     P   $   7 9 e c 4 a 1 2 - 0 1 4 e - 4 6 0 e - a c c d - e f 0 3 6 0 3 3 0 2 b c               P   $   8 e 5 a c e d 9 - 1 4 6 9 - 4 a 9 b - b 8 a a - 8 b c 0 f d 8 7 f e 2 c       https://duckduckgo.com                P   $   8 f e 9 3 2 b b - b 4 1 8 - 4 c e 4 - 9 5 2 9 - c a 8 e b c 8 1 2 c 9 2               P   $   2 0 8 1 f 3 7 0 - 3 2 f 2 - 4 8 6 d - a 4 a 0 - d 7 e c b 6 f 1 5 c 3 1            https://duckduckgo.com/    >   https://scotch.io/tutorials/simple-laravel-layouts-using-blade      ��C+/     �          ��C+/ ����������������     � 7      �iaJ+/ �7�7  7      Z   https://www.geeksforgeeks.org/how-to-include-a-javascript-file-in-another-javascript-file/  M   H o w   t o   i n c l u d e   a   J a v a S c r i p t   f i l e   i n   a n o t h e r   J a v a S c r i p t   f i l e   ?   -   G e e k s f o r G e e k s   $6   6     6                              �      x       @      �              �                    N�}�w� O�}�w� @      X      �4      �4      (5                            �   Z   h t t p s : / / w w w . g e e k s f o r g e e k s . o r g / h o w - t o - i n c l u d e - a - j a v a s c r i p t - f i l e - i n - a n o t h e r - j a v a s c r i p t - f i l e /                   6      h t t p s : / / d u c k d u c k g o . c o m /                        �  4   �            H      `      x      �      �      �                   0      P      h      �      �      �      �      �                   8      P      `      x      �      �      �      �      �            0      H      �      �      �      �      �      (      H      `      �      �      �      �      �            (      @      X      p      �      �                    h   0   
 
 
      3                           u s e r                     t e x t               
      0                     0      g - r e c a p t c h a - r e s p o n s e                     t e x t a r e a               
      0                           r e m                       c h e c k b o x               
      1                           o n                         N o   o w n e r          