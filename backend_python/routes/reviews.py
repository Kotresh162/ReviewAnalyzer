from fastapi import APIRouter, Query
from services.scraper import scrape_reviews

reviews_router = APIRouter()

@reviews_router.get("/api/reviews")
async def get_reviews(url: str = Query(..., description="Product page URL")):
    try:
        reviews_data = await scrape_reviews(url)
        return reviews_data
    except Exception as e:
        return {"error": str(e)}
