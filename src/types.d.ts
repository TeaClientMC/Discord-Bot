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
	execute: (client: Client<true>) => Promise<void>;
};

export declare type Event = {
	name: string;
	once: boolean;
	execute: function;
};

export declare interface SlashCommand {
	data:
		| SlashCommandBuilder
		| SlashCommandOptionsOnlyBuilder
		| SlashCommandSubcommandBuilder;
	execute: (client: Client, interaction: Promise<unknown>) => Promise<unknown>;
}

export declare type SlashCommandType = {
	data:
		| SlashCommand
		| SlashCommandOptionsOnlyBuilder
		| SlashCommandSubcommandBuilder;
	execute: function;
};

declare module "discord.js" {
	export interface Client {
		commands: Collection<unknown, Command>;
	}
}
