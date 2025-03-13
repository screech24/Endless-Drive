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
    frontLeftWheel = wheelFL; // Store reference to front wheels for steering
    
    const rimFL = new THREE.Mesh(rimGeometry, rimMaterial);
    rimFL.rotation.z = Math.PI / 2;
    rimFL.position.set(1, 0.4, -1.2);
    car.add(rimFL);
    frontLeftRim = rimFL; // Store reference to front wheel rims for steering
    
    // Front right wheel
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheelFR.rotation.z = Math.PI / 2;
    wheelFR.position.set(-1, 0.4, -1.2);
    car.add(wheelFR);
    frontRightWheel = wheelFR; // Store reference to front wheels for steering
    
    const rimFR = new THREE.Mesh(rimGeometry, rimMaterial);
    rimFR.rotation.z = Math.PI / 2;
    rimFR.position.set(-1, 0.4, -1.2);
    car.add(rimFR);
    frontRightRim = rimFR; // Store reference to front wheel rims for steering
    
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
    
    // Add exhaust tips for sports car look
    const exhaustGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.3, 8);
    const exhaustMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xcccccc,
        emissive: 0x333333,
        emissiveIntensity: 0.2,
        specular: 0xffffff,
        shininess: 100
    });
    
    const leftExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    leftExhaust.rotation.x = Math.PI / 2;
    leftExhaust.position.set(0.5, 0.3, 2.1);
    car.add(leftExhaust);
    
    const rightExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    rightExhaust.rotation.x = Math.PI / 2;
    rightExhaust.position.set(-0.5, 0.3, 2.1);
    car.add(rightExhaust);
    
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
    
    // Rotate car 180 degrees to face the correct direction
    car.rotation.y = Math.PI;
    
    // Reset car position
    car.position.set(0, 0, 0);
    
    // Reset speed
    speed = 0;
    
    // Reset wheel steering angle
    wheelAngle = 0;
}

// Variables for realistic steering
let wheelAngle = 0;
let frontLeftWheel, frontRightWheel, frontLeftRim, frontRightRim;
const maxWheelAngle = Math.PI / 4; // 45 degrees max wheel turn
const wheelTurnSpeed = 2.5; // How fast wheels turn
const wheelReturnSpeed = 3.0; // How fast wheels return to center

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
    
    // Apply acceleration with smoother speed transitions
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
        // Decelerate when no input - more gradual deceleration
        speed -= acceleration * 0.3 * delta;
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
    
    // Update wheel angle based on steering input
    if (steeringInput !== 0) {
        // Turn wheels toward input direction
        const targetAngle = steeringInput * maxWheelAngle;
        wheelAngle += (targetAngle - wheelAngle) * wheelTurnSpeed * delta;
        
        // Clamp wheel angle to max
        wheelAngle = Math.max(-maxWheelAngle, Math.min(maxWheelAngle, wheelAngle));
    } else {
        // Return wheels to center when no input
        wheelAngle *= 1 - (wheelReturnSpeed * delta);
        if (Math.abs(wheelAngle) < 0.01) wheelAngle = 0;
    }
    
    // Apply wheel rotation visually
    if (frontLeftWheel && frontRightWheel) {
        frontLeftWheel.rotation.y = wheelAngle;
        frontRightWheel.rotation.y = wheelAngle;
        frontLeftRim.rotation.y = wheelAngle;
        frontRightRim.rotation.y = wheelAngle;
    }
    
    // Calculate turning radius based on wheel angle and speed
    // Only turn if we're moving and wheels are turned
    if (Math.abs(speed) > 0.1 && Math.abs(wheelAngle) > 0.01) {
        // Calculate turning amount based on speed, wheel angle and delta time
        // The faster we go, the more effect the wheel angle has
        const turnAmount = (wheelAngle * steering * delta) * (speed / maxSpeed);
        car.rotation.y += turnAmount;
    }
    
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
    // Get car position and rotation
    const carPosition = car.position.clone();
    const carRotation = car.rotation.y;
    
    // Calculate camera position based on car's rotation
    const distance = 10; // Distance behind the car
    const height = 5;    // Height above the car
    
    // Calculate position behind the car based on its rotation
    const offsetX = Math.sin(carRotation) * distance;
    const offsetZ = Math.cos(carRotation) * distance;
    
    // Calculate target camera position
    const targetPosition = new THREE.Vector3(
        carPosition.x + offsetX,
        carPosition.y + height,
        carPosition.z + offsetZ
    );
    
    // Smooth camera movement
    camera.position.lerp(targetPosition, 0.1);
    
    // Look at a point slightly above the car
    camera.lookAt(carPosition.x, carPosition.y + 1, carPosition.z);
    
    // Add orbit camera functionality (toggle with 'O' key)
    if (keys['o'] && !isMobileDevice) {
        // Create orbit controls if they don't exist
        if (!window.orbitControls) {
            window.orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
            window.orbitControls.enableDamping = true;
            window.orbitControls.dampingFactor = 0.25;
            window.orbitControls.screenSpacePanning = false;
            window.orbitControls.maxPolarAngle = Math.PI / 2;
            console.log("Orbit camera enabled - development mode");
        } else {
            // Toggle orbit controls
            window.orbitControls.enabled = !window.orbitControls.enabled;
            console.log("Orbit camera " + (window.orbitControls.enabled ? "enabled" : "disabled"));
        }
        // Prevent multiple toggles from one keypress
        keys['o'] = false;
    }
    
    // Update orbit controls if they exist and are enabled
    if (window.orbitControls && window.orbitControls.enabled) {
        window.orbitControls.update();
    }
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