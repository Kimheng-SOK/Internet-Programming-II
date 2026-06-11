# Playwright Stability & Performance Guide

This guide explains how to fix timeouts and resource exhaustion errors (like `NS_ERROR_INVALID_CONTENT_ENCODING`) when running Playwright tests.

## 1. Resource Management (Workers)
Running too many browser instances simultaneously (especially in `--headed` mode) will crash the browser's networking stack.

### The Fix:
Limit workers in `playwright.config.ts`:
```typescript
export default defineConfig({
  // Use 1 worker on CI, and half of available cores locally
  workers: process.env.CI ? 1 : '50%', 
});
```
**Or via CLI:**
```bash
npx playwright test --workers=4
```

## 2. Headless vs. Headed Mode
*   **Headless (Default):** Use this for 99% of your runs. It is faster and uses significantly less RAM.
*   **Headed (`--headed`):** Use ONLY when debugging 1 or 2 specific tests. Never run a full suite of 30+ tests in headed mode with high parallelism.

## 3. Artifact Optimization (Traces/Videos)
Recording traces and videos is "expensive" for your CPU and Disk.

### The Fix:
Set these to `on-first-retry` or `retain-on-failure` in `playwright.config.ts`:
```typescript
use: {
  trace: 'on-first-retry',
  video: 'retain-on-failure',
  screenshot: 'only-on-failure',
}
```

## 4. Addressing Firefox Specifics
Firefox is more sensitive to CPU spikes. If you see `NS_ERROR_INVALID_CONTENT_ENCODING`, it means the system was too slow to decompress the website's data.
*   **Solution:** Follow the worker limit in Step 1.

## 5. Clean Code with `baseURL`
Instead of typing `https://www.saucedemo.com` in every test, set it once:

**Config:**
```typescript
use: {
  baseURL: 'https://www.saucedemo.com',
}
```

**Test:**
```typescript
await page.goto('/'); // Automatically goes to the baseURL
```
