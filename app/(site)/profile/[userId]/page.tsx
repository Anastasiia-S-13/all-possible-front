import { Metadata } from "next";
import UserProfile from "../../../../components/profile/UserProfile";
import ToolsGrid from "../../../../components/profile/ToolsGrid";
import ProfilePlaceholder from "../../../../components/profile/ProfilePlaceholder";
import { getUserById, getUserTools } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;
  const user = await getUserById(userId);

  return {
    title: `${user.name} | Профіль`,
    description: `Профіль користувача ${user.name}`,
    openGraph: {
      title: `${user.name} | Профіль`,
      description: `Профіль користувача ${user.name}`,
      url: `/profile/${userId}`,
      type: "profile",
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params;
  const user = await getUserById(userId);
  const tools = await getUserTools(userId);

  const hasTools = tools.length > 0;

  return (
    <main>
      <UserProfile user={user} userId={userId} />

      {hasTools ? (
        <ToolsGrid tools={tools} />
      ) : (
        <ProfilePlaceholder userId={userId} />
      )}
    </main>
  );
}
