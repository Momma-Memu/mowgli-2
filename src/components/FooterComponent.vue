<script setup></script>

<template>
  <div class="waves" alt="Demo App Logo"></div>
  <div class="footer-content">
    <div class="footer-row">
      <img class="logo" src="/logo.svg" alt="Demo App Logo" loading="lazy" />
      <div class="footer-column">
        <div class="footer-header">Build Information:</div>
        <div class="footer-item">Mowgli Ver. Alpha-0.0.1</div>
        <div class="footer-item">Metrix Ver. Alpha-0.0.1</div>
      </div>
    </div>
    <div id="footer-forms" class="footer-column">
      <div class="footer-header">Feedback & Support:</div>
      <div id="issue-btn" class="footer-item btn">Report an issue</div>
      <div id="feedback-btn" class="footer-item btn">
        Provide feedback on your experience
      </div>
    </div>
    <div class="footer-column about">
      <div class="footer-header">About Mowgli:</div>
      <div class="footer-item">
        Mowgli is an early development, data analytics tool. Everything is subject to
        change based on feedback. You can help improve Mowgli by providing feedback and
        reporting any issues you may experience.
      </div>
    </div>
  </div>
</template>
<style>
.footer-content {
  display: flex;
  justify-content: space-between;
  padding: var(--mo-size-4);
  color: white;
  flex-wrap: wrap;
  gap: var(--mo-size-4);
  background: var(--mo-green-600);
  position: relative;
}

.footer-row {
  display: flex;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-header {
  font-size: var(--mo-size-5);
}

.footer-item {
  margin-top: var(--mo-size-1);
}

.about {
  max-width: 370px;
}

.logo {
  width: 40px;
  align-self: baseline;
  margin-right: var(--mo-size-4);
  filter: drop-shadow(0px 0rem 0.1rem #00000045);
}

.waves {
  margin-bottom: -2em;
  min-width: 320px;
  width: 100%;
  aspect-ratio: 960/240;
  background-image: url("/waves.svg");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  filter: drop-shadow(0rem -0.25rem 0.75rem #00000045);
}
</style>
