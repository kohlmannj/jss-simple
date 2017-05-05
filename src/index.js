/**
 * Imports
 */

import { create } from 'jss';

/**
 * Constants
 */

const jss = create();
let sheets = [];
let map = {};

/**
 * JSS Simple
 */

function css(style, opts, key) {
  let localKey = key;
  let localOpts = opts;

  if (typeof opts === 'string') {
    localKey = opts;
    localOpts = undefined;
  }

  const sheet = jss.createStyleSheet(style, localOpts);

  if (localKey !== undefined) {
    if (map[localKey] !== undefined) {
      sheets[map[localKey]] = sheet;
      return sheet.classes;
    }

    map[localKey] = sheets.length;
  }

  sheets.push(sheet);
  return sheet.classes;
}

function attach() {
  return sheets.forEach(sheet => sheet.attach());
}

function detach() {
  return sheets.forEach(sheet => sheet.detach());
}

function toString() {
  return sheets.map(sheet => sheet.toString()).join('\n');
}

function use(plugin) {
  jss.use(plugin);
  return { use, toString, attach };
}

function setup(options) {
  jss.setup(options);
  return { use, toString, attach };
}

function clear() {
  sheets = [];
  map = {};
}

/**
 * Exports
 */

export default css;
export { use, setup, toString, attach, detach, clear };
