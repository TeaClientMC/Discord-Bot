import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Client } from "discord.js";
import type { Event, Handler } from "../types";

const handler: Handler = {
	name: "EventHandlers",
	execute(client: Client<true>) {
		const eventsPath = join(__dirname, "../events");
		const eventFiles = readdirSync(eventsPath).filter(
			(file) => file.endsWith(".js") || file.endsWith(".ts"),
		);
		const events: Event[] = [];
		for (const file of eventFiles) {
			const filePath = join(eventsPath, file);
			const event: Event = require(filePath);
			if ("name" in event && "execute" in event) {
				if (event.once) {
					client.once(event.name, (...args) => event.execute(client, ...args));
				} else {
					client.on(event.name, (...args) => event.execute(client, ...args));
				}
				events.push(event);
				console.log(`Loaded the event ${file}.`);
			} else {
				console.error(`Can't load the event ${file}.`);
			}
		}
		console.log(`Loaded ${events.length} events.`);
	},
};

export default handler;