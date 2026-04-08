import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Go to advanced search
await page.goto('https://www.ttbonline.gov/colasonline/publicSearchColasAdvanced.do', { timeout: 20000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'ttb_1_form.png' });

// List all form inputs
const inputs = await page.$$eval('input, select, textarea', els => 
  els.map(e => ({ tag: e.tagName, name: e.name, id: e.id, type: e.type, value: e.value }))
);
console.log('Form fields:');
inputs.forEach(i => console.log(`  ${i.tag} name="${i.name}" id="${i.id}" type="${i.type}" value="${i.value}"`));

// Try filling in a known permit
const permit = 'WA-I-1067'; // Grape Expectations
console.log(`\nSearching for permit: ${permit}`);

// Find the right field for permit
const permitField = await page.$('input[name*="permit"], input[name*="Permit"], input[name*="plant"], input[name*="Plant"]');
if (permitField) {
  const fieldName = await permitField.getAttribute('name');
  console.log(`Found permit field: ${fieldName}`);
  await permitField.fill(permit);
} else {
  console.log('No permit field found! Trying all text inputs...');
  // Try each text input
  for (const input of inputs) {
    if (input.type === 'text') {
      console.log(`  Trying field: ${input.name}`);
    }
  }
}

// Set date range
const dateFrom = await page.$('input[name*="dateFrom"], input[name*="DateFrom"], input[name*="date_from"]');
const dateTo = await page.$('input[name*="dateTo"], input[name*="DateTo"], input[name*="date_to"]');
console.log(`Date from field: ${dateFrom ? 'found' : 'NOT FOUND'}`);
console.log(`Date to field: ${dateTo ? 'found' : 'NOT FOUND'}`);

await page.screenshot({ path: 'ttb_2_filled.png' });

// Find and click submit
const submitBtn = await page.$('input[type="submit"], button[type="submit"]');
if (submitBtn) {
  const val = await submitBtn.getAttribute('value');
  console.log(`Submit button: ${val}`);
  await submitBtn.click();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'ttb_3_results.png' });
  
  const bodyText = await page.textContent('body');
  console.log(`\nResult page (first 500 chars):`);
  console.log(bodyText.substring(0, 500));
}

await browser.close();
