// Импортируем middleware-функцию от Clerk и хелпер createRouteMatcher,
// который позволяет задать, какие маршруты считать защищёнными
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Создаём функцию, которая проверяет, попадает ли путь под защищённые маршруты:
// '/dashboard' и любые его подстраницы, а также '/forum' и его вложенные пути.
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

// Экспортируем middleware по умолчанию. Это функция, которая будет выполняться
// для каждого запроса, попавшего под условия из `config.matcher` (ниже).
export default clerkMiddleware(async (auth, req) => {
  // Если запрашиваемый путь является защищённым:
  if (isProtectedRoute(req)) {
    // Проверяем, авторизован ли пользователь. Если нет — будет редирект на sign-in.
    await auth.protect()
  }
})


export const config = {
  matcher: [
    // Этот паттерн исключает из обработки все внутренние файлы Next.js
    // и статику (js, css, картинки и т.д.), кроме случаев,
    // когда они запрашиваются с query-параметрами (?query=...)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Также middleware всегда срабатывает на запросы к API и tRPC маршрутам
    '/(api|trpc)(.*)',
  ],
}
