/* eslint-disable @typescript-eslint/no-require-imports */
describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should use NEXT_PUBLIC_API_URL when env variable is set', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://test-api.example.com/api';
    
    const config = require('./index').default;
    
    expect(config.apiUrl).toBe('https://test-api.example.com/api');
  });

  it('should use default localhost URL when env variable is not set', () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    
    const config = require('./index').default;
    
    expect(config.apiUrl).toBe('http://localhost:8080/api');
  });

  it('should use default localhost URL when env variable is empty', () => {
    process.env.NEXT_PUBLIC_API_URL = '';
    
    const config = require('./index').default;
    
    expect(config.apiUrl).toBe('http://localhost:8080/api');
  });

  it('should have correct config interface structure', () => {
    const config = require('./index').default;
    
    expect(config).toHaveProperty('apiUrl');
    expect(typeof config.apiUrl).toBe('string');
  });

  it('should handle production API URL format', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.production.com/v1/api';
    
    const config = require('./index').default;
    
    expect(config.apiUrl).toBe('https://api.production.com/v1/api');
    expect(config.apiUrl).toMatch(/^https?:\/\//);
  });

  it('should handle Railway production URL', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://realestatetest-production.up.railway.app/api';
    
    const config = require('./index').default;
    
    expect(config.apiUrl).toBe('https://realestatetest-production.up.railway.app/api');
    expect(config.apiUrl).toContain('railway.app');
  });
});