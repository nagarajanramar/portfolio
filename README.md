# Nagarajan R - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## 🖼️ Adding Your Profile Image

### Step 1: Convert HEIC to Web Format
Your image `IMG20250511115534.heic` needs to be converted to a web-compatible format:

**Option A: Using macOS Preview**
1. Open the HEIC file in Preview app
2. Go to File → Export As
3. Choose JPEG or PNG format
4. Save as `profile-image.jpg` or `profile-image.png`

**Option B: Online Converter**
- Visit [CloudConvert](https://cloudconvert.com/heic-to-jpg) or [Convertio](https://convertio.co/heic-jpg/)
- Upload your HEIC file
- Convert to JPG or PNG
- Download the converted file

### Step 2: Add Image to Portfolio
1. Rename your converted image to `profile-image.jpg` (or update the HTML if using PNG)
2. Place the image in the `images/` folder
3. The portfolio will automatically display your image instead of the placeholder icon

### Step 3: Customize (Optional)
- **Image size**: Currently set to 300x300px (circular)
- **File path**: Update `src="images/profile-image.jpg"` in `index.html` if using different filename
- **Format**: JPG recommended for photos, PNG for graphics with transparency

## 🚀 Features

- **Single-section navigation**: Only one module visible at a time
- **Responsive design**: Works on all devices
- **Modern animations**: Smooth transitions and hover effects
- **Professional layout**: Clean, minimal design
- **Interactive elements**: Skill bars, contact form, project cards

## 📁 File Structure

```
resume web/
├── index.html          # Main HTML file
├── style.css           # CSS styling
├── script.js           # JavaScript functionality
├── images/             # Image assets folder
│   └── profile-image.jpg  # Your profile photo (add here)
└── README.md           # This file
```

## 🌐 How to Use

1. Open `index.html` in your web browser
2. Navigate between sections using the menu
3. Each section displays independently
4. Your name "Nagarajan R" is featured throughout

## 🎨 Customization

- **Colors**: Update CSS variables in `style.css`
- **Content**: Edit text in `index.html`
- **Skills**: Modify percentages and skill names
- **Projects**: Add/remove project cards
- **Contact**: Update email, phone, and social links

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔧 Technical Details

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript**: ES6+, Intersection Observer API
- **Font Awesome**: Icons
- **Responsive**: Mobile-first design

---

**Note**: Make sure your profile image is high quality (at least 600x600px) for best results on high-resolution displays.
# portfolio
