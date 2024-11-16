import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Handler } from "./types";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";

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

function loadHandler() {
	const handlersPath = join(__dirname, "./handlers");
	const handlersFiles = readdirSync(handlersPath).filter((file) =>
		file.endsWith(".ts"),
	);
	for (const file of handlersFiles) {
		const filePath = join(handlersPath, file);
		const handler: Handler = require(filePath);
		if ("name" in handler && "execute" in handler) {
			handlers.push(handler);
			console.log(`Loaded the handler ${file}.`);
		} else {
			console.log("name" in handler && "execute" in handler);
			console.error(`Can't load the handler ${file}.`);
		}
	}
	console.log(`Loaded ${handlers.length} handlers.`);
}

function executeHandler(name?: string) {
	for (const handler of handlers) {
		if (name === undefined) handler.execute(client);
		else if (name === handler.name) handler.execute(client);
	}
}

loadHandler();
executeHandler();

client.login(process.env.Token || "");
