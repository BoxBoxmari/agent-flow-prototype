from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Go to the local dev server
            page.goto("http://localhost:5173")
            
            # Wait for key elements to ensure app is loaded
            page.wait_for_selector('text=Agent Toolkit') # Sidebar
            page.wait_for_selector('text=Web Scraper')   # Sidebar item
            page.wait_for_selector('text=Node Configuration') # Config Panel
            page.wait_for_selector('.react-flow__renderer') # Canvas
            
            # Take a screenshot
            page.screenshot(path="verification/agent-flow-screenshot.png", full_page=True)
            print("Screenshot taken successfully")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app()
