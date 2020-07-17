webpackJsonp([0],{

/***/ "./node_modules/bootstrap-material-design/js/base.js":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/base.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Base = function ($) {
  var ClassName = {
    BMD_FORM_GROUP: "bmd-form-group",
    IS_FILLED: "is-filled",
    IS_FOCUSED: "is-focused"
  };

  var Selector = {
    BMD_FORM_GROUP: "." + ClassName.BMD_FORM_GROUP
  };

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Base = function () {
    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    function Base($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Base);

      this.$element = $element;
      this.config = $.extend(true, {}, Default, config);

      // set properties for use in the constructor initialization
      for (var key in properties) {
        this[key] = properties[key];
      }
    }

    Base.prototype.dispose = function dispose(dataKey) {
      this.$element.data(dataKey, null);
      this.$element = null;
      this.config = null;
    };

    // ------------------------------------------------------------------------
    // protected

    Base.prototype.addFormGroupFocus = function addFormGroupFocus() {
      if (!this.$element.prop("disabled")) {
        this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED);
      }
    };

    Base.prototype.removeFormGroupFocus = function removeFormGroupFocus() {
      this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED);
    };

    Base.prototype.removeIsFilled = function removeIsFilled() {
      this.$bmdFormGroup.removeClass(ClassName.IS_FILLED);
    };

    Base.prototype.addIsFilled = function addIsFilled() {
      this.$bmdFormGroup.addClass(ClassName.IS_FILLED);
    };

    // Find bmd-form-group


    Base.prototype.findMdbFormGroup = function findMdbFormGroup() {
      var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var mfg = this.$element.closest(Selector.BMD_FORM_GROUP);
      if (mfg.length === 0 && raiseError) {
        $.error("Failed to find " + Selector.BMD_FORM_GROUP + " for " + __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].describe(this.$element));
      }
      return mfg;
    };

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    return Base;
  }();

  return Base;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Base);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/baseFormControl.js":
/*!**********************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/baseFormControl.js ***!
  \**********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseInput__ = __webpack_require__(/*! ./baseInput */ "./node_modules/bootstrap-material-design/js/baseInput.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var BaseFormControl = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var Default = {
    requiredClasses: ["form-control"]
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseFormControl = function (_BaseInput) {
    _inherits(BaseFormControl, _BaseInput);

    function BaseFormControl($element, config) {
      _classCallCheck(this, BaseFormControl);

      // Initially mark as empty
      var _this = _possibleConstructorReturn(this, _BaseInput.call(this, $element, $.extend(true, Default, config)));

      if (_this.isEmpty()) {
        _this.removeIsFilled();
      }
      return _this;
    }

    return BaseFormControl;
  }(__WEBPACK_IMPORTED_MODULE_0__baseInput__["a" /* default */]);

  return BaseFormControl;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (BaseFormControl);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/baseInput.js":
/*!****************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/baseInput.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ./base */ "./node_modules/bootstrap-material-design/js/base.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var BaseInput = function ($) {
  var ClassName = {
    FORM_GROUP: "form-group",
    BMD_FORM_GROUP: "bmd-form-group",
    BMD_LABEL: "bmd-label",
    BMD_LABEL_STATIC: "bmd-label-static",
    BMD_LABEL_PLACEHOLDER: "bmd-label-placeholder",
    BMD_LABEL_FLOATING: "bmd-label-floating",
    HAS_DANGER: "has-danger",
    IS_FILLED: "is-filled",
    IS_FOCUSED: "is-focused",
    INPUT_GROUP: "input-group"
  };

  var Selector = {
    FORM_GROUP: "." + ClassName.FORM_GROUP,
    BMD_FORM_GROUP: "." + ClassName.BMD_FORM_GROUP,
    BMD_LABEL_WILDCARD: "label[class^='" + ClassName.BMD_LABEL + "'], label[class*=' " + ClassName.BMD_LABEL + "']" // match any label variant if specified
  };

  var Default = {
    validate: false,
    formGroup: {
      required: false
    },
    bmdFormGroup: {
      template: "<span class='" + ClassName.BMD_FORM_GROUP + "'></span>",
      create: true, // create a wrapper if form-group not found
      required: true // not recommended to turn this off, only used for inline components
    },
    label: {
      required: false,

      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $bmdFormGroup.find(selector)
      //
      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      selectors: [".form-control-label", // in the case of horizontal or inline forms, this will be marked
      "> label" // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
      ],
      className: ClassName.BMD_LABEL_STATIC
    },
    requiredClasses: [],
    invalidComponentMatches: [],
    convertInputSizeVariations: true
  };

  var FormControlSizeMarkers = {
    "form-control-lg": "bmd-form-group-lg",
    "form-control-sm": "bmd-form-group-sm"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseInput = function (_Base) {
    _inherits(BaseInput, _Base);

    /**
     *
     * @param element
     * @param config
     * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
     */
    function BaseInput($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, BaseInput);

      // Enforce no overlap between components to prevent side effects
      var _this = _possibleConstructorReturn(this, _Base.call(this, $element, $.extend(true, {}, Default, config), properties));

      _this._rejectInvalidComponentMatches();

      // Enforce expected structure (if any)
      _this.rejectWithoutRequiredStructure();

      // Enforce required classes for a consistent rendering
      _this._rejectWithoutRequiredClasses();

      // Resolve the form-group first, it will be used for bmd-form-group if possible
      //   note: different components have different rules
      _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required);

      // Will add bmd-form-group to form-group or create an bmd-form-group
      //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
      //    rendering changes once added.
      _this.$bmdFormGroup = _this.resolveMdbFormGroup();

      // Resolve and mark the bmdLabel if necessary as defined by the config
      _this.$bmdLabel = _this.resolveMdbLabel();

      // Signal to the bmd-form-group that a form-control-* variation is being used
      _this.resolveMdbFormGroupSizing();

      _this.addFocusListener();
      _this.addChangeListener();

      if (_this.$element.val() != "") {
        _this.addIsFilled();
      }
      return _this;
    }

    BaseInput.prototype.dispose = function dispose(dataKey) {
      _Base.prototype.dispose.call(this, dataKey);
      this.$bmdFormGroup = null;
      this.$formGroup = null;
    };

    // ------------------------------------------------------------------------
    // protected

    BaseInput.prototype.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() {
      // implement
    };

    BaseInput.prototype.addFocusListener = function addFocusListener() {
      var _this2 = this;

      this.$element.on("focus", function () {
        _this2.addFormGroupFocus();
      }).on("blur", function () {
        _this2.removeFormGroupFocus();
      });
    };

    BaseInput.prototype.addChangeListener = function addChangeListener() {
      var _this3 = this;

      this.$element.on("keydown paste", function (event) {
        if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].isChar(event)) {
          _this3.addIsFilled();
        }
      }).on("keyup change", function () {
        // make sure empty is added back when there is a programmatic value change.
        //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
        if (_this3.isEmpty()) {
          _this3.removeIsFilled();
        } else {
          _this3.addIsFilled();
        }

        if (_this3.config.validate) {
          // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
          //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
          //  the form-group on change.
          //
          // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
          //        BUT, I've left it here for backwards compatibility.
          var isValid = typeof _this3.$element[0].checkValidity === "undefined" || _this3.$element[0].checkValidity();
          if (isValid) {
            _this3.removeHasDanger();
          } else {
            _this3.addHasDanger();
          }
        }
      });
    };

    BaseInput.prototype.addHasDanger = function addHasDanger() {
      this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
    };

    BaseInput.prototype.removeHasDanger = function removeHasDanger() {
      this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
    };

    BaseInput.prototype.isEmpty = function isEmpty() {
      return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === "";
    };

    // Will add bmd-form-group to form-group or create a bmd-form-group if necessary


    BaseInput.prototype.resolveMdbFormGroup = function resolveMdbFormGroup() {
      var mfg = this.findMdbFormGroup(false);
      if (mfg === undefined || mfg.length === 0) {
        if (this.config.bmdFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
          // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
          //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.

          // this may be an input-group, wrap that instead
          if (this.outerElement().parent().hasClass(ClassName.INPUT_GROUP)) {
            this.outerElement().parent().wrap(this.config.bmdFormGroup.template);
          } else {
            this.outerElement().wrap(this.config.bmdFormGroup.template);
          }
        } else {
          // a form-group does exist, add our marker class to it
          this.$formGroup.addClass(ClassName.BMD_FORM_GROUP);

          // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
          // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
          //fg.wrapInner(this.config.bmdFormGroup.template)
        }

        mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
      }

      return mfg;
    };

    // Demarcation element (e.g. first child of a form-group)
    //  Subclasses such as file inputs may have different structures


    BaseInput.prototype.outerElement = function outerElement() {
      return this.$element;
    };

    // Will add bmd-label to bmd-form-group if not already specified


    BaseInput.prototype.resolveMdbLabel = function resolveMdbLabel() {
      var label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);
      if (label === undefined || label.length === 0) {
        // we need to find it based on the configured selectors
        label = this.findMdbLabel(this.config.label.required);

        if (label === undefined || label.length === 0) {
          // no label found, and finder did not require one
        } else {
          // a candidate label was found, add the configured default class name
          label.addClass(this.config.label.className);
        }
      }

      return label;
    };

    // Find bmd-label variant based on the config selectors


    BaseInput.prototype.findMdbLabel = function findMdbLabel() {
      var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var label = null;

      // use the specified selector order
      for (var _iterator = this.config.label.selectors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var selector = _ref;

        if ($.isFunction(selector)) {
          label = selector(this);
        } else {
          label = this.$bmdFormGroup.find(selector);
        }

        if (label !== undefined && label.length > 0) {
          break;
        }
      }

      if (label.length === 0 && raiseError) {
        $.error("Failed to find " + Selector.BMD_LABEL_WILDCARD + " within form-group for " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe(this.$element));
      }
      return label;
    };

    // Find bmd-form-group


    BaseInput.prototype.findFormGroup = function findFormGroup() {
      var raiseError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var fg = this.$element.closest(Selector.FORM_GROUP);
      if (fg.length === 0 && raiseError) {
        $.error("Failed to find " + Selector.FORM_GROUP + " for " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe(this.$element));
      }
      return fg;
    };

    // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
    //  a found form-control-* size


    BaseInput.prototype.resolveMdbFormGroupSizing = function resolveMdbFormGroupSizing() {
      if (!this.config.convertInputSizeVariations) {
        return;
      }

      // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
      for (var inputSize in FormControlSizeMarkers) {
        if (this.$element.hasClass(inputSize)) {
          //this.$element.removeClass(inputSize)
          this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
        }
      }
    };

    // ------------------------------------------------------------------------
    // private


    BaseInput.prototype._rejectInvalidComponentMatches = function _rejectInvalidComponentMatches() {
      for (var _iterator2 = this.config.invalidComponentMatches, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var otherComponent = _ref2;

        otherComponent.rejectMatch(this.constructor.name, this.$element);
      }
    };

    BaseInput.prototype._rejectWithoutRequiredClasses = function _rejectWithoutRequiredClasses() {
      for (var _iterator3 = this.config.requiredClasses, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var requiredClass = _ref3;

        var found = false;
        // allow one of several classes to be passed in x||y
        if (requiredClass.indexOf("||") !== -1) {
          var oneOf = requiredClass.split("||");
          for (var _iterator4 = oneOf, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
              if (_i4 >= _iterator4.length) break;
              _ref4 = _iterator4[_i4++];
            } else {
              _i4 = _iterator4.next();
              if (_i4.done) break;
              _ref4 = _i4.value;
            }

            var _requiredClass = _ref4;

            if (this.$element.hasClass(_requiredClass)) {
              found = true;
              break;
            }
          }
        } else if (this.$element.hasClass(requiredClass)) {
          found = true;
        }
      }
    };

    // ------------------------------------------------------------------------
    // static


    return BaseInput;
  }(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */]);

  return BaseInput;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (BaseInput);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/baseSelection.js":
/*!********************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/baseSelection.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseInput__ = __webpack_require__(/*! ./baseInput */ "./node_modules/bootstrap-material-design/js/baseInput.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var BaseSelection = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var Default = {
    label: {
      required: false

      // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
      //  - a function(thisComponent); or
      //  - a string selector used like $bmdFormGroup.find(selector)
      //
      // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
      //
      //selectors: [
      //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
      //  `> label` // usual case for text inputs
      //]
    }
  };

  var Selector = {
    LABEL: "label"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BaseSelection = function (_BaseInput) {
    _inherits(BaseSelection, _BaseInput);

    function BaseSelection($element, config, properties) {
      _classCallCheck(this, BaseSelection);

      var _this = _possibleConstructorReturn(this, _BaseInput.call(this, $element, $.extend(true, {}, Default, config), properties));
      // properties = {inputType: checkbox, outerClass: checkbox-inline}
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'

      _this.decorateMarkup();
      return _this;
    }

    // ------------------------------------------------------------------------
    // protected

    BaseSelection.prototype.decorateMarkup = function decorateMarkup() {
      var $decorator = $(this.config.template);
      this.$element.after($decorator);

      // initialize ripples after decorator has been inserted into DOM
      if (this.config.ripples !== false) {
        $decorator.bmdRipples();
      }
    };

    // Demarcation element (e.g. first child of a form-group)


    BaseSelection.prototype.outerElement = function outerElement() {
      // .checkbox|switch|radio > label > input[type=checkbox|radio]
      // label.checkbox-inline > input[type=checkbox|radio]
      // .${this.outerClass} > label > input[type=${this.inputType}]
      return this.$element.parent().closest("." + this.outerClass);
    };

    BaseSelection.prototype.rejectWithoutRequiredStructure = function rejectWithoutRequiredStructure() {
      // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
      // '.${this.outerClass} > label > input[type=${this.inputType}]'
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].assert(this.$element, !this.$element.parent().prop("tagName") === "label", this.constructor.name + "'s " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe(this.$element) + " parent element should be <label>.");
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + "'s " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe(this.$element) + " outer element should have class " + this.outerClass + ".");
    };

    BaseSelection.prototype.addFocusListener = function addFocusListener() {
      var _this2 = this;

      // checkboxes didn't appear to bubble to the document, so we'll bind these directly
      this.$element.closest(Selector.LABEL).hover(function () {
        _this2.addFormGroupFocus();
      }, function () {
        _this2.removeFormGroupFocus();
      });
    };

    BaseSelection.prototype.addChangeListener = function addChangeListener() {
      var _this3 = this;

      this.$element.change(function () {
        _this3.$element.blur();
      });
    };

    // ------------------------------------------------------------------------
    // private


    return BaseSelection;
  }(__WEBPACK_IMPORTED_MODULE_0__baseInput__["a" /* default */]);

  return BaseSelection;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (BaseSelection);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/checkbox.js":
/*!***************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/checkbox.js ***!
  \***************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseSelection__ = __webpack_require__(/*! ./baseSelection */ "./node_modules/bootstrap-material-design/js/baseSelection.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import Text from './text'
//import File from './file'
//import Radio from './radio'
//import Textarea from './textarea'
//import Select from './select'


var Checkbox = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "checkbox";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    template: "<span class='checkbox-decorator'><span class='check'></span></span>"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Checkbox = function (_BaseSelection) {
    _inherits(Checkbox, _BaseSelection);

    function Checkbox($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: NAME, outerClass: NAME };

      _classCallCheck(this, Checkbox);

      return _possibleConstructorReturn(this, _BaseSelection.call(this, $element, $.extend(true,
      //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
      Default, config), properties));
    }

    Checkbox.prototype.dispose = function dispose() {
      var dataKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_KEY;

      _BaseSelection.prototype.dispose.call(this, dataKey);
    };

    Checkbox.matches = function matches($element) {
      // '.checkbox > label > input[type=checkbox]'
      if ($element.attr("type") === "checkbox") {
        return true;
      }
      return false;
    };

    Checkbox.rejectMatch = function rejectMatch(component, $element) {
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].assert(this.$element, this.matches($element), component + " component element " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe($element) + " is invalid for type='checkbox'.");
    };

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    Checkbox._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Checkbox($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return Checkbox;
  }(__WEBPACK_IMPORTED_MODULE_0__baseSelection__["a" /* default */]);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Checkbox;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Checkbox._jQueryInterface;
  };

  return Checkbox;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Checkbox);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/checkboxInline.js":
/*!*********************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/checkboxInline.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkbox__ = __webpack_require__(/*! ./checkbox */ "./node_modules/bootstrap-material-design/js/checkbox.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var CheckboxInline = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "checkboxInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    bmdFormGroup: {
      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
      required: false
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var CheckboxInline = function (_Checkbox) {
    _inherits(CheckboxInline, _Checkbox);

    function CheckboxInline($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: "checkbox", outerClass: "checkbox-inline" };

      _classCallCheck(this, CheckboxInline);

      return _possibleConstructorReturn(this, _Checkbox.call(this, $element, $.extend(true, {}, Default, config), properties));
    }

    CheckboxInline.prototype.dispose = function dispose() {
      _Checkbox.prototype.dispose.call(this, DATA_KEY);
    };

    //static matches($element) {
    //  // '.checkbox-inline > input[type=checkbox]'
    //  if ($element.attr('type') === 'checkbox') {
    //    return true
    //  }
    //  return false
    //}
    //
    //static rejectMatch(component, $element) {
    //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
    //}

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    CheckboxInline._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new CheckboxInline($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return CheckboxInline;
  }(__WEBPACK_IMPORTED_MODULE_0__checkbox__["a" /* default */]);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = CheckboxInline;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return CheckboxInline._jQueryInterface;
  };

  return CheckboxInline;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (CheckboxInline);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/dropdown.js":
/*!***************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/dropdown.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery, Popper) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_js_src_util__ = __webpack_require__(/*! bootstrap/js/src/util */ "./node_modules/bootstrap/js/src/util.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global Popper */

/**
 * This is a copy of the Bootstrap's original dropdown.js, with the only addition
 * of two new classes: 'showing' and 'hiding', used to handle animaitons.
 */



/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.0): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.1.0';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: 'keyup' + EVENT_KEY + DATA_API_KEY,
    TRANSITION_END: 'transitionend webkitTransitionEnd oTransitionEnd animationend webkitAnimationEnd oAnimationEnd'
  };

  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    SHOWING: 'showing',
    HIDING: 'hiding',
    DROPUP: 'dropup',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  };

  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end'
  };

  var Default = {
    placement: AttachmentMap.BOTTOM,
    offset: 0,
    flip: true
  };

  var DefaultType = {
    placement: 'string',
    offset: '(number|string)',
    flip: 'boolean'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Dropdown = function () {
    function Dropdown(element, config) {
      _classCallCheck(this, Dropdown);

      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      var _this = this;

      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);
      var isActive = $(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      var element = this._element;
      // for dropup with alignment we use the parent as popper container
      if ($(parent).hasClass(ClassName.DROPUP)) {
        if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
          element = parent;
        }
      }
      this._popper = new Popper(element, this._menu, this._getPopperConfig());

      // if this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {
        $('body').children().on('mouseover', null, $.noop);
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      $(this._menu).one(Event.TRANSITION_END, function () {
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));
        $(_this._menu).removeClass(ClassName.SHOWING);
      });

      $(this._menu).addClass(ClassName.SHOW + ' ' + ClassName.SHOWING);
      $(parent).addClass(ClassName.SHOW);
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;
      if (this._popper !== null) {
        this._popper.destroy();
      }
      this._popper = null;
    };

    Dropdown.prototype.update = function update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      $(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();
        _this2.toggle();
      });
    };

    Dropdown.prototype._getConfig = function _getConfig(config) {
      var elementData = $(this._element).data();
      if (elementData.placement !== undefined) {
        elementData.placement = AttachmentMap[elementData.placement.toUpperCase()];
      }

      config = $.extend({}, this.constructor.Default, $(this._element).data(), config);

      __WEBPACK_IMPORTED_MODULE_0_bootstrap_js_src_util__["a" /* default */].typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Dropdown.prototype._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);
        this._menu = $(parent).find(Selector.MENU)[0];
      }
      return this._menu;
    };

    Dropdown.prototype._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element).parent();
      var placement = this._config.placement;

      // Handle dropup
      if ($parentDropdown.hasClass(ClassName.DROPUP) || this._config.placement === AttachmentMap.TOP) {
        placement = AttachmentMap.TOP;
        if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }
      return placement;
    };

    Dropdown.prototype._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    Dropdown.prototype._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: {
            offset: this._config.offset
          },
          flip: {
            enabled: this._config.flip
          }
        }

        // Disable Popper.js for Dropdown in Navbar
      };if (this._inNavbar) {
        popperConfig.modifiers.applyStyle = {
          enabled: !this._inNavbar
        };
      }
      return popperConfig;
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      var _loop = function _loop(i) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var context = $(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!context) {
          return 'continue';
        }

        var dropdownMenu = context._menu;
        if (!$(parent).hasClass(ClassName.SHOW)) {
          return 'continue';
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          return 'continue';
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          return 'continue';
        }

        // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $('body').children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(dropdownMenu).addClass(ClassName.HIDING).removeClass(ClassName.SHOW);
        $(parent).removeClass(ClassName.SHOW);

        $(dropdownMenu).one(Event.TRANSITION_END, function () {
          $(parent).trigger($.Event(Event.HIDDEN, relatedTarget));
          $(dropdownMenu).removeClass(ClassName.HIDING);
        });
      };

      for (var i = 0; i < toggles.length; i++) {
        var _ret = _loop(i);

        if (_ret === 'continue') continue;
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = __WEBPACK_IMPORTED_MODULE_0_bootstrap_js_src_util__["a" /* default */].getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /button/i.test(event.target.tagName) && event.which === SPACE_KEYCODE || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (Dropdown);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"]))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/radio.js":
/*!************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/radio.js ***!
  \************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseSelection__ = __webpack_require__(/*! ./baseSelection */ "./node_modules/bootstrap-material-design/js/baseSelection.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import Text from './text'
//import File from './file'
//import Checkbox from './checkbox'
//import Switch from './switch'


var Radio = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "radio";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    template: "<span class='bmd-radio'></span>"
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Radio = function (_BaseSelection) {
    _inherits(Radio, _BaseSelection);

    function Radio($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: NAME, outerClass: NAME };

      _classCallCheck(this, Radio);

      return _possibleConstructorReturn(this, _BaseSelection.call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
      Default, config), properties));
    }

    Radio.prototype.dispose = function dispose() {
      var dataKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_KEY;

      _BaseSelection.prototype.dispose.call(this, dataKey);
    };

    Radio.matches = function matches($element) {
      // '.radio > label > input[type=radio]'
      if ($element.attr("type") === "radio") {
        return true;
      }
      return false;
    };

    Radio.rejectMatch = function rejectMatch(component, $element) {
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].assert(this.$element, this.matches($element), component + " component element " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe($element) + " is invalid for type='radio'.");
    };

    // ------------------------------------------------------------------------
    // protected

    //decorateMarkup() {
    //  this.$element.after(this.config.template)
    //}

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    Radio._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Radio($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return Radio;
  }(__WEBPACK_IMPORTED_MODULE_0__baseSelection__["a" /* default */]);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Radio._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Radio;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Radio._jQueryInterface;
  };

  return Radio;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Radio);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/radioInline.js":
/*!******************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/radioInline.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__radio__ = __webpack_require__(/*! ./radio */ "./node_modules/bootstrap-material-design/js/radio.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var RadioInline = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "radioInline";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    bmdFormGroup: {
      create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
      required: false
    }
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var RadioInline = function (_Radio) {
    _inherits(RadioInline, _Radio);

    function RadioInline($element, config) {
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { inputType: "radio", outerClass: "radio-inline" };

      _classCallCheck(this, RadioInline);

      return _possibleConstructorReturn(this, _Radio.call(this, $element, $.extend(true, {}, Default, config), properties));
    }

    RadioInline.prototype.dispose = function dispose() {
      _Radio.prototype.dispose.call(this, DATA_KEY);
    };

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    RadioInline._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new RadioInline($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return RadioInline;
  }(__WEBPACK_IMPORTED_MODULE_0__radio__["a" /* default */]);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = RadioInline;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return RadioInline._jQueryInterface;
  };

  return RadioInline;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (RadioInline);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/ripples.js":
