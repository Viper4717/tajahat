from collections import _OrderedDictItemsView
from http.client import ImproperConnectionState
from itertools import product
from typing import OrderedDict
from xml.etree.ElementInclude import default_loader
from django.db import models
from pytz import timezone
from product.models import Product
import datetime
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_delete
from product.models import Product

# Create your models here.

STATUS=[
    ('Processing','Processing'),
    ('Shipping','Shipping'),
    ('Delivered','Delivered'),
]



class Order(models.Model):
    name = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    order_status = models.CharField(max_length = 20,choices=STATUS, default='Processing')
    confirmation_status = models.BooleanField(default=False)
    total_amount = models.IntegerField(default=20)
    total_price = models.FloatField()
    transaction_id = models.CharField(max_length=20 , null=False)
    date = models.DateTimeField(blank=True, default = timezone.now)

    def __str__(self):
        return self.name+" "+self.phone


class OrderItem(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.IntegerField(default=10)
    price = models.FloatField()    

    def __str__(self):
        return str(self.order_id.id)
    

@receiver(post_delete, sender= OrderItem)
def update_product_quantity(sender, **kwargs):
    order_item = kwargs['instance']
    product = Product.objects.get(id = order_item.product.id)
    if(order_item.order_id.confirmation_status == False):
        product.quantity = product.quantity + order_item.amount
        product.save()