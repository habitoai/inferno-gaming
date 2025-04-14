import { Application } from '@splinetool/runtime';

// Initialize the Spline scene
function initSplineScene() {
    console.log("Initializing Spline Scene with Runtime");
    
    try {
        // Get the container element
        const container = document.getElementById('spline-container');
        if (!container) {
            console.error("Could not find spline-container element");
            return;
        }
        
        console.log("Found spline-container, initializing 3D scene");
        
        // Set container styling
        container.style.position = 'absolute';
        container.style.zIndex = '1';
        
        // Create a canvas element for Spline
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas3d';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.innerHTML = '';
        container.appendChild(canvas);
        
        // Initialize Spline application with proper settings
        const app = new Application(canvas, {
            autoRender: true, // Enable automatic rendering
            autostart: true,  // Start the app automatically
            background: '#0a0a0a', // Set background color to match site theme
            perspective: 1000, // Set perspective for better depth
            antialias: true, // Enable antialiasing for smoother edges
            preserveDrawingBuffer: true, // Important for screenshot capabilities
            alpha: true // Allow transparent background
        });
        
        // Set canvas styling
        canvas.style.opacity = '1';
        canvas.style.visibility = 'visible';
        
        // Load the Spline scene
        console.log("Loading Spline model from URL");
        app.load('https://prod.spline.design/emqf2cwTF2WoDqCZ/scene.splinecode')
            .then(() => {
                console.log("Spline model loaded successfully");
                // Add loaded class to container
                container.classList.add('scene-loaded');
                
                // Disable camera controls for better performance
                if (app.enablePan) {
                    app.enablePan(false);
                }
                if (app.enableZoom) {
                    app.enableZoom(false);
                }
                
                // Apply post-load styling
                canvas.style.opacity = '1';
            })
            .catch(error => {
                console.error("Error loading Spline model:", error);
                // Still mark as loaded to prevent loading spinner
                container.classList.add('scene-loaded');
            });
        
        // Store app globally to prevent garbage collection
        window.splineApp = app;
    } catch (error) {
        console.error("Error initializing Spline scene:", error);
        const container = document.getElementById('spline-container');
        if (container) {
            container.classList.add('scene-loaded');
        }
    }
}

// Export the initialization function
export default initSplineScene;