from django.apps import AppConfig


class AccountConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'account'

    def ready(self):
        # Import signals to ensure they are registered when app is ready
        try:
            import account.signals  # noqa: F401
        except Exception:
            # Avoid raising errors during migrations/initial setup if signals file isn't importable
            pass
