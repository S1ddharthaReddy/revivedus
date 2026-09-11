import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
    const session = await auth();

    if(!session?.user?.email){
        return null;
    }

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

    if (existingUser.length > 0) {
        return existingUser[0];
        }

    const newUser = await db
        .insert(users)
        .values({
            authId: session.user.email,
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
        })
        .returning();

    return newUser[0];
}