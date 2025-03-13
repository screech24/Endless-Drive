// Car creation and management functions

function createCar() {
    const specs = carSpecs[carType];
    acceleration = specs.acceleration;
    maxSpeed = specs.maxSpeed;
    steering = specs.steering;
    
    // Remove existing car if it exists
    if (car) {
        scene.remove(car);
    }
    
    // Create a new car
    car = new THREE.Group();
    
    // Create car body - more detailed sports car shape
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: specs.color,
        emissive: specs.color,
        emissiveIntensity: 0.3,
        specular: 0xffffff,
        shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    car.add(body);
    
    // Add a more aerodynamic hood/front
    const hoodGeometry = new THREE.BoxGeometry(1.8, 0.3, 1);
    const hoodMaterial = new THREE.MeshPhongMaterial({ 
        color: specs.color,
        emissive: specs.color,
        emissiveIntensity: 0.3,
        specular: 0xffffff,
        shininess: 100
    });
    const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
    hood.position.set(0, 0.65, -1.5);
    car.add(hood);
    
    // Add a cabin/cockpit
    const cabinGeometry = new THREE.BoxGeometry(1.5, 0.5, 2);
    const cabinMaterial = new THREE.MeshPhongMaterial({ 
        color: specs.glassColor,
        transparent: true,
        opacity: 0.7,
        emissive: specs.glassColor,
        emissiveIntensity: 0.1,
        specular: 0xffffff,
        shininess: 100
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(0, 0.9, 0);
    car.add(cabin);
    
    // Add spoiler
    const spoilerStandGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
    const spoilerMaterial = new THREE.MeshPhongMaterial({ 
        color: specs.secondaryColor,
        emissive: specs.secondaryColor,
        emissiveIntensity: 0.5
    });
    
    const leftSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    leftSpoilerStand.position.set(0.5, 0.8, 1.8);
    car.add(leftSpoilerStand);
    
    const rightSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    rightSpoilerStand.position.set(-0.5, 0.8, 1.8);
    car.add(rightSpoilerStand);
    
    const spoilerTopGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.3);
    const spoilerTop = new THREE.Mesh(spoilerTopGeometry, spoilerMaterial);
    spoilerTop.position.set(0, 0.95, 1.8);
    car.add(spoilerTop);
    
    // Add wheels with better detail
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    // Add wheel rims for more detail
    const rimGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.21, 8);
    const rimMaterial = new THREE.MeshPhongMaterial({ 
        color: specs.rimColor,
        emissive: specs.rimColor,
        emissiveIntensity: 0.2
    });
    
    // Front left wheel
    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFL.rotation.z = Math.PI / 2;
    wheelFL.position.set(1, 0.4, -1.2);
    car.add(wheelFL);
    
    const rimFL = new THREE.Mesh(rimGeometry, rimMaterial);
    rimFL.rotation.z = Math.PI / 2;
    rimFL.position.set(1, 0.4, -1.2);
    car.add(rimFL);
    
    // Front right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.rotation.z = Math.PI / 2;
    wheelFR.position.set(-1, 0.4, -1.2);
    car.add(wheelFR);
    
    const rimFR = new THREE.Mesh(rimGeometry, rimMaterial);
    rimFR.rotation.z = Math.PI / 2;
    rimFR.position.set(-1, 0.4, -1.2);
    car.add(rimFR);
    
    // Rear left wheel
    const wheelRL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRL.rotation.z = Math.PI / 2;
    wheelRL.position.set(1, 0.4, 1.2);
    car.add(wheelRL);
    
    const rimRL = new THREE.Mesh(rimGeometry, rimMaterial);
    rimRL.rotation.z = Math.PI / 2;
    rimRL.position.set(1, 0.4, 1.2);
    car.add(rimRL);
    
    // Rear right wheel
    const wheelRR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelRR.rotation.z = Math.PI / 2;
    wheelRR.position.set(-1, 0.4, 1.2);
    car.add(wheelRR);
    
    const rimRR = new THREE.Mesh(rimGeometry, rimMaterial);
    rimRR.rotation.z = Math.PI / 2;
    rimRR.position.set(-1, 0.4, 1.2);
    car.add(rimRR);
    
    // Add headlights
    const headlightGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.1);
    const headlightMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 1
    });
    
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(0.6, 0.5, -2);
    car.add(leftHeadlight);
    
    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(-0.6, 0.5, -2);
    car.add(rightHeadlight);
    
    // Add taillights
    const taillightGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.1);
    const taillightMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 1
    });
    
    const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    leftTaillight.position.set(0.6, 0.5, 2);
    car.add(leftTaillight);
    
    const rightTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    rightTaillight.position.set(-0.6, 0.5, 2);
    car.add(rightTaillight);
    
    // Add neon underglow for cyberpunk theme
    const glowGeometry = new THREE.BoxGeometry(1.9, 0.05, 3.9);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: specs.secondaryColor,
        transparent: true,
        opacity: 0.7
    });
    const underglow = new THREE.Mesh(glowGeometry, glowMaterial);
    underglow.position.y = 0.1;
    car.add(underglow);
    
    // Add car to scene
    scene.add(car);
    
    // Reset car position
    car.position.set(0, 0, 0);
    car.rotation.y = 0;
    
    // Reset speed
    speed = 0;
}

