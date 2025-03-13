// Game variables
let scene, camera, renderer, car;
let track = [];
let obstacles = [];
let powerUps = [];
let groundTiles = []; // Add array to track ground tiles
let score = 0;
let speed = 0; // Initial speed
let maxSpeed = 150; // Default max speed
let acceleration = 50; // Default acceleration
let steering = 3.5; // Default steering
let activePowerUp = null;
let powerUpTimer = 0;
let gameActive = false;
let cameraOffset = new THREE.Vector3(0, 5, -10);
let clock = new THREE.Clock();
let highScore = localStorage.getItem('highScore') || 0;
let carType = 'sportsCar';
let theme = 'cyberpunk';
let currentSegment = 0;
let segmentLength = 50;
let trackWidth = 10;
let groundTileSize = 100; // Size of each ground tile
let carSpecs = {
    sportsCar: { 
        acceleration: 20, // Increased from 15 for better responsiveness
        maxSpeed: 180, // Increased from 150 for higher top speed
        steering: 4.0, // Increased from 3.5 for more responsive steering
        color: 0xff00ff,
        secondaryColor: 0x00ffff, // Secondary color for details
        rimColor: 0xcccccc, // Color for wheel rims
        glassColor: 0x88ccff // Color for windows
    }
};
let themeSettings = {
    cyberpunk: { 
        groundColor: 0x0a0a0a,
        fogColor: 0x220033,
        fogDensity: 0.015,
        skyColor: 0x000033,
        ambientLight: 0x330066,
        directionalLight: 0xff00ff,
        
        neonColors: [
            0xff00ff,
            0x00ffff,
            0xff3300,
            0x33ff00
        ]
    }
};
const keys = {};
let isMobileDevice = false;
let joystickInput = 0; // Store joystick steering input (-1 to 1)

// Environment objects
let environmentObjects = [];

// Performance monitoring variables
let frameTimeHistory = [];
const MAX_HISTORY_LENGTH = 30;
let lastFrameTime = 0;
let throttleLevel = 0; // 0 = no throttling, 3 = max throttling
let frameCount = 0;

// Object pooling for performance optimization
const objectPool = {
    groundTileTextures: [],
    trackMaterials: [], // Add track material pooling
    
    getGroundTexture: function() {
        if (this.groundTileTextures.length > 0) {
            return this.groundTileTextures.pop();
        }
        
        // Create a new texture if none are available in the pool
        const groundCanvas = document.createElement('canvas');
        groundCanvas.width = 512; // Reduced from 1024 for better performance
        groundCanvas.height = 512; // Reduced from 1024 for better performance
        const context = groundCanvas.getContext('2d');
        
        // Fill with dark color
        context.fillStyle = '#0a0a0a';
        context.fillRect(0, 0, groundCanvas.width, groundCanvas.height);
        
        // Add grid pattern
        context.strokeStyle = '#220022';
        context.lineWidth = 1;
        
        // Draw grid with larger spacing for better performance
        const gridSize = 128; // Increased from 64 for better performance
        for (let x = 0; x < groundCanvas.width; x += gridSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, groundCanvas.width);
            context.stroke();
        }
        
        for (let y = 0; y < groundCanvas.height; y += gridSize) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(groundCanvas.width, y);
            context.stroke();
        }
        
        const groundTexture = new THREE.CanvasTexture(groundCanvas);
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(5, 5);
        
        return groundTexture;
    },
    
    returnGroundTexture: function(texture) {
        // Only keep a reasonable pool size to prevent memory issues
        if (this.groundTileTextures.length < 10) {
            this.groundTileTextures.push(texture);
        } else {
            texture.dispose();
        }
    },
    
    getTrackMaterial: function() {
        if (this.trackMaterials.length > 0) {
            return this.trackMaterials.pop();
        }
        
        // Create track texture with neon grid lines directly instead of calling createTrackMaterial()
        const trackCanvas = document.createElement('canvas');
        trackCanvas.width = 512;
        trackCanvas.height = 512;
        const context = trackCanvas.getContext('2d');
        
        // Fill with dark color
        context.fillStyle = '#000000';
        context.fillRect(0, 0, trackCanvas.width, trackCanvas.height);
        
        // Add grid pattern with neon colors
        const gridSize = 64;
        
        // Draw vertical lines
        context.strokeStyle = '#00ffff';
        context.lineWidth = 2;
        for (let x = 0; x < trackCanvas.width; x += gridSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, trackCanvas.height);
            context.stroke();
        }
        
        // Draw horizontal lines
        context.strokeStyle = '#ff00ff';
        for (let y = 0; y < trackCanvas.height; y += gridSize) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(trackCanvas.width, y);
            context.stroke();
        }
        
        const trackTexture = new THREE.CanvasTexture(trackCanvas);
        trackTexture.wrapS = THREE.RepeatWrapping;
        trackTexture.wrapT = THREE.RepeatWrapping;
        trackTexture.repeat.set(1, 1);
        
        const trackMaterial = new THREE.MeshBasicMaterial({
            map: trackTexture,
            side: THREE.DoubleSide
        });
        
        return trackMaterial;
    },
    
    returnTrackMaterial: function(material) {
        // Only keep a reasonable pool size to prevent memory issues
        if (this.trackMaterials.length < 5) {
            this.trackMaterials.push(material);
        } else {
            material.dispose();
        }
    }
};

