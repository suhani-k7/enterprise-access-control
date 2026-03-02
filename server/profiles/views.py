from rest_framework.views import APIView
from rest_framework.response import Response
from .auth_backend import verify_firebase_token # This is our custom helper
from .models import Profile

class GetUserRole(APIView):
    def post(self, request):
        # 1. Get the token sent by React
        id_token = request.data.get('token')
        
        if not id_token:
            return Response({'error': 'No token provided'}, status=400)

        # 2. Use our Firebase helper to verify the token
        decoded_token = verify_firebase_token(id_token)
        
        if decoded_token:
            uid = decoded_token['uid'] # This is the unique ID from Firebase
            
            try:
                # 3. Look up the user's role in our Django database
                profile = Profile.objects.get(firebase_uid=uid)
                return Response({'role': profile.role})
            except Profile.DoesNotExist:
                return Response({'role': 'No Role Assigned'}, status=404)
        else:
            return Response({'error': 'Invalid or expired token'}, status=403)