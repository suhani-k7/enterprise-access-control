from django.contrib import admin
from django.urls import path
from profiles.views import GetUserRole # Make sure this import is here!

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/get-role/', GetUserRole.as_view()), # <--- Check this line for typos!
]