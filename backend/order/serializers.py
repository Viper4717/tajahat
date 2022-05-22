from dataclasses import field
from rest_framework import serializers
from .models import *
from product.serializer import *

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    #order_id = OrderSerializer()
    product = ProductSerializer() 
    
    class Meta:
        model = OrderItem
        fields = ['product', 'amount']

class OrderTrackSerializer(serializers.ModelSerializer):
    order_item = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['name', 'phone', 'address', 'order_status', 'total_price', 'order_item']
    
    def get_order_item(self, obj):
        orderItems = obj.orderitem_set.all()
        orderItem_serializer = OrderItemSerializer(orderItems, many=True).data
        return orderItem_serializer