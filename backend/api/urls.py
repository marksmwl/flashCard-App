from django.urls import path, include
from . import views

urlpatterns = [
    path('createUser/', views.createUser),
    path('verifyUser/', views.verifyUser),
    path('addCard/', views.addCard),
]
