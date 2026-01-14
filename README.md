# Модуль календаря

Установка:
```bash
npm install calendar-module
```

## О виджете
Реализовано:

- Создание, удаление и изменнеие задач

- Загрузка файлов календаря формата .ics

- Телеграмм бот, отправляющий уведомления о дедлайнах

- Изменение размера и состояния закрепления

- Отправка статистики по количеству перешедших по ссылке бота и загрузивших файл календаря пользователей. Отправка на серве происходит порциями по мере наполения очереди. Размер очереди задается параметром statsQueueMaxSize при конфигурации виджета.

- Отправка состояния виджета на бекенд.

## Конфигурация виджета

1. Импортировать модуль:
```bash
import { CalendarNode, defaultBroadcastMessage, type WidgetConfig } from 'calendar-module';
```

2. Создать файл .env:
```bash
touch .env  # для linux
```

3. Заполнить файл .env значениями:
```bash
# Пример
REACT_APP_API_BASE_URL=http://localhost:8080/api        #бекенд календаря
REACT_APP_TELEGRAM_BOT_URL=https://web.telegram.org/    #ссылка на бота
REACT_APP_STATS_QUEUE_MAX_SIZE=2                        #максимальная величина очереди
REACT_APP_PLATFORM_API_URL=http://platform.example/api  #бекенд основной платформы
```

4. Сконфигурировать:
```bash
const appConfig = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  telegramBotUrl: process.env.REACT_APP_TELEGRAM_BOT_URL || 'https://web.telegram.org,
  statsQueueMaxSize: parseInt(process.env.REACT_APP_STATS_QUEUE_MAX_SIZE || '20', 10),
  platformApiUrl: process.env.REACT_APP_PLATFORM_API_URL || 'http://localhost:3000/api',
};
```

5. Сделать коллбек закрепления виджета:
```bash
const updateNodePin = useCallback((nodeId: string, isPinned: boolean) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            draggable: !isPinned,
          };
        }
        return node;
      })
    );
  }, [setNodes]);
```

6. Добавить коллбек для отображения виджета и его закрепления:
```bash
const nodesWithCallbacks = useMemo(() => {
    return nodes.map((node) => {
      const data = node.data as { widgetConfig: WidgetConfig };
      
      const updatedData = {
        ...data,
        onPinToggle: (isPinned: boolean) => {
          updateNodePin(node.id, isPinned);
        }
      };
      
      return {
        ...node,
        data: updatedData as Record<string, unknown>,
      };
    });
}, [nodes, updateNodePin]);
```

## Ссылки на репозитории:
Модуль календаря: https://github.com/NorseSway6/calendar-module

Бекенд календаря: https://github.com/TreyJey/kanban-calendar

Пример интеграции (проверяла работоспособность виджета с этим кодом): https://github.com/NorseSway6/kanban-calendar-frontend/blob/master/src/FlowBoardExample.tsx