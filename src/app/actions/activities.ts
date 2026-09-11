"use server";

import { db } from "@/db";
import { activities } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth-user";
import { and, eq } from "drizzle-orm";
import { z } from "zod";


const activitySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Activity name is required")
        .max(50, "Activity name is too long"),

    category: z
        .string()
        .trim()
        .min(1, "Category is required")
        .max(30, "Category is too long"),
});

export async function createActivity(
    name: string,
    category: string
) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const validated = activitySchema.safeParse({
        name,
        category,
    });

    if (!validated.success) {
        throw new Error("Invalid activity data");
    }

    const [activity] = await db
        .insert(activities)
        .values({
            userId: user.id,
            name: validated.data.name,
            category: validated.data.category,
        })
        .returning();

    return activity;
}

export async function getActivities() {
    const user = await getCurrentUser();

    if(!user) {
        throw new Error("Unauthorized");
    }

    return await db
        .select()
        .from(activities)
        .where(eq(activities.userId, user.id));
}

export async function deleteActivity(id: string) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    await db
        .delete(activities)
        .where(
            and(
                eq(activities.id, id),
                eq(activities.userId, user.id)
            )
        );
}

export async function updateActivity(
    id: string,
    name: string,
    category: string
) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const validated = activitySchema.safeParse({
        name,
        category,
    });

    if (!validated.success) {
        throw new Error("Invalid activity data");
    }

    const [activity] = await db
        .update(activities)
        .set({
            name: validated.data.name,
            category: validated.data.category,
        })
        .where(
            and(
                eq(activities.id, id),
                eq(activities.userId, user.id)
            )
        )
        .returning();

    return activity;
}