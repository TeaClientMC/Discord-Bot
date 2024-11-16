import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { SlashCommand } from "../../types";

const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("hello")
		.setDescription("Replies with Hello!"),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Hello!");
	},
};

export default command;
