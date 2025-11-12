// Timer functionality
let seconds = 0;
let minutes = 0;

setInterval(() => {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = display;

        if (minutes >= 10 && minutes < 12) {
            timerElement.style.background = '#fff3cd';
            timerElement.style.borderColor = '#ffc107';
        } else if (minutes >= 12) {
            timerElement.style.background = '#f8d7da';
            timerElement.style.borderColor = '#dc3545';
        }
    }
}, 1000);

// Modal functionality
function showDemo(type) {
    const modals = {
        'datacube': 'datacubeModal',
        'attribute': 'attributeModal',
        'pca': 'pcaModal',
        'numerosity': 'numerosityModal',
        'discretization': 'discretizationModal',
        'wavelet': 'waveletModal',
        'samplingMethods': 'samplingMethodsModal',
        'histogramTypes': 'histogramTypesModal',
        'regression': 'regressionModal'
    };

    const modalId = modals[type];
    if (modalId) {
        document.getElementById(modalId).style.display = 'block';
        // Initialize the visualization when opened
        if (type === 'datacube') initDataCube();
        if (type === 'attribute') initAttributes();
        if (type === 'pca') initPCA();
        if (type === 'numerosity') initNumerosity();
        if (type === 'discretization') initDiscretization();
        if (type === 'wavelet') initWavelet();
        if (type === 'samplingMethods') initSamplingMethods();
        if (type === 'histogramTypes') initHistogramTypes();
        if (type === 'regression') initRegression();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// ===== DATA CUBE AGGREGATION - CREATIVE FUNNEL VISUALIZATION =====
let dataCubeState = 'daily';
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Generate 365 daily data points for a full year
const dailySalesData = [];
let dayCounter = 0;
for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= daysInMonth[month]; day++) {
        // Create realistic sales data with seasonal variation and weekly patterns
        const seasonalFactor = 1 + Math.sin((month / 12) * Math.PI * 2) * 0.3;
        const weekdayFactor = (dayCounter % 7 < 5) ? 1.2 : 0.8; // Higher on weekdays
        const baseSales = 1500;
        const randomVariation = (Math.random() - 0.5) * 400;
        const sales = Math.round(baseSales * seasonalFactor * weekdayFactor + randomVariation);

        dailySalesData.push({
            date: `${monthNames[month]} ${day}`,
            month: month,
            quarter: Math.floor(month / 3),
            sales: sales
        });
        dayCounter++;
    }
}

function initDataCube() {
    dataCubeState = 'daily';
    renderDataCubeFunnel('daily');
}

