<div align="center">
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Sparkling%20Heart.png" alt="Sparkling Heart" width="100" />
  
  # Her Birthday Experience ✨

  <p align="center">
    <strong>A highly immersive, premium, and emotionally resonant web experience crafted with love.</strong>
    <br/>
    <em>Built with cutting-edge web technologies to deliver buttery-smooth animations and a magical journey.</em>
  </p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  </div>
</div>

<br />

## 🌟 The Vision

This project transcends a traditional single-page application. It is a highly personalized, interactive digital surprise designed specifically for a romantic milestone. Blending a **premium pink aesthetic** with **glassmorphism**, dynamic particle systems, and native-app-like navigation, the platform acts as an emotional journey.

## ✨ Crazy Features & Highlights

🚀 **Buttery-Smooth Performance**  
Engineered with the **Lenis** smooth scroll library backed by native `requestAnimationFrame` and GSAP overrides to eliminate jank. The heavy workloads (like CSS auroras and Sparkles) are strategically pushed to the GPU compositor via `will-change` hints.

🎨 **GPU-Accelerated Visuals**
* **Dynamic Aurora Backgrounds:** Complex multi-layered CSS mesh gradients mimicking the Northern Lights, but in a pastel pink/purple hue.
* **Canvas Falling Hearts:** A highly-optimized native `<canvas>` particle loop, throttled to a comfortable framerate to prevent device overheating on mobile.

💫 **Framer Motion Micro-Interactions**
* Fully interactive **3D Photo Collages** using `useSpring` and `useMotionValue`.
* Animated Timeline trees mapping relationship milestones.
* Heartbeat pulsing mechanisms and staggered list reveals.

💍 **The Secret Interaction (App Navigation within Web)**
A custom-built, full-screen takeover modal that integrates the Native Browser History API (`pushState` / `popstate`). Pressing the back button on a mobile device seamlessly closes the modal instead of exiting the website altogether!

## ⚙️ Tech Stack & Architecture

- **Core Engine:** [Next.js 16 (App Router)](https://nextjs.org/) + React 19
- **Styling:** Tailwind CSS v4 using a bespoke configuration (`@theme` variables, custom utilities).
- **Animation Orchestration:** Framer Motion + GSAP
- **Scroll Physics:** React Lenis (`@studio-freight/lenis` modern wrapper)
- **Visuals:** Canvas Rendering API + CSS3 Animations

## 🚀 Quick Start / Local Setup

If you wish to spin up this project locally and experience the magic:

1. **Clone the repository**
   ```bash
   git clone https://github.com/surjax18/HER-BIRTHDAY.git
   cd HER-BIRTHDAY
   ```

2. **Install the dependencies**
   ```bash
   npm install
   ```
   *Note: This project utilizes modern packages like `lenis`, `gsap`, and `framer-motion`.*

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Visit the application**
   Open your browser to `http://localhost:3000` to dive into the experience.

---

### 💖 Developed by Your Love
*Because the best code is written from the heart.*
