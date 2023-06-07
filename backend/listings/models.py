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
    picture = models.ImageField(upload_to='listings/', null=True, blank=True, default='listings/free-icon-online-learning-2436874.png')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def author_email(self):
        return self.author.email

    def __str__(self):
        return self.name
