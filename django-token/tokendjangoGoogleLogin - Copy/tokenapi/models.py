from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.db.models.deletion import CASCADE
from django.conf import settings

User = settings.AUTH_USER_MODEL

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser
    date_joined = models.DateField(auto_now=True)

    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.

    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin


# other models
class Employee(models.Model):
    id: models.AutoField(
        primary_key=True
    )
    user = models.ForeignKey(User, on_delete=CASCADE)
    gender = models.CharField(max_length=1)
    phonenumber = models.TextField(max_length=200)
    source = models.TextField(max_length=200)
    class Meta:
        db_table = 'emp_reg'

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    title = models.TextField(
        max_length=250,
        null=False,
        blank=False
    )       
    description = models.TextField(
        max_length=250,
        null=False,
        blank=False
    )
    date = models.TextField(
        max_length=50,
        null=False,
        blank=False
    )

    class Meta:
        db_table= 'Post' 

class Logs_table(models.Model):
    id: models.AutoField(
        primary_key=True
    )
    username = models.TextField(max_length=50)
    type = models.TextField(max_length=50)
    created_at = models.TextField(max_length=200)
    action = models.TextField(max_length=200)

    class Meta:
        db_table = 'log_table'

class Service_Status(models.Model):
    id: models.AutoField(
        primary_key=True
    )
    type = models.TextField(max_length=50)
    status = models.TextField(max_length=50)
    
    class Meta:
        db_table = 'service_table'