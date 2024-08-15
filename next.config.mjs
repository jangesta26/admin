import withBundleAnalyzer from '@next/bundle-analyzer';

// Export the configuration
const nextConfig = {
    basePath: process.env.BASE_PATH || '',
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        JWT_SECRET: process.env.JWT_SECRET,
    },
    images: {
        unoptimized: true,
        domains: ['res.cloudinary.com'], // Add your image domains here
    },
};

// Use bundle analyzer if ANALYZE is set to true
export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig);
