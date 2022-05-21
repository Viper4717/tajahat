from itertools import product
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .models import Product
from .serializer import ProductSerializer
from rest_framework.permissions import IsAdminUser

# Create your views here.
class ListProduct(APIView):

    # permission_classes = [IsAdminUser]

    def get(self,request,format=None):
        products=Product.objects.all()
        serializer=ProductSerializer(products, many=True)
        return Response(serializer.data)
        