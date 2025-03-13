// Track generation and management functions

// Remove duplicate frameCount definition since it's now in main.js
// let frameCount = 0;

function generateInitialTrack() {
    try {
        // Clear existing track
        for (let i = 0; i < track.length; i++) {
            scene.remove(track[i]);
        }
        track = [];
        
        // Clear existing obstacles
        for (let i = 0; i < obstacles.length; i++) {
            scene.remove(obstacles[i]);
        }
        obstacles = [];
        
        // Clear existing power-ups
        for (let i = 0; i < powerUps.length; i++) {
            scene.remove(powerUps[i]);
        }
        powerUps = [];
        
        // Clear existing ground tiles
        for (let i = 0; i < groundTiles.length; i++) {
            if (groundTiles[i]) {
                scene.remove(groundTiles[i]);
                if (groundTiles[i].material) {
                    if (groundTiles[i].material.map && typeof objectPool !== 'undefined' && objectPool.returnGroundTexture) {
                        objectPool.returnGroundTexture(groundTiles[i].material.map);
                    }
                    groundTiles[i].material.dispose();
                }
                if (groundTiles[i].geometry) {
                    groundTiles[i].geometry.dispose();
                }
            }
        }
        groundTiles = [];
        
        // Clear existing environment objects
        for (let i = 0; i < environmentObjects.length; i++) {
            if (environmentObjects[i]) {
                scene.remove(environmentObjects[i]);
            }
        }
        environmentObjects = [];
        
        // Generate initial straight track
        for (let i = 0; i < 10; i++) {
            addTrackSegment(0, i * segmentLength);
        }
        
        // Reset current segment
        currentSegment = 0;
        
        // Add initial ground tiles
        addGroundTiles();
        
        // Add initial environment objects
        addEnvironmentObjects();
    } catch (error) {
        console.error("Error generating initial track:", error);
    }
}

function addTrackSegment(direction, z) {
    try {
        // Create track segment
        const segmentGeometry = new THREE.PlaneGeometry(trackWidth, segmentLength);
        
        // Get track material from pool or create new one
        let trackMaterial;
        if (typeof objectPool !== 'undefined' && objectPool.getTrackMaterial) {
            trackMaterial = objectPool.getTrackMaterial();
        } else {
            // Fallback if objectPool is not available
            trackMaterial = createTrackMaterial();
        }
        
        const segment = new THREE.Mesh(segmentGeometry, trackMaterial);
        segment.rotation.x = -Math.PI / 2;
        segment.position.set(0, 0, z);
        
        // Apply direction offset (left/right curve)
        if (direction !== 0) {
            segment.position.x = direction * 5;
        }
        
        // Add segment to scene and track array
        scene.add(segment);
        track.push(segment);
        
        // Add neon edges to track
        addNeonEdgesToTrack(segment, trackWidth, segmentLength);
        
        // Randomly add obstacles and power-ups
        if (Math.random() < 0.3 && z > segmentLength * 5) { // No obstacles in first 5 segments
            addObstacle(segment);
        }
        
        if (Math.random() < 0.1 && z > segmentLength * 10) { // Power-ups are more rare and start later
            addPowerUp(segment);
        }
    } catch (error) {
        console.error("Error adding track segment:", error);
    }
}

// Function to add neon edges to track segments
function addNeonEdgesToTrack(segment, width, length) {
    const edgeWidth = 0.3;
    const edgeHeight = 0.2;
    
    // Create left edge
    const leftEdgeGeometry = new THREE.BoxGeometry(edgeWidth, edgeHeight, length);
    const leftEdgeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff00ff
    });
    
    const leftEdge = new THREE.Mesh(leftEdgeGeometry, leftEdgeMaterial);
    leftEdge.position.set(-width/2 - edgeWidth/2, edgeHeight/2, 0);
    // Rotate the edge to match the track's rotation
    leftEdge.rotation.x = -Math.PI / 2;
    segment.add(leftEdge);
    
    // Create right edge
    const rightEdgeGeometry = new THREE.BoxGeometry(edgeWidth, edgeHeight, length);
    const rightEdgeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff00ff
    });
    
    const rightEdge = new THREE.Mesh(rightEdgeGeometry, rightEdgeMaterial);
    rightEdge.position.set(width/2 + edgeWidth/2, edgeHeight/2, 0);
    // Rotate the edge to match the track's rotation
    rightEdge.rotation.x = -Math.PI / 2;
    segment.add(rightEdge);
    
    // Add pulsing animation to edges
    const pulseSpeed = 0.5 + Math.random() * 0.5;
    leftEdge.userData = { pulseSpeed: pulseSpeed, initialIntensity: 1 };
    rightEdge.userData = { pulseSpeed: pulseSpeed, initialIntensity: 1 };
}

