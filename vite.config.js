import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
    ],
    server: {
        port: 8081,  // or any port you prefer: 3000, 5173, 5174, etc.
        host: true   // optional: allows access from network
    }

});