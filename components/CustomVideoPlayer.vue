<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    brandLabel?: string
    poster: string
    src: string
  }>(),
  {
    brandLabel: 'Hotel English',
  },
)

const playerRoot = ref<HTMLDivElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

const isPlaying = ref(false)
const isScrubbing = ref(false)
const wasPlayingBeforeScrub = ref(false)
const progressValue = ref(0)
const volumeValue = ref(100)
const currentTime = ref(0)
const duration = ref(0)
const status = ref('Готово к просмотру')
const controlsHidden = ref(false)
const hasFocusWithin = ref(false)

let storedVolume = 1
let controlsHideTimer: ReturnType<typeof window.setTimeout> | null = null

const formatPlayerTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) {
    return '0:00'
  }

  const rounded = Math.floor(seconds)
  const minutes = Math.floor(rounded / 60)
  const remainder = rounded % 60

  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

const effectiveVolume = computed(() => {
  const video = videoRef.value

  if (!video) {
    return volumeValue.value / 100
  }

  return video.muted ? 0 : video.volume
})

const playerStateClasses = computed(() => ({
  'is-controls-hidden': controlsHidden.value,
  'is-muted': effectiveVolume.value === 0,
  'is-playing': isPlaying.value,
  'is-volume-high': effectiveVolume.value > 0.5,
  'is-volume-low': effectiveVolume.value > 0 && effectiveVolume.value <= 0.5,
}))

const progressStyle = computed(() => ({
  '--progress': `${progressValue.value}%`,
}))

const volumeStyle = computed(() => ({
  '--volume': `${volumeValue.value}%`,
}))

const durationLabel = computed(() => formatPlayerTime(duration.value))
const currentTimeLabel = computed(() => formatPlayerTime(currentTime.value))
const muteButtonLabel = computed(() => (effectiveVolume.value === 0 ? 'Включить звук' : 'Выключить звук'))
const toggleButtonLabel = computed(() => (isPlaying.value ? 'Поставить на паузу' : 'Воспроизвести видео'))

const clearControlsHideTimer = () => {
  if (!controlsHideTimer) {
    return
  }

  window.clearTimeout(controlsHideTimer)
  controlsHideTimer = null
}

const hideControls = () => {
  const video = videoRef.value

  if (!video || video.paused || video.ended || isScrubbing.value || hasFocusWithin.value) {
    return
  }

  controlsHidden.value = true
}

const showControls = (scheduleHide = false) => {
  const video = videoRef.value

  controlsHidden.value = false
  clearControlsHideTimer()

  if (!video || !scheduleHide || video.paused || video.ended || isScrubbing.value) {
    return
  }

  controlsHideTimer = window.setTimeout(() => {
    hideControls()
  }, 1800)
}

const syncProgress = () => {
  const video = videoRef.value

  if (!video || isScrubbing.value) {
    return
  }

  currentTime.value = video.currentTime
  progressValue.value = video.duration ? (video.currentTime / video.duration) * 100 : 0
}

const syncDuration = () => {
  duration.value = videoRef.value?.duration ?? 0
}

const syncPlayState = () => {
  const video = videoRef.value

  if (!video) {
    return
  }

  isPlaying.value = !video.paused && !video.ended
  status.value = isPlaying.value ? 'Воспроизведение' : 'Пауза'

  if (isPlaying.value) {
    showControls(true)
    return
  }

  showControls(false)
}

const syncVolumeState = () => {
  const video = videoRef.value

  if (!video) {
    return
  }

  const nextVolume = video.muted ? 0 : video.volume
  volumeValue.value = Math.round(nextVolume * 100)

  if (nextVolume > 0) {
    storedVolume = nextVolume
  }
}

const togglePlayback = async () => {
  const video = videoRef.value

  if (!video) {
    return
  }

  if (video.paused || video.ended) {
    try {
      await video.play()
    } catch {
      status.value = 'Запуск заблокирован'
    }

    return
  }

  video.pause()
}

const toggleMute = () => {
  const video = videoRef.value

  if (!video) {
    return
  }

  if (video.muted || video.volume === 0) {
    video.muted = false
    video.volume = storedVolume > 0 ? storedVolume : 1
  } else {
    storedVolume = video.volume > 0 ? video.volume : storedVolume
    video.muted = true
  }

  syncVolumeState()
}

const onVolumeInput = () => {
  const video = videoRef.value

  if (!video) {
    return
  }

  const nextVolume = volumeValue.value / 100
  video.muted = nextVolume === 0
  video.volume = nextVolume

  if (nextVolume > 0) {
    storedVolume = nextVolume
  }

  syncVolumeState()
}

const toggleFullscreen = async () => {
  if (!playerRoot.value) {
    return
  }

  if (document.fullscreenElement === playerRoot.value) {
    await document.exitFullscreen()
    return
  }

  if (playerRoot.value.requestFullscreen) {
    await playerRoot.value.requestFullscreen()
  }
}

const previewSeek = () => {
  if (!duration.value) {
    return
  }

  currentTime.value = (progressValue.value / 100) * duration.value
}

const beginScrub = () => {
  const video = videoRef.value

  if (!video || !video.duration) {
    return
  }

  clearControlsHideTimer()
  showControls(false)
  isScrubbing.value = true
  wasPlayingBeforeScrub.value = !video.paused && !video.ended

  if (wasPlayingBeforeScrub.value) {
    video.pause()
  }

  status.value = 'Перемотка'
}

