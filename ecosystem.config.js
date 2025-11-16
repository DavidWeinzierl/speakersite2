module.exports = {
  apps: [
    {
      name: 'speakersite2',
      script: 'server/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        SERVE_STATIC: 'true'
        // Other env vars are read from the system environment or .env via dotenv
      }
    }
  ]
};
