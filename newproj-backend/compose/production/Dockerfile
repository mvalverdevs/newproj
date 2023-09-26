ARG PYTHON_IMAGE=python:3.11-bullseye
ARG LOCALE=ca_ES.UTF-8
ARG TIMEZONE=Europe/Madrid

FROM $PYTHON_IMAGE AS compile-image
ARG LOCALE
ARG TIMEZONE

RUN apt update && apt install -y --no-install-recommends \
    locales \
    && rm -rf /var/lib/apt/lists/*

# Compile locales
RUN sed -i -e "s/# $LOCALE/$LOCALE/" /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=$LOCALE

# Create virtual environment
RUN pip install --upgrade pip==23.1.2 && pip install virtualenv
RUN virtualenv /opt/venv

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

# Install python modules
COPY requirements/requirements.txt .
RUN pip install -r requirements.txt
RUN pip install uwsgi==2.0.21


#########################################################################
FROM $PYTHON_IMAGE AS build-image
ARG LOCALE

ENV PYTHONUNBUFFERED=1 \
    PYTHONIOENCODING=utf-8\
    UWSGI_PROCESSES=1 \
    UWSGI_OFFLOAD_THREADS=1 \
    UWSGI_THREADS=2

# Copy locales
COPY --from=compile-image /usr/lib/locale/locale-archive /usr/lib/locale/locale-archive
COPY --from=compile-image /etc/default/locale /etc/default/locale

ENV LANG=$LOCALE
ENV LC_ALL=$LOCALE
ENV LC_LANG=$LOCALE

# Django venv
COPY --from=compile-image /opt/venv /opt/venv

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

# Set timezone
ENV TZ=$TIMEZONE
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# set env with current GIT commit
ARG GIT_COMMIT="dummy"
ENV GIT_COMMIT=${GIT_COMMIT}

# Install Debian packages
RUN apt update && apt install -y \
    gettext \
    netcat

# Entrypoint
COPY ./compose/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

# Copy app files
WORKDIR /app
COPY ./compose/production/uwsgi.ini /etc/uwsgi/uwsgi.ini
COPY src/ /app/

## Run compilemessages
#RUN python manage.py compilemessages -l es

# Running collectstatic
RUN python manage.py collectstatic --link --no-input
ENTRYPOINT ["/entrypoint"]

# Launch uWSGI server as default CMD, use "CMD ['run-cron']" for cron execution
CMD ["uwsgi-api"]

# This service will listen on these ports
EXPOSE 8000 1717