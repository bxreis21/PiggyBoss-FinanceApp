from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'institution', InstitutionViewSet)
router.register(r'bank-account', BankAccountViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'third-party', ThirdPartyViewSet)
router.register(r'transaction', TransactionViewSet)
router.register(r'credit-card-bill', CreditCardBillViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
