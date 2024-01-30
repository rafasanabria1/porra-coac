/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/semifinales",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
