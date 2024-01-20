from django.contrib import admin
from chat.models import Message, Chat


class MessageAdmin(admin.ModelAdmin):
    fields = ("chat", "text", "created_at", "author", "receiver")
    list_display = (
        "created_at",
        "author",
        "receiver",
        "text",
    )
    search_fields = ("text",)


admin.site.register(Message, MessageAdmin)
admin.site.register(Chat)
