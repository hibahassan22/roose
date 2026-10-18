import sharp from "sharp";
import fs from "fs";
import path from "path";

const src =
  "C:/Users/Admin/.cursor/projects/c-Users-Admin-Downloads-rose-rose/assets";
const out = "C:/Users/Admin/Downloads/rose/rose/public/images";
const icons = path.join(out, "icons");
fs.mkdirSync(icons, { recursive: true });

async function knockBlack(file, dest, size = null) {
  const img = sharp(path.join(src, file)).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 22 && data[i + 1] < 22 && data[i + 2] < 22) data[i + 3] = 0;
  }
  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
  if (size) {
    pipeline = pipeline.resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  }
  await pipeline.png().toFile(dest);
}

const products = {
  "prod-a.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_30-14efd1e7-a704-4097-a5cf-ef7bb845b005.png",
  "prod-b.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_32-fec47b42-8899-413e-bede-6943feacf92f.png",
  "prod-c.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_35-ac618a57-8356-40bb-94df-0c1c8e11043b.png",
  "prod-d.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_34-ce7f8e4a-037a-4387-9120-1ca2916054de.png",
  "product-1.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_26-91961dbc-92ac-4f74-b2fd-d924e10de051.png",
  "product-2.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_24-e4495d5c-494d-458f-9cbc-9498e17f1251.png",
  "product-3.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_36-7b421002-7201-4eee-be2b-48fdbc5c8e57.png",
  "product-4.jpg":
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_17-8f074364-9706-4e40-9a55-04475b11e813.png",
};

for (const [name, file] of Object.entries(products)) {
  const { data, info } = await sharp(path.join(src, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 18 && data[i + 1] < 18 && data[i + 2] < 18) data[i + 3] = 0;
  }
  // Flatten onto soft pink so cutouts look clean in cards
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .flatten({ background: { r: 253, g: 242, b: 247 } })
    .resize(800, 800, { fit: "contain", background: { r: 253, g: 242, b: 247 } })
    .jpeg({ quality: 90 })
    .toFile(path.join(out, name));
  console.log("product", name);
}

await knockBlack(
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Gemini_Generated_Image_45txg845txg845tx_1-7858d950-bfc7-46c7-a6dc-cdf8470fad0f.png",
  path.join(out, "illust-message.png"),
);
await knockBlack(
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_image_31-418fc975-d9af-4ea5-af6c-9199a6ed8eeb.png",
  path.join(out, "custom-flowers.png"),
);
await knockBlack(
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_boxicons_quote-left-alt-filled-506659f4-8f41-47a9-91cb-8c60a4dc01a9.png",
  path.join(icons, "quote.png"),
  64,
);
await knockBlack(
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Vector__1_-6cb0aa02-1299-4c56-97f9-8010c44126cc.png",
  path.join(icons, "cart-white.png"),
  64,
);
await knockBlack(
  "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_mdi_flower-tulip-outline-1b4aa21d-5e9c-493d-b3ec-54a9960b3073.png",
  path.join(icons, "tulip.png"),
  64,
);

console.log("done");
