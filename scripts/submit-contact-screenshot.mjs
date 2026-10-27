import { chromium } from 'playwright';

async function main() {
  console.log('Launching browser with Chrome channel...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  const page = await context.newPage();

  console.log('Navigating to contact section on http://localhost:3000/#contact...');
  await page.goto('http://localhost:3000/#contact', { waitUntil: 'networkidle' });

  // Fill in the form fields
  console.log('Filling in contact form fields...');
  await page.fill('#name', 'Prem Singh Partner Test');
  await page.fill('#firm', 'Prem Compliance & Associates');
  await page.fill('#email', 'prem.webcompliance@gmail.com');
  await page.fill('#phone', '9876543210');
  await page.selectOption('#inquiry_type', '10-Minute Software Demo');
  await page.fill('#message', 'Test message confirming Formspree integration for Phase 8 proof.');

  console.log('Submitting form to Formspree...');
  await page.click('button[type="submit"]');

  console.log('Waiting for Formspree success confirmation message...');
  await page.waitForSelector('text=Thanks, we\'ll reply within one working day.', { timeout: 15000 });

  console.log('Success state confirmed! Capturing screenshot...');
  // Scroll to make sure the contact section / card is in full view
  const contactCard = await page.$('#contact');
  if (contactCard) {
    await contactCard.scrollIntoViewIfNeeded();
  }

  await page.screenshot({
    path: 'docs/screenshots/contact-form-success.png',
    fullPage: false,
  });

  console.log('Screenshot saved to docs/screenshots/contact-form-success.png');
  await browser.close();
}

main().catch((err) => {
  console.error('Error during contact form test:', err);
  process.exit(1);
});
