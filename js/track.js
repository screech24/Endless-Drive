// Track generation and management functions

function generateInitialTrack() {
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
        scene.remove(groundTiles[i]);
        if (groundTiles[i].material.map) {
            objectPool.returnGroundTexture(groundTiles[i].material.map);
        }
        groundTiles[i].material.dispose();
        groundTiles[i].geometry.dispose();
    }
    groundTiles = [];
    
    // Clear existing environment objects
    for (let i = 0; i < environmentObjects.length; i++) {
        scene.remove(environmentObjects[i]);
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
}

function addTrackSegment(direction, z) {
    // Create track segment
    const segmentGeometry = new THREE.PlaneGeometry(trackWidth, segmentLength);
    
    // Get track material from pool or create new one
    const trackMaterial = objectPool.getTrackMaterial();
    
    const segment = new THREE.Mesh(segmentGeometry, trackMaterial);
    segment.rotation.x = -Math.PI / 2;
    segment.position.set(0, 0, z);
    scene.add(segment);
    track.push(segment);
    
    // Add neon edges to track
    addNeonEdgesToTrack(segment, trackWidth, segmentLength);
    
    // Randomly add obstacles and power-ups
    if (Math.random() < 0.2 && z > 100) {
        addObstacle(segment);
    }
    
    if (Math.random() < 0.1 && z > 150) {
        addPowerUp(segment);
    }
    
    // Add environment objects
    if (Math.random() < 0.3) {
        addEnvironmentObjects(segment);
    }
    
    return segment;
}

// Function to add neon edges to track segments
function addNeonEdgesToTrack(segment, width, length) {
    const edgeWidth = 0.3;
    const edgeHeight = 0.2;
    
    // Create left edge
    const leftEdgeGeometry = new THREE.BoxGeometry(edgeWidth, edgeHeight, length);
    const leftEdgeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff00ff,
        emissive: 0xff00ff,
        emissiveIntensity: 1,
        shininess: 100
    });
    
    const leftEdge = new THREE.Mesh(leftEdgeGeometry, leftEdgeMaterial);
    leftEdge.position.set(-width/2 - edgeWidth/2, edgeHeight/2, 0);
    segment.add(leftEdge);
    
    // Create right edge
    const rightEdgeGeometry = new THREE.BoxGeometry(edgeWidth, edgeHeight, length);
    const rightEdgeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff00ff,
        emissive: 0xff00ff,
        emissiveIntensity: 1,
        shininess: 100
    });
    
    const rightEdge = new THREE.Mesh(rightEdgeGeometry, rightEdgeMaterial);
    rightEdge.position.set(width/2 + edgeWidth/2, edgeHeight/2, 0);
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
    const obstacleMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff3300,
        emissive: 0xff3300,
        emissiveIntensity: 0.5
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
    // Create ground tiles around the track
    const tileSize = groundTileSize;
    const numTilesX = 5;
    const numTilesZ = 10;
    
    for (let x = -numTilesX; x <= numTilesX; x++) {
        for (let z = 0; z < numTilesZ; z++) {
            // Create ground tile
            const tileGeometry = new THREE.PlaneGeometry(tileSize, tileSize);
            const groundTexture = objectPool.getGroundTexture();
            const tileMaterial = new THREE.MeshStandardMaterial({
                map: groundTexture,
                roughness: 0.8,
                metalness: 0.2
            });
            const tile = new THREE.Mesh(tileGeometry, tileMaterial);
            
            // Rotate and position tile
            tile.rotation.x = -Math.PI / 2;
            tile.position.set(x * tileSize, -0.1, z * tileSize);
            
            // Add tile to scene and ground tiles array
            scene.add(tile);
            groundTiles.push(tile);
        }
    }
}

function addEnvironmentObjects() {
    // Add cyberpunk-themed environment objects
    const themeConfig = themeSettings[theme];
    
    // Add buildings on both sides of the track
    for (let z = -2; z < 20; z += 4) {
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
            
            const buildingMaterial = new THREE.MeshPhongMaterial({
                color: 0x111111,
                emissive: buildingColor,
                emissiveIntensity: 0.2,
                specular: 0x111111
            });
            
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            
            // Position building
            const distanceFromTrack = trackWidth + buildingWidth / 2 + 5;
            building.position.set(side * distanceFromTrack, buildingHeight / 2 - 0.1, z * 20);
            
            // Add building to scene and environment objects array
            scene.add(building);
            environmentObjects.push(building);
            
            // Add windows to the building
            addBuildingWindows(building, buildingWidth, buildingHeight, buildingDepth, buildingColor);
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
            if (oldestSegment.material) {
                objectPool.returnTrackMaterial(oldestSegment.material);
            }
            
            // Dispose of geometries and materials
            oldestSegment.traverse(function(child) {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        }
        
        // Update ground tiles and environment objects
        updateGroundTiles();
        updateEnvironmentObjects();
    }
    
    // Animate neon edges
    animateNeonEdges();
}

// Function to animate neon edges
function animateNeonEdges() {
    const time = Date.now() * 0.001; // Current time in seconds
    
    track.forEach(segment => {
        segment.children.forEach(child => {
            if (child.userData && child.userData.pulseSpeed) {
                // Create pulsing effect
                const intensity = 0.7 + Math.sin(time * child.userData.pulseSpeed) * 0.3;
                
                if (child.material) {
                    // Only set emissiveIntensity if the material supports it
                    if (child.material.type === 'MeshPhongMaterial' || 
                        child.material.type === 'MeshStandardMaterial' || 
                        child.material.type === 'MeshLambertMaterial') {
                        child.material.emissiveIntensity = intensity * child.userData.initialIntensity;
                    }
                    
                    // Adjust opacity for all material types
                    if (child.material.transparent) {
                        child.material.opacity = 0.7 + 0.3 * intensity;
                    }
                }
            }
        });
    });
}

function updateGroundTiles() {
    // Move ground tiles forward as the player progresses
    if (groundTiles.length > 0 && car.position.z > groundTiles[groundTiles.length - 1].position.z - groundTileSize) {
        // Remove first row of tiles
        for (let i = 0; i < 11; i++) {
            const oldTile = groundTiles.shift();
            scene.remove(oldTile);
            if (oldTile.material.map) {
                objectPool.returnGroundTexture(oldTile.material.map);
            }
            oldTile.material.dispose();
            oldTile.geometry.dispose();
        }
        
        // Add new row of tiles
        const lastTileZ = groundTiles[groundTiles.length - 1].position.z;
        const newTileZ = lastTileZ + groundTileSize;
        
        for (let x = -5; x <= 5; x++) {
            // Create ground tile
            const tileGeometry = new THREE.PlaneGeometry(groundTileSize, groundTileSize);
            const groundTexture = objectPool.getGroundTexture();
            const tileMaterial = new THREE.MeshStandardMaterial({
                map: groundTexture,
                roughness: 0.8,
                metalness: 0.2
            });
            const tile = new THREE.Mesh(tileGeometry, tileMaterial);
            
            // Rotate and position tile
            tile.rotation.x = -Math.PI / 2;
            tile.position.set(x * groundTileSize, -0.1, newTileZ);
            
            // Add tile to scene and ground tiles array
            scene.add(tile);
            groundTiles.push(tile);
        }
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
                
                const buildingMaterial = new THREE.MeshPhongMaterial({
                    color: 0x111111,
                    emissive: buildingColor,
                    emissiveIntensity: 0.2,
                    specular: 0x111111
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