const fs = require("fs");
const http = require("https");

export default function CategoryRequest(req, res) {
  if (req.method === "GET") {
    const files = ["sitemap.xml", "sitemap-1-1.xml", "sitemap-1-2.xml", "sitemap-1-3.xml"];
    files.map((f) => {
      const file = fs.createWriteStream(`./public/${f}`);
      http.get(`https://www.elementvape.com/${f}`, function (response) {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
        });
      });
    });
    return res.json({ success: "Success" });
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
