# Jiale Cheng - Portfolio

A modern, animated portfolio website built with Astro and Tailwind CSS, featuring smooth animations and interactive visual effects.

## 🎨 Visual Effects & Features

### 1. **Typewriter Effect**
- **Location**: Hero section subtitle (H2 tagline)
- **Implementation**: Custom CSS animations in `src/styles/global.css`
- **How it works**:
  - Text appears character by character using `steps()` animation
  - Blinking cursor effect using `blink-caret` keyframe
  - 3.5s typing duration with 40 steps for smooth character reveal

### 2. **Fade-Up Scroll Animations**
- **Location**: Experience cards and main content sections
- **Implementation**: Intersection Observer API in `src/layouts/Layout.astro`
- **How it works**:
  - Elements start invisible and offset down (`opacity: 0, translateY: 30px`)
  - When scrolling into view (10% threshold), `.in-view` class is added
  - Smooth 0.8s transition to visible state
  - Observer disconnects after animation to prevent re-triggering

### 3. **Interactive Spotlight Effect**
- **Location**: Background layer (entire site)
- **Implementation**: Mouse-tracking gradient in `src/layouts/Layout.astro`
- **How it works**:
  - Follows mouse cursor position using `mousemove` event listener
  - Radial gradient (600px circle) centered at cursor coordinates
  - CSS custom properties (`--x`, `--y`) updated in real-time
  - Subtle blue glow effect for depth

### 4. **Animated Grid Background**
- **Location**: Fixed background layer
- **Implementation**: CSS linear gradients
- **Pattern**: 24px × 24px grid with semi-transparent lines

### 5. **Gradient Blur Orbs**
- **Location**: Fixed background elements
- **Implementation**: Blurred circles with CSS `blur(100px)`
- **Effects**:
  - Cyan orb (310px) - center top
  - Purple orb (200px) - top right
  - Creates depth and ambient lighting

### 6. **Profile Image Effects**
- **Location**: Hero section
- **Implementation**: Multiple layered effects
- **Features**:
  - Animated gradient border (cyan → blue → purple) with pulse animation
  - Grayscale by default, color on hover (500ms transition)
  - Custom positioning (`object-[center_20%]`) for optimal face framing
  - Ring shadow for depth

### 7. **Gradient Text Animations**
- **Location**: Main heading (name)
- **Implementation**: `animate-gradient-x` in `tailwind.config.mjs`
- **Effect**: Animated gradient moving from left to right (3s infinite loop)

### 8. **Availability Badge**
- **Location**: Top of hero section
- **Features**:
  - Pulsing cyan dot indicator
  - Glassmorphism background (`backdrop-blur`)
  - Cyan border with low opacity for subtle glow

### 9. **Interactive Cards**
- **Location**: Experience and Skills sections
- **Hover Effects**:
  - Border color transition to cyan
  - Background opacity increase
  - Scale transform on CTAs
  - Gradient glow intensity increase (blur effect)

### 10. **Language Switcher**
- **Location**: Fixed top-right corner
- **Implementation**: Glassmorphism button with smooth transitions
- **Features**:
  - Flag emoji + language code
  - Hover state with cyan accent color
  - Backdrop blur for depth

## 🛠 Tech Stack

- **Framework**: Astro 5.16.0
- **Styling**: Tailwind CSS 4.1.17
- **UI Library**: React 19.2.0 (for interactive components)
- **Integrations**: `@astrojs/react`
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── components/
│   ├── Experience.astro    # Timeline with fade-up animations
│   └── Skills.astro         # Skills grid with hover effects
├── layouts/
│   └── Layout.astro         # Main layout with background effects & scripts
├── pages/
│   ├── en/index.astro      # English version
│   └── es/index.astro      # Spanish version
├── i18n/
│   ├── en.ts               # English translations
│   └── es.ts               # Spanish translations
├── styles/
│   └── global.css          # Custom animations (typewriter, blink-caret)
└── public/
    └── images/
        └── profile.jpeg    # Profile photo
```

## 🎯 Key Animation Principles

1. **Performance-First**: Using CSS transforms and opacity for 60fps animations
2. **Progressive Enhancement**: Animations enhance but don't block content
3. **Accessibility**: `prefers-reduced-motion` respected (can be added)
4. **Smooth Transitions**: Consistent timing (0.8s for scrolls, 0.5s for hovers)
5. **Observer Pattern**: Intersection Observer for efficient scroll animations

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📄 License

This is a personal portfolio project.

---

Built with ❤️ using Astro