import Notification from "../models/notification.model.js";

export const notifyMatch = async (ownerItem, finderItem, finalScore) => {
  try {
    let ownerMessage = "";
    let finderMessage = "";

    if (finalScore >= 80) {
      ownerMessage = "🎉 Great news! Your lost item appears to be found.";
      finderMessage =
        "🔥 High confidence match! Someone reported this as lost.";
    } else {
      ownerMessage = "⚠️ A possible match was found for your lost item.";
      finderMessage = "⚠️ Your found item may match someone’s lost report.";
    }

    // Notify Owner
    await Notification.create({
      userId: ownerItem.userId,
      title: "Match Found",
      message: ownerMessage,
      itemId: ownerItem._id,
    });

    // Notify Finder
    await Notification.create({
      userId: finderItem.userId,
      title: "Potential Match",
      message: finderMessage,
      itemId: finderItem._id,
    });
  } catch (error) {
    console.log("Notification error:", error);
  }
};
