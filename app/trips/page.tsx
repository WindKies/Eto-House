
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsCLient from "./TripsClient";


const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Không được phép"
          subtitle="Vui lòng hãy đăng nhập."
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Không tìm thấy chuyến đi nào"
          subtitle="Có vẻ như bạn chưa đặt chuyến đi nào."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsCLient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default TripsPage;