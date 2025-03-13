# Changelog

All notable changes to the Endless Drive project will be documented in this file.

## [v1.5.0] - 2024-03-16

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

## [v1.4.1] - 2024-03-15

### Fixed
- Fixed issue where shield power-up would sometimes remain active permanently
- Fixed blue flashing glow under the car caused by shield effect not being properly removed
- Improved power-up cleanup when game is reset or restarted
- Added additional checks to ensure power-up effects are properly removed

## [v1.4.0] - 2024-03-14

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

## [v1.3.0] - 2024-03-13

### Fixed
- Fixed joystick steering in landscape mode - now properly allows horizontal steering
- Corrected joystick positioning in landscape mode, moved to bottom left corner

### Changed
- Improved joystick size in landscape mode for better usability
- Added deadzone to joystick input to prevent accidental tiny movements
- Enhanced orientation change handling to properly update joystick

## [v1.2.0] - 2024-03-12

### Added
- Implemented virtual joystick controls for mobile devices
- Added responsive control layout for different device orientations

### Changed
- Improved mobile control layout for better usability in landscape mode
- Enhanced control responsiveness and visual feedback

## [v1.1.0] - 2024-03-10

### Added
- Mobile touch controls
- Instructions for mobile devices on start screen

### Changed
- Updated UI with better responsiveness for different screen sizes
- Improved game performance on mobile devices

## [v1.0.0] - 2024-03-08

### Added
- Initial release
- Infinite procedurally generated track
- Cyberpunk visual theme with neon lighting
- Power-ups: Speed boost, Shield, Nitro
- Obstacles to avoid
- High score tracking
- Responsive design 