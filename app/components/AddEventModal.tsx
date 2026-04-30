// Polished Add Event modal: labeled fields, inline validation, double-submit
// guard, unmount-safe async, success/failure feedback. addEvent is stubbed
// here until Brandon's eventService.ts lands; swap addEventStub for the real
// import when it does.
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { colors, radius, spacing, tap, typography } from "../constants/theme";

export type EventInput = {
  title: string;
  description: string;
  location: string;
  clubName: string;
  startDate: string;
  endDate: string;
};

type FieldErrors = Partial<Record<keyof EventInput, string>>;

const EMPTY_FORM: EventInput = {
  title: "",
  description: "",
  location: "",
  clubName: "",
  startDate: "",
  endDate: "",
};

// Accepts ISO-like "YYYY-MM-DDTHH:MM" (24-hour). Returns Date on valid input,
// null otherwise. Brandon's branch can replace this with a date picker later.
function parseDate(s: string): Date | null {
  const re = /^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d$/;
  if (!re.test(s)) return null;
  const d = new Date(`${s}:00`);
  return isNaN(d.getTime()) ? null : d;
}

function validate(form: EventInput): FieldErrors {
  const errors: FieldErrors = {};
  const title = form.title.trim();
  if (!title) errors.title = "Required";
  else if (title.length > 80) errors.title = "Max 80 characters";

  const description = form.description.trim();
  if (!description) errors.description = "Required";
  else if (description.length > 500) errors.description = "Max 500 characters";

  if (!form.location.trim()) errors.location = "Required";

  const club = form.clubName.trim();
  if (!club) errors.clubName = "Required";
  else if (club.length > 60) errors.clubName = "Max 60 characters";

  const start = parseDate(form.startDate);
  if (!form.startDate.trim()) errors.startDate = "Required";
  else if (!start) errors.startDate = "Use YYYY-MM-DDTHH:MM";
  else if (start.getTime() < Date.now()) errors.startDate = "Must be in the future";

  const end = parseDate(form.endDate);
  if (!form.endDate.trim()) errors.endDate = "Required";
  else if (!end) errors.endDate = "Use YYYY-MM-DDTHH:MM";
  else if (start && end && end.getTime() <= start.getTime()) errors.endDate = "Must be after start";

  return errors;
}

