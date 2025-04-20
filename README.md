# Amazon Product Scraper

A simple application to scrape product listings from Amazon search results.

## Features

- Search Amazon products by keyword
- Display product title, rating, reviews, and image
- Clean, responsive UI

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- Bun (for backend)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
    ```

2. Install dependencies:
    ```bash
    bun install
    ```
2. Start the backend server:
    ```bash
    bun start
    ```

    The backend will run on http://localhost:3000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
    ```

2. Install dependencies:
    ```bash
    bun install
    ```
2. Start the development server:
    ```bash
    npm run dev
    ```

    The frontend will open in your browser at http://localhost:5173

### Usage

1. Enter a search keyword in the input field (e.g., "laptop")
2. Click "Search Amazon" or press Enter
3. View the scraped product results

### Notes

1. This is a demo application for educational purposes only
2. Amazon may block scraping requests if made too frequently
3. The scraper might need adjustments if Amazon changes their HTML structure

## Backend

# Amazon Scraper Backend

Node.js backend for scraping Amazon product listings.

## Configuration

- Port: 3000
- Endpoint: `GET /api/scrape?keyword=your_search_term`

## Dependencies

- Express - Web framework
- Axios - HTTP client
- JSDOM - HTML parser
- CORS - Cross-origin resource sharing

## Running the Server

```bash
bun start
```

## Frontend


# Amazon Scraper Frontend

Frontend for the Amazon product scraper application.

## Features

- Search interface
- Product card display
- Responsive design

## Running the Development Server

```bash
npm run dev
```


## Key Implementation Notes

1. **Backend**:
   - Uses Bun for fast startup and execution
   - Implements proper error handling and input validation
   - Mimics browser headers to avoid being blocked
   - Parses HTML with JSDOM for reliable DOM manipulation

2. **Frontend**:
   - Uses Vite for fast development experience
   - Implements clean, responsive UI with CSS Grid
   - Handles loading and error states properly
   - Includes image fallback for broken images

3. **Scraping Logic**:
   - Targets specific CSS classes in Amazon's structure
   - Extracts product title, rating, reviews, and image
   - Filters out sponsored products and non-product items
   - Handles missing data gracefully

4. **Project Organization**:
   - Clear separation of concerns between frontend and backend
   - TypeScript for backend type safety
   - Well-commented code for easy understanding
   - Proper error handling at all levels

This implementation provides a solid foundation that could be extended with features like pagination, price tracking, or more detailed product information.