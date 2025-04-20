import axios from "axios";
import { JSDOM } from "jsdom";
import type { Product } from "./types";

// Set default headers to mimic a browser request
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
};

/**
 * Scrapes Amazon search results for a given keyword
 * @param keyword - The search term to scrape
 * @returns Array of product data
 */
export async function scrapeAmazon(keyword: string): Promise<Product[]> {
  try {
    // Construct the Amazon search URL
      const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

    // Fetch the HTML content
    const response = await axios.get(url, { headers });
    const html = response.data;

    // Parse the HTML using JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Select all product elements
    const productElements = document.querySelectorAll(".s-result-item");

    const products: Product[] = [];

    // Extract data from each product element
    productElements.forEach((element) => {
      // Skip sponsored ads and non-product items
      if (element.querySelector(".a-color-secondary")) return;

      // Extract product title
      const titleElement = element.querySelector("h2 a span");
      const title = titleElement?.textContent?.trim() || "No title";

      // Extract product URL
      const urlElement = element.querySelector(
        "h2 a"
      ) as HTMLAnchorElement | null;
      const productUrl = urlElement?.href
        ? `https://www.amazon.com${urlElement.href}`
        : "";

      console.log(productUrl);
      

      // Extract rating
      const ratingElement = element.querySelector(
        ".a-icon-star-small .a-icon-alt"
      );
      const ratingText = ratingElement?.textContent?.trim() || "";
      const rating = parseFloat(ratingText.split(" ")[0] || "") || 0;

      // Extract review count
      const reviewsElement = element.querySelector(
        ".a-size-small .a-link-normal"
      );
      const reviewsText = reviewsElement?.textContent?.trim() || "";
      const reviews = parseInt(reviewsText.replace(/,/g, "")) || 0;

      // Extract image URL
      const imageElement = element.querySelector(".s-image");
      const imageUrl = imageElement?.getAttribute("src") || "";

      // Only add product if it has basic information
      if (title && imageUrl) {
        products.push({
          title,
          rating,
          reviews,
          imageUrl,
          productUrl,
        });
      }
    });

    return products;
  } catch (error) {
    console.error("Error in scrapeAmazon:", error);
    throw error;
  }
}
