from django.contrib import admin
from chat.models import Message


class MessageAdmin(admin.ModelAdmin):
    fields = ("text", "created_at", "author", "receiver")
    list_display = (
        "created_at",
        "author",
        "receiver",
        "text",
    )
    search_fields = ("text",)


admin.site.register(Message, MessageAdmin)
