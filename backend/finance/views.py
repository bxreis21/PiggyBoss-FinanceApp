from django.db.models import Q
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Institution.objects.filter(
            Q(user=self.request.user) | Q(user__isnull=True)
        )
    
class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BankAccount.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return BankAccountReadSerializer

        return BankAccountWriteSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(
            Q(user=self.request.user) | Q(user__isnull=True)
        )

class ThirdPartyViewSet(viewsets.ModelViewSet):
    queryset = ThirdParty.objects.all()
    serializer_class = ThirdPartySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ThirdParty.objects.filter(user=self.request.user)

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

class CreditCardBillViewSet(viewsets.ModelViewSet):
    queryset = CreditCardBill.objects.all()
    serializer_class = CreditCardBillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditCardBill.objects.filter(user=self.request.user)
