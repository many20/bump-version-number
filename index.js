"use strict";

const fs = require("fs");
const path = require("path");
const semver = require("semver");

/**
 * BumpVersion class to handle version bumping using semantic versioning.
 * It allows incrementing major, minor, and patch versions, as well as setting a specific version.
 *
 * @class BumpVersion
 * @property {semver.SemVer}
 * @param {string} version - The initial version to start with.
 * @throws {Error} If the provided version is not valid.
 */
class BumpVersion {
  version;

  constructor(version) {
    if (semver.valid(version)) {
      this.version = new semver.SemVer(version);
    } else {
      throw new Error("Version " + version + " not valid.");
    }
  }

  major() {
    // this.version.major++;
    // this.version.minor = 0;
    // this.version.patch = 0;
    this.version = this.version.inc("major");

    return this;
  }

  minor() {
    // this.version.minor++;
    // this.version.patch = 0;
    this.version = this.version.inc("minor");
    return this;
  }

  patch() {
    // this.version.patch++;
    this.version = this.version.inc("patch");
    return this;
  }

  build() {
    this.version = this.version.inc("prerelease", "build");
    return this;
  }

  setVersion(version) {
    if (semver.valid(version)) {
      this.version = new semver.SemVer(version);
    } else {
      throw new Error("Version " + version + " not valid.");
    }
  }

  toString() {
    return this.version.toString();
  }
}

function loadJSON(fileNamePath) {
  const filePath = path.resolve(fileNamePath);
  //const json = require(filePath);
  const json = JSON.parse(fs.readFileSync(filePath).toString());
  return json;
}

function saveJSON(fileNamePath, json) {
  const filePath = path.resolve(fileNamePath);
  try {
    fs.chmodSync(filePath, 0o777);
  } catch (err) {
    console.log(err);
  }
  fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
}

// function versionBump(
//   version,
//   { release = "prerelease", identifierBase = "build", metaData } = {}
// ) {
//   let result = semver.inc(version, release, identifierBase);
//   result = metaData ? `${result}+${metaData}` : result;

//   return result;
// }

// /**
//  * Creates a task to bump the version in a JSON file.
//  */
// function versionBumpTask(
//   fileNamePath,
//   {
//     key = "version",
//     release = "prerelease",
//     identifierBase = "build",
//     metaData,
//   } = {}
// ) {
//   const json = loadJSON(fileNamePath);

//   const versionData = semver.parse(json[key]);
//   if (!versionData) {
//     throw new Error("Invalid version");
//   }

//   const version = versionBump(versionData, {
//     release,
//     identifierBase,
//     metaData,
//   });

//   json[key] = version;

//   saveJSON(fileNamePath, json);
// }

module.exports = { BumpVersion, loadJSON, saveJSON };
