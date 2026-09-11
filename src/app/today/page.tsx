import { auth } from "@/auth";

export default async function TodayPage() {
  const session = await auth();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Today
      </h1>

      <p className="mt-4">
        Welcome, {session?.user?.name ?? "User"}
      </p>

      <p className="text-muted-foreground">
        {session?.user?.email}
      </p>
    </main>
  );
}