/*!**************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/ripples.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Ripples = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "ripples";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var ClassName = {
    CONTAINER: "ripple-container",
    DECORATOR: "ripple-decorator"
  };

  var Selector = {
    CONTAINER: "." + ClassName.CONTAINER,
    DECORATOR: "." + ClassName.DECORATOR //,
  };

  var Default = {
    container: {
      template: "<div class='" + ClassName.CONTAINER + "'></div>"
    },
    decorator: {
      template: "<div class='" + ClassName.DECORATOR + "'></div>"
    },
    trigger: {
      start: "mousedown touchstart",
      end: "mouseup mouseleave touchend"
    },
    touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    duration: 500
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Ripples = function () {
    function Ripples($element, config) {
      var _this = this;

      _classCallCheck(this, Ripples);

      this.$element = $element;

      // console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
      this.config = $.extend(true, {}, Default, config);

      // attach initial listener
      this.$element.on(this.config.trigger.start, function (event) {
        _this._onStartRipple(event);
      });
    }

    Ripples.prototype.dispose = function dispose() {
      this.$element.data(DATA_KEY, null);
      this.$element = null;
      this.$container = null;
      this.$decorator = null;
      this.config = null;
    };

    // ------------------------------------------------------------------------
    // private

    Ripples.prototype._onStartRipple = function _onStartRipple(event) {
      var _this2 = this;

      // Verify if the user is just touching on a device and return if so
      if (this._isTouch() && event.type === "mousedown") {
        return;
      }

      // Find or create the ripple container element
      this._findOrCreateContainer();

      // Get relY and relX positions of the container element
      var relY = this._getRelY(event);
      var relX = this._getRelX(event);

      // If relY and/or relX are false, return the event
      if (!relY && !relX) {
        return;
      }

      // set the location and color each time (even if element is cached)
      this.$decorator.css({
        left: relX,
        top: relY,
        "background-color": this._getRipplesColor()
      });

      // Make sure the ripple has the styles applied (ugly hack but it works)
      this._forceStyleApplication();

      // Turn on the ripple animation
      this.rippleOn();

      // Call the rippleEnd function when the transition 'on' ends
      setTimeout(function () {
        _this2.rippleEnd();
      }, this.config.duration);

      // Detect when the user leaves the element to cleanup if not already done?
      this.$element.on(this.config.trigger.end, function () {
        if (_this2.$decorator) {
          // guard against race condition/mouse attack
          _this2.$decorator.data("mousedown", "off");

          if (_this2.$decorator.data("animating") === "off") {
            _this2.rippleOut();
          }
        }
      });
    };

    Ripples.prototype._findOrCreateContainer = function _findOrCreateContainer() {
      if (!this.$container || !this.$container.length > 0) {
        this.$element.append(this.config.container.template);
        this.$container = this.$element.find(Selector.CONTAINER);
      }

      // always add the rippleElement, it is always removed
      this.$container.append(this.config.decorator.template);
      this.$decorator = this.$container.find(Selector.DECORATOR);
    };

    // Make sure the ripple has the styles applied (ugly hack but it works)


    Ripples.prototype._forceStyleApplication = function _forceStyleApplication() {
      return window.getComputedStyle(this.$decorator[0]).opacity;
    };

    /**
     * Get the relX
     */


    Ripples.prototype._getRelX = function _getRelX(event) {
      var wrapperOffset = this.$container.offset();

      var result = null;
      if (!this._isTouch()) {
        // Get the mouse position relative to the ripple wrapper
        result = event.pageX - wrapperOffset.left;
      } else {
        // Make sure the user is using only one finger and then get the touch
        //  position relative to the ripple wrapper
        event = event.originalEvent;

        if (event.touches.length === 1) {
          result = event.touches[0].pageX - wrapperOffset.left;
        } else {
          result = false;
        }
      }

      return result;
    };

    /**
     * Get the relY
     */


    Ripples.prototype._getRelY = function _getRelY(event) {
      var containerOffset = this.$container.offset();
      var result = null;

      if (!this._isTouch()) {
        /**
         * Get the mouse position relative to the ripple wrapper
         */
        result = event.pageY - containerOffset.top;
      } else {
        /**
         * Make sure the user is using only one finger and then get the touch
         * position relative to the ripple wrapper
         */
        event = event.originalEvent;

        if (event.touches.length === 1) {
          result = event.touches[0].pageY - containerOffset.top;
        } else {
          result = false;
        }
      }

      return result;
    };

    /**
     * Get the ripple color
     */


    Ripples.prototype._getRipplesColor = function _getRipplesColor() {
      var color = this.$element.data("ripple-color") ? this.$element.data("ripple-color") : window.getComputedStyle(this.$element[0]).color;
      return color;
    };

    /**
     * Verify if the client is using a mobile device
     */


    Ripples.prototype._isTouch = function _isTouch() {
      return this.config.touchUserAgentRegex.test(navigator.userAgent);
    };

    /**
     * End the animation of the ripple
     */


    Ripples.prototype.rippleEnd = function rippleEnd() {
      if (this.$decorator) {
        // guard against race condition/mouse attack
        this.$decorator.data("animating", "off");

        if (this.$decorator.data("mousedown") === "off") {
          this.rippleOut(this.$decorator);
        }
      }
    };

    /**
     * Turn off the ripple effect
     */


    Ripples.prototype.rippleOut = function rippleOut() {
      var _this3 = this;

      this.$decorator.off();

      if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].transitionEndSupported()) {
        this.$decorator.addClass("ripple-out");
      } else {
        this.$decorator.animate({ opacity: 0 }, 100, function () {
          _this3.$decorator.trigger("transitionend");
        });
      }

      this.$decorator.on(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].transitionEndSelector(), function () {
        if (_this3.$decorator) {
          _this3.$decorator.remove();
          _this3.$decorator = null;
        }
      });
    };

    /**
     * Turn on the ripple effect
     */


    Ripples.prototype.rippleOn = function rippleOn() {
      var _this4 = this;

      var size = this._getNewSize();

      if (__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].transitionEndSupported()) {
        this.$decorator.css({
          "-ms-transform": "scale(" + size + ")",
          "-moz-transform": "scale(" + size + ")",
          "-webkit-transform": "scale(" + size + ")",
          transform: "scale(" + size + ")"
        }).addClass("ripple-on").data("animating", "on").data("mousedown", "on");
      } else {
        this.$decorator.animate({
          width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
          "margin-left": Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
          "margin-top": Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
          opacity: 0.2
        }, this.config.duration, function () {
          _this4.$decorator.trigger("transitionend");
        });
      }
    };

    /**
     * Get the new size based on the element height/width and the ripple width
     */


    Ripples.prototype._getNewSize = function _getNewSize() {
      return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
    };

    // ------------------------------------------------------------------------
    // static

    Ripples._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Ripples($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return Ripples;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Ripples._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Ripples;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Ripples._jQueryInterface;
  };

  return Ripples;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (Ripples);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/select.js":
/*!*************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/select.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseFormControl__ = __webpack_require__(/*! ./baseFormControl */ "./node_modules/bootstrap-material-design/js/baseFormControl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import Checkbox from './checkbox'
//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Textarea from './textarea'


var Select = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "select";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {
    requiredClasses: ["form-control||custom-select"]
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Select = function (_BaseFormControl) {
    _inherits(Select, _BaseFormControl);

    function Select($element, config) {
      _classCallCheck(this, Select);

      // floating labels will cover the options, so trigger them to be above (if used)
      var _this = _possibleConstructorReturn(this, _BaseFormControl.call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
      Default, config)));

      _this.addIsFilled();
      return _this;
    }

    Select.prototype.dispose = function dispose() {
      _BaseFormControl.prototype.dispose.call(this, DATA_KEY);
    };

    Select.matches = function matches($element) {
      if ($element.prop("tagName") === "select") {
        return true;
      }
      return false;
    };

    Select.rejectMatch = function rejectMatch(component, $element) {
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].assert(this.$element, this.matches($element), component + " component element " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe($element) + " is invalid for <select>.");
    };

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    Select._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Select($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return Select;
  }(__WEBPACK_IMPORTED_MODULE_0__baseFormControl__["a" /* default */]);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Select._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Select;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Select._jQueryInterface;
  };

  return Select;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (Select);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/text.js":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/text.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseFormControl__ = __webpack_require__(/*! ./baseFormControl */ "./node_modules/bootstrap-material-design/js/baseFormControl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import Checkbox from './checkbox'
//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Textarea from './textarea'
//import Select from './select'


var Text = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "text";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Text = function (_BaseFormControl) {
    _inherits(Text, _BaseFormControl);

    function Text($element, config) {
      _classCallCheck(this, Text);

      return _possibleConstructorReturn(this, _BaseFormControl.call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
      Default, config)));
    }

    Text.prototype.dispose = function dispose() {
      var dataKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DATA_KEY;

      _BaseFormControl.prototype.dispose.call(this, dataKey);
    };

    Text.matches = function matches($element) {
      if ($element.attr("type") === "text") {
        return true;
      }
      return false;
    };

    Text.rejectMatch = function rejectMatch(component, $element) {
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].assert(this.$element, this.matches($element), component + " component element " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe($element) + " is invalid for type='text'.");
    };

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    Text._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Text($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return Text;
  }(__WEBPACK_IMPORTED_MODULE_0__baseFormControl__["a" /* default */]);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Text._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Text;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Text._jQueryInterface;
  };

  return Text;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (Text);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/textarea.js":
/*!***************************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/textarea.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseFormControl__ = __webpack_require__(/*! ./baseFormControl */ "./node_modules/bootstrap-material-design/js/baseFormControl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap-material-design/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


//import Checkbox from './checkbox'
//import File from './file'
//import Radio from './radio'
//import Switch from './switch'
//import Text from './text'
//import Select from './select'


var Textarea = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = "textarea";
  var DATA_KEY = "bmd." + NAME;
  var JQUERY_NAME = "bmd" + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
  var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

  var Default = {};

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Textarea = function (_BaseFormControl) {
    _inherits(Textarea, _BaseFormControl);

    function Textarea($element, config) {
      _classCallCheck(this, Textarea);

      return _possibleConstructorReturn(this, _BaseFormControl.call(this, $element, $.extend(true,
      //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
      Default, config)));
    }

    Textarea.prototype.dispose = function dispose() {
      _BaseFormControl.prototype.dispose.call(this, DATA_KEY);
    };

    Textarea.matches = function matches($element) {
      if ($element.prop("tagName") === "textarea") {
        return true;
      }
      return false;
    };

    Textarea.rejectMatch = function rejectMatch(component, $element) {
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].assert(this.$element, this.matches($element), component + " component element " + __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].describe($element) + " is invalid for <textarea>.");
    };

    // ------------------------------------------------------------------------
    // protected

    // ------------------------------------------------------------------------
    // private

    // ------------------------------------------------------------------------
    // static


    Textarea._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Textarea($element, config);
          $element.data(DATA_KEY, data);
        }
      });
    };

    return Textarea;
  }(__WEBPACK_IMPORTED_MODULE_0__baseFormControl__["a" /* default */]);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[JQUERY_NAME] = Textarea._jQueryInterface;
  $.fn[JQUERY_NAME].Constructor = Textarea;
  $.fn[JQUERY_NAME].noConflict = function () {
    $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
    return Textarea._jQueryInterface;
  };

  return Textarea;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (Textarea);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap-material-design/js/util.js":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap-material-design/js/util.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {var Util = function () {
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transitionEnd = false;
  var _transitionEndSelector = "";

  var TransitionEndEvent = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend",
    transition: "transitionend"
  };

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement("bmd");

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return TransitionEndEvent[name]; // { end: TransitionEndEvent[name] }
      }
    }

    return false;
  }

  function setTransitionEndSupport() {
    transitionEnd = transitionEndTest();

    // generate a concatenated transition end event selector
    for (var name in TransitionEndEvent) {
      _transitionEndSelector += " " + TransitionEndEvent[name];
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {
    transitionEndSupported: function transitionEndSupported() {
      return transitionEnd;
    },
    transitionEndSelector: function transitionEndSelector() {
      return _transitionEndSelector;
    },
    isChar: function isChar(event) {
      if (typeof event.which === "undefined") {
        return true;
      } else if (typeof event.which === "number" && event.which > 0) {
        return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 && // backspace
        event.which !== 9 && // tab
        event.which !== 13 && // enter
        event.which !== 16 && // shift
        event.which !== 17 && // ctrl
        event.which !== 20 && // caps lock
        event.which !== 27 // escape
        ;
      }
      return false;
    },
    assert: function assert($element, invalidTest, message) {
      if (invalidTest) {
        if (!$element === undefined) {
          $element.css("border", "1px solid red");
        }
        console.error(message, $element); // eslint-disable-line no-console
        throw message;
      }
    },
    describe: function describe($element) {
      if ($element === undefined) {
        return "undefined";
      } else if ($element.length === 0) {
        return "(no matching elements)";
      }
      return $element[0].outerHTML.split(">")[0] + ">";
    }
  };

  setTransitionEndSupport();
  return Util;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Util);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/bootstrap/js/src/alert.js":
/*!************************************************!*\
  !*** ./node_modules/bootstrap/js/src/alert.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap/js/src/util.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'alert';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.alert';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];

var Selector = {
  DISMISS: '[data-dismiss="alert"]'
};

var Event = {
  CLOSE: 'close' + EVENT_KEY,
  CLOSED: 'closed' + EVENT_KEY,
  CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
};

var ClassName = {
  ALERT: 'alert',
  FADE: 'fade',
  SHOW: 'show'

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var Alert = function () {
  function Alert(element) {
    _classCallCheck(this, Alert);

    this._element = element;
  }

  // Getters

  // Public

  Alert.prototype.close = function close(element) {
    var rootElement = this._element;
    if (element) {
      rootElement = this._getRootElement(element);
    }

    var customEvent = this._triggerCloseEvent(rootElement);

    if (customEvent.isDefaultPrevented()) {
      return;
    }

    this._removeElement(rootElement);
  };

  Alert.prototype.dispose = function dispose() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.removeData(this._element, DATA_KEY);
    this._element = null;
  };

  // Private

  Alert.prototype._getRootElement = function _getRootElement(element) {
    var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(element);
    var parent = false;

    if (selector) {
      parent = document.querySelector(selector);
    }

    if (!parent) {
      parent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).closest('.' + ClassName.ALERT)[0];
    }

    return parent;
  };

  Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
    var closeEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.CLOSE);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).trigger(closeEvent);
    return closeEvent;
  };

  Alert.prototype._removeElement = function _removeElement(element) {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).removeClass(ClassName.SHOW);

    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).hasClass(ClassName.FADE)) {
      this._destroyElement(element);
      return;
    }

    var transitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(element);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, function (event) {
      return _this._destroyElement(element, event);
    }).emulateTransitionEnd(transitionDuration);
  };

  Alert.prototype._destroyElement = function _destroyElement(element) {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).detach().trigger(Event.CLOSED).remove();
  };

  // Static

  Alert._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      var data = $element.data(DATA_KEY);

      if (!data) {
        data = new Alert(this);
        $element.data(DATA_KEY, data);
      }

      if (config === 'close') {
        data[config](this);
      }
    });
  };

  Alert._handleDismiss = function _handleDismiss(alertInstance) {
    return function (event) {
      if (event) {
        event.preventDefault();
      }

      alertInstance.close(this);
    };
  };

  _createClass(Alert, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }]);

  return Alert;
}();

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = Alert._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = Alert;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Alert._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (Alert);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/button.js":
/*!*************************************************!*\
  !*** ./node_modules/bootstrap/js/src/button.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */



/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'button';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.button';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];

var ClassName = {
  ACTIVE: 'active',
  BUTTON: 'btn',
  FOCUS: 'focus'
};

var Selector = {
  DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
  DATA_TOGGLE: '[data-toggle="buttons"]',
  INPUT: 'input:not([type="hidden"])',
  ACTIVE: '.active',
  BUTTON: '.btn'
};

var Event = {
  CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
  FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var Button = function () {
  function Button(element) {
    _classCallCheck(this, Button);

    this._element = element;
  }

  // Getters

  // Public

  Button.prototype.toggle = function toggle() {
    var triggerChangeEvent = true;
    var addAriaPressed = true;
    var rootElement = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).closest(Selector.DATA_TOGGLE)[0];

    if (rootElement) {
      var input = this._element.querySelector(Selector.INPUT);

      if (input) {
        if (input.type === 'radio') {
          if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
            triggerChangeEvent = false;
          } else {
            var activeElement = rootElement.querySelector(Selector.ACTIVE);

            if (activeElement) {
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()(activeElement).removeClass(ClassName.ACTIVE);
            }
          }
        }

        if (triggerChangeEvent) {
          if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
            return;
          }
          input.checked = !this._element.classList.contains(ClassName.ACTIVE);
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(input).trigger('change');
        }

        input.focus();
        addAriaPressed = false;
      }
    }

    if (addAriaPressed) {
      this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
    }

    if (triggerChangeEvent) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).toggleClass(ClassName.ACTIVE);
    }
  };

  Button.prototype.dispose = function dispose() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.removeData(this._element, DATA_KEY);
    this._element = null;
  };

  // Static

  Button._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var data = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY);

      if (!data) {
        data = new Button(this);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY, data);
      }

      if (config === 'toggle') {
        data[config]();
      }
    });
  };

  _createClass(Button, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }]);

  return Button;
}();

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
  event.preventDefault();

  var button = event.target;

  if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(button).hasClass(ClassName.BUTTON)) {
    button = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(button).closest(Selector.BUTTON);
  }

  Button._jQueryInterface.call(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(button), 'toggle');
}).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
  var button = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(event.target).closest(Selector.BUTTON)[0];
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = Button._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = Button;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Button._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (Button);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/carousel.js":
/*!***************************************************!*\
  !*** ./node_modules/bootstrap/js/src/carousel.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap/js/src/util.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'carousel';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.carousel';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];
var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
var SWIPE_THRESHOLD = 40;

var Default = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
};

var DefaultType = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
};

var Direction = {
  NEXT: 'next',
  PREV: 'prev',
  LEFT: 'left',
  RIGHT: 'right'
};

var Event = {
  SLIDE: 'slide' + EVENT_KEY,
  SLID: 'slid' + EVENT_KEY,
  KEYDOWN: 'keydown' + EVENT_KEY,
  MOUSEENTER: 'mouseenter' + EVENT_KEY,
  MOUSELEAVE: 'mouseleave' + EVENT_KEY,
  TOUCHSTART: 'touchstart' + EVENT_KEY,
  TOUCHMOVE: 'touchmove' + EVENT_KEY,
  TOUCHEND: 'touchend' + EVENT_KEY,
  POINTERDOWN: 'pointerdown' + EVENT_KEY,
  POINTERUP: 'pointerup' + EVENT_KEY,
  DRAG_START: 'dragstart' + EVENT_KEY,
  LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
  CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
};

var ClassName = {
  CAROUSEL: 'carousel',
  ACTIVE: 'active',
  SLIDE: 'slide',
  RIGHT: 'carousel-item-right',
  LEFT: 'carousel-item-left',
  NEXT: 'carousel-item-next',
  PREV: 'carousel-item-prev',
  ITEM: 'carousel-item',
  POINTER_EVENT: 'pointer-event'
};

var Selector = {
  ACTIVE: '.active',
  ACTIVE_ITEM: '.active.carousel-item',
  ITEM: '.carousel-item',
  ITEM_IMG: '.carousel-item img',
  NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
  INDICATORS: '.carousel-indicators',
  DATA_SLIDE: '[data-slide], [data-slide-to]',
  DATA_RIDE: '[data-ride="carousel"]'
};

var PointerType = {
  TOUCH: 'touch',
  PEN: 'pen'

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */
};
var Carousel = function () {
  function Carousel(element, config) {
    _classCallCheck(this, Carousel);

    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;

    this._config = this._getConfig(config);
    this._element = element;
    this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);
    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

    this._addEventListeners();
  }

  // Getters

  // Public

  Carousel.prototype.next = function next() {
    if (!this._isSliding) {
      this._slide(Direction.NEXT);
    }
  };

  Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).is(':visible') && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).css('visibility') !== 'hidden') {
      this.next();
    }
  };

  Carousel.prototype.prev = function prev() {
    if (!this._isSliding) {
      this._slide(Direction.PREV);
    }
  };

  Carousel.prototype.pause = function pause(event) {
    if (!event) {
      this._isPaused = true;
    }

    if (this._element.querySelector(Selector.NEXT_PREV)) {
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].triggerTransitionEnd(this._element);
      this.cycle(true);
    }

    clearInterval(this._interval);
    this._interval = null;
  };

  Carousel.prototype.cycle = function cycle(event) {
    if (!event) {
      this._isPaused = false;
    }

    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._config.interval && !this._isPaused) {
      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    }
  };

  Carousel.prototype.to = function to(index) {
    var _this = this;

    this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

    var activeIndex = this._getItemIndex(this._activeElement);

    if (index > this._items.length - 1 || index < 0) {
      return;
    }

    if (this._isSliding) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).one(Event.SLID, function () {
        return _this.to(index);
      });
      return;
    }

    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }

    var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

    this._slide(direction, this._items[index]);
  };

  Carousel.prototype.dispose = function dispose() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).off(EVENT_KEY);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.removeData(this._element, DATA_KEY);

    this._items = null;
    this._config = null;
    this._element = null;
    this._interval = null;
    this._isPaused = null;
    this._isSliding = null;
    this._activeElement = null;
    this._indicatorsElement = null;
  };

  // Private

  Carousel.prototype._getConfig = function _getConfig(config) {
    config = _extends({}, Default, config);
    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].typeCheckConfig(NAME, config, DefaultType);
    return config;
  };

  Carousel.prototype._handleSwipe = function _handleSwipe() {
    var absDeltax = Math.abs(this.touchDeltaX);

    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }

    var direction = absDeltax / this.touchDeltaX;

    // swipe left
    if (direction > 0) {
      this.prev();
    }

    // swipe right
    if (direction < 0) {
      this.next();
    }
  };

  Carousel.prototype._addEventListeners = function _addEventListeners() {
    var _this2 = this;

    if (this._config.keyboard) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.KEYDOWN, function (event) {
        return _this2._keydown(event);
      });
    }

    if (this._config.pause === 'hover') {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.MOUSEENTER, function (event) {
        return _this2.pause(event);
      }).on(Event.MOUSELEAVE, function (event) {
        return _this2.cycle(event);
      });
    }

    if (this._config.touch) {
      this._addTouchEventListeners();
    }
  };

  Carousel.prototype._addTouchEventListeners = function _addTouchEventListeners() {
    var _this3 = this;

    if (!this._touchSupported) {
      return;
    }

    var start = function start(event) {
      if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
        _this3.touchStartX = event.originalEvent.clientX;
      } else if (!_this3._pointerEvent) {
        _this3.touchStartX = event.originalEvent.touches[0].clientX;
      }
    };

    var move = function move(event) {
      // ensure swiping with one touch and not pinching
      if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
        _this3.touchDeltaX = 0;
      } else {
        _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
      }
    };

    var end = function end(event) {
      if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
        _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
      }

      _this3._handleSwipe();
      if (_this3._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        _this3.pause();
        if (_this3.touchTimeout) {
          clearTimeout(_this3.touchTimeout);
        }
        _this3.touchTimeout = setTimeout(function (event) {
          return _this3.cycle(event);
        }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
      }
    };

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element.querySelectorAll(Selector.ITEM_IMG)).on(Event.DRAG_START, function (e) {
      return e.preventDefault();
    });
    if (this._pointerEvent) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.POINTERDOWN, function (event) {
        return start(event);
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.POINTERUP, function (event) {
        return end(event);
      });

      this._element.classList.add(ClassName.POINTER_EVENT);
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.TOUCHSTART, function (event) {
        return start(event);
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.TOUCHMOVE, function (event) {
        return move(event);
      });
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.TOUCHEND, function (event) {
        return end(event);
      });
    }
  };

  Carousel.prototype._keydown = function _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }

    switch (event.which) {
      case ARROW_LEFT_KEYCODE:
        event.preventDefault();
        this.prev();
        break;
      case ARROW_RIGHT_KEYCODE:
        event.preventDefault();
        this.next();
        break;
      default:
    }
  };

  Carousel.prototype._getItemIndex = function _getItemIndex(element) {
    this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
    return this._items.indexOf(element);
  };

  Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
    var isNextDirection = direction === Direction.NEXT;
    var isPrevDirection = direction === Direction.PREV;
    var activeIndex = this._getItemIndex(activeElement);
    var lastItemIndex = this._items.length - 1;
    var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

    if (isGoingToWrap && !this._config.wrap) {
      return activeElement;
    }

    var delta = direction === Direction.PREV ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this._items.length;

    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
  };

  Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
    var targetIndex = this._getItemIndex(relatedTarget);
    var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));
    var slideEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.SLIDE, {
      relatedTarget: relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).trigger(slideEvent);

    return slideEvent;
  };

  Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(indicators).removeClass(ClassName.ACTIVE);

      var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

      if (nextIndicator) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(nextIndicator).addClass(ClassName.ACTIVE);
      }
    }
  };

  Carousel.prototype._slide = function _slide(direction, element) {
    var _this4 = this;

    var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);
    var activeElementIndex = this._getItemIndex(activeElement);
    var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
    var nextElementIndex = this._getItemIndex(nextElement);
    var isCycling = Boolean(this._interval);

    var directionalClassName = void 0;
    var orderClassName = void 0;
    var eventDirectionName = void 0;

    if (direction === Direction.NEXT) {
      directionalClassName = ClassName.LEFT;
      orderClassName = ClassName.NEXT;
      eventDirectionName = Direction.LEFT;
    } else {
      directionalClassName = ClassName.RIGHT;
      orderClassName = ClassName.PREV;
      eventDirectionName = Direction.RIGHT;
    }

    if (nextElement && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(nextElement).hasClass(ClassName.ACTIVE)) {
      this._isSliding = false;
      return;
    }

    var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
    if (slideEvent.isDefaultPrevented()) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return;
    }

    this._isSliding = true;

    if (isCycling) {
      this.pause();
    }

    this._setActiveIndicatorElement(nextElement);

    var slidEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.SLID, {
      relatedTarget: nextElement,
      direction: eventDirectionName,
      from: activeElementIndex,
      to: nextElementIndex
    });

    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.SLIDE)) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(nextElement).addClass(orderClassName);

      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].reflow(nextElement);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(activeElement).addClass(directionalClassName);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(nextElement).addClass(directionalClassName);

      var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);
      if (nextElementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = nextElementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }

      var transitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(activeElement);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(activeElement).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

        _this4._isSliding = false;

        setTimeout(function () {
          return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this4._element).trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(transitionDuration);
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(activeElement).removeClass(ClassName.ACTIVE);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(nextElement).addClass(ClassName.ACTIVE);

      this._isSliding = false;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).trigger(slidEvent);
    }

    if (isCycling) {
      this.cycle();
    }
  };

  // Static

  Carousel._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var data = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY);
      var _config = _extends({}, Default, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data());

      if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
        _config = _extends({}, _config, config);
      }

      var action = typeof config === 'string' ? config : _config.slide;

      if (!data) {
        data = new Carousel(this, _config);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY, data);
      }

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError('No method named "' + action + '"');
        }
        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    });
  };

  Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
    var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(this);

    if (!selector) {
      return;
    }

    var target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(selector)[0];

    if (!target || !__WEBPACK_IMPORTED_MODULE_0_jquery___default()(target).hasClass(ClassName.CAROUSEL)) {
      return;
    }

    var config = _extends({}, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(target).data(), __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data());
    var slideIndex = this.getAttribute('data-slide-to');

    if (slideIndex) {
      config.interval = false;
    }

    Carousel._jQueryInterface.call(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(target), config);

    if (slideIndex) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(target).data(DATA_KEY).to(slideIndex);
    }

    event.preventDefault();
  };

  _createClass(Carousel, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }, {
    key: 'Default',
    get: function get() {
      return Default;
    }
  }]);

  return Carousel;
}();

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on(Event.LOAD_DATA_API, function () {
  var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));
  for (var i = 0, len = carousels.length; i < len; i++) {
    var $carousel = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(carousels[i]);
    Carousel._jQueryInterface.call($carousel, $carousel.data());
  }
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = Carousel._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = Carousel;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Carousel._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (Carousel);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/collapse.js":
/*!***************************************************!*\
  !*** ./node_modules/bootstrap/js/src/collapse.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap/js/src/util.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'collapse';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.collapse';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];

var Default = {
  toggle: true,
  parent: ''
};

var DefaultType = {
  toggle: 'boolean',
  parent: '(string|element)'
};

var Event = {
  SHOW: 'show' + EVENT_KEY,
  SHOWN: 'shown' + EVENT_KEY,
  HIDE: 'hide' + EVENT_KEY,
  HIDDEN: 'hidden' + EVENT_KEY,
  CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
};

var ClassName = {
  SHOW: 'show',
  COLLAPSE: 'collapse',
  COLLAPSING: 'collapsing',
  COLLAPSED: 'collapsed'
};

var Dimension = {
  WIDTH: 'width',
  HEIGHT: 'height'
};

var Selector = {
  ACTIVES: '.show, .collapsing',
  DATA_TOGGLE: '[data-toggle="collapse"]'

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var Collapse = function () {
  function Collapse(element, config) {
    _classCallCheck(this, Collapse);

    this._isTransitioning = false;
    this._element = element;
    this._config = this._getConfig(config);
    this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

    var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));
    for (var i = 0, len = toggleList.length; i < len; i++) {
      var elem = toggleList[i];
      var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(elem);
      var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
        return foundElem === element;
      });

      if (selector !== null && filterElement.length > 0) {
        this._selector = selector;
        this._triggerArray.push(elem);
      }
    }

    this._parent = this._config.parent ? this._getParent() : null;

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._element, this._triggerArray);
    }

    if (this._config.toggle) {
      this.toggle();
    }
  }

  // Getters

  // Public

  Collapse.prototype.toggle = function toggle() {
    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.SHOW)) {
      this.hide();
    } else {
      this.show();
    }
  };

  Collapse.prototype.show = function show() {
    var _this = this;

    if (this._isTransitioning || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.SHOW)) {
      return;
    }

    var actives = void 0;
    var activesData = void 0;

    if (this._parent) {
      actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
        if (typeof _this._config.parent === 'string') {
          return elem.getAttribute('data-parent') === _this._config.parent;
        }

        return elem.classList.contains(ClassName.COLLAPSE);
      });

      if (actives.length === 0) {
        actives = null;
      }
    }

    if (actives) {
      activesData = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(actives).not(this._selector).data(DATA_KEY);
      if (activesData && activesData._isTransitioning) {
        return;
      }
    }

    var startEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.SHOW);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).trigger(startEvent);
    if (startEvent.isDefaultPrevented()) {
      return;
    }

    if (actives) {
      Collapse._jQueryInterface.call(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(actives).not(this._selector), 'hide');
      if (!activesData) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(actives).data(DATA_KEY, null);
      }
    }

    var dimension = this._getDimension();

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

    this._element.style[dimension] = 0;

    if (this._triggerArray.length) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
    }

    this.setTransitioning(true);

    var complete = function complete() {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

      _this._element.style[dimension] = '';

      _this.setTransitioning(false);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this._element).trigger(Event.SHOWN);
    };

    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    var scrollSize = 'scroll' + capitalizedDimension;
    var transitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(this._element);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);

    this._element.style[dimension] = this._element[scrollSize] + 'px';
  };

  Collapse.prototype.hide = function hide() {
    var _this2 = this;

    if (this._isTransitioning || !__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.SHOW)) {
      return;
    }

    var startEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.HIDE);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).trigger(startEvent);
    if (startEvent.isDefaultPrevented()) {
      return;
    }

    var dimension = this._getDimension();

    this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';

    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].reflow(this._element);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

    var triggerArrayLength = this._triggerArray.length;
    if (triggerArrayLength > 0) {
      for (var i = 0; i < triggerArrayLength; i++) {
        var trigger = this._triggerArray[i];
        var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(trigger);

        if (selector !== null) {
          var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()([].slice.call(document.querySelectorAll(selector)));
          if (!$elem.hasClass(ClassName.SHOW)) {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
          }
        }
      }
    }

    this.setTransitioning(true);

    var complete = function complete() {
      _this2.setTransitioning(false);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
    };

    this._element.style[dimension] = '';
    var transitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(this._element);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
  };

  Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  };

  Collapse.prototype.dispose = function dispose() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.removeData(this._element, DATA_KEY);

    this._config = null;
    this._parent = null;
    this._element = null;
    this._triggerArray = null;
    this._isTransitioning = null;
  };

  // Private

  Collapse.prototype._getConfig = function _getConfig(config) {
    config = _extends({}, Default, config);
    config.toggle = Boolean(config.toggle); // Coerce string values
    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].typeCheckConfig(NAME, config, DefaultType);
    return config;
  };

  Collapse.prototype._getDimension = function _getDimension() {
    var hasWidth = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(Dimension.WIDTH);
    return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
  };

  Collapse.prototype._getParent = function _getParent() {
    var _this3 = this;

    var parent = void 0;

    if (__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].isElement(this._config.parent)) {
      parent = this._config.parent;

      // It's a jQuery object
      if (typeof this._config.parent.jquery !== 'undefined') {
        parent = this._config.parent[0];
      }
    } else {
      parent = document.querySelector(this._config.parent);
    }

    var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

    var children = [].slice.call(parent.querySelectorAll(selector));
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(children).each(function (i, element) {
      _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
    });

    return parent;
  };

  Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
    var isOpen = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).hasClass(ClassName.SHOW);

    if (triggerArray.length) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
    }
  };

  // Static

  Collapse._getTargetFromElement = function _getTargetFromElement(element) {
    var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(element);
    return selector ? document.querySelector(selector) : null;
  };

  Collapse._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var $this = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      var data = $this.data(DATA_KEY);
      var _config = _extends({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config ? config : {});

      if (!data && _config.toggle && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      if (!data) {
        data = new Collapse(this, _config);
        $this.data(DATA_KEY, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"');
        }
        data[config]();
      }
    });
  };

  _createClass(Collapse, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }, {
    key: 'Default',
    get: function get() {
      return Default;
    }
  }]);

  return Collapse;
}();

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.currentTarget.tagName === 'A') {
    event.preventDefault();
  }

  var $trigger = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
  var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(this);
  var selectors = [].slice.call(document.querySelectorAll(selector));

  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(selectors).each(function () {
    var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
    var data = $target.data(DATA_KEY);
    var config = data ? 'toggle' : $trigger.data();
    Collapse._jQueryInterface.call($target, config);
  });
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = Collapse._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = Collapse;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Collapse._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (Collapse);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/modal.js":
/*!************************************************!*\
  !*** ./node_modules/bootstrap/js/src/modal.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap/js/src/util.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'modal';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.modal';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];
var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

var Default = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: true
};

var DefaultType = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean',
  show: 'boolean'
};

var Event = {
  HIDE: 'hide' + EVENT_KEY,
  HIDDEN: 'hidden' + EVENT_KEY,
  SHOW: 'show' + EVENT_KEY,
  SHOWN: 'shown' + EVENT_KEY,
  FOCUSIN: 'focusin' + EVENT_KEY,
  RESIZE: 'resize' + EVENT_KEY,
  CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
  KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
  MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
  MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
  CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
};

var ClassName = {
  SCROLLABLE: 'modal-dialog-scrollable',
  SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
  BACKDROP: 'modal-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  SHOW: 'show'
};

var Selector = {
  DIALOG: '.modal-dialog',
  MODAL_BODY: '.modal-body',
  DATA_TOGGLE: '[data-toggle="modal"]',
  DATA_DISMISS: '[data-dismiss="modal"]',
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top'

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var Modal = function () {
  function Modal(element, config) {
    _classCallCheck(this, Modal);

    this._config = this._getConfig(config);
    this._element = element;
    this._dialog = element.querySelector(Selector.DIALOG);
    this._backdrop = null;
    this._isShown = false;
    this._isBodyOverflowing = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
    this._scrollbarWidth = 0;
  }

  // Getters

  // Public

  Modal.prototype.toggle = function toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  };

  Modal.prototype.show = function show(relatedTarget) {
    var _this = this;

    if (this._isShown || this._isTransitioning) {
      return;
    }

    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.FADE)) {
      this._isTransitioning = true;
    }

    var showEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.SHOW, {
      relatedTarget: relatedTarget
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).trigger(showEvent);

    if (this._isShown || showEvent.isDefaultPrevented()) {
      return;
    }

    this._isShown = true;

    this._checkScrollbar();
    this._setScrollbar();

    this._adjustDialog();

    this._setEscapeEvent();
    this._setResizeEvent();

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
      return _this.hide(event);
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(event.target).is(_this._element)) {
          _this._ignoreBackdropClick = true;
        }
      });
    });

    this._showBackdrop(function () {
      return _this._showElement(relatedTarget);
    });
  };

  Modal.prototype.hide = function hide(event) {
    var _this2 = this;

    if (event) {
      event.preventDefault();
    }

    if (!this._isShown || this._isTransitioning) {
      return;
    }

    var hideEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.HIDE);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).trigger(hideEvent);

    if (!this._isShown || hideEvent.isDefaultPrevented()) {
      return;
    }

    this._isShown = false;
    var transition = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.FADE);

    if (transition) {
      this._isTransitioning = true;
    }

    this._setEscapeEvent();
    this._setResizeEvent();

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off(Event.FOCUSIN);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).removeClass(ClassName.SHOW);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).off(Event.CLICK_DISMISS);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._dialog).off(Event.MOUSEDOWN_DISMISS);

    if (transition) {
      var transitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(this._element);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, function (event) {
        return _this2._hideModal(event);
      }).emulateTransitionEnd(transitionDuration);
    } else {
      this._hideModal();
    }
  };

  Modal.prototype.dispose = function dispose() {
    [window, this._element, this._dialog].forEach(function (htmlElement) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(htmlElement).off(EVENT_KEY);
    });

    /**
     * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
     * Do not move `document` in `htmlElements` array
     * It will remove `Event.CLICK_DATA_API` event that should remain
     */
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off(Event.FOCUSIN);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.removeData(this._element, DATA_KEY);

    this._config = null;
    this._element = null;
    this._dialog = null;
    this._backdrop = null;
    this._isShown = null;
    this._isBodyOverflowing = null;
    this._ignoreBackdropClick = null;
    this._isTransitioning = null;
    this._scrollbarWidth = null;
  };

  Modal.prototype.handleUpdate = function handleUpdate() {
    this._adjustDialog();
  };

  // Private

  Modal.prototype._getConfig = function _getConfig(config) {
    config = _extends({}, Default, config);
    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].typeCheckConfig(NAME, config, DefaultType);
    return config;
  };

  Modal.prototype._showElement = function _showElement(relatedTarget) {
    var _this3 = this;

    var transition = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.FADE);

    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      // Don't move modal's DOM position
      document.body.appendChild(this._element);
    }

    this._element.style.display = 'block';
    this._element.removeAttribute('aria-hidden');
    this._element.setAttribute('aria-modal', true);

    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._dialog).hasClass(ClassName.SCROLLABLE)) {
      this._dialog.querySelector(Selector.MODAL_BODY).scrollTop = 0;
    } else {
      this._element.scrollTop = 0;
    }

    if (transition) {
      __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].reflow(this._element);
    }

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).addClass(ClassName.SHOW);

    if (this._config.focus) {
      this._enforceFocus();
    }

    var shownEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.SHOWN, {
      relatedTarget: relatedTarget
    });

    var transitionComplete = function transitionComplete() {
      if (_this3._config.focus) {
        _this3._element.focus();
      }
      _this3._isTransitioning = false;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this3._element).trigger(shownEvent);
    };

    if (transition) {
      var transitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(this._dialog);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._dialog).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
    } else {
      transitionComplete();
    }
  };

  Modal.prototype._enforceFocus = function _enforceFocus() {
    var _this4 = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off(Event.FOCUSIN) // Guard against infinite focus loop
    .on(Event.FOCUSIN, function (event) {
      if (document !== event.target && _this4._element !== event.target && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this4._element).has(event.target).length === 0) {
        _this4._element.focus();
      }
    });
  };

  Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
    var _this5 = this;

    if (this._isShown && this._config.keyboard) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
        if (event.which === ESCAPE_KEYCODE) {
          event.preventDefault();
          _this5.hide();
        }
      });
    } else if (!this._isShown) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).off(Event.KEYDOWN_DISMISS);
    }
  };

  Modal.prototype._setResizeEvent = function _setResizeEvent() {
    var _this6 = this;

    if (this._isShown) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on(Event.RESIZE, function (event) {
        return _this6.handleUpdate(event);
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(Event.RESIZE);
    }
  };

  Modal.prototype._hideModal = function _hideModal() {
    var _this7 = this;

    this._element.style.display = 'none';
    this._element.setAttribute('aria-hidden', true);
    this._element.removeAttribute('aria-modal');
    this._isTransitioning = false;
    this._showBackdrop(function () {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).removeClass(ClassName.OPEN);
      _this7._resetAdjustments();
      _this7._resetScrollbar();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this7._element).trigger(Event.HIDDEN);
    });
  };

  Modal.prototype._removeBackdrop = function _removeBackdrop() {
    if (this._backdrop) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._backdrop).remove();
      this._backdrop = null;
    }
  };

  Modal.prototype._showBackdrop = function _showBackdrop(callback) {
    var _this8 = this;

    var animate = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

    if (this._isShown && this._config.backdrop) {
      this._backdrop = document.createElement('div');
      this._backdrop.className = ClassName.BACKDROP;

      if (animate) {
        this._backdrop.classList.add(animate);
      }

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._backdrop).appendTo(document.body);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).on(Event.CLICK_DISMISS, function (event) {
        if (_this8._ignoreBackdropClick) {
          _this8._ignoreBackdropClick = false;
          return;
        }
        if (event.target !== event.currentTarget) {
          return;
        }
        if (_this8._config.backdrop === 'static') {
          _this8._element.focus();
        } else {
          _this8.hide();
        }
      });

      if (animate) {
        __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].reflow(this._backdrop);
      }

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._backdrop).addClass(ClassName.SHOW);

      if (!callback) {
        return;
      }

      if (!animate) {
        callback();
        return;
      }

      var backdropTransitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(this._backdrop);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._backdrop).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
    } else if (!this._isShown && this._backdrop) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._backdrop).removeClass(ClassName.SHOW);

      var callbackRemove = function callbackRemove() {
        _this8._removeBackdrop();
        if (callback) {
          callback();
        }
      };

      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.FADE)) {
        var _backdropTransitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(this._backdrop);

        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._backdrop).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
      } else {
        callbackRemove();
      }
    } else if (callback) {
      callback();
    }
  };

  // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // todo (fat): these should probably be refactored out of modal.js
  // ----------------------------------------------------------------------

  Modal.prototype._adjustDialog = function _adjustDialog() {
    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

    if (!this._isBodyOverflowing && isModalOverflowing) {
      this._element.style.paddingLeft = this._scrollbarWidth + 'px';
    }

    if (this._isBodyOverflowing && !isModalOverflowing) {
      this._element.style.paddingRight = this._scrollbarWidth + 'px';
    }
  };

  Modal.prototype._resetAdjustments = function _resetAdjustments() {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  };

  Modal.prototype._checkScrollbar = function _checkScrollbar() {
    var rect = document.body.getBoundingClientRect();
    this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
    this._scrollbarWidth = this._getScrollbarWidth();
  };

  Modal.prototype._setScrollbar = function _setScrollbar() {
    var _this9 = this;

    if (this._isBodyOverflowing) {
      // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
      //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
      var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
      var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT));

      // Adjust fixed content padding
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight;
        var calculatedPadding = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).css('padding-right');
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + 'px');
      });

      // Adjust sticky content margin
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(stickyContent).each(function (index, element) {
        var actualMargin = element.style.marginRight;
        var calculatedMargin = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).css('margin-right');
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + 'px');
      });

      // Adjust body padding
      var actualPadding = document.body.style.paddingRight;
      var calculatedPadding = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).css('padding-right');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + 'px');
    }

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).addClass(ClassName.OPEN);
  };

  Modal.prototype._resetScrollbar = function _resetScrollbar() {
    // Restore fixed content padding
    var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(fixedContent).each(function (index, element) {
      var padding = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).data('padding-right');
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).removeData('padding-right');
      element.style.paddingRight = padding ? padding : '';
    });

    // Restore sticky content
    var elements = [].slice.call(document.querySelectorAll('' + Selector.STICKY_CONTENT));
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(elements).each(function (index, element) {
      var margin = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).data('margin-right');
      if (typeof margin !== 'undefined') {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).css('margin-right', margin).removeData('margin-right');
      }
    });

    // Restore body padding
    var padding = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).data('padding-right');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).removeData('padding-right');
    document.body.style.paddingRight = padding ? padding : '';
  };

  Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  // Static

  Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      var data = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY);
      var _config = _extends({}, Default, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config ? config : {});

      if (!data) {
        data = new Modal(this, _config);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"');
        }
        data[config](relatedTarget);
      } else if (_config.show) {
        data.show(relatedTarget);
      }
    });
  };

  _createClass(Modal, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }, {
    key: 'Default',
    get: function get() {
      return Default;
    }
  }]);

  return Modal;
}();

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
  var _this10 = this;

  var target = void 0;
  var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(this);

  if (selector) {
    target = document.querySelector(selector);
  }

  var config = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(target).data(DATA_KEY) ? 'toggle' : _extends({}, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(target).data(), __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data());

  if (this.tagName === 'A' || this.tagName === 'AREA') {
    event.preventDefault();
  }

  var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(target).one(Event.SHOW, function (showEvent) {
    if (showEvent.isDefaultPrevented()) {
      // Only register focus restorer if modal will actually get shown
      return;
    }

    $target.one(Event.HIDDEN, function () {
      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this10).is(':visible')) {
        _this10.focus();
      }
    });
  });

  Modal._jQueryInterface.call(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(target), config, this);
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = Modal._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = Modal;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Modal._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (Modal);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/popover.js":
/*!**************************************************!*\
  !*** ./node_modules/bootstrap/js/src/popover.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tooltip__ = __webpack_require__(/*! ./tooltip */ "./node_modules/bootstrap/js/src/tooltip.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'popover';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.popover';
