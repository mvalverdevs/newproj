FROM python:3.11-bullseye

ENV PYTHONUNBUFFERED 1

# Install Debian packages
RUN apt update && apt install -y \
    gettext \
    netcat

# Install Django requirements
COPY ./requirements/* ./
RUN pip install --upgrade pip==23.1.2 && pip install --no-cache-dir -r requirements.txt -r dev.txt

# Workdir
WORKDIR /app

# Entrypoint
COPY ./compose/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

ENTRYPOINT ["/entrypoint"]