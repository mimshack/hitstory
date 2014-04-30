/**
 * @file
 * This file contains a redirect that will be run as soon as the page get's loaded.
 * Ideally it will run before any content is displayed.
 *
 * @see html.tpl.php
 */

var redirectURI,
redirectBase = '/',
redirectHash = '#path=';

if (location.hash.indexOf(redirectHash) !== -1) {
  var newURI = redirectBase + location.hash.replace(redirectHash, '');
  location.href = newURI;
}
