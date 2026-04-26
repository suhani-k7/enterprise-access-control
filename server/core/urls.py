from django.contrib import admin
from django.urls import path
from profiles.views import GetUserRole

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/get-role/', GetUserRole.as_view()), 
]