var EVENT_KEY = '.' + DATA_KEY;
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];
var CLASS_PREFIX = 'bs-popover';
var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

var Default = _extends({}, __WEBPACK_IMPORTED_MODULE_1__tooltip__["a" /* default */].Default, {
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
});

var DefaultType = _extends({}, __WEBPACK_IMPORTED_MODULE_1__tooltip__["a" /* default */].DefaultType, {
  content: '(string|element|function)'
});

var ClassName = {
  FADE: 'fade',
  SHOW: 'show'
};

var Selector = {
  TITLE: '.popover-header',
  CONTENT: '.popover-body'
};

var Event = {
  HIDE: 'hide' + EVENT_KEY,
  HIDDEN: 'hidden' + EVENT_KEY,
  SHOW: 'show' + EVENT_KEY,
  SHOWN: 'shown' + EVENT_KEY,
  INSERTED: 'inserted' + EVENT_KEY,
  CLICK: 'click' + EVENT_KEY,
  FOCUSIN: 'focusin' + EVENT_KEY,
  FOCUSOUT: 'focusout' + EVENT_KEY,
  MOUSEENTER: 'mouseenter' + EVENT_KEY,
  MOUSELEAVE: 'mouseleave' + EVENT_KEY

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var Popover = function (_Tooltip) {
  _inherits(Popover, _Tooltip);

  function Popover() {
    _classCallCheck(this, Popover);

    return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
  }

  // Overrides

  Popover.prototype.isWithContent = function isWithContent() {
    return this.getTitle() || this._getContent();
  };

  Popover.prototype.addAttachmentClass = function addAttachmentClass(attachment) {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
  };

  Popover.prototype.getTipElement = function getTipElement() {
    this.tip = this.tip || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.config.template)[0];
    return this.tip;
  };

  Popover.prototype.setContent = function setContent() {
    var $tip = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.getTipElement());

    // We use append for html objects to maintain js events
    this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
    var content = this._getContent();
    if (typeof content === 'function') {
      content = content.call(this.element);
    }
    this.setElementContent($tip.find(Selector.CONTENT), content);

    $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
  };

  // Private

  Popover.prototype._getContent = function _getContent() {
    return this.element.getAttribute('data-content') || this.config.content;
  };

  Popover.prototype._cleanTipClass = function _cleanTipClass() {
    var $tip = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.getTipElement());
    var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
    if (tabClass !== null && tabClass.length > 0) {
      $tip.removeClass(tabClass.join(''));
    }
  };

  // Static

  Popover._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var data = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY);
      var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Popover(this, _config);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"');
        }
        data[config]();
      }
    });
  };

  _createClass(Popover, null, [{
    key: 'VERSION',

    // Getters

    get: function get() {
      return VERSION;
    }
  }, {
    key: 'Default',
    get: function get() {
      return Default;
    }
  }, {
    key: 'NAME',
    get: function get() {
      return NAME;
    }
  }, {
    key: 'DATA_KEY',
    get: function get() {
      return DATA_KEY;
    }
  }, {
    key: 'Event',
    get: function get() {
      return Event;
    }
  }, {
    key: 'EVENT_KEY',
    get: function get() {
      return EVENT_KEY;
    }
  }, {
    key: 'DefaultType',
    get: function get() {
      return DefaultType;
    }
  }]);

  return Popover;
}(__WEBPACK_IMPORTED_MODULE_1__tooltip__["a" /* default */]);

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = Popover._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = Popover;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Popover._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (Popover);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/scrollspy.js":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/src/scrollspy.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap/js/src/util.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'scrollspy';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.scrollspy';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];

var Default = {
  offset: 10,
  method: 'auto',
  target: ''
};

var DefaultType = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};

var Event = {
  ACTIVATE: 'activate' + EVENT_KEY,
  SCROLL: 'scroll' + EVENT_KEY,
  LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
};

var ClassName = {
  DROPDOWN_ITEM: 'dropdown-item',
  DROPDOWN_MENU: 'dropdown-menu',
  ACTIVE: 'active'
};

var Selector = {
  DATA_SPY: '[data-spy="scroll"]',
  ACTIVE: '.active',
  NAV_LIST_GROUP: '.nav, .list-group',
  NAV_LINKS: '.nav-link',
  NAV_ITEMS: '.nav-item',
  LIST_ITEMS: '.list-group-item',
  DROPDOWN: '.dropdown',
  DROPDOWN_ITEMS: '.dropdown-item',
  DROPDOWN_TOGGLE: '.dropdown-toggle'
};

