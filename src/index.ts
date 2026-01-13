// Экспорт основных компонентов
export { default as CalendarNode } from './nodes/CalendarNode';
export type { CalendarNodeProps } from './nodes/CalendarNode';

// Экспорт интеграционных функций
export { getInfo } from './integration/integration';
export type { CalendarNodeData, WidgetConfig, FlowNodeUpdate } from './integration/integration';

// Экспорт конфигурации
export { initCalendarConfig, calendarConfig } from './config';
export type { CalendarWidgetConfig } from './config';

// Экспорт функций платформы
export { 
  defaultBroadcastMessage, 
  createDefaultPlatformFunctions 
} from './integration/defaultPlatform';

// Экспорт standalone функций
export { createStandaloneCallbacks } from './integration/standalone';

// CSS
import './App.css';
