/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/agrupaciones",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
