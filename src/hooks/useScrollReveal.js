import { useEffect } from 'react'

const REVEAL_SELECTOR = '.section-heading, .fade-up'

function collectRevealElements(node) {
  if (!(node instanceof Element)) return []
  const elements = node.matches(REVEAL_SELECTOR) ? [node] : []
  return elements.concat([...node.querySelectorAll(REVEAL_SELECTOR)])
}

/**
 * 统一管理滚动显现动画。
 *
 * CMS 详情数据在路由页面挂载后异步进入 DOM，不能只在页面首次渲染时扫描一次。
 * MutationObserver 会把后续插入的后台模块补充给同一个 IntersectionObserver。
 */
export function useScrollReveal() {
  useEffect(() => {
    const observed = new WeakSet()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const reveal = (element) => {
      element.classList.add('visible')
    }

    const intersectionObserver = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              reveal(entry.target)
              intersectionObserver.unobserve(entry.target)
            })
          },
          { threshold: 0.15 }
        )

    const observe = (element) => {
      if (observed.has(element)) return
      observed.add(element)
      if (reducedMotion) {
        reveal(element)
        return
      }
      intersectionObserver.observe(element)
    }

    collectRevealElements(document.body).forEach(observe)

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          collectRevealElements(node).forEach(observe)
        })
      })
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      intersectionObserver?.disconnect()
    }
  }, [])
}
