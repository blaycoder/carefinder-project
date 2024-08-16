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
};

export default nextConfig;
