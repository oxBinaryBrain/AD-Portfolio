import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const assets = [
  "https://andrewdominic.vercel.app/assets/tenor-DNPDyf8y.gif",
  "https://andrewdominic.vercel.app/assets/yatra_tn-bdn1zjF3.png",
  "https://andrewdominic.vercel.app/assets/synflow_tn-NDDoYl7K.png",
  "https://andrewdominic.vercel.app/assets/andrew-CBDr9qxr.jfif",
  "https://andrewdominic.vercel.app/assets/pc-CUA4L57Q.jfif",
  "https://andrewdominic.vercel.app/assets/conntent-CJYjiJU2.jfif",
  "https://andrewdominic.vercel.app/assets/ritcontent-CRG20fba.jpeg",
  "https://andrewdominic.vercel.app/assets/content%202-CqU4pB8E.jpeg",
  "https://andrewdominic.vercel.app/assets/networking-Dcuhsfjy.jpeg",
  "https://andrewdominic.vercel.app/assets/contact_abstract_1-9-QtgX7x.png",
  "https://andrewdominic.vercel.app/assets/contact_abstract_2-Dd2Snm2F.png",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&h=1000&fit=crop&q=80",
  "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=1000&fit=crop&q=80",
];

async function download(url) {
  const name = basename(decodeURIComponent(new URL(url).pathname));
  const outPath = join(publicDir, "assets", name);
  await mkdir(dirname(outPath), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(outPath, buf);
  console.log(`✓ ${name}`);
  return `/assets/${name}`;
}

const batchSize = 4;
const results = [];
for (let i = 0; i < assets.length; i += batchSize) {
  const batch = assets.slice(i, i + batchSize);
  const batchResults = await Promise.all(batch.map(download));
  results.push(...batchResults);
}

console.log(`Downloaded ${results.length} assets`);