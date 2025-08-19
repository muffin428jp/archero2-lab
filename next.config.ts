import type { NextConfig } from 'next'

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isGithubActions ? '/archero2-lab' : '',
  assetPrefix: isGithubActions ? '/archero2-lab/' : '',
}

export default nextConfig
