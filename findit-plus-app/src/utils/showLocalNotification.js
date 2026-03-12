import * as Notifications from "expo-notifications";

export default async function showLocalNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null, // shows immediately
  });
}
