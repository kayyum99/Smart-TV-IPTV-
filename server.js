const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 8080;

app.use(cors());

app.get("/playlist", (req, res) => {
  try {
    const data = fs.readFileSync("playlist.json", "utf-8");
    const playlist = JSON.parse(data);
    let output = "#EXTM3U\n";
    playlist.forEach((channel) => {
      output += `#EXTINF:-1 tvg-name="${channel.name}" group-title="IPTV",${channel.name}\n${channel.url}\n`;
    });
    res.type("text/plain").send(output);
  } catch (err) {
    console.error("Error loading playlist:", err.message);
    res.status(500).send("Playlist load failed");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
