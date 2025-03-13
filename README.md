# Endless Drive

A cyberpunk-themed 3D driving simulator built with Three.js. Race endlessly through a procedurally generated track with cyberpunk aesthetics.

[Play the game](https://screech24.github.io/Endless-Drive/)

## Features

- Infinite procedurally generated track
- Cyberpunk visual theme with neon lighting
- Detailed 3D sports car model with realistic features:
  - Sleek body with cabin and windows
  - Emissive front and rear lights
  - Detailed wheels with rims
  - Spoiler and exhaust pipes
  - Neon underglow effect
- High-performance car with:
  - High acceleration
  - High top speed
  - Responsive steering
- Enhanced power-ups with distinctive visuals:
  - **Speed Boost** (green arrow): Gradually increases top speed by 20% for 5 seconds
  - **Shield** (blue ring): Protects from obstacles and track edges for 10 seconds
  - **Nitro** (yellow crystal): Provides immediate acceleration burst for 2 seconds
- Obstacles to avoid
- High score tracking
- Responsive design that works on desktop and mobile
- Touch controls for mobile devices with virtual joystick
- Dedicated tutorial, leaderboard, and credits pages
- Portrait mode detection with rotation prompt for mobile devices
- Cyberpunk-styled UI with custom fonts and neon effects

## Controls

### Desktop
- **Arrow keys** or **WASD** to drive
- **Space** for nitro (when collected)

### Mobile
- **Virtual joystick** on the left side for steering
- **Acceleration/brake buttons** on the right side
- Nitro activates automatically when collected
- For best experience, use landscape orientation

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Three.js for 3D rendering
- nipplejs for virtual joystick controls
- Google Fonts (Orbitron and Rajdhani) for cyberpunk typography

## Development

This game is continuously being improved with new features and optimizations. Check out the roadmap.md file for upcoming features.

## How to Run Locally

Simply clone this repository and open `index.html` in your browser:

```bash
git clone https://github.com/your-github-username/endless-drive.git
cd endless-drive
# Open index.html in your browser
```

## Changelog

### v1.5.4 (Latest) - March 12, 2025
- Enhanced sports car model with detailed 3D geometry
- Improved wheel rotation and steering visualization
- Upgraded car specifications to match roadmap requirements
- Enhanced car materials with emissive properties for better cyberpunk aesthetics

### v1.5.3 - March 12, 2025
- Added preloader with spinning animation to eliminate white flash on page load
- Updated main menu UI with cyberpunk-themed styling (neon effects, custom fonts)
- Improved overall UI consistency with the game's cyberpunk theme

### v1.5.2 - March 12, 2025
- Improved tutorial page layout for landscape mode
- Better differentiation between Speed Boost and Nitro power-ups
- Removed unnecessary Nitro button from mobile controls
- Updated power-up descriptions to be more clear and informative

### v1.5.1 - March 11, 2025
- Improved main screen layout for mobile browsers in landscape mode
- Added portrait mode message that prompts users to rotate their device
- Created separate pages for tutorial, credits, and leaderboard
- Moved how-to-play info and power-up info to a dedicated tutorial page
- Version number now only shows on the main page, not during gameplay
- Score and speed display now only show during gameplay, not in the main menu

### v1.5.0 - March 10, 2025
- Improved car steering with realistic front-wheel pivot model
- Enhanced car handling with smoother steering transitions
- Implemented speed-sensitive steering for more realistic driving feel
- Fixed game restart issues and buildings disappearing too early
- Added version number display on the main screen

### v1.4.1 - March 9, 2025
- Fixed issue where shield power-up would sometimes remain active permanently
- Fixed blue flashing glow under the car caused by shield effect not being properly removed
- Improved power-up cleanup when game is reset or restarted

### v1.4.0 - March 8, 2025
- Enhanced power-ups with distinctive 3D shapes and visual effects
- Fixed issue with power-ups appearing too early in the game
- Improved nitro power-up to activate automatically for 2 seconds
- Added power-up information section to the main menu
- Updated mobile controls to match new power-up behavior

### v1.3.0 - March 7, 2025
- Fixed joystick steering in landscape mode - now properly allows horizontal steering
- Corrected joystick positioning in landscape mode, moved to bottom left corner
- Improved joystick size and responsiveness for better usability
- Added deadzone to joystick input to prevent accidental tiny movements

### v1.2.0 - March 6, 2025
- Implemented virtual joystick controls for mobile devices
- Improved mobile control layout for better usability in landscape mode
- Enhanced control responsiveness and visual feedback

### v1.1.0 - March 4, 2025
- Added mobile touch controls
- Updated UI with instructions for mobile devices
- Improved responsiveness for different screen sizes

### v1.0.0 - March 1, 2025
- Initial release
- Infinite procedurally generated track
- Cyberpunk visual theme with neon lighting
- Power-ups: Speed boost, Shield, Nitro
- Obstacles to avoid
- High score tracking

For a complete changelog, see [CHANGELOG.md](CHANGELOG.md).

## License

MIT License

---
**Note:** When forking or cloning this repository, replace `your-github-username` in the URLs with your actual GitHub username. 