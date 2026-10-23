import roomMain from "@/assets/room-main.jpeg.asset.json";
import roomSide from "@/assets/room-side.jpeg.asset.json";
import gardenMain from "@/assets/garden-main.jpeg.asset.json";
import gardenPath from "@/assets/garden-path.jpeg.asset.json";
import gate from "@/assets/gate.jpeg.asset.json";
import breakfastToast from "@/assets/breakfast-toast.jpeg.asset.json";
import breakfastBun from "@/assets/breakfast-bun.jpeg.asset.json";
import breakfastSamosa from "@/assets/breakfast-samosa.jpeg.asset.json";

export const IMAGES = {
  roomMain: { src: roomMain.url, alt: "Double bed with blue covers, mosquito net and standing fan" },
  roomSide: { src: roomSide.url, alt: "Guest room with a double bed and wooden headboard" },
  gardenMain: { src: gardenMain.url, alt: "Shaded garden with a table, umbrella and red flowers" },
  gardenPath: { src: gardenPath.url, alt: "Garden lamp among palms and trees" },
  gate: { src: gate.url, alt: "Paved courtyard inside the red gated entrance" },
  breakfastToast: { src: breakfastToast.url, alt: "Breakfast of eggs, sausage, chips, toast and salad" },
  breakfastBun: { src: breakfastBun.url, alt: "Breakfast plate with a bun, eggs, sausage, chips and tea" },
  breakfastSamosa: { src: breakfastSamosa.url, alt: "Breakfast of eggs, chips, samosa and salad" },
} as const;

export const GALLERY = [
  IMAGES.roomMain,
  IMAGES.gardenMain,
  IMAGES.breakfastToast,
  IMAGES.gate,
  IMAGES.breakfastBun,
  IMAGES.roomSide,
  IMAGES.gardenPath,
  IMAGES.breakfastSamosa,
];
