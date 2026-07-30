import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Gear photos are arbitrary URLs entered by providers, so we allow any
    // https host rather than an allow-list of specific domains.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
