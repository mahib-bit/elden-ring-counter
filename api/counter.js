// Use CommonJS compatible dynamic import for node-fetch
export default async function handler(req, res) {
  try {
    // Dynamically import node-fetch
    const fetch = (await import("node-fetch")).default;

    // CountAPI setup
    const namespace = "mahib-bit";
    const key = "tarnished";

    // Get current count from CountAPI
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    const data = await response.json();
    const count = data.value;

    // Create SVG for the counter
    const svg = `
<svg width="500" height="120" viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #0d0d0d; stroke: #8B8000; stroke-width: 2; rx: 15; }
    .title { fill: #d4af37; font-size: 18px; font-family: Georgia, serif; letter-spacing: 2px; }
    .count { fill: #ffd700; font-size: 40px; font-family: Georgia, serif; font-weight: bold; filter: url(#glow); }
    .subtitle { fill: #aaa; font-size: 14px; font-family: Georgia, serif; }
  </style>

  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect class="bg" x="5" y="5" width="490" height="110" rx="15"/>
  <text x="50%" y="35" text-anchor="middle" class="title">GRACE HAS BEEN DISCOVERED</text>
  <text x="50%" y="75" text-anchor="middle" class="count">${count}</text>
  <text x="50%" y="100" text-anchor="middle" class="subtitle">Tarnished Who Have Traversed This Realm</text>
</svg>
`;

    // Set response as SVG
    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(svg);

  } catch (err) {
    console.error(err);
    res.status(500).send("Serverless function crashed");
  }
}