var OffsetMethod = {
  OFFSET: 'offset',
  POSITION: 'position'

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var ScrollSpy = function () {
  function ScrollSpy(element, config) {
    var _this = this;

    _classCallCheck(this, ScrollSpy);

    this._element = element;
    this._scrollElement = element.tagName === 'BODY' ? window : element;
    this._config = this._getConfig(config);
    this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.LIST_ITEMS + ',') + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._scrollElement).on(Event.SCROLL, function (event) {
      return _this._process(event);
    });

    this.refresh();
    this._process();
  }

  // Getters

  // Public

  ScrollSpy.prototype.refresh = function refresh() {
    var _this2 = this;

    var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;

    var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

    var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

    this._offsets = [];
    this._targets = [];

    this._scrollHeight = this._getScrollHeight();

    var targets = [].slice.call(document.querySelectorAll(this._selector));

    targets.map(function (element) {
      var target = void 0;
      var targetSelector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(element);

      if (targetSelector) {
        target = document.querySelector(targetSelector);
      }

      if (target) {
        var targetBCR = target.getBoundingClientRect();
        if (targetBCR.width || targetBCR.height) {
          // TODO (fat): remove sketch reliance on jQuery position/offset
          return [__WEBPACK_IMPORTED_MODULE_0_jquery___default()(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
      }
      return null;
    }).filter(function (item) {
      return item;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).forEach(function (item) {
      _this2._offsets.push(item[0]);
      _this2._targets.push(item[1]);
    });
  };

  ScrollSpy.prototype.dispose = function dispose() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.removeData(this._element, DATA_KEY);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._scrollElement).off(EVENT_KEY);

    this._element = null;
    this._scrollElement = null;
    this._config = null;
    this._selector = null;
    this._offsets = null;
    this._targets = null;
    this._activeTarget = null;
    this._scrollHeight = null;
  };

  // Private

  ScrollSpy.prototype._getConfig = function _getConfig(config) {
    config = _extends({}, Default, (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config ? config : {});

    if (typeof config.target !== 'string') {
      var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(config.target).attr('id');
      if (!id) {
        id = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getUID(NAME);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(config.target).attr('id', id);
      }
      config.target = '#' + id;
    }

    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].typeCheckConfig(NAME, config, DefaultType);

    return config;
  };

  ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  };

  ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  };

  ScrollSpy.prototype._process = function _process() {
    var scrollTop = this._getScrollTop() + this._config.offset;
    var scrollHeight = this._getScrollHeight();
    var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

    if (this._scrollHeight !== scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      var target = this._targets[this._targets.length - 1];

      if (this._activeTarget !== target) {
        this._activate(target);
      }
      return;
    }

    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
      this._activeTarget = null;
      this._clear();
      return;
    }

    var offsetLength = this._offsets.length;
    for (var i = offsetLength; i--;) {
      var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

      if (isActiveTarget) {
        this._activate(this._targets[i]);
      }
    }
  };

  ScrollSpy.prototype._activate = function _activate(target) {
    this._activeTarget = target;

    this._clear();

    var queries = this._selector.split(',').map(function (selector) {
      return selector + '[data-target="' + target + '"],' + selector + '[href="' + target + '"]';
    });

    var $link = __WEBPACK_IMPORTED_MODULE_0_jquery___default()([].slice.call(document.querySelectorAll(queries.join(','))));

    if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
      $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
      $link.addClass(ClassName.ACTIVE);
    } else {
      // Set triggered link as active
      $link.addClass(ClassName.ACTIVE);
      // Set triggered links parents as active
      // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
      $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ', ' + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE);
      // Handle special case when .nav-link is inside .nav-item
      $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
    }

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._scrollElement).trigger(Event.ACTIVATE, {
      relatedTarget: target
    });
  };

  ScrollSpy.prototype._clear = function _clear() {
    [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
      return node.classList.contains(ClassName.ACTIVE);
    }).forEach(function (node) {
      return node.classList.remove(ClassName.ACTIVE);
    });
  };

  // Static

  ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var data = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY);
      var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

      if (!data) {
        data = new ScrollSpy(this, _config);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data(DATA_KEY, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"');
        }
        data[config]();
      }
    });
  };

  _createClass(ScrollSpy, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }, {
    key: 'Default',
    get: function get() {
      return Default;
    }
  }]);

  return ScrollSpy;
}();

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on(Event.LOAD_DATA_API, function () {
  var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
  var scrollSpysLength = scrollSpys.length;

  for (var i = scrollSpysLength; i--;) {
    var $spy = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(scrollSpys[i]);
    ScrollSpy._jQueryInterface.call($spy, $spy.data());
  }
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = ScrollSpy._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = ScrollSpy;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return ScrollSpy._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (ScrollSpy);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/tab.js":
/*!**********************************************!*\
  !*** ./node_modules/bootstrap/js/src/tab.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap/js/src/util.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'tab';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.tab';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME];

var Event = {
  HIDE: 'hide' + EVENT_KEY,
  HIDDEN: 'hidden' + EVENT_KEY,
  SHOW: 'show' + EVENT_KEY,
  SHOWN: 'shown' + EVENT_KEY,
  CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
};

var ClassName = {
  DROPDOWN_MENU: 'dropdown-menu',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  FADE: 'fade',
  SHOW: 'show'
};

var Selector = {
  DROPDOWN: '.dropdown',
  NAV_LIST_GROUP: '.nav, .list-group',
  ACTIVE: '.active',
  ACTIVE_UL: '> li > .active',
  DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
  DROPDOWN_TOGGLE: '.dropdown-toggle',
  DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var Tab = function () {
  function Tab(element) {
    _classCallCheck(this, Tab);

    this._element = element;
  }

  // Getters

  // Public

  Tab.prototype.show = function show() {
    var _this = this;

    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.ACTIVE) || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).hasClass(ClassName.DISABLED)) {
      return;
    }

    var target = void 0;
    var previous = void 0;
    var listElement = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).closest(Selector.NAV_LIST_GROUP)[0];
    var selector = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getSelectorFromElement(this._element);

    if (listElement) {
      var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
      previous = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.makeArray(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(listElement).find(itemSelector));
      previous = previous[previous.length - 1];
    }

    var hideEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.HIDE, {
      relatedTarget: this._element
    });

    var showEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.SHOW, {
      relatedTarget: previous
    });

    if (previous) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(previous).trigger(hideEvent);
    }

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this._element).trigger(showEvent);

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
      return;
    }

    if (selector) {
      target = document.querySelector(selector);
    }

    this._activate(this._element, listElement);

    var complete = function complete() {
      var hiddenEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.HIDDEN, {
        relatedTarget: _this._element
      });

      var shownEvent = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Event(Event.SHOWN, {
        relatedTarget: previous
      });

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(previous).trigger(hiddenEvent);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this._element).trigger(shownEvent);
    };

    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  };

  Tab.prototype.dispose = function dispose() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.removeData(this._element, DATA_KEY);
    this._element = null;
  };

  // Private

  Tab.prototype._activate = function _activate(element, container, callback) {
    var _this2 = this;

    var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(container).find(Selector.ACTIVE_UL) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(container).children(Selector.ACTIVE);

    var active = activeElements[0];
    var isTransitioning = callback && active && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(active).hasClass(ClassName.FADE);
    var complete = function complete() {
      return _this2._transitionComplete(element, active, callback);
    };

    if (active && isTransitioning) {
      var transitionDuration = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].getTransitionDurationFromElement(active);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(active).removeClass(ClassName.SHOW).one(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    } else {
      complete();
    }
  };

  Tab.prototype._transitionComplete = function _transitionComplete(element, active, callback) {
    if (active) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(active).removeClass(ClassName.ACTIVE);

      var dropdownChild = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

      if (dropdownChild) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(dropdownChild).removeClass(ClassName.ACTIVE);
      }

      if (active.getAttribute('role') === 'tab') {
        active.setAttribute('aria-selected', false);
      }
    }

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).addClass(ClassName.ACTIVE);
    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', true);
    }

    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* default */].reflow(element);

    if (element.classList.contains(ClassName.FADE)) {
      element.classList.add(ClassName.SHOW);
    }

    if (element.parentNode && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
      var dropdownElement = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).closest(Selector.DROPDOWN)[0];

      if (dropdownElement) {
        var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));

        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(dropdownToggleList).addClass(ClassName.ACTIVE);
      }

      element.setAttribute('aria-expanded', true);
    }

    if (callback) {
      callback();
    }
  };

  // Static

  Tab._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var $this = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      var data = $this.data(DATA_KEY);

      if (!data) {
        data = new Tab(this);
        $this.data(DATA_KEY, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"');
        }
        data[config]();
      }
    });
  };

  _createClass(Tab, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }]);

  return Tab;
}();

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
  event.preventDefault();
  Tab._jQueryInterface.call(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'show');
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = Tab._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].Constructor = Tab;
__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Tab._jQueryInterface;
};

/* unused harmony default export */ var _unused_webpack_default_export = (Tab);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/tools/sanitizer.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/src/tools/sanitizer.js ***!
  \**********************************************************/
/*! exports provided: DefaultWhitelist, sanitizeHtml */
/*! exports used: DefaultWhitelist, sanitizeHtml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultWhitelist; });
/* harmony export (immutable) */ __webpack_exports__["b"] = sanitizeHtml;
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): tools/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];

var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

var DefaultWhitelist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []

  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
};var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;

/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */
var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

function allowedAttribute(attr, allowedAttributeList) {
  var attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.indexOf(attrName) !== -1) {
    if (uriAttrs.indexOf(attrName) !== -1) {
      return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
    }

    return true;
  }

  var regExp = allowedAttributeList.filter(function (attrRegex) {
    return attrRegex instanceof RegExp;
  });

  // Check if a regular expression validates the attribute.
  for (var i = 0, l = regExp.length; i < l; i++) {
    if (attrName.match(regExp[i])) {
      return true;
    }
  }

  return false;
}

function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
  if (unsafeHtml.length === 0) {
    return unsafeHtml;
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml);
  }

  var domParser = new window.DOMParser();
  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  var whitelistKeys = Object.keys(whiteList);
  var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

  var _loop = function _loop(i, len) {
    var el = elements[i];
    var elName = el.nodeName.toLowerCase();

    if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
      el.parentNode.removeChild(el);

      return 'continue';
    }

    var attributeList = [].slice.call(el.attributes);
    var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

    attributeList.forEach(function (attr) {
      if (!allowedAttribute(attr, whitelistedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  };

  for (var i = 0, len = elements.length; i < len; i++) {
    var _ret = _loop(i, len);

    if (_ret === 'continue') continue;
  }

  return createdDocument.body.innerHTML;
}

/***/ }),

/***/ "./node_modules/bootstrap/js/src/tooltip.js":
/*!**************************************************!*\
  !*** ./node_modules/bootstrap/js/src/tooltip.js ***!
  \**************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_sanitizer__ = __webpack_require__(/*! ./tools/sanitizer */ "./node_modules/bootstrap/js/src/tools/sanitizer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_popper_js__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(/*! ./util */ "./node_modules/bootstrap/js/src/util.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */






/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'tooltip';
var VERSION = '4.3.1';
var DATA_KEY = 'bs.tooltip';
var EVENT_KEY = '.' + DATA_KEY;
var JQUERY_NO_CONFLICT = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.fn[NAME];
var CLASS_PREFIX = 'bs-tooltip';
var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');
var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

var DefaultType = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  offset: '(number|string|function)',
  container: '(string|element|boolean)',
  fallbackPlacement: '(string|array)',
  boundary: '(string|element)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  whiteList: 'object'
};

var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
};

var Default = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  offset: 0,
  container: false,
  fallbackPlacement: 'flip',
  boundary: 'scrollParent',
  sanitize: true,
  sanitizeFn: null,
  whiteList: __WEBPACK_IMPORTED_MODULE_0__tools_sanitizer__["a" /* DefaultWhitelist */]
};

var HoverState = {
  SHOW: 'show',
  OUT: 'out'
};

var Event = {
  HIDE: 'hide' + EVENT_KEY,
  HIDDEN: 'hidden' + EVENT_KEY,
  SHOW: 'show' + EVENT_KEY,
  SHOWN: 'shown' + EVENT_KEY,
  INSERTED: 'inserted' + EVENT_KEY,
  CLICK: 'click' + EVENT_KEY,
  FOCUSIN: 'focusin' + EVENT_KEY,
  FOCUSOUT: 'focusout' + EVENT_KEY,
  MOUSEENTER: 'mouseenter' + EVENT_KEY,
  MOUSELEAVE: 'mouseleave' + EVENT_KEY
};

var ClassName = {
  FADE: 'fade',
  SHOW: 'show'
};

var Selector = {
  TOOLTIP: '.tooltip',
  TOOLTIP_INNER: '.tooltip-inner',
  ARROW: '.arrow'
};

var Trigger = {
  HOVER: 'hover',
  FOCUS: 'focus',
  CLICK: 'click',
  MANUAL: 'manual'

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

};
var Tooltip = function () {
  function Tooltip(element, config) {
    _classCallCheck(this, Tooltip);

    /**
     * Check for Popper dependency
     * Popper - https://popper.js.org
     */
    if (typeof __WEBPACK_IMPORTED_MODULE_2_popper_js__["default"] === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
    }

    // private
    this._isEnabled = true;
    this._timeout = 0;
    this._hoverState = '';
    this._activeTrigger = {};
    this._popper = null;

    // Protected
    this.element = element;
    this.config = this._getConfig(config);
    this.tip = null;

    this._setListeners();
  }

  // Getters

  // Public

  Tooltip.prototype.enable = function enable() {
    this._isEnabled = true;
  };

  Tooltip.prototype.disable = function disable() {
    this._isEnabled = false;
  };

  Tooltip.prototype.toggleEnabled = function toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  };

  Tooltip.prototype.toggle = function toggle(event) {
    if (!this._isEnabled) {
      return;
    }

    if (event) {
      var dataKey = this.constructor.DATA_KEY;
      var context = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.currentTarget).data(dataKey, context);
      }

      context._activeTrigger.click = !context._activeTrigger.click;

      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (__WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.getTipElement()).hasClass(ClassName.SHOW)) {
        this._leave(null, this);
        return;
      }

      this._enter(null, this);
    }
  };

  Tooltip.prototype.dispose = function dispose() {
    clearTimeout(this._timeout);

    __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.removeData(this.element, this.constructor.DATA_KEY);

    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).off(this.constructor.EVENT_KEY);
    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).closest('.modal').off('hide.bs.modal');

    if (this.tip) {
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.tip).remove();
    }

    this._isEnabled = null;
    this._timeout = null;
    this._hoverState = null;
    this._activeTrigger = null;
    if (this._popper !== null) {
      this._popper.destroy();
    }

    this._popper = null;
    this.element = null;
    this.config = null;
    this.tip = null;
  };

  Tooltip.prototype.show = function show() {
    var _this = this;

    if (__WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).css('display') === 'none') {
      throw new Error('Please use show on visible elements');
    }

    var showEvent = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.Event(this.constructor.Event.SHOW);
    if (this.isWithContent() && this._isEnabled) {
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).trigger(showEvent);

      var shadowRoot = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].findShadowRoot(this.element);
      var isInTheDom = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

      if (showEvent.isDefaultPrevented() || !isInTheDom) {
        return;
      }

      var tip = this.getTipElement();
      var tipId = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].getUID(this.constructor.NAME);

      tip.setAttribute('id', tipId);
      this.element.setAttribute('aria-describedby', tipId);

      this.setContent();

      if (this.config.animation) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).addClass(ClassName.FADE);
      }

      var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

      var attachment = this._getAttachment(placement);
      this.addAttachmentClass(attachment);

      var container = this._getContainer();
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).data(this.constructor.DATA_KEY, this);

      if (!__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.contains(this.element.ownerDocument.documentElement, this.tip)) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).appendTo(container);
      }

      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).trigger(this.constructor.Event.INSERTED);

      this._popper = new __WEBPACK_IMPORTED_MODULE_2_popper_js__["default"](this.element, tip, {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: Selector.ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this._handlePopperPlacementChange(data);
        }
      });

      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).addClass(ClassName.SHOW);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document.body).children().on('mouseover', null, __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.noop);
      }

      var complete = function complete() {
        if (_this.config.animation) {
          _this._fixTransition();
        }
        var prevHoverState = _this._hoverState;
        _this._hoverState = null;

        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(_this.element).trigger(_this.constructor.Event.SHOWN);

        if (prevHoverState === HoverState.OUT) {
          _this._leave(null, _this);
        }
      };

      if (__WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.tip).hasClass(ClassName.FADE)) {
        var transitionDuration = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].getTransitionDurationFromElement(this.tip);

        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.tip).one(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }
  };

  Tooltip.prototype.hide = function hide(callback) {
    var _this2 = this;

    var tip = this.getTipElement();
    var hideEvent = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.Event(this.constructor.Event.HIDE);
    var complete = function complete() {
      if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }

      _this2._cleanTipClass();
      _this2.element.removeAttribute('aria-describedby');
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
      if (_this2._popper !== null) {
        _this2._popper.destroy();
      }

      if (callback) {
        callback();
      }
    };

    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).trigger(hideEvent);

    if (hideEvent.isDefaultPrevented()) {
      return;
    }

    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).removeClass(ClassName.SHOW);

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document.body).children().off('mouseover', null, __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.noop);
    }

    this._activeTrigger[Trigger.CLICK] = false;
    this._activeTrigger[Trigger.FOCUS] = false;
    this._activeTrigger[Trigger.HOVER] = false;

    if (__WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.tip).hasClass(ClassName.FADE)) {
      var transitionDuration = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].getTransitionDurationFromElement(tip);

      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).one(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    } else {
      complete();
    }

    this._hoverState = '';
  };

  Tooltip.prototype.update = function update() {
    if (this._popper !== null) {
      this._popper.scheduleUpdate();
    }
  };

  // Protected

  Tooltip.prototype.isWithContent = function isWithContent() {
    return Boolean(this.getTitle());
  };

  Tooltip.prototype.addAttachmentClass = function addAttachmentClass(attachment) {
    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
  };

  Tooltip.prototype.getTipElement = function getTipElement() {
    this.tip = this.tip || __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.config.template)[0];
    return this.tip;
  };

  Tooltip.prototype.setContent = function setContent() {
    var tip = this.getTipElement();
    this.setElementContent(__WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
  };

  Tooltip.prototype.setElementContent = function setElementContent($element, content) {
    if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
      // Content is a DOM node or a jQuery
      if (this.config.html) {
        if (!__WEBPACK_IMPORTED_MODULE_1_jquery___default()(content).parent().is($element)) {
          $element.empty().append(content);
        }
      } else {
        $element.text(__WEBPACK_IMPORTED_MODULE_1_jquery___default()(content).text());
      }

      return;
    }

    if (this.config.html) {
      if (this.config.sanitize) {
        content = Object(__WEBPACK_IMPORTED_MODULE_0__tools_sanitizer__["b" /* sanitizeHtml */])(content, this.config.whiteList, this.config.sanitizeFn);
      }

      $element.html(content);
    } else {
      $element.text(content);
    }
  };

  Tooltip.prototype.getTitle = function getTitle() {
    var title = this.element.getAttribute('data-original-title');

    if (!title) {
      title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
    }

    return title;
  };

  // Private

  Tooltip.prototype._getOffset = function _getOffset() {
    var _this3 = this;

    var offset = {};

    if (typeof this.config.offset === 'function') {
      offset.fn = function (data) {
        data.offsets = _extends({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});

        return data;
      };
    } else {
      offset.offset = this.config.offset;
    }

    return offset;
  };

  Tooltip.prototype._getContainer = function _getContainer() {
    if (this.config.container === false) {
      return document.body;
    }

    if (__WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].isElement(this.config.container)) {
      return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.config.container);
    }

    return __WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).find(this.config.container);
  };

  Tooltip.prototype._getAttachment = function _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()];
  };

  Tooltip.prototype._setListeners = function _setListeners() {
    var _this4 = this;

    var triggers = this.config.trigger.split(' ');

    triggers.forEach(function (trigger) {
      if (trigger === 'click') {
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
          return _this4.toggle(event);
        });
      } else if (trigger !== Trigger.MANUAL) {
        var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
        var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;

        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(_this4.element).on(eventIn, _this4.config.selector, function (event) {
          return _this4._enter(event);
        }).on(eventOut, _this4.config.selector, function (event) {
          return _this4._leave(event);
        });
      }
    });

    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).closest('.modal').on('hide.bs.modal', function () {
      if (_this4.element) {
        _this4.hide();
      }
    });

    if (this.config.selector) {
      this.config = _extends({}, this.config, {
        trigger: 'manual',
        selector: ''
      });
    } else {
      this._fixTitle();
    }
  };

  Tooltip.prototype._fixTitle = function _fixTitle() {
    var titleType = _typeof(this.element.getAttribute('data-original-title'));

    if (this.element.getAttribute('title') || titleType !== 'string') {
      this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');

      this.element.setAttribute('title', '');
    }
  };

  Tooltip.prototype._enter = function _enter(event, context) {
    var dataKey = this.constructor.DATA_KEY;
    context = context || __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.currentTarget).data(dataKey);

    if (!context) {
      context = new this.constructor(event.currentTarget, this._getDelegateConfig());
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.currentTarget).data(dataKey, context);
    }

    if (event) {
      context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
    }

    if (__WEBPACK_IMPORTED_MODULE_1_jquery___default()(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
      context._hoverState = HoverState.SHOW;
      return;
    }

    clearTimeout(context._timeout);

    context._hoverState = HoverState.SHOW;

    if (!context.config.delay || !context.config.delay.show) {
      context.show();
      return;
    }

    context._timeout = setTimeout(function () {
      if (context._hoverState === HoverState.SHOW) {
        context.show();
      }
    }, context.config.delay.show);
  };

  Tooltip.prototype._leave = function _leave(event, context) {
    var dataKey = this.constructor.DATA_KEY;
    context = context || __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.currentTarget).data(dataKey);

    if (!context) {
      context = new this.constructor(event.currentTarget, this._getDelegateConfig());
      __WEBPACK_IMPORTED_MODULE_1_jquery___default()(event.currentTarget).data(dataKey, context);
    }

    if (event) {
      context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
    }

    if (context._isWithActiveTrigger()) {
      return;
    }

    clearTimeout(context._timeout);

    context._hoverState = HoverState.OUT;

    if (!context.config.delay || !context.config.delay.hide) {
      context.hide();
      return;
    }

    context._timeout = setTimeout(function () {
      if (context._hoverState === HoverState.OUT) {
        context.hide();
      }
    }, context.config.delay.hide);
  };

  Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
    for (var trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true;
      }
    }

    return false;
  };

  Tooltip.prototype._getConfig = function _getConfig(config) {
    var dataAttributes = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.element).data();

    Object.keys(dataAttributes).forEach(function (dataAttr) {
      if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
        delete dataAttributes[dataAttr];
      }
    });

    config = _extends({}, this.constructor.Default, dataAttributes, (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config ? config : {});

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }

    __WEBPACK_IMPORTED_MODULE_3__util__["a" /* default */].typeCheckConfig(NAME, config, this.constructor.DefaultType);

    if (config.sanitize) {
      config.template = Object(__WEBPACK_IMPORTED_MODULE_0__tools_sanitizer__["b" /* sanitizeHtml */])(config.template, config.whiteList, config.sanitizeFn);
    }

    return config;
  };

  Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
    var config = {};

    if (this.config) {
      for (var key in this.config) {
        if (this.constructor.Default[key] !== this.config[key]) {
          config[key] = this.config[key];
        }
      }
    }

    return config;
  };

  Tooltip.prototype._cleanTipClass = function _cleanTipClass() {
    var $tip = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this.getTipElement());
    var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
    if (tabClass !== null && tabClass.length) {
      $tip.removeClass(tabClass.join(''));
    }
  };

  Tooltip.prototype._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
    var popperInstance = popperData.instance;
    this.tip = popperInstance.popper;
    this._cleanTipClass();
    this.addAttachmentClass(this._getAttachment(popperData.placement));
  };

  Tooltip.prototype._fixTransition = function _fixTransition() {
    var tip = this.getTipElement();
    var initConfigAnimation = this.config.animation;

    if (tip.getAttribute('x-placement') !== null) {
      return;
    }

    __WEBPACK_IMPORTED_MODULE_1_jquery___default()(tip).removeClass(ClassName.FADE);
    this.config.animation = false;
    this.hide();
    this.show();
    this.config.animation = initConfigAnimation;
  };

  // Static

  Tooltip._jQueryInterface = function _jQueryInterface(config) {
    return this.each(function () {
      var data = __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).data(DATA_KEY);
      var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Tooltip(this, _config);
        __WEBPACK_IMPORTED_MODULE_1_jquery___default()(this).data(DATA_KEY, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError('No method named "' + config + '"');
        }
        data[config]();
      }
    });
  };

  _createClass(Tooltip, null, [{
    key: 'VERSION',
    get: function get() {
      return VERSION;
    }
  }, {
    key: 'Default',
    get: function get() {
      return Default;
    }
  }, {
    key: 'NAME',
    get: function get() {
      return NAME;
    }
  }, {
    key: 'DATA_KEY',
    get: function get() {
      return DATA_KEY;
    }
  }, {
    key: 'Event',
    get: function get() {
      return Event;
    }
  }, {
    key: 'EVENT_KEY',
    get: function get() {
      return EVENT_KEY;
    }
  }, {
    key: 'DefaultType',
    get: function get() {
      return DefaultType;
    }
  }]);

  return Tooltip;
}();

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.fn[NAME] = Tooltip._jQueryInterface;
__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.fn[NAME].Constructor = Tooltip;
__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.fn[NAME].noConflict = function () {
  __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.fn[NAME] = JQUERY_NO_CONFLICT;
  return Tooltip._jQueryInterface;
};

/* harmony default export */ __webpack_exports__["a"] = (Tooltip);

/***/ }),

/***/ "./node_modules/bootstrap/js/src/util.js":
/*!***********************************************!*\
  !*** ./node_modules/bootstrap/js/src/util.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */



/**
 * ------------------------------------------------------------------------
 * Private TransitionEnd Helpers
 * ------------------------------------------------------------------------
 */

var TRANSITION_END = 'transitionend';
var MAX_UID = 1000000;
var MILLISECONDS_MULTIPLIER = 1000;

// Shoutout AngusCroll (https://goo.gl/pxwQGp)
function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
}

function getSpecialTransitionEndEvent() {
  return {
    bindType: TRANSITION_END,
    delegateType: TRANSITION_END,
    handle: function handle(event) {
      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(event.target).is(this)) {
        return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
      }
      return undefined; // eslint-disable-line no-undefined
    }
  };
}

function transitionEndEmulator(duration) {
  var _this = this;

  var called = false;

  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).one(Util.TRANSITION_END, function () {
    called = true;
  });

  setTimeout(function () {
    if (!called) {
      Util.triggerTransitionEnd(_this);
    }
  }, duration);

  return this;
}

function setTransitionEndSupport() {
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fn.emulateTransitionEnd = transitionEndEmulator;
  __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
}

/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */

var Util = {

  TRANSITION_END: 'bsTransitionEnd',

  getUID: function getUID(prefix) {
    do {
      // eslint-disable-next-line no-bitwise
      prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
    } while (document.getElementById(prefix));
    return prefix;
  },
  getSelectorFromElement: function getSelectorFromElement(element) {
    var selector = element.getAttribute('data-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href');
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
    }

    try {
      return document.querySelector(selector) ? selector : null;
    } catch (err) {
      return null;
    }
  },
  getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    }

    // Get transition-duration of the element
    var transitionDuration = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).css('transition-duration');
    var transitionDelay = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).css('transition-delay');

    var floatTransitionDuration = parseFloat(transitionDuration);
    var floatTransitionDelay = parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];

    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  },
  reflow: function reflow(element) {
    return element.offsetHeight;
  },
  triggerTransitionEnd: function triggerTransitionEnd(element) {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).trigger(TRANSITION_END);
  },


  // TODO: Remove in v5
  supportsTransitionEnd: function supportsTransitionEnd() {
    return Boolean(TRANSITION_END);
  },
  isElement: function isElement(obj) {
    return (obj[0] || obj).nodeType;
  },
  typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
    for (var property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        var expectedTypes = configTypes[property];
        var value = config[property];
        var valueType = value && Util.isElement(value) ? 'element' : toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
        }
      }
    }
  },
  findShadowRoot: function findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null;
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      var root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null;
    }

    return Util.findShadowRoot(element.parentNode);
  }
};

setTransitionEndSupport();

/* harmony default export */ __webpack_exports__["a"] = (Util);

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var _Symbol = root.Symbol;

module.exports = _Symbol;

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = function () {
  function object() {}
  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

module.exports = baseCreate;

/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ "./node_modules/lodash/_baseMergeDeep.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js");

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function (srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;

/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPlainObject = __webpack_require__(/*! ./isPlainObject */ "./node_modules/lodash/isPlainObject.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js"),
    toPlainObject = __webpack_require__(/*! ./toPlainObject */ "./node_modules/lodash/toPlainObject.js");

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

module.exports = initCloneObject;

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

  return value === proto;
}

module.exports = isPrototype;

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

/***/ }),

/***/ "./node_modules/lodash/assign.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/assign.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function (object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

module.exports = constant;

/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function () {
    return arguments;
}()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

/***/ }),

/***/ "./node_modules/lodash/isString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isString.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}

module.exports = isString;

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

/***/ }),

/***/ "./node_modules/lodash/merge.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/merge.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(/*! ./_baseMerge */ "./node_modules/lodash/_baseMerge.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js");

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function (object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;

/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

module.exports = now;

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = toNumber;

/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

/***/ }),

/***/ "./node_modules/popper.js/dist/esm/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/popper.js/dist/esm/popper.js ***!
  \***************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js":
