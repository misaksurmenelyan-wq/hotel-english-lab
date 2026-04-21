const tabs = document.querySelectorAll(".role-tab");
const panels = document.querySelectorAll(".role-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.role;

    tabs.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    panels.forEach((panel) => {
      const isTarget = panel.dataset.panel === target;
      panel.classList.toggle("is-active", isTarget);
      panel.hidden = !isTarget;
    });

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll(".reveal").forEach((item) => {
  observer.observe(item);
});

const players = document.querySelectorAll("[data-player]");

const formatPlayerTime = (seconds) => {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const rounded = Math.floor(seconds);
  const minutes = Math.floor(rounded / 60);
  const remainder = rounded % 60;

  return `${minutes}:${String(remainder).padStart(2, "0")}`;
};

players.forEach((playerElement) => {
  const video = playerElement.querySelector("video");
  const chrome = playerElement.querySelector("[data-player-chrome]");
  const toggleButtons = playerElement.querySelectorAll("[data-player-toggle]");
  const muteButton = playerElement.querySelector("[data-player-mute]");
  const volume = playerElement.querySelector("[data-player-volume]");
  const fullscreenButton = playerElement.querySelector("[data-player-fullscreen]");
  const progress = playerElement.querySelector("[data-player-progress]");
  const currentTimeLabel = playerElement.querySelector("[data-player-current]");
  const durationLabel = playerElement.querySelector("[data-player-duration]");
  const statusLabel = playerElement.querySelector("[data-player-status]");
  let isScrubbing = false;
  let wasPlayingBeforeScrub = false;
  let storedVolume = video.volume || 1;
  let controlsHideTimer = null;

  const setRangeFill = (input, value, propertyName) => {
    input.style.setProperty(propertyName, `${value}%`);
  };

  const clearControlsHideTimer = () => {
    if (!controlsHideTimer) {
      return;
    }

    window.clearTimeout(controlsHideTimer);
    controlsHideTimer = null;
  };

  const hideControls = () => {
    if (video.paused || video.ended || isScrubbing || playerElement.matches(":focus-within")) {
      return;
    }

    playerElement.classList.add("is-controls-hidden");
  };

  const showControls = (scheduleHide = false) => {
    playerElement.classList.remove("is-controls-hidden");
    clearControlsHideTimer();

    if (!scheduleHide || video.paused || video.ended || isScrubbing) {
      return;
    }

    controlsHideTimer = window.setTimeout(() => {
      hideControls();
    }, 1800);
  };

  const updateProgress = () => {
    if (isScrubbing) {
      return;
    }

    const value = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    progress.value = value;
    setRangeFill(progress, value, "--progress");
    currentTimeLabel.textContent = formatPlayerTime(video.currentTime);
  };

  const updateDuration = () => {
    durationLabel.textContent = formatPlayerTime(video.duration);
  };

  const updatePlayState = () => {
    const isPlaying = !video.paused && !video.ended;
    const label = isPlaying ? "Поставить на паузу" : "Воспроизвести видео";

    playerElement.classList.toggle("is-playing", isPlaying);
    toggleButtons.forEach((button) => {
      button.setAttribute("aria-label", label);
    });

    statusLabel.textContent = isPlaying ? "Воспроизведение" : "Пауза";

    if (isPlaying) {
      showControls(true);
      return;
    }

    showControls(false);
  };

  const updateMuteState = () => {
    const effectiveVolume = video.muted ? 0 : video.volume;
    const isMuted = effectiveVolume === 0;

    playerElement.classList.toggle("is-muted", isMuted);
    playerElement.classList.toggle("is-volume-low", effectiveVolume > 0 && effectiveVolume <= 0.5);
    playerElement.classList.toggle("is-volume-high", effectiveVolume > 0.5);
    muteButton.setAttribute("aria-pressed", String(isMuted));
    muteButton.setAttribute("aria-label", isMuted ? "Включить звук" : "Выключить звук");

    volume.value = Math.round(effectiveVolume * 100);
    setRangeFill(volume, Number(volume.value), "--volume");

    if (effectiveVolume > 0) {
      storedVolume = effectiveVolume;
    }
  };

  const togglePlayback = async () => {
    if (video.paused || video.ended) {
      try {
        await video.play();
      } catch (error) {
        statusLabel.textContent = "Запуск заблокирован";
      }
      return;
    }

    video.pause();
  };

  toggleButtons.forEach((button) => {
    button.addEventListener("click", togglePlayback);
  });

  video.addEventListener("click", togglePlayback);
  playerElement.addEventListener("mousemove", () => {
    showControls(true);
  });
  playerElement.addEventListener("mouseenter", () => {
    showControls(true);
  });
  playerElement.addEventListener("mouseleave", () => {
    clearControlsHideTimer();
    hideControls();
  });
  playerElement.addEventListener(
    "touchstart",
    () => {
      showControls(true);
    },
    { passive: true }
  );
  playerElement.addEventListener("focusin", () => {
    showControls(false);
  });
  chrome.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!playerElement.matches(":focus-within")) {
        showControls(true);
      }
    }, 0);
  });

  muteButton.addEventListener("click", () => {
    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = storedVolume > 0 ? storedVolume : 1;
    } else {
      storedVolume = video.volume > 0 ? video.volume : storedVolume;
      video.muted = true;
    }

    updateMuteState();
  });

  volume.addEventListener("input", () => {
    const nextVolume = Number(volume.value) / 100;
    video.muted = nextVolume === 0;
    video.volume = nextVolume;

    if (nextVolume > 0) {
      storedVolume = nextVolume;
    }

    updateMuteState();
  });

  fullscreenButton.addEventListener("click", async () => {
    if (document.fullscreenElement === playerElement) {
      await document.exitFullscreen();
      return;
    }

    if (playerElement.requestFullscreen) {
      await playerElement.requestFullscreen();
    }
  });

  const previewSeek = () => {
    if (!video.duration) {
      return;
    }

    const targetTime = (Number(progress.value) / 100) * video.duration;
    setRangeFill(progress, Number(progress.value), "--progress");
    currentTimeLabel.textContent = formatPlayerTime(targetTime);
  };

  const commitSeek = async () => {
    if (!isScrubbing) {
      return;
    }

    if (!video.duration) {
      isScrubbing = false;
      return;
    }

    const targetTime = (Number(progress.value) / 100) * video.duration;
    video.currentTime = targetTime;
    isScrubbing = false;
    currentTimeLabel.textContent = formatPlayerTime(targetTime);

    if (wasPlayingBeforeScrub) {
      try {
        await video.play();
      } catch (error) {
        statusLabel.textContent = "Запуск заблокирован";
      }
      showControls(true);
      return;
    }

    updatePlayState();
  };

  progress.addEventListener("pointerdown", () => {
    if (!video.duration) {
      return;
    }

    clearControlsHideTimer();
    showControls(false);
    isScrubbing = true;
    wasPlayingBeforeScrub = !video.paused && !video.ended;

    if (wasPlayingBeforeScrub) {
      video.pause();
    }

    statusLabel.textContent = "Перемотка";
  });

  progress.addEventListener("input", previewSeek);
  progress.addEventListener("change", commitSeek);
  progress.addEventListener("pointerup", commitSeek);
  progress.addEventListener("pointercancel", () => {
    isScrubbing = false;
    updateProgress();
    updatePlayState();
  });

  playerElement.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  video.addEventListener("loadedmetadata", () => {
    updateDuration();
    updateProgress();
    statusLabel.textContent = "Готово к просмотру";
  });
  video.addEventListener("loadeddata", () => {
    showControls(false);
  });

  video.addEventListener("seeking", () => {
    if (!isScrubbing) {
      statusLabel.textContent = "Перемотка";
    }
  });
  video.addEventListener("seeked", updatePlayState);
  video.addEventListener("waiting", () => {
    if (!isScrubbing) {
      statusLabel.textContent = "Загрузка";
      showControls(false);
    }
  });
  video.addEventListener("canplay", () => {
    if (video.paused && !isScrubbing) {
      statusLabel.textContent = "Готово к просмотру";
    }
  });
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("play", updatePlayState);
  video.addEventListener("playing", updatePlayState);
  video.addEventListener("pause", updatePlayState);
  video.addEventListener("ended", updatePlayState);
  video.addEventListener("volumechange", updateMuteState);

  updateDuration();
  updateProgress();
  updatePlayState();
  updateMuteState();
  showControls(false);
});
