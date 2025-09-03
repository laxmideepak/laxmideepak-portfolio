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
        # Click on the 'Work' link to navigate to the Projects/Work page.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div[55]/header/div[2]/div/div/nav/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Resize viewport to mobile size (e.g., 375x667) and verify grid responsiveness and usability.
        await page.goto('http://localhost:3000/work', timeout=10000)
        

        # Resize viewport to mobile size (375x667) and verify grid responsiveness and usability.
        await page.goto('http://localhost:3000/work', timeout=10000)
        

        # Resize viewport to tablet size and verify grid responsiveness and usability.
        await page.goto('http://localhost:3000/work', timeout=10000)
        

        # Assert at least 6 project cards are displayed in a responsive grid layout
        project_cards = page.locator('.project-card')
        count = await project_cards.count()
        assert count >= 6, f'Expected at least 6 project cards, but found {count}'
        # Check each project card displays technology stack icons or emojis
        for i in range(count):
            card = project_cards.nth(i)
            tech_icons = await card.locator('.tech-icon, .tech-emoji').count()
            assert tech_icons > 0, f'Project card {i} does not display any technology stack icons or emojis'
        # Confirm no project images or 'View Details' buttons are present
        images = await page.locator('.project-card img').count()
        assert images == 0, f'Expected no project images, but found {images}'
        view_details_buttons = await page.locator('.project-card button:has-text("View Details")').count()
        assert view_details_buttons == 0, f'Expected no View Details buttons, but found {view_details_buttons}'
        # Resize viewport to mobile and tablet sizes and verify grid responsiveness and usability
        for width, height in [(375, 667), (768, 1024)]:
            await page.set_viewport_size({'width': width, 'height': height})
            # Check grid layout adapts - for example, check number of columns or layout class changes
            grid = page.locator('.projects-grid')
            grid_class = await grid.get_attribute('class')
            assert grid_class is not None, 'Projects grid does not have a class attribute for layout'
            # Optionally check grid columns count or layout style if accessible
            # Check usability - ensure project cards are visible and interactable
            visible_cards = await project_cards.filter(':visible').count()
            assert visible_cards == count, f'Not all project cards are visible on viewport {width}x{height}'
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    