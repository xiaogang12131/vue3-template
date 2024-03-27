/**
 * 在元素后面插入相邻元素
 *
 * @param newElement
 * @param targetElement
 */

export const insertAfter = (
  newElement: HTMLElement,
  targetElement: HTMLElement
) => {
  const parent = targetElement.parentNode as HTMLElement
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}
