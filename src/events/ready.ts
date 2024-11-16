import { type Client, Events } from "discord.js";
import type { Event } from "../@types";

const event: Event = {
	name: Events.ClientReady,
	once: true,
	async execute(client: Client<true>) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

export default event;