function createTrackMaterial() {
    // Create track texture with neon grid lines
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
    context.lineWidth = 2;
    for (let y = 0; y < trackCanvas.height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(trackCanvas.width, y);
        context.stroke();
    }
    
    // Add a subtle glow effect
    context.shadowBlur = 15;
    context.shadowColor = '#ff00ff';
    context.strokeStyle = '#ff00ff';
    context.lineWidth = 4;
    context.strokeRect(0, 0, trackCanvas.width, trackCanvas.height);
    
    // Add another glow with different color
    context.shadowColor = '#00ffff';
    context.strokeStyle = '#00ffff';
    context.strokeRect(10, 10, trackCanvas.width - 20, trackCanvas.height - 20);
    
    const trackTexture = new THREE.CanvasTexture(trackCanvas);
    trackTexture.wrapS = THREE.RepeatWrapping;
    trackTexture.wrapT = THREE.RepeatWrapping;
    trackTexture.repeat.set(1, 1);
    
    const trackMaterial = new THREE.MeshBasicMaterial({
        map: trackTexture,
        side: THREE.DoubleSide
    });
    
    return trackMaterial;
}

function addObstacle(segment) {
    // Create obstacle
    const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
    const obstacleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff3300
    });
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    
    // Position obstacle randomly on the track segment
    const segmentPosition = segment.position.clone();
    const randomX = (Math.random() - 0.5) * (trackWidth - 2);
    const randomZ = (Math.random() - 0.5) * segmentLength;
    
    obstacle.position.set(
        segmentPosition.x + randomX,
        0.5, // Half the height of the obstacle
        segmentPosition.z + randomZ
    );
    
    // Add obstacle to scene and obstacles array
    scene.add(obstacle);
    obstacles.push(obstacle);
}

function addPowerUp(segment) {
    // Determine power-up type
    const powerUpTypes = ['speed', 'shield', 'nitro'];
    const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
    
    // Create power-up
    const powerUpGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    
    // Set color based on power-up type
    let color;
    switch (type) {
        case 'speed':
            color = 0x00ff00; // Green for speed boost
            break;
        case 'shield':
            color = 0x0088ff; // Blue for shield
            break;
        case 'nitro':
            color = 0xffcc00; // Yellow for nitro
            break;
    }
    
    const powerUpMaterial = new THREE.MeshPhongMaterial({ 
        color: color,
        emissive: color,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.8
    });
    
    const powerUp = new THREE.Mesh(powerUpGeometry, powerUpMaterial);
    
    // Add power-up type as a property
    powerUp.userData.type = type;
    
    // Position power-up randomly on the track segment
    const segmentPosition = segment.position.clone();
    const randomX = (Math.random() - 0.5) * (trackWidth - 2);
    const randomZ = (Math.random() - 0.5) * segmentLength;
    
    powerUp.position.set(
        segmentPosition.x + randomX,
        1, // Slightly above the ground
        segmentPosition.z + randomZ
    );
    
    // Add animation
    powerUp.userData.initialY = powerUp.position.y;
    powerUp.userData.animationOffset = Math.random() * Math.PI * 2;
    
    // Add power-up to scene and power-ups array
    scene.add(powerUp);
    powerUps.push(powerUp);
}

