# Generated by Django 3.2.5 on 2022-05-15 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_alter_product_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(choices=[('lengra', 'Lengra'), ('fojli', 'Fojli'), ('himshangar', 'Himshagor'), ('aamruplai', 'Aamrupali'), ('khirshapat', 'Khirshapat'), ('gopalbhog', 'Gopalvog'), ('kalivog', 'Kalivog'), ('mohonvog', 'Mohonvog'), ('harivanga', 'Hariavanga'), ('ashwina', 'Ashwina')], default='Lengra', max_length=20),
        ),
    ]
