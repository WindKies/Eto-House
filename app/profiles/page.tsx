import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfilesClient from "./ProfilesClient";

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Không được phép"
      subtitle="Vui lòng hãy đăng nhập"
    />
  }
  if (currentUser) {
    return (
      <ClientOnly>
         <ProfilesClient
         currentUser={currentUser}
      />
      </ClientOnly>
    );
  }
}
 
export default ProfilePage;