// Initialize - make sure we only initialize once
let initialized = false;
function init() {
    console.log("Initializing game...");
    
    // Create scene if it doesn't exist
    if (!scene) {
        console.log("Creating new scene");
        scene = new THREE.Scene();
    }
    
    // Reset game state variables
    activePowerUp = null;
    powerUpTimer = 0;
    gameActive = false;
    
    // Create camera if it doesn't exist
    if (!camera) {
        console.log("Creating new camera");
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
    
    // Create renderer if it doesn't exist
    if (!renderer) {
        console.log("Creating new renderer");
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);
    }
    
    // Set up theme
    const themeConfig = themeSettings[theme];
    scene.background = new THREE.Color(themeConfig.skyColor);
    scene.fog = new THREE.FogExp2(themeConfig.fogColor, themeConfig.fogDensity);
    
    // Add lights - updated for cyberpunk feel with increased brightness
    console.log("Setting up lights");
    const ambientLight = new THREE.AmbientLight(themeConfig.ambientLight, 1.0); // Increased intensity
    scene.add(ambientLight);
    
    // Add a general hemisphere light for better overall illumination
    const hemisphereLight = new THREE.HemisphereLight(0x8844ff, 0x002244, 0.8);
    scene.add(hemisphereLight);
    
    const directionalLight = new THREE.DirectionalLight(themeConfig.directionalLight, 1.0); // Increased intensity
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add more atmospheric lighting for cyberpunk theme
    console.log("Adding cyberpunk lighting");
    addCyberpunkLighting();
    
    // Create car (after lighting setup)
    console.log("Creating car");
    createCar();
    
    // Generate initial track
    console.log("Generating initial track");
    generateInitialTrack();
    
    // Position camera behind car correctly using explicit calculation
    console.log("Positioning camera");
    const carPosition = car.position.clone();
    const carRotation = car.rotation.y;
    
    // Calculate camera position based on car's rotation
    const distance = 10; // Distance behind the car
    const height = 5;    // Height above the car
    
    // Calculate position behind the car based on its rotation
    const offsetX = Math.sin(carRotation) * distance;
    const offsetZ = Math.cos(carRotation) * distance;
    
    // Position camera behind car (using the calculated offset)
    camera.position.set(
        carPosition.x + offsetX,
        carPosition.y + height,
        carPosition.z + offsetZ
    );
    
    // Look at a point slightly above the car
    camera.lookAt(carPosition.x, carPosition.y + 1, carPosition.z);
    
    // Handle window resize and controls only once
    if (!initialized) {
        window.addEventListener('resize', onWindowResize);
        document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
        document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
        
        // Set up mobile controls
        setupMobileControls();
        
        // Check for device orientation
        checkOrientation();
        window.addEventListener('orientationchange', checkOrientation);
        window.addEventListener('resize', checkOrientation);
        
        initialized = true;
        
        // Start animation loop
        animate();
    }
    
    // Update UI visibility based on game state
    updateUIVisibility();
}

// Function to check device orientation and show/hide portrait message
function checkOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isPortrait = window.innerHeight > window.innerWidth;
    
    if (isMobile && isPortrait) {
        document.getElementById('portraitMessage').style.display = 'flex';
    } else {
        document.getElementById('portraitMessage').style.display = 'none';
    }
}

