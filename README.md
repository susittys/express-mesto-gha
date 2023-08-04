[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
 

# Проект Mesto бэкенд
**[Ссылка на репозиторий Github](https://github.com/susittys/express-mesto-gha)**  
**Яндекс.Практикум**

## Директории

`app.js` — включает основную логику сервера, запуск и подключение к базе данных  
`/routes` — папка с файлами роутера для пользователя и карточки  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки  

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

### Подключение к базе данных

```text
mongodb://localhost:27017/mestodb 
```

### Формат данных USER

```JSON
{
  "name": "Стас",
  "about": "Разработчик",
  "avatar": "https://arte1.ru/images/detailed/4/23608.jpg",
  "_id": "new ObjectId(\"dd8b6dea22fe4ea0ad5d46f4\")"
}
```

### Формат данных CARD

```JSON
{
  "name": "Стас",
  "link": "Разработчик",
  "owner": "new ObjectId(\"dd8b6dea22fe4ea0ad5d46f4\")",
  "likes": [],
  "createdAt": "Date.now"
}
```
