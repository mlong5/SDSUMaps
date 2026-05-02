import { Event } from "../components/EventList";

const today = (h: number, m: number) => {
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
};

export const MOCK_EVENTS: Event[] = [
    {
        id: "1",
        title: "Aztec Baseball Club",
        location: "Tony Gwynn Stadium",
        startTime: today(15, 30),
        endTime: today(17, 30),
    },
    {
        id: "2",
        title: "Aztec Game Lab",
        location: "Storm Hall West 111",
        startTime: today(14, 0),
        endTime: today(17, 0),
    },
    {
        id: "3",
        title: "CS Club Meeting",
        location: "Engineering Building 250",
        startTime: today(17, 0),
        endTime: today(18, 0),
    },
    {
        id: "4",
        title: "Study Abroad Info Session",
        location: "Student Union 302",
        startTime: today(12, 0),
        endTime: today(13, 0),
    },
    {
        id: "5",
        title: "SDSU Farmers Market",
        location: "Conrad Prebys Aztec Student Union",
        startTime: today(10, 0),
        endTime: today(14, 0),
    },
];
