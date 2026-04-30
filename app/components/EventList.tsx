import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export type Event = {
    id: string;
    title: string;
    location: string;
    startTime: Date;
    endTime: Date;
};

type Props = {
    events: Event[];
    loading?: boolean;
};

const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const EventCard = ({ item }: { item: Event }) => (
    <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.time}>
            {formatTime(item.startTime)} – {formatTime(item.endTime)}
        </Text>
    </View>
);

export default function EventList({ events, loading = false }: Props) {
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="small" color="#CC0033" />
            </View>
        );
    }

    if (events.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.empty}>No events right now.</Text>
            </View>
        );
    }

    const sorted = [...events].sort(
        (a, b) => a.startTime.getTime() - b.startTime.getTime()
    );

    return (
        <FlatList
            data={sorted}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "darkgray",
        borderRadius: 5,
        padding: 8,
    },
    title: {
        fontWeight: "600",
        fontSize: 14,
    },
    location: {
        fontSize: 11,
        color: "#222",
        marginTop: 1,
    },
    time: {
        fontSize: 11,
        color: "#333334",
        marginTop: 2,
    },
    separator: {
        height: 6,
    },
    center: {
        paddingVertical: 20,
        alignItems: "center",
    },
    empty: {
        color: "#555",
        fontSize: 13,
    },
});
