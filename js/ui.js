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
    // Hide menu
    document.getElementById('menu').style.display = 'none';
    
    // Show UI
    document.getElementById('ui').style.display = 'block';
    
    // Reset score
    score = 0;
    document.getElementById('score').textContent = 'Distance: 0m';
    
    // Set game active
    gameActive = true;
    
    // Force camera to position correctly behind the car without lerping
    const relativeCameraOffset = new THREE.Vector3(0, 5, -10);
    const cameraOffset = relativeCameraOffset.applyMatrix4(car.matrixWorld);
    camera.position.copy(cameraOffset); // Immediately set position without lerping
    camera.lookAt(car.position.clone().add(new THREE.Vector3(0, 1, 0)));
    
    // Show mobile controls if on mobile
    if (isMobileDevice) {
        document.getElementById('mobileControls').style.display = 'block';
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
    // Hide game over screen
    document.getElementById('gameOver').style.display = 'none';
    
    // Reset game
    resetGame();
    
    // Start game
    startGame();
}

// Reset game
function resetGame() {
    // Reset car position
    car.position.set(0, 0, 0);
    car.rotation.y = Math.PI;
    
    // Reset speed
    speed = 0;
    
    // Reset power-ups
    if (activePowerUp) {
        deactivatePowerUp();
    }
    
    // Regenerate track
    generateInitialTrack();
    
    // Force camera to position correctly behind the car without lerping
    const relativeCameraOffset = new THREE.Vector3(0, 5, -10);
    const cameraOffset = relativeCameraOffset.applyMatrix4(car.matrixWorld);
    camera.position.copy(cameraOffset); // Immediately set position without lerping
    camera.lookAt(car.position.clone().add(new THREE.Vector3(0, 1, 0)));
}

// Show main menu
function showMainMenu() {
    // Hide game over screen
    document.getElementById('gameOver').style.display = 'none';
    
    // Show menu
    document.getElementById('menu').style.display = 'block';
    
    // Reset game
    resetGame();
}

// Show tutorial
function showTutorial() {
    // Hide menu
    document.getElementById('menu').style.display = 'none';
    
    // Show tutorial
    document.getElementById('tutorialPage').style.display = 'block';
}

// Hide tutorial
function hideTutorial() {
    // Hide tutorial
    document.getElementById('tutorialPage').style.display = 'none';
    
    // Show menu
    document.getElementById('menu').style.display = 'block';
}

// Show credits
function showCredits() {
    // Hide menu
    document.getElementById('menu').style.display = 'none';
    
    // Show credits
    document.getElementById('creditsPage').style.display = 'block';
}

// Hide credits
function hideCredits() {
    // Hide credits
    document.getElementById('creditsPage').style.display = 'none';
    
    // Show menu
    document.getElementById('menu').style.display = 'block';
}

// Show leaderboard
function showLeaderboard() {
    // Hide menu
    document.getElementById('menu').style.display = 'none';
    
    // Update personal high score
    document.getElementById('personalHighScore').textContent = `${Math.floor(highScore)}m`;
    
    // Show leaderboard
    document.getElementById('leaderboardPage').style.display = 'block';
}

// Hide leaderboard
function hideLeaderboard() {
    // Hide leaderboard
    document.getElementById('leaderboardPage').style.display = 'none';
    
    // Show menu
    document.getElementById('menu').style.display = 'block';
}

// Share score
function shareScore() {
    // Create share text
    const shareText = `I drove ${Math.floor(score)}m in Endless Drive! Can you beat my score?`;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Endless Drive',
            text: shareText,
            url: window.location.href
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback to copying to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Score copied to clipboard!');
    }
} 