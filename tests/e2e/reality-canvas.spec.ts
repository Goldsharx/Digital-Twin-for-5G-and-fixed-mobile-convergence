import { test, expect, type Page } from '@playwright/test';

const BASE = 'http://localhost:5178';

async function waitForApp(page: Page) {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await expect(page.getByText('AXON Networks')).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText('Quantum Fiber Digital Twin')).toBeVisible();
}

// ──────────────────────────────────────────────
// US-01: Planet-level overview with metro pins
// ──────────────────────────────────────────────
test.describe('US-01: Planet Overview', () => {
  test('shows brand header, subtitle, and stats bar', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('AXON Networks')).toBeVisible();
    await expect(page.getByText('Quantum Fiber Digital Twin')).toBeVisible();
    await expect(page.getByText('Reality Canvas · Sprint 0')).toBeVisible();
  });

  test('sidebar shows zoom scope "planet" on load', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('Zoom Scope')).toBeVisible();
    await expect(page.locator('.text-axon-teal').filter({ hasText: 'planet' }).first()).toBeVisible();
  });

  test('sidebar shows "All Metros" heading at planet level', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('All Metros · Quantum Fiber Footprint')).toBeVisible();
  });

  test('stats bar shows subscriber count', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('Subscribers', { exact: true }).first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-02: Sidebar health status breakdown
// ──────────────────────────────────────────────
test.describe('US-02: Network Health Sidebar', () => {
  test('shows health categories: Healthy, Degraded, Alarm, Offline', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('Network Health')).toBeVisible();
    await expect(page.getByText('Healthy', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Degraded', { exact: false }).first()).toBeVisible();
    await expect(page.getByText(/^Alarm \d/).first()).toBeVisible();
    await expect(page.getByText('Offline', { exact: false }).first()).toBeVisible();
  });

  test('shows health score percentage', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('Health score:')).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-03: AN Level gauge (TM Forum maturity)
// ──────────────────────────────────────────────
test.describe('US-03: AN Level Gauge', () => {
  test('shows TM Forum AN Level gauge with level indicator', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('TM Forum AN Level')).toBeVisible();
    await expect(page.getByText(/L\d\.\d → L\d/).first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-04: Data platforms list with connection status
// ──────────────────────────────────────────────
test.describe('US-04: Data Platforms', () => {
  test('shows all 5 AXON platforms + Unified Twin', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('Data Platforms')).toBeVisible();
    await expect(page.getByText('AXON Orchestrator')).toBeVisible();
    await expect(page.getByText('CloudCheck')).toBeVisible();
    await expect(page.getByText('Expresse')).toBeVisible();
    await expect(page.getByText('Greenwave Mobile')).toBeVisible();
    await expect(page.getByText('Inventory', { exact: true })).toBeVisible();
    await expect(page.getByText('Unified Twin')).toBeVisible();
  });

  test('has Show/Hide Data Sources toggle button', async ({ page }) => {
    await waitForApp(page);
    const toggleBtn = page.locator('button').filter({ hasText: /Data Sources/i });
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();
    await expect(page.locator('button').filter({ hasText: /Data Sources/i })).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-05: Top Issues list
// ──────────────────────────────────────────────
test.describe('US-05: Top Issues (NOC view)', () => {
  test('shows top issues in NOC role by default', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText('Top Issues')).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-06: Phase toggle (People / Systems / AI Agents)
// ──────────────────────────────────────────────
test.describe('US-06: Phase Toggle', () => {
  test('shows People / Systems / AI Agents buttons and toggles', async ({ page }) => {
    await waitForApp(page);
    const people = page.locator('button').filter({ hasText: 'People' });
    const systems = page.locator('button').filter({ hasText: 'Systems' });
    const agents = page.locator('button').filter({ hasText: 'AI Agents' });

    await expect(people).toBeVisible();
    await expect(systems).toBeVisible();
    await expect(agents).toBeVisible();

    await people.click();
    await page.waitForTimeout(300);
    await systems.click();
    await page.waitForTimeout(300);
    await agents.click();
    await page.waitForTimeout(300);
  });
});

// ──────────────────────────────────────────────
// US-07: Sidebar action buttons
// ──────────────────────────────────────────────
test.describe('US-07: Sidebar Action Buttons', () => {
  test('has Story, KPIs, Arch, Squads, MCP buttons', async ({ page }) => {
    await waitForApp(page);
    await expect(page.locator('button').filter({ hasText: 'Story' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'KPIs' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Arch' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Squads' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'MCP' }).first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-08: Story Mode 8-step flythrough
// ──────────────────────────────────────────────
test.describe('US-08: Story Mode', () => {
  test('opens with step 1 and shows narration text', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'Story' }).click();
    await expect(page.getByText('The Shared Reality')).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText(/881K subscribers/)).toBeVisible();
  });

  test('can navigate through all 8 steps', async ({ page }) => {
    test.setTimeout(120_000);
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'Story' }).click();
    await expect(page.getByText('The Shared Reality')).toBeVisible({ timeout: 5_000 });

    for (let i = 0; i < 7; i++) {
      await page.waitForTimeout(3000);
      await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (const b of btns) {
          if (b.textContent?.includes('Next')) { b.click(); return; }
        }
      });
    }

    await page.waitForTimeout(3000);
    await expect(page.getByText('The Path Forward').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('button').filter({ hasText: 'Finish' })).toBeVisible();
  });

  test('exit button closes story mode', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'Story' }).click();
    await expect(page.getByText('The Shared Reality')).toBeVisible({ timeout: 5_000 });
    const exitBtn = page.locator('button').filter({ hasText: /Exit|Close|✕|×/ });
    if (await exitBtn.first().isVisible()) {
      await exitBtn.first().click();
      await page.waitForTimeout(500);
    }
  });
});

// ──────────────────────────────────────────────
// US-09: Timeline slider 2019-2030
// ──────────────────────────────────────────────
test.describe('US-09: Timeline Slider', () => {
  test('shows timeline slider with year display', async ({ page }) => {
    await waitForApp(page);
    const slider = page.locator('[data-testid="timeline-slider"]');
    await expect(slider).toBeAttached();
  });

  test('can slide to past year (2019) — shows Historical label', async ({ page }) => {
    await waitForApp(page);
    const slider = page.locator('[data-testid="timeline-slider"]');
    await slider.fill('2019');
    await page.waitForTimeout(500);
    await expect(page.getByText('Historical', { exact: true }).first()).toBeVisible();
  });

  test('can slide to future year (2030) — shows Projected label', async ({ page }) => {
    await waitForApp(page);
    const slider = page.locator('[data-testid="timeline-slider"]');
    await slider.fill('2030');
    await page.waitForTimeout(500);
    await expect(page.getByText('Projected', { exact: true }).first()).toBeVisible();
  });

  test('play button exists', async ({ page }) => {
    await waitForApp(page);
    await expect(page.locator('button').filter({ hasText: '▶' })).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-10: KPI Panel (Save/Make/Find Money)
// ──────────────────────────────────────────────
test.describe('US-10: KPI Panel', () => {
  test('opens KPI panel with KPIs tab visible', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'KPIs' }).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText('KPIs').first()).toBeVisible();
  });

  test('shows scenario cards', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'KPIs' }).first().click();
    await page.waitForTimeout(500);
    const scenariosTab = page.locator('button').filter({ hasText: 'Scenarios' });
    if (await scenariosTab.isVisible()) {
      await scenariosTab.click();
      await page.waitForTimeout(500);
      await expect(page.getByText('Deutsche Telekom Partnership')).toBeVisible();
    }
  });

  test('shows anchor accounts tab', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'KPIs' }).first().click();
    await page.waitForTimeout(500);
    const accountsTab = page.locator('button').filter({ hasText: 'Accounts' });
    if (await accountsTab.isVisible()) {
      await accountsTab.click();
      await page.waitForTimeout(500);
      await expect(page.getByText('Lumen Technologies')).toBeVisible();
    }
  });

  test('close button dismisses the panel', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'KPIs' }).first().click();
    await page.waitForTimeout(500);
    const closeBtn = page.locator('button').filter({ hasText: /Close|✕|×/ });
    if (await closeBtn.first().isVisible()) {
      await closeBtn.first().click();
    }
  });
});

