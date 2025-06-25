// Google Drive API Integration for UGC Portfolio
// This script handles video loading from Google Drive

class DriveVideoManager {
    constructor() {
        this.apiKey = ''; // To be set by user
        this.videos = new Map();
        this.initializeVideos();
    }

    // Initialize video mappings - replace these with actual Google Drive file IDs
    initializeVideos() {
        this.videos.set('loreal ugly ad.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_1',
            title: 'L\'Oreal Demo',
            fallback: 'videos/loreal ugly ad.mov'
        });
        
        this.videos.set('Calzen paid ad.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_2', 
            title: 'Calzen Wellness Ad',
            fallback: 'videos/Calzen paid ad.mov'
        });
        
        this.videos.set('BODYROK paid ad.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_3',
            title: 'BodyRok Experience Ad',
            fallback: 'videos/BODYROK paid ad.mov'
        });
        
        this.videos.set('JG 3.mp4', {
            driveId: 'YOUR_DRIVE_FILE_ID_4',
            title: 'Justin Guitar Ad',
            fallback: 'videos/JG 3.mp4'
        });
        
        this.videos.set('Raw actives paid ad.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_5',
            title: 'Raw Actives Hair/Beauty Ad',
            fallback: 'videos/Raw actives paid ad.mov'
        });
        
        // Organic videos
        this.videos.set('BODYROK_AZ organic.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_6',
            title: 'BodyRok Organic',
            fallback: 'videos/BODYROK_AZ organic.mov'
        });
        
        this.videos.set('Calzen organic_.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_7',
            title: 'Calzen Organic',
            fallback: 'videos/Calzen organic_.mov'
        });
        
        this.videos.set('Planta organic_.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_8',
            title: 'Planta Organic',
            fallback: 'videos/Planta organic_.mov'
        });
        
        this.videos.set('Temptations organic_.mov', {
            driveId: 'YOUR_DRIVE_FILE_ID_9',
            title: 'Temptations Organic',
            fallback: 'videos/Temptations organic_.mov'
        });
    }

    // Generate Google Drive streaming URL
    getDriveVideoUrl(fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    
    // Get direct download URL (for video element src)
    getDriveDirectUrl(fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    
    // Initialize video elements with Google Drive sources
    initializeVideoElements() {
        const videoElements = document.querySelectorAll('video source');
        
        videoElements.forEach(source => {
            const currentSrc = source.getAttribute('src');
            const filename = currentSrc.split('/').pop();
            
            if (this.videos.has(filename)) {
                const videoInfo = this.videos.get(filename);
                const driveUrl = this.getDriveDirectUrl(videoInfo.driveId);
                
                // Update source with Google Drive URL
                source.setAttribute('src', driveUrl);
                source.setAttribute('data-fallback', videoInfo.fallback);
                
                // Add error handling for fallback
                const video = source.parentElement;
                video.addEventListener('error', () => this.handleVideoError(source));
                video.addEventListener('loadstart', () => this.showLoadingState(video));
                video.addEventListener('canplay', () => this.hideLoadingState(video));
            }
        });
    }
    
    // Handle video loading errors with fallback
    handleVideoError(source) {
        const fallbackSrc = source.getAttribute('data-fallback');
        if (fallbackSrc && source.getAttribute('src') !== fallbackSrc) {
            console.log('Google Drive video failed, using local fallback');
            source.setAttribute('src', fallbackSrc);
        }
    }
    
    // Show loading state
    showLoadingState(video) {
        const container = video.closest('.video-container, .mini-video-container');
        if (container) {
            const loader = document.createElement('div');
            loader.className = 'video-loader';
            loader.innerHTML = '<div class="loader-spinner"></div><p>Loading video...</p>';
            container.appendChild(loader);
        }
    }
    
    // Hide loading state
    hideLoadingState(video) {
        const container = video.closest('.video-container, .mini-video-container');
        if (container) {
            const loader = container.querySelector('.video-loader');
            if (loader) {
                loader.remove();
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const driveManager = new DriveVideoManager();
    driveManager.initializeVideoElements();
});