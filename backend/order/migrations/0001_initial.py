# Generated by Django 3.2.5 on 2022-05-12 23:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0005_product_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shipping_address', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=20)),
                ('order_status', models.CharField(choices=[('processing', 'processing'), ('complete', 'complete')], max_length=20)),
                ('confirmation_status', models.BooleanField(default=b'I00\n')),
                ('total_quantity', models.IntegerField()),
                ('total_price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=10)),
                ('price', models.FloatField()),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='order.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
            ],
        ),
    ]
