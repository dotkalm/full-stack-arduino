import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Updated for Next.js 16 - moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['johnny-five', 'serialport'],
  
  // Add empty turbopack config to silence the webpack warning
  turbopack: {},
  
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle native modules on the server side
      config.externals = config.externals || [];
      config.externals.push({
        'johnny-five': 'commonjs johnny-five',
        'serialport': 'commonjs serialport'
      });
    }
    return config;
  }
};

export default nextConfig;