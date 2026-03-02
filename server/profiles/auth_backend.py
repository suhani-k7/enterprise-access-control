import firebase_admin
from firebase_admin import credentials, auth
from django.contrib.auth.models import User
from .models import Profile
import os

# Path to your JSON file
JSON_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'serviceAccountKey.json')

# Initialize Firebase Admin
if not firebase_admin._apps:
    cred = credentials.Certificate(JSON_PATH)
    firebase_admin.initialize_app(cred)

def verify_firebase_token(id_token):
    try:
        # 1. Check if token is valid with Firebase
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        email = decoded_token.get('email')

        # 2. Find or create the User in Django
        user, created = User.objects.get_or_create(username=email, email=email)
        
        # 3. Get the Profile (where the Role is stored)
        profile, _ = Profile.objects.get_or_create(user=user, firebase_uid=uid)
        
        return profile
    except Exception as e:
        print("Firebase Auth Error:", e)
        return None