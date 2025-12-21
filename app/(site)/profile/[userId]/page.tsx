import { Metadata } from "next";
import css from './Profile.module.css';
import UserProfile from "../../../../components/profile/UserProfile";
import ToolsGrid from "../../../../components/profile/ToolsGrid";
import ProfilePlaceholder from "../../../../components/profile/ProfilePlaceholder";
import { getUserById, getUserTools } from "@/lib/api/serverApi";
import FeedbacksBlock from "@/components/home/Feedbacks/FeedbacksBlock";
import { getServerSession } from "next-auth";

type Props = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;
 
  let user: { name: string; avatar?: string } = { name: "Користувач" }; 

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

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params;
  let user: { name: string; avatar?: string } | null = null;
  let tools: any[] = [];

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
  const session = await getServerSession();
const isOwner = session?.user?.id === userId;

  return (
    <div className="container">
            <UserProfile user={user} userId={userId} containerClassName={css.profileContainer} />
      {hasTools ? (
        <ToolsGrid tools={tools} />
      ) : (
        <ProfilePlaceholder userId={userId} />
      )}
      <FeedbacksBlock userId={userId} isOwner={isOwner} />
    </div>
  );
}
