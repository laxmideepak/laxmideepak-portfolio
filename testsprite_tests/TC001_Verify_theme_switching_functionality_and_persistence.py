import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Click the theme toggle button to switch to dark mode.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[55]/header/div[2]/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the 'Dark' option to switch to dark mode and verify the theme update.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[56]/div/div[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Reload the page and verify dark mode is still active.
        await page.goto('http://localhost:3000/', timeout=10000)
        

        # Click the theme toggle button to open theme options to switch back to light mode.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[55]/header/div[2]/div/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the 'Light' option to switch to light mode and verify the theme update.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[56]/div/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Reload the page and verify that light mode persists after reload.
        await page.goto('http://localhost:3000/', timeout=10000)
        

        # Assert that the site theme updates to dark mode with the cosmic/starry background after clicking dark mode option
        dark_mode_body_class = await page.evaluate("document.body.className")
        assert 'dark' in dark_mode_body_class, 'Dark mode class not found on body after toggling to dark mode'
        # Assert that localStorage has the dark mode theme persisted
        dark_mode_local_storage = await page.evaluate("localStorage.getItem('theme')")
        assert dark_mode_local_storage == 'dark', f"Expected localStorage theme to be 'dark', but got {dark_mode_local_storage}"
        # After reload, verify dark mode is still active
        dark_mode_body_class_after_reload = await page.evaluate("document.body.className")
        assert 'dark' in dark_mode_body_class_after_reload, 'Dark mode class not found on body after page reload'
        # Assert that the site theme updates to light mode with the Apple-inspired light mode after clicking light mode option
        light_mode_body_class = await page.evaluate("document.body.className")
        assert 'light' in light_mode_body_class, 'Light mode class not found on body after toggling to light mode'
        # Assert that localStorage has the light mode theme persisted
        light_mode_local_storage = await page.evaluate("localStorage.getItem('theme')")
        assert light_mode_local_storage == 'light', f"Expected localStorage theme to be 'light', but got {light_mode_local_storage}"
        # After reload, verify light mode is still active
        light_mode_body_class_after_reload = await page.evaluate("document.body.className")
        assert 'light' in light_mode_body_class_after_reload, 'Light mode class not found on body after page reload'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    