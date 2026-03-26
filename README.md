# Sweetwater Helium Website

A modern, clean website for Sweetwater Helium built with React, Vite, and Tailwind CSS.

## Quick Deploy to Netlify

### Option 1: Automated Script (Easiest)
Simply run:
```powershell
.\deploy.ps1
```

This will:
1. Build your project
2. Deploy to Netlify automatically
3. Open your live site in a browser

### Option 2: Manual Netlify Deploy
1. Build the project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder
4. Your site is live!

### Option 3: Netlify CLI
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Lucide React (icons)
