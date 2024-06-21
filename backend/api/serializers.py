from rest_framework import serializers
from api.models import Card
from django.contrib.auth.models import User

class cardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['subject', 'frontContent', 'backContent', 'owner']

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","email","username", "password"]
        extra_kwargs = {
            "username": {"required": True},
            "password": {"required": True},
            "id": {"read_only": True},
        }
