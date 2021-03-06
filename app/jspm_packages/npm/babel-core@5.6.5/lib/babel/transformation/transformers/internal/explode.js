/* */ 
"format cjs";
"use strict";

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashLangClone = require("lodash/lang/clone");

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-pre"
};

exports.metadata = metadata;
function buildClone(bindingKey, refKey, check) {
  return function (node) {
    if (node[bindingKey] === node[refKey] || check && check(node)) {
      node[refKey] = t.removeComments((0, _lodashLangClone2["default"])(node[refKey]));
    }
  };
}

function buildListClone(listKey, bindingKey, refKey) {
  var clone = buildClone(bindingKey, refKey);

  return function (node) {
    if (!node[listKey]) return;

    var _arr = node[listKey];
    for (var _i = 0; _i < _arr.length; _i++) {
      var subNode = _arr[_i];
      clone(subNode);
    }
  };
}

var visitor = {
  Property: buildClone("value", "key", function (node) {
    return t.isAssignmentPattern(node.value) && node.value.left === node.key;
  }),
  ExportDeclaration: buildListClone("specifiers", "local", "exported"),
  ImportDeclaration: buildListClone("specifiers", "local", "imported")
};
exports.visitor = visitor;