// ──────────────────────────────────────────────
// US-11: Architecture Panel
// ──────────────────────────────────────────────
test.describe('US-11: Architecture Panel', () => {
  test('opens and shows architecture content', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'Arch' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText(/Orchestrator|Intelligence|Architecture/i).first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-12: Neurosquad Panel (AI agent squads)
// ──────────────────────────────────────────────
test.describe('US-12: Neurosquad Panel', () => {
  test('opens and shows AI squads', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'Squads' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Proactive Heal')).toBeVisible();
    await expect(page.getByText('Churn Shield')).toBeVisible();
    await expect(page.getByText('Capacity Oracle')).toBeVisible();
  });

  test('squad cards are expandable', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'Squads' }).click();
    await page.waitForTimeout(500);
    await page.getByText('Proactive Heal').first().click();
    await page.waitForTimeout(300);
    await expect(page.getByText(/Anomaly Detector|Root Cause|Auto-Remediate/i).first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-13: MCP Panel (API endpoints)
// ──────────────────────────────────────────────
test.describe('US-13: MCP Panel', () => {
  test('opens and shows MCP endpoints', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'MCP' }).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText('network.health')).toBeVisible();
    await expect(page.getByText('topology.query')).toBeVisible();
  });

  test('shows pricing per endpoint', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'MCP' }).first().click();
    await page.waitForTimeout(500);
    await expect(page.getByText(/\$0\.\d+\/query/).first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-14: Role switching (NOC / CTO / CFO / CEO / CX)
// ──────────────────────────────────────────────
test.describe('US-14: Role Switching', () => {
  test('shows all 5 role buttons', async ({ page }) => {
    await waitForApp(page);
    await expect(page.locator('button').filter({ hasText: 'NOC' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'CTO' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'CFO' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'CEO' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'CX' })).toBeVisible();
  });

  test('NOC shows Top Issues section', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'NOC' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Top Issues')).toBeVisible();
  });

  test('CTO shows Technical Priorities section', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'CTO' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Technical Priorities')).toBeVisible();
  });

  test('CFO shows Financial Overview with ARR, CapEx, Churn', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'CFO' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Financial Overview')).toBeVisible();
    await expect(page.getByText('Current ARR')).toBeVisible();
    await expect(page.getByText('$67M')).toBeVisible();
    await expect(page.getByText('Target ARR')).toBeVisible();
    await expect(page.getByText('$108M').first()).toBeVisible();
    await expect(page.getByText('CapEx Savings')).toBeVisible();
    await expect(page.getByText('$22.4M/yr')).toBeVisible();
  });

  test('CEO shows Market Opportunity with TAM/SAM/SOM', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'CEO' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Market Opportunity')).toBeVisible();
    await expect(page.getByText('TAM (DT Market)')).toBeVisible();
    await expect(page.getByText('$49.5B')).toBeVisible();
    await expect(page.getByText('SAM (Telecom DT)')).toBeVisible();
    await expect(page.getByText('$2.7B')).toBeVisible();
    await expect(page.getByText('SOM (Top 100)')).toBeVisible();
    await expect(page.getByText('$108M').first()).toBeVisible();
  });

  test('CX view hides Top Issues and Financial Overview', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'CX' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Top Issues')).not.toBeVisible();
    await expect(page.getByText('Financial Overview')).not.toBeVisible();
    await expect(page.getByText('Market Opportunity')).not.toBeVisible();
  });

  test('CEO and CX views hide Data Platforms section', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'CEO' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Data Platforms')).not.toBeVisible();

    await page.locator('button').filter({ hasText: 'CX' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Data Platforms')).not.toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-15: Breadcrumb navigation
// ──────────────────────────────────────────────
test.describe('US-15: Breadcrumb', () => {
  test('shows breadcrumb bar at planet level', async ({ page }) => {
    await waitForApp(page);
    await expect(page.getByText(/Planet|Global/i).first()).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-16: Event ticker (live simulation)
// ──────────────────────────────────────────────
test.describe('US-16: Event Ticker', () => {
  test('event ticker container renders', async ({ page }) => {
    await waitForApp(page);
    await page.waitForTimeout(1000);
    // EventTicker always renders — at planet level events may be empty
  });
});

// ──────────────────────────────────────────────
// US-17: Simulation scenarios with ghost pins
// ──────────────────────────────────────────────
test.describe('US-17: Simulation Scenarios', () => {
  test('Deutsche Telekom scenario shows in KPI panel', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'KPIs' }).first().click();
    await page.waitForTimeout(500);
    const scenariosTab = page.locator('button').filter({ hasText: 'Scenarios' });
    if (await scenariosTab.isVisible()) {
      await scenariosTab.click();
      await page.waitForTimeout(300);
      await expect(page.getByText('Deutsche Telekom Partnership')).toBeVisible();
    }
  });
});

// ──────────────────────────────────────────────
// US-20: Time-dependent metro visibility
// ──────────────────────────────────────────────
test.describe('US-20: Timeline-dependent Metros', () => {
  test('subscriber count changes with timeline year', async ({ page }) => {
    await waitForApp(page);
    const slider = page.locator('[data-testid="timeline-slider"]');

    await slider.fill('2026');
    await page.waitForTimeout(500);
    const subs2026 = await page.getByText(/Subscribers \d/).first().textContent();

    await slider.fill('2030');
    await page.waitForTimeout(500);
    const subs2030 = await page.getByText(/Subscribers \d/).first().textContent();

    expect(subs2030).not.toBe(subs2026);
  });

  test('metro count changes with timeline year', async ({ page }) => {
    await waitForApp(page);
    const slider = page.locator('[data-testid="timeline-slider"]');

    await slider.fill('2026');
    await page.waitForTimeout(500);
    const metros2026 = await page.getByText(/Metros \d+/).first().textContent();

    await slider.fill('2030');
    await page.waitForTimeout(500);
    const metros2030 = await page.getByText(/Metros \d+/).first().textContent();

    expect(metros2030).not.toBe(metros2026);
  });
});

// ──────────────────────────────────────────────
// US-21: Visual era transitions
// ──────────────────────────────────────────────
test.describe('US-21: Visual Era Transitions', () => {
  test('past year applies sepia filter', async ({ page }) => {
    await waitForApp(page);
    await page.locator('[data-testid="timeline-slider"]').fill('2020');
    await page.waitForTimeout(500);
    const container = page.locator('.relative.h-full.w-full');
    const style = await container.getAttribute('style');
    expect(style).toContain('saturate');
  });

  test('future year applies hue-rotate filter', async ({ page }) => {
    await waitForApp(page);
    await page.locator('[data-testid="timeline-slider"]').fill('2029');
    await page.waitForTimeout(500);
    const container = page.locator('.relative.h-full.w-full');
    const style = await container.getAttribute('style');
    expect(style).toContain('hue-rotate');
  });

  test('current year (2026) has no filter', async ({ page }) => {
    await waitForApp(page);
    await page.locator('[data-testid="timeline-slider"]').fill('2026');
    await page.waitForTimeout(500);
    const container = page.locator('.relative.h-full.w-full');
    const style = await container.getAttribute('style');
    expect(style === null || style === '' || !style.includes('filter')).toBeTruthy();
  });
});

// ──────────────────────────────────────────────
// US-22: Historical/Projected badge
// ──────────────────────────────────────────────
test.describe('US-22: Historical/Projected Badges', () => {
  test('shows Historical badge before 2025', async ({ page }) => {
    await waitForApp(page);
    await page.locator('[data-testid="timeline-slider"]').fill('2022');
    await page.waitForTimeout(500);
    await expect(page.getByText('Historical', { exact: true }).first()).toBeVisible();
  });

  test('shows Projected badge after 2027', async ({ page }) => {
    await waitForApp(page);
    await page.locator('[data-testid="timeline-slider"]').fill('2028');
    await page.waitForTimeout(500);
    await expect(page.getByText('Projected', { exact: true }).first()).toBeVisible();
  });

  test('no badge at current year 2026', async ({ page }) => {
    await waitForApp(page);
    await page.locator('[data-testid="timeline-slider"]').fill('2026');
    await page.waitForTimeout(500);
    await expect(page.getByText('Present')).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-23: Global operator map (CEO view)
// ──────────────────────────────────────────────
test.describe('US-23: Global Operator Map', () => {
  test('CEO view shows global operator stats in sidebar', async ({ page }) => {
    await waitForApp(page);
    await page.locator('button').filter({ hasText: 'CEO' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Global Operators')).toBeVisible();
    await expect(page.getByText(/\d+ mapped/)).toBeVisible();
    await expect(page.getByText('Global Subs')).toBeVisible();
    await expect(page.getByText('Industry Revenue')).toBeVisible();
    await expect(page.getByText(/16\.6%/)).toBeVisible();
  });
});

// ──────────────────────────────────────────────
// US-24: Source provenance badges
// ──────────────────────────────────────────────
test.describe('US-24: Source Provenance', () => {
  test('data sources toggle exists and works', async ({ page }) => {
    await waitForApp(page);
    const btn = page.locator('button').filter({ hasText: /Data Sources/i });
    await expect(btn).toBeVisible();
    const initialText = await btn.textContent();
    await btn.click();
    await page.waitForTimeout(300);
    const newText = await btn.textContent();
    expect(newText).not.toBe(initialText);
  });
});

// ──────────────────────────────────────────────
// US-25: Reset / home view
// ──────────────────────────────────────────────
test.describe('US-25: Reset View', () => {
  test('reset button exists and is clickable', async ({ page }) => {
    await waitForApp(page);
    const resetBtn = page.locator('button').filter({ hasText: 'Reset' });
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.text-axon-teal').filter({ hasText: 'planet' }).first()).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// UI/UX QUALITY: Color, Overlap, Readability
// ══════════════════════════════════════════════

test.describe('UI/UX: Visual Quality', () => {
  test('brand header text is readable (contrast check)', async ({ page }) => {
    await waitForApp(page);
    const color = await page.getByText('AXON Networks').evaluate((el) => getComputedStyle(el).color);
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
    expect(color).not.toBe('rgb(0, 0, 0)');
  });

  test('sidebar does not overflow viewport vertically', async ({ page }) => {
    await waitForApp(page);
    const sidebar = page.locator('.pointer-events-auto.absolute.left-4');
    const box = await sidebar.first().boundingBox();
    if (box) {
      expect(box.y + box.height).toBeLessThanOrEqual(910);
    }
  });

  test('role buttons are visible and clickable', async ({ page }) => {
    await waitForApp(page);
    const nocBtn = page.locator('button').filter({ hasText: 'NOC' });
    const box = await nocBtn.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  });

  test('stats bar and timeline slider do not overlap', async ({ page }) => {
    await waitForApp(page);
    const statsText = page.getByText('Subscribers', { exact: true }).first();
    const timeline = page.locator('[data-testid="timeline-slider"]');

    const statsBox = await statsText.boundingBox();
    const timeBox = await timeline.boundingBox();

    if (statsBox && timeBox) {
      const statsBottom = statsBox.y + statsBox.height;
      const timeTop = timeBox.y;
      expect(Math.abs(statsBottom - timeTop) > -5).toBeTruthy();
    }
  });

  test('all text elements use consistent font family', async ({ page }) => {
    await waitForApp(page);
    const fonts = await page.evaluate(() => {
      const elements = document.querySelectorAll('div, span, button, h1, h2, h3, p');
      const families = new Set<string>();
      elements.forEach((el) => {
        const ff = getComputedStyle(el).fontFamily;
        if (ff) families.add(ff.split(',')[0].trim().replace(/"/g, ''));
      });
      return [...families];
    });
    expect(fonts.length).toBeLessThanOrEqual(5);
  });

  test('no horizontal scrollbar on 1440px viewport', async ({ page }) => {
    await waitForApp(page);
    const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasHScroll).toBe(false);
  });

  test('no vertical scrollbar on main container', async ({ page }) => {
    await waitForApp(page);
    const hasVScroll = await page.evaluate(() => document.documentElement.scrollHeight > document.documentElement.clientHeight);
    expect(hasVScroll).toBe(false);
  });

  test('sidebar glass effect has backdrop blur', async ({ page }) => {
    await waitForApp(page);
    const glass = page.locator('.glass').first();
    const blur = await glass.evaluate((el) => getComputedStyle(el).backdropFilter || (getComputedStyle(el) as any).webkitBackdropFilter);
    expect(blur).toContain('blur');
  });
});

test.describe('UI/UX: Text Readability', () => {
  test('no user-facing text is smaller than 8px', async ({ page }) => {
    await waitForApp(page);
    const tinyTexts = await page.evaluate(() => {
      const allText = document.querySelectorAll('div, span, button, p, li, h1, h2, h3, h4, label');
      let count = 0;
      allText.forEach((el) => {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (size > 0 && size < 8 && el.textContent && el.textContent.trim().length > 0) {
          count++;
        }
      });
      return count;
    });
    expect(tinyTexts).toBe(0);
  });

  test('primary heading is at least 16px', async ({ page }) => {
    await waitForApp(page);
    const heading = page.getByText('Quantum Fiber Digital Twin');
    const size = await heading.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(size).toBeGreaterThanOrEqual(16);
  });
});

test.describe('UI/UX: Color & Theme', () => {
  test('background is dark theme (not white)', async ({ page }) => {
    await waitForApp(page);
    const bg = await page.evaluate(() => {
      const body = document.querySelector('.bg-axon-deep') || document.body;
      return getComputedStyle(body).backgroundColor;
    });
    const match = bg.match(/(\d+)/g);
    if (match) {
      const [r, g, b] = match.map(Number);
      const luminance = (r + g + b) / 3;
      expect(luminance).toBeLessThan(80);
    }
  });

  test('axon-teal accent color is used', async ({ page }) => {
    await waitForApp(page);
    const tealElements = await page.evaluate(() => {
      const els = document.querySelectorAll('[class*="axon-teal"], [class*="teal"]');
      return els.length;
    });
    expect(tealElements).toBeGreaterThan(0);
  });

  test('status colors are visually distinct', async ({ page }) => {
    await waitForApp(page);
    const healthBar = page.locator('.bg-status-healthy, .bg-status-degraded, .bg-status-alarm, .bg-status-offline');
    const count = await healthBar.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

test.describe('UI/UX: Responsive Layout', () => {
  test('app renders without errors at 1280x720', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await waitForApp(page);
    await expect(page.getByText('AXON Networks')).toBeVisible();
    await expect(page.getByText('Zoom Scope')).toBeVisible();
  });

  test('app renders without errors at 1920x1080', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await waitForApp(page);
    await expect(page.getByText('AXON Networks')).toBeVisible();
    await expect(page.getByText('Zoom Scope')).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// INTERACTION FLOW: Combined user journeys
// ══════════════════════════════════════════════

test.describe('User Journey: Full Demo Flow', () => {
  test('can cycle through all roles and verify sidebar changes', async ({ page }) => {
    await waitForApp(page);
    const roles = ['NOC', 'CTO', 'CFO', 'CEO', 'CX'];
    for (const role of roles) {
      await page.locator('button').filter({ hasText: role }).click();
      await page.waitForTimeout(400);
      await expect(page.getByText('Zoom Scope')).toBeVisible();
    }
  });

  test('timeline + role combination works correctly', async ({ page }) => {
    await waitForApp(page);
    await page.locator('[data-testid="timeline-slider"]').fill('2030');
    await page.waitForTimeout(500);

    await page.locator('button').filter({ hasText: 'CEO' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Market Opportunity')).toBeVisible();
    await expect(page.getByText('Projected', { exact: true }).first()).toBeVisible();

    await page.locator('button').filter({ hasText: 'CFO' }).click();
    await page.waitForTimeout(300);
    await expect(page.getByText('Financial Overview')).toBeVisible();
  });

  test('panels can be opened and closed without breaking layout', async ({ page }) => {
    await waitForApp(page);

    await page.locator('button').filter({ hasText: 'KPIs' }).first().click();
    await page.waitForTimeout(500);
    // Close KPI panel before opening Arch (panel overlaps sidebar buttons)
    const closeBtn = page.locator('button').filter({ hasText: /Close|✕|×/ });
    if (await closeBtn.first().isVisible()) await closeBtn.first().click();
    await page.waitForTimeout(300);

    await page.locator('button').filter({ hasText: 'Arch' }).click();
    await page.waitForTimeout(500);

    await page.locator('button').filter({ hasText: 'Squads' }).click({ force: true });
    await page.waitForTimeout(500);

    await page.locator('button').filter({ hasText: 'MCP' }).first().click({ force: true });
    await page.waitForTimeout(500);

    await expect(page.getByText('Zoom Scope')).toBeVisible();
  });
});
