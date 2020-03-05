from django.contrib.auth import get_user_model
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Recipe(models.Model):
    RECIPE_TYPE_CHOICES = [
    ('BREAKFAST', 'Breakfast'),
    ('LUNCH', 'Lunch'),
    ('DINNER', 'Dinner'),
    ('DESSERT', 'Dessert'),
]

    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField( upload_to="images/", default='null')
    is_public = models.BooleanField(default=True)
    recipe_type = models.CharField(max_length=100, choices=RECIPE_TYPE_CHOICES, default='')
    # created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    prep_time = models.CharField(max_length=255, default='')
    cook_time = models.CharField(max_length=255, default='')
    cook_temp = models.IntegerField(default=1, validators=[MaxValueValidator(100), MinValueValidator(1)])
    directions = models.TextField(default='')

    def __str__(self):
        return self.title

