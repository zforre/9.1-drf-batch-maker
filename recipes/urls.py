from django.urls import path 

from . import views

app_name = 'api_v1'

urlpatterns = [
    path('', views.RecipeList.as_view(), name='recipe_list'),
    path('<int:pk>/', views.RecipeDetail.as_view(), name='recipe_detail'),
]