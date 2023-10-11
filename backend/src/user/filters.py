import django_filters
import user.models as user_models


class UserFilter(django_filters.FilterSet):

    roles = django_filters.Filter(method="filter_roles")

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'phone',
            'is_active',
            'roles',
        )

    def filter_roles(self, queryset, name, value):
        roles = value.split(',')
        return queryset.filter(roles__in=roles)
