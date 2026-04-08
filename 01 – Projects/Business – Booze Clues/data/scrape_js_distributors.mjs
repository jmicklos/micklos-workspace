#!/usr/bin/env node
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = __dirname + '/';

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
      setTimeout(() => { clearInterval(timer); resolve(); }, 20000);
    });
  });
}

async function main() {
  console.log('DATA_DIR:', DATA_DIR);
  const browser = await chromium.launch({ headless: true });

  // ─── 1. Elliott Bay ───
  try {
    console.log('\n=== Elliott Bay Distributing ===');
    const page = await browser.newPage();
    await page.goto('https://www.elliottbaywines.com/portfolio', {
      waitUntil: 'load', timeout: 45000
    });
    await page.waitForTimeout(8000);
    await autoScroll(page);
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    await autoScroll(page);
    await page.waitForTimeout(2000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    writeFileSync(DATA_DIR + 'elliott_bay_raw_text.txt', bodyText);
    console.log(`  Saved raw text (${bodyText.length} chars)`);
    await page.close();
  } catch (e) {
    console.error('  Elliott Bay error:', e.message);
  }

  // ─── 2. Orcas Distributing (image-based) ───
  try {
    console.log('\n=== Orcas Distributing ===');
    const page = await browser.newPage();

    const categories = ['beer', 'cider', 'mead', 'spirits', 'sake', 'wine', 'snacks'];
    let allData = [];

    for (const cat of categories) {
      const url = `https://www.orcasdistributing.com/${cat}`;
      console.log(`  Fetching ${cat}...`);
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        await page.waitForTimeout(5000);
        await autoScroll(page);
        await page.waitForTimeout(2000);

        // Extract image alt texts and filenames -- brands are in images
        const imageData = await page.evaluate(() => {
          const results = [];
          const imgs = document.querySelectorAll('img');
          imgs.forEach(img => {
            const alt = (img.alt || '').trim();
            const src = img.src || '';
            // Skip navigation/UI images
            if (alt && !alt.includes('BUTTON') && !alt.includes('button') &&
                !alt.toLowerCase().includes('logo') && alt.length > 2 && alt.length < 100) {
              results.push({ alt, src });
            }
            // Also try to extract brand name from filename
            if (src && !alt) {
              const filename = src.split('/').pop().split('?')[0];
              if (filename && filename.length > 5 && !filename.includes('button') &&
                  !filename.includes('logo') && !filename.includes('icon')) {
                results.push({ alt: '', src, filename });
              }
            }
          });
          return results;
        });

        // Also check for any text links that might be brand names
        const textData = await page.evaluate(() => {
          const results = [];
          document.querySelectorAll('a[href], h2, h3, h4, .summary-title, .gallery-caption').forEach(el => {
            const text = el.textContent.trim();
            if (text && text.length > 2 && text.length < 100) {
              results.push(text);
            }
          });
          return results;
        });

        allData.push({ category: cat, images: imageData, texts: textData });
        console.log(`    Found ${imageData.length} images, ${textData.length} text items`);
      } catch (e) {
        console.log(`    ${cat} error: ${e.message}`);
      }
    }

    writeFileSync(DATA_DIR + 'orcas_raw_data.json', JSON.stringify(allData, null, 2));
    console.log(`  Saved raw data`);
    await page.close();
  } catch (e) {
    console.error('  Orcas error:', e.message);
  }

  // ─── 3. Vehrs Distributing (paginated, client-side) ───
  try {
    console.log('\n=== Vehrs Distributing ===');
    const page = await browser.newPage();

    for (const [baseUrl, category] of [
      ['https://vehrsdistributing.com/wines', 'wine'],
      ['https://vehrsdistributing.com/spirits', 'spirits']
    ]) {
      try {
        console.log(`\n  Fetching ${category}...`);
        await page.goto(baseUrl, { waitUntil: 'load', timeout: 45000 });
        await page.waitForTimeout(8000);
        await autoScroll(page);
        await page.waitForTimeout(2000);

        let allText = '';
        let pageNum = 1;
        let maxPages = 20;

        // Get initial content
        let bodyText = await page.evaluate(() => document.body.innerText);
        allText += `---PAGE ${pageNum}---\n` + bodyText + '\n';

        // Find the total number of pages
        const pageCount = await page.evaluate(() => {
          const pageLinks = document.querySelectorAll('a, button');
          let maxPage = 1;
          for (const link of pageLinks) {
            const text = link.textContent.trim();
            const num = parseInt(text);
            if (!isNaN(num) && num > maxPage && num < 50) {
              maxPage = num;
            }
          }
          return maxPage;
        });
        console.log(`    Detected ${pageCount} pages`);
        maxPages = Math.min(pageCount, 20);

        // Navigate through pages by clicking page numbers
        for (pageNum = 2; pageNum <= maxPages; pageNum++) {
          console.log(`    Clicking page ${pageNum}...`);

          // Click the page number link
          const clicked = await page.evaluate((num) => {
            const links = document.querySelectorAll('a, button');
            for (const link of links) {
              if (link.textContent.trim() === String(num)) {
                link.click();
                return true;
              }
            }
            return false;
          }, pageNum);

          if (!clicked) {
            console.log(`    Could not find page ${pageNum} link`);
            break;
          }

          // Wait for content to change
          await page.waitForTimeout(4000);
          await autoScroll(page);
          await page.waitForTimeout(2000);

          bodyText = await page.evaluate(() => document.body.innerText);
          allText += `\n---PAGE ${pageNum}---\n` + bodyText + '\n';
        }

        writeFileSync(`${DATA_DIR}vehrs_${category}_raw_text.txt`, allText);
        console.log(`  ${category}: ${allText.length} chars across ${pageNum - 1} pages`);
      } catch (e) {
        console.error(`  ${category} error:`, e.message);
      }
    }
    await page.close();
  } catch (e) {
    console.error('  Vehrs error:', e.message);
  }

  await browser.close();
  console.log('\n=== Playwright scraping complete ===');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
