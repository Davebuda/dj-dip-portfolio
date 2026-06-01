// Minimal typings for the SoundCloud HTML5 Widget API (api.js).
// Docs: https://developers.soundcloud.com/docs/api/html5-widget
export {}

declare global {
  interface SCWidgetEvents {
    READY: string
    PLAY: string
    PAUSE: string
    FINISH: string
    PLAY_PROGRESS: string
    SEEK: string
    ERROR: string
  }

  interface SCWidget {
    bind(eventName: string, listener: (...args: unknown[]) => void): void
    unbind(eventName: string): void
    load(url: string, options?: Record<string, unknown>): void
    play(): void
    pause(): void
    toggle(): void
    seekTo(milliseconds: number): void
    setVolume(volume: number): void
    getDuration(cb: (ms: number) => void): void
    getPosition(cb: (ms: number) => void): void
    isPaused(cb: (paused: boolean) => void): void
  }

  interface SCStatic {
    Widget: {
      (el: HTMLIFrameElement | string): SCWidget
      Events: SCWidgetEvents
    }
  }

  interface Window {
    SC?: SCStatic
  }
}
