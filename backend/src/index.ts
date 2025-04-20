import express from "express";
import cors from "cors";
import { scrapeAmazon } from "./scraper";

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON requests

/**
 * API endpoint for scraping Amazon search results
 * GET /api/scrape?keyword=search_term
 */
app.get("/api/scrape", async (req: any, res: any) => {
  try {
    const keyword = req.query.keyword as string;

    // Validate the keyword parameter
    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        error: "Keyword parameter is required",
      });
    }

    console.log(`Scraping Amazon for: ${keyword}`);

    // Call the scraping function
    const products = await scrapeAmazon(keyword);

    // Return the scraped data
    res.json(products);
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({
      error: "An error occurred while scraping Amazon",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
