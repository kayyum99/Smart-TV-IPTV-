const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 8080;

app.use(cors());

const playlist = JSON.parse(fs.readFileSync("playlist.json", "utf-8"));

app.get("/playlist", (req, res) => {
  let output = "#EXTM3U\n";
  playlist.forEach((channel) => {
    output += `#EXTINF:-1 tvg-name="${channel.name}" group-title="IPTV",${channel.name}\n${channel.url}\n`;
  });
  res.type("text/plain").send(output);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
