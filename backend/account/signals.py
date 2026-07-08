from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Ensure a Profile exists for each new User."""
    if created:
        # Use get_or_create to avoid race conditions or duplicate attempts
        full_name = f"{instance.first_name} {instance.last_name}".strip()
        Profile.objects.get_or_create(user=instance, defaults={
            'full_name': full_name or instance.username
        })


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Save the related profile when the user is saved (no-op if profile doesn't exist)."""
    try:
        if hasattr(instance, 'profile'):
            instance.profile.save()
    except Exception:
        # Silently ignore during migrations or if profile is missing
        pass
