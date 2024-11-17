import {
	foreignKey,
	integer,
	numeric,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").notNull().primaryKey(),
	name: text("name").notNull(),
	invites: integer("invites"),
});

export const invites = sqliteTable("invites", {
	ownerID: integer("owner_id")
		.notNull()
		.references(() => users.id)
		.primaryKey(),
	invitedID: integer("invited_id")
		.notNull()
		.references(() => users.id)
		.primaryKey(),
});

export const moderation = sqliteTable("moderation", {
	guildID: integer("guild_id").notNull().primaryKey(),
	userID: integer("user_id").notNull(),
	reason: text("reason").notNull(),
	type: text("type").notNull(),
});
