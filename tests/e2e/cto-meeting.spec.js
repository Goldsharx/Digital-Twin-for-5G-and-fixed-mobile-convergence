import { test, expect } from '@playwright/test';

const CTO_BTN = 'button.text-orange-400';

test('CTO Meeting panel opens and shows insights', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const ctoBtn = page.locator(CTO_BTN);
  await expect(ctoBtn).toBeVisible();
  await ctoBtn.click();
  await page.waitForTimeout(500);

  await expect(page.locator('text=CTO Meeting Insights')).toBeVisible();
  await expect(page.locator('text=Sid Dattagupta')).toBeVisible();
  await expect(page.locator('text=Coverage')).toBeVisible();

  await page.screenshot({ path: 'test-results/06-cto-meeting-panel.png', fullPage: true });
});

test('CTO panel category tabs work', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  await page.locator(CTO_BTN).click();
  await page.waitForTimeout(500);

  const techTab = page.locator('button', { hasText: /Technology/i });
  if (await techTab.count() > 0) {
    await techTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=Neo4J')).toBeVisible();
    await page.screenshot({ path: 'test-results/07-cto-tech-tab.png', fullPage: true });
  }

  const bizTab = page.locator('button', { hasText: /Business/i });
  if (await bizTab.count() > 0) {
    await bizTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=Churn').first()).toBeVisible();
  }
});

test('CTO panel insight cards expand to show demo mapping', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  await page.locator(CTO_BTN).click();
  await page.waitForTimeout(500);

  const firstCard = page.locator('.cursor-pointer').first();
  await firstCard.click();
  await page.waitForTimeout(300);

  await expect(page.locator('text=Demo Mapping')).toBeVisible();
  await page.screenshot({ path: 'test-results/08-cto-insight-expanded.png', fullPage: true });
});
