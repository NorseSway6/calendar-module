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
import { CalendarNode, initCalendarConfig, defaultBroadcastMessage, type WidgetConfig, getCalendarConfig } from 'calendar-module';
```

2. Сконфигурировать виджет, передав свои параметры:
```bash
initCalendarConfig({
  apiBaseUrl: 'http://calendarbacken.example/api',      // бекенд календаря
  telegramBotUrl: 'https://t.me/your_test_bot',         // ссылка на бота
  statsQueueMaxSize: 50,                                // максимальная величина очереди
  platformApiUrl: 'http://platform.example/api'         // бекенд основной платформы
});
```

3. Сделать коллбек закрепления виджета:
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

4. Добавить коллбек для отображения виджета и его закрепления:
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