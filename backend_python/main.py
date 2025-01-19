from fastapi import FastAPI
from routes.reviews import reviews_router

app = FastAPI(title="Product Reviews API")

# Include reviews route
app.include_router(reviews_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
