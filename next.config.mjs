/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/learn',
                destination: '/academy',
                permanent: true,
            },
            {
                source: '/04-STATISTICS-TOOLS/:path*',
                destination: '/workspace/:path*',
                permanent: false,
            }
        ];
    },
};

export default nextConfig;
