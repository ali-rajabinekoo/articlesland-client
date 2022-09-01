/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    LOCAL_STORAGE_USER: "USER",
    LOCAL_STORAGE_ACCESS_TOKEN: "ACCESS_TOKEN",
    SERVER_DOMAIN: "http://localhost:8080",
    TIMER: 120000,
    CKEDITOR_LICENSE: "MVQRBU737.KJA526AFJ710"
  }
}

module.exports = nextConfig
