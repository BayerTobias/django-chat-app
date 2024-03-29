from django.http import HttpResponseRedirect
from django.shortcuts import render
from chat.models import Chat, Message
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core import serializers
from django.http import JsonResponse


@login_required(login_url="/login/")
def index(request):
    myChat, created = Chat.objects.get_or_create()
    if request.method == "POST":
        newMessage = Message.objects.create(
            text=request.POST["textmessage"],
            author=request.user,
            receiver=request.user,
            chat=myChat,
        )

        messageAsJson = serializers.serialize("json", [newMessage])
        return JsonResponse(messageAsJson[1:-1], safe=False)

    chatMessages = Message.objects.filter(chat__id=myChat.id)
    return render(request, "chat/index.html", {"messages": chatMessages})


def login_page(request):
    if request.method == "POST":
        user = authenticate(
            username=request.POST.get("username"), password=request.POST.get("password")
        )
        print("User IS:", user)

        if user:
            login(request, user)
            return HttpResponseRedirect("/chat/")
        else:
            return render(request, "chat/auth/login.html", {"wrongPassword": True})

    return render(request, "chat/auth/login.html")


def register_page(request):
    if request.method == "POST":
        user = User.objects.create_user(
            username=request.POST.get("username"),
            email=request.POST.get("email"),
            password=request.POST.get("password"),
        )
        if user:
            return HttpResponseRedirect("/login/")

    return render(request, "chat/auth/register.html")


def logout_user(request):
    logout(request)
    return HttpResponseRedirect("/login/")
