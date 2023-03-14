FROM mariadb:10.5.5

ENV MARIADB_DATABASE=churros
ENV MARIADB_ROOT_PASSWORD=A503

COPY ./config /etc/mysql/conf.d
COPY ./data /var/lib/mysql

VOLUME /var/lib/mysql

EXPOSE 3306

CMD ["mysqld"]