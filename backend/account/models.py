from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    full_name = models.CharField(max_length=100)
    phone_number = PhoneNumberField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    preferred_language = models.CharField(max_length=20, 
        choices=[
            ('en-US', 'English'),
            ('pt-BR', 'Portuguese'),
            ('es-ES', 'Spanish')
            ],
        default='pt-BR'
    )

    def __str__(self):
        return self.full_name or f"{self.user.first_name} + {self.user.last_name}" 