// TODO(brandon): replace with real addEvent() from app/services/eventService.ts.
async function addEventStub(_payload: EventInput): Promise<string> {
  await new Promise((r) => setTimeout(r, 600));
  return `stub-${Date.now()}`;
}

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AddEventModal({ visible, onClose }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [form, setForm] = useState<EventInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Avoid setState after unmount when the user dismisses mid-submit.
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  function update<K extends keyof EventInput>(key: K, value: EventInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear that field's error as soon as the user types again.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function reset() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitAttempted(false);
  }

  function handleCancel() {
    if (submitting) return;
    reset();
    onClose();
  }

  async function handleSubmit() {
    if (submitting) return;
    setSubmitAttempted(true);
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      await addEventStub(form);
      if (!mountedRef.current) return;
      Alert.alert("Event added", "Your event has been posted.");
      reset();
      onClose();
    } catch (e: unknown) {
      if (!mountedRef.current) return;
      const msg = e instanceof Error ? e.message : String(e);
      Alert.alert("Could not add event", msg);
    } finally {
      if (mountedRef.current) setSubmitting(false);
    }
  }

  // Borders go red only after an attempted submit, so users aren't yelled
  // at while still filling in the form.
  function showError(key: keyof EventInput): boolean {
    return submitAttempted && !!errors[key];
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleCancel}
      supportedOrientations={[
        "portrait",
        "portrait-upside-down",
        "landscape",
        "landscape-left",
        "landscape-right",
      ]}
    >
      <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: "center", alignItems: "center", padding: spacing.lg }}>
        <View
          style={{
            width: "100%",
            maxWidth: 480,
            maxHeight: isLandscape ? height * 0.9 : height * 0.85,
            backgroundColor: colors.white,
            borderRadius: radius.lg,
            paddingTop: spacing.lg,
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.md,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md }}>
            <Text style={{ ...typography.h2, color: colors.neutral900 }}>Add Event</Text>
            <Pressable
              onPress={handleCancel}
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              disabled={submitting}
              style={{
                width: tap.minSize,
                height: tap.minSize,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: radius.pill,
                opacity: submitting ? 0.4 : 1,
              }}
            >
              <Text style={{ ...typography.h2, color: colors.neutral600 }}>×</Text>
            </Pressable>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{ marginBottom: spacing.md }}
            contentContainerStyle={{ paddingBottom: spacing.sm }}
          >
            <Field
              label="Title"
              value={form.title}
              onChange={(v) => update("title", v)}
              placeholder="e.g. Aztec Baseball Club practice"
              error={showError("title") ? errors.title : undefined}
              maxLength={80}
            />
            <Field
              label="Description"
              value={form.description}
              onChange={(v) => update("description", v)}
              placeholder="What's happening?"
              error={showError("description") ? errors.description : undefined}
              maxLength={500}
              multiline
            />
            <Field
              label="Location"
              value={form.location}
              onChange={(v) => update("location", v)}
              placeholder="e.g. Tony Gwynn Stadium"
              error={showError("location") ? errors.location : undefined}
            />
            <Field
              label="Club name"
              value={form.clubName}
              onChange={(v) => update("clubName", v)}
              placeholder="e.g. Baseball Club"
              error={showError("clubName") ? errors.clubName : undefined}
              maxLength={60}
            />
            <Field
              label="Starts"
              value={form.startDate}
              onChange={(v) => update("startDate", v)}
              placeholder="2026-05-10T14:30"
              hint="YYYY-MM-DDTHH:MM (24-hour)"
              error={showError("startDate") ? errors.startDate : undefined}
              autoCapitalize="none"
            />
            <Field
              label="Ends"
              value={form.endDate}
              onChange={(v) => update("endDate", v)}
              placeholder="2026-05-10T16:00"
              hint="YYYY-MM-DDTHH:MM (24-hour)"
              error={showError("endDate") ? errors.endDate : undefined}
              autoCapitalize="none"
            />
          </ScrollView>

          <View style={{ flexDirection: "row", gap: spacing.md }}>
            <Pressable
              onPress={handleCancel}
              disabled={submitting}
              accessibilityRole="button"
              accessibilityLabel="Cancel and close"
              style={({ pressed }) => ({
                flex: 1,
                minHeight: tap.minSize,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: colors.neutral300,
                backgroundColor: pressed ? colors.neutral100 : colors.white,
                alignItems: "center",
                justifyContent: "center",
                opacity: submitting ? 0.5 : 1,
              })}
            >
              <Text style={{ ...typography.button, color: colors.neutral700 }}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              disabled={submitting}
              accessibilityRole="button"
              accessibilityLabel="Submit new event"
              accessibilityState={{ busy: submitting, disabled: submitting }}
              style={({ pressed }) => ({
                flex: 1,
                minHeight: tap.minSize,
                borderRadius: radius.md,
                backgroundColor: submitting
                  ? colors.scarletDark
                  : pressed
                    ? colors.scarletDark
                    : colors.scarlet,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: spacing.sm,
              })}
            >
              {submitting && <ActivityIndicator color={colors.scarletInk} />}
              <Text style={{ ...typography.button, color: colors.scarletInk }}>
                {submitting ? "Adding…" : "Add Event"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

function Field({ label, value, onChange, placeholder, hint, error, multiline, maxLength, autoCapitalize }: FieldProps) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={{ ...typography.caption, color: colors.neutral700, marginBottom: spacing.xs }}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral500}
        accessibilityLabel={label}
        multiline={!!multiline}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        style={{
          ...typography.body,
          color: colors.neutral900,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.neutral300,
          borderRadius: radius.md,
          paddingHorizontal: spacing.md,
          paddingVertical: multiline ? spacing.md : spacing.sm,
          minHeight: multiline ? 88 : tap.minSize,
          textAlignVertical: multiline ? "top" : "center",
          backgroundColor: colors.white,
        }}
      />
      {!!hint && !error && (
        <Text style={{ ...typography.caption, color: colors.neutral500, marginTop: spacing.xs }}>{hint}</Text>
      )}
      {!!error && (
        <Text style={{ ...typography.caption, color: colors.danger, marginTop: spacing.xs }}>{error}</Text>
      )}
    </View>
  );
}
