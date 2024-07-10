import type {
	ChatInputApplicationCommandData,
	Client,
	Collection,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandBuilder,
} from "discord.js";

export declare type Handler = {
	name: string;
	execute: function;
};

export declare type Event = {
	name: string;
	once: boolean;
	execute: function;
};

export interface SlashCommand extends ChatInputApplicationCommandData {
	data:
		| SlashCommandBuilder
		| SlashCommandOptionsOnlyBuilder
		| SlashCommandSubcommandBuilder;
	execute: (
		client: Client,
		interaction: ChatInputCommandInteraction,
	) => Promise<unknown>;
}

declare module "discord.js" {
	export interface Client {
		commands: Collection<unknown, Command>;
	}
}