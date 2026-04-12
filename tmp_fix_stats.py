import os

file_path = r'c:\Users\haldhaher\Desktop\LEAN SIX SIGMA INTERACTIVE PLATFORM\04-STATISTICS-TOOLS\Calculator_DescriptiveStats.html'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# I will use a very loose search to find the start and end of calcStats
import re

calc_stats_pattern = re.compile(r'function calcStats\(\) \{.*?updateProgress\(100\);\s+\}', re.DOTALL)

new_calc_stats = """function calcStats() {
                                 let raw = document.getElementById('dataInput').value;
                                 let data = raw.replace(/\\n/g, ',').split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));

                                 if (data.length < 3) { alert("Please enter at least 3 numbers for a valid statistical audit."); return; }

                                 const n = data.length;
                                 const sum = data.reduce((a, b) => a + b, 0);
                                 const mean = sum / n;
                                 const sorted = [...data].sort((a, b) => a - b);
                                 
                                 // Central Tendency
                                 const median = jStat.percentile(data, 0.50);
                                 
                                 // Mode calculation (Multi-modal support)
                                 const counts = {};
                                 data.forEach(v => counts[v] = (counts[v] || 0) + 1);
                                 let maxFreq = 0;
                                 for (let v in counts) if (counts[v] > maxFreq) maxFreq = counts[v];
                                 let modes = [];
                                 for (let v in counts) if (counts[v] === maxFreq) modes.push(Number(v));
                                 const modeDisplay = (maxFreq === 1 || modes.length === n) ? "None" : modes.join(", ");

                                 // Variation & Precision
                                 const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
                                 const stdDev = Math.sqrt(variance);
                                 const cv = (stdDev / mean) * 100;
                                 
                                 // Exact Confidence Interval (95% T-distribution)
                                 const se = stdDev / Math.sqrt(n);
                                 const tCrit = jStat.studentt.inv(0.975, n - 1);
                                 const ci = tCrit * se;

                                 // High Precision Shape (Sample Adjusted Fisher-Pearson)
                                 let skew = 0, kurt = 0;
                                 if (n > 2) {
                                     const m3 = data.reduce((a, b) => a + Math.pow(b - mean, 3), 0) / n;
                                     const m2 = variance * (n - 1) / n;
                                     const g1 = m3 / Math.pow(m2, 1.5);
                                     skew = (Math.sqrt(n * (n - 1)) / (n - 2)) * g1;
                                 }
                                 if (n > 3) {
                                     const m4 = data.reduce((a, b) => a + Math.pow(b - mean, 4), 0) / n;
                                     const m2 = variance * (n - 1) / n;
                                     const g2 = (m4 / Math.pow(m2, 2)) - 3;
                                     kurt = ((n - 1) / ((n - 2) * (n - 3))) * ((n + 1) * g2 + 6);
                                 }

                                 // Robust Normality Inference
                                 const ses = Math.sqrt((6 * n * (n - 1)) / ((n - 2) * (n + 1) * (n + 3)));
                                 const zSkew = skew / ses;
                                 const pVal = Math.max(0.001, 2 * (1 - jStat.normal.cdf(Math.abs(zSkew), 0, 1)));

                                 // Outlier Audit (Tukey's Method)
                                 const q1 = jStat.percentile(data, 0.25);
                                 const q3 = jStat.percentile(data, 0.75);
                                 const iqr = q3 - q1;
                                 const lowFence = q1 - 1.5 * iqr;
                                 const highFence = q3 + 1.5 * iqr;
                                 const outliers = data.filter(x => x < lowFence || x > highFence);

                                 // Whiskers for Box Plot
                                 let whiskerLow = sorted.find(x => x >= lowFence) || sorted[0];
                                 let whiskerHigh = [...sorted].reverse().find(x => x <= highFence) || sorted[n - 1];

                                 // Dashboard Population
                                 document.getElementById('resultsPanel').style.display = 'block';
                                 document.getElementById('resN').innerText = n;
                                 document.getElementById('resMean').innerText = mean.toFixed(4);
                                 document.getElementById('resMedian').innerText = median.toFixed(4);
                                 document.getElementById('resMode').innerText = modeDisplay;
                                 document.getElementById('resCI').innerText = "± " + ci.toFixed(4) + " (95% T)";
                                 document.getElementById('resStdDev').innerText = stdDev.toFixed(4);
                                 document.getElementById('resVar').innerText = "V: " + variance.toFixed(4);
                                 document.getElementById('resCV').innerText = cv.toFixed(2) + "%";
                                 document.getElementById('resRange').innerText = (sorted[sorted.length - 1] - sorted[0]).toFixed(2);
                                 document.getElementById('resMinMax').innerText = sorted[0] + " to " + sorted[sorted.length - 1];
                                 document.getElementById('resSkew').innerText = skew.toFixed(3);
                                 document.getElementById('skewDesc').innerText = Math.abs(skew) < 0.5 ? "Symmetric" : (skew > 0 ? "Right Skew" : "Left Skew");
                                 document.getElementById('resKurt').innerText = kurt.toFixed(3);
                                 document.getElementById('resP').innerText = "P-Value: " + pVal.toFixed(3);
                                 document.getElementById('resAD').innerText = pVal < 0.05 ? "Significant Non-Normal" : "Normality Likely";
                                 document.getElementById('resAD').style.color = pVal < 0.05 ? "var(--error)" : "var(--success)";
                                 document.getElementById('resOutliers').innerText = outliers.length;
                                 document.getElementById('resOutliers').style.color = outliers.length > 0 ? "var(--error)" : "white";

                                 renderCharts(data, sorted, mean, stdDev, skew, outliers.length);
                                 drawHighResBoxPlot(sorted[0], q1, median, q3, sorted[sorted.length - 1], whiskerLow, whiskerHigh, outliers);
                                 updateInterpretations(mean, stdDev, skew, outliers.length, pVal, cv);
                                 generateAutoSummary(n, mean, median, stdDev, cv, skew, kurt, pVal, outliers.length);
                                 updateProgress(100);
                             }"""

if calc_stats_pattern.search(content):
    new_content = calc_stats_pattern.sub(new_calc_stats, content)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print("PATTERN NOT FOUND")