function renderDataCubeFunnel(level) {
    const container = document.getElementById('datacubeChart');
    container.innerHTML = '';
    const totalSales = dailySalesData.reduce((sum, d) => sum + d.sales, 0);

    if (level === 'daily') {
        // Show all 365 daily data points organized by month
        let monthlyBlocks = '';
        let startIdx = 0;

        for (let m = 0; m < 12; m++) {
            const monthData = dailySalesData.filter(d => d.month === m);
            const monthTotal = monthData.reduce((sum, d) => sum + d.sales, 0);

            monthlyBlocks += `
                <div style="margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; border: 2px solid #e0e0e0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div style="font-weight: bold; color: #003366; font-size: 1.1em;">${monthNames[m]} 2024</div>
                        <div style="color: #666; font-size: 0.9em;">${daysInMonth[m]} days | Total: $${(monthTotal/1000).toFixed(1)}k</div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(${Math.min(31, daysInMonth[m])}, 1fr); gap: 3px;">
                        ${monthData.map((d, idx) => {
                            const intensity = Math.min(1, Math.max(0, (d.sales - 1000) / 1000));
                            const blue = Math.floor(219 - intensity * 60);
                            const color = `rgb(52, 152, ${blue})`;
                            return `<div title="${d.date}: $${d.sales.toLocaleString()}" style="
                                aspect-ratio: 1;
                                background: ${color};
                                border-radius: 3px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.65em;
                                color: white;
                                font-weight: bold;
                                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                                animation: popIn 0.3s ${(startIdx + idx) * 0.001}s both;
                                cursor: pointer;
                                transition: transform 0.2s;
                            " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">${idx + 1}</div>`;
                        }).join('')}
                    </div>
                </div>
            `;
            startIdx += monthData.length;
        }

        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 1.3em; color: #003366; font-weight: bold; margin-bottom: 5px;">
                        DAILY LEVEL: 365 Individual Records
                    </div>
                    <div style="font-size: 0.95em; color: #666;">
                        Full Year 2024 | ${dailySalesData.length} Daily Data Points
                    </div>
                </div>
                <div style="background: #f8f9fa; padding: 20px; border: 2px solid #3498db; border-radius: 8px; max-width: 900px; margin: 0 auto; max-height: 600px; overflow-y: auto;">
                    ${monthlyBlocks}
                    <div style="margin-top: 15px; padding: 15px; background: #e3f2fd; border-radius: 4px; text-align: center;">
                        <strong>Color Legend:</strong>
                        <span style="display: inline-block; width: 20px; height: 20px; background: rgb(52, 152, 219); border-radius: 3px; vertical-align: middle; margin: 0 5px;"></span> Lower Sales
                        →
                        <span style="display: inline-block; width: 20px; height: 20px; background: rgb(52, 152, 159); border-radius: 3px; vertical-align: middle; margin: 0 5px;"></span> Higher Sales
                        <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
                            Hover over any day to see exact sales amount
                        </div>
                    </div>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <div style="font-size: 1.2em; color: #27ae60; font-weight: bold;">
                        Total Annual Sales: $${totalSales.toLocaleString()}
                    </div>
                    <div style="margin-top: 10px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; max-width: 600px; margin: 15px auto 0;">
                        <div style="padding: 10px; background: white; border-radius: 4px; border: 1px solid #ddd;">
                            <div style="font-size: 0.85em; color: #666;">Data Points</div>
                            <div style="font-size: 1.3em; font-weight: bold; color: #003366;">365</div>
                        </div>
                        <div style="padding: 10px; background: white; border-radius: 4px; border: 1px solid #ddd;">
                            <div style="font-size: 0.85em; color: #666;">Months</div>
                            <div style="font-size: 1.3em; font-weight: bold; color: #003366;">12</div>
                        </div>
                        <div style="padding: 10px; background: white; border-radius: 4px; border: 1px solid #ddd;">
                            <div style="font-size: 0.85em; color: #666;">Avg/Day</div>
                            <div style="font-size: 1.3em; font-weight: bold; color: #003366;">$${Math.round(totalSales/365).toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (level === 'monthly') {
        // Aggregate to 12 months
        const monthlyData = [];
        for (let m = 0; m < 12; m++) {
            const monthSales = dailySalesData.filter(d => d.month === m).reduce((sum, d) => sum + d.sales, 0);
            monthlyData.push({
                month: monthNames[m],
                sales: monthSales,
                days: daysInMonth[m]
            });
        }
        const reduction = ((1 - 12/365) * 100).toFixed(1);

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 1.2em; color: #003366; font-weight: bold; margin-bottom: 10px;">
                    MONTHLY LEVEL: 12 Records (${reduction}% Reduction)
                </div>
                <div style="background: #f8f9fa; padding: 20px; border: 2px solid #2c3e50; border-radius: 8px; max-width: 900px; margin: 0 auto;">
                    <div style="display: flex; align-items: flex-end; justify-content: space-around; height: 250px; gap: 8px;">
                        ${monthlyData.map((d, idx) => {
                            const maxSales = Math.max(...monthlyData.map(m => m.sales));
                            const height = (d.sales / maxSales) * 100;
                            return `
                                <div style="flex: 1; text-align: center; animation: scaleIn ${0.5 + idx * 0.05}s both;">
                                    <div style="
                                        height: ${height}%;
                                        background: linear-gradient(to top, #2c3e50, #34495e);
                                        border-radius: 4px 4px 0 0;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        color: white;
                                        font-size: 0.85em;
                                        font-weight: bold;
                                        min-height: 40px;
                                        position: relative;
                                        animation: growUp 0.6s ${idx * 0.05}s both;
                                    " title="${d.month}: $${d.sales.toLocaleString()}">
                                        $${(d.sales/1000).toFixed(0)}k
                                    </div>
                                    <div style="font-size: 0.75em; margin-top: 5px; font-weight: bold;">${d.month}</div>
                                    <div style="font-size: 0.7em; color: #666;">${d.days} days</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div style="margin-top: 20px; font-size: 1.1em; color: #27ae60; font-weight: bold;">
                    Total Preserved: $${totalSales.toLocaleString()}
                </div>
                <div style="margin-top: 10px; font-size: 0.95em; color: #666;">
                    365 daily records → 12 monthly records
                </div>
            </div>
        `;
    } else if (level === 'quarterly') {
        // Aggregate to 4 quarters
        const quarterlyData = [];
        const quarterNames = ['Q1 (Jan-Mar)', 'Q2 (Apr-Jun)', 'Q3 (Jul-Sep)', 'Q4 (Oct-Dec)'];
        for (let q = 0; q < 4; q++) {
            const quarterSales = dailySalesData.filter(d => d.quarter === q).reduce((sum, d) => sum + d.sales, 0);
            const quarterDays = dailySalesData.filter(d => d.quarter === q).length;
            quarterlyData.push({
                quarter: quarterNames[q],
                sales: quarterSales,
                days: quarterDays
            });
        }
        const reduction = ((1 - 4/365) * 100).toFixed(1);

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 1.2em; color: #003366; font-weight: bold; margin-bottom: 10px;">
                    QUARTERLY LEVEL: 4 Records (${reduction}% Reduction)
                </div>
                <div style="background: #f8f9fa; padding: 30px; border: 2px solid #8e44ad; border-radius: 8px; max-width: 900px; margin: 0 auto;">
                    <div style="display: flex; justify-content: center; gap: 20px;">
                        ${quarterlyData.map((d, idx) => `
                            <div style="flex: 1; max-width: 200px; animation: scaleIn ${0.6 + idx * 0.15}s both;">
                                <div style="
                                    background: linear-gradient(135deg, #8e44ad, #9b59b6);
                                    padding: 30px 20px;
                                    border-radius: 12px;
                                    color: white;
                                    text-align: center;
                                    box-shadow: 0 4px 15px rgba(142, 68, 173, 0.3);
                                ">
                                    <div style="font-size: 1.3em; font-weight: bold; margin-bottom: 15px;">${d.quarter}</div>
                                    <div style="font-size: 2em; font-weight: bold; color: #fff;">$${(d.sales/1000).toFixed(0)}k</div>
                                    <div style="font-size: 0.9em; margin-top: 15px; opacity: 0.9;">${d.days} days</div>
                                    <div style="font-size: 0.85em; margin-top: 5px; opacity: 0.8;">~3 months</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div style="margin-top: 20px; font-size: 1.1em; color: #27ae60; font-weight: bold;">
                    Total Preserved: $${totalSales.toLocaleString()}
                </div>
                <div style="margin-top: 10px; font-size: 0.95em; color: #666;">
                    365 daily → 12 monthly → 4 quarterly records
                </div>
            </div>
        `;
    } else if (level === 'yearly') {
        const reduction = ((1 - 1/365) * 100).toFixed(2);

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 1.2em; color: #003366; font-weight: bold; margin-bottom: 20px;">
                    YEARLY LEVEL: 1 Record (${reduction}% Reduction)
                </div>
                <div style="display: flex; justify-content: center; max-width: 900px; margin: 0 auto;">
                    <div style="
                        background: linear-gradient(135deg, #27ae60, #229954);
                        padding: 50px 80px;
                        border-radius: 16px;
                        color: white;
                        text-align: center;
                        box-shadow: 0 8px 30px rgba(39, 174, 96, 0.4);
                        animation: scaleIn 0.8s;
                    ">
                        <div style="font-size: 1.8em; font-weight: bold; margin-bottom: 20px;">YEAR 2024</div>
                        <div style="font-size: 3.5em; font-weight: bold; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                            $${(totalSales/1000).toFixed(0)}k
                        </div>
                        <div style="font-size: 1.1em; margin-top: 20px; opacity: 0.95;">Aggregated from 365 days</div>
                        <div style="font-size: 1.1em; margin-top: 8px; opacity: 0.95;">Across 12 months</div>
                        <div style="font-size: 1.1em; margin-top: 8px; opacity: 0.95;">4 quarters</div>
                    </div>
                </div>
                <div style="margin-top: 20px; font-size: 1.1em; color: #27ae60; font-weight: bold;">
                    Total Preserved: $${totalSales.toLocaleString()}
                </div>
                <div style="margin-top: 10px; font-size: 0.95em; color: #666;">
                    Complete aggregation pipeline: 365 → 12 → 4 → 1 record
                </div>
            </div>
        `;
    }
}

function aggregateDaily() {
    if (dataCubeState !== 'daily') return;
    dataCubeState = 'monthly';
    renderDataCubeFunnel('monthly');
}

function aggregateMonthly() {
    if (dataCubeState !== 'monthly') return;
    dataCubeState = 'quarterly';
    renderDataCubeFunnel('quarterly');
}

function aggregateQuarterly() {
    if (dataCubeState !== 'quarterly') return;
    dataCubeState = 'yearly';
    renderDataCubeFunnel('yearly');
}

function resetDataCube() {
    initDataCube();
}

// ===== ATTRIBUTE SELECTION - CREATIVE CARD VISUALIZATION =====
let attributeData = [
    { name: 'Customer Age', correlation: 0.72, variance: 145.2, status: 'unknown', selected: false },
    { name: 'Annual Income', correlation: 0.85, variance: 2341.5, status: 'unknown', selected: false },
    { name: 'Customer ID', correlation: 0.02, variance: 98123.4, status: 'unknown', selected: false },
    { name: 'Purchase Frequency', correlation: 0.68, variance: 23.4, status: 'unknown', selected: false },
    { name: 'Account Creation Date', correlation: 0.15, variance: 1234.1, status: 'unknown', selected: false },
    { name: 'Credit Score', correlation: 0.79, variance: 1234.5, status: 'unknown', selected: false },
    { name: 'Random UUID', correlation: 0.01, variance: 99999.9, status: 'unknown', selected: false },
    { name: 'Product Category', correlation: 0.61, variance: 12.3, status: 'unknown', selected: false },
    { name: 'Zip Code', correlation: 0.12, variance: 4567.8, status: 'unknown', selected: false },
    { name: 'Last Purchase Days', correlation: 0.58, variance: 234.5, status: 'unknown', selected: false }
];

let forwardSelectionStep = 0;
let backwardEliminationStep = 0;
let selectedAttributes = [];
let removedAttributes = [];

function initAttributes() {
    renderAttributeCards();
}

function showAttributeMethod(method) {
    // Hide all methods
    document.getElementById('basicMethod').style.display = 'none';
    document.getElementById('forwardMethod').style.display = 'none';
    document.getElementById('backwardMethod').style.display = 'none';

    // Reset all tab styles
    document.getElementById('basicTab').style.background = '#e0e0e0';
    document.getElementById('basicTab').style.color = '#666';
    document.getElementById('forwardTab').style.background = '#e0e0e0';
    document.getElementById('forwardTab').style.color = '#666';
    document.getElementById('backwardTab').style.background = '#e0e0e0';
    document.getElementById('backwardTab').style.color = '#666';

    // Show selected method
    if (method === 'basic') {
        document.getElementById('basicMethod').style.display = 'block';
        document.getElementById('basicTab').style.background = '#003366';
        document.getElementById('basicTab').style.color = 'white';
    } else if (method === 'forward') {
        document.getElementById('forwardMethod').style.display = 'block';
        document.getElementById('forwardTab').style.background = '#003366';
        document.getElementById('forwardTab').style.color = 'white';
        initForwardSelection();
    } else if (method === 'backward') {
        document.getElementById('backwardMethod').style.display = 'block';
        document.getElementById('backwardTab').style.background = '#003366';
        document.getElementById('backwardTab').style.color = 'white';
        initBackwardElimination();
    }
}

function renderAttributeCards() {
    const container = document.getElementById('attributeCards');
    container.innerHTML = '';

    attributeData.forEach((attr, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            const corrAbs = Math.abs(attr.correlation);
            const isRelevant = corrAbs >= 0.3;

            card.className = `attribute-card ${!isRelevant ? 'irrelevant' : ''}`;
            card.innerHTML = `
                <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 10px; color: #003366;">
                    ${attr.name}
                </div>
                <div style="margin: 10px 0;">
                    <div style="font-size: 0.9em; color: #666; margin-bottom: 5px;">Correlation</div>
                    <div style="background: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
                        <div style="
                            width: ${corrAbs * 100}%;
                            height: 100%;
                            background: ${isRelevant ? 'linear-gradient(90deg, #27ae60, #2ecc71)' : 'linear-gradient(90deg, #e74c3c, #c0392b)'};
                            border-radius: 10px;
                            transition: all 0.3s;
                        "></div>
                    </div>
                    <div style="text-align: center; font-weight: bold; margin-top: 5px; color: ${isRelevant ? '#27ae60' : '#e74c3c'};">
                        ${attr.correlation.toFixed(2)}
                    </div>
                </div>
                <div style="text-align: center; padding: 8px; border-radius: 4px; background: ${isRelevant ? '#d5f4e6' : '#fadbd8'}; color: ${isRelevant ? '#27ae60' : '#e74c3c'}; font-weight: bold; margin-top: 10px;">
                    ${isRelevant ? '✓ KEEP' : '✗ REMOVE'}
                </div>
            `;
            container.appendChild(card);
        }, index * 80);
    });
}

function calculateCorrelation() {
    const cards = document.querySelectorAll('.attribute-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 20px rgba(52, 152, 219, 0.3)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }, 400);
        }, index * 100);
    });
}

function removeIrrelevant() {
    const cards = document.querySelectorAll('.attribute-card.irrelevant');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(0) rotate(180deg)';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
                updateAttributeProgress();
            }, 600);
        }, index * 200);
    });
}

function updateAttributeProgress() {
    setTimeout(() => {
        const total = attributeData.length;
        const removed = attributeData.filter(a => Math.abs(a.correlation) < 0.3).length;
        const percentage = Math.round((removed / total) * 100);

        const progressBar = document.getElementById('attributeProgress');
        progressBar.style.width = `${percentage}%`;
        progressBar.textContent = `${percentage}% Removed | ${total - removed}/${total} Features Kept`;
    }, 800);
}

function resetAttributes() {
    attributeData.forEach(attr => {
        attr.status = 'unknown';
        attr.selected = false;
    });
    initAttributes();
    document.getElementById('attributeProgress').style.width = '0%';
    document.getElementById('attributeProgress').textContent = '0% Removed';
}

// ===== FORWARD SELECTION METHOD =====
function initForwardSelection() {
    forwardSelectionStep = 0;
    selectedAttributes = [];
    attributeData.forEach(attr => {
        attr.selected = false;
        attr.status = 'unknown';
    });
    renderForwardSelection();
}

function renderForwardSelection() {
    const container = document.getElementById('forwardSelectionViz');

    // Sort attributes by correlation (descending) to show selection order
    const sortedAttrs = [...attributeData].sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

    const selectedCount = selectedAttributes.length;
    const remaining = attributeData.length - selectedCount;

    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: #003366; margin: 0;">Forward Selection Process</h3>
                <p style="color: #666; margin-top: 10px;">
                    Start with <strong>empty set</strong> → Iteratively add <strong>best attribute</strong> → Repeat until threshold met
                </p>
                <div style="margin-top: 15px; padding: 15px; background: #e3f2fd; border-radius: 8px; display: inline-block;">
                    <strong>Current Step ${forwardSelectionStep}:</strong>
                    Selected: <span style="color: #27ae60; font-size: 1.2em; font-weight: bold;">${selectedCount}</span> |
                    Remaining: <span style="color: #666; font-size: 1.2em; font-weight: bold;">${remaining}</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <!-- Available Attributes Pool -->
                <div style="background: #fff; border: 3px solid #ddd; border-radius: 12px; padding: 20px;">
                    <h4 style="text-align: center; color: #666; margin-bottom: 15px;">
                        📋 Available Attributes Pool
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 10px; min-height: 400px;">
                        ${sortedAttrs.map((attr, idx) => {
                            if (attr.selected) return '';
                            const corrAbs = Math.abs(attr.correlation);
                            const isNext = forwardSelectionStep > 0 && idx === sortedAttrs.findIndex(a => !a.selected);

                            return `
                                <div style="
                                    background: ${isNext ? 'linear-gradient(135deg, #fff3cd, #ffeaa7)' : 'white'};
                                    border: 2px solid ${isNext ? '#f39c12' : '#e0e0e0'};
                                    padding: 12px;
                                    border-radius: 8px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    animation: ${isNext ? 'pulse 1.5s infinite' : 'fadeIn 0.5s'};
                                    box-shadow: ${isNext ? '0 4px 15px rgba(243, 156, 18, 0.3)' : 'none'};
                                ">
                                    <div>
                                        <div style="font-weight: bold; color: #003366;">${attr.name}</div>
                                        <div style="font-size: 0.85em; color: #666;">|r| = ${corrAbs.toFixed(3)}</div>
                                    </div>
                                    <div style="
                                        background: ${corrAbs >= 0.7 ? '#27ae60' : corrAbs >= 0.3 ? '#f39c12' : '#e74c3c'};
                                        color: white;
                                        padding: 5px 12px;
                                        border-radius: 20px;
                                        font-size: 0.85em;
                                        font-weight: bold;
                                    ">
                                        ${corrAbs >= 0.7 ? 'Strong' : corrAbs >= 0.3 ? 'Moderate' : 'Weak'}
                                    </div>
                                    ${isNext ? '<div style="position: absolute; right: -30px; font-size: 2em;">👉</div>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Selected Attributes Set -->
                <div style="background: #d4edda; border: 3px solid #27ae60; border-radius: 12px; padding: 20px;">
                    <h4 style="text-align: center; color: #27ae60; margin-bottom: 15px;">
                        ✅ Selected Attributes Set
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 10px; min-height: 400px;">
                        ${selectedCount === 0 ? `
                            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; font-style: italic;">
                                Empty Set - Start by adding best attribute
                            </div>
                        ` : ''}
                        ${selectedAttributes.map((attr, idx) => {
                            const corrAbs = Math.abs(attr.correlation);
                            return `
                                <div style="
                                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                                    border: 2px solid #229954;
                                    padding: 12px;
                                    border-radius: 8px;
                                    color: white;
                                    animation: scaleIn 0.5s;
                                    box-shadow: 0 4px 10px rgba(39, 174, 96, 0.3);
                                ">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <div style="font-weight: bold; font-size: 1.05em;">
                                                #${idx + 1} ${attr.name}
                                            </div>
                                            <div style="font-size: 0.85em; opacity: 0.9;">|r| = ${corrAbs.toFixed(3)}</div>
                                        </div>
                                        <div style="
                                            background: rgba(255,255,255,0.3);
                                            padding: 5px 12px;
                                            border-radius: 20px;
                                            font-size: 0.85em;
                                            font-weight: bold;
                                        ">
                                            Step ${idx + 1}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>

            <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <h4 style="color: #003366; margin-bottom: 10px;">Selection Strategy:</h4>
                <ol style="color: #666; line-height: 1.8;">
                    <li>Start with <strong>empty set</strong> of selected attributes</li>
                    <li>Evaluate all <strong>remaining attributes</strong> by their correlation with target</li>
                    <li>Select the attribute with <strong>highest |correlation|</strong></li>
                    <li>Add to selected set and remove from available pool</li>
                    <li>Repeat until threshold is met or desired number reached</li>
                </ol>
                <div style="margin-top: 15px; padding: 10px; background: white; border-left: 4px solid #3498db; border-radius: 4px;">
                    <strong>Current Rule:</strong> Select attributes with |correlation| ≥ 0.30
                </div>
            </div>
        </div>
    `;
}

function stepForwardSelection() {
    // Find next best unselected attribute
    const unselected = attributeData.filter(attr => !attr.selected);
    if (unselected.length === 0) {
        alert('All attributes have been evaluated!');
        return;
    }

    // Sort by absolute correlation (descending)
    unselected.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

    // Select the best one
    const best = unselected[0];
    best.selected = true;
    best.status = 'selected';
    selectedAttributes.push(best);
    forwardSelectionStep++;

    renderForwardSelection();
}

function autoForwardSelection() {
    // Auto-select all attributes with |correlation| >= 0.3
    const threshold = 0.3;
    const sorted = [...attributeData].sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

    let step = 0;
    const interval = setInterval(() => {
        const unselected = sorted.filter(attr => !attr.selected);
        if (unselected.length === 0 || Math.abs(unselected[0].correlation) < threshold) {
            clearInterval(interval);
            return;
        }

        const best = unselected[0];
        best.selected = true;
        best.status = 'selected';
        selectedAttributes.push(best);
        forwardSelectionStep++;
        renderForwardSelection();
        step++;
    }, 800);
}

function resetForwardSelection() {
    initForwardSelection();
}

// ===== BACKWARD ELIMINATION METHOD =====
function initBackwardElimination() {
    backwardEliminationStep = 0;
    removedAttributes = [];
    attributeData.forEach(attr => {
        attr.selected = true; // Start with all selected
        attr.status = 'selected';
    });
    renderBackwardElimination();
}

function renderBackwardElimination() {
    const container = document.getElementById('backwardEliminationViz');

    // Sort attributes by correlation (ascending) to show removal order
    const sortedAttrs = [...attributeData].sort((a, b) => Math.abs(a.correlation) - Math.abs(b.correlation));

    const remainingCount = attributeData.filter(a => a.selected).length;
    const removedCount = removedAttributes.length;

    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h3 style="color: #003366; margin: 0;">Backward Elimination Process</h3>
                <p style="color: #666; margin-top: 10px;">
                    Start with <strong>all attributes</strong> → Iteratively remove <strong>worst attribute</strong> → Repeat until optimal set remains
                </p>
                <div style="margin-top: 15px; padding: 15px; background: #ffebee; border-radius: 8px; display: inline-block;">
                    <strong>Current Step ${backwardEliminationStep}:</strong>
                    Remaining: <span style="color: #27ae60; font-size: 1.2em; font-weight: bold;">${remainingCount}</span> |
                    Removed: <span style="color: #e74c3c; font-size: 1.2em; font-weight: bold;">${removedCount}</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <!-- Current Feature Set -->
                <div style="background: #d4edda; border: 3px solid #27ae60; border-radius: 12px; padding: 20px;">
                    <h4 style="text-align: center; color: #27ae60; margin-bottom: 15px;">
                        ✅ Current Feature Set
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 10px; min-height: 400px;">
                        ${sortedAttrs.map((attr, idx) => {
                            if (!attr.selected) return '';
                            const corrAbs = Math.abs(attr.correlation);
                            const isWorst = backwardEliminationStep > 0 && idx === sortedAttrs.findIndex(a => a.selected);

                            return `
                                <div style="
                                    background: ${isWorst ? 'linear-gradient(135deg, #ffebee, #ffcdd2)' : 'white'};
                                    border: 2px solid ${isWorst ? '#e74c3c' : '#27ae60'};
                                    padding: 12px;
                                    border-radius: 8px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    animation: ${isWorst ? 'pulse 1.5s infinite' : 'fadeIn 0.5s'};
                                    box-shadow: ${isWorst ? '0 4px 15px rgba(231, 76, 60, 0.3)' : 'none'};
                                ">
                                    <div>
                                        <div style="font-weight: bold; color: #003366;">${attr.name}</div>
                                        <div style="font-size: 0.85em; color: #666;">|r| = ${corrAbs.toFixed(3)}</div>
                                    </div>
                                    <div style="
                                        background: ${corrAbs >= 0.7 ? '#27ae60' : corrAbs >= 0.3 ? '#f39c12' : '#e74c3c'};
                                        color: white;
                                        padding: 5px 12px;
                                        border-radius: 20px;
                                        font-size: 0.85em;
                                        font-weight: bold;
                                    ">
                                        ${corrAbs >= 0.7 ? 'Strong' : corrAbs >= 0.3 ? 'Moderate' : 'Weak'}
                                    </div>
                                    ${isWorst ? '<div style="position: absolute; right: -30px; font-size: 2em;">👉</div>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Removed Attributes -->
                <div style="background: #fff; border: 3px solid #e74c3c; border-radius: 12px; padding: 20px;">
                    <h4 style="text-align: center; color: #e74c3c; margin-bottom: 15px;">
                        🗑️ Removed Attributes
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 10px; min-height: 400px;">
                        ${removedCount === 0 ? `
                            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; font-style: italic;">
                                No attributes removed yet
                            </div>
                        ` : ''}
                        ${removedAttributes.map((attr, idx) => {
                            const corrAbs = Math.abs(attr.correlation);
                            return `
                                <div style="
                                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                                    border: 2px solid #a93226;
                                    padding: 12px;
                                    border-radius: 8px;
                                    color: white;
                                    animation: scaleIn 0.5s;
                                    box-shadow: 0 4px 10px rgba(231, 76, 60, 0.3);
                                    opacity: 0.9;
                                ">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <div style="font-weight: bold; font-size: 1.05em; text-decoration: line-through;">
                                                ${attr.name}
                                            </div>
                                            <div style="font-size: 0.85em; opacity: 0.9;">|r| = ${corrAbs.toFixed(3)}</div>
                                        </div>
                                        <div style="
                                            background: rgba(255,255,255,0.3);
                                            padding: 5px 12px;
                                            border-radius: 20px;
                                            font-size: 0.85em;
                                            font-weight: bold;
                                        ">
                                            Step ${idx + 1}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>

            <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                <h4 style="color: #003366; margin-bottom: 10px;">Elimination Strategy:</h4>
                <ol style="color: #666; line-height: 1.8;">
                    <li>Start with <strong>all attributes</strong> selected</li>
                    <li>Evaluate all <strong>current attributes</strong> by their correlation with target</li>
                    <li>Remove the attribute with <strong>lowest |correlation|</strong></li>
                    <li>Move to removed set and continue</li>
                    <li>Repeat until only strong predictors remain (|correlation| ≥ 0.30)</li>
                </ol>
                <div style="margin-top: 15px; padding: 10px; background: white; border-left: 4px solid #e74c3c; border-radius: 4px;">
                    <strong>Current Rule:</strong> Remove attributes with |correlation| < 0.30
                </div>
            </div>
        </div>
    `;
}

function stepBackwardElimination() {
    // Find worst selected attribute
    const selected = attributeData.filter(attr => attr.selected);
    if (selected.length === 0) {
        alert('No attributes remaining!');
        return;
    }

    // Sort by absolute correlation (ascending)
    selected.sort((a, b) => Math.abs(a.correlation) - Math.abs(b.correlation));

    // Remove the worst one
    const worst = selected[0];
    worst.selected = false;
    worst.status = 'removed';
    removedAttributes.push(worst);
    backwardEliminationStep++;

    renderBackwardElimination();
}

function autoBackwardElimination() {
    // Auto-remove all attributes with |correlation| < 0.3
    const threshold = 0.3;

    const interval = setInterval(() => {
        const selected = attributeData.filter(attr => attr.selected);
        const sorted = selected.sort((a, b) => Math.abs(a.correlation) - Math.abs(b.correlation));

        if (sorted.length === 0 || Math.abs(sorted[0].correlation) >= threshold) {
            clearInterval(interval);
            return;
        }

        const worst = sorted[0];
        worst.selected = false;
        worst.status = 'removed';
        removedAttributes.push(worst);
        backwardEliminationStep++;
        renderBackwardElimination();
    }, 800);
}

function resetBackwardElimination() {
    initBackwardElimination();
}

// ===== PCA - CREATIVE DIMENSION COLLAPSE VISUALIZATION =====
let pcaDataGenerated = false;
let originalDimensions = [];

function initPCA() {
    pcaDataGenerated = false;
    document.getElementById('pcaDimensions').innerHTML = '<p style="text-align: center; color: #999;">Click "Generate Sample Data" to start</p>';
    document.getElementById('pcaReduced').innerHTML = '';
    document.getElementById('varianceRetained').textContent = '0%';
}

function generatePCAData() {
    const dims = 10; // Show 10 dimensions for visualization
    originalDimensions = [];

    for (let i = 0; i < dims; i++) {
        originalDimensions.push({
            name: `D${i + 1}`,
            variance: Math.random() * 100
        });
    }

    // Render dimension bars
    const container = document.getElementById('pcaDimensions');
    container.innerHTML = '<div style="text-align: center; font-weight: bold; margin-bottom: 15px; color: #003366;">100 Original Dimensions (showing 10)</div>';

    const barsContainer = document.createElement('div');
    barsContainer.style.cssText = 'display: flex; justify-content: space-around; align-items: flex-end; height: 200px; padding: 0 20px;';

    originalDimensions.forEach((dim, index) => {
        setTimeout(() => {
            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 30px;
                height: ${dim.variance * 1.5}px;
                background: linear-gradient(to top, #3498db, #2980b9);
                border-radius: 4px 4px 0 0;
                position: relative;
                animation: growUp 0.5s;
                margin: 0 3px;
            `;
            bar.innerHTML = `<div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 0.8em; color: #666;">${dim.name}</div>`;
            barsContainer.appendChild(bar);
        }, index * 50);
    });

    container.appendChild(barsContainer);
    pcaDataGenerated = true;
}

function applyPCA() {
    if (!pcaDataGenerated) {
        alert('Please generate data first!');
        return;
    }

    // Sort by variance and take top 2
    const sorted = [...originalDimensions].sort((a, b) => b.variance - a.variance);
    const top2 = sorted.slice(0, 2);

    const container = document.getElementById('pcaReduced');
    container.innerHTML = '<div style="text-align: center; font-weight: bold; margin-bottom: 15px; color: #27ae60;">2 Principal Components</div>';

    const barsContainer = document.createElement('div');
    barsContainer.style.cssText = 'display: flex; justify-content: center; align-items: flex-end; height: 200px; gap: 60px; padding: 0 20px;';

    top2.forEach((dim, index) => {
        setTimeout(() => {
            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 80px;
                height: ${dim.variance * 1.5}px;
                background: linear-gradient(to top, #27ae60, #229954);
                border-radius: 4px 4px 0 0;
                position: relative;
                animation: scaleIn 0.6s;
            `;
            bar.innerHTML = `
                <div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-weight: bold; color: #27ae60;">PC${index + 1}</div>
                <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 0.9em; color: #666;">${(dim.variance).toFixed(1)}%</div>
            `;
            barsContainer.appendChild(bar);

            if (index === 1) {
                animateVariance();
            }
        }, index * 300);
    });

    container.appendChild(barsContainer);
}

function animateVariance() {
    let variance = 0;
    const target = 92;
    const interval = setInterval(() => {
        variance += 3;
        document.getElementById('varianceRetained').textContent = `${Math.min(variance, target)}%`;
        if (variance >= target) {
            clearInterval(interval);
        }
    }, 30);
}

function resetPCA() {
    initPCA();
}

// ===== NUMEROSITY REDUCTION - CREATIVE DENSITY VISUALIZATION =====
function initNumerosity() {
    renderNumerosityOriginal();
    document.getElementById('numerosityReduced').innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Select a reduction method to see results</p>';
    document.getElementById('reductionStats').innerHTML = '';
}

function renderNumerosityOriginal() {
    const container = document.getElementById('numerosityOriginal');
    container.innerHTML = '<div style="text-align: center; font-weight: bold; margin-bottom: 10px; color: #003366;">Original: 1,000 Data Points</div>';

    const canvas = document.createElement('div');
    canvas.style.cssText = 'width: 100%; height: 250px; background: #f8f9fa; border: 2px solid #ddd; position: relative; border-radius: 4px;';

    // Create dense point cloud
    for (let i = 0; i < 200; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 4px;
            height: 4px;
            background: #3498db;
            border-radius: 50%;
            position: absolute;
            left: ${Math.random() * 95}%;
            top: ${Math.random() * 95}%;
        `;
        canvas.appendChild(dot);
    }

    container.appendChild(canvas);
}

function showSampling() {
    const container = document.getElementById('numerosityReduced');
    container.innerHTML = '<div style="text-align: center; font-weight: bold; margin-bottom: 10px; color: #27ae60;">Random Sampling: 100 Points (10%)</div>';

    const canvas = document.createElement('div');
    canvas.style.cssText = 'width: 100%; height: 250px; background: #f8f9fa; border: 2px solid #27ae60; position: relative; border-radius: 4px;';

    // Sparse sampling
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                background: #27ae60;
                border-radius: 50%;
                position: absolute;
                left: ${Math.random() * 95}%;
                top: ${Math.random() * 95}%;
                animation: popIn 0.3s;
            `;
            canvas.appendChild(dot);
        }, i * 30);
    }

    container.appendChild(canvas);
    updateNumerosityStats('Random Sampling', 1000, 100, 90);
}

function showHistogram() {
    const container = document.getElementById('numerosityReduced');
    container.innerHTML = '<div style="text-align: center; font-weight: bold; margin-bottom: 10px; color: #e67e22;">Histogram: 25 Bins</div>';

    const canvas = document.createElement('div');
    canvas.style.cssText = 'width: 100%; height: 250px; background: #f8f9fa; border: 2px solid #e67e22; position: relative; border-radius: 4px; display: flex; align-items: flex-end; padding: 10px; gap: 2px;';

    // Create histogram bars
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const bar = document.createElement('div');
            const height = 20 + Math.random() * 80;
            bar.style.cssText = `
                flex: 1;
                height: ${height}%;
                background: linear-gradient(to top, #e67e22, #f39c12);
                border-radius: 2px 2px 0 0;
                animation: growUp 0.4s;
            `;
            canvas.appendChild(bar);
        }, i * 20);
    }

    container.appendChild(canvas);
    updateNumerosityStats('Histogram Binning', 1000, 25, 97.5);
}

function showClustering() {
    const container = document.getElementById('numerosityReduced');
    container.innerHTML = '<div style="text-align: center; font-weight: bold; margin-bottom: 10px; color: #9b59b6;">Clustering: 50 Centroids</div>';

    const canvas = document.createElement('div');
    canvas.style.cssText = 'width: 100%; height: 250px; background: #f8f9fa; border: 2px solid #9b59b6; position: relative; border-radius: 4px;';

    // Create clusters
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const centerX = 10 + Math.random() * 80;
            const centerY = 10 + Math.random() * 80;

            // Cluster centroid
            const centroid = document.createElement('div');
            centroid.style.cssText = `
                width: 12px;
                height: 12px;
                background: #9b59b6;
                border: 2px solid #fff;
                border-radius: 50%;
                position: absolute;
                left: ${centerX}%;
                top: ${centerY}%;
                z-index: 10;
                animation: pulse 1s infinite;
            `;
            canvas.appendChild(centroid);

            // Cluster points
            for (let j = 0; j < 3; j++) {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    width: 5px;
                    height: 5px;
                    background: rgba(155, 89, 182, 0.4);
                    border-radius: 50%;
                    position: absolute;
                    left: ${centerX + (Math.random() - 0.5) * 10}%;
                    top: ${centerY + (Math.random() - 0.5) * 10}%;
                `;
                canvas.appendChild(dot);
            }
        }, i * 60);
    }

    container.appendChild(canvas);
    updateNumerosityStats('K-Means Clustering', 1000, 50, 95);
}

function updateNumerosityStats(method, original, reduced, percentage) {
    const stats = document.getElementById('reductionStats');
    stats.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 4px;">
            <div style="text-align: center;">
                <div style="font-size: 0.9em; color: #666;">Method</div>
                <div style="font-size: 1.2em; font-weight: bold; color: #003366;">${method}</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 0.9em; color: #666;">Data Points</div>
                <div style="font-size: 1.2em; font-weight: bold; color: #3498db;">${original} → ${reduced}</div>
            </div>
            <div style="text-align: center;">
                <div style="font-size: 0.9em; color: #666;">Reduction</div>
                <div style="font-size: 1.2em; font-weight: bold; color: #27ae60;">${percentage}%</div>
            </div>
        </div>
    `;
}

function resetNumerosity() {
    initNumerosity();
}

// ===== DISCRETIZATION - CREATIVE HISTOGRAM BINNING VISUALIZATION =====
const ageData = [
    18, 22, 25, 28, 31, 19, 23, 27, 35, 42,
    48, 52, 58, 62, 67, 71, 45, 38, 33, 29,
    24, 21, 26, 36, 41, 47, 53, 59, 64, 69
];

function initDiscretization() {
    renderContinuousData();
}

function renderContinuousData() {
    const container = document.getElementById('discretizationViz');
    container.innerHTML = `
        <div style="text-align: center; font-weight: bold; margin-bottom: 15px; color: #003366;">
            Continuous Age Values (30 data points)
        </div>
        <div style="background: #f8f9fa; padding: 20px; border: 2px solid #ddd; border-radius: 4px; min-height: 200px; position: relative;">
            <div style="display: flex; align-items: flex-end; justify-content: center; height: 180px; gap: 3px;">
                ${ageData.map(age => `
                    <div style="
                        width: 15px;
                        height: ${(age / 75) * 100}%;
                        background: linear-gradient(to top, #3498db, #5dade2);
                        border-radius: 2px 2px 0 0;
                        position: relative;
                        animation: growUp 0.5s;
                    " title="${age} years">
                        <div style="position: absolute; bottom: -18px; font-size: 0.7em; color: #666; left: 50%; transform: translateX(-50%) rotate(-45deg); width: 30px;">${age}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function discretizeEqualWidth() {
    const min = Math.min(...ageData);
    const max = Math.max(...ageData);
    const binWidth = (max - min) / 3;

    const bins = [
        { label: 'Youth (18-41)', min: min, max: min + binWidth, color: '#3498db', count: 0 },
        { label: 'Adult (42-59)', min: min + binWidth, max: min + 2 * binWidth, color: '#e67e22', count: 0 },
        { label: 'Senior (60+)', min: min + 2 * binWidth, max: max, color: '#9b59b6', count: 0 }
    ];

    ageData.forEach(age => {
        bins.forEach(bin => {
            if (age >= bin.min && age <= bin.max) bin.count++;
        });
    });

    renderDiscretizedBins(bins, 'Equal-Width Binning');
}

function discretizeEqualFreq() {
    const sorted = [...ageData].sort((a, b) => a - b);
    const binSize = Math.floor(sorted.length / 3);

    const bins = [
        { label: 'Group 1', color: '#3498db', count: binSize, range: `${sorted[0]}-${sorted[binSize - 1]}` },
        { label: 'Group 2', color: '#e67e22', count: binSize, range: `${sorted[binSize]}-${sorted[2 * binSize - 1]}` },
        { label: 'Group 3', color: '#9b59b6', count: sorted.length - 2 * binSize, range: `${sorted[2 * binSize]}-${sorted[sorted.length - 1]}` }
    ];

    renderDiscretizedBinsFreq(bins, 'Equal-Frequency Binning');
}

function discretizeEntropy() {
    const bins = [
        { label: 'Youth (≤25)', color: '#3498db', count: ageData.filter(a => a <= 25).length },
        { label: 'Adult (26-60)', color: '#e67e22', count: ageData.filter(a => a > 25 && a <= 60).length },
        { label: 'Senior (>60)', color: '#9b59b6', count: ageData.filter(a => a > 60).length }
    ];

    renderDiscretizedBinsSimple(bins, 'Entropy-Based Discretization');
}

function renderDiscretizedBins(bins, methodName) {
    const container = document.getElementById('discretizationViz');
    const maxCount = Math.max(...bins.map(b => b.count));

    container.innerHTML = `
        <div style="text-align: center; font-weight: bold; margin-bottom: 15px; color: #27ae60;">
            ${methodName} - 3 Discrete Bins
        </div>
        <div style="background: #f8f9fa; padding: 30px; border: 2px solid #27ae60; border-radius: 4px;">
            <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 200px; gap: 20px;">
                ${bins.map((bin, index) => `
                    <div style="flex: 1; text-align: center; animation: scaleIn ${0.5 + index * 0.2}s;">
                        <div style="
                            height: ${(bin.count / maxCount) * 180}px;
                            background: linear-gradient(to top, ${bin.color}, ${bin.color}dd);
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 1.5em;
                            font-weight: bold;
                            margin-bottom: 10px;
                            position: relative;
                            animation: growUp 0.6s;
                        ">
                            ${bin.count}
                        </div>
                        <div style="font-weight: bold; color: #003366; margin-bottom: 5px;">${bin.label}</div>
                        <div style="font-size: 0.9em; color: #666;">${bin.min.toFixed(0)} - ${bin.max.toFixed(0)} years</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderDiscretizedBinsFreq(bins, methodName) {
    const maxCount = Math.max(...bins.map(b => b.count));
    const container = document.getElementById('discretizationViz');

    container.innerHTML = `
        <div style="text-align: center; font-weight: bold; margin-bottom: 15px; color: #27ae60;">
            ${methodName} - 3 Bins with Equal Frequencies
        </div>
        <div style="background: #f8f9fa; padding: 30px; border: 2px solid #27ae60; border-radius: 4px;">
            <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 200px; gap: 20px;">
                ${bins.map((bin, index) => `
                    <div style="flex: 1; text-align: center; animation: scaleIn ${0.5 + index * 0.2}s;">
                        <div style="
                            height: ${(bin.count / maxCount) * 180}px;
                            background: linear-gradient(to top, ${bin.color}, ${bin.color}dd);
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 1.5em;
                            font-weight: bold;
                            margin-bottom: 10px;
                            animation: growUp 0.6s;
                        ">
                            ${bin.count}
                        </div>
                        <div style="font-weight: bold; color: #003366; margin-bottom: 5px;">${bin.label}</div>
                        <div style="font-size: 0.9em; color: #666;">Ages: ${bin.range}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderDiscretizedBinsSimple(bins, methodName) {
    const maxCount = Math.max(...bins.map(b => b.count));
    const container = document.getElementById('discretizationViz');

    container.innerHTML = `
        <div style="text-align: center; font-weight: bold; margin-bottom: 15px; color: #27ae60;">
            ${methodName} - 3 Optimized Bins
        </div>
        <div style="background: #f8f9fa; padding: 30px; border: 2px solid #27ae60; border-radius: 4px;">
            <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 200px; gap: 20px;">
                ${bins.map((bin, index) => `
                    <div style="flex: 1; text-align: center; animation: scaleIn ${0.5 + index * 0.2}s;">
                        <div style="
                            height: ${(bin.count / maxCount) * 180}px;
                            background: linear-gradient(to top, ${bin.color}, ${bin.color}dd);
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 1.5em;
                            font-weight: bold;
                            margin-bottom: 10px;
                            animation: growUp 0.6s;
                        ">
                            ${bin.count}
                        </div>
                        <div style="font-weight: bold; color: #003366; margin-bottom: 5px;">${bin.label}</div>
                        <div style="font-size: 0.9em; color: #666;">${bin.count} people</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function resetDiscretization() {
    initDiscretization();
}

// ===== WAVELET TRANSFORMS - DIMENSIONALITY REDUCTION =====
let waveletData = [];
let waveletLevel = 0;

function initWavelet() {
    // Generate sample signal with 32 data points
    waveletData = [];
    for (let i = 0; i < 32; i++) {
        const signal = Math.sin(i * 0.4) * 30 + 50 + (Math.random() - 0.5) * 15;
        waveletData.push(signal);
    }
    waveletLevel = 0;
    renderWaveletViz();
}

function renderWaveletViz() {
    const container = document.getElementById('waveletViz');
    const max = Math.max(...waveletData);
    const min = Math.min(...waveletData);
    const range = max - min;

    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 1.2em; color: #003366; font-weight: bold; margin-bottom: 10px;">
                ${waveletLevel === 0 ? 'Original Data: 32 Points' : `Level ${waveletLevel}: ${waveletData.length} Coefficients`}
            </div>
            <div style="background: white; padding: 20px; border: 2px solid #ddd; border-radius: 4px;">
                <svg width="100%" height="200" viewBox="0 0 700 200">
                    <line x1="50" y1="180" x2="650" y2="180" stroke="#333" stroke-width="2"/>
                    <line x1="50" y1="20" x2="50" y2="180" stroke="#333" stroke-width="2"/>
                    ${waveletData.map((val, i) => {
                        const x = 50 + (i / (waveletData.length - 1)) * 600;
                        const y = 180 - ((val - min) / range) * 150;
                        return `
                            <circle cx="${x}" cy="${y}" r="4" fill="#3498db" opacity="0.8"/>
                            ${i < waveletData.length - 1 ? `
                                <line x1="${x}" y1="${y}"
                                      x2="${50 + ((i + 1) / (waveletData.length - 1)) * 600}"
                                      y2="${180 - ((waveletData[i + 1] - min) / range) * 150}"
                                      stroke="#3498db" stroke-width="2"/>
                            ` : ''}
                        `;
                    }).join('')}
                </svg>
                <div style="text-align: center; margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
                    <strong>Data Points:</strong> ${waveletData.length} |
                    <strong>Compression:</strong> ${100 - ((waveletData.length / 32) * 100).toFixed(1)}% |
                    <strong>Storage Saved:</strong> ${32 - waveletData.length} values
                </div>
            </div>
        </div>
    `;
}

function applyHaarWavelet() {
    if (waveletData.length <= 2) {
        alert('Maximum compression reached!');
        return;
    }

    const compressed = [];
    for (let i = 0; i < waveletData.length; i += 2) {
        const avg = (waveletData[i] + waveletData[i + 1]) / 2;
        compressed.push(avg);
    }

    waveletData = compressed;
    waveletLevel++;
    renderWaveletViz();
}

function resetWavelet() {
    initWavelet();
}

// ===== SAMPLING METHODS - NUMEROSITY REDUCTION =====
let population = [];

function initSamplingMethods() {
    population = [];
    for (let i = 0; i < 100; i++) {
        population.push({
            id: i,
            value: Math.random() * 100,
            stratum: i < 33 ? 'Group A' : i < 66 ? 'Group B' : 'Group C',
            cluster: Math.floor(i / 10)
        });
    }
    renderPopulation();
}

function renderPopulation() {
    const container = document.getElementById('samplingPopulation');
    container.innerHTML = `
        <div style="text-align: center; font-weight: bold; margin-bottom: 10px; color: #003366;">
            Population: 100 Data Points
        </div>
        <div style="background: #f8f9fa; border: 2px solid #ddd; padding: 20px; border-radius: 4px; display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
            ${population.map(p => `
                <div class="pop-point" data-id="${p.id}" style="
                    width: 8px; height: 8px; background: #3498db; border-radius: 50%;
                    animation: popIn 0.2s ${p.id * 0.005}s both;
                "></div>
            `).join('')}
        </div>
    `;
}

function applySRSWOR() {
    const sample = [];
    const poolCopy = [...population];
    for (let i = 0; i < 10; i++) {
        const idx = Math.floor(Math.random() * poolCopy.length);
        sample.push(poolCopy[idx]);
        poolCopy.splice(idx, 1);
    }
    renderSampleResult('SRSWOR - Without Replacement', sample, 'Each point has probability 1/N. Selected points removed from pool.');
}

function applySRSWR() {
    const sample = [];
    for (let i = 0; i < 10; i++) {
        const idx = Math.floor(Math.random() * population.length);
        sample.push(population[idx]);
    }
    renderSampleResult('SRSWR - With Replacement', sample, 'Each point has probability 1/N. Selected points remain in pool.');
}

function applyStratified() {
    const sample = [];
    ['Group A', 'Group B', 'Group C'].forEach(stratum => {
        const stratumData = population.filter(p => p.stratum === stratum);
        const sampleSize = Math.round(stratumData.length * 0.1);
        for (let i = 0; i < sampleSize; i++) {
            const idx = Math.floor(Math.random() * stratumData.length);
            sample.push(stratumData[idx]);
        }
    });
    renderSampleResult('Stratified Sampling', sample, 'Population divided into strata. Proportional sampling from each group.');
}

function applyCluster() {
    const selectedClusters = [2, 5, 8];
    const sample = population.filter(p => selectedClusters.includes(p.cluster));
    renderSampleResult('Cluster Sampling', sample, 'Select entire clusters. 3 of 10 clusters selected (pages in database).');
}

function renderSampleResult(method, sample, description) {
    const container = document.getElementById('samplingResult');
    const sampleIds = new Set(sample.map(s => s.id));

    container.innerHTML = `
        <div style="text-align: center; font-weight: bold; margin-bottom: 10px; color: #27ae60;">
            ${method}: ${sample.length} Points Selected
        </div>
        <div style="background: #f8f9fa; border: 2px solid #27ae60; padding: 20px; border-radius: 4px;">
            <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; margin-bottom: 15px;">
                ${population.map(p => `
                    <div style="
                        width: 8px; height: 8px; border-radius: 50%;
                        background: ${sampleIds.has(p.id) ? '#27ae60' : 'rgba(52, 152, 219, 0.2)'};
                        transform: ${sampleIds.has(p.id) ? 'scale(1.4)' : 'scale(1)'};
                        transition: all 0.3s;
                    "></div>
                `).join('')}
            </div>
            <div style="background: white; padding: 15px; border-radius: 4px;">
                <strong>Method:</strong> ${description}<br>
                <strong>Sample Size:</strong> ${sample.length}/100<br>
                <strong>Reduction:</strong> ${((1 - sample.length/100) * 100).toFixed(0)}%
            </div>
        </div>
    `;
}

function resetSamplingMethods() {
    initSamplingMethods();
    document.getElementById('samplingResult').innerHTML = '<p style="text-align:center;color:#999;padding:40px;">Select a sampling method</p>';
}

// ===== HISTOGRAM TYPES - NUMEROSITY REDUCTION =====
const histogramData = [1, 1, 5, 5, 5, 5, 5, 8, 8, 10, 10, 10, 10, 12, 14, 14, 14, 15, 15, 15,
                       15, 15, 15, 18, 18, 18, 18, 18, 18, 18, 18, 20, 20, 20, 20, 20, 20, 20,
                       21, 21, 21, 21, 25, 25, 25, 25, 25, 28, 28, 30, 30, 30];

function initHistogramTypes() {
    renderHistogramComparison();
}

function renderHistogramComparison() {
    const container = document.getElementById('histogramComparison');

    // Equal-Width (uniform width)
    const min = Math.min(...histogramData);
    const max = Math.max(...histogramData);
    const binWidth = (max - min) / 3;
    const equalWidth = [
        { range: `${min}-${Math.round(min + binWidth)}`, count: histogramData.filter(v => v >= min && v < min + binWidth).length },
        { range: `${Math.round(min + binWidth)}-${Math.round(min + 2*binWidth)}`, count: histogramData.filter(v => v >= min + binWidth && v < min + 2*binWidth).length },
        { range: `${Math.round(min + 2*binWidth)}-${max}`, count: histogramData.filter(v => v >= min + 2*binWidth).length }
    ];

    // Equal-Frequency (uniform count)
    const sorted = [...histogramData].sort((a,b) => a-b);
    const perBin = Math.floor(sorted.length / 3);
    const equalFreq = [
        { range: `${sorted[0]}-${sorted[perBin-1]}`, count: perBin },
        { range: `${sorted[perBin]}-${sorted[2*perBin-1]}`, count: perBin },
        { range: `${sorted[2*perBin]}-${sorted[sorted.length-1]}`, count: sorted.length - 2*perBin }
    ];

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            ${renderHistogramType('Equal-Width Histogram', equalWidth, 'Uniform bin width = ' + binWidth.toFixed(1), '#3498db')}
            ${renderHistogramType('Equal-Frequency Histogram', equalFreq, 'Uniform frequency ≈ ' + perBin + ' items/bin', '#e67e22')}
        </div>
        <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 4px;">
            <strong>Original Data:</strong> ${histogramData.length} values → <strong>Reduced:</strong> 3 bins<br>
            <strong>Reduction:</strong> ${((1 - 3/histogramData.length) * 100).toFixed(1)}%
            (${histogramData.length} → 3 values = ${histogramData.length - 3} fewer values stored)
        </div>
    `;
}

function renderHistogramType(title, bins, description, color) {
    const maxCount = Math.max(...bins.map(b => b.count));
    return `
        <div style="border: 2px solid ${color}; padding: 20px; border-radius: 8px; background: white;">
            <h4 style="text-align: center; color: ${color}; margin-bottom: 15px;">${title}</h4>
            <div style="display: flex; align-items: flex-end; justify-content: space-around; height: 200px; margin-bottom: 15px;">
                ${bins.map((bin, i) => `
                    <div style="text-align: center; flex: 1;">
                        <div style="
                            height: ${(bin.count/maxCount) * 180}px;
                            background: linear-gradient(to top, ${color}, ${color}dd);
                            margin: 0 10px;
                            border-radius: 4px 4px 0 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-weight: bold;
                            font-size: 1.3em;
                            animation: growUp 0.5s ${i * 0.2}s both;
                        ">${bin.count}</div>
                        <div style="margin-top: 8px; font-size: 0.85em; color: #666;">${bin.range}</div>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 4px; font-size: 0.9em;">
                ${description}
            </div>
        </div>
    `;
}

// ===== REGRESSION - NUMEROSITY REDUCTION =====
const regressionData = [
    {x: 1, y: 2.5}, {x: 2, y: 3.1}, {x: 3, y: 4.2}, {x: 4, y: 5.0},
    {x: 5, y: 6.1}, {x: 6, y: 6.8}, {x: 7, y: 8.2}, {x: 8, y: 9.0}
];

function initRegression() {
    renderRegressionViz();
}

function renderRegressionViz() {
    const container = document.getElementById('regressionViz');

    // Calculate linear regression: y = mx + b
    const n = regressionData.length;
    const sumX = regressionData.reduce((s, p) => s + p.x, 0);
    const sumY = regressionData.reduce((s, p) => s + p.y, 0);
    const sumXY = regressionData.reduce((s, p) => s + p.x * p.y, 0);
    const sumX2 = regressionData.reduce((s, p) => s + p.x * p.x, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    const minX = Math.min(...regressionData.map(p => p.x));
    const maxX = Math.max(...regressionData.map(p => p.x));
    const minY = Math.min(...regressionData.map(p => p.y));
    const maxY = Math.max(...regressionData.map(p => p.y));

    const x1 = minX, y1 = m * minX + b;
    const x2 = maxX, y2 = m * maxX + b;

    container.innerHTML = `
        <div style="text-align: center; font-weight: bold; margin-bottom: 15px; color: #003366;">
            Linear Regression: Data Reduction via Parametric Model
        </div>
        <div style="background: white; padding: 30px; border: 2px solid #ddd; border-radius: 4px;">
            <svg width="100%" height="300" viewBox="0 0 700 300">
                <!-- Axes -->
                <line x1="80" y1="250" x2="650" y2="250" stroke="#333" stroke-width="2"/>
                <line x1="80" y1="50" x2="80" y2="250" stroke="#333" stroke-width="2"/>

                <!-- Grid -->
                ${[1,2,3,4,5,6,7,8].map(i => `
                    <line x1="${80 + i*70}" y1="250" x2="${80 + i*70}" y2="245" stroke="#666" stroke-width="1"/>
                    <text x="${80 + i*70}" y="270" text-anchor="middle" font-size="12">${i}</text>
                `).join('')}

                <!-- Regression Line -->
                <line x1="${80 + (x1-minX)/(maxX-minX)*560}"
                      y1="${250 - (y1-minY)/(maxY-minY)*190}"
                      x2="${80 + (x2-minX)/(maxX-minX)*560}"
                      y2="${250 - (y2-minY)/(maxY-minY)*190}"
                      stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>

                <!-- Data Points -->
                ${regressionData.map(p => {
                    const px = 80 + (p.x-minX)/(maxX-minX)*560;
                    const py = 250 - (p.y-minY)/(maxY-minY)*190;
                    return `<circle cx="${px}" cy="${py}" r="6" fill="#3498db" stroke="white" stroke-width="2"/>`;
                }).join('')}

                <text x="350" y="290" text-anchor="middle" font-size="14" fill="#666">X values</text>
                <text x="40" y="150" text-anchor="middle" font-size="14" fill="#666" transform="rotate(-90 40 150)">Y values</text>
            </svg>

            <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="padding: 15px; background: #e3f2fd; border-radius: 4px;">
                    <strong>Original Data Storage:</strong><br>
                    ${n} points × 2 values = <strong>${n * 2} values</strong>
                </div>
                <div style="padding: 15px; background: #ffebee; border-radius: 4px;">
                    <strong>Regression Model Storage:</strong><br>
                    y = ${m.toFixed(3)}x + ${b.toFixed(3)} = <strong>2 parameters</strong>
                </div>
            </div>

            <div style="margin-top: 15px; padding: 15px; background: #c8e6c9; border-radius: 4px; text-align: center;">
                <strong>Data Reduction:</strong> ${((1 - 2/(n*2)) * 100).toFixed(1)}%
                (${n*2} values → 2 parameters = ${n*2 - 2} fewer values!)
            </div>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Enhanced Data Reduction Visualizations loaded!');
});
