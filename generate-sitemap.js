const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");

// Define your app's routes
const routes = [
  { url: "/", changefreq: "monthly", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.9 },
  { url: "/register", changefreq: "monthly", priority: 0.8 },
  { url: "/login", changefreq: "monthly", priority: 0.8 },
  { url: "/verify-email", changefreq: "monthly", priority: 0.6 },
  { url: "/request-password-reset", changefreq: "monthly", priority: 0.6 },
  { url: "/password-reset", changefreq: "monthly", priority: 0.6 },
  { url: "/profile", changefreq: "daily", priority: 0.8 },
  { url: "/add", changefreq: "monthly", priority: 0.7 },
  { url: "/pricing", changefreq: "monthly", priority: 0.8 },
  { url: "/payment-success", changefreq: "monthly", priority: 0.6 },
  { url: "/register-success", changefreq: "monthly", priority: 0.6 },
  { url: "/payment-fail", changefreq: "monthly", priority: 0.6 },
  { url: "/subscription", changefreq: "daily", priority: 0.7 },
  { url: "/policy", changefreq: "monthly", priority: 0.6 },
  { url: "/statute", changefreq: "monthly", priority: 0.6 },
  // Add more routes as needed
];

// Create a sitemap stream
const sitemap = new SitemapStream({
  hostname: "https://lokalnytrener.pl",
});

// Write the sitemap to a file
const writeSitemap = async () => {
  const filePath = path.resolve(__dirname, "public", "sitemap.xml");
  const writeStream = fs.createWriteStream(filePath);

  sitemap.pipe(writeStream);

  routes.forEach((route) => {
    sitemap.write(route);
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log("Sitemap generated successfully!");
};

writeSitemap().catch(console.error);