/*!*****************************************************************!*\
  !*** ./node_modules/smoothscroll-polyfill/dist/smoothscroll.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  // polyfill

  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (firstArg === null || (typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if ((typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      while (el !== d.body && isScrollable(el) === false) {
        el = el.parentNode || el.host;
      }

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset,
        // use top prop, second argument if present or fallback to scrollY
        arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
    };

    // w.scrollBy
    w.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : _typeof(arguments[0]) !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(this,
        // use left prop, first number argument or fallback to scrollLeft
        arguments[0].left !== undefined ? ~~arguments[0].left : _typeof(arguments[0]) !== 'object' ? ~~arguments[0] : this.scrollLeft,
        // use top prop, second argument or fallback to scrollTop
        arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function () {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function () {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {
    // global
    polyfill();
  }
})();

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "./resources/js/app/compact.js":
/*!*************************************!*\
  !*** ./resources/js/app/compact.js ***!
  \*************************************/
/*! exports provided: getInstance, init */
/*! exports used: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getInstance */
/* harmony export (immutable) */ __webpack_exports__["a"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_compactHeader__ = __webpack_require__(/*! ../modules/compactHeader */ "./resources/js/modules/compactHeader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);



var instance = null;

function getInstance() {
	if (!instance) {
		var header = document.querySelector(RS.Options.compactHeaderSelector);
		instance = new __WEBPACK_IMPORTED_MODULE_0__modules_compactHeader__["a" /* default */](header);
	} else {
		instance.resolveSelectors();
	}

	return instance;
}

function init() {
	var compactHeader = getInstance();

	// Fixing header
	if ((RS.Options || {}).fixingCompactHeader) {
		compactHeader.fixing();
	}

	// Toggle compact menu
	__WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).on('click', '[data-compact-menu-toggle]', function (event) {
		event.preventDefault();

		compactHeader.toggleMenu(this);
	});

	// Mobile search
	__WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).on('click', '[data-compact-search-open]', function (event) {
		event.preventDefault();

		compactHeader.revealMobileSearch();
	});

	__WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).on('click', '[data-compact-search-close]', function (event) {
		event.preventDefault();

		compactHeader.concealMobileSearch();
	});

	// $(window).resize(() => {
	// 	if (compactHeader.$search.hasClass('js-is-open')) {
	// 		compactHeader.concealMobileSearch();
	// 	}
	// });
}

/***/ }),