function updateCar(delta) {
    // Handle keyboard input
    const accelerateKey = keys['w'] || keys['arrowup'];
    const brakeKey = keys['s'] || keys['arrowdown'];
    const leftKey = keys['a'] || keys['arrowleft'];
    const rightKey = keys['d'] || keys['arrowright'];
    const nitroKey = keys[' ']; // Space bar for nitro
    
    // Determine acceleration input from keyboard or mobile controls
    let accelerationInput = 0;
    if (accelerateKey || (isMobileDevice && document.getElementById('accelerateBtn').classList.contains('active'))) {
        accelerationInput = 1;
    } else if (brakeKey || (isMobileDevice && document.getElementById('brakeBtn').classList.contains('active'))) {
        accelerationInput = -1;
    }
    
    // Apply acceleration
    if (accelerationInput > 0) {
        // Accelerate
        speed += acceleration * delta;
        if (speed > maxSpeed) {
            speed = maxSpeed;
        }
    } else if (accelerationInput < 0) {
        // Brake
        speed -= acceleration * 1.5 * delta; // Brake faster than accelerate
        if (speed < 0) {
            speed = 0;
        }
    } else {
        // Decelerate when no input
        speed -= acceleration * 0.5 * delta;
        if (speed < 0) {
            speed = 0;
        }
    }
    
    // Determine steering input from keyboard or mobile joystick
    let steeringInput = 0;
    if (leftKey) {
        steeringInput = -1;
    } else if (rightKey) {
        steeringInput = 1;
    } else if (isMobileDevice) {
        steeringInput = joystickInput;
    }
    
    // Apply steering
    const steeringAmount = steeringInput * steering * delta;
    car.rotation.y += steeringAmount;
    
    // Move car forward based on speed and rotation
    const moveDistance = speed * delta;
    car.position.x += Math.sin(car.rotation.y) * moveDistance;
    car.position.z += Math.cos(car.rotation.y) * moveDistance;
    
    // Check if car is off the track
    const isOffTrack = checkIfOffTrack();
    if (isOffTrack && activePowerUp !== 'shield') {
        // Slow down when off track
        speed *= 0.95;
    }
    
    // Apply nitro if active
    if (activePowerUp === 'nitro' || (nitroKey && activePowerUp === 'nitro')) {
        speed += acceleration * 2 * delta;
        if (speed > maxSpeed * 1.5) {
            speed = maxSpeed * 1.5;
        }
    }
}

function updateCamera() {
    // Position camera behind car
    const relativeCameraOffset = new THREE.Vector3(0, 5, -10);
    const cameraOffset = relativeCameraOffset.applyMatrix4(car.matrixWorld);
    
    // Smooth camera movement
    camera.position.lerp(cameraOffset, 0.1);
    camera.lookAt(car.position.clone().add(new THREE.Vector3(0, 1, 0)));
}

function checkIfOffTrack() {
    // Find the nearest track segment
    let nearestSegment = null;
    let minDistance = Infinity;
    
    for (let i = 0; i < track.length; i++) {
        const segment = track[i];
        const distance = car.position.distanceTo(segment.position);
        
        if (distance < minDistance) {
            minDistance = distance;
            nearestSegment = segment;
        }
    }
    
    // Check if car is off the track
    if (nearestSegment && minDistance > trackWidth / 2 + 1) {
        return true;
    }
    
    return false;
} 