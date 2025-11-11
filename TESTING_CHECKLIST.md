# Visualization Testing Checklist

## Overview
This document contains the testing checklist for all 5 data reduction technique visualizations.

## Test Environment
- Browser: Chrome/Firefox/Edge
- Screen sizes: Desktop (1920px), Tablet (768px), Mobile (375px)

## 1. Data Cube Aggregation ✓

### Visual Elements:
- [ ] Daily view shows 21 blocks in 7x3 grid
- [ ] Monthly view shows 3 large cards
- [ ] Yearly view shows 1 single large card
- [ ] Total sales value preserved across all levels
- [ ] No horizontal scrolling required
- [ ] Animations smooth (fadeIn, scaleIn)

### Interaction Tests:
1. Click "View Interactive Demonstration" button
2. Modal opens with daily data (21 blocks)
3. Click "Step 1: Aggregate Daily → Monthly"
   - Verify: Shows 3 monthly cards
   - Verify: Shows "85% Reduction"
   - Verify: Total preserved
4. Click "Step 2: Aggregate Monthly → Yearly"
   - Verify: Shows 1 yearly card
   - Verify: Shows "97% Reduction"
   - Verify: Total preserved
5. Click "Reset to Daily Data"
   - Verify: Returns to 21 blocks

### Expected Behavior:
✓ Grid layout contains content (max-width: 700px)
✓ All sales values visible without scrolling
✓ Color progression: Blue (daily) → Dark (monthly) → Green (yearly)

---

## 2. Attribute Selection ✓

### Visual Elements:
- [ ] 10 feature cards in responsive grid
- [ ] Each card shows correlation meter
- [ ] Color-coded: Green (relevant) / Red (irrelevant)
- [ ] Cards have "KEEP" or "REMOVE" labels
- [ ] Progress bar at bottom
- [ ] No horizontal scrolling

### Interaction Tests:
1. Click "View Interactive Demonstration"
2. Modal opens with 10 cards animating in
3. Click "Step 1: Analyze Correlations"
   - Verify: Each card pulses/highlights in sequence
4. Click "Step 2: Remove Irrelevant Features"
   - Verify: 4 red cards shrink and disappear with rotation
   - Verify: Progress bar shows "40% Removed | 6/10 Features Kept"
5. Click "Reset Features"
   - Verify: All 10 cards return

### Expected Behavior:
✓ Cards arranged in grid (min 200px each)
✓ Correlation meters show visual strength (0.0 to 1.0)
✓ Smooth removal animation (scale + rotate)
✓ Responsive: 1 column on mobile, multiple on desktop

---

## 3. Principal Component Analysis (PCA) ✓

### Visual Elements:
- [ ] Left panel: 10 dimensional bars (representing 100D)
- [ ] Right panel: 2 principal component bars
- [ ] Variance retained percentage counter
- [ ] Color transition: Blue (original) → Green (PCA)
- [ ] No overflow

### Interaction Tests:
1. Click "View Interactive Demonstration"
2. Click "Step 1: Generate Sample Data (100D)"
   - Verify: 10 bars appear with varying heights
   - Verify: Label shows "100 Original Dimensions (showing 10)"
3. Click "Step 2: Apply PCA (100D → 2D)"
   - Verify: Right panel shows 2 large bars (PC1, PC2)
   - Verify: Variance counter animates to ~92%
   - Verify: Bars labeled with variance percentages

### Expected Behavior:
✓ Bars grow from bottom up (growUp animation)
✓ Two-column comparison layout
✓ Variance counter animated smoothly (0% → 92%)
✓ Labels clear and positioned correctly

---

## 4. Numerosity Reduction ✓

### Visual Elements:
- [ ] Left: Dense point cloud (200 visible points representing 1000)
- [ ] Right: Reduced representation (varies by method)
- [ ] Stats panel showing method, count, and reduction %
- [ ] Color coding per method: Green (sampling), Orange (histogram), Purple (clustering)
- [ ] No overflow

### Interaction Tests:
1. Click "View Interactive Demonstration"
2. Original data loads (left panel with many points)
3. Click "Method 1: Random Sampling (10%)"
   - Verify: Right panel shows ~20 green dots appearing
   - Verify: Stats: "1000 → 100 | 90% Reduction"
4. Click "Method 2: Histogram Binning"
   - Verify: Right panel shows 25 histogram bars
   - Verify: Stats: "1000 → 25 | 97.5% Reduction"
5. Click "Method 3: Clustering (50 centroids)"
   - Verify: Right panel shows ~12 purple clusters
   - Verify: Each cluster has centroid + surrounding points
   - Verify: Stats: "1000 → 50 | 95% Reduction"

### Expected Behavior:
✓ Side-by-side comparison (desktop) / stacked (mobile)
✓ Points animate in (popIn animation)
✓ Stats panel updates correctly
✓ Different visual metaphors for each method

---

## 5. Discretization ✓

### Visual Elements:
- [ ] Initial: 30 continuous age values as bars
- [ ] After discretization: 3 bins with counts
- [ ] Color-coded bins: Blue, Orange, Purple
- [ ] Labels showing age ranges
- [ ] No overflow

### Interaction Tests:
1. Click "View Interactive Demonstration"
2. Continuous data appears (30 small bars with ages)
3. Click "Method 1: Equal-Width Binning"
   - Verify: Transforms to 3 bins
   - Verify: Labels show age ranges (18-41, 42-59, 60+)
   - Verify: Each bin shows count
4. Click "Method 2: Equal-Frequency Binning"
   - Verify: 3 bins with similar heights
   - Verify: Age ranges shown
5. Click "Method 3: Entropy-Based"
   - Verify: 3 bins (Youth ≤25, Adult 26-60, Senior >60)
   - Verify: Counts displayed
6. Click "Reset"
   - Verify: Returns to continuous visualization

### Expected Behavior:
✓ Smooth transition from continuous to discrete
✓ Bins grow upward (growUp animation)
✓ Counts clearly visible inside bins
✓ Method name displayed at top

---

## Cross-Browser Testing

### Chrome:
- [ ] All visualizations render correctly
- [ ] Animations smooth
- [ ] No console errors

### Firefox:
- [ ] All visualizations render correctly
- [ ] Animations smooth
- [ ] No console errors

### Edge:
- [ ] All visualizations render correctly
- [ ] Animations smooth
- [ ] No console errors

---

## Responsive Testing

### Desktop (1920×1080):
- [ ] All content fits width
- [ ] Two-column layouts work
- [ ] Modals centered properly

### Tablet (768×1024):
- [ ] Grids adjust to single column where needed
- [ ] Cards stack properly
- [ ] Buttons full width

### Mobile (375×667):
- [ ] All text readable
- [ ] Controls stack vertically
- [ ] No horizontal scrolling anywhere
- [ ] Modals use full width

---

## Performance Testing

- [ ] Page loads in < 2 seconds
- [ ] Timer starts correctly
- [ ] Animations run at 60fps
- [ ] No memory leaks on repeated interactions
- [ ] All modals open/close smoothly

---

## Common Issues Fixed

✓ Data Cube bars no longer exceed page width (max-width: 700px)
✓ All visualizations use contained layouts
✓ Responsive grids prevent overflow
✓ Animations properly keyframed
✓ All container IDs match JavaScript
✓ Progress bars and stats update correctly

---

## Final Verification

- [ ] README.md instructions accurate
- [ ] All files in correct location
- [ ] No TODO comments in code
- [ ] Git ready for deployment
- [ ] Vercel deployment configuration valid
