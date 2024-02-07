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
        destination: "/semifinal",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
