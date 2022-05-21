from typing import List
from django.urls import path
from product import views
from .views import OrderView, OrderItemView, OrderTrackView

urlpatterns = [
    path('',OrderView.as_view(),name='order'),
    path('track/', OrderTrackView.as_view(), name= 'order_track')
]