from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    # This links the Django user to a Role
    ROLE_CHOICES = [
        ('CEO', 'CEO'),
        ('Manager', 'Manager'),
        ('Employee', 'Employee'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firebase_uid = models.CharField(max_length=255, unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Employee')

    def __str__(self):
        return f"{self.user.email} - {self.role}"