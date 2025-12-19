import { Metadata } from "next";
import { getServerSession } from "next-auth";
import UserProfile from "../../../../components/profile/UserProfile";
import ToolsGrid from "../../../../components/profile/ToolsGrid";
import ProfilePlaceholder from "../../../../components/profile/ProfilePlaceholder";
import { authOptions } from "@/lib/auth";
import { getUserById, getUserTools} from "@/lib/api/serverApi";

type Props = {
  params: { userId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUserById(params.userId);

  return {
    title: `${user.name} | Профіль`,
    description: `Профіль користувача ${user.name}`,
    openGraph: {
      title: `${user.name} | Профіль`,
      description: `Профіль користувача ${user.name}`,
      url: `/profile/${params.userId}`,
      type: "profile",
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const user = await getUserById(params.userId);
  const tools = await getUserTools(params.userId);

  const hasTools = tools.length > 0;

    const isOwner = session?.user?.id === params.userId;

  return (
    <main>
      <UserProfile user={user} isOwner={isOwner} />

      {hasTools ? (
        <ToolsGrid tools={tools} />
      ) : (
        <ProfilePlaceholder isOwner={isOwner} />
      )}
    </main>
  );
}
