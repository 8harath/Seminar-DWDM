# 🚀 Vercel Deployment Guide

## Data Reduction Techniques - Interactive Seminar

### Quick Deploy to Vercel

#### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project directory**:
   ```bash
   cd seminar
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `data-reduction-seminar` (or your choice)
   - Directory? `.` (current directory)
   - Override settings? **N**

5. **Production Deployment**:
   ```bash
   vercel --prod
   ```

#### Option 2: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**

2. **Click "New Project"**

3. **Import Git Repository**:
   - Push this code to GitHub/GitLab/Bitbucket
   - Import the repository in Vercel

4. **Configure Project**:
   - Framework Preset: **Other** (Static HTML)
   - Root Directory: `./`
   - Build Command: Leave empty
   - Output Directory: `./`

5. **Click "Deploy"**

---

## 📁 Project Structure

```
seminar/
├── index.html              # Main HTML file
├── visualizations.js       # All interactive visualizations
├── vercel.json            # Vercel configuration
├── .gitignore             # Git ignore rules
└── DWDM MODULE 3 NOTES.pdf # (Excluded from deployment)
```

---

## ✅ What Gets Deployed

- ✅ `index.html` - Main webpage
- ✅ `visualizations.js` - All interactive visualizations
- ✅ `vercel.json` - Deployment configuration
- ❌ `*.pdf` files - Excluded (too large, not needed)
- ❌ `.git/` - Excluded automatically
- ❌ `.vercel/` - Excluded automatically

---

## 🎯 Features Included in Deployment

### All 5 Data Reduction Techniques:

1. **Data Cube Aggregation**
   - Daily → Monthly → Yearly aggregation
   - Visual funnel representation

2. **Attribute Subset Selection**
   - Interactive correlation analysis
   - Feature removal demonstration

3. **Dimensionality Reduction**
   - PCA visualization
   - **NEW: Wavelet Transforms** (Haar wavelet decomposition)

4. **Numerosity Reduction**
   - Basic clustering/sampling/histogram
   - **NEW: Sampling Methods** (SRSWOR, SRSWR, Stratified, Cluster)
   - **NEW: Histogram Types** (Equal-Width, Equal-Frequency)
   - **NEW: Linear Regression** (Parametric models)

5. **Discretization**
   - Equal-width binning
   - Equal-frequency binning
   - Entropy-based discretization

---

## 🔗 Sharing Your Deployment

After deployment, Vercel will provide:

1. **Production URL**: `https://data-reduction-seminar.vercel.app`
   - Share this link with anyone
   - Everyone sees the same visualizations
   - No installation required

2. **Preview URLs**: For each git push
   - Automatic preview deployments
   - Test before promoting to production

---

## 🛠️ Environment Variables

**Not Required** - This is a static site with no backend or API keys needed.

---

## 📊 Performance Optimizations

The `vercel.json` includes:
- Caching headers for better performance
- Proper routing for single-page app
- Static file serving optimization

---

## 🔄 Updates & Redeployment

### To update your deployed site:

1. **Make changes locally**
2. **Commit to git** (if using Git integration):
   ```bash
   git add .
   git commit -m "Update visualizations"
   git push
   ```
   - Vercel auto-deploys on push

3. **Or redeploy manually**:
   ```bash
   vercel --prod
   ```

---

## 🐛 Troubleshooting

### Issue: Page shows but visualizations don't work

**Solution**: Check browser console (F12) for JavaScript errors. Ensure `visualizations.js` is loaded.

### Issue: 404 on Vercel

**Solution**: Verify `vercel.json` routing configuration is correct.

### Issue: Deployment fails

**Solution**:
1. Check `vercel.json` syntax
2. Ensure no files are too large (>100MB)
3. Check Vercel logs in dashboard

---

## 📱 Browser Compatibility

Works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 💡 Tips

1. **Custom Domain**: Add your domain in Vercel dashboard → Settings → Domains
2. **Analytics**: Enable Vercel Analytics for visitor insights
3. **Password Protection**: Use Vercel's password protection feature if needed

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Project Issues: Create an issue in your repository

---

**Course**: Data Warehousing and Data Mining (23BCA5C01/23BCA5D01)
**Module**: 3 - Data Preprocessing
**Institution**: JAIN University
**Academic Year**: 2025-2026 (Odd Semester)
