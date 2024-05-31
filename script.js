const stocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS'];
const stockStats = {
    "AAPL": {"bookValue": 3.953, "profit": 0.24493},
    "GOOGL": {"bookValue": 20.507, "profit": 0.20584999},
    "MSFT": {"bookValue": 26.178, "profit": 0.33248},
    "AMZN": {"bookValue": 15.064, "profit": 0.00818},
    "PYPL": {"bookValue": 17.699, "profit": 0.09635},
    "TSLA": {"bookValue": 14.129, "profit": 0},
    "JPM": {"bookValue": 98.108, "profit": 0.34686002},
    "NVDA": {"bookValue": 9.915, "profit": 0.18521},
    "NFLX": {"bookValue": 46.654, "profit": 0},
    "DIS": {"bookValue": 53.563, "profit": 0.04738}
};
const stockProfiles = {
    "AAPL": { "summary": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide..." },
    "GOOGL": { "summary": "Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America..." },
    "MSFT": { "summary": "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide..." },
    "AMZN": { "summary": "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores in North America and internationally..." },
    "PYPL": { "summary": "PayPal Holdings, Inc. operates a technology platform that enables digital payments on behalf of merchants and consumers worldwide..." },
    "TSLA": { "summary": "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally..." },
    "JPM": { "summary": "JPMorgan Chase & Co. operates as a financial services company worldwide..." },
    "NVDA": { "summary": "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally..." },
    "NFLX": { "summary": "Netflix, Inc. provides entertainment services. It offers TV series, documentaries, feature films, and mobile games across various genres and languages..." },
    "DIS": { "summary": "The Walt Disney Company, together with its subsidiaries, operates as an entertainment company worldwide..." }
};
const apiUrl = 'https://stocks3.onrender.com/api/stocks/';
let currentRange = '1month';

document.addEventListener('DOMContentLoaded', () => {
    loadStockList();
    selectStock(stocks[0]);
});

function loadStockList() {
    const stockList = document.getElementById('stock-list');
    stockList.innerHTML = stocks.map(stock => `<li onclick="selectStock('${stock}')">${stock}</li>`).join('');
}

function selectStock(stock) {
    loadStockDetails(stock);
    loadStockChart(stock, currentRange);
}

function loadStockDetails(stock) {
    const details = document.getElementById('details');
    const { bookValue, profit } = stockStats[stock];
    const { summary } = stockProfiles[stock];
    const profitColor = profit > 0 ? 'green' : 'red';
    details.innerHTML = `
        <p>Name: ${stock}</p>
        <p>Book Value: ${bookValue}</p>
        <p>Profit: <span style="color: ${profitColor}">${profit}</span></p>
        <p>Summary: ${summary}</p>
    `;
}

function loadStockChart(stock, range) {
    fetch(`${apiUrl}getstocksdata?symbol=${stock}&range=${range}`)
        .then(response => response.json())
        .then(data => {
            const dates = data.map(point => new Date(point.timestamp * 1000).toLocaleDateString());
            const prices = data.map(point => point.price);
            const chart = document.getElementById('chart');

            Plotly.newPlot(chart, [{
                x: dates,
                y: prices,
                type: 'scatter'
            }]);

            chart.on('plotly_hover', function(data){
                const infotext = data.points.map(d => `${d.x}: $${d.y.toFixed(2)}`);
                Plotly.Fx.hover('chart', infotext);
            });
        });
}

function changeRange(range) {
    currentRange = range;
    const selectedStock = document.querySelector('#stock-list li.selected')?.textContent || stocks[0];
    loadStockChart(selectedStock, range);
}

document.querySelectorAll('#stock-list li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('#stock-list li').forEach(li => li.classList.remove('selected'));
        item.classList.add('selected');
        selectStock(item.textContent);
    });
});
// Function to display the stock details
function displayStockDetails(stock) {
    const detailsSection = document.querySelector('.stock-details');
    const profile = stockProfiles[stock];
    detailsSection.innerHTML = `
        <h2>${stock}</h2>
        <p>${profile.summary}</p>
    `;
}