/***/ "./resources/js/app/init.js":
/*!**********************************!*\
  !*** ./resources/js/app/init.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inits_lazyimages__ = __webpack_require__(/*! ./inits/lazyimages */ "./resources/js/app/inits/lazyimages.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inits_sidebar__ = __webpack_require__(/*! ./inits/sidebar */ "./resources/js/app/inits/sidebar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__inits_sliders__ = __webpack_require__(/*! ./inits/sliders */ "./resources/js/app/inits/sliders.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inits_popovers__ = __webpack_require__(/*! ./inits/popovers */ "./resources/js/app/inits/popovers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__inits_timers__ = __webpack_require__(/*! ./inits/timers */ "./resources/js/app/inits/timers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__inits_dlMenu__ = __webpack_require__(/*! ./inits/dlMenu */ "./resources/js/app/inits/dlMenu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__inits_effects__ = __webpack_require__(/*! ./inits/effects */ "./resources/js/app/inits/effects.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__inits_links__ = __webpack_require__(/*! ./inits/links */ "./resources/js/app/inits/links.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__inits_navSlide__ = __webpack_require__(/*! ./inits/navSlide */ "./resources/js/app/inits/navSlide.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__inits_upButton__ = __webpack_require__(/*! ./inits/upButton */ "./resources/js/app/inits/upButton.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__inits_scrollbar__ = __webpack_require__(/*! ./inits/scrollbar */ "./resources/js/app/inits/scrollbar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_smoothscroll_polyfill__ = __webpack_require__(/*! smoothscroll-polyfill */ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_smoothscroll_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_smoothscroll_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__compact__ = __webpack_require__(/*! ./compact */ "./resources/js/app/compact.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__popup__ = __webpack_require__(/*! ./popup */ "./resources/js/app/popup.js");


















var AllModules = ['bmd', 'sidebar', 'sliders', 'popovers',
// 'timers',
'popup', 'lazy-images', 'compact-header', 'dl-menu', 'effects', 'links', 'nav-slide', 'upbutton'];

/* harmony default export */ __webpack_exports__["a"] = (function () {
	var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : AllModules;
	var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


	modules.forEach(function (module) {
		switch (module) {
			case 'bmd':
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(context).bootstrapMaterialDesign();
				break;

			case 'sidebar':
				Object(__WEBPACK_IMPORTED_MODULE_2__inits_sidebar__["a" /* default */])(context);
				break;

			case 'sliders':
				Object(__WEBPACK_IMPORTED_MODULE_3__inits_sliders__["a" /* default */])(context);
				break;

			case 'popovers':
				Object(__WEBPACK_IMPORTED_MODULE_4__inits_popovers__["a" /* default */])(context);
				break;

			case 'timers':
				Object(__WEBPACK_IMPORTED_MODULE_5__inits_timers__["a" /* default */])(context, options);
				break;

			case 'popup':
				Object(__WEBPACK_IMPORTED_MODULE_14__popup__["b" /* init */])(context);
				break;

			case 'lazy-images':
				Object(__WEBPACK_IMPORTED_MODULE_1__inits_lazyimages__["a" /* default */])(context);
				break;

			case 'compact-header':
				Object(__WEBPACK_IMPORTED_MODULE_13__compact__["a" /* init */])();
				break;

			case 'dl-menu':
				Object(__WEBPACK_IMPORTED_MODULE_6__inits_dlMenu__["a" /* default */])();
				break;

			case 'links':
				__WEBPACK_IMPORTED_MODULE_12_smoothscroll_polyfill___default.a.polyfill();
				Object(__WEBPACK_IMPORTED_MODULE_8__inits_links__["a" /* default */])(context);
				break;

			case 'effects':
				Object(__WEBPACK_IMPORTED_MODULE_7__inits_effects__["a" /* default */])();
				break;

			case 'nav-slide':
				Object(__WEBPACK_IMPORTED_MODULE_9__inits_navSlide__["a" /* default */])(context);
				break;

			case 'upbutton':
				Object(__WEBPACK_IMPORTED_MODULE_10__inits_upButton__["a" /* default */])(context);
				break;

			case 'scrollbar':
				Object(__WEBPACK_IMPORTED_MODULE_11__inits_scrollbar__["a" /* default */])(context);
				break;
		}
	});
});

/***/ }),

/***/ "./resources/js/app/inits/dlMenu.js":
/*!******************************************!*\
  !*** ./resources/js/app/inits/dlMenu.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_dlMenu__ = __webpack_require__(/*! ../../modules/dlMenu */ "./resources/js/modules/dlMenu.js");


/* harmony default export */ __webpack_exports__["a"] = (function () {

	new __WEBPACK_IMPORTED_MODULE_0__modules_dlMenu__["a" /* default */]($('.b-dl-menu'), {
		selectors: {
			parent: '.l-compact-menu'
		}
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/effects.js":
/*!*******************************************!*\
  !*** ./resources/js/app/inits/effects.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["a"] = (function () {

	// c-icon-count siblings
	$(document).on('mouseenter', '.c-icon-count', function () {
		var _this = this;

		$(this).velocity({
			opacity: 1
		}, {
			duration: 200
		});

		$(this).siblings('.c-icon-count').velocity('stop').velocity({
			opacity: 0.6
		}, {
			duration: 200
		});

		$(this).one('mouseleave', function () {

			$(_this).velocity({
				opacity: 1
			}, {
				duration: 200
			});

			$(_this).siblings('.c-icon-count').velocity({
				opacity: 1
			}, {
				duration: 200
			});
		});
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/lazyimages.js":
/*!**********************************************!*\
  !*** ./resources/js/app/inits/lazyimages.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["a"] = (function (context) {
	$(context).find('[data-lazy-img]').Lazy({
		effect: "fadeIn",
		effectTime: 300,

		afterLoad: function afterLoad($item) {
			$item.removeClass('lazy-anim-bg lazy-anim-img').removeAttr('data-lazy-img');
		}
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/links.js":
/*!*****************************************!*\
  !*** ./resources/js/app/inits/links.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


/* harmony default export */ __webpack_exports__["a"] = (function (context) {

	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(context).find('.js-link-scroll[href*="#"]:not([href="#"])').each(function (key, node) {
		node.addEventListener('click', function (e) {
			e.preventDefault();

			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var hash = this.href.replace(/[^#]*(.*)/, '$1'),
				    $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.hash);
				// element = document.getElementById(hash.slice(1));

				$target = $target.length ? $target : __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[name=' + this.hash.slice(1) + ']');

				if ($target.length) {
					var t = Math.round($target.offset().top);

					if (RS.Options.fixingCompactHeader == true) {
						var compactHeader = document.querySelector(RS.Options.compactHeaderSelector);
						if (compactHeader != undefined) {
							t += t < 0 ? -70 : -70;
						}
					}

					window.scroll({ top: t, behavior: 'smooth' });
					window.history.replaceState('', document.title, window.location.href.replace(location.hash, '') + this.hash);

					$target.click();
				}
			}
		}, false);
	});

	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(context).find('.js-link-up').each(function (key, node) {
		node.addEventListener('click', function (e) {
			e.preventDefault();

			window.scroll({ top: 0, behavior: 'smooth' });
		});
	});
});;

/***/ }),

/***/ "./resources/js/app/inits/navSlide.js":
/*!********************************************!*\
  !*** ./resources/js/app/inits/navSlide.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony default export */ __webpack_exports__["a"] = (function (context) {
	$(context).find('.nav-slide').each(function () {
		var $nav = $(this);
		var $line = $('<li>').addClass('nav-slide-line');
		var $currentActive = $nav.find('.active');
		var $items = $nav.find('.nav-item');

		var setActive = function setActive($item) {
			var $span = $item.children('span');

			$line.css({
				'width': $span.outerWidth(),
				'left': $span.position().left + $nav.scrollLeft()
			});
		};

		$nav.append($line);

		setActive($nav.find('.active'));

		$nav.find('.nav-link').on('mouseenter', function () {
			var $item = $(this);

			setActive($item);
		});

		$(this).on('mouseleave', function () {
			setActive($currentActive);
		});

		if ($nav.attr('role') == 'tablist') {
			$items.on('shown.bs.tab', function () {
				var $item = $(this).children('.nav-link');
				$currentActive = $item;

				setActive($currentActive);
			});
		} else {
			$items.find('.nav-link').on('click', function () {
				var $item = $(this);

				$currentActive.removeClass('active');
				$item.addClass('active');

				$currentActive = $item;
				setActive($currentActive);
			});
		}
	});

	$(context).find('.nav-wrap').each(function () {

		var $this = $(this),
		    $nav = $this.children('.nav');

		var $navScroll = $('<div/>', {
			'class': 'nav-scroll scroll-element'
		}).html('<div class="scroll-arrow scroll-arrow_less"><svg class="icon-svg"><use xlink:href="#svg-arrow-left"></use></svg></div>\
					<div class="scroll-arrow scroll-arrow_more"><svg class="icon-svg"><use xlink:href="#svg-arrow-right"></use></svg></div>\
					<div class="scroll-element_outer">\
						<div class="scroll-element_size"></div>\
						<div class="scroll-element_track"></div>\
						<div class="scroll-bar"></div>\
				</div>').appendTo($this);

		$nav.scrollbar({
			showArrows: true,
			scrollx: $navScroll,
			scrollStep: 200
		});
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/popovers.js":
/*!********************************************!*\
  !*** ./resources/js/app/inits/popovers.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__ = __webpack_require__(/*! ../../utils/parseOptions */ "./resources/js/utils/parseOptions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_popovers__ = __webpack_require__(/*! ../../modules/popovers */ "./resources/js/modules/popovers.js");



/* harmony default export */ __webpack_exports__["a"] = (function (context) {
	var popovers = {};
	$(context).find('[data-popover]').each(function (key, node) {
		var name = node.getAttribute('data-popover');
		var options = Object(__WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__["a" /* default */])(node.getAttribute('data-popover-options'));

		if (!name) {
			name = 'popover_' + Object.keys(app.popovers).length + 1;
		}
		popovers[name] = new __WEBPACK_IMPORTED_MODULE_1__modules_popovers__["a" /* default */](node, name, options);
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/scrollbar.js":
/*!*********************************************!*\
  !*** ./resources/js/app/inits/scrollbar.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_parseOptions__ = __webpack_require__(/*! ../../utils/parseOptions */ "./resources/js/utils/parseOptions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_assign__ = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_assign__);




/* harmony default export */ __webpack_exports__["a"] = (function (context) {
	var Default = {};
	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(context).find('[data-scrollbar]').each(function (key, node) {

		var options = Object(__WEBPACK_IMPORTED_MODULE_1__utils_parseOptions__["a" /* default */])(node.getAttribute('data-slider-options'));

		options = __WEBPACK_IMPORTED_MODULE_2_lodash_assign___default()({}, options);

		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(node).scrollbar(options);
	});
});

/***/ }),

/***/ "./resources/js/app/inits/sidebar.js":
/*!*******************************************!*\
  !*** ./resources/js/app/inits/sidebar.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__ = __webpack_require__(/*! ../../utils/parseOptions */ "./resources/js/utils/parseOptions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_stickySidebar__ = __webpack_require__(/*! ../../modules/stickySidebar */ "./resources/js/modules/stickySidebar.js");



/* harmony default export */ __webpack_exports__["a"] = (function (context) {
	$(context).find('[data-sticky-sidebar]').each(function (key, node) {
		var options = Object(__WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__["a" /* default */])(node.getAttribute('data-sticky-sidebar'));
		Object(__WEBPACK_IMPORTED_MODULE_1__modules_stickySidebar__["a" /* default */])(node, options);
	});

	// stickySidebar(document.querySelector('.l-main__inner-content'));
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/sliders.js":
/*!*******************************************!*\
  !*** ./resources/js/app/inits/sliders.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__ = __webpack_require__(/*! ../../utils/parseOptions */ "./resources/js/utils/parseOptions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_slider__ = __webpack_require__(/*! ../../modules/slider */ "./resources/js/modules/slider.js");



/* harmony default export */ __webpack_exports__["a"] = (function (context) {
	var sliders = {};
	$(context).find('[data-slider]').each(function (key, node) {
		var name = node.getAttribute('data-slider');
		var options = Object(__WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__["a" /* default */])(node.getAttribute('data-slider-options'));

		if (!name) {
			name = 'slider_' + Object.keys(app.sliders).length + 1;
		}
		sliders[name] = new __WEBPACK_IMPORTED_MODULE_1__modules_slider__["a" /* default */](node, name, options);
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/timers.js":
/*!******************************************!*\
  !*** ./resources/js/app/inits/timers.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__ = __webpack_require__(/*! ../../utils/parseOptions */ "./resources/js/utils/parseOptions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_timer__ = __webpack_require__(/*! ../../modules/timer */ "./resources/js/modules/timer.js");



/* harmony default export */ __webpack_exports__["a"] = (function (context, options) {
	var timers = {};
	$(context).find('[data-timer]').each(function (key, node) {
		var name = node.getAttribute('data-timer');

		if ($.isEmptyObject(options)) {
			options = Object(__WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__["a" /* default */])(node.getAttribute('data-options'));
		}

		if (!name) {
			name = 'timer_' + Object.keys(app.timers).length + 1;
		}

		var $node = $(node),
		    data = $node.data('redsign.timer');

		if (!data) {
			timers[name] = new __WEBPACK_IMPORTED_MODULE_1__modules_timer__["a" /* default */](node, name, options);
			$node.data('redsign.timer', timers[name]);
		} else {
			data.setup(options);
		}
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/inits/upButton.js":
/*!********************************************!*\
  !*** ./resources/js/app/inits/upButton.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_FloatButton__ = __webpack_require__(/*! ../../modules/FloatButton */ "./resources/js/modules/FloatButton.js");


/* harmony default export */ __webpack_exports__["a"] = (function (context) {
	var _this = this;

	$(context).find('[data-float-button]').each(function (key, node) {

		new __WEBPACK_IMPORTED_MODULE_0__modules_FloatButton__["a" /* default */]({
			button: _this
		});
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/app/panel/BottomPanel.js":
/*!***********************************************!*\
  !*** ./resources/js/app/panel/BottomPanel.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PositionPanel__ = __webpack_require__(/*! ./PositionPanel */ "./resources/js/app/panel/PositionPanel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_dragResize_js__ = __webpack_require__(/*! ../../utils/dragResize.js */ "./resources/js/utils/dragResize.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var STORAGE_KEY = 'bottom_panel_inner_height';

var getSavedHeight = function getSavedHeight() {
	return parseInt(localStorage.getItem(STORAGE_KEY)) || __WEBPACK_IMPORTED_MODULE_2__utils_dragResize_js__["a" /* MIN_HEIGHT */];
};
var saveHeight = function saveHeight(height) {
	localStorage.setItem(STORAGE_KEY, height);
};

var BottomPanel = function (_PositionPanel) {
	_inherits(BottomPanel, _PositionPanel);

	function BottomPanel(panel) {
		_classCallCheck(this, BottomPanel);

		var _this = _possibleConstructorReturn(this, _PositionPanel.call(this, panel));

		var container = _this.$container.get(0);
		var dragArea = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#bottom-panel-drag-area').get(0);

		Object(__WEBPACK_IMPORTED_MODULE_2__utils_dragResize_js__["b" /* default */])({
			dragArea: dragArea,
			container: container,
			onResize: function onResize(height) {
				return _this.onResizeContainer(height);
			}
		});

		var $wrapEl = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>').css('height', _this.$panel.height());
		_this.$panel.wrap($wrapEl);
		return _this;
	}

	BottomPanel.prototype.onResizeContainer = function onResizeContainer(height) {
		this.$container.css('height', height);
		saveHeight(height);
	};

	BottomPanel.prototype.open = function open() {
		var link = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;


		this.$panel.addClass('is-open');

		this.$container.css({
			height: getSavedHeight(),
			bottom: -getSavedHeight()
		}).velocity({
			bottom: 0
		}, {
			duration: 300
		});

		return _PositionPanel.prototype.open.call(this, link);
	};

	BottomPanel.prototype.close = function close() {
		var _this2 = this;

		var d = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Deferred();

		this.$container.velocity({
			bottom: -getSavedHeight()
		}, {
			duration: 300,
			complete: function complete() {
				_this2.$panel.removeClass('is-open');

				_this2.$container.css({
					height: 0,
					bottom: 0
				});

				d.resolve();
			}
		});

		return d.promise().pipe(function () {
			return _PositionPanel.prototype.close.call(_this2);
		});
	};

	BottomPanel.prototype.showPreload = function showPreload($container) {
		this.$preload = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>').addClass('panel-loader').append('<span></span><span></span><span></span><span></span>');

		this.$inner.append(this.$preload);
	};

	BottomPanel.prototype.hidePreload = function hidePreload() {
		if (this.$preload) {
			this.$preload.remove();
		}
	};

	BottomPanel.prototype.show = function show(block) {
		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(block).addClass('is-showed');

		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(block).addClass('is-showed');
		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).trigger('panel.showed');
		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(block).velocity({ opacity: 1 }, { duration: 300 });
	};

	BottomPanel.prototype.hide = function hide() {

		this.$inner.children('.panel-block').removeClass('is-showed').css('opacity', 0);

		return true;
	};

	_createClass(BottomPanel, [{
		key: 'type',
		get: function get() {
			return 'bottom';
		}
	}, {
		key: '$panel',
		get: function get() {
			return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#bottom-panel');
		}
	}, {
		key: '$inner',
		get: function get() {
			if (!this.$innerObj) {
				this.$innerObj = this.$panel.find('#bottom-panel-inner');
			}

			return this.$innerObj;
		}
	}, {
		key: '$container',
		get: function get() {
			return this.$panel.find('#bottom-panel-container');
		}
	}]);

	return BottomPanel;
}(__WEBPACK_IMPORTED_MODULE_1__PositionPanel__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (BottomPanel);

/***/ }),

/***/ "./resources/js/app/panel/PositionPanel.js":
/*!*************************************************!*\
  !*** ./resources/js/app/panel/PositionPanel.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_overlay__ = __webpack_require__(/*! ../../utils/overlay */ "./resources/js/utils/overlay.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var PositionPanel = function () {
	function PositionPanel(panel) {
		_classCallCheck(this, PositionPanel);

		this.panel = panel;
		this.blocks = {};

		this.$preload = undefined;
	}

	PositionPanel.prototype.createBlock = function createBlock() {
		var link = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
		var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

		var url = link.getAttribute('data-src') || link.href;

		var block = document.createElement('div');
		block.classList.add('panel-block');

		if (link.title || link.innerText) {
			var blockTitlte = document.createElement('div');
			blockTitlte.classList.add('panel-block__title');

			var title = link.title || link.innerText;
			blockTitlte.innerText = title;

			block.appendChild(blockTitlte);
		}

		var blockContent = document.createElement('div');
		blockContent.classList.add('panel-block__content');
		blockContent.innerHTML = content;

		block.appendChild(blockContent);

		this.blocks[url] = block;

		this.$inner.append(block);

		return block;
	};

	PositionPanel.prototype.updateBlock = function updateBlock() {
		var link = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
		var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

		var url = link.getAttribute('data-src') || link.href;

		var block = this.blocks[url];
		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(block).find('.panel-block__content').html(content);

		return block;
	};

	PositionPanel.prototype.update = function update() {
		var _this = this;

		var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		var d = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Deferred();

		if (!this.blocks[url]) {
			d.reject();
			return d.promise();
		}

		this.panel.load(url).then(function (content) {
			var block = _this.blocks[url];
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(block).find('.panel-block__content').html(content);

			d.resolve();
		});

		return d;
	};

	PositionPanel.prototype.open = function open() {
		var _this2 = this;

		var link = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		var d = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Deferred();
		var url = link.getAttribute('data-src') || link.href;

		var afterFn = function afterFn() {
			_this2.hidePreload();
			link.setAttribute('data-need-reload', 'N');
			d.resolve(_this2.blocks[url]);

			_this2.$panel.addClass('is-open');
		};

		if (this.blocks[url]) {

			var block = this.blocks[url];

			var needCache = link.getAttribute('data-need-cache') == 'Y';
			var needReload = link.getAttribute('data-need-reload') == 'Y';

			if (!needCache || needCache && needReload) {

				Object(__WEBPACK_IMPORTED_MODULE_1__utils_overlay__["b" /* show */])().then(function ($overlay) {
					_this2.showPreload($overlay);

					_this2.panel.load(url).then(function (content) {
						var block = _this2.updateBlock(link, content);
						return _this2.show(block);
					}).then(function () {
						return afterFn();
					});
				});
			} else {

				Object(__WEBPACK_IMPORTED_MODULE_1__utils_overlay__["b" /* show */])();
				this.show(block);
				afterFn();
			}
		} else {

			Object(__WEBPACK_IMPORTED_MODULE_1__utils_overlay__["b" /* show */])().then(function ($overlay) {
				_this2.showPreload($overlay);

				_this2.panel.load(url).then(function (content) {
					var block = _this2.createBlock(link, content);
					return _this2.show(block);
				}).then(function () {
					return afterFn();
				});
			});
		}

		d.then(function () {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('click.outside', function (e) {
				if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target) != _this2.$inner && !!!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).closest(_this2.$panel).length && __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).closest(document).length > 0) {
					_this2.panel.close();
				}
			});
		});

		return d.promise();
	};

	PositionPanel.prototype.close = function close() {
		var _this3 = this;

		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).off('click.outside');

		return __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.when(this.hide(), this.hidePreload(), Object(__WEBPACK_IMPORTED_MODULE_1__utils_overlay__["a" /* hide */])()).then(function () {
			_this3.$panel.removeClass('is-open');

			return true;
		});
	};

	return PositionPanel;
}();

/* harmony default export */ __webpack_exports__["a"] = (PositionPanel);

/***/ }),

/***/ "./resources/js/app/panel/RightPanel.js":
/*!**********************************************!*\
  !*** ./resources/js/app/panel/RightPanel.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PositionPanel__ = __webpack_require__(/*! ./PositionPanel */ "./resources/js/app/panel/PositionPanel.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var RightPanel = function (_PositionPanel) {
	_inherits(RightPanel, _PositionPanel);

	function RightPanel() {
		_classCallCheck(this, RightPanel);

		return _possibleConstructorReturn(this, _PositionPanel.apply(this, arguments));
	}

	RightPanel.prototype.showPreload = function showPreload($container) {
		if ($container && $container.length) {

			this.$preload = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>').addClass('panel-loader').append('<span></span><span></span><span></span><span></span>');

			$container.append(this.$preload);
		}
	};

	RightPanel.prototype.hidePreload = function hidePreload() {
		if (this.$preload) {
			this.$preload.remove();
		}
	};

	RightPanel.prototype.getInnerWidth = function getInnerWidth(block) {
		var $block = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(block);
		var $blockClone = $block.clone();

		var innerWidth = void 0;

		$blockClone.css({
			position: 'absolute',
			visibility: 'hidden',
			left: '-99999px',
			top: '-99999px',
			display: 'block'
		});

		__WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').append($blockClone);
		innerWidth = $blockClone.outerWidth() > 500 ? $blockClone.outerWidth() : 500;

		if (innerWidth > __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).width()) {
			innerWidth = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).width() - 60;
		}

		return innerWidth;
	};

	RightPanel.prototype.show = function show(block) {
		__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).trigger('panel.show');

		var blockWidth = this.getInnerWidth(block);

		var AnimationComplete = function AnimationComplete() {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(block).addClass('is-showed');

			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).trigger('panel.showed');

			setTimeout(function () {
				__WEBPACK_IMPORTED_MODULE_0_jquery___default()(block).velocity({ opacity: 1 }, { duration: 300 });
			}, 100);
		};

		var $controls = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.side-panel__controls');
		this.$panel.append($controls.clone());
		this.$inner.append($controls);

		this.$inner.css({
			width: blockWidth,
			right: -blockWidth
		}).velocity({
			right: 0
		}, {
			duration: 300,
			easing: [.17, .67, .83, .67],
			complete: AnimationComplete
		});
	};

	RightPanel.prototype.hide = function hide() {
		var _this2 = this;

		var d = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Deferred();

		var $inner = this.$inner;
		var blockWidth = $inner.outerWidth();

		$inner.velocity({
			right: -blockWidth
		}, {
			duration: 300,
			complete: function complete() {
				var $controls = _this2.$inner.find('.side-panel__controls');

				_this2.$panel.children('.side-panel__controls').remove();
				_this2.$panel.append($controls);

				$inner.children('.panel-block').removeClass('is-showed').css('opacity', 0);

				d.resolve();
			}
		});

		return d.promise();
	};

	_createClass(RightPanel, [{
		key: 'type',
		get: function get() {
			return 'right';
		}
	}, {
		key: '$panel',
		get: function get() {
			return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#side-panel');
		}
	}, {
		key: '$inner',
		get: function get() {
			if (!this.$innerObj) {
				this.$innerObj = this.$panel.find('#side-panel-inner');
			}

			return this.$innerObj;
		}
	}, {
		key: '$container',
		get: function get() {
			return this.$panel.find('#side-panel-container');
		}
	}]);

	return RightPanel;
}(__WEBPACK_IMPORTED_MODULE_1__PositionPanel__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (RightPanel);

/***/ }),

/***/ "./resources/js/app/popup.js":
/*!***********************************!*\
  !*** ./resources/js/app/popup.js ***!
  \***********************************/
/*! exports provided: windowPopupOptions, init, default */
/*! exports used: default, init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export windowPopupOptions */
/* harmony export (immutable) */ __webpack_exports__["b"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__ = __webpack_require__(/*! ../utils/parseOptions */ "./resources/js/utils/parseOptions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__init__ = __webpack_require__(/*! ./init */ "./resources/js/app/init.js");





var windowPopupOptions = {
	infobar: false,
	buttons: false,
	slideShow: false,
	fullScreen: false,
	animationEffect: "slide-down-in",
	animationDuration: 300,
	thumbs: false,
	//modal: true,
	ajax: {
		settings: {
			cache: true,
			data: {
				cache: true,
				fancybox: true
			}
		}
	},
	touch: false,
	keyboard: true,
	btnTpl: {
		smallBtn: ''
	},
	baseTpl: '<div class="fancybox-container popup-form" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-stage"></div>' + '</div>' + '</div>',
	beforeLoad: function beforeLoad(instance, slide, b) {

		var scrollbarWidth = __WEBPACK_IMPORTED_MODULE_2_jquery___default.a.fancybox.scrollbarWidth;

		__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.l-page').addClass('filter-blur');

		if (RS.Panel && RS.Panel.openned) {
			RS.Panel.close();
		}
	},
	afterLoad: function afterLoad(instance, slide) {

		var obContent = slide.$content.get(0),
		    data = BX.parseJSON(obContent.innerHTML);

		if (data) {
			var pageAssets = BX.processHTML(data.JS);

			if (pageAssets.STYLE.length > 0) {
				BX.loadCSS(pageAssets.STYLE);
			}

			if (pageAssets.SCRIPT) {
				var processed = BX.processHTML(data.DATA, false);

				obContent.innerHTML = processed.HTML;

				BX.ajax.processScripts(pageAssets.SCRIPT, false, BX.proxy(function () {
					BX.ajax.processScripts(processed.SCRIPT);
				}, this));
			}
		}

		if (RS.Init) {
			RS.Init(['bmd', 'popup', 'nav-slide', 'scrollbar'], this.$content);
		}

		this.$content.wrapAll('<div>');

		var $wrapper = this.$content.parent();
		$wrapper.prepend('<button data-fancybox-close class="fancybox-close-small"><svg class="icon-svg text-secondary"><use xlink:href="#svg-close"></use></svg></button>');

		if (slide.opts.$orig.data('fancybox-title') !== false) {
			var title = !!slide.opts.title && slide.opts.title.length ? slide.opts.title : !!instance.opts.title && instance.opts.title.length ? instance.opts.title : !!slide.opts.$orig ? slide.opts.$orig.data('fancybox-title') || slide.opts.$orig.attr('title') || this.opts.$orig.text() : undefined;

			if (title !== undefined) {
				this.$content.parent().prepend('<div class="fancybox-title fancybox-title-inside-wrap">' + title + '</div>');
			}
		}
	},

	afterShow: function afterShow(instance, slide) {},

	beforeClose: function beforeClose() {
		__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.l-page').removeClass('filter-blur');
	},

	afterClose: function afterClose(instance) {

		setTimeout(function () {
			__WEBPACK_IMPORTED_MODULE_2_jquery___default()('.js-fix-scroll').removeClass('js-fix-scroll--fixed');
		});
	}
};

var fullscreenPopupOptions = __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default()({}, windowPopupOptions, {
	slideClass: "fullscreen",
	animationEffect: 'zoom-in-out',

	spinnerTpl: '<div><div class="fancybox-loading"></div></div>',

	ajax: {
		settings: {
			cache: true,
			data: {
				cache: true,
				fancybox: true,
				fancyboxFullscreen: true
			}
		}
	},

	afterLoad: function afterLoad(instance, slide) {
		this.$content.wrapAll('<div>');

		var $wrapper = this.$content.parent();
		$wrapper.prepend('<button data-fancybox-close class="fancybox-close-small"><svg class="icon-svg text-secondary"><use xlink:href="#svg-close"></use></svg></button>');
	}
});

function init(context) {
	/* TODO: не инициализировать повторно */
	__WEBPACK_IMPORTED_MODULE_2_jquery___default()(context).find('[data-type="ajax"],[data-fancybox][data-type="inline"]').each(function () {
		var options = Object(__WEBPACK_IMPORTED_MODULE_0__utils_parseOptions__["a" /* default */])(this.getAttribute('data-popup-options'));
		var popupType = (RS.Options || {}).defaultPopupType;

		if (this.getAttribute('data-popup-type')) {
			popupType = this.getAttribute('data-popup-type');
		}

		var openPanel = function openPanel(link, type) {
			__WEBPACK_IMPORTED_MODULE_2_jquery___default()(link).click(function (e) {
				e.preventDefault();

				var activeItem = function activeItem() {
					link.classList.add('is-active');

					__WEBPACK_IMPORTED_MODULE_2_jquery___default()(document).one('panel.closed', function () {
						link.classList.remove('is-active');
					});
				};

				if (!link.classList.contains('is-active')) {
					if (RS.Panel.openned) {
						__WEBPACK_IMPORTED_MODULE_2_jquery___default()(document).one('panel.before_open', function () {
							activeItem();
						});
					} else {
						activeItem();
					}

					RS.Panel.open(link, type).then(function (content) {
						if (RS.Init) {
							RS.Init(['bmd', 'popup'], content);
						}
					});
				} else {
					RS.Panel.close(link);
				}
			});
		};

		switch (popupType) {

			case 'side':
				openPanel(this, 'right');
				break;

			case 'fullscreen':
				options = __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default()({}, fullscreenPopupOptions, options);
				__WEBPACK_IMPORTED_MODULE_2_jquery___default()(this).fancybox(options);

				break;

			case 'bottom':
				openPanel(this, 'bottom');
				break;

			case 'window':
			default:
				options = __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default()({}, windowPopupOptions, options);
				__WEBPACK_IMPORTED_MODULE_2_jquery___default()(this).fancybox(options);

				break;
		}
	});
}

/* harmony default export */ __webpack_exports__["a"] = (function () {
	var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'window';
	var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


	switch (type) {
		case 'window':
		default:
			options = __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default()({}, windowPopupOptions, options);

			__WEBPACK_IMPORTED_MODULE_2_jquery___default.a.fancybox.open(content, options);

			break;
	}
});

/***/ }),

/***/ "./resources/js/events.js":
/*!********************************!*\
  !*** ./resources/js/events.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


function onReady() {
	// prevent sidebar menu item click event
	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('click', '.js-smenu-item__toggle', function (e) {
		e.preventDefault();
	});

	// reload page after city change
	BX.addCustomEvent('rs.location_change', function (result) {
		if (result.redirect != undefined) {
			window.location.href = result.redirect;
		} else {
			BX.reload();
		}
	});

	// Fix work of fancybox
	var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('beforeLoad.fb', function (e, instance, slide) {
		__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.side-panel-controls').css('margin-right', scrollbarWidth);
		__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.js-fix-scroll').addClass('js-fix-scroll--fixed').css('padding-right', scrollbarWidth);
	});

	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('afterClose.fb', function (e, instance, slide) {
		if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.fancybox.getInstance()) {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.side-panel-controls').css('margin-right', 0);

			__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.js-fix-scroll').removeClass('js-fix-scroll--fixed').css('padding-right', 0);
		}
	});

	// accordions fix
	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('show.bs.collapse', '.collapse', function () {
		var $card = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).closest('.card');

		$card.addClass('card-active');
	});

	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('hidden.bs.collapse', '.collapse', function () {
		var $card = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).closest('.card');

		$card.removeClass('card-active');
	});

	// Update captcha code
	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).on('click', '[data-captcha-update-code]', function (e) {
		e.preventDefault();

		var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
		var $form = $el.closest('form');
		if (!$form.length) {
			retirn;
		}
		__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.getJSON(RS.Options.siteDir + 'ajax/captcha.php', function (res) {
			var $img = $form.find('img[src*="/bitrix/tools/captcha.php"]');
			$img.attr('src', res.src);

			var $captchaSid = $form.find('input[name="captcha_sid"]');
			$captchaSid.val(res.code);
		});
	});
}

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).ready(onReady);

/***/ }),

/***/ "./resources/js/global.js":
/*!********************************!*\
  !*** ./resources/js/global.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vendor_ResizeSensor__ = __webpack_require__(/*! ../vendor/ResizeSensor */ "./resources/vendor/ResizeSensor.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vendor_ResizeSensor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vendor_ResizeSensor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_init_js__ = __webpack_require__(/*! ./app/init.js */ "./resources/js/app/init.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_isDesktop__ = __webpack_require__(/*! ./utils/isDesktop */ "./resources/js/utils/isDesktop.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_imageInCache__ = __webpack_require__(/*! ./utils/imageInCache */ "./resources/js/utils/imageInCache.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_overlay__ = __webpack_require__(/*! ./utils/overlay */ "./resources/js/utils/overlay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__panel__ = __webpack_require__(/*! ./panel */ "./resources/js/panel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_popup__ = __webpack_require__(/*! ./app/popup */ "./resources/js/app/popup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_jquery_setHtmlByUrl_js__ = __webpack_require__(/*! ./modules/jquery.setHtmlByUrl.js */ "./resources/js/modules/jquery.setHtmlByUrl.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_jquery_setHtmlByUrl_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__modules_jquery_setHtmlByUrl_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_bootstrap__ = __webpack_require__(/*! ./modules/bootstrap */ "./resources/js/modules/bootstrap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modules_readmore__ = __webpack_require__(/*! ./modules/readmore */ "./resources/js/modules/readmore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modules_readmore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__modules_readmore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_velocity__ = __webpack_require__(/*! ./modules/velocity */ "./resources/js/modules/velocity.js");










global.$ = global.jQuery = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a;



// import 'owl.carousel';
// import 'jquery-lazy';




global.RS = global.RS || {};
__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()(global.RS, {
	Init: __WEBPACK_IMPORTED_MODULE_3__app_init_js__["a" /* default */],
	Animations: {},
	EventHandlers: {},
	Utils: {
		ResizeSensor: __WEBPACK_IMPORTED_MODULE_2__vendor_ResizeSensor___default.a,
		isDesktop: __WEBPACK_IMPORTED_MODULE_4__utils_isDesktop__["a" /* default */],
		imageInCache: __WEBPACK_IMPORTED_MODULE_5__utils_imageInCache__["a" /* default */],
		popup: __WEBPACK_IMPORTED_MODULE_8__app_popup__["a" /* default */],
		overlay: {
			show: __WEBPACK_IMPORTED_MODULE_6__utils_overlay__["b" /* show */],
			hide: __WEBPACK_IMPORTED_MODULE_6__utils_overlay__["a" /* hide */]
		}
	}
});

__WEBPACK_IMPORTED_MODULE_1_jquery___default()(document).ready(function () {
	var panel = new __WEBPACK_IMPORTED_MODULE_7__panel__["a" /* default */]();

	__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()(global.RS, {
		Panel: panel
	});
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_init__ = __webpack_require__(/*! ./app/init */ "./resources/js/app/init.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global__ = __webpack_require__(/*! ./global */ "./resources/js/global.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events__ = __webpack_require__(/*! ./events */ "./resources/js/events.js");






// page on ready
function onReady() {
	Object(__WEBPACK_IMPORTED_MODULE_1__app_init__["a" /* default */])();
}

// composite data recieved
function onFrameDataReceived() {
	var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	if (!(json.dynamicBlocks || []).length) {
		return;
	}

	json.dynamicBlocks.forEach(function (block, index) {
		Object(__WEBPACK_IMPORTED_MODULE_1__app_init__["a" /* default */])([], document.querySelector(block.ID));
	});
}

__WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).ready(onReady);
if (window.frameCacheVars !== undefined) {
	BX.addCustomEvent("onFrameDataReceived", function (json) {
		return onFrameDataReceived(json);
	});
}

/***/ }),

/***/ "./resources/js/modules/FloatButton.js":
/*!*********************************************!*\
  !*** ./resources/js/modules/FloatButton.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_debounce__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_isDesktop__ = __webpack_require__(/*! ../utils/isDesktop */ "./resources/js/utils/isDesktop.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var FloatButton = function ($) {

	var Default = {
		button: '[data-float-button]',

		buttonOffset: 32,

		showClass: 'showed',
		unfixedClass: 'unfixed'
	};

	var FloatButton = function () {
		function FloatButton(options) {
			_classCallCheck(this, FloatButton);

			this.options = __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default()({}, Default, options);

			this.init();
		}

		FloatButton.prototype.init = function init() {
			this.findDomElements();
			this.initEvents();
		};

		FloatButton.prototype.findDomElements = function findDomElements() {
			this.$button = $(this.options.button);
			this.$parent = this.$button.parent();
		};

		FloatButton.prototype.initEvents = function initEvents() {
			var _this = this;

			var onScroll = function onScroll() {
				return _this.onScroll();
			};

			if (Object(__WEBPACK_IMPORTED_MODULE_3__utils_isDesktop__["a" /* default */])()) {
				$(window).scroll(onScroll);
			}

			$(window).resize(__WEBPACK_IMPORTED_MODULE_2_lodash_debounce___default()(function () {

				$(window).off('scroll', onScroll);

				if (Object(__WEBPACK_IMPORTED_MODULE_3__utils_isDesktop__["a" /* default */])()) {
					if (_this.$button.hasClass(_this.options.unfixedClass)) {

						var buttonStyles = {
							position: 'fixed',
							top: 'auto'
						};

						_this.$button.removeClass(_this.options.unfixedClass).css(buttonStyles);
					}

					$(window).scroll(onScroll);
				}
			}));
		};

		FloatButton.prototype.checkShow = function checkShow() {
			var scrollTop = $(window).scrollTop();
			var windowHeight = $(window).outerHeight();

			if (scrollTop > windowHeight) {
				if (!this.$button.hasClass(this.options.showClass)) {
					this.$button.addClass(this.options.showClass);
				}

				return true;
			} else {
				if (this.$button.hasClass(this.options.showClass)) {
					this.$button.removeClass(this.options.showClass);
				}

				return false;
			}
		};

		FloatButton.prototype.toggleFixing = function toggleFixing() {
			if (this.$button.hasClass(this.options.unfixedClass)) {
				var scrollTop = $(window).scrollTop();
				var windowHeight = $(window).outerHeight();
				var parentOffset = this.$parent.offset().top;

				if (scrollTop + windowHeight < parentOffset) {
					var buttonStyles = {
						position: 'fixed',
						top: 'auto'
					};

					this.$button.removeClass(this.options.unfixedClass).css(buttonStyles);
				}
			} else {
				var buttonOffset = this.$button.offset().top;
				var buttonHeight = this.$button.height();
				var _parentOffset = this.$parent.offset().top;

				if (buttonOffset + buttonHeight + this.options.buttonOffset >= _parentOffset) {
					var _buttonStyles = {
						position: 'absolute',
						top: _parentOffset - buttonHeight - this.options.buttonOffset
					};

					this.$button.addClass(this.options.unfixedClass).css(_buttonStyles);
				}
			}
		};

		FloatButton.prototype.onScroll = function onScroll() {

			if (this.checkShow()) {
				this.toggleFixing();
			}
		};

		return FloatButton;
	}();

	return FloatButton;
}(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

/* harmony default export */ __webpack_exports__["a"] = (FloatButton);

/***/ }),

/***/ "./resources/js/modules/bootstrap.js":
/*!*******************************************!*\
  !*** ./resources/js/modules/bootstrap.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bootstrap_js_src_util__ = __webpack_require__(/*! bootstrap/js/src/util */ "./node_modules/bootstrap/js/src/util.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bootstrap_js_src_alert__ = __webpack_require__(/*! bootstrap/js/src/alert */ "./node_modules/bootstrap/js/src/alert.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bootstrap_js_src_button__ = __webpack_require__(/*! bootstrap/js/src/button */ "./node_modules/bootstrap/js/src/button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bootstrap_js_src_carousel__ = __webpack_require__(/*! bootstrap/js/src/carousel */ "./node_modules/bootstrap/js/src/carousel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bootstrap_js_src_collapse__ = __webpack_require__(/*! bootstrap/js/src/collapse */ "./node_modules/bootstrap/js/src/collapse.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bootstrap_js_src_modal__ = __webpack_require__(/*! bootstrap/js/src/modal */ "./node_modules/bootstrap/js/src/modal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_bootstrap_js_src_popover__ = __webpack_require__(/*! bootstrap/js/src/popover */ "./node_modules/bootstrap/js/src/popover.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bootstrap_js_src_scrollspy__ = __webpack_require__(/*! bootstrap/js/src/scrollspy */ "./node_modules/bootstrap/js/src/scrollspy.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_bootstrap_js_src_tab__ = __webpack_require__(/*! bootstrap/js/src/tab */ "./node_modules/bootstrap/js/src/tab.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_bootstrap_js_src_tooltip__ = __webpack_require__(/*! bootstrap/js/src/tooltip */ "./node_modules/bootstrap/js/src/tooltip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_bootstrap_material_design_js_dropdown__ = __webpack_require__(/*! bootstrap-material-design/js/dropdown */ "./node_modules/bootstrap-material-design/js/dropdown.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_bootstrap_material_design_js_ripples__ = __webpack_require__(/*! bootstrap-material-design/js/ripples */ "./node_modules/bootstrap-material-design/js/ripples.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_bootstrap_material_design_js_text__ = __webpack_require__(/*! bootstrap-material-design/js/text */ "./node_modules/bootstrap-material-design/js/text.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_bootstrap_material_design_js_textarea__ = __webpack_require__(/*! bootstrap-material-design/js/textarea */ "./node_modules/bootstrap-material-design/js/textarea.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_bootstrap_material_design_js_select__ = __webpack_require__(/*! bootstrap-material-design/js/select */ "./node_modules/bootstrap-material-design/js/select.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_bootstrap_material_design_js_radio__ = __webpack_require__(/*! bootstrap-material-design/js/radio */ "./node_modules/bootstrap-material-design/js/radio.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_bootstrap_material_design_js_radioInline__ = __webpack_require__(/*! bootstrap-material-design/js/radioInline */ "./node_modules/bootstrap-material-design/js/radioInline.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_bootstrap_material_design_js_checkbox__ = __webpack_require__(/*! bootstrap-material-design/js/checkbox */ "./node_modules/bootstrap-material-design/js/checkbox.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_bootstrap_material_design_js_checkboxInline__ = __webpack_require__(/*! bootstrap-material-design/js/checkboxInline */ "./node_modules/bootstrap-material-design/js/checkboxInline.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__bootstrapMaterialDesign__ = __webpack_require__(/*! ./bootstrapMaterialDesign */ "./resources/js/modules/bootstrapMaterialDesign.js");
// Bootstrap components











// Bootstrap Material Design components













/***/ }),

/***/ "./resources/js/modules/bootstrapMaterialDesign.js":
/*!*********************************************************!*\
  !*** ./resources/js/modules/bootstrapMaterialDesign.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Popper, jQuery) {function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* globals Popper */
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

/**
 * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
 *  used in Material Design for Bootstrap.  You may pass overrides to the configurations
 *  which will be passed into each component, or you may omit use of this class and
 *  configure each component separately.
 */
var BootstrapMaterialDesign = function ($) {
	/**
  * ------------------------------------------------------------------------
  * Constants
  * ------------------------------------------------------------------------
  */
	var NAME = "bootstrapMaterialDesign";
	var DATA_KEY = "bmd." + NAME;
	var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
	var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

	/**
  * Global configuration:
  *  The global configuration hash will be mixed in to each components' config.
  *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
  *
  *
  * Component configuration:
  *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
  *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
  *
  *  @see each individual component for more configuration settings.
  */
	var Default = {
		global: {
			validate: false,
			label: {
				className: "bmd-label-static" // default style of label to be used if not specified in the html markup
			}
		},
		// autofill: {
		//   selector: "body"
		// },
		checkbox: {
			selector: ".bmd-custom-checkbox > label > input[type=checkbox]"
		},
		checkboxInline: {
			selector: ".bmd-custom-checkbox-inline > input[type=checkbox]"
		},
		// collapseInline: {
		//   selector: '.bmd-collapse-inline [data-toggle="collapse"]'
		// },
		// drawer: {
		//   selector: ".bmd-layout-drawer"
		// },
		// file: {
		//   selector: "input[type=file]"
		// },
		radio: {
			selector: ".bmd-custom-radio > label > input[type=radio]"
		},
		radioInline: {
			selector: ".bmd-custom-radio-inline input[type=radio]"
		},
		ripples: {
			//selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
			selector: [".has-ripple", ".c-icon-count", ".dropdown-item", ".mmenu-type1-item:not(.mmenu-type1-item--inheader) > .mmenu-type1-item__link", ".mmenu-vertical-item__link", ".b-dl-menu__link", ".c-button-control", ".bx-filter-parameters-box-title", ".b-sidebar-nav__link"
			// ".card-image:not(.ripple-none)",
			// ".navbar a:not(.ripple-none)",
			// ".dropdown-menu a:not(.ripple-none)",
			// ".nav-tabs a:not(.ripple-none)",
			// ".pagination li:not(.active):not(.disabled) a:not(.ripple-none)",
			// ".ripple" // generic marker class to add ripple to elements
			]
		},
		select: {
			selector: ["select.bmd-form-control"]
		},
		// switch: {
		//   selector: ".switch > label > input[type=checkbox]"
		// },
		text: {
			// omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
			selector: ["input.bmd-form-control:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])"]
		},
		textarea: {
			selector: ["textarea.bmd-form-control"]
		},
		arrive: true,
		// create an ordered component list for instantiation
		instantiation: ["ripples", "checkbox", "checkboxInline",
		//"collapseInline",
		//"drawer",
		//'file',
		"radio", "radioInline",
		//"switch",
		"text", "textarea", "select"]
	};

	/**
  * ------------------------------------------------------------------------
  * Class Definition
  * ------------------------------------------------------------------------
  */

	var BootstrapMaterialDesign = function () {
		function BootstrapMaterialDesign($element, config) {
			var _this = this;

			_classCallCheck(this, BootstrapMaterialDesign);

			this.$element = $element;
			this.config = $.extend(true, {}, Default, config);
			var $document = $(document);

			var _loop = function _loop() {
				if (_isArray) {
					if (_i >= _iterator.length) return "break";
					_ref = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) return "break";
					_ref = _i.value;
				}

				var component = _ref;

				// the component's config fragment is passed in directly, allowing users to override
				var componentConfig = _this.config[component];

				// check to make sure component config is enabled (not `false`)
				if (componentConfig) {
					// assemble the selector as it may be an array
					var selector = _this._resolveSelector(componentConfig);

					// mix in global options
					componentConfig = $.extend(true, {}, _this.config.global, componentConfig);

					// create the jquery fn name e.g. 'bmdText' for 'text'
					var componentName = "" + (component.charAt(0).toUpperCase() + component.slice(1));
					var jqueryFn = "bmd" + componentName;

					try {
						// safely instantiate component on selector elements with config, report errors and move on.
						// console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
						$(selector)[jqueryFn](componentConfig);

						// add to arrive if present and enabled
						if (document.arrive && _this.config.arrive) {
							$document.arrive(selector, function () {
								// eslint-disable-line no-loop-func
								$(this)[jqueryFn](componentConfig);
							});
						}
					} catch (e) {
						var message = "Failed to instantiate component: $('" + selector + "')[" + jqueryFn + "](" + componentConfig + ")";
						console.error(message, e, "\nSelected elements: ", $(selector)); // eslint-disable-line no-console
						throw e;
					}
				}
			};

			for (var _iterator = this.config.instantiation, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;

				var _ret = _loop();

				if (_ret === "break") break;
			}
		}

		BootstrapMaterialDesign.prototype.dispose = function dispose() {
			this.$element.data(DATA_KEY, null);
			this.$element = null;
			this.config = null;
		};

		// ------------------------------------------------------------------------
		// private

		BootstrapMaterialDesign.prototype._resolveSelector = function _resolveSelector(componentConfig) {
			var selector = componentConfig.selector;
			if (Array.isArray(selector)) {
				selector = selector.join(", ");
			}

			return selector;
		};

		// ------------------------------------------------------------------------
		// static


		BootstrapMaterialDesign._jQueryInterface = function _jQueryInterface(config) {
			return this.each(function () {
				var $element = $(this);
				var data = $element.data(DATA_KEY);

				if (!data) {
					data = new BootstrapMaterialDesign($element, config);
					$element.data(DATA_KEY, data);
				}
			});
		};

		return BootstrapMaterialDesign;
	}();

	/**
  * ------------------------------------------------------------------------
  * jQuery
  * ------------------------------------------------------------------------
  */


	$.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
	$.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
	$.fn[JQUERY_NAME].noConflict = function () {
		$.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
		return BootstrapMaterialDesign._jQueryInterface;
	};

	return BootstrapMaterialDesign;
}(jQuery);

/* unused harmony default export */ var _unused_webpack_default_export = (BootstrapMaterialDesign);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"], __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/modules/compactHeader.js":
/*!***********************************************!*\
  !*** ./resources/js/modules/compactHeader.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign__ = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__ = __webpack_require__(/*! ../utils/isDesktop */ "./resources/js/utils/isDesktop.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Compact = function ($) {

	var Default = {
		selectors: {
			root: 'body',
			wrapper: '.l-page',
			menu: '.l-compact-menu',
			toggleButton: '[data-compact-menu-toggle]',
			search: '#compact-title-search'
		}
	};

	var Events = {
		fixed: 'fixed.compact-header',
		unfixed: 'unfixed.compact-header',
		revealMenu: 'reveal.compact-menu',
		concealMenu: 'conceal.compact-menu'
	};

	var Compact = function () {
		function Compact(el, options) {
			_classCallCheck(this, Compact);

			this.options = $.extend({}, Default, options);

			this.isRevealMenu = false;
			this.isFixing = false;

			this.$element = $(el);
			this.resolveSelectors();
		}

		Compact.prototype.resolveSelectors = function resolveSelectors() {
			this.$root = $(this.options.selectors.root);
			this.$wrapper = $(this.options.selectors.wrapper);
			this.$menu = $(this.options.selectors.menu);
			this.$search = $(this.options.selectors.search);
		};

		Compact.prototype.toggleMenu = function toggleMenu(button) {
			if (this.isRevealMenu) {
				this.concealMenu(button);
			} else {
				this.revealMenu(button);
			}
		};

		Compact.prototype.revealMenu = function revealMenu(button) {
			this.$menu.addClass('is-open');
			$(this.options.selectors.toggleButton).addClass('is-active');

			if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__["a" /* default */])()) {
				this.revealMenuDesktop(button);
			} else {
				this.revealMenuMobile(button);
			}

			this.isRevealMenu = true;

			this.$menu.trigger(Events.revealMenu);
		};

		Compact.prototype.revealMenuMobile = function revealMenuMobile(button) {
			var _this = this;

			var menuOffset = 0;

			if (this.isFixing) {
				menuOffset = this.$element.position().top + this.$element.outerHeight();
			} else {
				menuOffset = this.$element.offset().top + this.$element.outerHeight() - $(window).scrollTop();
			}

			this.$element.css({
				paddingRight: window.innerWidth - $(document).width() // scrollbar width
			});

			this.$root.css({
				overflow: 'hidden'
			});

			this.$menu.css({
				paddingTop: menuOffset + 'px'
			});

			var checkResize = function checkResize() {
				if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__["a" /* default */])()) {
					_this.$menu.one(Events.concealMenu, function () {
						return $(window).off('resize', checkResize);
					});
					_this.concealMenu();
				}
			};

			$(window).resize(checkResize);
		};

		Compact.prototype.revealMenuDesktop = function revealMenuDesktop(button) {
			var _this2 = this;

			var documentHeight = $(document).height();
			var maxHeight = documentHeight - this.$element.outerHeight();

			var calc = function calc() {

				_this2.$menu.css({
					top: _this2.$element.children().outerHeight(), //(this.$element.offset().top + this.$element.children().outerHeight()) + 'px',
					left: $(button).offset().left
					// height: $(window).outerHeight() - this.$element.children().outerHeight()
				});
			};

			var conceal = function conceal() {
				_this2.$menu.one(Events.concealMenu, function () {
					$(window).off('scroll', onScroll);
					_this2.$menu.one(Events.concealMenu, function () {
						return $(window).off('resize', checkResize);
					});
					$(document).off('click', onKeyDown);
				});

				_this2.concealMenu();
			};

			var onScroll = function onScroll() {
				if (_this2.isFixing) {
					calc();
				} else {
					conceal();
				}
			};

			var checkResize = function checkResize() {
				documentHeight = $(document).height();
				maxHeight = documentHeight - _this2.$element.outerHeight();

				if (!Object(__WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__["a" /* default */])()) {
					conceal();
				} else {
					calc();
				}
			};

			var onKeyDown = function onKeyDown() {
				var $target = $(event.target);
				if (!$target.is(_this2.$menu) || $target.closest(_this2.$menu).length == 0) {
					conceal();
				}
			};

			//setTimeout(() => {
			calc();
			//});

			$(window).on('scroll', onScroll);
			$(window).resize(checkResize);
			$(document).on('click', onKeyDown);
		};

		Compact.prototype.concealMenu = function concealMenu() {
			this.$root.css('overflow', 'auto');
			this.$wrapper.attr('style', '');
			this.$menu.attr('style', '');
			this.$element.css({
				paddingRight: 0
			});

			this.$menu.removeClass('is-open');
			$(this.options.selectors.toggleButton).removeClass('is-active');
			this.isRevealMenu = false;

			this.$menu.trigger(Events.concealMenu);
		};

		Compact.prototype.revealMobileSearch = function revealMobileSearch() {
			var _this3 = this;

			if (!this.$search.length) {
				return;
			}

			this.$search.addClass('js-is-open').css({
				'top': -this.$search.outerHeight(),
				'opacity': 0,
				'display': 'block',
				'will-change': 'top'
			});

			setTimeout(function () {
				_this3.$search.velocity('stop').velocity({
					'top': 0,
					'opacity': 1
				}, {
					complete: function complete() {
						_this3.$search.find('input:eq(0)').focus();
					}
				});
			});
		};

		Compact.prototype.concealMobileSearch = function concealMobileSearch() {
			var _this4 = this;

			this.$search.velocity('stop').velocity({
				'opacity': 0,
				'top': -this.$search.outerHeight()
			}, {
				complete: function complete() {
					_this4.$search.css({
						display: 'none'
					});
				}
			});
		};

		Compact.prototype.fixing = function fixing() {
			var _this5 = this;

			var height = this.$element.outerHeight();
			var $wrap = $('<div>').css({
				height: Object(__WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__["a" /* default */])() ? 0 : height,
				position: 'relative',
				top: 0
			});

			this.$element.wrap($wrap);

			$(window).resize(function () {
				height = _this5.$element.outerHeight();

				_this5.$element.parent().css({
					height: Object(__WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__["a" /* default */])() ? 0 : height
				});
			});

			var fixing = function fixing() {
				if (!_this5.isFixing) {
					var checkScroll = Object(__WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__["a" /* default */])() ? $(window).scrollTop() >= 200 : $(window).scrollTop() >= _this5.$element.offset().top;

					if (checkScroll) {
						_this5.$element.css({
							position: 'fixed',
							width: '100%',
							top: '-1px' // i dont undestand why safari is so stupid
						});

						_this5.isFixing = true;
						_this5.$element.addClass('is-fixed');
						_this5.$element.trigger(Events.fixed);
					}
				} else {
					var _checkScroll = Object(__WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__["a" /* default */])() ? $(window).scrollTop() < 200 : $(window).scrollTop() < _this5.$element.parent().offset().top;

					if (_checkScroll) {
						_this5.$element.css({
							position: 'relative'
						});

						_this5.isFixing = false;
						_this5.$element.removeClass('is-fixed');
						_this5.$element.trigger(Events.unfixed);
					}
				}
			};

			fixing();
			$(window).scroll(fixing);
		};

		return Compact;
	}();

	return Compact;
}(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

/* harmony default export */ __webpack_exports__["a"] = (Compact);

/***/ }),

/***/ "./resources/js/modules/dlMenu.js":
/*!****************************************!*\
  !*** ./resources/js/modules/dlMenu.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_isDesktop__ = __webpack_require__(/*! ../utils/isDesktop */ "./resources/js/utils/isDesktop.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Menu = function ($) {

	var Default = {
		animationIn: 'animate-in',
		animationOut: 'animate-out',
		animateInBack: 'animate-in-back',
		animateOutBack: 'animate-out-back',

		selectors: {
			items: 'li',
			submenu: 'ul',
			isOpen: '.is-open',
			back: '.is-back',
			parent: 'body'
		}
	};

	var onAnimationEvent = function onAnimationEvent(el, type, listener) {
		var events = {
			'animationend': ['webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd', 'animationend']
		};

		if (events[type]) {
			events[type].forEach(function (eventName) {
				$(el).on(eventName, listener);
			});
		}
	};

	var offAnimationEvent = function offAnimationEvent(el, type) {
		var events = {
			'animationend': ['webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd', 'animationend']
		};

		if (events[type]) {
			events[type].forEach(function (eventName) {
				$(el).off(eventName);
			});
		}
	};

	var Menu = function () {
		function Menu($el, options) {
			_classCallCheck(this, Menu);

			this.options = __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default()({}, Default, options);

			this.$menu = $el;
			this.$items = this.$menu.find(this.options.selectors.items).not(this.options.selectors.back);
			this.$back = this.$menu.find(this.options.selectors.back);
			this.$parent = this.$menu.closest(this.options.selectors.parent);

			this.offsets = [];

			this.initEvents();
		}

		Menu.prototype.hasSubmenu = function hasSubmenu($item) {
			return $item.children(this.options.selectors.submenu).length > 0;
		};

		Menu.prototype.openSubmenu = function openSubmenu($item) {
			var _this = this;

			var $submenu = $item.children(this.options.selectors.submenu);
			var $flyin = $submenu.clone().css('opacity', 0).insertAfter(this.$menu);

			setTimeout(function () {
				_this.offsets.push(_this.$parent.scrollTop());
				_this.$parent.scrollTop(0);
				$flyin.addClass(_this.options.animationIn);
				_this.$menu.addClass(_this.options.animationOut);

				onAnimationEvent(_this.$menu, 'animationend', function () {
					offAnimationEvent(_this.$menu, 'animationend');
					_this.$menu.removeClass(_this.options.animationOut).addClass('is-view');
					$item.addClass('is-open').closest(_this.options.selectors.submenu).addClass('is-view');

					$flyin.remove();
				});
			});
		};

		Menu.prototype.back = function back($item) {
			var _this2 = this;

			var $submenu = $item.closest(this.options.selectors.submenu);
			var $flyin = $submenu.clone().insertAfter(this.$menu);

			setTimeout(function () {
				$flyin.addClass(_this2.options.animateOutBack);
				_this2.$menu.addClass(_this2.options.animateInBack);

				onAnimationEvent(_this2.$menu, 'animationend', function () {
					offAnimationEvent(_this2.$menu, 'animationend');
					_this2.$menu.removeClass(_this2.options.animationOut + ' ' + _this2.options.animateInBack);
					$flyin.remove();
				});

				$item.closest('.is-open').removeClass('is-open');
				$item.closest('.is-view').removeClass('is-view');
				_this2.$parent.scrollTop(_this2.offsets.pop());
			});
		};

		Menu.prototype.initEvents = function initEvents() {
			var self = this;

			self.$items.on('click', function (event) {
				event.stopPropagation();

				var $item = $(this);

				if (self.hasSubmenu($item)) {
					event.preventDefault();

					self.openSubmenu($item);
				}
			});

			self.$back.on('click', function (event) {
				event.stopPropagation();
				event.preventDefault();

				self.back($(this));
			});
		};

		return Menu;
	}();

	return Menu;
}(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

/* harmony default export */ __webpack_exports__["a"] = (Menu);

/***/ }),

/***/ "./resources/js/modules/jquery.setHtmlByUrl.js":
/*!*****************************************************!*\
  !*** ./resources/js/modules/jquery.setHtmlByUrl.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$.fn.setHtmlByUrl = function (options) {
	var settings = $.extend({
		'url': ''
	}, options);
	return this.each(function () {
		if ('' != settings.url) {
			var $this = $(this);
			$.ajax({
				type: 'GET',
				dataType: 'html',
				url: settings.url,
				beforeSend: function beforeSend() {
					if ('localStorage' in window && window['localStorage'] !== null) {
						data = localStorage.getItem(settings.url);
						if (data) {
							localStorage.setItem(settings.url, data);
							$this.append(data);
							return false;
						}
						return true;
					}
				},
				success: function success(data) {
					localStorage.setItem(settings.url, data);
					$this.append(data);
				}
			});
		}
	});
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/modules/popovers.js":
/*!******************************************!*\
  !*** ./resources/js/modules/popovers.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign__ = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_assign__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Popover = function ($) {
	var Default = {
		delay: { show: 300, hide: 600 },
		trigger: 'focus',
		template: '<div class="popover" role="tooltip">' + '<svg class="popover-close icon-svg"><use xlink:href="#svg-close"></use></svg>' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>',
		sanitize: false // svg close icon
	};

	var Popover = function () {
		function Popover(element, name, config) {
			_classCallCheck(this, Popover);

			this.element = element;
			this.name = name;
			this.$element = $(this.element);
			this.config = __WEBPACK_IMPORTED_MODULE_1_lodash_assign___default()({}, Default, config);
			this.instance = undefined;

			this.prepare();

			this.initPopover();
		}

		Popover.prototype.prepare = function prepare() {};

		Popover.prototype.initPopover = function initPopover() {
			this.instance = this.$element.popover(this.config);

			this.$element.on('click', function (e) {
				e.stopPropagation();
				return false;
			});

			this.$element.on('shown.bs.popover', function (e) {
				$(this).addClass('active');
			});

			this.$element.on('inserted.bs.popover', function (e) {

				var id = e.target.getAttribute('aria-describedby');

				$('#' + id).find('.popover-close').on('click', function () {
					this.$element.popover('hide');
				}.bind(this));
			}.bind(this));

			this.$element.on('hidden.bs.popover', function (e) {
				$(this).removeClass('active');
			});
		};

		return Popover;
	}();

	return Popover;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Popover);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/modules/readmore.js":
/*!******************************************!*\
  !*** ./resources/js/modules/readmore.js ***!
  \******************************************/
/*! dynamic exports provided */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */

/* global jQuery */
(function ($) {
  'use strict';

  var readmore = 'readmore',
      defaults = {
    speed: 100,
    collapsedHeight: 200,
    heightMargin: 16,
    moreLink: '<a href="#">Read More</a>',
    lessLink: '<a href="#">Close</a>',
    embedCSS: true,
    blockCSS: 'display: block; width: 100%;',
    startOpen: false,

    // callbacks
    beforeToggle: function beforeToggle() {},
    afterToggle: function afterToggle() {}
  },
      cssEmbedded = {},
      uniqueIdCounter = 0;

  function debounce(func, wait, immediate) {
    var timeout;

    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  function uniqueId(prefix) {
    var id = ++uniqueIdCounter;

    return String(prefix == null ? 'rmjs-' : prefix) + id;
  }

  function setBoxHeights(element) {
    var el = element.clone().css({
      height: 'auto',
      width: element.width(),
      maxHeight: 'none',
      overflow: 'hidden'
    }).insertAfter(element),
        expandedHeight = el.outerHeight(),
        cssMaxHeight = parseInt(el.css({ maxHeight: '' }).css('max-height').replace(/[^-\d\.]/g, ''), 10),
        defaultHeight = element.data('defaultHeight');

    el.remove();

    var collapsedHeight = cssMaxHeight || element.data('collapsedHeight') || defaultHeight;

    // Store our measurements.
    element.data({
      expandedHeight: expandedHeight,
      maxHeight: cssMaxHeight,
      collapsedHeight: collapsedHeight
    })
    // and disable any `max-height` property set in CSS
    .css({
      maxHeight: 'none'
    });
  }

  var resizeBoxes = debounce(function () {
    $('[data-readmore]').each(function () {
      var current = $(this),
          isExpanded = current.attr('aria-expanded') === 'true';

      setBoxHeights(current);

      current.css({
        height: current.data(isExpanded ? 'expandedHeight' : 'collapsedHeight')
      });
    });
  }, 100);

  function embedCSS(options) {
    if (!cssEmbedded[options.selector]) {
      var styles = ' ';

      if (options.embedCSS && options.blockCSS !== '') {
        styles += options.selector + ' + [data-readmore-toggle], ' + options.selector + '[data-readmore]{' + options.blockCSS + '}';
      }

      // Include the transition CSS even if embedCSS is false
      styles += options.selector + '[data-readmore]{' + 'transition: height ' + options.speed + 'ms;' + 'overflow: hidden;' + '}';

      (function (d, u) {
        var css = d.createElement('style');
        css.type = 'text/css';

        if (css.styleSheet) {
          css.styleSheet.cssText = u;
        } else {
          css.appendChild(d.createTextNode(u));
        }

        d.getElementsByTagName('head')[0].appendChild(css);
      })(document, styles);

      cssEmbedded[options.selector] = true;
    }
  }

  function Readmore(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    embedCSS(this.options);

    this._defaults = defaults;
    this._name = readmore;

    this.init();

    // IE8 chokes on `window.addEventListener`, so need to test for support.
    if (window.addEventListener) {
      // Need to resize boxes when the page has fully loaded.
      window.addEventListener('load', resizeBoxes);
      window.addEventListener('resize', resizeBoxes);
    } else {
      window.attachEvent('load', resizeBoxes);
      window.attachEvent('resize', resizeBoxes);
    }
  }

  Readmore.prototype = {
    init: function init() {
      var current = $(this.element);

      current.data({
        defaultHeight: this.options.collapsedHeight,
        heightMargin: this.options.heightMargin
      });

      setBoxHeights(current);

      var collapsedHeight = current.data('collapsedHeight'),
          heightMargin = current.data('heightMargin');

      if (current.outerHeight(true) <= collapsedHeight + heightMargin) {
        // The block is shorter than the limit, so there's no need to truncate it.
        return true;
      } else {
        var id = current.attr('id') || uniqueId(),
            useLink = this.options.startOpen ? this.options.lessLink : this.options.moreLink;

        current.attr({
          'data-readmore': '',
          'aria-expanded': this.options.startOpen,
          'id': id
        });

        current.after($(useLink).on('click', function (_this) {
          return function (event) {
            _this.toggle(this, current[0], event);
          };
        }(this)).attr({
          'data-readmore-toggle': '',
          'aria-controls': id
        }));

        if (!this.options.startOpen) {
          current.css({
            height: collapsedHeight
          });
        }
      }
    },

    toggle: function toggle(trigger, element, event) {
      if (event) {
        event.preventDefault();
      }

      if (!trigger) {
        trigger = $('[aria-controls="' + _this.element.id + '"]')[0];
      }

      if (!element) {
        element = _this.element;
      }

      var $element = $(element),
          newHeight = '',
          newLink = '',
          expanded = false,
          collapsedHeight = $element.data('collapsedHeight');

      if ($element.height() <= collapsedHeight) {
        newHeight = $element.data('expandedHeight') + 'px';
        newLink = 'lessLink';
        expanded = true;
      } else {
        newHeight = collapsedHeight;
        newLink = 'moreLink';
      }

      // Fire beforeToggle callback
      // Since we determined the new "expanded" state above we're now out of sync
      // with our true current state, so we need to flip the value of `expanded`
      this.options.beforeToggle(trigger, $element, !expanded);

      $element.css({ 'height': newHeight });

      // Fire afterToggle callback
      $element.on('transitionend', function (_this) {
        return function () {
          _this.options.afterToggle(trigger, $element, expanded);

          $(this).attr({
            'aria-expanded': expanded
          }).off('transitionend');
        };
      }(this));

      $(trigger).replaceWith($(this.options[newLink]).on('click', function (_this) {
        return function (event) {
          _this.toggle(this, element, event);
        };
      }(this)).attr({
        'data-readmore-toggle': '',
        'aria-controls': $element.attr('id')
      }));
    },

    destroy: function destroy() {
      $(this.element).each(function () {
        var current = $(this);

        current.attr({
          'data-readmore': null,
          'aria-expanded': null
        }).css({
          maxHeight: '',
          height: ''
        }).next('[data-readmore-toggle]').remove();

        current.removeData();
      });
    }
  };

  $.fn.readmore = function (options) {
    var args = arguments,
        selector = this.selector;

    options = options || {};

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
      return this.each(function () {
        if ($.data(this, 'plugin_' + readmore)) {
          var instance = $.data(this, 'plugin_' + readmore);
          instance.destroy.apply(instance);
        }

        options.selector = selector;

        $.data(this, 'plugin_' + readmore, new Readmore(this, options));
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + readmore);
        if (instance instanceof Readmore && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
    }
  };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/modules/slider.js":
/*!****************************************!*\
  !*** ./resources/js/modules/slider.js ***!
  \****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_owl_carousel__ = __webpack_require__(/*! owl.carousel */ "./node_modules/owl.carousel/dist/owl.carousel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_owl_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_owl_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_assign__ = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_assign__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Slider = function ($) {
	var Default = {
		items: 4,
		margin: 30,
		navText: ['<svg class="icon-svg"><use xlink:href="#svg-arrow-left"></use></svg>', '<svg class="icon-svg"><use xlink:href="#svg-arrow-right"></use></svg>'],
		responsive: {
			0: { items: 1 },
			380: { items: 2 },
			576: { items: 2 },
			768: { items: 2 },
			992: { items: 3 },
			1200: { items: 4 }
		}
	};

	var Slider = function () {
		function Slider(element, name, config) {
			_classCallCheck(this, Slider);

			this.element = element;
			this.name = name;
			this.$element = $(this.element);
			this.config = __WEBPACK_IMPORTED_MODULE_2_lodash_assign___default()({}, Default, config);
			this.instance = undefined;

			this.prepare();
			this.findDotsContainer();
			this.findNavContainer();

			if (this.config.nav) {
				this.createMobileNav();
			}

			this.initSlider();
		}

		Slider.prototype.prepare = function prepare() {

			// remove show classes
			this.$element.removeClass(function (index, className) {
				return (className.match(/(^|\s)show-items-\S+/g) || []).join(' ');
			});

			// add owl-carousel container
			this.$element.addClass('owl-carousel');

			// Clear Grid
			if (this.$element.hasClass('row')) {
				this.$element.removeClass('row');
				this.$element.children('[class*=col]').removeClass(function (index, className) {
					return (className.match(/(^|\s)col-\S+/g) || []).join(' ');
				});
			}
		};

		Slider.prototype.findDotsContainer = function findDotsContainer() {
			var $container = $('[data-slider-dots=' + this.name + ']');

			if ($container.length) {
				var dotsId = 'slider-dots-' + this.name;

				$container.addClass('slider-dots').attr('id', dotsId);

				this.config.dots = true;
				this.config.dotsContainer = '#' + dotsId;
			} else {
				this.config.dots = false;
			}
		};

		Slider.prototype.findNavContainer = function findNavContainer() {
			var $container = $('[data-slider-nav=' + this.name + ']');

			if ($container.length) {
				var navId = 'slider-nav-' + this.name;

				$container.addClass('slider-nav').attr('id', navId);

				this.config.nav = true;
				this.config.navContainer = '#' + navId;
			} else {
				this.config.nav = false;
			}
		};

		Slider.prototype.createMobileNav = function createMobileNav() {
			var _this = this;

			var $prevButton = $('<button>').addClass('owl-prev').html(this.config.navText[0]),
			    $nextButton = $('<button>').addClass('owl-next').html(this.config.navText[1]),
			    $container = $('[data-slider-nav-sm=' + this.name + ']');

			if (!$container.length) {
				$container = $('<div>').addClass('slider-nav-sm');
				this.$element.after($container);
			}

			$container.append($prevButton, $nextButton);

			$prevButton.on('click', function () {
				_this.$element.trigger('prev.owl.carousel');
			});

			$nextButton.on('click', function () {
				_this.$element.trigger('next.owl.carousel');
			});
		};

		Slider.prototype.initSlider = function initSlider() {

			this.config.onTranslated = function () {
				var lazyloadInstance = $('.lazyload').data("plugin_lazy");
				if (lazyloadInstance) {
					lazyloadInstance.update();
				}
			};

			this.instance = this.$element.owlCarousel(this.config);
		};

		return Slider;
	}();

	return Slider;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Slider);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/modules/stickySidebar.js":
/*!***********************************************!*\
  !*** ./resources/js/modules/stickySidebar.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_debounce__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vendor_ResizeSensor__ = __webpack_require__(/*! ../../vendor/ResizeSensor */ "./resources/vendor/ResizeSensor.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vendor_ResizeSensor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vendor_ResizeSensor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sticky_sidebar__ = __webpack_require__(/*! sticky-sidebar */ "./node_modules/sticky-sidebar/src/sticky-sidebar.js");







var stickyDefaultOptions = {
	bottomSpacing: 0,
	topSpacing: 10,
	resizeSensor: false
	// containerSelector: '.l-main__container'
};

/* harmony default export */ __webpack_exports__["a"] = (function (element) {
	var stickyOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var $lastChildrenItem, stickyOptions, sticky;

	$lastChildrenItem = __WEBPACK_IMPORTED_MODULE_2_jquery___default()(element).children(':not(script,style,link,.resize-sensor):last');
	if ($lastChildrenItem.length) {
		$lastChildrenItem.attr('style', 'margin-bottom: 0 !important');
	}

	if (RS.Options.fixingCompactHeader) {
		stickyOptions.topSpacing = __WEBPACK_IMPORTED_MODULE_2_jquery___default()('.js-compact-header').children(0).height() + 10;
	}

	stickyOptions = __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default()({}, stickyDefaultOptions, stickyOptions);
	sticky = new __WEBPACK_IMPORTED_MODULE_4_sticky_sidebar__["default"](element, stickyOptions);

	if (sticky) {
		var updateSticky = __WEBPACK_IMPORTED_MODULE_1_lodash_debounce___default()(function () {
			sticky.updateSticky();
		}, 0);

		new __WEBPACK_IMPORTED_MODULE_3__vendor_ResizeSensor___default.a(sticky.container, function () {
			updateSticky();
		});

		new __WEBPACK_IMPORTED_MODULE_3__vendor_ResizeSensor___default.a(sticky.sidebarInner, function () {
			updateSticky();
		});

		// kostyl' dlya obnovleniya polozheniya sajdbara pri izmenenii vysoty rabochej oblasti
		new __WEBPACK_IMPORTED_MODULE_3__vendor_ResizeSensor___default.a(document.querySelector('.l-main__container'), function () {
			sticky.direction = 'down';
			sticky.updateSticky();
		});
	}
});

/***/ }),

/***/ "./resources/js/modules/timer.js":
/*!***************************************!*\
  !*** ./resources/js/modules/timer.js ***!
  \***************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign__ = __webpack_require__(/*! lodash/assign */ "./node_modules/lodash/assign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_assign__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Timer = function ($) {
	var Default = {
		blockClass: ".js-timer-item",
		progressClass: ".js-progress",
		progressTextClass: "js-progress-text"
	};

	var Timer = function Timer(element, name, config) {
		_classCallCheck(this, Timer);

		this.element = element;
		this.name = name;
		this.timerInterval = false;

		this.setup(config);
		this.initialize();
	};

	Timer.prototype.setup = function (options) {
		this.options = __WEBPACK_IMPORTED_MODULE_1_lodash_assign___default()({}, Default, options);

		this.dateNow = parseInt(BX.message('SERVER_TIME'));
		this.timeLimit = this.options.DATE_TO - this.options.DATE_FROM;
		this.timeLeft = this.options.DATE_TO - this.dateNow;

		this.quantity = parseInt(this.options.QUANTITY);
	};

	Timer.prototype.initialize = function () {
		this.obDays = this.element.querySelector('[data-entity="timer-days"]');
		this.obHours = this.element.querySelector('[data-entity="timer-hours"]');
		this.obMinutes = this.element.querySelector('[data-entity="timer-minutes"]');
		this.obSeconds = this.element.querySelector('[data-entity="timer-seconds"]');
		this.obQuantity = this.element.querySelector('[data-entity="timer-quantity"]');

		this.showTimer = !!this.obDays && !!this.obHours && !!this.obMinutes && !!this.obSeconds;

		if (this.timeLeft > 0) {
			BX.onCustomEvent('onTimerStart');
		}

		if (this.showTimer) {
			this.changeInfo();
		}
		this.setQuantity();

		this.timerInterval = window.setInterval($.proxy(function () {

			this.dateNow += 1;
			this.timeLeft = this.options.DATE_TO - this.dateNow;

			if (this.timeLeft < 1 && this.options.AUTO_RENEWAL == 'Y') {
				while (this.timeLeft < 1) {
					this.timeLeft += this.timeLimit;
				}
			}

			if (this.showTimer) {
				this.changeInfo();
			}

			if (this.timeLeft == 0) {
				BX.onCustomEvent('onTimerEnd');
				window.clearInterval(this.timerInterval);
			}
		}, this), 1000);
	};

	Timer.prototype.setQuantity = function () {
		if (!this.obQuantity) {
			return;
		}

		if (this.quantity > 0) {
			this.obQuantity.querySelector('[data-entity="timer-quantity-value"]').innerHTML = this.quantity;
		} else {
			this.obQuantity.style.display = "none";
		}
	};

	Timer.prototype.changeInfo = function () {
		if (this.timeLeft >= 0) {
			var days = parseInt(this.timeLeft / (60 * 60) / 24),
			    hourse = parseInt(this.timeLeft / (60 * 60)),
			    hours = parseInt(this.timeLeft / (60 * 60) % 24),
			    minutes = parseInt(this.timeLeft / 60) % 60,
			    quantity = parseInt(this.quantity),
			    seconds = parseInt(this.timeLeft) % 60;
			/*
   			var widthTimerPerc = false;
   
   			if (!!dataTimer.DINAMICA_DATA)
   			{
   				if (dataTimer.DINAMICA_DATA == 'evenly')
   				{
   					widthTimerPerc = Math.floor(100 - ((this.timeLeft / limit) * 100));
   
   					this.$element.find(options.linePercent).css('width', widthTimerPerc + '%');
   					this.$element.find(options.textLinePercent).text(widthTimerPerc);
   				}
   				else
   				{
   					var prevPerc = false,
   							firstPerc = false;
   
   					for (var timePerc in dataTimer.DINAMICA_DATA)
   					{
   						if (!prevPerc)
   						{
   							prevPerc = timePerc;
   							firstPerc = timePerc;
   						}
   						if (prevPerc < hourse && hourse < timePerc)
   						{
   							widthTimerPerc = dataTimer.DINAMICA_DATA[timePerc];
   							break;
   						}
   						prevPerc = timePerc;
   					}
   
   					if (!widthTimerPerc)
   					{
   						if (hourse > prevPerc)
   						{
   							widthTimerPerc = dataTimer.DINAMICA_DATA[prevPerc];
   						}
   						else if (hourse < prevPerc)
   						{
   							widthTimerPerc = dataTimer.DINAMICA_DATA[firstPerc];
   						}
   					}
   
   					if (widthTimerPerc)
   					{
   						this.$element.find(options.linePercent).css('width', widthTimerPerc + '%');
   						this.$element.find(options.textLinePercent).text(widthTimerPerc);
   					}
   				}
   			}
   			else
   			{
   				widthTimerPerc = Math.floor((this.timeLeft / limit) * 100);
   				this.$element.find(options.linePercent).css('width', widthTimerPerc + '%');
   				this.$element.find(options.textLinePercent).text(widthTimerPerc);
   			}
   */
			if (days < 1) {
				this.obDays.style.display = 'none';
				// this.obDays.querySelector('[data-entity="timer-value"]').innerHTML = '00';
				this.obSeconds.style.display = '';
				this.obSeconds.querySelector('[data-entity="timer-value"]').innerHTML = seconds < 10 ? '0' + seconds : seconds;
			} else if (days > 0) {
				this.obDays.style.display = '';
				this.obDays.querySelector('[data-entity="timer-value"]').innerHTML = days < 10 ? '0' + days : days;
				this.obSeconds.style.display = 'none';
				// this.obSeconds.querySelector('[data-entity="timer-value"]').innerHTML = '00';
			}

			this.obMinutes.querySelector('[data-entity="timer-value"]').innerHTML = minutes < 10 ? '0' + minutes : minutes;
			this.obHours.querySelector('[data-entity="timer-value"]').innerHTML = hours < 10 ? '0' + hours : hours;
		}
	};

	return Timer;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Timer);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/modules/velocity.js":
/*!******************************************!*\
  !*** ./resources/js/modules/velocity.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, $) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity__ = __webpack_require__(/*! velocity-animate/velocity */ "./node_modules/velocity-animate/velocity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity__);


global.Velocity = window.Velocity = __WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a;

var RegisterEffect = function RegisterEffect(effectName, properties) {
	/* Animate the expansion/contraction of the elements' parent's height for In/Out effects. */
	function animateParentHeight(elements, direction, totalDuration, stagger) {
		var totalHeightDelta = 0,
		    parentNode;

		/* Sum the total height (including padding and margin) of all targeted elements. */
		$.each(elements.nodeType ? [elements] : elements, function (i, element) {
			if (stagger) {
				/* Increase the totalDuration by the successive delay amounts produced by the stagger option. */
				totalDuration += i * stagger;
			}

			parentNode = element.parentNode;

			var propertiesToSum = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"];

			/* If box-sizing is border-box, the height already includes padding and margin */
			if (__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() === "border-box") {
				propertiesToSum = ["height"];
			}

			$.each(propertiesToSum, function (i, property) {
				totalHeightDelta += parseFloat(__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.CSS.getPropertyValue(element, property));
			});
		});

		/* Animate the parent element's height adjustment (with a varying duration multiplier for aesthetic benefits). */
		__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.animate(parentNode, {
			height: (direction === "In" ? "+" : "-") + "=" + totalHeightDelta
		}, {
			queue: false,
			easing: "ease-in-out",
			duration: totalDuration * (direction === "In" ? 0.6 : 1)
		});
	}

	/* Register a custom redirect for each effect. */
	__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.Redirects[effectName] = function (element, redirectOptions, elementsIndex, elementsSize, elements, promiseData, loop) {
		var finalElement = elementsIndex === elementsSize - 1,
		    totalDuration = 0;

		loop = loop || properties.loop;
		if (typeof properties.defaultDuration === "function") {
			properties.defaultDuration = properties.defaultDuration.call(elements, elements);
		} else {
			properties.defaultDuration = parseFloat(properties.defaultDuration);
		}

		/* Get the total duration used, so we can share it out with everything that doesn't have a duration */
		for (var callIndex = 0; callIndex < properties.calls.length; callIndex++) {
			durationPercentage = properties.calls[callIndex][1];
			if (typeof durationPercentage === "number") {
				totalDuration += durationPercentage;
			}
		}
		var shareDuration = totalDuration >= 1 ? 0 : properties.calls.length ? (1 - totalDuration) / properties.calls.length : 1;

		/* Iterate through each effect's call array. */
		for (callIndex = 0; callIndex < properties.calls.length; callIndex++) {
			var call = properties.calls[callIndex],
			    propertyMap = call[0],
			    redirectDuration = 1000,
			    durationPercentage = call[1],
			    callOptions = call[2] || {},
			    opts = {};

			if (redirectOptions.duration !== undefined) {
				redirectDuration = redirectOptions.duration;
			} else if (properties.defaultDuration !== undefined) {
				redirectDuration = properties.defaultDuration;
			}

			/* Assign the whitelisted per-call options. */
			opts.duration = redirectDuration * (typeof durationPercentage === "number" ? durationPercentage : shareDuration);
			opts.queue = redirectOptions.queue || "";
			opts.easing = callOptions.easing || "ease";
			opts.delay = parseFloat(callOptions.delay) || 0;
			opts.loop = !properties.loop && callOptions.loop;
			opts._cacheValues = callOptions._cacheValues || true;

			/* Special processing for the first effect call. */
			if (callIndex === 0) {
				/* If a delay was passed into the redirect, combine it with the first call's delay. */
				opts.delay += parseFloat(redirectOptions.delay) || 0;

				if (elementsIndex === 0) {
					opts.begin = function () {
						/* Only trigger a begin callback on the first effect call with the first element in the set. */
						if (redirectOptions.begin) {
							redirectOptions.begin.call(elements, elements);
						}

						var direction = effectName.match(/(In|Out)$/);

						/* Make "in" transitioning elements invisible immediately so that there's no FOUC between now
       and the first RAF tick. */
						if (direction && direction[0] === "In" && propertyMap.opacity !== undefined) {
							$.each(elements.nodeType ? [elements] : elements, function (i, element) {
								__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.CSS.setPropertyValue(element, "opacity", 0);
							});
						}

						/* Only trigger animateParentHeight() if we're using an In/Out transition. */
						if (redirectOptions.animateParentHeight && direction) {
							animateParentHeight(elements, direction[0], redirectDuration + opts.delay, redirectOptions.stagger);
						}
					};
				}

				/* If the user isn't overriding the display option, default to "auto" for "In"-suffixed transitions. */
				if (redirectOptions.display !== null) {
					if (redirectOptions.display !== undefined && redirectOptions.display !== "none") {
						opts.display = redirectOptions.display;
					} else if (/In$/.test(effectName)) {
						/* Inline elements cannot be subjected to transforms, so we switch them to inline-block. */
						var defaultDisplay = __WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.CSS.Values.getDisplayType(element);
						opts.display = defaultDisplay === "inline" ? "inline-block" : defaultDisplay;
					}
				}

				if (redirectOptions.visibility && redirectOptions.visibility !== "hidden") {
					opts.visibility = redirectOptions.visibility;
				}
			}

			/* Special processing for the last effect call. */
			if (callIndex === properties.calls.length - 1) {
				/* Append promise resolving onto the user's redirect callback. */
				var injectFinalCallbacks = function injectFinalCallbacks() {
					if ((redirectOptions.display === undefined || redirectOptions.display === "none") && /Out$/.test(effectName)) {
						$.each(elements.nodeType ? [elements] : elements, function (i, element) {
							__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.CSS.setPropertyValue(element, "display", "none");
						});
					}
					if (redirectOptions.complete) {
						redirectOptions.complete.call(elements, elements);
					}
					if (promiseData) {
						promiseData.resolver(elements || element);
					}
				};

				opts.complete = function () {
					if (loop) {
						__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.Redirects[effectName](element, redirectOptions, elementsIndex, elementsSize, elements, promiseData, loop === true ? true : Math.max(0, loop - 1));
					}
					if (properties.reset) {
						for (var resetProperty in properties.reset) {
							if (!properties.reset.hasOwnProperty(resetProperty)) {
								continue;
							}
							var resetValue = properties.reset[resetProperty];

							/* Format each non-array value in the reset property map to [ value, value ] so that changes apply
        immediately and DOM querying is avoided (via forcefeeding). */
							/* Note: Don't forcefeed hooks, otherwise their hook roots will be defaulted to their null values. */
							if (__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.CSS.Hooks.registered[resetProperty] === undefined && (typeof resetValue === "string" || typeof resetValue === "number")) {
								properties.reset[resetProperty] = [properties.reset[resetProperty], properties.reset[resetProperty]];
							}
						}

						/* So that the reset values are applied instantly upon the next rAF tick, use a zero duration and parallel queueing. */
						var resetOptions = {
							duration: 0,
							queue: false
						};

						/* Since the reset option uses up the complete callback, we trigger the user's complete callback at the end of ours. */
						if (finalElement) {
							resetOptions.complete = injectFinalCallbacks;
						}

						__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.animate(element, properties.reset, resetOptions);
						/* Only trigger the user's complete callback on the last effect call with the last element in the set. */
					} else if (finalElement) {
						injectFinalCallbacks();
					}
				};

				if (redirectOptions.visibility === "hidden") {
					opts.visibility = redirectOptions.visibility;
				}
			}

			__WEBPACK_IMPORTED_MODULE_0_velocity_animate_velocity___default.a.animate(element, propertyMap, opts);
		}
	};
};

var effects = {
	"transition.slideDownIn": {
		defaultDuration: 900,
		calls: [[{ opacity: [1, 0], translateY: [0, -10], translateZ: 0 }]]
	},
	"transition.slideUpIn": {
		defaultDuration: 900,
		calls: [[{ opacity: [1, 0], translateY: [0, 10], translateZ: 0 }]]
	},
	"transition.fadeOut": {
		defaultDuration: 500,
		calls: [[{ opacity: [0, 1] }]]
	},
	"transition.fadeIn": {
		defaultDuration: 500,
		calls: [[{ opacity: [1, 0] }]]
	},
	"transition.slideDownInFull": {
		defaultDuration: 900,
		calls: [[{ opacity: [1, 0], translateY: [0, '-100%'], translateZ: 0 }]]
	},
	"transition.slideDownOutFull": {
		defaultDuration: 900,
		calls: [[{ opacity: [0.4, 1], translateY: ['-100%', 0], translateZ: 0 }]]
	}
};

for (var effectName in effects) {
	if (effects.hasOwnProperty(effectName)) {
		RegisterEffect(effectName, effects[effectName]);
	}
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/panel.js":
/*!*******************************!*\
  !*** ./resources/js/panel.js ***!
  \*******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_overlay__ = __webpack_require__(/*! ./utils/overlay */ "./resources/js/utils/overlay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_panel_RightPanel__ = __webpack_require__(/*! ./app/panel/RightPanel */ "./resources/js/app/panel/RightPanel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_panel_BottomPanel__ = __webpack_require__(/*! ./app/panel/BottomPanel */ "./resources/js/app/panel/BottomPanel.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var ESCAPE_KEY_CODE = 27;

var Panel = function ($) {
	var Panel = function () {
		_createClass(Panel, null, [{
			key: 'Defaults',
			get: function get() {
				return {
					classes: {}
				};
			}
		}]);

		function Panel(options) {
			var _this = this;

			_classCallCheck(this, Panel);

			this.options = $.extend({}, Panel.Defaults, options);

			this.openned = null;

			this.initPanels();

			$(document).keyup(function (e) {
				if (e.keyCode === ESCAPE_KEY_CODE) {
					_this.close();
				}
			});

			$(document).on('click', '[data-panel-close]', function () {
				return _this.close();
			});
		}

		Panel.prototype.initPanels = function initPanels() {
			this.panels = {};

			this.panels['right'] = new __WEBPACK_IMPORTED_MODULE_2__app_panel_RightPanel__["a" /* default */](this);
			this.panels['bottom'] = new __WEBPACK_IMPORTED_MODULE_3__app_panel_BottomPanel__["a" /* default */](this);
		};

		Panel.prototype.load = function load(url) {
			var _this2 = this;

			var d = $.Deferred();

			$(document).trigger('panel.before_load', [url]);
			$.ajax({
				url: url
			}).then(function (result) {

				if (!_this2.openned) {
					d.reject();
				}

				var resultJson = BX.parseJSON(result);

				if (resultJson) {
					if (resultJson.SCRIPTS) {
						_this2.processScripts(resultJson.SCRIPTS, function () {
							d.resolve(resultJson.HTML);
						});
					} else {
						d.resolve(resultJson.HTML);
					}
				} else {
					d.resolve(result);
				}
			});

			return d.promise();
		};

		Panel.prototype.reload = function reload(url) {

			for (var i in this.panels) {

				if (!this.panels.hasOwnProperty(i)) {
					continue;
				}

				var panel = this.panels[i];

				if (panel && panel.blocks[url]) {
					panel.update(url);
				}
			}
		};

		Panel.prototype.processScripts = function processScripts() {
			var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var successFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			var processed = BX.processHTML(html, false);
			BX.ajax.processScripts(processed.SCRIPT, false, function () {
				return successFn();
			});
		};

		Panel.prototype.open = function open() {
			var _this3 = this;

			var link = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
			var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'right';


			var panel = this.panels[position];

			if (!panel || !link) {
				return;
			}

			if (this.openned) {
				return this.close().then(function () {
					return _this3.open(link, position);
				});
			}

			this.openned = panel;

			$(document).trigger('panel.before_open');

			return panel.open(link);
		};

		Panel.prototype.close = function close() {
			var _this4 = this;

			if (this.openned) {
				$(document).trigger('panel.before_close');

				return this.openned.close().then(function () {
					$(document).trigger('panel.closed');

					_this4.openned = null;

					return true;
				});
			}

			return $.Deferred().promise();
		};

		return Panel;
	}();

	return Panel;
}(jQuery);

/* harmony default export */ __webpack_exports__["a"] = (Panel);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/js/utils/dragResize.js":
/*!******************************************!*\
  !*** ./resources/js/utils/dragResize.js ***!
  \******************************************/
/*! exports provided: MIN_HEIGHT, MAX_HEIGHT, default */
/*! exports used: MIN_HEIGHT, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MIN_HEIGHT; });
/* unused harmony export MAX_HEIGHT */
var MIN_HEIGHT = 500;
var MAX_HEIGHT = 900;

/* harmony default export */ __webpack_exports__["b"] = (function (options) {
	if (!options.dragArea || !options.container) {
		return;
	}

	var dragArea = options.dragArea;
	var container = options.container;

	var minHeight = options.minHeight || MIN_HEIGHT;
	var maxHeight = options.maxHeight || MAX_HEIGHT;

	var onResize = options.onResize || function () {};

	var isResizing = false;
	var clicked = false;

	dragArea.addEventListener('mousedown', function (e) {
		isResizing = true;

		clicked = {
			height: container.clientHeight,
			clientY: e.clientY
		};

		var onMouseMove = function onMouseMove(e) {
			if (!isResizing) {
				return;
			}

			var currentHeight = Math.max(clicked.clientY - e.clientY + clicked.height, minHeight);
			if (currentHeight > minHeight && currentHeight < maxHeight) {
				onResize(currentHeight);
			}
		};

		var onMouseUp = function onMouseUp(e) {
			isResizing = false;
			clicked = false;

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	});

	dragArea.addEventListener('touchstart', function (e) {
		isResizing = true;

		e.stopPropagation();
		e.preventDefault();

		clicked = {
			height: container.clientHeight,
			clientY: e.touches[0].clientY
		};

		var onMouseMove = function onMouseMove(e) {
			if (!isResizing) {
				return;
			}

			var currentHeight = Math.max(clicked.clientY - e.touches[0].clientY + clicked.height, minHeight);
			if (currentHeight > minHeight && currentHeight < maxHeight) {
				onResize(currentHeight);
			}
		};

		var onMouseUp = function onMouseUp(e) {
			isResizing = false;
			clicked = false;

			document.removeEventListener('touchmove', onMouseMove);
			document.removeEventListener('touchend', onMouseUp);
		};

		document.addEventListener('touchmove', onMouseMove);
		document.addEventListener('touchend', onMouseUp);
	});
});

/***/ }),

/***/ "./resources/js/utils/imageInCache.js":
/*!********************************************!*\
  !*** ./resources/js/utils/imageInCache.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (src) {
	var image = new Image();
	image.src = src;

	return image.complete;
});

/***/ }),

/***/ "./resources/js/utils/isDesktop.js":
/*!*****************************************!*\
  !*** ./resources/js/utils/isDesktop.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


/* harmony default export */ __webpack_exports__["a"] = (function (options) {
	return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).innerWidth() >= 768;
});

/***/ }),

/***/ "./resources/js/utils/overlay.js":
/*!***************************************!*\
  !*** ./resources/js/utils/overlay.js ***!
  \***************************************/
/*! exports provided: show, hide */
/*! exports used: hide, show */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return show; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hide; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);


