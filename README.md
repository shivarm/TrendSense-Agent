# TrendSense-Agent
An AI-powered technology trend forecasting platform that analyzes GitHub Trending repositories to identify emerging technologies, discover rising frameworks, and predict the next big thing in software development.

# Features

- Trend Insights: Uses Google Gemini API to identify rising technologies and predict future trends from trending repositories.

- GitHub Trending Analysis: Collects trending repositories and extracts valuable insights.

- Automated Web Scraping: Integrates Decodo Web Scraping API for reliable and automated data extraction.

- Intelligent Data Processing: Processes scraped repository information through scalable backend workflows.

- Focused Results: Presents rising technologies and future predictions alongside the repositories that informed them.

- Scalable Backend Architecture: Built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) to manage data collection, processing, and AI-powered analysis.


# ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v24 or later)
- npm
- Google Gemini API Key
- Decodo API credentials

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/TrendSense-Agent.git
```

**2. Navigate to the project directory**

```bash
cd TrendSense-Agent
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
DECODO_API_KEY=your_decodo_api_key
```

**5. Start the development server**

```bash
npm run dev
```

Or start the production server:

```bash
npm start
```

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
