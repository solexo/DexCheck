document.getElementById('checkButton').addEventListener('click', async () => {
    const chainId = "solana"; // Set your chainId
    const tokenAddress = document.getElementById('tokenAddress').value;
    const url = `https://api.dexscreener.com/orders/v1/${chainId}/${tokenAddress}`;
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block'; // Show loading spinner
    document.getElementById('status').textContent = ''; // Clear previous status

    try {
        const response = await fetch(url);
        spinner.style.display = 'none'; // Hide loading spinner
        
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                const status = data[0]?.status;

                if (status === "approved") {
                    // Create explosion emojis for payment success
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            createExplosionEmoji('🎉');
                        }, i * 100); // Delay each emoji for a smooth effect
                    }

                    document.getElementById('status').textContent = "🎉 Dex Paid! 🎉";
                    document.getElementById('status').className = "status paid";
                } else {
                    // Create explosion emojis for payment failure
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            createExplosionEmoji('😡');
                        }, i * 100); // Delay each emoji for a smooth effect
                    }

                    document.getElementById('status').innerHTML = "😡 Dex not Paid";
                    document.getElementById('status').className = "status not-paid";
                }
            } else {
                document.getElementById('status').textContent = "😡 Dex not Paid";
            }
        } else {
            // Handle different response statuses
            if (response.status === 404) {
                document.getElementById('status').textContent = "Error: Token not found.";
            } else if (response.status === 400) {
                document.getElementById('status').textContent = "Error: Bad request.";
            } else {
                document.getElementById('status').textContent = `Error: ${response.status}`;
            }
        }
    } catch (error) {
        spinner.style.display = 'none'; // Hide loading spinner
        document.getElementById('status').textContent = `Error: ${error.message}`;
    }
});

function createExplosionEmoji(emoji) {
    const explosionEmoji = document.createElement('div');
    explosionEmoji.className = 'emoji'; // Add a class for styling
    explosionEmoji.textContent = emoji;
    document.body.appendChild(explosionEmoji);
    
    // Random position for the emoji
    explosionEmoji.style.left = Math.random() * window.innerWidth + 'px';
    explosionEmoji.style.top = Math.random() * window.innerHeight + 'px';
    
    // Add an animation end listener to remove the emoji after the animation
    explosionEmoji.addEventListener('animationend', () => {
        explosionEmoji.remove();
    });
}
