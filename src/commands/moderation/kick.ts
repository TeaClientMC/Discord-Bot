import {
	ChatInputCommandInteraction,
	User,
	Client,
	SlashCommandBuilder,
	PermissionsBitField,
	EmbedBuilder,
} from "discord.js";
import type { SlashCommand } from "../../types";
import { db } from "../../index";
import { moderation } from "../../schema";
const command: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Kicks a member")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user you want to kick")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("This is the reason for kicking the user")
				.setRequired(false),
		),
	async execute(client: Client, interaction: ChatInputCommandInteraction) {
		if (
			!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
		) {
			return await interaction.reply({
				content: "You don't have the permission to warn people!",
				ephemeral: true,
			});
		}
		const { options, user, guildID } = interaction;
		const target = options.getUser("user");
		const reason = options.getString("reason") || "No reason given";
		const guildName: string = interaction.guild.name;
		try {
			db.insert(moderation).values({
				guildID,
				userID: user.id,
				reason,
				type: "kick",
			});

			const targetembed = new EmbedBuilder()
				.setColor("Red")
				.setDescription(
					`:x: You have been **Kicked** in ${guildname} for ${reason}`,
				);

			target.send({ embeds: [targetembed] }).catch((err) => {
				const senderrorembed = new EmbedBuilder()
					.setColor("Red")
					.setDescription(
						"The dm has not been sent because the person has their dm off or has blocked me!",
					);
				interaction.reply({ embeds: [senderrorembed] });
				return;
			});

			const embed = new EmbedBuilder()
				.setColor("Green")
				.setDescription(
					`:white_check_mark: ${target} has been **Kicked** | ${reason}`,
				);

			interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.log(
				`Error eccured while kicking, | input: ${userID} ${reason} | error: ${error}`,
			);
		}
	},
};

export default command;