const commitSeek = async () => {
  const video = videoRef.value

  if (!video || !isScrubbing.value) {
    return
  }

  if (!video.duration) {
    isScrubbing.value = false
    return
  }

  const targetTime = (progressValue.value / 100) * video.duration
  video.currentTime = targetTime
  currentTime.value = targetTime
  isScrubbing.value = false

  if (wasPlayingBeforeScrub.value) {
    try {
      await video.play()
    } catch {
      status.value = 'Запуск заблокирован'
    }

    showControls(true)
    return
  }

  syncPlayState()
}

const cancelScrub = () => {
  isScrubbing.value = false
  syncProgress()
  syncPlayState()
}

const handleFocusIn = () => {
  hasFocusWithin.value = true
  showControls(false)
}

const handleFocusOut = () => {
  window.setTimeout(() => {
    hasFocusWithin.value = Boolean(playerRoot.value?.matches(':focus-within'))

    if (!hasFocusWithin.value) {
      showControls(true)
    }
  }, 0)
}

onBeforeUnmount(() => {
  clearControlsHideTimer()
})
</script>

<template>
  <div
    ref="playerRoot"
    class="custom-player"
    :class="playerStateClasses"
    @contextmenu.prevent
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @mouseenter="showControls(true)"
    @mouseleave="hideControls"
    @mousemove="showControls(true)"
    @touchstart.passive="showControls(true)"
  >
    <video
      ref="videoRef"
      class="custom-player-media"
      :poster="poster"
      :src="src"
      controlslist="nodownload noplaybackrate noremoteplayback"
      disablepictureinpicture
      playsinline
      preload="auto"
      @canplay="() => { if (!isScrubbing && !isPlaying) status = 'Готово к просмотру' }"
      @click="togglePlayback"
      @ended="syncPlayState"
      @loadeddata="showControls(false)"
      @loadedmetadata="() => { syncDuration(); syncProgress(); status = 'Готово к просмотру' }"
      @pause="syncPlayState"
      @play="syncPlayState"
      @playing="syncPlayState"
      @seeked="syncPlayState"
      @seeking="() => { if (!isScrubbing) status = 'Перемотка' }"
      @timeupdate="syncProgress"
      @volumechange="syncVolumeState"
      @waiting="() => { if (!isScrubbing) { status = 'Загрузка'; showControls(false) } }"
    />

    <button
      class="player-big-play"
      type="button"
      :aria-label="toggleButtonLabel"
      @click="togglePlayback"
    >
      <span class="player-big-play-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="presentation">
          <path d="M8 6.82v10.36a1 1 0 0 0 1.53.85l8.14-5.18a1 1 0 0 0 0-1.69L9.53 5.97A1 1 0 0 0 8 6.82Z" />
        </svg>
      </span>
      <span>Смотреть</span>
    </button>

    <div class="player-chrome">
      <div class="player-meta">
        <span class="player-chip">{{ props.brandLabel }}</span>
        <span class="player-status" aria-live="polite">{{ status }}</span>
      </div>

      <div class="player-controls">
        <button class="player-control" type="button" :aria-label="toggleButtonLabel" @click="togglePlayback">
          <span class="player-control-icon player-control-icon-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path class="icon-play" d="M8 6.82v10.36a1 1 0 0 0 1.53.85l8.14-5.18a1 1 0 0 0 0-1.69L9.53 5.97A1 1 0 0 0 8 6.82Z" />
              <path class="icon-pause" d="M8.5 6.75h2.75v10.5H8.5zM12.75 6.75h2.75v10.5h-2.75z" />
            </svg>
          </span>
        </button>

        <label class="player-progress-wrap" aria-label="Позиция воспроизведения">
          <input
            v-model.number="progressValue"
            class="player-progress"
            type="range"
            min="0"
            max="100"
            step="0.1"
            :style="progressStyle"
            @change="commitSeek"
            @input="previewSeek"
            @pointercancel="cancelScrub"
            @pointerdown="beginScrub"
            @pointerup="commitSeek"
          >
          <span class="player-time">
            <span>{{ currentTimeLabel }}</span>
            <span class="player-time-separator">/</span>
            <span>{{ durationLabel }}</span>
          </span>
        </label>

        <div class="player-volume-group">
          <button
            class="player-control player-control-volume"
            type="button"
            :aria-label="muteButtonLabel"
            :aria-pressed="String(effectiveVolume === 0)"
            @click="toggleMute"
          >
            <span class="player-control-icon player-control-icon-volume" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <path class="volume-speaker" d="M4.75 10.5A1.75 1.75 0 0 1 6.5 8.75H9.2l3.86-3.27a.9.9 0 0 1 1.49.69v11.66a.9.9 0 0 1-1.49.69L9.2 15.25H6.5a1.75 1.75 0 0 1-1.75-1.75v-3Z" />
                <path class="volume-wave volume-wave-1" d="M16.2 9.4a4.2 4.2 0 0 1 0 5.2" />
                <path class="volume-wave volume-wave-2" d="M18.7 7.4a7.25 7.25 0 0 1 0 9.2" />
                <path class="volume-slash" d="M6 6l12 12" />
              </svg>
            </span>
          </button>

          <label class="player-volume-wrap" aria-label="Громкость">
            <input
              v-model.number="volumeValue"
              class="player-volume"
              type="range"
              min="0"
              max="100"
              step="1"
              :style="volumeStyle"
              @input="onVolumeInput"
            >
          </label>
        </div>

        <button class="player-control" type="button" aria-label="Открыть на весь экран" @click="toggleFullscreen">
          <span class="player-control-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
