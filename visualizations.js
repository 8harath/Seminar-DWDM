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
        'discretization': 'discretizationModal'
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
const dailySalesData = [
    { date: 'Jan 1', sales: 1200 },
    { date: 'Jan 2', sales: 1500 },
    { date: 'Jan 3', sales: 1100 },
    { date: 'Jan 4', sales: 1800 },
    { date: 'Jan 5', sales: 1600 },
    { date: 'Jan 6', sales: 2100 },
    { date: 'Jan 7', sales: 1900 },
    { date: 'Feb 1', sales: 1300 },
    { date: 'Feb 2', sales: 1700 },
    { date: 'Feb 3', sales: 1400 },
    { date: 'Feb 4', sales: 1900 },
    { date: 'Feb 5', sales: 2000 },
    { date: 'Feb 6', sales: 2200 },
    { date: 'Feb 7', sales: 1800 },
    { date: 'Mar 1', sales: 1600 },
    { date: 'Mar 2', sales: 1900 },
    { date: 'Mar 3', sales: 1700 },
    { date: 'Mar 4', sales: 2100 },
    { date: 'Mar 5', sales: 2300 },
    { date: 'Mar 6', sales: 2400 },
    { date: 'Mar 7', sales: 2000 }
];

function initDataCube() {
    dataCubeState = 'daily';
    renderDataCubeFunnel('daily');
}

function renderDataCubeFunnel(level) {
    const container = document.getElementById('datacubeChart');
    container.innerHTML = '';

    if (level === 'daily') {
        // Show daily data as small blocks in a grid
        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 1.2em; color: #003366; font-weight: bold; margin-bottom: 10px;">
                    DAILY LEVEL: 21 Records
                </div>
                <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; max-width: 700px; margin: 0 auto;">
                    ${dailySalesData.map(d => `
                        <div class="data-block daily-block" style="background: #3498db; padding: 8px; border-radius: 4px; color: white; font-size: 0.75em; text-align: center; animation: fadeIn 0.5s;">
                            <div style="font-weight: bold;">${d.date}</div>
                            <div>$${(d.sales/1000).toFixed(1)}k</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 20px; font-size: 1.1em; color: #27ae60; font-weight: bold;">
                    Total: $${dailySalesData.reduce((sum, d) => sum + d.sales, 0).toLocaleString()}
                </div>
            </div>
        `;
    } else if (level === 'monthly') {
        const monthlyData = [
            { date: 'January', sales: dailySalesData.slice(0, 7).reduce((sum, d) => sum + d.sales, 0) },
            { date: 'February', sales: dailySalesData.slice(7, 14).reduce((sum, d) => sum + d.sales, 0) },
            { date: 'March', sales: dailySalesData.slice(14).reduce((sum, d) => sum + d.sales, 0) }
        ];

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 1.2em; color: #003366; font-weight: bold; margin-bottom: 10px;">
                    MONTHLY LEVEL: 3 Records (85% Reduction)
                </div>
                <div style="display: flex; justify-content: center; gap: 20px; max-width: 700px; margin: 0 auto;">
                    ${monthlyData.map(d => `
                        <div class="data-block monthly-block" style="background: #2c3e50; padding: 25px; border-radius: 8px; color: white; flex: 1; text-align: center; animation: scaleIn 0.6s;">
                            <div style="font-size: 1.3em; font-weight: bold; margin-bottom: 10px;">${d.date}</div>
                            <div style="font-size: 1.5em; color: #3498db;">$${(d.sales/1000).toFixed(1)}k</div>
                            <div style="font-size: 0.9em; margin-top: 8px; opacity: 0.8;">Aggregated from 7 days</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 20px; font-size: 1.1em; color: #27ae60; font-weight: bold;">
                    Total: $${monthlyData.reduce((sum, d) => sum + d.sales, 0).toLocaleString()}
                </div>
            </div>
        `;
    } else if (level === 'yearly') {
        const totalSales = dailySalesData.reduce((sum, d) => sum + d.sales, 0);

        container.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 1.2em; color: #003366; font-weight: bold; margin-bottom: 20px;">
                    YEARLY LEVEL: 1 Record (97% Reduction)
                </div>
                <div style="display: flex; justify-content: center; max-width: 700px; margin: 0 auto;">
                    <div class="data-block yearly-block" style="background: #27ae60; padding: 40px 60px; border-radius: 12px; color: white; text-align: center; animation: scaleIn 0.8s;">
                        <div style="font-size: 1.5em; font-weight: bold; margin-bottom: 15px;">Q1 2024</div>
                        <div style="font-size: 2.5em; font-weight: bold; color: #fff;">$${(totalSales/1000).toFixed(1)}k</div>
                        <div style="font-size: 1em; margin-top: 15px; opacity: 0.9;">Aggregated from 21 days</div>
                        <div style="font-size: 1em; margin-top: 5px; opacity: 0.9;">Across 3 months</div>
                    </div>
                </div>
                <div style="margin-top: 20px; font-size: 1.1em; color: #27ae60; font-weight: bold;">
                    Total Preserved: $${totalSales.toLocaleString()}
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
    dataCubeState = 'yearly';
    renderDataCubeFunnel('yearly');
}

function resetDataCube() {
    initDataCube();
}

// ===== ATTRIBUTE SELECTION - CREATIVE CARD VISUALIZATION =====
let attributeData = [
    { name: 'Customer Age', correlation: 0.72, variance: 145.2, status: 'Relevant' },
    { name: 'Annual Income', correlation: 0.85, variance: 2341.5, status: 'Relevant' },
    { name: 'Customer ID', correlation: 0.02, variance: 98123.4, status: 'Irrelevant' },
    { name: 'Purchase Frequency', correlation: 0.68, variance: 23.4, status: 'Relevant' },
    { name: 'Account Creation Date', correlation: 0.15, variance: 1234.1, status: 'Irrelevant' },
    { name: 'Credit Score', correlation: 0.79, variance: 1234.5, status: 'Relevant' },
    { name: 'Random UUID', correlation: 0.01, variance: 99999.9, status: 'Irrelevant' },
    { name: 'Product Category', correlation: 0.61, variance: 12.3, status: 'Relevant' },
    { name: 'Zip Code', correlation: 0.12, variance: 4567.8, status: 'Irrelevant' },
    { name: 'Last Purchase Days', correlation: 0.58, variance: 234.5, status: 'Relevant' }
];

function initAttributes() {
    renderAttributeCards();
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
    initAttributes();
    document.getElementById('attributeProgress').style.width = '0%';
    document.getElementById('attributeProgress').textContent = '0% Removed';
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Enhanced Data Reduction Visualizations loaded!');
});
