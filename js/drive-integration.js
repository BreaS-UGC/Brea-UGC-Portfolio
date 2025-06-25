// Google Drive API Integration for UGC Portfolio
// This script handles video loading from Google Drive

class DriveVideoManager {
    constructor() {
        this.apiKey = ''; // To be set by user
        this.videos = new Map();
        this.initializeVideos();
    }

    // Initialize video mappings with actual Google Drive file IDs
    initializeVideos() {
        this.videos.set('loreal ugly ad.mov', {
            driveId: '1dooJhyM35knrZVJJCz3H8Sybi3CXJQYy',
            title: 'L\'Oreal Demo',
            fallback: 'videos/loreal ugly ad.mov'
        });
        
        this.videos.set('Calzen paid ad.mov', {
            driveId: '1Z9xZiYfJBnseTbvhsVe_Xlr3j_vbbX08', 
            title: 'Calzen Wellness Ad',
            fallback: 'videos/Calzen paid ad.mov'
        });
        
        this.videos.set('BODYROK paid ad.mov', {
            driveId: '1Iev7oOqFqFUxI0jKCyVs4QmQq_T0SbiP',
            title: 'BodyRok Experience Ad',
            fallback: 'videos/BODYROK paid ad.mov'
        });
        
        this.videos.set('JG 3.mp4', {
            driveId: '1sCWXMhtCH4Ws2-edVWhR5MY7K_NlXfSg',
            title: 'Justin Guitar Ad',
            fallback: 'videos/JG 3.mp4'
        });
        
        this.videos.set('Raw actives paid ad.mov', {
            driveId: '1CMxW7I0LqiJGVhb6Ii22S5FVwh_s39_x',
            title: 'Raw Actives Hair/Beauty Ad',
            fallback: 'videos/Raw actives paid ad.mov'
        });
        
        this.videos.set('Youzu foundations live_.mov', {
            driveId: '1F0fgH9a4ODlB9LdhldvdCWWuP1sVVNYT',
            title: 'Youzu Foundation Live',
            fallback: 'videos/Youzu foundations live_.mov'
        });
        
        // Organic videos
        this.videos.set('BODYROK_AZ organic.mov', {
            driveId: '1TJUBxXdQByCPgAzZiDZ6two8X_ZY-_Sn',
            title: 'BodyRok Organic',
            fallback: 'videos/BODYROK_AZ organic.mov'
        });
        
        this.videos.set('Calzen organic_.mov', {
            driveId: '1Hqab1RmvvydswDnl1mwf_5yC7gwN3iIH',
            title: 'Calzen Organic',
            fallback: 'videos/Calzen organic_.mov'
        });
        
        this.videos.set('Planta organic_.mov', {
            driveId: '1jWifeMUzaXmVqAAXB-2aIWmEkPB8IcZs',
            title: 'Planta Organic',
            fallback: 'videos/Planta organic_.mov'
        });
        
        this.videos.set('Temptations organic_.mov', {
            driveId: '1_mC-bXzJREHiPeGLuBqykFuyaT-I7BCc',
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
        return `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
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