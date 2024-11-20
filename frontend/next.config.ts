import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: false, // disable SWC minifier
  webpack: (config) => {
    if (!config.optimization.minimizer) {
      return config;
    }

    const terser = config.optimization.minimizer.find(
      (minimizer: any) => minimizer.constructor.name === "TerserPlugin"
    );

    if (terser) {
      terser.options.minimizer.options.terserOptions = {
        ...terser.options.minimizer.options.terserOptions,
        output: {
          ascii_only: true,
          comments: false,
        },
        sourceMap: false,
      };
    }

    return config;
  },
};

export default nextConfig;
