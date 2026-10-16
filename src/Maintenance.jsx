import { useEffect, useRef, useState } from 'react'
import { SONG } from './music.config.js'
import './Maintenance.css'

const MAINTENANCE_CONFIG = {
  githubUrl: 'https://github.com/artpregoner',
  emailUrl: 'mailto:artjavarpregoner@outlook.com',
  estimatedReturn: 'Coming soon',
}

let youtubeApiPromise

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (youtubeApiPromise) return youtubeApiPromise

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.()
      resolve(window.YT)
    }

    let script = document.getElementById('youtube-iframe-api')
    if (!script) {
      script = document.createElement('script')
      script.id = 'youtube-iframe-api'
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => reject(new Error('YouTube API failed to load'))
      document.head.appendChild(script)
    }
  })

  return youtubeApiPromise
}

function readPausePreference() {
  try {
    return window.localStorage.getItem('ajcoder-music-paused') === 'true'
  } catch {
    return false
  }
}

function savePausePreference(paused) {
  try {
    window.localStorage.setItem('ajcoder-music-paused', String(paused))
  } catch {
    // Storage may be unavailable in private browsing or restricted contexts.
  }
}

function Icon({ name }) {
  if (name === 'github') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 2.07 3.13 2.1.2-.72.52-1.2.9-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 9v4M10 6.5h.01" />
    </svg>
  )
}

function MusicPlayer() {
  const playerMountRef = useRef(null)
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isUnavailable, setIsUnavailable] = useState(false)

  useEffect(() => {
    let mounted = true
    const pausePreference = readPausePreference()
    let interactionHandled = false

    const handleFirstInteraction = () => {
      if (interactionHandled || pausePreference) return
      interactionHandled = true
      document.removeEventListener('pointerdown', handleFirstInteraction, true)
      document.removeEventListener('keydown', handleFirstInteraction, true)

      const player = playerRef.current
      if (player && window.YT?.PlayerState) {
        player.unMute()
        player.setVolume(SONG.volume)
        player.playVideo()
        setIsMuted(false)
      }
    }

    if (!pausePreference) {
      document.addEventListener('pointerdown', handleFirstInteraction, true)
      document.addEventListener('keydown', handleFirstInteraction, true)
    }

    loadYouTubeApi()
      .then((youtube) => {
        if (!mounted || !playerMountRef.current) return

        const playerTarget = document.createElement('div')
        playerMountRef.current.appendChild(playerTarget)
        playerRef.current = new youtube.Player(playerTarget, {
          width: '1',
          height: '1',
          videoId: SONG.videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(SONG.volume)
              event.target.mute()
              if (pausePreference) return
              event.target.playVideo()
              if (interactionHandled) {
                event.target.unMute()
                setIsMuted(false)
              }
            },
            onStateChange: (event) => {
              if (!mounted) return
              if (event.data === youtube.PlayerState.PLAYING) setIsPlaying(true)
              if (event.data === youtube.PlayerState.PAUSED || event.data === youtube.PlayerState.ENDED) setIsPlaying(false)
              if (event.data === youtube.PlayerState.ENDED) {
                event.target.seekTo(0)
                event.target.playVideo()
              }
            },
            onError: () => {
              if (!mounted) return
              setIsUnavailable(true)
              setIsPlaying(false)
              playerRef.current?.destroy()
              playerRef.current = null
            },
          },
        })
      })
      .catch(() => {
        if (mounted) setIsUnavailable(true)
      })

    return () => {
      mounted = false
      document.removeEventListener('pointerdown', handleFirstInteraction, true)
      document.removeEventListener('keydown', handleFirstInteraction, true)
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [])

  const togglePlayback = () => {
    const player = playerRef.current
    if (!player || isUnavailable) return

    const isActuallyPlaying = player.getPlayerState() === window.YT.PlayerState.PLAYING
    if (isActuallyPlaying && !player.isMuted()) {
      player.pauseVideo()
      savePausePreference(true)
      return
    }

    player.unMute()
    player.setVolume(SONG.volume)
    player.playVideo()
    setIsMuted(false)
    savePausePreference(false)
  }

  return (
    <div className="maintenance-music">
      {isUnavailable ? (
        <span className="music-unavailable">Music unavailable</span>
      ) : (
        <>
          <button
            className="music-toggle"
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying && !isMuted ? 'Pause music' : 'Play music'}
          >
            <span className="music-toggle-icon" aria-hidden="true">
              {isPlaying && !isMuted ? 'Ⅱ' : '▶'}
            </span>
            <span>{isPlaying && !isMuted ? 'Pause' : 'Tap to play'}</span>
          </button>
          <span className="music-title">{SONG.title}</span>
          {isPlaying && !isMuted && (
            <span className="equalizer" aria-label="Music playing">
              <i />
              <i />
              <i />
            </span>
          )}
          <div className="youtube-player-mount" ref={playerMountRef} aria-hidden="true" />
        </>
      )}
    </div>
  )
}

export default function Maintenance() {
  const [currentTime, setCurrentTime] = useState(() => formatManilaTime())
  const [avatarFailed, setAvatarFailed] = useState(false)

  useEffect(() => {
    document.title = 'AJCODER | Back soon'
    const intervalId = window.setInterval(() => setCurrentTime(formatManilaTime()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <main className="maintenance-page">
      <section className="maintenance-card" aria-label="AJCODER maintenance notice">
        <div className="profile-widget">
          <div className="profile-heading">
            <div className="avatar" aria-label={avatarFailed ? 'AJ initials avatar' : 'AJCODER avatar'}>
              {avatarFailed ? (
                <span>AJ</span>
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}avatar.jpg`}
                  alt=""
                  onError={() => setAvatarFailed(true)}
                />
              )}
            </div>
            <div className="profile-copy">
              <h1>AJCODER</h1>
              <p>Desktop Support Engineer</p>
              <p>Web Developer</p>
            </div>
          </div>

          <div className="status-badge">
            <span className="status-dot" />
            <span>Maintenance</span>
          </div>

          <p className="maintenance-message">I'm updating my portfolio. Please check back soon.</p>
          <p className="return-line">
            <span>Estimated return</span>
            <strong>{MAINTENANCE_CONFIG.estimatedReturn}</strong>
          </p>
          <p className="local-time">
            <span>Local time</span>
            <time>{currentTime}</time>
            <span className="time-zone">Asia/Manila</span>
          </p>

          <nav className="profile-links" aria-label="Contact links">
            <a href={MAINTENANCE_CONFIG.githubUrl} aria-label="Visit GitHub" target="_blank" rel="noreferrer">
              <Icon name="github" />
            </a>
            <a href={MAINTENANCE_CONFIG.emailUrl} aria-label="Send email">
              <Icon name="email" />
            </a>
          </nav>
        </div>

        <MusicPlayer />

        <aside className="maintenance-notice">
          <InfoIcon />
          <p>My Facebook account is currently disabled.</p>
        </aside>

        <p className="copyright">© {new Date().getFullYear()} AJCODER</p>
      </section>
    </main>
  )
}

function formatManilaTime() {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date())
}