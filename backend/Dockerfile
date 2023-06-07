# Use the official Python image as the base image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY ./req.txt .

# Install the dependencies
RUN pip install -r req.txt

# Copy the entire backend directory to the working directory in the container
COPY . .

# Expose the port that the Django application will run on
EXPOSE 8000

# Run the Django development server
CMD python manage.py runserver 0.0.0.0:8000
