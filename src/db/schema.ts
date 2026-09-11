
import { 
    pgTable,
    uuid,
    text,
    timestamp,
    integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    authId: text("auth_id").notNull().unique(),

    name: text("name"),

    email: text("email").notNull().unique(),

    image: text("image"),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
})

export const activities = pgTable("activities", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),

    name: text("name").notNull(),

    category: text("category").notNull(),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
});

export const goals = pgTable("goals", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),

    title: text("title").notNull(),

    description: text("description"),

    targetMinutes: integer("target_minutes"),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
})

export const timeEntries = pgTable("time_entries", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),

    activityId: uuid("activity_id")
        .references(() => activities.id)
        .notNull(),

    goalId: uuid("goal_id")
        .references(() => goals.id),

    startedAt: timestamp("started_at").notNull(),

    endedAt: timestamp("ended_at"),
    
    durationSeconds: integer("duration_seconds"),
    
    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
})