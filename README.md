# Cavitak Horizon Weather Dashboard

## 1. User Guide: Accessing and Using the Website

Visit the live weather dashboard at:
**[https://cavitak-assesment.vercel.app/](https://cavitak-assesment.vercel.app/)**

- Enter a city name in the search bar (autocomplete suggestions will appear).
- Select a city and click "Get Weather" to view current weather details.
- See temperature, humidity, wind speed, weather icon, day/night status, and local time for the selected city.
- Enjoy a modern, responsive UI with clear color contrast and design.

---

## 2. Developer Guide: Local Setup

### Prerequisites
- Node.js (v18 or above recommended)
- npm

### Steps
1. **Clone the repository:**
   ```bash
   git clone repo url
   cd cavitak
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure API Key:**
   - Get your OpenWeatherMap API key.
   - Create a `.env.local` file in the project root:
     ```env
     NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000` in your browser.

---

## 3. Playwright Testing: Running and Viewing Reports

### Run Playwright Tests
1. **Install Playwright (if not already):**
   ```bash
   npm install --save-dev @playwright/test
   npx playwright install
   ```
2. **Run all tests:**
   ```bash
   npx playwright test
   ```

### View HTML Test Report
After running tests, generate and open the report:
```bash
npx playwright show-report
```
- The report will open in your browser and show detailed results, including video recordings and screenshots.

---

For any issues or contributions, please open an issue or pull request on GitHub.
