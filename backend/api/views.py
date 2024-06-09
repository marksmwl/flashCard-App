from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import User, Card
from api.serializers import userSerializer, cardSerializer
# Create your views here.

# api to create a user
@api_view(['POST'])
def createUser(request):
    serializer = userSerializer(data=request.data)
    if (serializer.is_valid()):
        serializer.save()
    return Response(status=200)

# api to verify if a user is valid
@api_view(['POST'])
def verifyUser(request):
    serializer = userSerializer(data=request.data)
    if (serializer.is_valid()):
        result = User.objects.filter(username=serializer.data['username'],password=serializer.data['password'])
        if (len(result) >= 1):
            return Response(200)
        else:
            return Response(401)
    else:
        return Response(status=400)

@api_view(['POST'])
def addCard(request):
    result = User.objects.get(username=request.data['owner'])
    if (result):
        request.data['owner'] = result.id
        serializer = cardSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(status=200)
        else:
            return Response(status=400)
    else:
        return Response(status=401)