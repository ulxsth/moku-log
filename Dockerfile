FROM postgres:14

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=moku_log

VOLUME ["/var/lib/postgresql/data"]

EXPOSE 5432
