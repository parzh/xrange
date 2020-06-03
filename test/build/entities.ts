import { resolve } from "path";

export const distPath = resolve(__dirname, "../../dist");

export const entryPath = resolve(distPath, "index.js");

export const bundlePath = resolve(distPath, "xrange.bundle.js");
