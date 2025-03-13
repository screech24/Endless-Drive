# Endless Drive Changelog

## v1.8.6 - 2023-11-16
- Improved car steering mechanics to steer from front wheels instead of pivoting on center
- Rotated car 180 degrees to face the correct direction
- Fixed speed issues with smoother acceleration and deceleration
- Added exhaust tips to enhance the sports car appearance
- Implemented realistic wheel turning animation during steering

## v1.8.5 - 2023-11-15
- Fixed "THREE.MeshBasicMaterial: 'emissive' is not a property of this material" warnings
- Removed unsupported emissive properties from MeshBasicMaterial in building windows
- Improved material configuration for better compatibility with Three.js

## v1.8.4 - 2023-11-15
- Fixed "Maximum call stack size exceeded" error caused by circular dependency between track.js and main.js
- Resolved infinite recursion in createTrackMaterial function
- Improved code structure by removing circular references
- Ensured proper track material creation without dependency loops

## v1.8.3 - 2023-11-14
- Fixed outdated reference to index_modular.html in README.md
- Updated modularization progress documentation to reflect current phase
- Resolved 404 error for non-existent index_modular.html file
- Completed transition to fully modular codebase

## v1.8.2 - 2023-11-13
- Fixed conflict between hud.js and main.js startGame functions
- Made startGame function available globally for cross-module access
- Added more detailed logging for debugging
- Ensured UI is properly displayed when game starts
- Updated README to reflect current version

## v1.7.8 - 2023-11-12
- Fixed frameCount undefined error in world.js
- Added frame counter to track animation frames
- Improved cleanup of distant objects

## v1.7.7 - 2023-11-12
- Added robust error handling for collision detection
- Updated checkCollisions function to validate parameters
- Ensured getPowerUps always returns an array
- Added additional checks in updateWorld before calling checkCollisions

## v1.7.6 - 2023-11-11
- Fixed collision detection in world.js
- Updated function call to match the expected parameters
- Resolved "Cannot read properties of undefined" error

## v1.7.5 - Cyberpunk Visual Enhancements
- Added neon glowing track edges with magenta color
- Enhanced car model with neon accents and underglow
- Updated environment with cyberpunk-styled buildings and trees
- Added pulsing neon grid to ground tiles
- Enhanced lighting with colored point lights
- Updated UI with more cyberpunk styling and animations
- Fixed start game button functionality
- Improved overall visual aesthetic to match cyberpunk theme

## v1.7.4 - Bug Fixes and Improvements
- Fixed car, track, and world creation issues
- Fixed duplicate UI overlays for speed and score
- Fixed start game button not working
- Improved asset loading system
- Added proper track segment visualization
- Added environment objects along the track
- Updated version number in all files

## v1.7.3 - Module System Update
- Converted to ES modules for better code organization
- Added importmap for Three.js dependencies
- Fixed module resolution issues

## v1.7.2 - Performance Improvements
- Optimized rendering for better performance
- Reduced memory usage with object pooling
- Fixed mobile controls

## v1.7.1 - Bug Fixes
- Fixed collision detection
- Improved track generation
- Fixed UI issues

## v1.7.0 - Major Update
- Added power-up system
- Improved graphics
- Added mobile controls
- Added tutorial page
- Added leaderboard

## [v1.6.9] - 2025-03-24

### Fixed
- Fixed GLTFLoader module resolution error by adding its path to the importmap
- Updated importmap to include all necessary Three.js module paths

## [v1.6.8] - 2025-03-24

### Fixed
- Fixed Three.js module resolution error by switching from script tags to ES module imports
- Updated all JS modules to import Three.js directly instead of using the global THREE object
- Added proper importmap in index.html for Three.js and its extensions
- Fixed GLTFLoader import to use the importmap path

## [v1.6.7] - 2025-03-23

### Fixed
- Fixed circular dependency between world.js and collisions.js modules
- Added missing collectPowerUp function to powerups.js
- Added isShieldActive function to powerups.js
- Updated module exports and imports for better compatibility
- Fixed Three.js module imports by using global THREE object
- Fixed GLTFLoader import in assets.js
- Updated asset paths to use relative paths
- Updated service worker paths and registration
- Improved modular code structure to fix game functionality
- Created modularization-progress.md to track the modularization process

## [v1.6.6] - 2025-03-22

### Fixed
- Fixed import error for controls.js by removing non-exported function references
- Removed icon requirements from manifest.json to prevent PWA icon loading errors
- Improved compatibility for local development testing

## [v1.6.5] - 2025-03-21

### Fixed
- Resolved duplicate 'hideMenu' function declaration in main.js
- Fixed icon paths in manifest.json to use relative URLs instead of absolute paths
- Addressed PWA icon loading issues for local development

## [v1.6.4] - 2025-03-20

### Added
- Continued modularization of the codebase:
  - Created collisions.js module for collision detection
  - Created powerups.js module for power-up functionality
  - Implemented obstacle and power-up systems in the modular structure
  - Updated world.js to use the new modules
  - Updated renderer.js to pass necessary functions to world update

### Changed
- Improved code organization with better separation of concerns
- Enhanced maintainability through modular design
- Updated version number in main.js

## [v1.6.3] - 2025-03-19

### Added
- Continued modularization of the codebase:
  - Created track.js module for track-specific calculations
  - Extracted getDistanceToTrackEnd function to the new module
  - Updated world.js to use the new track module
  - Updated main.js to import the track module

