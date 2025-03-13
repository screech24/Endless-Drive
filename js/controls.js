// Keyboard and mobile controls

// Set up mobile controls
function setupMobileControls() {
    // Check if device is mobile
    isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobileDevice) {
        // Set up joystick for steering
        const joystickOptions = {
            zone: document.getElementById('joystickZone'),
            mode: 'static',
            position: { left: '50%', top: '50%' },
            color: 'rgba(255, 0, 255, 0.5)',
            size: 120,
            lockX: false,
            lockY: true
        };
        
        const joystick = nipplejs.create(joystickOptions);
        
        // Handle joystick movement
        joystick.on('move', (event, data) => {
            // Get joystick X position (-1 to 1)
            const maxDistance = joystickOptions.size / 2;
            joystickInput = data.vector.x;
        });
        
        // Reset joystick input when released
        joystick.on('end', () => {
            joystickInput = 0;
        });
        
        // Set up accelerate and brake buttons
        const accelerateBtn = document.getElementById('accelerateBtn');
        const brakeBtn = document.getElementById('brakeBtn');
        
        // Accelerate button
        accelerateBtn.addEventListener('touchstart', () => {
            accelerateBtn.classList.add('active');
        });
        
        accelerateBtn.addEventListener('touchend', () => {
            accelerateBtn.classList.remove('active');
        });
        
        // Brake button
        brakeBtn.addEventListener('touchstart', () => {
            brakeBtn.classList.add('active');
        });
        
        brakeBtn.addEventListener('touchend', () => {
            brakeBtn.classList.remove('active');
        });
        
        // Prevent default touch behavior to avoid scrolling
        document.addEventListener('touchmove', (e) => {
            if (gameActive) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
} 