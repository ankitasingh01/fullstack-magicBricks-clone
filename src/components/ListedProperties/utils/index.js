import Bedroom from "../../assets/Bedroom.png";
import EntranceRoom from "../../assets/EntranceRoom.png";
import LivingRoom from "../../assets/LivingRoom.png";
import LivingRoomWithNoKitchen from "../../assets/LivingRoomWithNoKitchen.png";
import StudyRoom from "../../assets/StudyRoom.png";
import TVRoom from "../../assets/TVRoom.png";

export const HandleImage = (ObjectImage) => {
  switch (ObjectImage) {
    case "Bedroom":
      return Bedroom;
      break;
    case "EntranceRoom":
      return EntranceRoom;
      break;
    case "LivingRoom":
      return LivingRoom;
      break;
    case "LivingRoomWithNoKitchen":
      return LivingRoomWithNoKitchen;
      break;
    case "StudyRoom":
      return StudyRoom;
      break;
    case "TVRoom":
      return TVRoom;
      break;
    default:
      return Bedroom;
      break;
  }
};
