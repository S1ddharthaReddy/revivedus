"use client";

import { useState } from "react";
import { createActivity } from "@/app/actions/activities";

export default function ActivityForm() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (!name.trim() || !category.trim()) {
            return;
        }

        await createActivity(name, category);

        setName("");
        setCategory("");

        window.location.reload();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-lg border p-6"
        >
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Activity name"
                className="w-full rounded-md border p-3"
            />

            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full rounded-md border p-3"
            />

            <button
                type="submit"
                className="rounded-md bg-black px-5 py-3 text-white"
            >
                Add Activity
            </button>
        </form>
    );
}