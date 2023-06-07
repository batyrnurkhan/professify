# Use the official Python image as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY req.txt .

# Install the Python dependencies
RUN pip install -r req.txt

# Copy the backend code to the container
COPY . .

# Expose the port on which the Django application will run (change it if needed)
EXPOSE 8000

# Set the environment variables (replace them with your own if needed)
ENV DJANGO_SECRET_KEY="django-insecure-8kq^e@^v1qf1^)r*fg#!e8=1&0ot#@@g^f^&w$8jceyz#y8ycu"
ENV DJANGO_SETTINGS_MODULE="backend.settings.production"

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
