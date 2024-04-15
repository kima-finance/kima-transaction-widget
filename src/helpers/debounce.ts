export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}
