import firebase_admin
from firebase_admin import credentials, auth
import os

# Path to your secret key file
JSON_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'serviceAccountKey.json')

# Initialize Firebase once
if not firebase_admin._apps:
    cred = credentials.Certificate(JSON_PATH)
    firebase_admin.initialize_app(cred)

def verify_firebase_token(token):
    try:
        # Verify the token with Google's servers
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print(f"Error verifying token: {e}")
        return None