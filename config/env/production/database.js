module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    version: '10.5',
    connection: {
      host: process.env.DB_HOST,
      port: env.int('DB_PORT', 3306),
      database: env('DB_NAME', 'kophecy'),
      user: env('DB_USERNAME', 'root'),
      password: env('DB_PASSWORD', ''),
      ssl: env.bool('DB_SSL', false),
      options: '--cluster=gray-newfie-3295',
    },
  },
});
