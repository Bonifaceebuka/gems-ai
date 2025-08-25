import { DataSource } from "typeorm";
import { CONFIGS } from ".";
const { DATABASE } = CONFIGS;
const isCompiled = __filename.endsWith(".js");

export const dataSource = new DataSource({
    type: "postgres",
    host: DATABASE.HOST,
    port: Number(DATABASE.PORT),
    username: DATABASE.USERNAME,
    password: DATABASE.PASSWORD,
    database: DATABASE.DATABASE,
    entities: [isCompiled ? "dist/models/**/*.js" : "src/models/**/*.ts"],
    migrations: [isCompiled ? "dist/migrations/**/*.js" : "src/migrations/**/*.ts"],
    synchronize: false,
    logging: false,
});

export const postgresLoader = async () => {
    await dataSource.initialize()
        .then(() => console.log("✅ Connected to PostgreSQL database"))
        .catch((err) => console.error(`❌ Database connection error: ${err}`));
};