var $overlay;

function show() {
	var d = new __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Deferred();

	if (!$overlay) {
		$overlay = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div>');

		$overlay.css({
			'position': 'fixed',
			'opacity': '0',
			'width': '100%',
			'height': '100%',
			'top': '0',
			'left': '0',
			'right': '0',
			'bottom': '0',
			'background-color': 'rgba(0, 0, 0, 0.5)',
			'z-index': '9998',
			'cursor': 'pointer',
			'display': 'none'
		});

		__WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').append($overlay);
	}

	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).trigger('overlay.before_show');
	$overlay.show().velocity({
		'opacity': 1
	}, {
		duration: 300,
		complete: function complete() {
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).trigger('overlay.after_show');
			d.resolve($overlay);
		}
	});

	return d.promise();
}

function hide() {
	if (!$overlay) {
		return;
	}

	var d = new __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.Deferred();

	__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).trigger('overlay.before_hide');

	$overlay.velocity({
		'opacity': 0
	}, {
		duration: 300,
		complete: function complete() {
			$overlay.hide();
			d.resolve($overlay);
			__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).trigger('overlay.after_hide');
		}
	});

	return d.promise();
}



/***/ }),

/***/ "./resources/js/utils/parseOptions.js":
/*!********************************************!*\
  !*** ./resources/js/utils/parseOptions.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isString__ = __webpack_require__(/*! lodash/isString */ "./node_modules/lodash/isString.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_isString___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_isString__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_isObject__ = __webpack_require__(/*! lodash/isObject */ "./node_modules/lodash/isObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_isObject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_isObject__);




