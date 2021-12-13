from django.contrib import admin
from django.urls import path, include
from .views import EmployeeView, Logout, EmailSender
from .auth import CustomAuthToken

urlpatterns = [
    # path('admin/', admin.site.urls),
# emp=register
    path('emp', EmployeeView.as_view()),
    path('emplogin', CustomAuthToken.as_view()),
    # path('post/', PostView.as_view()),
    # path('post/<int:id>/', PostView.as_view()),
    # path('dummyposts/', GetPostsList.as_view()),
    # path('dummypostsdetails/<int:id>/', GetPostDetails.as_view()),
    path('logout',Logout.as_view()),
    path('send_mail',EmailSender.as_view())
]