import type {
	ChatInputApplicationCommandData,
	ChatInputCommandInteraction,
	Client,
	Collection,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandBuilder,
	CommandInteraction
} from "discord.js";

export declare type Handler = {
	name: string;
	execute: Function;
};

export declare type Event = {
	name: string;
	once: boolean;
	execute: Function;
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

type Command = unknown;

declare module "discord.js" {
	export interface Client {
		commands: Collection<unknown, Command>;
	}
}