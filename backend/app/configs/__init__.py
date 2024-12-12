# backend/app/config/__init__.py

# Optional: Import key configurations here for cleaner imports
from .database import get_db

# Or define global variables
CONFIG_VAR = "some_value"
from .database import get_db, user_collection  # Import necessary functions/objects
