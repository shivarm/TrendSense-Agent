# TrendSense-Agent
An AI-powered technology trend forecasting platform that analyzes GitHub Trending repositories to identify emerging technologies, discover rising frameworks, and predict the next big thing in software development.

# Features

- Trend Prediction: Uses Google Gemini API to analyze repository trends and identify potentially emerging frameworks and technologies.

- GitHub Trending Analysis: Collects trending repositories and extracts valuable insights.

- Automated Web Scraping: Integrates Decodo Web Scraping API for reliable and automated data extraction.

- Intelligent Data Processing: Processes scraped repository information through scalable backend workflows.

- Technology Trend Insights: Generates AI-driven analysis to highlight rising technologies and potential future trends.

- Scalable Backend Architecture: Built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) to manage data collection, processing, and AI-powered analysis.


# ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later)
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
DECODO_USERNAME=your_decodo_username
DECODO_PASSWORD=your_decodo_password
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
