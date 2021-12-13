import datetime
from functools import partial
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import serializers
from .serializer import EmployeeSerializer, PostSerializer, ServiceSerializer
from .models import Employee, Post, Logs_table, Service_Status
from rest_framework.views import APIView
# from django.contrib.auth.models import User, UserManager
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle
import requests
# from django.template.loader import render_to_string
# from django.conf import settings
# User = settings.AUTH_USER_MODEL
from django.contrib.auth import get_user_model
User = get_user_model()

def getHtml():
        return """
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,700,700i" rel="stylesheet" />

    <style type="text/css" media="screen">
        /* Linked Styles */
        body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#001736; -webkit-text-size-adjust:none }
        a { color:#66c7ff; text-decoration:none }
        p { padding:0 !important; margin:0 !important } 
        img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
        .mcnPreviewText { display: none !important; }

        .cke_editable,
        .cke_editable a,
        .cke_editable span,
        .cke_editable a span { color: #000001 !important; }		
        /* Mobile styles */
        @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
            .mobile-shell { width: 100% !important; min-width: 100% !important; }
            
            .text-header,
            .m-center { text-align: center !important; }
            
            .center { margin: 0 auto !important; }
            .container { padding: 20px 10px !important }
            
            .td { width: 100% !important; min-width: 100% !important; }

            .m-br-15 { height: 15px !important; }
            .p30-15 { padding: 30px 15px !important; }

            .m-td,
            .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

            .m-block { display: block !important; }

            .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

            .column,
            .column-top,
            .column-empty,
            .column-empty2,
            .column-dir-top { float: left !important; width: 100% !important; display: block !important; }

            .column-empty { padding-bottom: 10px !important; }
            .column-empty2 { padding-bottom: 30px !important; }

            .content-spacing { width: 15px !important; }
        }
    </style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#001736; -webkit-text-size-adjust:none;">
        <span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000000">
        <tr>
            <td align="center" valign="top">
                <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                    <tr>
                        <td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
                            <!-- Intro -->
                            <div mc:repeatable="Select" mc:variant="Intro">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td style="padding-bottom: 10px;">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td class="tbrr p30-15" style="padding: 60px 30px; border-radius:26px 26px 0px 0px;" bgcolor="#000000">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td class="h1 pb25" style="color:#ffffff; font-family:'Muli', Arial,sans-serif; font-size:40px; line-height:46px; text-align:center; padding-bottom:25px;"><div mc:edit="text_2">Registration successfull</div></td>
                                                            </tr>
                                                            <tr>
                                                                <td class="text-center pb25" style="color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:16px; line-height:30px; text-align:center; padding-bottom:25px;"><div mc:edit="text_3">Congratulations and welcome to the team! We are excited to have you at Rapid Compute. We know you're going to be a valuable asset to our company and are looking forward to the positive impact you're going to have here.</div></td>
                                                            </tr>
                                                            <!-- Button -->
                                                            <tr mc:hideable>
                                                                <td align="center">
                                                                    <table class="center" border="0" cellspacing="0" cellpadding="0" style="text-align:center;">
                                                                        <tr>
                                                                            <td class="pink-button text-button" style="background:#ff6666; color:#c1cddc; font-family:'Muli', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:0px 22px 22px 22px; font-weight:bold;"><div mc:edit="text_4"><a href="http://localhost:3000/login_val" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Click To Login</span></a></div></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <!-- END Button -->
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!-- END Intro -->

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    """


class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

# Create your views here.
class ServiceView(APIView):
    def get(self, request, type=None, format=None):
        try:
            Serviceobj = Service_Status.objects.get(type=type)
        except Service_Status.DoesNotExist:
            return Response({'errors' : 'This Status does not exist'}, status=status.HTTP_400_BAD_REQUEST)    
        
        # Serviceobj = Service_Status.objects.get(type=request.data.get('type'))
        print(Serviceobj.status)
        # return JsonResponse({Serviceobj})
        return Response({Serviceobj.status})

    def post(self, request, format=None):
        service_body = {"type":request.data.get('type'), "status":request.data.get('status')}
        service_serialize = ServiceSerializer(data=service_body)
        if service_serialize.is_valid():
            service_serialize.save()
            print("service inserted")
            return Response({"status": "Service inserted"})
        return Response({"error": "Service not inserted"})               

    def patch(self, request, type=None, format=None):
        try:
            Status_from_Db = Service_Status.objects.get(type=type)
        except Service_Status.DoesNotExist:
            return Response({'errors' : 'This Status does not exist'}, status=status.HTTP_400_BAD_REQUEST)    
        update_ServiceSerializer = ServiceSerializer(Status_from_Db, data=request.data, partial=True)

        if update_ServiceSerializer.is_valid():
            Service_object=update_ServiceSerializer.save()
            read_ServiceSerializer = ServiceSerializer(Service_object)

            return Response(read_ServiceSerializer.data, status=status.HTTP_200_OK)
        return Response(update_ServiceSerializer.errors, status=status.HTTP_400_BAD_REQUEST)    

class EmployeeView(APIView):
    def post(self, request, format=None):  
        print(request.data)      
        try:
            if(User.objects.get(email=request.data.get("email"))):
                userObject = User.objects.get(email=request.data.get("email"))
                if(userObject.email == request.data.get("email")):
                    return Response({"error":"Email already registered with another Provider."})    
        except User.DoesNotExist:
            print("user does not exists")
        # print(userObject)
        # for user in userObject:
        #     print(user.email)
        # return Response({"userObject"})
        # userObject = EmployeeSerializer(userObject)

        user = User.objects.create_user(
            # username = request.data.get("username"),
            # first_name = request.data.get("fname"),
            # last_name = request.data.get("lname"),
            email = request.data.get("email"),
            password = request.data.get("email"),
            # staff = 1
        )
        source = request.data.get("source")
        gender = "M"
        phonenumber = "0123456789"
        empp = EmployeeSerializer(data={"user":user.id, "gender": gender, "phonenumber": phonenumber, "source":source})
        if empp.is_valid():
            # print(empp.data)
            empp.save()
            url = 'http://127.0.0.1:8006/send_mail'
            data = {
                "to": "safiullahsk1999@gmail.com",
                "subject": "Registration Status",
                "body": getHtml()
            }
            
            req = requests.post(url, data = data)
            if req.status_code == 200:
                print("email send successfully.")
            else:
                print("email was not send")
            return Response({"status": "check data in console"})
        return Response({"error":"registeration failed."})
    
    # def get(self, request, format=None):
    #     request.user.auth_token.delete()
    #     return Response(status=status.HTTP_200_OK)
    def get(self, request, format=None):
            # request.user.auth_token.delete()
        return Response(data="service available",status=status.HTTP_200_OK)