### Changed
- Improved code organization by separating track utilities from world management
- Enhanced maintainability through better separation of concerns

## [v1.6.2] - 2025-03-18

### Added
- Started incremental modularization of the codebase:
  - Created CSS directory and extracted styles to styles.css
  - Created utility modules for math and storage functions
  - Updated main.js to handle game initialization and UI events
  - Created index_modular.html as a stepping stone to full modularization
- Added proper documentation and JSDoc comments to new modules

### Changed
- Kept original index.html intact to ensure game functionality
- Updated renderer.js to work with the new structure

## [v1.6.1] - 2025-03-17

### Changed
- Reverted to the original monolithic index.html file (v1.5.8) to fix game loading issues
- Temporarily removed PWA support and modular code structure to restore game functionality

## [v1.6.0] - 2025-03-16

### Added
- Implemented Progressive Web App (PWA) support:
  - Added manifest.json for app installation
  - Added service worker for offline support
  - Added app icons for home screen installation
  - Added install prompt for mobile devices
- Reorganized codebase into a modular structure:
  - Separated code into logical modules using ES modules
  - Created dedicated files for renderer, scene, assets, player, world, controls, and UI
  - Improved code organization and maintainability
  - Added proper documentation and comments throughout the codebase
- Added loading screen with progress bar

### Changed
- Updated README with new project structure and PWA installation instructions
- Improved asset loading with better error handling and progress tracking
- Enhanced performance through more efficient code organization
- Updated build process to support ES modules

### Fixed
- Fixed various console errors and warnings
- Improved memory management with better cleanup of unused resources
- Fixed issues with texture loading and disposal

## [v1.5.8] - 2025-03-15

### Fixed
- Fixed "Uncaught ReferenceError: cleanupDistantObjects is not defined" by implementing the missing function
- Improved performance by staggering cleanup operations to avoid performance spikes
- Reduced frame time to address "requestAnimationFrame handler took too long" warnings
- Added adaptive throttling that reduces cleanup frequency when performance is suffering

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

## [1.7.9] - 2023-07-11

### Fixed
- Fixed error with `traverse` method being called on undefined objects
- Resolved cache issues with hard refresh vs normal refresh
- Fixed environment object animation

### Changed
- Removed external asset loading, now using only Three.js generated assets
- Updated roadmap to reflect current development status
- Improved error handling during game initialization

### Added
- Added cache busting for all resources
- Added better fallback handling for asset creation
- Added more detailed cyberpunk building and tree models
- Added technical implementation section to roadmap

## [1.7.8] - 2023-07-05

### Added
- Added modular code structure
- Separated code into engine, game, UI, and utils modules
- Improved loading screen

### Fixed
- Fixed mobile controls responsiveness
- Fixed power-up display issues

## [1.7.0] - 2023-06-28

### Added
- Initial modular code structure
- Improved performance with object pooling
- Added progressive web app support

## [1.5.8] - 2023-06-15

### Added
- Enhanced cyberpunk city environment
- Added interior lighting in buildings
- Improved neon effects

## [1.5.5] - 2023-06-01

### Added
- Initial cyberpunk city environment
- Added buildings with illuminated windows
- Added tech trees with glowing elements

## [1.5.4] - 2023-05-20

### Added
- Enhanced car model with more details
- Added neon underglow effect
- Improved car lighting

## [1.5.1] - 2023-05-10

### Added
- UI/UX overhaul
- Improved menu design
- Added tutorial page

## [1.5.0] - 2023-05-01

### Added
- Improved car physics
- Added speed-sensitive steering
- Enhanced collision detection

## [1.4.0] - 2023-04-15

### Added
- Added power-ups system
- Speed boost power-up
- Shield power-up
- Nitro power-up

## [1.3.0] - 2023-04-01

### Added
- Improved mobile controls
- Added virtual joystick
- Added touch buttons for acceleration and braking

## [1.0.0] - 2023-03-15

### Added
- Initial game release
- Basic driving mechanics
- Procedurally generated track
- Simple scoring system 

## [1.8.0] - 2023-07-12

### Fixed
- Fixed inconsistency between normal refresh and hard refresh
- Prevented double initialization of the game
- Added proper cache control headers to prevent browser caching issues

### Changed
- Improved initialization process with better state management
- Enhanced error handling for more consistent behavior across browsers

### Added
- Added initialization flag to prevent multiple simultaneous initializations
- Added explicit cache control meta tags to HTML

## [1.8.1] - 2023-03-14
### Fixed
- Fixed game loading issues with hard refresh and inconsistent page loading
- Improved service worker caching strategy to handle hard refreshes properly
- Consolidated HTML files to prevent confusion between index.html and index_modular.html
- Added proper cache busting to all resource URLs
- Added clear cache functionality to help users recover from cache-related issues
- Improved error handling during game initialization

### Added
- Added a "Clear Cache & Reload" button to the main menu
- Added utility functions for managing browser caches
- Added better error recovery options when game fails to initialize

## v1.7.9 - 2023-11-13
- Fixed error with `traverse` method being called on undefined objects
- Resolved cache issues with hard refresh vs normal refresh
- Fixed environment object animation
- Removed external asset loading, now using only Three.js generated assets
- Updated roadmap to reflect current development status
- Improved error handling during game initialization
- Added cache busting for all resources
- Added better fallback handling for asset creation
- Added more detailed cyberpunk building and tree models
- Added technical implementation section to roadmap 