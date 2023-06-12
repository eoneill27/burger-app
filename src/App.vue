<script setup>
  import { ref } from 'vue';
  import { RouterLink, RouterView, useRoute } from 'vue-router';

  import { useInterfaceStore } from '@/stores/interface';

  const route = useRoute();
  const ui = useInterfaceStore();

  const siteMap = ref(['Home', 'Menu', 'Deals', 'Rewards', 'Account']);
  const terms = ref(['Terms and conditions', 'Privacy policy']);
  const footContact = ref(['About', 'Locations', 'Contact']);


</script>

<template>
  <header :class="`${ui.menuClass} ${route.name}`" class="site-header">
    <div class="inner-column">
      <nav class="site-nav">
        <RouterLink to="/menu" class="reading-voice router-link">Menu</RouterLink>
        <RouterLink to="/deals" class="reading-voice router-link">Deals</RouterLink>
        <RouterLink to="/" class="reading-voice router-link"><picture class="nav-logo"><img src="./assets/logo.svg" alt=""></picture></RouterLink>
        <RouterLink to="/rewards" class="reading-voice router-link">Rewards</RouterLink>
        <div class="cart-account">
          <RouterLink to="/checkout" class="reading-voice router-link"><svg class="icon-basket"><use xlink:href="#icon-basket"></use></svg></RouterLink>
          <RouterLink to="/account" class="reading-voice router-link"><svg class="icon-user"><use xlink:href="#icon-user"></use></svg></RouterLink>
        </div>
      </nav>
      <button @click="ui.toggleMenu()" class="std-button reading-voice toggle-menu">Menu</button>
    </div>

    <div class="inner-column mobile-menu">
      <ul>
        <li><RouterLink to="/" @click="ui.toggleMenu()" class="info-voice">Home</RouterLink></li>
        <li><RouterLink to="/menu" @click="ui.toggleMenu()" class="info-voice">Menu</RouterLink></li>
        <li><RouterLink to="/deals" @click="ui.toggleMenu()" class="info-voice">Deals</RouterLink></li>
        <li><RouterLink to="/rewards" @click="ui.toggleMenu()" class="info-voice">Rewards</RouterLink></li>
        <li><RouterLink to="/checkout" @click="ui.toggleMenu()" class="info-voice">Cart</RouterLink></li>
        <li><RouterLink to="/account" @click="ui.toggleMenu()" class="info-voice">Account</RouterLink></li>
      </ul>
      <button @click="ui.toggleMenu()" class="std-button reading-voice">Close menu</button>
    </div>
  </header>

  <main>
<Suspense>
      <RouterView />
</Suspense>
  </main>

  <footer class="site-footer">
<!--     <picture class="foot-logo">
      <img src="./assets/logo.svg" alt="">
    </picture> -->

    <div class="foot-logo">
      <h3 class="info-voice"><RouterLink to="/" >BURGER JOINT</RouterLink></h3>
      <p class="nav-voice">Copyright 2023</p>
    </div>

    <div class="inner-column">
      <ul class="site-menu">
        <li v-for="link in siteMap" class="nav-voice">{{link}}</li>
      </ul>

      <ul class="terms">
        <li v-for="link in terms" class="nav-voice">{{link}}</li>
      </ul>

      <ul class="footer-contact">
        <li v-for="link in footContact" class="nav-voice">{{link}}</li>
      </ul>
    </div>
  </footer>
</template>

<style >

  [class^="icon-"], [class*=" icon-"] {
      height: 25px;
      width: 25px;
      display: inline-block; 
      fill: currentColor; 
  }

  header .inner-column {
    display: flex;
  }

  .site-header .router-link:hover {
    text-decoration: underline;
    text-decoration-color: var(--secondary);
    text-decoration-thickness: 3px;
    text-underline-offset: 0.3em;
  }

  header .mobile-menu {
    display: none;
  }

  header.menu-open .mobile-menu {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    padding-top: 100px;

    background-color: var(--paper);
  }

  .mobile-menu button {
    margin-top: 40px;
  }

  .site-nav {
    display: none;
  }
  @media (min-width: 550px) {
    .toggle-menu {
      display: none;
    }

    .site-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .nav-logo {
      max-width: 200px;
    }

    .cart-account {
      display: flex;
      gap: 20px;
    }
  }

  @media (min-width: 700px) {
    .nav-logo {
      max-width: 300px;
    }

    .cart-account {
      gap: 30px;
    }
  }

  .site-footer .inner-column {
    display: flex;
    justify-content: space-between;
    gap: 20px;

  }

  .terms {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .foot-logo {
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .foot-logo .router-link-active {
    text-decoration: none;
  }

  .site-footer li:hover, .foot-logo h3:hover{
    text-decoration: underline;
    text-decoration-color: var(--secondary);
    text-decoration-thickness: 3px;
    text-underline-offset: 0.2em;
  }
</style>
