# Changelog

All notable changes to the Endless Drive project will be documented in this file.

## [v1.5.7] - 2025-03-14

### Fixed
- Fixed "Uncaught ReferenceError: updateGroundTiles is not defined" by implementing the missing function
- Improved performance of the animation loop by throttling ground tile updates
- Reduced frame time to address "requestAnimationFrame handler took too long" warnings

## [v1.5.6] - 2025-03-13

### Added
- Enhanced city environment with more immersive elements:
  - Added street lights with flickering neon effects along main roads and side streets
  - Added additional roads branching off from the main track with buildings and lights
  - Added cyberpunk billboards with animated neon signs and text elements
  - Added holographic advertisements with rotating, pulsing displays
  - Improved building windows with better lighting effects and actual 3D window geometry
  - Added interior lights to buildings for more realistic light spill
  - Enhanced animations for all city elements with flickering, pulsing, and rotating effects

### Changed
- Improved overall lighting system for better cyberpunk atmosphere
- Enhanced performance with optimized animations and rendering techniques
- Increased city density with more varied and detailed objects

## [v1.5.5] - 2025-03-13

### Added
- Enhanced city scene design based on the roadmap:
  - Added buildings with illuminated windows that match the cyberpunk theme
  - Added neon trim and details to buildings for a more authentic cyberpunk feel
  - Improved tech trees with three distinct styles and animations:
    - Tech pillars with multiple glowing orbs
    - Holographic trees with floating panels
    - Neon wireframe trees with glowing tips
  - Enhanced obstacles with four different cyberpunk-styled types:
    - Cyberpunk barriers with neon accents
    - Holographic warning barriers with animated panels
    - Damaged vehicles/drones with flickering lights
    - Tech debris/crates with neon edges
- Added animations to environment objects:
  - Floating and pulsing effects for tech tree elements
  - Rotating and fading effects for holographic elements
  - Flickering lights on damaged obstacles

### Changed
- Improved visual consistency across all environment objects to better match the cyberpunk theme
- Enhanced performance by optimizing animations and using efficient rendering techniques

## [v1.5.4] - 2025-03-12

### Added
- Enhanced sports car model with detailed 3D geometry:
  - Sleek body with cabin and windows
  - Front and rear lights with emissive materials
  - Detailed wheels with rims
  - Spoiler and exhaust pipes
  - Neon underglow effect
- Improved wheel rotation and steering visualization
- Added hidden orbit camera mode for development (toggle with 'O' key on desktop)

### Changed
- Upgraded car specifications to match roadmap requirements:
  - Increased acceleration from 10 to 15
  - Increased top speed from 100 to 150
  - Improved steering responsiveness from 2.5 to 3.5
- Enhanced car materials with emissive properties for better cyberpunk aesthetics
- Improved performance monitoring and adaptive quality settings

## [v1.5.3] - 2025-03-12

### Added
- Added preloader with spinning animation to eliminate white flash on page load
- Added Google Fonts (Orbitron and Rajdhani) for a more cyberpunk aesthetic

### Changed
- Updated main menu UI with cyberpunk-themed styling:
  - Neon cyan headings with glow effect
  - Magenta button borders with hover effects
  - Custom fonts for better visual appeal
- Improved overall UI consistency with the game's cyberpunk theme
- Set page background to match the game's sky color

## [v1.5.2] - 2025-03-12

### Added
- Improved tutorial page layout for landscape mode with side-by-side sections

### Changed
- Better differentiation between Speed Boost and Nitro power-ups:
  - Speed Boost: Gradually increases top speed by 20% for 5 seconds
  - Nitro: Provides immediate acceleration burst for 2 seconds
- Removed unnecessary Nitro button from mobile controls since it activates automatically
- Updated power-up descriptions to be more clear and informative

## [v1.5.1] - 2025-03-11

### Added
- Improved main screen layout for mobile browsers in landscape mode
- Added portrait mode message that prompts users to rotate their device for better experience
- Created separate pages for tutorial, credits, and leaderboard
- Added buttons to access these new pages from the main menu

### Changed
- Moved how-to-play info and power-up info to a dedicated tutorial page
- Version number now only shows on the main page, not during gameplay
- Score and speed display now only show during gameplay, not in the main menu
- Improved overall UI organization and navigation

## [v1.5.0] - 2025-03-10

### Added
- Version number display on the main screen
- Improved car steering with realistic front-wheel pivot model

### Changed
- Enhanced car handling with smoother steering transitions
- Implemented speed-sensitive steering for more realistic driving feel
- Visual wheel rotation that matches steering angle
- Improved turning physics using a bicycle model for more natural car movement

### Fixed
- Fixed game restart issues where objects and power-ups weren't working properly after restart
- Fixed buildings disappearing too early in the distance
- Ensured proper reset of game state when restarting

## [v1.4.1] - 2025-03-09

### Fixed
- Fixed issue where shield power-up would sometimes remain active permanently
- Fixed blue flashing glow under the car caused by shield effect not being properly removed
- Improved power-up cleanup when game is reset or restarted
- Added additional checks to ensure power-up effects are properly removed

## [v1.4.0] - 2025-03-08

### Added
- Power-up information section to the main menu
- Enhanced visual effects for power-ups
- Automatic activation for nitro power-up

### Changed
- Improved power-up visuals with distinctive 3D shapes:
  - Speed Boost: Green arrow/cone shape
  - Shield: Blue ring/torus shape
  - Nitro: Yellow crystal/octahedron shape
- Enhanced power-up materials with emissive properties for better visibility
- Modified nitro power-up to activate automatically for 2 seconds (per roadmap)

### Fixed
- Issue with power-ups appearing too early in the game
- Updated mobile controls to match new power-up behavior

## [v1.3.0] - 2025-03-07

### Fixed
- Fixed joystick steering in landscape mode - now properly allows horizontal steering
- Corrected joystick positioning in landscape mode, moved to bottom left corner

### Changed
- Improved joystick size in landscape mode for better usability
- Added deadzone to joystick input to prevent accidental tiny movements
- Enhanced orientation change handling to properly update joystick

## [v1.2.0] - 2025-03-06

### Added
- Implemented virtual joystick controls for mobile devices
- Added responsive control layout for different device orientations

### Changed
- Improved mobile control layout for better usability in landscape mode
- Enhanced control responsiveness and visual feedback

## [v1.1.0] - 2025-03-04

### Added
- Mobile touch controls
- Instructions for mobile devices on start screen

### Changed
- Updated UI with better responsiveness for different screen sizes
- Improved game performance on mobile devices

## [v1.0.0] - 2025-03-01

### Added
- Initial release
- Infinite procedurally generated track
- Cyberpunk visual theme with neon lighting
- Power-ups: Speed boost, Shield, Nitro
- Obstacles to avoid
- High score tracking
- Responsive design 