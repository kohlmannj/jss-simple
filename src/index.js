/**
 * Imports
 */

import { create } from 'jss';
import preset from 'jss-preset-default';

/**
 * Constants
 */

let jss = create(preset());
let sheets = [];
let map = {};

/**
 * JSS Simple
 */

const defaultOpts = {
  meta: 'jss-simple'
};

function css(style, opts, key) {
  let localKey = key;
  let localOpts;

  if (typeof opts === 'object' && opts !== null) {
    // Merge with defaultOpts
    localOpts = {
      ...defaultOpts,
      ...opts
    };
  }

  else if (typeof opts === 'string') {
    localKey = opts;
    localOpts = defaultOpts;
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

function clear() {
  sheets = [];
  map = {};
}

/**
 * Exports
 */

export default css;
export { use, toString, attach, detach, clear };
