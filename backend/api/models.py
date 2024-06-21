from django.db import models
from django.contrib.auth.models import User

# # Create your models here.
# class User(models.Model):
#     username = models.CharField(max_length=30)
#     password = models.CharField(max_length=30)
#     email = models.CharField(max_length=50)

#     def __str__(self):
#         return self.username


class Card(models.Model):
    subject = models.CharField(max_length=50)
    frontContent = models.CharField(max_length=500)
    backContent = models.CharField(max_length=500)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.frontContent 