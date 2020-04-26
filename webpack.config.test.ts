import { resolve } from "path";
import { smart as merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import prod from "./webpack.config.prod";

/** @public */
const config = merge(prod, {
	plugins: [
		new HtmlWebpackPlugin({
			inject: "head",
			template: resolve(__dirname, "test/web/template.html"),
		}),
	],
	output: {
		path: resolve(__dirname, "test/web"),
	},
});

export default config;
