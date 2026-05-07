# E2E Manual Test Checklist

A quick end-to-end smoke test to run before shipping changes. Walk through each step in order and confirm the expected behavior.

- Open the app and confirm the campus map loads with all expected event pins visible.
- Tap a pin on the map and confirm the side menu (or popup) shows the list of events associated with that pin.
- Click the "Add Event" button and confirm the event creation form opens.
- Fill out the form with valid data (title, description, location/pin, startTime, endTime) and submit it.
- Confirm a success message appears and the new event shows up in the side menu for the selected pin without requiring a manual reload.
- Reload the app and confirm the new event still appears (i.e. it was persisted to Firestore, not just held in local state).
- In the Firestore console, locate the event document you just created and edit its `endTime` field to a timestamp in the past.
- Reload the app and confirm the expired event no longer appears in the side menu or on the map.
- Try submitting the Add Event form with missing required fields and confirm validation errors appear and the event is not created.
- Test on both desktop and mobile viewports (or a real phone) and confirm the map, pin tap interaction, side menu, and form are all usable.
