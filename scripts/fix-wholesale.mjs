import sharp from "sharp";

const bot =
  "C:/Users/Admin/.cursor/projects/c-html-rose-rose/assets/c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_1755b43032e5f8100ddded69275b847a_images_image-56c850bf-5cc5-434b-a619-fc6f55888227.png";
const out = "C:/html/rose/rose/public/images/wholesale.jpg";

const meta = await sharp(bot).metadata();
const w = meta.width;
const h = meta.height;

// Crop photo region then trim pale pink margins
await sharp(bot)
  .extract({
    left: Math.round(w * 0.02),
    top: Math.round(h * 0.48),
    width: Math.round(w * 0.47),
    height: Math.round(h * 0.27),
  })
  .trim({
    background: { r: 253, g: 242, b: 247, alpha: 1 },
    threshold: 28,
  })
  .jpeg({ quality: 92 })
  .toFile(out);

const final = await sharp(out).metadata();
console.log("wholesale", final.width, final.height);
