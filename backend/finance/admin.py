from django.contrib import admin
from .models import (
    Institution,
    BankAccount,
    Category,
    ThirdParty,
    Transactions,
    CreditCardBill,
)


@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'created_at', 'updated_at')
    list_filter = ('active',)
    search_fields = ('name',)


@admin.register(BankAccount)
class BankAccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'institution')
    list_filter = ('institution',)
    search_fields = ('user__username', 'institution__name')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'balance_type', 'color')
    list_filter = ('balance_type',)
    search_fields = ('name', 'user__username')


@admin.register(ThirdParty)
class ThirdPartyAdmin(admin.ModelAdmin):
    list_display = ('name', 'relation', 'user')
    search_fields = ('name', 'relation', 'user__username')


@admin.register(Transactions)
class TransactionsAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'amount', 'transactions_type', 'date', 'payment_method', 'category', 'bank', 'third_party', 'active')
    list_filter = ('transactions_type', 'payment_method', 'date', 'category', 'active')
    search_fields = ('name', 'description', 'user__username')


@admin.register(CreditCardBill)
class CreditCardBillAdmin(admin.ModelAdmin):
    list_display = ('user', 'bank', 'start_date', 'maturity_date', 'status')
    list_filter = ('status', 'start_date', 'maturity_date')
    search_fields = ('user__username', 'bank__institution__name')
