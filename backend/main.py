
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .auth import create_access_token, verify_token
import random

app = FastAPI(title="Agentic Platform API")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # In production, verify against database
    if form_data.username == "admin" and form_data.password == "admin":
        access_token = create_access_token(data={"sub": form_data.username})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Incorrect username or password")

@app.get("/api/v1/health")
async def get_health(current_user: dict = Depends(get_current_user)):
    # This would normally pull from your monitoring tools (Prometheus, Redis, etc.)
    # Mocking response based on config.json service IDs
    return {
        "redis-01": {
            "status": "warning",
            "metrics": [
                {"label": "Memory", "value": "78%", "history": [60, 65, 78]},
                {"label": "Ops/s", "value": "1.2k", "history": [1000, 1100, 1200]}
            ]
        },
        "portainer-01": {"status": "healthy", "metrics": [{"label": "CPU", "value": "12%", "history": [10, 12, 12]}]}
    }
