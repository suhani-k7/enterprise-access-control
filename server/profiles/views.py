from rest_framework.views import APIView
from rest_framework.response import Response
from .auth_backend import verify_firebase_token
from .models import Profile
from .roles import ROLE_MAP


class GetUserRole(APIView):

    def post(self, request):

        # 1. Get token from React
        id_token = request.data.get('token')

        if not id_token:
            return Response(
                {'error': 'No token provided'},
                status=400
            )

        # 2. Verify Firebase token
        decoded_token = verify_firebase_token(id_token)

        if decoded_token:

            uid = decoded_token['uid']
            email = decoded_token.get('email')

            try:
                # 3. Find existing profile
                profile = Profile.objects.get(firebase_uid=uid)

            except Profile.DoesNotExist:

                # 4. Assign role from ROLE_MAP
                role = ROLE_MAP.get(uid, "Employee")
                
                # 5. Create new profile
                profile = Profile.objects.create(
                    firebase_uid=uid,
                    role=role
                )

            # 6. Send response back to React
            return Response({
                "role": profile.role,
                "email": email
            })

        else:
            return Response(
                {'error': 'Invalid or expired token'},
                status=403
            )