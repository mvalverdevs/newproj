import datetime
import random

import factory
from django.utils import timezone
from faker import Faker
from user import choices as user_choices
from user import models as user_models

fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = user_models.User

    username = factory.LazyAttribute(lambda _: fake.unique.user_name())
    email = factory.LazyAttribute(lambda _: fake.email())
    password = factory.LazyAttribute(lambda _: "NOT USED")
    first_name = factory.LazyAttribute(lambda _: fake.first_name())
    last_name = factory.LazyAttribute(lambda _: fake.last_name())
    phone = factory.LazyAttribute(lambda _: fake.phone_number()[:16])
    mobile_phone = factory.LazyAttribute(lambda _: fake.phone_number()[:16])
    department = factory.LazyAttribute(lambda _: fake.word())
    charge = factory.LazyAttribute(lambda _: fake.job())
    registration_number = factory.LazyAttribute(lambda _: fake.unique.random_int(min=1000, max=9999))
    is_inspector = factory.LazyAttribute(lambda _: random.choice([True, False]))
    is_active = factory.LazyAttribute(lambda _: True)
    weekly_inspections = factory.LazyAttribute(lambda _: random.randint(0, 10))
    company_name = factory.LazyAttribute(lambda _: fake.company())
    date_joined = factory.LazyAttribute(lambda _: fake.date_time_between(
        start_date='-1y',
        end_date='now',
        tzinfo=datetime.timezone.utc
    ))

    @factory.post_generation
    def roles(self, create, extracted, **kwargs):
        if not create:
            # Simple build, do nothing.
            return

        super_admin_role = user_models.UserRoles.objects.get(role=user_choices.ROLE_SUPERADMIN_KEY)
        self.roles.add(super_admin_role)
