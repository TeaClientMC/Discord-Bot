import {
	type ChatInputCommandInteraction,
	type Client,
	Events,
} from "discord.js";
import type { Event } from "../@types";

const event: Event = {
	name: Events.InteractionCreate,
	once: true,
	async execute(
		client: Client<true>,
		interaction: ChatInputCommandInteraction,
	) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching the name ${interaction.commandName}.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};

export default event;