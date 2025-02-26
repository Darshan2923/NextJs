/**@type {import("drizzle-kit").Config} */
export default {
    schema: "./config/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://byteburst_db_owner:npg_4IiCqdnaSj9K@ep-tight-heart-a95hstei-pooler.gwc.azure.neon.tech/byteburst_db?sslmode=require"
    }
}