from rest_framework import serializers
from api.models import User, Card

class cardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email","username", "password"]