/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/dashboard", destination: "/dashboard", permanent: false },
      { source: "/harga", destination: "/pasar", permanent: false },
      { source: "/harga/:symbol", destination: "/pasar/:symbol", permanent: false },
      { source: "/edukasi", destination: "/akademi", permanent: false },
      { source: "/brankas", destination: "/akun/brankas", permanent: false },
      { source: "/settings", destination: "/akun/pengaturan", permanent: false },
    ];
  },
};

export default nextConfig;