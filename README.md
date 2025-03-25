# Resume Builder Chrome Extension

A Chrome extension that helps generate tailored resumes and cover letters for job applications. The extension communicates with a webhook service to generate customized PDF documents based on webpage content.

## Features

- Generate tailored resumes based on job descriptions
- Create customized cover letters
- Generate standalone cover letters
- Automatic PDF document generation and download
- Clean and intuitive user interface

## Setup Instructions

### Prerequisites

- Google Chrome browser
- Basic understanding of Chrome extension installation

### Installation Steps

1. Clone or download this repository to your local machine
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle switch in the top-right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. The Resume Builder extension icon should now appear in your Chrome toolbar

### Files Structure

```
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup interface
├── popup.js          # Popup functionality
├── background.js     # Background service worker
└── icon16.png        # Extension icon
```

## Configuration

### Webhook URLs

The extension uses three different webhook endpoints for different types of document generation:

1. Full Resume Generation: `https://auto.dynoxglobal.com/webhook/cf8846b6-21c3-4c0f-9276-4dcbf4a5da8f`
2. Cover Letter with Resume: `https://auto.dynoxglobal.com/webhook/70cf3ef0-5ea6-43d1-ba7a-7da67c886896`
3. Standalone Cover Letter: `https://auto.dynoxglobal.com/webhook/ebae21de-0a31-4cbd-9203-5fad92dab826`

### Permissions

The extension requires the following permissions:

- `scripting`: For interacting with webpage content
- `activeTab`: For accessing the current tab's information
- `downloads`: For saving generated PDF files
- `host_permissions`: For communicating with the webhook service

## Usage

1. Navigate to a job posting page
2. Click the Resume Builder extension icon in the Chrome toolbar
3. Choose one of the three options:
   - "Get Tailored Resume": Generates a resume tailored to the job posting
   - "Get Tailored Cover Letter": Creates a cover letter with resume
   - "Get Just Cover Letter": Generates only a cover letter
4. Wait for the PDF generation process to complete
5. The generated document will automatically download with a unique filename

## Troubleshooting

- If the extension icon doesn't appear, try reloading the extensions page
- Make sure all required permissions are granted
- Check the browser console for any error messages
- Verify that the webhook URLs are accessible and responding

## File Naming Convention

Generated files follow these naming patterns:
- Tailored Resume: `Taylored_Resume_[random].pdf`
- Cover Letter with Resume: `Cover_Letter_[random].pdf`
- Standalone Cover Letter: `Just_Cover_Letter_[random].pdf`

Where `[random]` is a 6-character random string to ensure unique filenames.

## Security Notes

- The extension communicates with predefined webhook URLs only
- All communication is done via HTTPS
- No sensitive data is stored locally
- PDF files are generated server-side and downloaded securely

## Support

For any issues or questions, please check:
1. Chrome's extension console for error messages
2. Network tab in Developer Tools for webhook communication issues
3. Permissions settings in the extension management page