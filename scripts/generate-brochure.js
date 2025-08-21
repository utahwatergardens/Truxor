const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateBrochurePDF() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Read the HTML file
    const htmlPath = path.join(__dirname, '../public/downloads/pond-cleanup-services-brochure.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Set content and wait for it to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfPath = path.join(__dirname, '../public/downloads/pond-cleanup-services.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
        },
        printBackground: true
    });
    
    console.log(`Brochure PDF generated successfully at: ${pdfPath}`);
    
    await browser.close();
}

// Run if called directly
if (require.main === module) {
    generateBrochurePDF().catch(console.error);
}

module.exports = { generateBrochurePDF };
