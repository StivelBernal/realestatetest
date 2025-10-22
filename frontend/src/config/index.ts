interface Config {
  apiUrl: string;
}

const config: Config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
} as const;

export default config;