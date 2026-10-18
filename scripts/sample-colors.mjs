import sharp from "sharp";

const file =
  "C:/Users/Admin/.cursor/projects/c-html-rose-rose/assets/c__Users_Admin_AppData_Roaming_Cursor_User_workspaceStorage_1755b43032e5f8100ddded69275b847a_images_image-70915e3e-2ada-4896-b81d-f32a7cac7297.png";

const { data, info } = await sharp(file)
  .raw()
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true });

function at(x, y) {
  const i = (y * info.width + x) * info.channels;
  return [data[i], data[i + 1], data[i + 2]];
}

function hex([r, g, b]) {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

const samples = {
  bg: [40, 40],
  logo: [Math.round(info.width * 0.88), 55],
  button: [Math.round(info.width * 0.72), Math.round(info.height * 0.32)],
  searchBg: [Math.round(info.width * 0.45), 55],
  cardPink: [Math.round(info.width * 0.2), Math.round(info.height * 0.8)],
};

console.log("size", info.width, info.height);
for (const [k, [x, y]] of Object.entries(samples)) {
  console.log(k, hex(at(x, y)), `@${x},${y}`);
}

// scan for saturated magenta-ish pixels near logo area
let best = { sat: 0 };
for (let y = 30; y < 90; y++) {
  for (let x = Math.round(info.width * 0.75); x < info.width - 20; x++) {
    const [r, g, b] = at(x, y);
    const sat = r - (g + b) / 2;
    if (r > 120 && sat > best.sat) best = { sat, r, g, b, x, y };
  }
}
console.log("magenta", hex([best.r, best.g, best.b]), best);