// Function to update UI visibility based on game state
function updateUIVisibility() {
    // Show/hide game UI elements based on game state
    const uiElement = document.getElementById('ui');
    const versionElement = document.getElementById('version');
    
    if (gameActive) {
        uiElement.style.display = 'block';
        versionElement.style.display = 'none';
    } else {
        uiElement.style.display = 'none';
        versionElement.style.display = 'block';
    }
}

// Handle window resize
function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Check orientation again
    checkOrientation();
}

// Add cyberpunk lighting
function addCyberpunkLighting() {
    // Add point lights with neon colors for cyberpunk atmosphere
    const themeConfig = themeSettings[theme];
    
    // Add multiple colored point lights
    for (let i = 0; i < 4; i++) {
        const color = themeConfig.neonColors[i % themeConfig.neonColors.length];
        const pointLight = new THREE.PointLight(color, 1, 50);
        
        // Position lights around the scene
        const angle = (i / 4) * Math.PI * 2;
        const radius = 20;
        pointLight.position.set(
            Math.cos(angle) * radius,
            5 + Math.random() * 5,
            Math.sin(angle) * radius
        );
        
        scene.add(pointLight);
    }
}

// Animation loop
function animate(timestamp) {
    requestAnimationFrame(animate);
    
    // Skip frames if we're experiencing performance issues
    if (throttleLevel >= 3 && frameCount % 2 !== 0) {
        frameCount++;
        return; // Skip this frame entirely
    }
    
    // Calculate frame time for performance monitoring
    if (lastFrameTime > 0) {
        const frameTime = timestamp - lastFrameTime;
        frameTimeHistory.push(frameTime);
        
        // Keep history at a reasonable size
        if (frameTimeHistory.length > MAX_HISTORY_LENGTH) {
            frameTimeHistory.shift();
        }
        
        // Calculate average frame time
        const avgFrameTime = frameTimeHistory.reduce((sum, time) => sum + time, 0) / frameTimeHistory.length;
        
        // Adjust throttling based on performance
        if (avgFrameTime > 40) { // Lower threshold from 50ms to 40ms for earlier throttling
            throttleLevel = Math.min(throttleLevel + 1, 3); // Increase throttling up to level 3
        } else if (avgFrameTime < 25 && throttleLevel > 0) { // Lower threshold for better responsiveness
            throttleLevel = Math.max(throttleLevel - 1, 0); // Decrease throttling
        }
    }
    lastFrameTime = timestamp;
    
    const delta = clock.getDelta();
    
    if (gameActive) {
        try {
            // Always update car position and camera - these are critical
            // But use a more efficient try/catch approach
            try {
                updateCar(delta);
            } catch (carError) {
                console.error("Error updating car:", carError);
                // Don't stop the game for car errors, just reset speed
                speed = 0;
                targetSpeed = 0;
            }
            
            try {
                updateCamera();
            } catch (cameraError) {
                console.error("Error updating camera:", cameraError);
            }
            
            // Update track with potential throttling - only every other frame at high throttle levels
            if (throttleLevel < 2 || frameCount % 2 === 0) {
                try {
                    updateTrack();
                } catch (trackError) {
                    console.error("Error updating track:", trackError);
                }
            }
            
            // Check collisions - throttle based on performance
            if (throttleLevel < 2 || frameCount % 3 === 0) {
                try {
                    checkCollisions();
                } catch (collisionError) {
                    console.error("Error checking collisions:", collisionError);
                }
            }
            
            // Update power-ups - throttle based on performance
            if (throttleLevel < 3 || frameCount % 4 === 0) {
                try {
                    updatePowerUps(delta);
                } catch (powerUpError) {
                    console.error("Error updating power-ups:", powerUpError);
                }
            }
            
            // Update score - this is lightweight so we can do it every frame
            score += speed * delta * 0.1;
            
            // Update UI elements - throttle updates to reduce DOM operations
            if (frameCount % 3 === 0) {
                document.getElementById('score').textContent = `Distance: ${Math.floor(score)}m`;
                document.getElementById('speed').textContent = `Speed: ${Math.floor(speed)} km/h`;
            }
            
        } catch (error) {
            console.error("Error in game loop:", error);
            // Don't stop the game for general errors, just log them
        }
    }
    
    // Increment frame counter for throttling
    frameCount++;
    
    // Render the scene - this is critical so we do it every frame
    try {
        renderer.render(scene, camera);
    } catch (error) {
        console.error("Error rendering scene:", error);
    }
}

// Handle preloader
window.addEventListener('load', function() {
    // Hide preloader after everything is loaded
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 500);
}); 