/* harmony default export */ __webpack_exports__["a"] = (function (options) {
	return __WEBPACK_IMPORTED_MODULE_1_lodash_isString___default()(options) && options.trim() != '' ? __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.parseJSON(options) : __WEBPACK_IMPORTED_MODULE_2_lodash_isObject___default()(options) ? options : {};
});

/***/ }),

/***/ "./resources/vendor/ResizeSensor.js":
/*!******************************************!*\
  !*** ./resources/vendor/ResizeSensor.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
;
(function () {

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function ResizeSensor(element, callback) {
        /**
         *
         * @constructor
         */
        function EventQueue() {
            this.q = [];
            this.add = function (ev) {
                this.q.push(ev);
            };

            var i, j;
            this.call = function () {
                for (i = 0, j = this.q.length; i < j; i++) {
                    this.q[i].call();
                }
            };
        }

        /**
         * @param {HTMLElement} element
         * @param {String}      prop
         * @returns {String|Number}
         */
        function getComputedStyle(element, prop) {
            if (element.currentStyle) {
                return element.currentStyle[prop];
            } else if (window.getComputedStyle) {
                return window.getComputedStyle(element, null).getPropertyValue(prop);
            } else {
                return element.style[prop];
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element.resizedAttached) {
                element.resizedAttached = new EventQueue();
                element.resizedAttached.add(resized);
            } else if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.className = 'resize-sensor';
            var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
            var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

            element.resizeSensor.style.cssText = style;
            element.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + style + '">' + '<div style="' + styleChild + '"></div>' + '</div>' + '<div class="resize-sensor-shrink" style="' + style + '">' + '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' + '</div>';
            element.appendChild(element.resizeSensor);

            if (!{ fixed: 1, absolute: 1 }[getComputedStyle(element, 'position')]) {
                element.style.position = 'relative';
            }

            var expand = element.resizeSensor.childNodes[0];
            var expandChild = expand.childNodes[0];
            var shrink = element.resizeSensor.childNodes[1];
            var shrinkChild = shrink.childNodes[0];

            var lastWidth, lastHeight;

            var reset = function reset() {
                expandChild.style.width = expand.offsetWidth + 10 + 'px';
                expandChild.style.height = expand.offsetHeight + 10 + 'px';
                expand.scrollLeft = expand.scrollWidth;
                expand.scrollTop = expand.scrollHeight;
                shrink.scrollLeft = shrink.scrollWidth;
                shrink.scrollTop = shrink.scrollHeight;
                lastWidth = element.offsetWidth;
                lastHeight = element.offsetHeight;
            };

            reset();

            var changed = function changed() {
                if (element.resizedAttached) {
                    element.resizedAttached.call();
                }
            };

            var addEvent = function addEvent(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            var onScroll = function onScroll() {
                if (element.offsetWidth != lastWidth || element.offsetHeight != lastHeight) {
                    changed();
                }
                reset();
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);
        }

        var elementType = Object.prototype.toString.call(element);
        var isCollectionTyped = '[object Array]' === elementType || '[object NodeList]' === elementType || '[object HTMLCollection]' === elementType || 'undefined' !== typeof jQuery && element instanceof jQuery //jquery
        || 'undefined' !== typeof Elements && element instanceof Elements //mootools
        ;

        if (isCollectionTyped) {
            var i = 0,
                j = element.length;
            for (; i < j; i++) {
                attachResizeEvent(element[i], callback);
            }
        } else {
            attachResizeEvent(element, callback);
        }

        this.detach = function () {
            if (isCollectionTyped) {
                var i = 0,
                    j = element.length;
                for (; i < j; i++) {
                    ResizeSensor.detach(element[i]);
                }
            } else {
                ResizeSensor.detach(element);
            }
        };
    };

    ResizeSensor.detach = function (element) {
        if (element.resizeSensor) {
            element.removeChild(element.resizeSensor);
            delete element.resizeSensor;
            delete element.resizedAttached;
        }
    };

    // make available to common module loader
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = ResizeSensor;
    } else {
        window.ResizeSensor = ResizeSensor;
    }
})();

//# sourceMappingURL=maps/ResizeSensor.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},["./resources/js/main.js"]);