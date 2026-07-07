from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset
    
class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BankAccount.objects.filter(user=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

class ThirdPartyViewSet(viewsets.ModelViewSet):
    queryset = ThirdParty.objects.all()
    serializer_class = ThirdPartySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ThirdParty.objects.filter(user=self.request.user)

class TransactionsViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all()
    serializer_class = TransactionsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transactions.objects.filter(user=self.request.user)

class CreditCardBillViewSet(viewsets.ModelViewSet):
    queryset = CreditCardBill.objects.all()
    serializer_class = CreditCardBillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditCardBill.objects.filter(user=self.request.user)
