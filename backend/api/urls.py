from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('createUser/', views.createUser),
    path('verifyUser/', views.verifyUser),
    path('addCard/', views.addCard),
    path('getCards/', views.retrieveCards),
    path('deleteCard/', views.deleteCard),
    path('getResponse/', views.getAIResponse),
]
