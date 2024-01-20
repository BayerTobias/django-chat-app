from django.http import HttpResponseRedirect
from django.shortcuts import render
from chat.models import Chat, Message
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required


@login_required(login_url="/login/")
def index(request):
    if request.method == "POST":
        print(request.POST["textmessage"])
        myChat = Chat.objects.get(id=1)
        Message.objects.create(
            text=request.POST["textmessage"],
            author=request.user,
            receiver=request.user,
            chat=myChat,
        )
    chatMessages = Message.objects.filter(chat__id=1)
    return render(request, "chat/index.html", {"messages": chatMessages})


def loginPage(request):
    if request.method == "POST":
        user = authenticate(
            username=request.POST.get("username"), password=request.POST.get("password")
        )

        if user:
            login(request, user)
            return HttpResponseRedirect("/chat/")
        else:
            return render(request, "chat/login.html", {"wrongPassword": True})

    return render(request, "chat/login.html")
