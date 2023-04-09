from django.db import models
from django.utils.text import slugify
from users.models import CustomUser

class Listing(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    modules_count = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
