import sharp from "sharp";
import path from "path";
import fs from "fs";

const assets =
  "C:/Users/Admin/.cursor/projects/c-html-rose-rose/assets";
const out = "C:/html/rose/rose/public/images";
fs.mkdirSync(out, { recursive: true });

const top = path.join(
  assets,
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_1755b43032e5f8100ddded69275b847a_images_image-70915e3e-2ada-4896-b81d-f32a7cac7297.png",
);
const mid = path.join(
  assets,
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_1755b43032e5f8100ddded69275b847a_images_image-23643314-70e3-40fe-941a-bdd4a741e08d.png",
);
const bot = path.join(
  assets,
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_1755b43032e5f8100ddded69275b847a_images_image-56c850bf-5cc5-434b-a619-fc6f55888227.png",
);

await sharp(top).png().toFile(path.join(out, "ref-top.png"));
await sharp(mid).png().toFile(path.join(out, "ref-mid.png"));
await sharp(bot).png().toFile(path.join(out, "ref-bot.png"));

// Hero bouquet — left side of hero
await sharp(top)
  .extract({ left: 8, top: 88, width: 300, height: 220 })
  .png()
  .toFile(path.join(out, "hero-bouquet.png"));

// Wholesale photo — left half of wholesale banner in bottom shot
const botMeta = await sharp(bot).metadata();
await sharp(bot)
  .extract({
    left: Math.round(botMeta.width * 0.02),
    top: Math.round(botMeta.height * 0.38),
    width: Math.round(botMeta.width * 0.46),
    height: Math.round(botMeta.height * 0.3),
  })
  .jpeg({ quality: 90 })
  .toFile(path.join(out, "wholesale.jpg"));

// Feature illustrations from mid shot
const midMeta = await sharp(mid).metadata();
await sharp(mid)
  .extract({
    left: Math.round(midMeta.width * 0.68),
    top: Math.round(midMeta.height * 0.42),
    width: Math.round(midMeta.width * 0.28),
    height: Math.round(midMeta.height * 0.14),
  })
  .png()
  .toFile(path.join(out, "illust-delivery.png"));

await sharp(mid)
  .extract({
    left: Math.round(midMeta.width * 0.36),
    top: Math.round(midMeta.height * 0.42),
    width: Math.round(midMeta.width * 0.28),
    height: Math.round(midMeta.height * 0.14),
  })
  .png()
  .toFile(path.join(out, "illust-message.png"));

await sharp(mid)
  .extract({
    left: Math.round(midMeta.width * 0.04),
    top: Math.round(midMeta.height * 0.42),
    width: Math.round(midMeta.width * 0.28),
    height: Math.round(midMeta.height * 0.14),
  })
  .png()
  .toFile(path.join(out, "illust-custom.png"));

console.log("extracted");
