# Generated by Django 3.2.5 on 2022-05-15 19:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0007_auto_20220515_0111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 5, 16, 1, 46, 32, 474036)),
        ),
    ]
