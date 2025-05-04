// Definición centralizada y tipada de todas las rutas públicas y privadas
export const PATHS = {
    // públicas
    home: '/',
    login: '/login',
    register: '/register',
  
    // autenticado
    dashboard: '/dashboard',
    profile: '/profile',
  
    // rutas de tablero
    boards: '/boards',
    board: (id = ':id') => `/boards/${id}`,
  
    // tareas dentro del tablero
    task: (boardId = ':boardId', taskId = ':taskId') => `/boards/${boardId}/tasks/${taskId}`,
  }
  