# Generated by Django 5.2 on 2025-05-19 04:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0003_alter_creditcardbill_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bankaccount',
            old_name='profile_id',
            new_name='profile',
        ),
    ]
