import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcDir =
  "C:/Users/Admin/.cursor/projects/c-Users-Admin-Downloads-rose-rose/assets";
const outDir = "C:/Users/Admin/Downloads/rose/rose/public/images/categories";
fs.mkdirSync(outDir, { recursive: true });

const map = {
  bouquet:
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Mask_group__6_-bfa0a68f-608c-4d9b-b102-b40dbdb2ca17.png",
  vase: "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Mask_group__1_-a57615ae-a1d1-4a4f-b373-fa390d3d71b4.png",
  wreath:
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Mask_group__8_-2be1bd04-83a2-4f89-bbd2-9892699836d8.png",
  wholesale:
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Mask_group__3_-3b7a5adf-135e-45ae-98fc-f5d1314f39f2.png",
  balloon:
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Mask_group__4_-026679b2-4714-4e4b-be44-0321636ff5e8.png",
  wrap: "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Mask_group__5_-cd7c099f-abe6-4ed7-98a9-68e1f53622e1.png",
  candle:
    "c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_a59c090e237eabac569f106a222aa65c_images_Mask_group__7_-a73558a6-b0c3-4dee-b7fb-94ba8c953e5d.png",
};

async function toSquareIcon(file, dest) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 28 && data[i + 1] < 28 && data[i + 2] < 28) {
      data[i + 3] = 0;
    }
  }

  const size = Math.max(info.width, info.height);
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extend({
      top: Math.floor((size - info.height) / 2),
      bottom: Math.ceil((size - info.height) / 2),
      left: Math.floor((size - info.width) / 2),
      right: Math.ceil((size - info.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(160, 160, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(dest);
}

function gradientIconSvg(paths) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#e30574"/>
      <stop offset="50%" stop-color="#6b4a63"/>
      <stop offset="100%" stop-color="#2f9d5c"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="url(#g)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    ${paths}
  </g>
</svg>`;
}

for (const [name, file] of Object.entries(map)) {
  await toSquareIcon(path.join(srcDir, file), path.join(outDir, `${name}.png`));
  console.log("ok", name);
}

await sharp(
  Buffer.from(
    gradientIconSvg(`
    <path d="M10 8h8c3 0 5 2 5 5v0c0 4-3 7-8 7h-1"/>
    <path d="M10 8v16M10 16h7"/>
  `),
  ),
)
  .png()
  .toFile(path.join(outDir, "letter.png"));

await sharp(
  Buffer.from(
    gradientIconSvg(`
    <circle cx="16" cy="13" r="2.8"/>
    <path d="M13.2 14.5 8 10.5 10 17l3.2-1.2Z"/>
    <path d="M18.8 14.5 24 10.5 22 17l-3.2-1.2Z"/>
    <path d="M14.5 15.5 12 26M17.5 15.5 20 26"/>
  `),
  ),
)
  .png()
  .toFile(path.join(outDir, "ribbon.png"));

console.log("ok letter");
console.log("ok ribbon");
