# Generated by Django 3.2.5 on 2022-05-12 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Availability',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
    ]
