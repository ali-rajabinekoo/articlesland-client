/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LOCAL_STORAGE_USER: "USER",
    LOCAL_STORAGE_ACCESS_TOKEN: "ACCESS_TOKEN",
    LOCAL_STORAGE_REFRESH_TOKEN: "REFRESH_TOKEN",
    SERVER_DOMAIN: "http://localhost:8080",
    CLIENT_DOMAIN: "http://localhost:3000",
    TIMER: 120000,
    CACHE_TIMER: 1000 * 60 * 3 + 100, // 3 minutes and 100 second
    CKEDITOR_LICENSE: "MVQRBU737.KJA526AFJ710"
  }
}

module.exports = nextConfig
