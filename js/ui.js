// UI-related functionality

// Initialize UI event listeners
function initUI() {
    // Start game button
    document.getElementById('startGame').addEventListener('click', startGame);
    
    // Tutorial button
    document.getElementById('tutorialBtn').addEventListener('click', showTutorial);
    document.getElementById('tutorialBackBtn').addEventListener('click', hideTutorial);
    
    // Credits button
    document.getElementById('creditsBtn').addEventListener('click', showCredits);
    document.getElementById('creditsBackBtn').addEventListener('click', hideCredits);
    
    // Leaderboard button
    document.getElementById('leaderboardBtn').addEventListener('click', showLeaderboard);
    document.getElementById('leaderboardBackBtn').addEventListener('click', hideLeaderboard);
    
    // Game over buttons
    document.getElementById('playAgain').addEventListener('click', restartGame);
    document.getElementById('mainMenu').addEventListener('click', showMainMenu);
    document.getElementById('shareScore').addEventListener('click', shareScore);
}

// Start game
function startGame() {
    try {
        console.log("Starting game...");
        
        // Hide menu
        document.getElementById('menu').style.display = 'none';
        
        // Show UI
        document.getElementById('ui').style.display = 'block';
        
        // Reset score
        score = 0;
        document.getElementById('score').textContent = 'Distance: 0m';
        
        // Make sure scene is initialized
        if (!scene) {
            console.log("Scene not found, initializing game");
            init();
        }
        
        // Check if car exists, if not, create it
        if (!car) {
            console.log("Car not found, creating new car");
            createCar();
        }
        
        // Check if track exists, if not, generate it
        if (!track || track.length === 0) {
            console.log("Track not found, generating new track");
            generateInitialTrack();
        }
        
        // Set game active
        console.log("Setting game active");
        gameActive = true;
        
        // Force camera to position correctly behind the car without using matrix transformation
        // Since car is rotated 180 degrees (Math.PI), we need to position camera at negative Z
        // This ensures camera is always behind the car regardless of car's matrix
        console.log("Positioning camera behind car");
        if (car && camera) {
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
        } else {
            console.error("Car or camera not initialized properly");
            return;
        }
        
        // Show mobile controls if on mobile
        if (isMobileDevice) {
            document.getElementById('mobileControls').style.display = 'block';
        }
        
        // Update UI visibility
        updateUIVisibility();
        
        console.log("Game started successfully");
    } catch (error) {
        console.error("Error starting game:", error);
        // Show error message to user
        alert("There was an error starting the game. Please refresh the page and try again.");
        // Reset to menu
        showMainMenu();
    }
}

// Game over
function gameOver() {
    // Set game inactive
    gameActive = false;
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    
    // Update game over screen
    document.getElementById('finalScore').textContent = `Distance: ${Math.floor(score)}m`;
    document.getElementById('highScore').textContent = `High Score: ${Math.floor(highScore)}m`;
    
    // Show game over screen
    document.getElementById('gameOver').style.display = 'block';
    
    // Hide mobile controls
    document.getElementById('mobileControls').style.display = 'none';
}

// Restart game
function restartGame() {
    try {
        // Hide game over screen
        document.getElementById('gameOver').style.display = 'none';
        
        // Reset game
        resetGame();
        
        // Start game
        startGame();
    } catch (error) {
        console.error("Error restarting game:", error);
        // Show error message to user
        alert("There was an error restarting the game. Please refresh the page and try again.");
        // Reset to menu
        showMainMenu();
    }
}

// Reset game
function resetGame() {
    try {
        // Reset car position
        if (car) {
            car.position.set(0, 0, 0);
            car.rotation.y = Math.PI;
        } else {
            createCar();
        }
        
        // Reset speed and target speed
        speed = 0;
        if (typeof targetSpeed !== 'undefined') {
            targetSpeed = 0; // Reset target speed as well
        }
        
        // Reset power-ups
        if (activePowerUp) {
            deactivatePowerUp();
        }
        
        // Regenerate track
        generateInitialTrack();
        
        // Force camera to position correctly behind the car without using matrix transformation
        // Since car is rotated 180 degrees (Math.PI), we need to position camera at negative Z
        // This ensures camera is always behind the car regardless of car's matrix
        if (car && camera) {
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
        }
    } catch (error) {
        console.error("Error resetting game:", error);
        throw error; // Rethrow to be caught by caller
    }
}

// Show main menu
function showMainMenu() {
    // Hide game over screen
    document.getElementById('gameOver').style.display = 'none';
    
    // Hide UI
    document.getElementById('ui').style.display = 'none';
    
    // Hide mobile controls
    document.getElementById('mobileControls').style.display = 'none';
    
    // Show menu
    document.getElementById('menu').style.display = 'block';
    
    // Reset game
    try {
        resetGame();
    } catch (error) {
        console.error("Error resetting game in showMainMenu:", error);
    }
    
    // Set game inactive
    gameActive = false;
    
    // Update UI visibility
    updateUIVisibility();
}

// Show tutorial
function showTutorial() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('tutorialPage').style.display = 'block';
}

// Hide tutorial
function hideTutorial() {
    document.getElementById('tutorialPage').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

// Show credits
function showCredits() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('creditsPage').style.display = 'block';
}

// Hide credits
function hideCredits() {
    document.getElementById('creditsPage').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

// Show leaderboard
function showLeaderboard() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('leaderboardPage').style.display = 'block';
    
    // Update high score display
    document.getElementById('personalHighScore').textContent = `${highScore}m`;
}

// Hide leaderboard
function hideLeaderboard() {
    document.getElementById('leaderboardPage').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
}

// Share score
function shareScore() {
    const text = `I drove ${Math.floor(score)}m in Endless Drive! Can you beat my score?`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Endless Drive Score',
            text: text,
            url: window.location.href
        })
        .catch(error => console.error('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        prompt('Copy this text to share your score:', text);
    }
} 