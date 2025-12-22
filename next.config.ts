import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    }, {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },


    { protocol: 'https', hostname: 'ftp.goit.study', pathname: '/**' },
    { protocol: 'https', hostname: 'ac.goit.global', pathname: '/**' }
    ]
  },
};

export default nextConfig;
