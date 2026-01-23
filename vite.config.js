import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
    ],
    server: {
        proxy: {
            "/api": {
                target: "https://api.everysport.com",
                changeOrigin: true,
                secure: true,
                rewrite: (p) =>
                    p.startsWith("/api") ? "/v1" + p.slice(4) : p,
            },
        },
    },
});
