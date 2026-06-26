"use client"

import Script from "next/script"
import { useEffect, useRef } from "react"

const adSlots = [
  {
    id: "container-2e8899ba5faf2528f0165c9b59fd85fc",
    src: "https://pl30084429.effectivecpmnetwork.com/2e8899ba5faf2528f0165c9b59fd85fc/invoke.js",
    cfasync: false,
  },
]

export function AdSidebar() {
  return (
    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-border bg-muted/30 overflow-hidden relative">
      <div id="container-2e8899ba5faf2528f0165c9b59fd85fc" />
      <Script
        async
        data-cfasync="false"
        src="https://pl30084429.effectivecpmnetwork.com/2e8899ba5faf2528f0165c9b59fd85fc/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  )
}

export function AdFooter() {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/20 py-4">
      <div id="container-footer-ad" />
      <Script id="ad-footer" strategy="afterInteractive">
        {`atOptions = {
          'key' : 'd429ad3669e55fa71cd0b6d700fc5d33',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };`}
      </Script>
      <Script
        src="https://www.highperformanceformat.com/d429ad3669e55fa71cd0b6d700fc5d33/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  )
}

export function AdInline() {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/20 py-4">
      <div id="container-inline-ad" />
      <Script id="ad-inline" strategy="afterInteractive">
        {`atOptions = {
          'key' : '9a1d1bc7a605fcbe598ffe13a0181d95',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };`}
      </Script>
      <Script
        src="https://www.highperformanceformat.com/9a1d1bc7a605fcbe598ffe13a0181d95/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  )
}

export function AdBanner() {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/20 py-3">
      <Script id="ad-banner" strategy="afterInteractive">
        {`atOptions = {
          'key' : '7bcd97416d049332257aff4bec80b466',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };`}
      </Script>
      <Script
        src="https://www.highperformanceformat.com/7bcd97416d049332257aff4bec80b466/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  )
}

export function AdPopup() {
  return (
    <>
      <Script
        src="https://pl30084436.effectivecpmnetwork.com/cb/3a/06/cb3a06060df96e45542ffa995a817ef6.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://www.effectivecpmnetwork.com/yfbcjqxbw?key=38c9b234611d467f4c0888b1dec39a36"
        strategy="afterInteractive"
      />
    </>
  )
}
