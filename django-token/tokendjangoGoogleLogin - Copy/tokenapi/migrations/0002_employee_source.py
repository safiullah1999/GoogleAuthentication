# Generated by Django 3.1.3 on 2021-08-23 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tokenapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='source',
            field=models.TextField(default='', max_length=200),
            preserve_default=False,
        ),
    ]