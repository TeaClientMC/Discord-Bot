import type {
	ChatInputCommandInteraction,
	Client,
    ClientEvents,
	Interaction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandBuilder,
} from "discord.js";

export declare type Handler = {
	name: string;
	execute: (client: Client<boolean>) => Promise<void>;
};

export declare type Event = {
	name: string;
	once?: boolean;
	execute: (...args: ClientEvents[E]) => void;
};

export declare interface SlashCommand {
	data: SlashCommandBuilder
	| SlashCommandOptionsOnlyBuilder
	| SlashCommandSubcommandBuilder
	execute: (client: Client, interaction: ChatInputCommandInteraction) => Promise<unknown>
}