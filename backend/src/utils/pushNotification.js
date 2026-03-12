import { Expo } from "expo-server-sdk";

const expo = new Expo();

export const sendPushNotification = async (expoPushToken, title, body) => {
  try {
    if (!Expo.isExpoPushToken(expoPushToken)) {
      console.log("Invalid Expo Push Token");
      return;
    }

    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: body,
      data: { type: "otp" },
    };

    const chunks = expo.chunkPushNotifications([message]);

    for (let chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }
  } catch (error) {
    console.log("Push notification error:", error);
  }
};
