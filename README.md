# Endless Drive

A cyberpunk-themed 3D driving simulator built with Three.js. Race endlessly through a procedurally generated track with cyberpunk aesthetics.

[Play the game](https://screech24.github.io/Endless-Drive/)

## Features

- Infinite procedurally generated track
- Cyberpunk visual theme with neon lighting
- Realistic car steering with front-wheel pivot model
- Enhanced power-ups with distinctive visuals:
  - **Speed Boost** (green arrow): Increases speed by 20% for 5 seconds
  - **Shield** (blue ring): Protects from obstacles and track edges for 10 seconds
  - **Nitro** (yellow crystal): Provides a powerful speed burst for 2 seconds
- Obstacles to avoid
- High score tracking
- Responsive design that works on desktop and mobile
- Touch controls for mobile devices with virtual joystick
- Dedicated tutorial, leaderboard, and credits pages
- Portrait mode detection with rotation prompt for mobile devices

## Controls

### Desktop
- **Arrow keys** or **WASD** to drive
- Nitro power-up activates automatically when collected

### Mobile
- **Virtual joystick** on the left side for steering
- **Acceleration/brake buttons** on the right side
- Nitro power-up activates automatically when collected
- For best experience, use landscape orientation

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Three.js for 3D rendering
- nipplejs for virtual joystick controls

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

### v1.5.1 (Latest)
- Improved main screen layout for mobile browsers in landscape mode
- Added portrait mode message that prompts users to rotate their device
- Created separate pages for tutorial, credits, and leaderboard
- Moved how-to-play info and power-up info to a dedicated tutorial page
- Version number now only shows on the main page, not during gameplay
- Score and speed display now only show during gameplay, not in the main menu

### v1.5.0
- Improved car steering with realistic front-wheel pivot model
- Enhanced car handling with smoother steering transitions
- Implemented speed-sensitive steering for more realistic driving feel
- Fixed game restart issues and buildings disappearing too early
- Added version number display on the main screen

### v1.4.1
- Fixed issue where shield power-up would sometimes remain active permanently
- Fixed blue flashing glow under the car caused by shield effect not being properly removed
- Improved power-up cleanup when game is reset or restarted

### v1.4.0
- Enhanced power-ups with distinctive 3D shapes and visual effects
- Fixed issue with power-ups appearing too early in the game
- Improved nitro power-up to activate automatically for 2 seconds
- Added power-up information section to the main menu
- Updated mobile controls to match new power-up behavior

### v1.3.0
- Fixed joystick steering in landscape mode - now properly allows horizontal steering
- Corrected joystick positioning in landscape mode, moved to bottom left corner
- Improved joystick size and responsiveness for better usability
- Added deadzone to joystick input to prevent accidental tiny movements

### v1.2.0
- Implemented virtual joystick controls for mobile devices
- Improved mobile control layout for better usability in landscape mode
- Enhanced control responsiveness and visual feedback

### v1.1.0
- Added mobile touch controls
- Updated UI with instructions for mobile devices
- Improved responsiveness for different screen sizes

For a complete changelog, see [CHANGELOG.md](CHANGELOG.md).

## License

MIT License

---
**Note:** When forking or cloning this repository, replace `your-github-username` in the URLs with your actual GitHub username. 