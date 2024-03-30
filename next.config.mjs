/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  redirects: async () => {
    return [
      { source: "/", destination: "/chatbot-flow", permanent: false },
    ]
  },
};

export default nextConfig;
