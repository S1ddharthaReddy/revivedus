"use client";

import { useState } from "react";
import {
    deleteActivity,
    updateActivity,
} from "@/app/actions/activities";

type Activity = {
    id: string;
    name: string;
    category: string;
};

export default function ActivityCard({
    activity,
}: {
    activity: Activity;
}) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(activity.name);
    const [category, setCategory] = useState(activity.category);

    async function handleUpdate() {
        if (!name.trim() || !category.trim()) {
            return;
        }

        await updateActivity(
            activity.id,
            name,
            category
        );

        setEditing(false);
        window.location.reload();
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            `Delete "${activity.name}"?`
        );

        if (!confirmed) {
            return;
        }

        await deleteActivity(activity.id);

        window.location.reload();
    }

    if (editing) {
        return (
            <div className="rounded-lg border p-4 space-y-3">
                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="w-full rounded-md border p-2"
                />

                <input
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="w-full rounded-md border p-2"
                />

                <div className="flex gap-2">
                    <button
                        onClick={handleUpdate}
                        className="rounded-md bg-black px-4 py-2 text-white"
                    >
                        Save
                    </button>

                    <button
                        onClick={() => setEditing(false)}
                        className="rounded-md border px-4 py-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">
                        {activity.name}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {activity.category}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setEditing(true)}
                        className="rounded-md border px-3 py-1"
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleDelete}
                        className="rounded-md border px-3 py-1"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}