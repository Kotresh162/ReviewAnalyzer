import asyncio
from playwright.async_api import async_playwright
from services.llm import identify_css_selectors

async def scrape_reviews(url: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url,timeout=60000, wait_until="domcontentloaded")

        # Use LLM to identify dynamic CSS selectors
        html_content = await page.content()
        css_selectors = await identify_css_selectors(html_content)

        # Extract reviews using the identified selectors
        reviews = []
        elements = await page.query_selector_all(css_selectors["review_item"])
        for element in elements:
            title = await element.query_selector(css_selectors["title"]).inner_text()
            body = await element.query_selector(css_selectors["body"]).inner_text()
            rating = await element.query_selector(css_selectors["rating"]).inner_text()
            reviewer = await element.query_selector(css_selectors["reviewer"]).inner_text()

            reviews.append({
                "title": title,
                "body": body,
                "rating": int(rating),
                "reviewer": reviewer
            })

        # Handle pagination if necessary
        while await page.query_selector(css_selectors["next_page"]):
            await page.click(css_selectors["next_page"])
            # Re-extract reviews...

        await browser.close()
        return {"reviews_count": len(reviews), "reviews": reviews}
