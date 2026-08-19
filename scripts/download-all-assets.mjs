import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const base = "https://andrewdominic.vercel.app";

const assets = [
  `${base}/assets/tenor-DNPDyf8y.gif`,
  `${base}/assets/yatra_tn-bdn1zjF3.png`,
  `${base}/assets/synflow_tn-NDDoYl7K.png`,
  `${base}/assets/andrew-CBDr9qxr.jfif`,
  `${base}/assets/pc-CUA4L57Q.jfif`,
  `${base}/assets/conntent-CJYjiJU2.jfif`,
  `${base}/assets/ritcontent-CRG20fba.jpeg`,
  `${base}/assets/content%202-CqU4pB8E.jpeg`,
  `${base}/assets/networking-Dcuhsfjy.jpeg`,
  `${base}/assets/contact_abstract_1-9-QtgX7x.png`,
  `${base}/assets/contact_abstract_2-Dd2Snm2F.png`,
  `${base}/assets/Helvetica-zhVn_y_h.ttf`,
  `${base}/assets/PlayfairDisplay-Italic-bgU7doQ1.ttf`,
  `${base}/assets/index-9AnXJxon.css`,
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&h=1000&fit=crop&q=80",
  "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&h=1000&fit=crop&q=80",
  "https://i.pinimg.com/736x/5f/5a/29/5f5a29fc5937d1b355326d45eaaf05db.jpg",
  "https://i.pinimg.com/736x/8f/5f/a3/8f5fa3d6fac6bc67808e3b1894ad037a.jpg",
  "https://i.pinimg.com/736x/c3/34/63/c33463654cf0f506b76062f9c00a8870.jpg",
  "https://i.pinimg.com/736x/d4/97/06/d49706a3a68294424130d30bb2f85cb0.jpg",
  "https://i.pinimg.com/736x/2e/48/c0/2e48c07635e421a3f3c966402be027b1.jpg",
  "https://fonts.gstatic.com/s/antonio/v22/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVyW9itPaWE.woff2",
  "https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtq.woff2",
  "https://fonts.gstatic.com/s/barlow/v13/7cHqv4kjgoGqM7E3p-ks51os.woff2",
  "https://fonts.gstatic.com/s/barlow/v13/7cHpv4kjgoGqM7E_DMs5.woff2",
  "https://fonts.gstatic.com/s/barlow/v13/7cHqv4kjgoGqM7E3_-gs51os.woff2",
  "https://fonts.gstatic.com/s/barlow/v13/7cHqv4kjgoGqM7E30-8s51os.woff2",
  "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
  "https://fonts.gstatic.com/s/kanit/v17/nKKU-Go6G5tXcr4WPBWnVaE.woff2",
];

async function download(url) {
  const u = new URL(url);
  let name = decodeURIComponent(basename(u.pathname));
  if (name.includes("index-") && name.endsWith(".css")) name = "original-styles.css";
  const folder = url.includes("fonts.gstatic") ? "fonts" : url.includes("pinimg") ? "pinimg" : "assets";
  const outPath = join(publicDir, folder, name);
  await mkdir(dirname(outPath), { recursive: true });
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(outPath, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${folder}/${name}`);
  return `/${folder}/${name}`;
}

for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map((u) => download(u).catch((e) => console.error("✗", u, e.message))));
}
console.log("Complete");