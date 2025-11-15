# Image Guide for DSU Website Clone

## Quick Start

1. **Create an `images` folder** in your project root (already created)
2. **Download/add the required images** listed below
3. **Place images in the `images` folder**
4. Images will automatically display when added - fallback placeholders are in place

## Required Images

| Image File | Size | Usage | Priority |
|------------|------|-------|----------|
| `dsu-logo.svg` | Vector | Top header logo | High |
| `favicon.svg` | Vector | Browser favicon | High |
| `naac-logo.png` | 150x90px | NAAC accreditation banner | High |
| `hero-bg.jpg` | 1920x1080px | Hero section background | High |
| `hero-student.png` | 400x600px | Student image in hero section | High |
| `video-thumbnail-1.jpg` | 400x225px | Video thumbnail | Medium |
| `youtube-logo.png` | 60x20px | YouTube logo | Low |
| `founding-father.jpg` | 240x240px | Leadership portrait | Medium |

## Campus Gallery Images (NEW - Animated Gallery)

| Image File | Size | Usage | Priority |
|------------|------|-------|----------|
| `campus-engineering.jpg` | 1200x800px | School of Engineering building | High |
| `campus-building-day.jpg` | 1200x800px | Main campus buildings (day view) | High |
| `campus-night.jpg` | 1200x800px | Campus at night (illuminated) | High |
| `campus-aerial.jpg` | 1200x800px | Aerial view of campus | High |
| `campus-medical.jpg` | 1200x800px | Medical center/Health Sciences building | High |
| `campus-garden.jpg` | 1200x800px | Formal gardens and landscaping | High |

## How to Get Images

### Option 1: Download from Official DSU Website
- Visit https://www.dsu.edu.in
- Right-click on images → "Save Image As"
- Ensure you have permission to use them

### Option 2: Use Stock Images
- Unsplash (unsplash.com) - Free high-quality photos
- Pexels (pexels.com) - Free stock photos
- Pixabay (pixabay.com) - Free images

### Option 3: Create Your Own
- Use design tools like Canva, Photoshop, or Figma
- Ensure images match the dimensions listed above

## Image Paths in Code

All images are referenced from the `images/` folder:

```html
<!-- Logo (SVG) -->
<img src="images/dsu-logo.svg" alt="DSU Logo">

<!-- Hero Background (inline style) -->
<section style="background-image: url('images/hero-bg.jpg');">

<!-- Student Image -->
<img src="images/hero-student.png" alt="Student">

<!-- Video Thumbnail -->
<img src="images/video-thumbnail-1.jpg" alt="Life at DSU">

<!-- Campus Gallery Images -->
<img src="images/campus-engineering.jpg" alt="School of Engineering">
<img src="images/campus-building-day.jpg" alt="Campus Buildings">
<img src="images/campus-night.jpg" alt="Campus at Night">
<img src="images/campus-aerial.jpg" alt="Aerial View">
<img src="images/campus-medical.jpg" alt="Medical Center">
<img src="images/campus-garden.jpg" alt="Campus Gardens">
```

## Campus Gallery Features

The campus gallery includes modern animations:
- ✨ **Fade-in animations** on scroll
- 🎯 **3D tilt effect** on mouse move
- 💫 **Parallax scrolling** effect
- 🔥 **Glow effects** on hover
- 🎨 **Image zoom and rotate** on hover
- 📱 **Overlay content** with smooth transitions
- ⚡ **Staggered animations** for cards

## Fallback System

All images have automatic fallbacks:
- If an image file is missing, a placeholder SVG will appear
- The website will still work without any images
- No errors will occur if images are missing

## Image Optimization Tips

1. **Compress Images**: Use tools like:
   - TinyPNG (tinypng.com)
   - ImageOptim (imageoptim.com)
   - Squoosh (squoosh.app)

2. **Format Guidelines**:
   - **PNG**: Use for logos, icons (transparent backgrounds)
   - **JPG**: Use for photos, backgrounds
   - **WebP**: Modern format (better compression)

3. **File Size**: Keep images under:
   - Logos: 50-100 KB
   - Photos: 200-500 KB
   - Backgrounds: 300-800 KB

## Testing Images

1. Open `index.html` in a web browser
2. Check the browser console (F12) for any image loading errors
3. Verify all images display correctly
4. Test on mobile devices for responsiveness

## Current Status

✅ Images folder created  
✅ Image paths configured in HTML  
✅ Fallback placeholders in place  
⏳ Waiting for images to be added

## Need Help?

If you're having trouble:
1. Check that image filenames match exactly (case-sensitive)
2. Verify images are in the `images/` folder
3. Check browser console for errors
4. Ensure image file extensions are correct (.png, .jpg, etc.)

