import "dotenv/config";
import knex from "knex";
import knexConfig from "../knexfile";

const environment = process.env.NODE_ENV || "development";
const dbClient = knex(knexConfig[environment]);

// this is a code to handle when the pm2 signals for the app to terminate
// it makes it gracefully terminate
process.on("SIGINT", () => dbClient.destroy(err => process.exit(err ? 1 : 0)));

export default dbClient;
