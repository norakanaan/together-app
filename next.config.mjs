const nextConfig = {
  reactStrictMode: true,
  // The in-app preview uses 127.0.0.1 while Next serves from localhost.
  // Allow the dev client/HMR resources so interactive React handlers load.
  allowedDevOrigins: ['127.0.0.1'],
};
export default nextConfig;
