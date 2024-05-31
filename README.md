Stock Analysis Dashboard!

This project is a web-based stock analysis dashboard that provides detailed information about various stocks, their performance over different periods, and their profiles. The dashboard features interactive charts, stock details, and a user-friendly interface for viewing and analyzing stock data.


Features
Stock List: Displays a list of available stocks.
Stock Details: Shows detailed information about the selected stock.
Interactive Stock Chart: Displays the stock's price over different periods with interactive hover features.
Time Period Selection: Buttons to switch between different time periods (1 month, 3 months, 1 year, 5 years) for the stock chart.
Profit Display: Displays the profit value, with color coding (green for positive, red for negative).
Technologies Used
HTML
CSS
JavaScript
Chart.js
API for stock data (simulated for demo purposes)
Setup and Installation
Clone the repository:



bash
Copy code
git clone https://github.com/yourusername/stock-analysis-dashboard.git
cd stock-analysis-dashboard
Open the project:
Open index.html in your preferred web browser to view the dashboard.

Project Structure
index.html: Main HTML file containing the structure of the dashboard.
style.css: CSS file containing styles for the dashboard.
script.js: JavaScript file containing the logic for fetching and displaying stock data.
Usage
Viewing Stock Details:

Click on a stock from the stock list to view its details and chart.
The stock details section will display a summary of the selected stock.
Interacting with the Chart:

Hover over the chart to see the stock price at different timestamps.
Click the buttons (1 Month, 3 Months, 1 Year, 5 Years) to change the time period for the chart data.
API Integration
The project uses a simulated API for demonstration purposes. You can replace the simulated data with real API calls to fetch actual stock data.

Example API Response
json
Copy code
{
  "message": "stocks Data",
  "stocksStatsData": [
    {
      "AAPL": { "bookValue": 3.953, "profit": 0.24493 },
      "GOOGL": { "bookValue": 20.507, "profit": 0.20584999 },
      "MSFT": { "bookValue": 26.178, "profit": 0.33248 },
      "AMZN": { "bookValue": 15.064, "profit": 0.00818 },
      "PYPL": { "bookValue": 17.699, "profit": 0.09635 },
      "TSLA": { "bookValue": 14.129, "profit": 0 },
      "JPM": { "bookValue": 98.108, "profit": 0.34686002 },
      "NVDA": { "bookValue": 9.915, "profit": 0.18521 },
      "NFLX": { "bookValue": 46.654, "profit": 0 },
      "DIS": { "bookValue": 53.563, "profit": 0.04738 }
    }
  ],
  "stocksProfileData": [
    {
      "AAPL": { "summary": "Apple Inc. designs, manufactures, and markets smartphones..." },
      "GOOGL": { "summary": "Alphabet Inc. offers various products and platforms..." },
      "MSFT": { "summary": "Microsoft Corporation develops, licenses, and supports software..." },
      "AMZN": { "summary": "Amazon.com, Inc. engages in the retail sale of consumer products..." },
      "PYPL": { "summary": "PayPal Holdings, Inc. operates a technology platform..." },
      "TSLA": { "summary": "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles..." },
      "JPM": { "summary": "JPMorgan Chase & Co. operates as a financial services company..." },
      "NVDA": { "summary": "NVIDIA Corporation provides graphics, and compute and networking solutions..." },
      "NFLX": { "summary": "Netflix, Inc. provides entertainment services..." },
      "DIS": { "summary": "The Walt Disney Company, together with its subsidiaries, operates as an entertainment company..." }
    }
  ]
}
Customization
To customize the dashboard:

CSS: Modify style.css to change the appearance of the dashboard.
JavaScript: Update script.js to change the logic for fetching data and rendering the chart.
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

License
This project is licensed under the MIT License. See the LICENSE file for details.
