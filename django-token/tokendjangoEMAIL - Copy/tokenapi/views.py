from django.shortcuts import render
from rest_framework import serializers
from .serializer import EmployeeSerializer, PostSerializer
from .models import Employee, Post
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
import requests
from django.core.mail import send_mail
from django.template.loader import render_to_string

# https://data-flair.training/blogs/django-send-email/

class EmailSender(APIView):
    def post(self, request, format=None):
        send_mail(
        subject=request.data.get('subject'),
        message='Registration',
        # request.data.get('body'),
        from_email='safiullahsk1999@gmail.com',
        recipient_list=[request.data.get('to')],
        html_message=request.data.get('body'),
        fail_silently=False,
        )
        return Response({"status": "Email Send successfully"},status=status.HTTP_200_OK)


class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

# Create your views here.
class EmployeeView(APIView):
    def post(self, request, format=None):        
        user = User.objects.create_user(
            username = request.data.get("username"),
            first_name = request.data.get("fName"),
            last_name = request.data.get("lName"),
            password = request.data.get("pass"),
            email = request.data.get("email"),
        )
        print(request.data)
        # user_id = User.objects.get(username = user)
        # user_id = 
        # print(user.id, "uuu")
        gender = request.data.get("gender")
        phonenumber = request.data.get("phone")
        empp = EmployeeSerializer(data={"user":user.id, "gender": gender, "phonenumber": phonenumber})
        # Employee.objects.create(user = user, gender = gender, phonenumber = phonenumber)
        if empp.is_valid():
            # print(empp.data)
            empp.save()
            return Response({"status": "check data in console"})
        # return Response(empp.errors, status=status.HTTP_400_BAD_REQUEST)

# {
#         "username":"username4",
#         "pass": "password4",
#         "fName": "user",
#         "lName": "4",
#         "email": "user4@gmail.com",
#         "gender": "M",
#         "phone": "010101010"
# }

# class PostView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
#     throttle_classes = [UserRateThrottle]
#     def get(self, request, id=None):
#         if id:
#             try:
#                 queryset = Post.objects.filter(user_id=self.request.user.id)
#             except Post.DoesNotExist:
#                 return Response({'errors' : 'This Post does not exist'}, status=status.HTTP_400_BAD_REQUEST)

#             read_PostSerializer = PostSerializer(queryset, many = True)        
#         else:
#             queryset = Post.objects.all()
#             read_PostSerializer = PostSerializer(queryset, many = True)
#         return Response(read_PostSerializer.data)

#     def post(self, request):
#         print("request.data:",request.data,self.request.user.id)
#         userObject = Employee.objects.get(user_id=self.request.user.id)
#         userObject = EmployeeSerializer(userObject)
#         print(userObject.data.get('id'))
#         data = request.data
#         data['user_id'] = userObject.data.get('id')
#         # Post_object = PostSerializer(data = data)
#         create_PostSerializer = PostSerializer(data=data)
#         if create_PostSerializer.is_valid():
#             Post_object = create_PostSerializer.save()
#             read_PostSerializer = PostSerializer(Post_object)
#             return Response(read_PostSerializer.data,status=status.HTTP_201_CREATED)
#         return Response(create_PostSerializer.errors, status=status.HTTP_400_BAD_REQUEST)   

#     # def post(self, request):
#     #     create_PostSerializer = PostSerializer(data=request.data)
#     #     if create_PostSerializer.is_valid():
#     #         Post_object = create_PostSerializer.save()
#     #         read_PostSerializer = PostSerializer(Post_object)
#     #         return Response(read_PostSerializer.data,status=status.HTTP_201_CREATED)
#     #     return Response(create_PostSerializer.errors, status=status.HTTP_400_BAD_REQUEST)   

# # {
# #         "user_id":5,
# #         "title": "1",
# #         "description": "user id 5 first post"
# # }


#     def put(self, request, id=None):
#         try:
#             Post_data_from_Db = Post.objects.get(post_id=id)
#         except Post.DoesNotExist:
#             return Response({'errors' : 'This Post does not exist'}, status=status.HTTP_400_BAD_REQUEST)    
#         update_PostSerializer = PostSerializer(Post_data_from_Db, data=request.data)

#         if update_PostSerializer.is_valid():
#             Post_object=update_PostSerializer.save()
#             read_PostSerializer = PostSerializer(Post_object)

#             return Response(read_PostSerializer.data, status=status.HTTP_200_OK)
#         return Response(update_PostSerializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
#     def patch(self, request, id=None):
#         try:
#             Post_data_from_Db = Post.objects.get(post_id=id)
#         except Post.DoesNotExist:
#             return Response({'errors' : 'This Post does not exist'}, status=status.HTTP_400_BAD_REQUEST)    
#         update_PostSerializer = PostSerializer(Post_data_from_Db,data=request.data, partial=True)

#         if update_PostSerializer.is_valid():
#             Post_object=update_PostSerializer.save()
#             read_PostSerializer = PostSerializer(Post_object)

#             return Response(read_PostSerializer.data, status=status.HTTP_200_OK)
#         return Response(update_PostSerializer.errors, status=status.HTTP_400_BAD_REQUEST)    
        
#     def delete(self, request, id=None):
#         try:
#             Post_Data_from_Db = Post.objects.get(post_id=id)
#         except Post.DoesNotExist:  
#             return Response({'errors' : 'This Post does not exist'}, status=status.HTTP_400_BAD_REQUEST)      

#         Post_Data_from_Db.delete()    
#         return Response({'Post successfully deleted'}, status=status.HTTP_204_NO_CONTENT)



