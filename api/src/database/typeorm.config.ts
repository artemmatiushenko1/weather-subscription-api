// NOTE: this file is only used for managing migrations with typeorm
import { DataSource } from 'typeorm';
import { validateDatabaseConfig } from './database.config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

const postgresConfig = validateDatabaseConfig().postgres;

export default new DataSource({
  type: 'postgres',
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.username,
  password: postgresConfig.password,
  database: postgresConfig.database,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
});
