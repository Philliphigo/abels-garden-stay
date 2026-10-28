// Photos are bundled with the code (not the Lovable CDN) so they also show
// when the site is hosted elsewhere, e.g. Vercel.
import roomMain from "@/assets/photos/room-main.jpeg";
import roomSide from "@/assets/photos/room-side.jpeg";
import gardenMain from "@/assets/photos/garden-main.jpeg";
import gardenPath from "@/assets/photos/garden-path.jpeg";
import gate from "@/assets/photos/gate.jpeg";
import breakfastToast from "@/assets/photos/breakfast-toast.jpeg";
import breakfastBun from "@/assets/photos/breakfast-bun.jpeg";
import breakfastSamosa from "@/assets/photos/breakfast-samosa.jpeg";

export const IMAGES = {
  roomMain: { src: roomMain, alt: "Double bed with blue covers, mosquito net and standing fan" },
  roomSide: { src: roomSide, alt: "Guest room with a double bed and wooden headboard" },
  gardenMain: { src: gardenMain, alt: "Shaded garden with a table, umbrella and red flowers" },
  gardenPath: { src: gardenPath, alt: "Garden lamp among palms and trees" },
  gate: { src: gate, alt: "Paved courtyard inside the red gated entrance" },
  breakfastToast: { src: breakfastToast, alt: "Breakfast of eggs, sausage, chips, toast and salad" },
  breakfastBun: { src: breakfastBun, alt: "Breakfast plate with a bun, eggs, sausage, chips and tea" },
  breakfastSamosa: { src: breakfastSamosa, alt: "Breakfast of eggs, chips, samosa and salad" },
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
