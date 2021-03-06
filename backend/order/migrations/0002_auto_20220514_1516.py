# Generated by Django 3.2.5 on 2022-05-14 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='name',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='transaction_id',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='confirmation_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('processing', 'processing'), ('complete', 'complete')], default='processing', max_length=20),
        ),
    ]
