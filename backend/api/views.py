from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def dashboard (request):
    return HttpResponse('<H1> Hello World</H1>')
    



