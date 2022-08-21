/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LOCAL_STORAGE_USER: "USER",
    SESSION_STORAGE_ACCESS_TOKEN: "ACCESS_TOKEN"
  }
}

module.exports = nextConfig
