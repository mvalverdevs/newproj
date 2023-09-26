import random

from django.db.utils import IntegrityError
from rest_framework.exceptions import ValidationError
from stdnum.es import cif, dni, nie


def generate_random_dni():
    dni_number = ''.join([str(random.randint(0, 9)) for _ in range(8)])
    dni_letter = 'TRWAGMYFPDXBNJZSQVHLCKE'[int(dni_number) % 23]
    return dni_number + dni_letter

random_dni = generate_random_dni()