# Google Drive API Setup Instructions

This portfolio uses Google Drive to host large video files. Follow these steps to set up the integration:

## 1. Upload Videos to Google Drive

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder called "UGC Portfolio Videos"
3. Upload all video files from the `videos/` directory:
   - `loreal ugly ad.mov`
   - `Calzen paid ad.mov`
   - `BODYROK paid ad.mov`
   - `JG 3.mp4`
   - `Raw actives paid ad.mov`
   - `BODYROK_AZ organic.mov`
   - `Calzen organic_.mov`
   - `Planta organic_.mov`
   - `Temptations organic_.mov`

## 2. Get File IDs for Each Video

For each uploaded video:
1. Right-click the file in Google Drive
2. Select "Get link"
3. Copy the file ID from the URL (the long string between `/d/` and `/view`)
   
   Example: `https://drive.google.com/file/d/1ABC123DEF456GHI789JKL/view?usp=sharing`
   File ID is: `1ABC123DEF456GHI789JKL`

## 3. Update the Integration Script

1. Open `js/drive-integration.js`
2. Replace each `YOUR_DRIVE_FILE_ID_X` with the actual file ID for that video
3. Match the filenames with their corresponding IDs:
   - `loreal ugly ad.mov` → Replace `YOUR_DRIVE_FILE_ID_1`
   - `Calzen paid ad.mov` → Replace `YOUR_DRIVE_FILE_ID_2`
   - `BODYROK paid ad.mov` → Replace `YOUR_DRIVE_FILE_ID_3`
   - `JG 3.mp4` → Replace `YOUR_DRIVE_FILE_ID_4`
   - `Raw actives paid ad.mov` → Replace `YOUR_DRIVE_FILE_ID_5`
   - `BODYROK_AZ organic.mov` → Replace `YOUR_DRIVE_FILE_ID_6`
   - `Calzen organic_.mov` → Replace `YOUR_DRIVE_FILE_ID_7`
   - `Planta organic_.mov` → Replace `YOUR_DRIVE_FILE_ID_8`
   - `Temptations organic_.mov` → Replace `YOUR_DRIVE_FILE_ID_9`

## 4. Set Sharing Permissions

For each video file in Google Drive:
1. Right-click the file
2. Select "Share"
3. Click "Change to anyone with the link"
4. Set permission to "Viewer"
5. Click "Done"

## 5. Test the Integration

1. Open your portfolio website
2. Check that videos load from Google Drive
3. If a video fails to load, it will automatically fallback to the local file

## 6. Optional: Remove Local Video Files

Once Google Drive integration is working:
1. You can safely delete the large video files from the `videos/` directory
2. Keep only smaller files or create a backup folder
3. This will significantly reduce your repository size for GitHub

## Troubleshooting

- **Videos not loading**: Check that sharing permissions are set to "Anyone with the link"
- **Slow loading**: Google Drive has bandwidth limits; consider using a CDN for high-traffic sites
- **CORS errors**: This setup uses direct download links which should work in most browsers

## File Size Savings

Current video files total: ~300MB
After moving to Google Drive: ~5MB (just HTML, CSS, JS, and images)

This makes your GitHub repository much lighter and faster to clone!