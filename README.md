# Тестоваое задание

Тестоваое задание занаяло 6 дней: 2024.09.19 - 2024.09.25
> [!IMPORTANT]
> Внимание, вы не продоставляли подробностей этого ТЗ. Поэтому я только гадал полную логику проекта. Имейте это ввиду!

____

## Инструкция

1. Настройте файл `.env`

Введите вашу url подключения к БД на PostgreSQL в файл `.env`

```env
    # .env
    DB_CONNECTION_URI="postgresql://username:12345@localhost:5432/dbname"
```

* Чтобы установить зависимости, подготовить БД к работе, собрать и запустить проект введите в командную строку:

    ```bash
        npm run coldstart
    ```

* Чтобы просто запустить уже собранный проект:

    ```bash
        npm run start
    ```

## Документация по API

1. Роут `/api/student/create` создает нового ученика без каких-либо приглашеений.
   * Данные нужно ввести в формате JSON (либо в url-encoded), тут примеры для JSON формата потому так удобней:

    Делаем __POST__ запрос к `/api/student/create`:

    ```json
    {
        "phone_number":"+254654125321",
        "first_name": "Ян",
        "last_name":"Петров",
        "surname":"Сергеевич",
        "email":"petrov@gmail.com"
    }
    ```

    Ожидаемый ответ с сервера:

    ```json
    {
        "message": "Student created successfully",
        "new_student": {
            "id": "cm1h1mb8p00046u75j4tplth2",
            "created_at": "2024-09-24T22:28:47.683Z",
            "update_at": "2024-09-24T22:28:47.683Z",
            "first_name": "Ян",
            "last_name": "Петров",
            "surname": "Сергеевич",
            "email": "petrov@gmail.com",
            "phone_number": "+254654125321",
            "invited_by_id": null
        }
    }
    ```

2. Роут `/api/referral/generate` создает приглашение и возвращает его сгенерированный уникальный URL. В теле запроса указываем ID студента который хочет создать приглашение:

    __POST__ запрос к `/api/referral/generate`:

    ```json
    {
        "referrer_id":"cm1h1mb8p00046u75j4tplth2"
    }
    ```

    Ожидаемый ответ с сервера:

    ```json
    {
        "message": "Invite created successfully",
        "new_invitation": {
            "id": "cm1h1ngwp00066u75qh0tzg0m",
            "invitation_link_id": "EQ24TbkkzZroZs_fS03o1",
            "inviter_id": "cm1h1mb8p00046u75j4tplth2",
            "created_at": "2024-09-24T22:38:54.213Z"
        }
    }
    ```

3. Динамический роут `/api/invite/:referral_link` обработает данные приглашенного и зосдаст нового приглашенного ученика и добавит по 4 уроков ученику который пригласил и приглашенному ученику.
К примеру уникальной ссылкой будет ссылка которая мы уже создали выше.
Берём из этого поле `"invitation_link_id": "EQ24TbkkzZroZs_fS03o1",` и делаем пост запрос с даннымы в теле запроса для создания нового ученика как делалаи выше:

    __POST__ запрос к `/api/invite/EQ24TbkkzZroZs_fS03o1`:

    ```json
    {
        "first_name": "Иван",
        "last_name": "Иванов",
        "surname": "Петревич",
        "email": "petrovich@gmail.com",
        "phone_number": "+8974356383986" 
    }
    ```

    Ожидаемый ответ с сервера:

    ```json
    {
        "message": "Successfully created new invited student",
        "new_user": {
            "new_user": {
                "id": "cm1h1pwez00086u756oc6slli",
                "created_at": "2024-09-24T23:06:45.467Z",
                "update_at": "2024-09-24T23:06:45.467Z",
                "first_name": "Иван",
                "last_name": "Иванов",
                "surname": "Петревич",
                "email": "petrovich@gmail.com",
                "phone_number": "+8974356383986",
                "invited_by_id": "cm1h1mb8p00046u75j4tplth2"
            },
            "lessons_for_inviter": 4,
            "lessons_for_invited": 4
        }
    }
    ```

4. Роут `/api/student/payment/` создает информацию об оплате
    __POST__ запрос к `/api/student/payment/`:

    ```json
    {
        "student_id":"cm1h1mb8p00046u75j4tplth2",
        "amount":200
    }
    ```

    Ожидаемый ответ с сервера:

    ```json
    {
        "message": "Successfully created new payment",
        "new_payment": {
            "id": "cm1h4dm4i000ehallf9lvuq2x",
            "amount": 200,
            "payer_id": "cm1h1mb8p00046u75j4tplth2",
            "created_at": "2024-09-25T00:21:11.106Z"
        }
    }
    ```

5. Роут `/api/statistics/referral` возвращает всех учеников которые были приглашены
   __GET__ запрос к `/api/statistics/referral` без каких-либо данных от клиента:

    Ожидаемый ответ с сервера:

    ```json
    [
        {
            "id": "cm1h1pwez00086u756oc6slli",
            "created_at": "2024-09-24T23:06:45.467Z",
            "update_at": "2024-09-24T23:06:45.467Z",
            "first_name": "Иван",
            "last_name": "Иванов",
            "surname": "Петревич",
            "email": "petrovich@gmail.com",
            "phone_number": "+8974356383986",
            "invited_by_id": "cm1h1mb8p00046u75j4tplth2"
        }
    ]
   ```

Минимальная проверенная версия Node.js: v18.20.4

### Контакты

* Почта: <mirasayon@ya.ru>
* Репозитория: [github.com/mirasayon/test_task_for_sirius_future](https://github.com/mirasayon/test_task_for_sirius_future)