function addGroundTiles() {
    try {
        // Create ground tiles around the track
        const tileSize = groundTileSize;
        const numTilesX = 5;
        const numTilesZ = 10;
        
        // Calculate the starting Z position for new tiles
        let startZ = 0;
        if (groundTiles.length > 0) {
            const lastTile = groundTiles[groundTiles.length - 1];
            startZ = lastTile.position.z + tileSize;
        }
        
        for (let x = -numTilesX; x <= numTilesX; x++) {
            for (let z = 0; z < numTilesZ; z++) {
                // Create ground tile
                const tileGeometry = new THREE.PlaneGeometry(tileSize, tileSize);
                
                // Get ground texture from pool or create new one
                let groundTexture;
                if (typeof objectPool !== 'undefined' && objectPool.getGroundTexture) {
                    groundTexture = objectPool.getGroundTexture();
                } else {
                    // Create a basic texture if objectPool is not available
                    const canvas = document.createElement('canvas');
                    canvas.width = 512;
                    canvas.height = 512;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#0a0a0a';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    groundTexture = new THREE.CanvasTexture(canvas);
                }
                
                const tileMaterial = new THREE.MeshStandardMaterial({
                    map: groundTexture,
                    roughness: 0.8,
                    metalness: 0.2
                });
                
                const tile = new THREE.Mesh(tileGeometry, tileMaterial);
                
                // Rotate and position tile
                tile.rotation.x = -Math.PI / 2;
                tile.position.set(x * tileSize, -0.1, startZ + z * tileSize);
                
                // Add tile to scene and ground tiles array
                scene.add(tile);
                groundTiles.push(tile);
            }
        }
        
        // Remove distant ground tiles to save memory
        const maxGroundTiles = numTilesX * 2 * numTilesZ * 2; // Keep a reasonable number of tiles
        if (groundTiles.length > maxGroundTiles) {
            const numToRemove = groundTiles.length - maxGroundTiles;
            for (let i = 0; i < numToRemove; i++) {
                const oldestTile = groundTiles.shift();
                if (oldestTile) {
                    scene.remove(oldestTile);
                    
                    // Return texture to pool
                    if (oldestTile.material && oldestTile.material.map && typeof objectPool !== 'undefined' && objectPool.returnGroundTexture) {
                        objectPool.returnGroundTexture(oldestTile.material.map);
                    }
                    
                    // Dispose of material and geometry
                    if (oldestTile.material) {
                        oldestTile.material.dispose();
                    }
                    if (oldestTile.geometry) {
                        oldestTile.geometry.dispose();
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error adding ground tiles:", error);
    }
}

function addEnvironmentObjects() {
    try {
        // Add cyberpunk-style buildings and objects around the track
        const numObjects = 10;
        
        // Calculate the starting Z position for new objects
        let startZ = 0;
        if (environmentObjects.length > 0) {
            // Find the furthest object
            let maxZ = -Infinity;
            for (let i = 0; i < environmentObjects.length; i++) {
                if (environmentObjects[i] && environmentObjects[i].position.z > maxZ) {
                    maxZ = environmentObjects[i].position.z;
                }
            }
            startZ = maxZ + 50; // Space objects out
        }
        
        // Get theme colors for neon
        const themeConfig = themeSettings[theme];
        
        for (let i = 0; i < numObjects; i++) {
            // Randomly choose object type
            const objectType = Math.floor(Math.random() * 3); // 0 = building, 1 = billboard, 2 = street light
            
            // Randomly choose side of track
            const side = Math.random() > 0.5 ? 1 : -1;
            
            // Randomly choose neon color
            const neonColor = themeConfig.neonColors[Math.floor(Math.random() * themeConfig.neonColors.length)];
            
            // Position along Z axis
            const zPos = startZ + i * 50 + Math.random() * 30;
            
            // Create object based on type
            let object;
            
            if (objectType === 0) {
                // Create building
                const width = 10 + Math.random() * 20;
                const height = 20 + Math.random() * 40;
                const depth = 10 + Math.random() * 20;
                
                const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
                const buildingMaterial = new THREE.MeshBasicMaterial({ 
                    color: 0x111111
                });
                
                object = new THREE.Mesh(buildingGeometry, buildingMaterial);
                
                // Position building
                const distanceFromTrack = trackWidth / 2 + 10 + Math.random() * 30;
                object.position.set(side * distanceFromTrack, height / 2, zPos);
                
                // Add windows with neon glow
                addBuildingWindows(object, width, height, depth, neonColor);
            } else if (objectType === 1) {
                // Create billboard
                const width = 10 + Math.random() * 5;
                const height = 5 + Math.random() * 3;
                
                const billboardGeometry = new THREE.PlaneGeometry(width, height);
                const billboardMaterial = new THREE.MeshPhongMaterial({ 
                    color: neonColor,
                    emissive: neonColor,
                    emissiveIntensity: 1
                });
                
                object = new THREE.Mesh(billboardGeometry, billboardMaterial);
                
                // Position billboard
                const distanceFromTrack = trackWidth / 2 + 5 + Math.random() * 10;
                object.position.set(side * distanceFromTrack, height / 2 + 5, zPos);
                
                // Rotate billboard to face track
                object.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
            } else {
                // Create street light
                const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 8);
                const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
                
                object = new THREE.Group();
                
                const pole = new THREE.Mesh(poleGeometry, poleMaterial);
                pole.position.y = 5;
                object.add(pole);
                
                // Add light fixture
                const fixtureGeometry = new THREE.BoxGeometry(1, 0.5, 2);
                const fixtureMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
                
                const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
                fixture.position.set(0, 9.5, 0);
                object.add(fixture);
                
                // Add light source
                const light = new THREE.PointLight(neonColor, 1, 20);
                light.position.set(0, 9.5, 0);
                object.add(light);
                
                // Position street light
                const distanceFromTrack = trackWidth / 2 + 2;
                object.position.set(side * distanceFromTrack, 0, zPos);
            }
            
            // Add object to scene and environment objects array
            if (object) {
                scene.add(object);
                environmentObjects.push(object);
            }
        }
        
        // Remove distant environment objects to save memory
        const maxEnvironmentObjects = 50;
        if (environmentObjects.length > maxEnvironmentObjects) {
            const numToRemove = environmentObjects.length - maxEnvironmentObjects;
            for (let i = 0; i < numToRemove; i++) {
                const oldestObject = environmentObjects.shift();
                if (oldestObject) {
                    scene.remove(oldestObject);
                    
                    // Recursively dispose of materials and geometries
                    disposeObject(oldestObject);
                }
            }
        }
    } catch (error) {
        console.error("Error adding environment objects:", error);
    }
}

// Helper function to dispose of objects recursively
function disposeObject(object) {
    if (!object) return;
    
    // Dispose of geometry and material if they exist
    if (object.geometry) {
        object.geometry.dispose();
    }
    
    if (object.material) {
        if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
        } else {
            object.material.dispose();
        }
    }
    
    // Recursively dispose of children
    if (object.children && object.children.length > 0) {
        for (let i = 0; i < object.children.length; i++) {
            disposeObject(object.children[i]);
        }
    }
}

function addBuildingWindows(building, width, height, depth, neonColor) {
    // Add windows to the building
    const windowSize = 1;
    const windowSpacing = 3;
    const windowGeometry = new THREE.PlaneGeometry(windowSize, windowSize);
    const windowMaterial = new THREE.MeshBasicMaterial({
        color: neonColor,
        side: THREE.DoubleSide
    });
    
    // Calculate number of windows
    const numWindowsX = Math.floor(width / windowSpacing) - 1;
    const numWindowsY = Math.floor(height / windowSpacing) - 1;
    const numWindowsZ = Math.floor(depth / windowSpacing) - 1;
    
    // Add windows to front and back
    for (let x = 0; x < numWindowsX; x++) {
        for (let y = 0; y < numWindowsY; y++) {
            // Only add some windows randomly
            if (Math.random() < 0.7) {
                // Front window
                const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                frontWindow.position.set(
                    (x * windowSpacing) - (width / 2) + windowSpacing,
                    (y * windowSpacing) - (height / 2) + windowSpacing,
                    depth / 2 + 0.1
                );
                building.add(frontWindow);
                
                // Back window
                const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                backWindow.position.set(
                    (x * windowSpacing) - (width / 2) + windowSpacing,
                    (y * windowSpacing) - (height / 2) + windowSpacing,
                    -depth / 2 - 0.1
                );
                backWindow.rotation.y = Math.PI;
                building.add(backWindow);
            }
        }
    }
    
    // Add windows to sides
    for (let z = 0; z < numWindowsZ; z++) {
        for (let y = 0; y < numWindowsY; y++) {
            // Only add some windows randomly
            if (Math.random() < 0.7) {
                // Left window
                const leftWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                leftWindow.position.set(
                    -width / 2 - 0.1,
                    (y * windowSpacing) - (height / 2) + windowSpacing,
                    (z * windowSpacing) - (depth / 2) + windowSpacing
                );
                leftWindow.rotation.y = -Math.PI / 2;
                building.add(leftWindow);
                
                // Right window
                const rightWindow = new THREE.Mesh(windowGeometry, windowMaterial);
                rightWindow.position.set(
                    width / 2 + 0.1,
                    (y * windowSpacing) - (height / 2) + windowSpacing,
                    (z * windowSpacing) - (depth / 2) + windowSpacing
                );
                rightWindow.rotation.y = Math.PI / 2;
                building.add(rightWindow);
            }
        }
    }
}

function addCyberpunkLighting() {
    // Add atmospheric lighting for cyberpunk theme
    const themeConfig = themeSettings[theme];
    
    // Add spotlights with different colors
    for (let i = 0; i < 5; i++) {
        const colorIndex = Math.floor(Math.random() * themeConfig.neonColors.length);
        const spotlightColor = themeConfig.neonColors[colorIndex];
        
        const spotlight = new THREE.SpotLight(spotlightColor, 2);
        spotlight.position.set(
            (Math.random() - 0.5) * 50,
            20 + Math.random() * 30,
            -20 + Math.random() * 100
        );
        spotlight.angle = Math.PI / 8;
        spotlight.penumbra = 0.2;
        spotlight.distance = 100;
        spotlight.decay = 1;
        
        scene.add(spotlight);
        environmentObjects.push(spotlight);
    }
}

function updateTrack() {
    try {
        // Check if we need to generate more track
        if (car.position.z > currentSegment * segmentLength) {
            currentSegment++;
            
            // Generate new track segment
            const lastSegment = track[track.length - 1];
            const newZ = lastSegment.position.z + segmentLength;
            
            // Randomly choose direction (straight, left, right)
            const direction = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
            addTrackSegment(direction, newZ);
            
            // Remove distant track segments to save memory
            if (track.length > 30) {
                const oldestSegment = track.shift();
                scene.remove(oldestSegment);
                
                // Return track material to pool
                if (oldestSegment.material && typeof objectPool !== 'undefined' && objectPool.returnTrackMaterial) {
                    objectPool.returnTrackMaterial(oldestSegment.material);
                }
                
                // Dispose of geometry
                if (oldestSegment.geometry) {
                    oldestSegment.geometry.dispose();
                }
            }
            
            // Update ground tiles and environment objects
            addGroundTiles();
            addEnvironmentObjects();
        }
        
        // Animate neon edges
        animateNeonEdges();
        
        // Update ground tiles
        updateGroundTiles();
        
        // Update environment objects
        updateEnvironmentObjects();
    } catch (error) {
        console.error("Error updating track:", error);
    }
}

// Function to animate neon edges
function animateNeonEdges() {
    const time = Date.now() * 0.001; // Current time in seconds
    
    // Only process visible track segments to improve performance
    for (let i = 0; i < track.length; i++) {
        const segment = track[i];
        
        // Skip segments that are too far away
        const distance = car.position.distanceTo(segment.position);
        if (distance > 100) continue; // Only animate segments within 100 units
        
        for (let j = 0; j < segment.children.length; j++) {
            const child = segment.children[j];
            if (child.userData && child.userData.pulseSpeed) {
                // Create pulsing effect
                const intensity = 0.7 + Math.sin(time * child.userData.pulseSpeed) * 0.3;
                
                if (child.material) {
                    // Handle different material types appropriately
                    if (child.material.type === 'MeshPhongMaterial' || 
                        child.material.type === 'MeshStandardMaterial' || 
                        child.material.type === 'MeshLambertMaterial') {
                        // These materials support emissiveIntensity
                        child.material.emissiveIntensity = intensity * child.userData.initialIntensity;
                    } else if (child.material.type === 'MeshBasicMaterial') {
                        // For MeshBasicMaterial, adjust color intensity instead
                        const baseColor = new THREE.Color(0xff00ff);
                        const scaledColor = baseColor.clone().multiplyScalar(intensity);
                        child.material.color.set(scaledColor);
                    }
                    
                    // Adjust opacity for all material types
                    if (child.material.transparent) {
                        child.material.opacity = 0.7 + 0.3 * intensity;
                    }
                }
            }
        }
    }
}

function updateGroundTiles() {
    try {
        // Check if we need to add more ground tiles
        const farthestTile = groundTiles.length > 0 ? 
            groundTiles[groundTiles.length - 1].position.z : 0;
        
        if (car.position.z > farthestTile - groundTileSize * 2) {
            // Add more ground tiles
            addGroundTiles();
        }
        
        // Remove distant ground tiles
        while (groundTiles.length > 0 && 
               groundTiles[0].position.z < car.position.z - groundTileSize * 3) {
            const oldTile = groundTiles.shift();
            scene.remove(oldTile);
            
            // Return texture to pool
            if (oldTile.material && oldTile.material.map && 
                typeof objectPool !== 'undefined' && objectPool.returnGroundTexture) {
                objectPool.returnGroundTexture(oldTile.material.map);
            }
            
            // Dispose of geometry and material
            if (oldTile.geometry) oldTile.geometry.dispose();
            if (oldTile.material) oldTile.material.dispose();
        }
    } catch (error) {
        console.error("Error updating ground tiles:", error);
    }
}

function updateEnvironmentObjects() {
    // Move environment objects forward as the player progresses
    if (environmentObjects.length > 0) {
        // Find the farthest building
        let maxZ = -Infinity;
        for (let i = 0; i < environmentObjects.length; i++) {
            const obj = environmentObjects[i];
            if (obj.position && obj.position.z > maxZ) {
                maxZ = obj.position.z;
            }
        }
        
        // If the player is approaching the end of the environment objects, add more
        if (car.position.z > maxZ - 100) {
            // Add more buildings
            const themeConfig = themeSettings[theme];
            
            for (let side = -1; side <= 1; side += 2) {
                if (side === 0) continue; // Skip center
                
                // Randomize building properties
                const buildingWidth = 10 + Math.random() * 10;
                const buildingDepth = 10 + Math.random() * 10;
                const buildingHeight = 20 + Math.random() * 80;
                
                // Create building
                const buildingGeometry = new THREE.BoxGeometry(buildingWidth, buildingHeight, buildingDepth);
                
                // Choose a random neon color for the building
                const neonColorIndex = Math.floor(Math.random() * themeConfig.neonColors.length);
                const buildingColor = themeConfig.neonColors[neonColorIndex];
                
                // Changed from MeshPhongMaterial to MeshBasicMaterial to avoid emissive property warnings
                const buildingMaterial = new THREE.MeshBasicMaterial({
                    color: 0x111111
                });
                
                const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
                
                // Position building
                const distanceFromTrack = trackWidth + buildingWidth / 2 + 5;
                building.position.set(side * distanceFromTrack, buildingHeight / 2 - 0.1, maxZ + 80);
                
                // Add building to scene and environment objects array
                scene.add(building);
                environmentObjects.push(building);
                
                // Add windows to the building
                addBuildingWindows(building, buildingWidth, buildingHeight, buildingDepth, buildingColor);
            }
            
            // Remove old environment objects to save memory
            while (environmentObjects.length > 50) {
                const oldObject = environmentObjects.shift();
                scene.remove(oldObject);
                
                // Dispose of materials and geometries if they exist
                if (oldObject.material) {
                    if (Array.isArray(oldObject.material)) {
                        oldObject.material.forEach(mat => mat.dispose());
                    } else {
                        oldObject.material.dispose();
                    }
                }
                
                if (oldObject.geometry) {
                    oldObject.geometry.dispose();
                }
            }
        }
    }
}

function checkCollisions() {
    // Check for collisions with obstacles
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const distance = car.position.distanceTo(obstacle.position);
        
        // Collision detected
        if (distance < 1.5) {
            if (activePowerUp === 'shield') {
                // Shield protects from obstacles
                scene.remove(obstacle);
                obstacles.splice(i, 1);
                i--;
            } else {
                // Game over
                gameOver();
                return;
            }
        }
    }
    
    // Check for collisions with power-ups
    for (let i = 0; i < powerUps.length; i++) {
        const powerUp = powerUps[i];
        const distance = car.position.distanceTo(powerUp.position);
        
        // Collision detected
        if (distance < 1.5) {
            // Collect power-up
            collectPowerUp(powerUp);
            
            // Remove power-up
            scene.remove(powerUp);
            powerUps.splice(i, 1);
            i--;
        }
    }
} 