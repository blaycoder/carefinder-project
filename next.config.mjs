/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SEO support
  // Enable Material UI support
  experimental: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/hospitals/:id",
        destination: "/hospitals/[id]",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/register",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
        ],
      },
    ];
  },
};

export default nextConfig;
