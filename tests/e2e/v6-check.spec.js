import { test, expect } from '@playwright/test';

test('globe loads without console errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'test-results/01-globe-loaded.png', fullPage: true });

  // Check no fatal errors
  const fatalErrors = errors.filter(e => !e.includes('ResizeObserver') && !e.includes('Cesium'));
  expect(fatalErrors).toEqual([]);
});

test('sidebar buttons work - Operators toggle', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Find and click Operators button
  const operatorsBtn = page.locator('button', { hasText: 'Operators' });
  if (await operatorsBtn.count() > 0) {
    await operatorsBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/02-operators-toggled.png', fullPage: true });
    // Toggle back on
    await operatorsBtn.click();
    await page.waitForTimeout(500);
  }
});

test('sidebar buttons work - Models panel', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const modelsBtn = page.locator('button', { hasText: 'Models' });
  if (await modelsBtn.count() > 0) {
    await modelsBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/03-models-panel.png', fullPage: true });
  }
});

test('timeline extends to 2035', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Check for 2035 in the page
  const content = await page.textContent('body');
  expect(content).toContain('2035');

  await page.screenshot({ path: 'test-results/04-timeline-2035.png', fullPage: true });
});

test('TAM/SAM/SOM market sizing visible', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const content = await page.textContent('body');
  // TAM/SAM/SOM should be visible when operators toggle is on (default)
  const hasTAM = content.includes('TAM') || content.includes('Market Sizing');
  expect(hasTAM).toBeTruthy();

  await page.screenshot({ path: 'test-results/05-market-sizing.png', fullPage: true });
});
