<script setup>
  // import { onMounted, watch } from 'vue';
  import { RouterLink, RouterView, useRoute } from 'vue-router';

  import { useInterfaceStore } from '@/stores/interface';

  const route = useRoute();
  const ui = useInterfaceStore();

</script>

<template>
  <header :class="`${ui.menuClass} ${route.name}`">
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
    <div class="inner-column">
      <RouterView />
    </div>
  </main>

  <footer class="site-footer">
    <div class="inner-column">
      <p class="reading-voice">This is the footer</p>
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

  .toggle-menu {
/*    background-color: var(--paper);
    font-size: 1.1rem;
    padding: 0.2em 1em;
    border: 3px solid var(--main);
    margin-top: 15px;
    box-shadow: -7px 7px var(--main);*/
/*    background-color: var(--paper);*/
/*    border-radius: 8px;*/
/*    font-size: 1.1rem;
    padding: 0.2em 1em;*/
/*    border: 2px solid black;*/
  }

/*  .toggle-menu:hover {
    background-color: var(--secondary);
    color: white;
  }*/

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
</style>
