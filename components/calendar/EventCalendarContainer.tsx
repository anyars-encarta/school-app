import prisma from "@/prisma";
import EventCalendar from "./EventCalendar"

const EventCalendarContainer = async () => {
    const eventsData = await prisma.event.findMany({});

  return (
        <EventCalendar eventsData={eventsData} />
  )
}

export default EventCalendarContainer