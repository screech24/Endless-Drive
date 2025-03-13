// Power-up functionality

function updatePowerUps(delta) {
    // Update power-up animations
    for (let i = 0; i < powerUps.length; i++) {
        const powerUp = powerUps[i];
        
        // Rotate power-up
        powerUp.rotation.y += delta * 2;
        
        // Bobbing animation
        powerUp.position.y = powerUp.userData.initialY + Math.sin(clock.elapsedTime * 2 + powerUp.userData.animationOffset) * 0.2;
    }
    
    // Update active power-up timer
    if (activePowerUp) {
        powerUpTimer -= delta;
        
        // Update power-up UI
        let powerUpText = '';
        let timeLeft = Math.ceil(powerUpTimer);
        
        switch (activePowerUp) {
            case 'speed':
                powerUpText = `Speed Boost: ${timeLeft}s`;
                break;
            case 'shield':
                powerUpText = `Shield: ${timeLeft}s`;
                break;
            case 'nitro':
                powerUpText = `Nitro: ${timeLeft}s`;
                break;
        }
        
        document.getElementById('powerup').textContent = powerUpText;
        
        // Check if power-up has expired
        if (powerUpTimer <= 0) {
            deactivatePowerUp();
        }
    }
}

function collectPowerUp(powerUp) {
    // Get power-up type
    const type = powerUp.userData.type;
    
    // Deactivate current power-up if one is active
    if (activePowerUp) {
        deactivatePowerUp();
    }
    
    // Activate new power-up
    activatePowerUp(type);
}

function activatePowerUp(type) {
    // Set active power-up
    activePowerUp = type;
    
    // Set power-up timer based on type
    switch (type) {
        case 'speed':
            powerUpTimer = 5; // 5 seconds for speed boost
            break;
        case 'shield':
            powerUpTimer = 10; // 10 seconds for shield
            
            // Add shield visual effect
            addShieldEffect();
            break;
        case 'nitro':
            powerUpTimer = 2; // 2 seconds for nitro
            
            // Add nitro visual effect
            addNitroEffect();
            break;
    }
    
    // Update power-up UI
    let powerUpText = '';
    switch (type) {
        case 'speed':
            powerUpText = `Speed Boost: ${Math.ceil(powerUpTimer)}s`;
            break;
        case 'shield':
            powerUpText = `Shield: ${Math.ceil(powerUpTimer)}s`;
            break;
        case 'nitro':
            powerUpText = `Nitro: ${Math.ceil(powerUpTimer)}s`;
            break;
    }
    
    document.getElementById('powerup').textContent = powerUpText;
}

function deactivatePowerUp() {
    // Remove power-up effects
    switch (activePowerUp) {
        case 'shield':
            removeShieldEffect();
            break;
        case 'nitro':
            removeNitroEffect();
            break;
    }
    
    // Clear active power-up
    activePowerUp = null;
    powerUpTimer = 0;
    
    // Update power-up UI
    document.getElementById('powerup').textContent = '';
}

// Shield effect
let shieldMesh;
function addShieldEffect() {
    // Create shield mesh
    const shieldGeometry = new THREE.SphereGeometry(2.5, 16, 16);
    const shieldMaterial = new THREE.MeshBasicMaterial({
        color: 0x0088ff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    
    shieldMesh = new THREE.Mesh(shieldGeometry, shieldMaterial);
    car.add(shieldMesh);
}

function removeShieldEffect() {
    // Remove shield mesh
    if (shieldMesh) {
        car.remove(shieldMesh);
        shieldMesh.geometry.dispose();
        shieldMesh.material.dispose();
        shieldMesh = null;
    }
}

// Nitro effect
let nitroParticles = [];
function addNitroEffect() {
    // Create nitro particle effect
    for (let i = 0; i < 2; i++) {
        const particleGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0xffcc00,
            transparent: true,
            opacity: 0.8
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Position particle at the back of the car
        const xPos = i === 0 ? 0.5 : -0.5;
        particle.position.set(xPos, 0.3, 1.8);
        
        car.add(particle);
        nitroParticles.push(particle);
        
        // Add animation data
        particle.userData = {
            initialY: particle.position.y,
            initialZ: particle.position.z,
            speed: 0.1 + Math.random() * 0.2,
            size: 0.1 + Math.random() * 0.1
        };
    }
    
    // Start nitro animation
    animateNitro();
}

function animateNitro() {
    // Only animate if nitro is active
    if (activePowerUp !== 'nitro') return;
    
    for (let i = 0; i < nitroParticles.length; i++) {
        const particle = nitroParticles[i];
        
        // Move particle backward
        particle.position.z += 0.1;
        
        // Fade out particle
        particle.material.opacity -= 0.05;
        
        // Reset particle when it's too far or too faded
        if (particle.position.z > particle.userData.initialZ + 1 || particle.material.opacity <= 0) {
            particle.position.z = particle.userData.initialZ;
            particle.material.opacity = 0.8;
            
            // Randomize size
            const newSize = 0.1 + Math.random() * 0.1;
            particle.scale.set(newSize, newSize, newSize);
        }
    }
    
    // Continue animation
    requestAnimationFrame(animateNitro);
}

function removeNitroEffect() {
    // Remove nitro particles
    for (let i = 0; i < nitroParticles.length; i++) {
        const particle = nitroParticles[i];
        car.remove(particle);
        particle.geometry.dispose();
        particle.material.dispose();
    }
    
    nitroParticles = [];
} 