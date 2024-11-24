import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Handler, SlashCommand } from "@types";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.AutoModerationExecution,
	],
	partials: [
		Partials.Message,
		Partials.GuildMember,
		Partials.Channel,
		Partials.GuildScheduledEvent,
	],
});

client.commands = new Collection();

// TODO: Fix Handler
const handlers: Handler[] = [];
const sqlite = new Database("sqlite.db");
const db = drizzle({ client: sqlite, schema });

async function loadHandler() {
	const handlersPath = join(__dirname, "./handlers");
	const handlersFiles = readdirSync(handlersPath).filter((file) =>
		file.endsWith(".ts"),
	);

	for (const file of handlersFiles) {
		const filePath = join(handlersPath, file);
		const { default: handler } = (await import(filePath)) as {
			default: Handler;
		};
		if ("name" in handler && "execute" in handler) {
			handlers.push(handler);
			console.log(`Loaded the handler ${file}.`);
		} else {
			console.error(`Can't load the handler ${file}.`);
		}
	}
	console.log(`Loaded ${handlers.length} handlers.`);
}

async function executeHandler(name?: string) {
	for (const handler of handlers) {
		if (name === undefined) await handler.execute(client);
		else if (name === handler.name) await handler.execute(client);
	}
}

await loadHandler();
await executeHandler();

client.login(process.env.Token || "");
declare module "discord.js" {
	export interface Client {
		commands: Collection<unknown, SlashCommand>;
	}
}


export { db };
