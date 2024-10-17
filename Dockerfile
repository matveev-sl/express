# Используем официальный образ MongoDB
FROM mongo:latest

# Создаем директорию для данных
#VOLUME /data/db

# Порт, на котором будет работать MongoDB
EXPOSE 27017
