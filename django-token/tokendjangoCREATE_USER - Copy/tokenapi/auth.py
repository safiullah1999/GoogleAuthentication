from rest_framework.authtoken.views import ObtainAuthToken
from .serializer import EmployeeSerializer, PostSerializer, LogSerializer
from .models import Employee, Post, Logs_table
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
import requests
import datetime
from django.template.loader import render_to_string
from django.template import Context
# from rest_framework_tracking.mixins import LoggingMixin

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
																<td class="h1 pb25" style="color:#ffffff; font-family:'Muli', Arial,sans-serif; font-size:40px; line-height:46px; text-align:center; padding-bottom:25px;"><div mc:edit="text_2">Login successfull</div></td>
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

class CustomAuthToken(ObtainAuthToken):
    throttle_classes = [UserRateThrottle, AnonRateThrottle]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        #log table entry
        
        typeOf = ''
        if serializer.is_valid():
            typeOf = 'success'
        else:
            typeOf = 'error'    
        date_time = str(datetime.datetime.now())

        Log_body = {"username":user.email, "type": typeOf, "created_at": date_time, "action":"LoggedIn"}
        Log_serialize = LogSerializer(data=Log_body)
        if Log_serialize.is_valid():
            Log_serialize.save()
            print("Login Log saved")

		#email sender
        # c = Context({'username': user.username}) 
        url = 'http://127.0.0.1:8006/send_mail'
        data = {
            "to": "safiullahsk1999@gmail.com",
            "subject": "Login Status",
            "body": getHtml()
        }

        req = requests.post(url, data = data)
        if req.status_code == 200:
            print("email send successfully.")
        else:
            print("email was not send")    

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })