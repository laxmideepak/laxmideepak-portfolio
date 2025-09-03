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
        # Check CSS styles applied to the profile image for border styling and test responsiveness by resizing viewport.
        await page.mouse.wheel(0, window.innerHeight)
        

        await page.mouse.wheel(0, -window.innerHeight)
        

        # Assert 3D animated text is visible and has smooth continuous animation
        animated_text = await page.locator('.hero-3d-text')
        assert await animated_text.is_visible(), '3D animated text is not visible in hero section'
        animation_name = await animated_text.evaluate('(el) => getComputedStyle(el).animationName')
        assert animation_name != 'none', '3D animated text does not have animation applied'
        # Assert professional summary text matches latest resume content
        summary_locator = await page.locator('.hero-summary')
        summary_text = await summary_locator.text_content()
        expected_summary = "Skilled in configuring and customizing applications on Unix-like and Windows systems, with a solid foundation in relational databases to meet client-specific requirements. Looking for full-time opportunities as a Full Stack Software Engineer."
        assert expected_summary in summary_text, 'Professional summary text does not match expected content'
        # Assert profile image is displayed with correct border styling and responsive
        profile_img = await page.locator('.hero-profile-image')
        assert await profile_img.is_visible(), 'Profile image is not visible in hero section'
        border_style = await profile_img.evaluate('(el) => getComputedStyle(el).borderStyle')
        assert border_style != 'none', 'Profile image does not have border styling'
        # Test responsiveness by resizing viewport and checking profile image visibility
        for width, height in [(1280, 720), (768, 1024), (375, 667)]:
            await page.set_viewport_size({'width': width, 'height': height})
            assert await profile_img.is_visible(), f'Profile image not visible at viewport {width}x{height}'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    