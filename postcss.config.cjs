module.exports = {
	plugins: [
		require("autoprefixer")({
			overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"]
		}),
		require("tailwindcss")
	]
};