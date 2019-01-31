<template>
  <div class="learn-hindi-inscript-typing">
    <section class="hero is-primary" id="typing-content">
      <div class="hero-body" style="padding: 2rem 1.5rem;">
        <div class="container">
          <h1 class="title" id="lesson"></h1>
        </div>
        <div id="action-new-lesson" style="display: none;">
          <nav class="level">
            <div class="level-item has-text-centered">
              <!-- <b-tooltip label="Previous Lesson" type="is-warning" animated always>
                <button class="button is-medium is-warning">
                  <b-icon size="is-large" icon="skip-previous"></b-icon>
                </button>
              </b-tooltip>-->
            </div>
            <div class="level-item has-text-centered">
              <b-tooltip label="Play Again" type="is-success" animated>
                <button @click="playAgainLesson" class="button is-medium is-success">
                  <b-icon size="is-medium" icon="play"></b-icon>
                </button>
              </b-tooltip>
            </div>
            <div class="level-item has-text-centered">
              <!-- <b-tooltip label="Next Lesson" type="is-warning" animated always>
                <button class="button is-medium is-warning">
                  <b-icon size="is-large" icon="skip-next"></b-icon>
                </button>
              </b-tooltip>-->
            </div>
          </nav>
        </div>
      </div>
    </section>
    <section id="resultShow" class="hero is-warning">
      <div class="hero-body" style="padding: 1rem 0.5rem;">
        <nav class="level">
          <div class="level-item has-text-centered">
            <div title="Gross Word Per Minute">
              <p class="heading">GWPM</p>
              <p class="title">{{ result.GrossWPM }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div title="Net Word Per Minute">
              <p class="heading">NWPM</p>
              <p class="title">{{ result.NetWPM }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div title="Accuracy">
              <p class="heading">ACCURACY ({{ result.totalWrongChar }})</p>
              <p class="title">{{ result.Accuracy }} %</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div title="Total Character">
              <p class="heading">Total Character ({{ result.totalChar }})</p>
              <p class="title">{{ result.totalTypeChar }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div title="Total Words">
              <p class="heading">Total Words</p>
              <p class="title">{{ result.totalWords }}</p>
            </div>
          </div>
          <!-- Countdown -->
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">TIME</p>
              <p class="title" title="Countdown" v-if="result.totalTimeDuration !== 'free'">
                <countdown
                  :key="countDownKey"
                  :time="result.totalTimeDuration"
                  :auto-start="false"
                  ref="countdown"
                  @countdownprogress="handleCountdownProgress"
                  @countdownend="handleCountdownEnd"
                >
                  <template slot-scope="props">{{ props.minutes }}:{{ props.seconds }}</template>
                </countdown>
              </p>
              <p class="title" v-else title="Timer">
                <b-tooltip
                  label="Click to Pause Typing"
                  position="is-bottom"
                  type="is-danger"
                  animated
                  always
                >
                  <span @click="startTimer('stop')">{{ timerSettings.Output }}</span>
                </b-tooltip>
              </p>
            </div>
          </div>
          <!-- Settings -->
          <b-tooltip label="Settings" position="is-left" type="is-dark" animated>
            <a class="button" @click="isSettingsModalActive = true">
              <b-icon icon="settings"></b-icon>
            </a>
          </b-tooltip>
        </nav>
      </div>
    </section>
    <br>
    <!-- Keyborad -->
    <div class="container">
      <keyborad-inscript-hindi v-show="isShowKeyborad" :key-name="currentTypingChar"/>
    </div>
    <!-- Settings Model -->
    <b-modal :active.sync="isSettingsModalActive" :width="640" scroll="keep">
      <div class="card">
        <header class="card-header has-background-grey-light">
          <p class="card-header-title">Typing Settings</p>
        </header>
        <div class="card-content">
          <section>
            <div class="field">
              <b-switch v-model="isShowKeyborad">Show/Hide Keyboard</b-switch>
            </div>
            <div class="field">
              <b-switch
                v-model="isByPassWrongKey"
              >ByPass Worng Typing Character (Stop cursor on error)</b-switch>
            </div>
          </section>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";

import VueCountdown from "@xkeshi/vue-countdown";
Vue.component(VueCountdown.name, VueCountdown);

import { Base64 } from "js-base64";

import store from "../../../store.js";

// Buefy Toast Component
import { Toast } from "buefy/dist/components/toast";

// Load Inscript Hindi Keyboard Component
import KeyboradInscriptHindi from "@/components/Keyborad-Inscript-Hindi.vue";

import MX_Learn_Lessons from "../MX_Learn_Lessons.js";

export default {
  name: "learn-hindi-inscript-typing",
  mixins: [MX_Learn_Lessons],
  components: {
    "keyborad-inscript-hindi": KeyboradInscriptHindi
  },

  beforeRouteEnter(to, from, next) {
    if (to.params.id != undefined) {
      if (store.state.ihl.lessons !== undefined) {
        var isExistKey = store.state.ihl.lessons[Base64.decode(to.params.id)];
        if (typeof isExistKey !== "undefined") {
          return next();
        }
      }
    }
    Toast.open({
      message: "URL Error : Invalid URL Parameter",
      position: "is-bottom",
      type: "is-danger"
    });
    return next("/");
  },

  beforeRouteLeave(to, from, next) {
    document.removeEventListener("keydown", this.keyDownEventFunction);
    next();
  },

  computed: {
    typingContent() {
      var isExistKey =
        store.state.ihl.lessons[Base64.decode(this.$route.params.id)];
      if (typeof isExistKey !== "undefined") {
        return isExistKey;
      }
      return false;
    },
    timeDuration() {
      return store.state.ihl.selectedTimeDuration;
    }
  },

  methods: {
    /**
     * Generate New Typing Content
     */
    genTypingContent() {
      this.$store.dispatch("ihl/generateTypingContent", {
        lesson: Base64.decode(this.$route.params.id),
        strChar: this.typingContent.name.replace(/ /g, "").toLowerCase()
      });
    }
  },

  mounted() {
    this.$Progress.finish()
  }
};
</script>

<style>
/* Overlay */
#action-new-lesson {
  height: 50%;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 13%;
  margin: auto;
}

/** Typing Content Div */
#thisClass {
  width: 96.4%;
  height: 200px;
  overflow-y: scroll;
}

/**
 * Custom Scrollbar Styling
 * https://codepen.io/devstreak/pen/dMYgeO
 */
#thisClass::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  /* background-color: #f5f5f5; */
  border-radius: 10px;
}

#thisClass::-webkit-scrollbar {
  width: 10px;
}

#thisClass::-webkit-scrollbar-thumb {
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122, 153, 217)),
    color-stop(0.72, rgb(73, 125, 189)),
    color-stop(0.86, rgb(28, 58, 148))
  );
}
</style>
