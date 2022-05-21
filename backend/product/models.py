from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
#types of mango
TYPE_CHOICES=[
    ('Lengra','Lengra'),
    ('Fazli','Fazli'),
    ('Lokkhonbhog','Lokkhonbhog'),
    ('Aamrupali','Aamrupali'),
    ('Khirshapat','Khirshapat'),
    ('Gopalbhog','Gopalbhog'),
    ('Kalibhog','Kalibhog'),
    ('Mohonbhog','Mohonbhog'),
    ('Guti','Guti'),
    ('Ashwina','Ashwina'),
]
#models for product
class Product(models.Model):

    name= models.CharField(max_length=20, choices=TYPE_CHOICES, default='Lengra')
    quantity= models.IntegerField()
    price= models.IntegerField()
    img= models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.name
