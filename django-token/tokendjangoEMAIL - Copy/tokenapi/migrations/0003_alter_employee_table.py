# Generated by Django 3.2.5 on 2021-07-08 08:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tokenapi', '0002_employee_gender'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='employee',
            table='emp_reg',
        ),
    ]
