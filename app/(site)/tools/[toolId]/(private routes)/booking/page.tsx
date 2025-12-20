import ToolBookingClientPage from "./ToolBooking.client";

type BookingPageProps = {
  params: { toolId: string };
};

export default function Page({ params }: BookingPageProps) {
  return <ToolBookingClientPage params={params} />;
}
