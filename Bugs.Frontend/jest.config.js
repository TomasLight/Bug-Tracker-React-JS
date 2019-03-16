// import tsjPreset from "ts-jest/presets";
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  // preset: 'ts-jest',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/src/' } ),
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "tests/__mocks__/fileMock.js",
    "\\.(css|less)$": "tests/__mocks__/styleMock.js"
  },
  transform: {
    ...tsjPreset.transform
  }
};