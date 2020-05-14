import { existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

/** @private */
const webBundlePath = resolve(__dirname, "../dist/xrange.bundle.js");

/** @private */
const BUNDLE_SCRIPT_ID = "xrange-bundle";

/** @private */
function loadBundle(): void {
	if (document.getElementById(BUNDLE_SCRIPT_ID))
		return;

	if (!existsSync(webBundlePath))
		execSync("npm run build:web", { timeout: 10000, stdio: "ignore" });

	require(webBundlePath);
}

main: {
	if (typeof window !== "undefined")
		loadBundle();
}
