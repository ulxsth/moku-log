import fs from "fs";
import { pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf8"));

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>/" })
};