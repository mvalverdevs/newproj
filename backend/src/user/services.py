import datetime


class UserService:

    def __init__(self, user):
        self.instance = user

    def deactivate_user(self):
        self.instance.is_active = False
        self.instance.deactivation_datetime = datetime.datetime.now()
        self.instance.save()

    def activate_user(self):
        self.instance.is_active = True
        self.instance.deactivation_datetime = None
        self.instance.save()
