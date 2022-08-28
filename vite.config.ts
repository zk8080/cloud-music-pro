import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import viteEslint from "vite-plugin-eslint";
import viteStylelint from "vite-plugin-stylelint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteEslint(), viteStylelint(), svgr()],
	resolve: {
		alias: {
			"@assets": path.join(__dirname, "./src/assets")
		}
	}
});
