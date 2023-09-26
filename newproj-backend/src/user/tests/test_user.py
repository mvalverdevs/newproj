from rest_assured.testcases import (BaseRESTAPITestCase,
                                    CreateAPITestCaseMixin,
                                    ReadRESTAPITestCaseMixin,
                                    UpdateAPITestCaseMixin)
from user import factory


class UserTest(
   BaseRESTAPITestCase,
   CreateAPITestCaseMixin,
   ReadRESTAPITestCaseMixin, # List and detail
   UpdateAPITestCaseMixin
   ):

   base_name = "current:user"
   factory_class = factory.UserFactory
   lookup_field = "id"
   # User for authentication
   user_factory = factory.UserFactory
   create_data = {
      'password': 'PASSWORD',
      'email': 'user@example.com',
      'first_name': 'User',
      'last_name': 'Test',
      'phone': '+34666666666',
      'is_active': True,
      'roles': [
         5, 
      ]
   }
   update_data = {
      'phone': '+34657666666',
   }
