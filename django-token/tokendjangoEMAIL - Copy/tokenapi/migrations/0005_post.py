# Generated by Django 3.1.3 on 2021-07-09 05:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tokenapi', '0004_auto_20210709_0939'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('post_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.TextField(max_length=250)),
                ('description', models.TextField(max_length=250)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tokenapi.employee')),
            ],
            options={
                'db_table': 'Post',
            },
        ),
    ]
