FROM mariadb:10.5.5

ENV MYSQL_DATABASE=churros
ENV MYSQL_ROOT_PASSWORD=A503

COPY ./config /etc/mysql/conf.d

VOLUME /var/lib/mysql

EXPOSE 3306

CMD ["mysqld"]