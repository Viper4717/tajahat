# Generated by Django 3.2.5 on 2022-05-14 18:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_auto_20220515_0024'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='total_quantity',
            new_name='total_amount',
        ),
    ]
