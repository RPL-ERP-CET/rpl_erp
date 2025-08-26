import type { NextConfig } from "next";
// import path from "path";

const nextConfig: NextConfig = {
    // output: "standalone",
    // outputFileTracingRoot: path.join(__dirname, "../../"),
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
};

export default nextConfig;
