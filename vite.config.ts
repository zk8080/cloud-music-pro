import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteEslint from "vite-plugin-eslint";
import viteStylelint from "vite-plugin-stylelint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), viteEslint(), viteStylelint()]
});
