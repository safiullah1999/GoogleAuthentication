from django.db.models import fields
from rest_framework import serializers
from .models import Employee, Post, Logs_table

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields=(
            'post_id',
            'user_id',
            'title',
            'description',
            'date'
        )                

class LogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Logs_table
        fields=(
            'id',
            'username',
            'type',
            'created_at',
            'action'
        )        