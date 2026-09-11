import { getCurrentUser } from "@/lib/auth-user";

export default async function TestUserPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Authenticated User</h1>

      <p className="mt-4">
        Database ID: {user.id}
      </p>

      <p>
        Name: {user.name}
      </p>

      <p>
        Email: {user.email}
      </p>
    </main>
  );
}