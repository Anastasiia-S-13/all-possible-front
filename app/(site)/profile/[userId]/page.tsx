import { Metadata } from "next";
import css from "./Profile.module.css";
import UserProfile from "../../../../components/profile/UserProfile";
import ProfilePlaceholder from "../../../../components/profile/ProfilePlaceholder";
import { getUserById, getUserTools } from "@/lib/api/serverApi";
import FeedbacksBlock from "@/components/home/Feedbacks/FeedbacksBlock";
import { User } from "@/types/User";
import { Tool } from "@/types/Tool";
import ToolsGridProfile from "../../../../components/profile/ToolsGridProfile";

type ProfilePageProps = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { userId } = await params;

  let user: User = { _id: "", name: "Користувач", email: "" };

  try {
    const fetchedUser = await getUserById(userId);
    if (fetchedUser) {
      user = fetchedUser;
    }
  } catch (error) {
    console.error("Не вдалося отримати користувача:", error);
  }

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

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  let user: User | null = null;
  let tools: Tool[] = [];

  try {
    user = await getUserById(userId);
    tools = await getUserTools(userId);
  } catch (error) {
    console.error("Не вдалося отримати користувача або інструменти:", error);
  }

  if (!user) {
    return <ProfilePlaceholder userId={userId} />;
  }

  const hasTools = tools.length > 0;

  return (
    <div className="container">
      <UserProfile
        user={user}
        userId={userId}
        containerClassName={css.profileContainer}
      />
      {hasTools ? (
        <ToolsGridProfile tools={tools} ownerId={userId} />
      ) : (
        <ProfilePlaceholder userId={userId} />
      )}
      <FeedbacksBlock userId={userId} />
    </div>
  );
}
