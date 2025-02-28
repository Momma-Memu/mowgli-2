<script setup>
const openModal = () => {
  // eslint-disable-next-line no-unused-vars
  const [signUp, signIn] = document.getElementsByTagName("mo-nav")[0].modals;

  signIn.open();

  // TODO: Replace opening signIn with signUp after form is completed.
}

</script>

<template>
    <div class="head">
      <div class="head-row-txt">
        <div class="headline">The most flexible all-in-one business management solution.</div>
        <div class="headline-sub">
          <p class="headline-sub-txt">
            Mowgli offers a suite of data analytics and business management solutions without the 
            overhead that our competition struggles with. Take back control over your data and embrace
            the bare necessities.
          </p>
          
          <mo-button class="headline-sub-btn" @click="openModal">Get Started</mo-button>
        </div>
      </div>
      <img id="hero-svg" class="svg" src="/svg/aio.svg" alt="tech illustration">
    </div>
    
    <section class="section">
      <img class="svg" src="/svg/plan.svg" alt="plan illustration">
      <div class="section-txt">
        <div class="section-head">We're on a mission to challenge anti-consumer practices with merit and integrity</div>
        <p>
          Software as a service (SaaS) is becoming infamous for malicious patterns that permenantly 
          trap consumers with high costs and barriers that make leaving impossible. We believe in 
          creating software that keeps you around based on merit alone. You deserve the right to 
          come and go anytime. No tricks, hidden fees, hurdles or nonsense. Our mission is to create
          a product that is competitive, trustworthy, and fundamentally change the tech industry.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="section-txt">
        <div class="section-head">Four unique features that we know you'll love</div>
        <li>Mowgli's takes a dynamic approach to data. Add, remove, and edit fields with no overhead.</li>
        <li>Setup scheduled tasks and save time, such as weekly or monthly KPI reports.</li>
        <li>Integrating and importing data is easy with helpful tips and graceful CSV correction.</li>
        <li>Monitor your data in real-time to make quick and informed adjustments.</li>
      </div>
      <div class="features">
        <div class="feat-icon-wrap">
          <i class="fa-fw fa-sharp-duotone fa-solid fa-rocket-launch feature-icon feat-icon-red"></i>
        </div>
        <div class="feat-icon-wrap">
          <i class="fa-fw fa-sharp-duotone fa-solid fa-calendar-check feature-icon feat-icon-purple"></i>
        </div>
        <div class="feat-icon-wrap">
          <i class="fa-fw fa-sharp-duotone fa-solid fa-chart-pie feature-icon feat-icon-brown"></i>
        </div>
        <div class="feat-icon-wrap">
          <i class="fa-fw fa-sharp-duotone fa-solid fa-signal-stream feature-icon"></i>
        </div>
      </div>
    </section>
</template>
<style>
.head {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: var(--mo-per-size-10);
  padding: var(--mo-size-16) var(--mo-size-4);
  gap: var(--mo-size-12);
  color: white;
}

.head-row-txt {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headline {
  /* font-weight: 500; */
  font-size: var(--mo-size-16);
  margin-bottom: var(--mo-size-8);
  max-width: 1000px;
}

.headline-sub {
  display: flex;
  width: 100%;
  gap: var(--mo-size-8);
  align-items: center;
  flex-wrap: wrap;
}

.headline-sub-btn {
  min-width: fit-content;
  font-size: var(--mo-size-6);
}

.headline-sub-txt {
  color: white;
  font-size: var(--mo-size-5);
  max-width: 660px;
  align-self: flex-start;
}

.section {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  gap: var(--mo-size-10);
  padding: var(--mo-size-10) var(--mo-size-16);
  flex-wrap: wrap;
}

.section:nth-child(odd) {
  background-color: var(--mo-white);
  box-shadow: var(--mo-box-shadow);
}

.section:nth-child(even) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--mo-per-size-10);
  padding: var(--mo-size-12) var(--mo-size-4);
  color: white;
  flex-wrap: wrap-reverse;
}

.section-txt {
  max-width: 1100px;
}

.section-head {
  /* font-weight: 600; */
  font-size: var(--mo-size-12);
  margin-bottom: var(--mo-size-8);
}

.svg {
  max-width: 250px;
  width: 30%;
  min-width: 150px;
}

li {
  font-size: 1.25rem;
  list-style-position: inside;
}

.features {
  display: flex;
  align-items: flex-end;
  min-height: 150px;
  flex-wrap: wrap;
  max-width: 435px;
  justify-content: center;
  gap: 1rem;
  min-width: 315px;
}

.feat-icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  padding: var(--mo-size-2);
  
  border-radius: var(--mo-size-2);
  height: fit-content;
  
  background-color: var(--mo-white);
  box-shadow: var(--mo-box-shadow);
}

.feat-icon-wrap:nth-child(even) {
  align-self: flex-start;
}


.feature-icon {
  font-size: var(--mo-size-16);
  --fa-primary-opacity: 1;
  --fa-secondary-opacity: 0.7;
  --fa-primary-color: var(--mo-blue-600);
  --fa-secondary-color: var(--mo-green-500);
}

.feat-icon-purple {
  --fa-primary-color: var(--mo-blue-600);
  --fa-secondary-color: var(--mo-purple-400);
}

.feat-icon-red {  
  --fa-primary-color: var(--mo-blue-600);
  --fa-secondary-color: var(--mo-red-500);
}

.feat-icon-brown {  
  --fa-primary-color: var(--mo-blue-600);
  --fa-secondary-color: var(--mo-brown-400);
}

@media screen and (max-width: 1324px) {
  #hero-svg {
    display: none;
  }
}

@media screen and (max-width: 875px) {
  .headline {
    font-size: var(--mo-size-14);
  }
}

@media screen and (max-width: 475px) {
  .headline {
    font-size: var(--mo-size-10);
  }
}
</style>