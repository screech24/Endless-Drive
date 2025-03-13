// Game variables
let scene, camera, renderer, car;
let track = [];
let obstacles = [];
let powerUps = [];
let groundTiles = []; // Add array to track ground tiles
let score = 0;
let speed = 0;
let maxSpeed = 0;
let acceleration = 0;
let steering = 0;
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
        acceleration: 15, 
        maxSpeed: 150, 
        steering: 3.5, 
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
            context.lineTo(x, groundCanvas.height);
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
        groundTexture.repeat.set(2, 2);
        
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
    // Create scene if it doesn't exist
    if (!scene) {
        scene = new THREE.Scene();
    }
    
    // Reset game state variables
    activePowerUp = null;
    powerUpTimer = 0;
    gameActive = false;
    
    // Create camera if it doesn't exist
    if (!camera) {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
    
    // Create renderer if it doesn't exist
    if (!renderer) {
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
    addCyberpunkLighting();
    
    // Create car (after lighting setup)
    createCar();
    
    // Generate initial track
    generateInitialTrack();
    
    // Position camera behind car
    camera.position.set(0, 5, -10);
    camera.lookAt(car.position);
    
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

// Window resize handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    if (gameActive) {
        // Update car position and camera
        updateCar(delta);
        updateCamera();
        
        // Update track and check for collisions
        updateTrack();
        checkCollisions();
        
        // Update power-ups
        updatePowerUps(delta);
        
        // Update score
        score += speed * delta * 0.1;
        document.getElementById('score').textContent = `Distance: ${Math.floor(score)}m`;
        document.getElementById('speed').textContent = `Speed: ${Math.floor(speed)} km/h`;
    }
    
    renderer.render(scene, camera);
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