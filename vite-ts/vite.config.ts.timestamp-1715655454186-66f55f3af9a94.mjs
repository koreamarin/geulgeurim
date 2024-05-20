// vite.config.ts
import path from "path";
import { defineConfig } from "file:///C:/ssafy/S10P31C108/FE/S10P31C108/vite-ts/node_modules/vite/dist/node/index.js";
import react from "file:///C:/ssafy/S10P31C108/FE/S10P31C108/vite-ts/node_modules/@vitejs/plugin-react-swc/index.mjs";
import checker from "file:///C:/ssafy/S10P31C108/FE/S10P31C108/vite-ts/node_modules/vite-plugin-checker/dist/esm/main.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"'
      },
      overlay: {
        initialIsOpen: false
      }
    })
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), "node_modules/$1")
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), "src/$1")
      }
    ]
  },
  server: {
    port: 3e3
  },
  preview: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxzc2FmeVxcXFxTMTBQMzFDMTA4XFxcXEZFXFxcXFMxMFAzMUMxMDhcXFxcdml0ZS10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcc3NhZnlcXFxcUzEwUDMxQzEwOFxcXFxGRVxcXFxTMTBQMzFDMTA4XFxcXHZpdGUtdHNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3NzYWZ5L1MxMFAzMUMxMDgvRkUvUzEwUDMxQzEwOC92aXRlLXRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcclxuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjaGVja2VyKHtcclxuICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcclxuICAgICAgZXNsaW50OiB7XHJcbiAgICAgICAgbGludENvbW1hbmQ6ICdlc2xpbnQgXCIuL3NyYy8qKi8qLntqcyxqc3gsdHMsdHN4fVwiJyxcclxuICAgICAgfSxcclxuICAgICAgb3ZlcmxheToge1xyXG4gICAgICAgIGluaXRpYWxJc09wZW46IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogL15+KC4rKS8sXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnbm9kZV9tb2R1bGVzLyQxJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAvXnNyYyguKykvLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy8kMScpLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICB9LFxyXG4gIHByZXZpZXc6IHtcclxuICAgIHBvcnQ6IDMwMDAsXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVQsT0FBTyxVQUFVO0FBQzFVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFJcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssS0FBSyxRQUFRLElBQUksR0FBRyxpQkFBaUI7QUFBQSxNQUN6RDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLFFBQVE7QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
