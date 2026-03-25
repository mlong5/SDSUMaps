
// Storage for SDSU events across app sessions.
import AsyncStorage from "@react-native-async-storage/async-storage";


export type SDSUEvent = {
  id: number;
  name: string;
  description: string;
  eventTime: string; // HH:MM (24-hour)
  eventDate: string; // YYYY-MM-DD
};

const EVENTS_KEY = "sdsu_events";


export async function initDB(): Promise<void> {
  const existing = await AsyncStorage.getItem(EVENTS_KEY);
  if (existing === null) {
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify([]));
  }
}


export async function getAllEvents(): Promise<SDSUEvent[]> {
  const raw = await AsyncStorage.getItem(EVENTS_KEY);
  if (!raw) return [];
  const events: SDSUEvent[] = JSON.parse(raw);
  // Sort newest first so events[0] in index.tsx is always the latest
  return events.sort((a, b) => b.id - a.id);
}


export async function insertEvent(
  event: Omit<SDSUEvent, "id">
): Promise<SDSUEvent> {
  const existing = await getAllEvents();

  // Generate a unique ID based on current timestamp
  const newId = Date.now();
  const newEvent: SDSUEvent = { id: newId, ...event };

  // Prepend so newest is first
  const updated = [newEvent, ...existing];
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(updated));

  return newEvent;
}


export async function deleteEvent(id: number): Promise<void> {
  const existing = await getAllEvents();
  const filtered = existing.filter((e) => e.id !== id);
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(filtered));
}


export async function clearAllEvents(): Promise<void> {
  await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify([]));
}