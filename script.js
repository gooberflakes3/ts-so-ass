        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext('2d');

alert("HI YES IM WORKING I EXIST")

        // Set canvas size to fit the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

		let smile = new Image();
		smile.src = "smile.jpg"
		let colon3 = new Image();
		colon3.src = "colon3.jpg"
		let caret = new Image();
		caret.src = "caret.jpg"
		let shaky = new Image();
		shaky.src = "shaky.jpg"
		let smiletalking = new Image();
		smiletalking.src = "smiletalking.jpg"
		let shakytalking = new Image();
		shakytalking.src = "shakytalking.jpg"


        let lastTimestamp = null;
        let speed = 0; // Speed in m/s

        function drawOrientation(alpha, beta, gamma) {
            // Clear the canvas before drawing the new values
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw emoji based on beta and gamma values
            ctx.fillStyle = "#000"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = "#030"
            ctx.lineWidth = 2
            /* for (let i = 0; i < 100; i++) {
                ctx.beginPath();
    
                // Set start and end points
                const y = (canvas.height / 100) * i;
                ctx.moveTo(0, y);
                
                // Calculate curvature based on distance from center
                const centerY = canvas.height / 2;
                const curveIntensity = (y - centerY) / centerY; // -1 to 1, more extreme further from center
                const controlY = y + 250 * curveIntensity; // Adjust curvature multiplier (100) as desired
                
                // Draw an arc with a control point to add curvature
                ctx.quadraticCurveTo(canvas.width / 2, controlY, canvas.width, y);
                ctx.strokeStyle = "#040";
                ctx.stroke();2
            } */
            ctx.fillStyle = "#0f0"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = "150px Arial";
            if (speed <= 0.2) {
                if (beta >= -23.5 && beta <= 23.5) {
                    //if (gamma >= 65) {
                    	ctx.drawImage(smile, 0, 0, canvas.width, canvas.height) //ctx.fillText(":)", canvas.width / 2, canvas.height / 2);
                    /*} else {
                        ctx.fillText(":(", canvas.width / 2, canvas.height / 2);
                    }*/
                } else if (beta >= 23.5) {
                    ctx.drawImage(colon3, 0, 0, canvas.width, canvas.height) //ctx.fillText(":3", canvas.width / 2, canvas.height / 2);
                } else {
                    ctx.drawImage(caret, 0, 0, canvas.width, canvas.height) //ctx.fillText("^_^", canvas.width / 2, canvas.height / 2);
                }
            } else {
                ctx.drawImage(shaky, 0, 0, canvas.width, canvas.height) //ctx.fillText("O_o", canvas.width / 2 + (Math.random() * 20), canvas.height / 2 + (Math.random() * 20));
            }
                        // Draw the orientation values on the canvas
                        ctx.fillStyle = "#fff"; // Set text color to black
                        ctx.font = "20px Arial"; // Set font size and type
                        ctx.fillText(`Alpha (Z axis): ${alpha.toFixed(2)}`, 550, 25);
                        ctx.fillText(`Beta (X axis): ${beta.toFixed(2)}`, 550, 50);
                        ctx.fillText(`Gamma (Y axis): ${gamma.toFixed(2)}`, 550, 75);
                        ctx.fillText(`Speed: ${speed.toFixed(2)} m/s`, 550, 100);
        }

        function startOrientationListener() {
            if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", function(event) {
                    const alpha = event.alpha || 0;  // Rotation around the z-axis (0 to 360 degrees)
                    const beta = event.beta || 0;    // Tilt front-to-back (range: -180 to 180 degrees)
                    const gamma = event.gamma || 0;  // Tilt left-to-right (range: -90 to 90 degrees)

                    // Call the function to draw updated orientation values
                    drawOrientation(alpha, beta, gamma);
                });
            } else {
                alert("Device Orientation is not supported on this device or browser.");
            }
        }

        function handleMotion(event) {
            const acceleration = event.acceleration; // Acceleration in m/s²
            if (acceleration) {
                // Calculate the magnitude of the acceleration vector
                const accelMagnitude = Math.sqrt(
                    acceleration.x ** 2 +
                    acceleration.y ** 2 +
                    acceleration.z ** 2
                );

                // Update speed based on acceleration
                const currentTimestamp = event.timeStamp;
                if (lastTimestamp) {
                    const deltaTime = (currentTimestamp - lastTimestamp) / 1000; // Convert to seconds
                    speed += accelMagnitude * deltaTime; // Speed calculation
                }
                lastTimestamp = currentTimestamp;
            }
            // Apply decay to speed
            speed -= 0.1 * speed; // Reduces speed gradually
            if (speed < 0) speed = 0; // Prevent negative speed
        }

        // Start listening for device orientation and motion
        startOrientationListener();
        
        // Request permission and set up device motion listener
        if (window.DeviceMotionEvent) {
            window.addEventListener("devicemotion", handleMotion);
        } else {
            alert("Device Motion is not supported on this device or browser.");
        }
