from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import User, Card
from api.serializers import userSerializer, cardSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
import google.generativeai as genai
from dotenv import load_dotenv
import os, sys
sys.setrecursionlimit(10000)
load_dotenv('C:\\Users\\merke\\OneDrive\\Desktop\\programming\\Python\\myMovieProject\\backend\\api\\.env')

@api_view(['POST'])
def getAIResponse(request):
    genai.configure(api_key=os.environ["KEY"])
    user = get_object_or_404(User, username=request.data['username'])
    try:
        sameSubjectCards = Card.objects.filter(owner=user.id, subject=request.data['subject'])
    except:
        pass    
    # The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    model = genai.GenerativeModel('gemini-1.5-flash')
    questionResponse = model.generate_content("I am going to specify a subject, you are to reply to me with a question pertaining to the subject. This question is intended to help someone understand some fundamental concept about this subject to better understand that concept. Try to make it concise, but still aimed at prompting this person in a well structured way for them to think about that important concept to get them thinking about what its answer might be. Finally, it is important that you do not ask any of these following questions: {}. The subject is: {}".format(sameSubjectCards, request.data['context']))
    answerResponse = model.generate_content("I am going to specify a question, you are to reply to me with a concise and well structured answer but please ensure it is no more than 300 characters, however . This answer should provide a clear answer to the question, allowing even someone who has no clue what the answer to the question is or what process to follow to obtain that answer the opportunity to learn about why the answer is what it is and hopefully learn how to answer the question if they were asked it by someone else. The question is: {}".format(questionResponse.text))

    card = {
        "subject":request.data['subject'],
        "owner": user.id,
        "frontContent": questionResponse.text,
        "backContent": answerResponse.text,
    }

    serializer = cardSerializer(data=card)
    if (serializer.is_valid()):
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# api to create a user
@api_view(['POST'])
def createUser(request):
    print(request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response(status=409)
    else:
        # Create the user
        User.objects.create_user(username=username, password=password)
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()

        return Response(status=status.HTTP_201_CREATED)
    

# api to verify if a user is valid & grant them a token if they are.
@api_view(['POST'])
def verifyUser(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_200_OK)

# api to add a card.
@api_view(['POST'])
def addCard(request):
    result = get_object_or_404(User, username=request.data['owner'])
    if (result):
        request.data['owner'] = result.id
        serializer = cardSerializer(data=request.data)
        if (serializer.is_valid() and not Card.objects.filter(frontContent=request.data['frontContent'],owner=result.id).exists()):
            serializer.save()
            return Response(status=200)
        else:
            return Response(status=400)
    else:
        return Response(status=401)

@api_view(['POST'])
def retrieveCards(request):
    result = get_object_or_404(User, username=request.data['username'])
    if (result):
        userID = result.id
        usersCards = Card.objects.filter(owner=userID)
        cardsJSON = []
        for card in usersCards:
            serializer = cardSerializer(card)
            cardsJSON.append(serializer.data)
        cardsJSON = json.dumps(cardsJSON)
        return Response({'cards':cardsJSON}, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def deleteCard(request):
    try:
        result = get_object_or_404(User, username=request.data['username'])
        cardToDelete = get_object_or_404(Card, frontContent=request.data['frontContent'], owner=result.id)
        cardToDelete.delete()
    except:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    return Response(status=status.HTTP_200_OK)