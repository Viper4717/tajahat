# Generated by Django 4.0.4 on 2022-05-21 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_alter_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(choices=[('Lengra', 'Lengra'), ('Fazli', 'Fazli'), ('Lokkhonbhog', 'Lokkhonbhog'), ('Aamrupali', 'Aamrupali'), ('Khirshapat', 'Khirshapat'), ('Gopalbhog', 'Gopalbhog'), ('Kalibhog', 'Kalibhog'), ('Mohonbhog', 'Mohonbhog'), ('Guti', 'Guti'), ('Ashwina', 'Ashwina')], default='Lengra', max_length=20),
        ),
    ]
