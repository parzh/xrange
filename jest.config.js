module.exports = {
	verbose: true,
	preset: "ts-jest",
	rootDir: ".",
	roots: [
		"<rootDir>/test"
	],
	setupFiles: [
	],
	testMatch: [
		"<rootDir>/test/**/*.spec.ts"
	],
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts"
	],
	coverageDirectory: "<rootDir>/coverage",
	cacheDirectory: "<rootDir>/.cache/jest",
	testEnvironment: "node",
	errorOnDeprecated: true
};
