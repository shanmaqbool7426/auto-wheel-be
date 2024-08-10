/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: "res.cloudinary.com"
            // You can add these as well
            // port: '',
            // pathname: 'arifscloud/image/upload/**',
          },
          {
             protocol: 'https',
            hostname: "lh3.googleusercontent.com"
          }
        ],
      },
    async headers() {
      return [
        {   
          source: '/(.*)', // Match all routes
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' }, // Allow requests from any origin
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS' }, // Allow specified HTTP methods
            { key: 'Access-Control-Allow-Headers', value: '*' }, // Allow all headers
          ],
        },
      ];
    },
  };
  
  
export default nextConfig;
  