// Function to display the stock chart
function displayStockChart(stock) {
    const chartSection = document.querySelector('.stock-chart');
    chartSection.innerHTML = `<h2>${stock} Chart</h2><canvas id="stockChart"></canvas>`;
    
    // Fetch data for the selected stock
    fetch(`https://api.example.com/stock-data?symbol=${stock}`)
        .then(response => response.json())
        .then(data => {
            const labels = data.dates;
            const values = data.values;
            const peak = Math.max(...values);
            const low = Math.min(...values);
            
            const ctx = document.getElementById('stockChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `${stock} Price`,
                        data: values,
                        borderColor: 'green',
                        borderWidth: 2,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                        tooltip: {
                            callbacks: {
                                afterBody: function(context) {
                                    return `Peak: ${peak}, Low: ${low}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Price'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching stock data:', error));
}

// Event listeners for stock list items
document.querySelectorAll('.stock-list li').forEach(item => {
    item.addEventListener('click', event => {
        const stock = event.target.textContent;
        displayStockDetails(stock);
        displayStockChart(stock);
    });
});

// Initial display
displayStockDetails(stocks[0]);
displayStockChart(stocks[0]);
let currentStock = 'AAPL'; // Example initial stock
let currentPeriod = '1m'; // Default period

// Function to display the stock details
function displayStockDetails(stock) {
    const detailsSection = document.querySelector('.stock-details');
    const profile = stockProfiles[stock];
    detailsSection.innerHTML = `
        <h2>${stock}</h2>
        <p>${profile.summary}</p>
    `;
}

// Function to display the stock chart
function displayStockChart(stock, period) {
    const chartSection = document.querySelector('.stock-chart');
    chartSection.innerHTML = `
        <h2>${stock} Chart</h2>
        <div class="buttons">
            <button data-period="1m">1 Month</button>
            <button data-period="3m">3 Months</button>
            <button data-period="1y">1 Year</button>
            <button data-period="5y">5 Years</button>
        </div>
        <canvas id="stockChart"></canvas>
    `;

    // Example data fetching based on the period
    const data = fetchData(stock, period);

    const labels = data.dates;
    const values = data.values;
    const peak = Math.max(...values);
    const low = Math.min(...values);

    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${stock} Price`,
                data: values,
                borderColor: 'green',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const date = context.label;
                            const price = context.raw;
                            return `${date}: $${price}`;
                        },
                        afterBody: function(context) {
                            return `Peak: ${peak}, Low: ${low}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Price'
                    }
                }
            }
        }
    });

    // Add event listeners to buttons
    document.querySelectorAll('.stock-chart button').forEach(button => {
        button.addEventListener('click', event => {
            const newPeriod = event.target.getAttribute('data-period');
            displayStockChart(stock, newPeriod);
        });
    });
}

// Function to fetch data based on stock and period
function fetchData(stock, period) {
    // Simulated data for demonstration purposes
    // Replace this with actual API fetching logic
    const now = new Date();
    let dates = [];
    let values = [];

    switch (period) {
        case '1m':
            for (let i = 0; i < 30; i++) {
                dates.push(new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                values.push(Math.random() * 100 + 150);
            }
            break;
        case '3m':
            for (let i = 0; i < 90; i++) {
                dates.push(new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                values.push(Math.random() * 100 + 150);
            }
            break;
        case '1y':
            for (let i = 0; i < 365; i++) {
                dates.push(new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                values.push(Math.random() * 100 + 150);
            }
            break;
        case '5y':
            for (let i = 0; i < 1825; i++) {
                dates.push(new Date(now - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                values.push(Math.random() * 100 + 150);
            }
            break;
    }

    return { dates, values };
}

// Function to display profit with appropriate color
function displayProfit(profit) {
    const profitElement = document.createElement('div');
    profitElement.style.fontWeight = 'bold';
    profitElement.style.color = profit > 0 ? 'green' : 'red';
    profitElement.textContent = `Profit: ${profit}`;
    return profitElement;
}

// Event listeners for stock list items
document.querySelectorAll('.stock-list li').forEach(item => {
    item.addEventListener('click', event => {
        const stock = event.target.textContent;
        currentStock = stock;
        displayStockDetails(stock);
        displayStockChart(stock, currentPeriod);
    });
});

// Initial display
displayStockDetails(currentStock);
displayStockChart(currentStock, currentPeriod);
