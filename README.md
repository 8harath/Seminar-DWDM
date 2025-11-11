# Data Reduction - Interactive Seminar Presentation 🎓

An interactive, visual learning experience on Data Reduction techniques for Data Warehousing and Data Mining (Module 3).

## 🌟 Features

This interactive seminar includes **5 visual demonstrations** of core data reduction techniques:

1. **Data Cube Aggregation** - Watch daily data transform into monthly and yearly summaries
2. **Attribute Selection** - See irrelevant features get removed based on correlation analysis
3. **Dimensionality Reduction (PCA)** - Visualize high-dimensional data projected into 2D space
4. **Numerosity Reduction** - Compare sampling, histograms, and clustering techniques
5. **Discretization** - Transform continuous age values into categorical bins

### ✨ Interactive Elements

- **Click on any technique card** to open an interactive demonstration
- **Real-time animations** showing the reduction process
- **Side-by-side comparisons** of before/after states
- **Progress bars** showing reduction percentages
- **Built-in timer** for presentation time management
- **Responsive design** works on desktop, tablet, and mobile

## 🚀 Quick Start

### Local Development

1. **Clone or download** this project
2. **Open `index.html`** in any modern web browser
3. **That's it!** No build process required - it's pure HTML, CSS, and JavaScript

```bash
# If using a local server (recommended):
npx serve .
# or
python -m http.server 8000
```

## 🌐 Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
```bash
cd seminar
git init
git add .
git commit -m "Initial commit: Data Reduction Interactive Seminar"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/data-reduction-seminar.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings
   - Click "Deploy"
   - Your site will be live at `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project folder
cd seminar

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? data-reduction-seminar
# - Directory? ./
# - Override settings? No

# Your site is now live!
```

### Method 3: Drag & Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag the `seminar` folder onto the Vercel dashboard
3. Done! Your site is deployed

## 📁 Project Structure

```
seminar/
├── index.html              # Main HTML file with all content and modals
├── visualizations.js       # JavaScript for all interactive visualizations
├── DWDM MODULE 3 NOTES.pdf # Reference material (not deployed)
└── README.md              # This file
```

## 🎯 How to Use During Presentation

### For the Presenter:

1. **Start with the overview** - Explain why data reduction is important
2. **Click each technique card** sequentially (1-5)
3. **Run the demonstrations** using the interactive buttons
4. **Use the timer** in the top-right to manage your time
5. **Key talking points** are included in each modal

### For Students:

- **Explore at your own pace** - Click any technique that interests you
- **Experiment with the controls** - Try different buttons to see how each method works
- **Read the key points** at the bottom of each demonstration
- **Compare before/after** visualizations to understand the impact

## 🎨 Customization

### Change Colors

Edit the CSS variables in `index.html`:

```css
:root {
    --primary: #2c3e50;      /* Main text color */
    --secondary: #3498db;    /* Interactive elements */
    --accent: #e74c3c;       /* Highlights */
    --success: #27ae60;      /* Success states */
    --warning: #f39c12;      /* Warning states */
}
```

### Add Your Name

Find this line in `index.html` and replace "Your Name":

```html
<p style="color: #95a5a6; margin-top: 10px;">Interactive Seminar by Your Name</p>
```

### Modify Data

All demonstration data is in `visualizations.js`. For example:

```javascript
// Change sales data in Data Cube demo
const dailySalesData = [
    { date: 'Jan 1', sales: 1200 },
    // Modify values here
];

// Change age data in Discretization demo
const ageData = [18, 22, 25, 28, ...];
```

## 📊 Technical Details

### Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with flexbox, grid, animations
- **Vanilla JavaScript** - No frameworks required
- **No dependencies** - Everything runs in the browser

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Performance

- Loads in < 1 second
- Smooth 60fps animations
- Optimized for 1000+ data points
- Mobile-responsive

## 🎓 Educational Objectives

After exploring this seminar, students will understand:

1. **What** data reduction is and why it's essential
2. **When** to use each of the 5 core techniques
3. **How** each technique works visually
4. **Trade-offs** between reduction and information preservation
5. **Real-world applications** of each method

## 🐛 Troubleshooting

### Visualizations not showing?

- Check browser console for errors (F12)
- Ensure `visualizations.js` is in the same folder as `index.html`
- Try a different browser

### Animations stuttering?

- Close other browser tabs
- Reduce the number of data points in `visualizations.js`
- Use a desktop browser instead of mobile

### Deployment issues?

- Ensure all files are in the same directory
- Check that file names match exactly (case-sensitive)
- Verify `index.html` is in the root directory

## 📝 License

This project is created for educational purposes at JAIN University.
Feel free to use, modify, and share with classmates!

## 🙏 Credits

- **Content Source:** DWDM Module 3 Notes by Dr. A. Kannagi
- **Developer:** [Your Name Here]
- **Institution:** JAIN University, Department of CS & IT
- **Course:** BCA - Data Analytics, 5th Semester

## 🔗 Useful Links

- [Data Mining Concepts (Online)](https://www.coursera.org/specializations/data-mining)
- [PCA Explained](https://en.wikipedia.org/wiki/Principal_component_analysis)
- [Vercel Documentation](https://vercel.com/docs)

---

**Made with ❤️ for helping classmates understand Data Reduction**

*Last Updated: November 2025*
