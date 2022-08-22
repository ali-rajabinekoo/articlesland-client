/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LOCAL_STORAGE_USER: "USER",
    SESSION_STORAGE_ACCESS_TOKEN: "ACCESS_TOKEN",
    SERVER_DOMAIN: "http://localhost:8080/",
    TIMER: 120000
  }
}

module.exports = nextConfig
