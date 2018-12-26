<template>
  <div class="home">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-3 is-spaced">Speed Typing Tutor</h1>
          <h2 class="subtitle is-6">Free Online Hindi (Inscript Keyboard) and English Typing Tutor</h2>
        </div>
      </div>
    </section>
    <section class="section container is-fullhd">
      <div class="columns">
        <div class="column is-6">
          <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                <b-icon icon="file-tree"></b-icon>&nbsp; Typing Lessons
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
            <div class="card-content">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <router-link to="/learn/english">
                      Learn English Typing
                    </router-link>
                  </div>
                </div>
              </article>
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <router-link to="/learn/hindi/inscript">
                      Learn Inscript Hindi Typing
                    </router-link>
                  </div>
                </div>
              </article>
            </div>
          </b-collapse>
        </div>
        <div class="column is-6">
          <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                <b-icon icon="keyboard"></b-icon>&nbsp; Typing Test
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
            <div class="card-content">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <router-link to="/typing-test/english">
                      English Typing Test
                    </router-link>
                  </div>
                </div>
              </article>
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <router-link to="/typing-test/hindi/inscript">
                      Inscript Hindi Typing Test
                    </router-link>
                  </div>
                </div>
              </article>
            </div>
          </b-collapse>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",

  mounted() {
    this.$Progress.finish()
  }
};
</script>
