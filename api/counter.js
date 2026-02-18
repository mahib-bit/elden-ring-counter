// API endpoint for Vercel that returns a Shields.io compatible JSON badge
export default async function handler(req, res) {
  try {
    // Dynamically import node-fetch (works in CommonJS on Vercel)
    const fetch = (await import("node-fetch")).default;

    // CountAPI namespace and key
    const namespace = "mahib-bit";
    const key = "tarnished";

    // Hit the CountAPI to increment/get count
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    const data = await response.json();
    const count = data.value;

    // Return JSON in Shields.io format
    res.status(200).json({
      schemaVersion: 1,
      label: "Tarnished Count",
      message: count.toString(),
      color: "blueviolet" // you can change color
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      schemaVersion: 1,
      label: "Tarnished Count",
      message: "error",
      color: "red"
    });
  }
}
