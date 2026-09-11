import { getActivities } from "@/app/actions/activities";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ActivityForm from "./activity-form";
import ActivityCard from "./activity-card";

export default async function ActivitiesPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const activities = await getActivities();

    return (
        <main className="mx-auto max-w-4xl p-8">
            <h1 className="text-3xl font-bold">
                Activities
            </h1>

            <p className="mt-2 text-muted-foreground">
                Things you spend your time doing.
            </p>

            <ActivityForm />

            <div className="mt-8 space-y-3">
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                    />
                ))}
            </div>
        </main>
    );
}