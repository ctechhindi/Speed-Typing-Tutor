<template>
  <div classs="typing-test-krutidev-hindi">
    <section class="hero is-dark" id="typing-content" v-once>
      <div class="hero-body" style="padding: 2rem 1.5rem;">
        <div class="container">
          <h1 class="title krutidev" id="lesson" style="line-height: 1.3;"></h1>
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
                <button @click="playAgainTyping" class="button is-medium is-success">
                  <b-icon size="is-medium" icon="play"></b-icon>
                </button>
              </b-tooltip>&nbsp; &nbsp; &nbsp;
              <b-tooltip label="Reload Passage" type="is-primary" animated>
                <button @click="reloadTypingPassage" class="button is-medium is-primary">
                  <b-icon size="is-medium" icon="reload"></b-icon>
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
    <!-- Result Section -->
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
              <p class="heading">ACCURACY ({{ result.totalWrongWords }})</p>
              <p class="title">{{ result.Accuracy }} %</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div title="Total Character">
              <p class="heading">Total Character</p>
              <p class="title">{{ result.totalChar }}</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div title="Total Words">
              <p class="heading">Total Words ({{ result.totalWords }})</p>
              <p class="title">{{ result.typingWordIndex }}</p>
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
    <!-- Show Word Hint -->
    <div class="container" v-show="isShowWordHint">
      <div style="font-size: xx-large; padding-top: 17px;">
        <b-tooltip label="Word Hint" type="is-info" animated>
          <b-tag type="is-info" size="is-medium">
            <b-icon icon="lightbulb-on"></b-icon>
          </b-tag>
        </b-tooltip>&nbsp;
        <strong
          class="krutidev"
          style="letter-spacing: 8px;"
          v-for="w in hintWord"
          :key="w.index"
        >
          <span v-if="w.isUnicodeKey">
            <b-tooltip
              :label="'Alt + '+ w.altUnicodeKey"
              style="letter-spacing: 0px; font-family: cursive;"
              always
            >
              <span
                class="tag is-danger is-large krutidev"
                style="margin-right: 8px; padding-left: 7px; padding-right: 7px;"
              >{{ w.string }}</span>
            </b-tooltip>
          </span>
          <span v-else>{{ w.string }}</span>
        </strong>
      </div>
    </div>
    <!-- Typing Section -->
    <section class="section" v-once>
      <div class="container">
        <div class="field">
          <div class="control">
            <input
              style="font-weight: bold;"
              class="input is-primary is-large krutidev"
              id="typingBox"
              @keydown="keyDownEventFunction"
              type="text"
              placeholder="Vkbfix 'kq: djs"
              autocomplete="off"
            >
          </div>
        </div>
      </div>
    </section>
    <!-- Settings Model -->
    <b-modal :active.sync="isSettingsModalActive" :width="640" scroll="keep">
      <div class="card">
        <header class="card-header has-background-grey-light">
          <p class="card-header-title">Typing Settings</p>
        </header>
        <div class="card-content">
          <section>
            <div class="field">
              <b-switch v-model="isShowOnlyOneWord">Only Show Single Word in Typing Box</b-switch>
            </div>
            <div class="field">
              <b-switch v-model="isCheckOneByOneChar">Check One-by-One Character in Word</b-switch>
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

import MX_Typing_Test from "../MX_Typing_Test.js";

export default {
  name: "typing-test-krutidev-hindi",
  mixins: [MX_Typing_Test],

  data() {
    return {
      hintWord: false,
      typingContentDivClass: "krutiDevHindiWords", // This Class name Using in CSS
    };
  },

  created() {
    var lid = Base64.decode(this.$route.params.id);
    var PType = this.$route.params.passageType;
    if (this.$store.getters["kdht/hasLesson"](lid, PType)) {
      this.$Progress.start();
      this.$store.getters["kdht/getLesson"](lid, PType).then(module => {
        var lengthWords = this.$store.state.kdht.selectedTypingWordsLength;
        this.typingContent = module.default.passage;
        if (lengthWords >= 1000) {
          this.typingContent = module.default.passage;
        } else {
          this.typingContent = module.default.passage
            .split(" ")
            .slice(0, -(1000 - lengthWords))
            .join(" ");
        }
        this.$Progress.finish();
        this.generateWords();
      });
    }
  },

  computed: {
    timeDuration() {
      return this.$store.state.kdht.selectedTimeDuration;
    },
    isDisableBackSpace() {
      return this.$store.state.kdht.isDisableBackSpace;
    },
    isShowWordHint() {
      return this.$store.state.kdht.isShowWordHint;
    }
  },

  methods: {
    /**
     * Reload Typing Passage
     */
    reloadTypingPassage() {
      var PType = this.$route.params.passageType;
      if (PType === "basic") {
        var tPassage = this.$store.state.kdht.listBasicPassages.length;
        var gNum = Math.floor(Math.random() * (tPassage - 1 + 1)) + 0;
        var lessonID = this.$store.state.kdht.listBasicPassages[gNum].id;
        this.$router.push({
          name: "typing-test-krutidev-hindi",
          params: { passageType: "basic", id: Base64.encode(lessonID) }
        });
      } else {
        var tPassage = this.$store.state.kdht.listAdvancedPassages.length;
        var gNum = Math.floor(Math.random() * (tPassage - 1 + 1)) + 0;
        var lessonID = this.$store.state.kdht.listAdvancedPassages[gNum].id;
        this.$router.push({
          name: "typing-test-krutidev-hindi",
          params: { passageType: "advanced", id: Base64.encode(lessonID) }
        });
      }
    },

    /**
     * Find Unicode Character in String
     * @return {array}
     */
    findUnicodeCharacter(str) {
      var returnData = [];
      for (var i = 0, n = str.length; i < n; i++) {
        if (/[^\u0000-\u007F]/.test(str[i]) === true) {
          returnData.push({
            string: str[i],
            isUnicodeKey: true,
            altUnicodeKey: this.$store.getters["findUChar/findUnicodeAltKey"](
              str[i]
            )
          });
        } else {
          returnData.push({
            string: str[i],
            isUnicodeKey: false,
            altUnicodeKey: false
          });
        }
      }
      return returnData;
    }
  },

  watch: {
    currentTypingWord(v) {
      if (this.isShowWordHint === true) {
        if (v !== undefined) {
          this.hintWord = this.findUnicodeCharacter(v);
        }
      }
    }
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
#krutiDevHindiWords {
  width: 96.4%;
  height: 285px;
  overflow-y: scroll;
}

/**
 * Custom Scrollbar Styling
 * https://codepen.io/devstreak/pen/dMYgeO
 */
#krutiDevHindiWords::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  /* background-color: #f5f5f5; */
  border-radius: 10px;
}

#krutiDevHindiWords::-webkit-scrollbar {
  width: 10px;
}

#krutiDevHindiWords::-webkit-scrollbar-thumb {
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(122, 153, 217)),
    color-stop(0.72, rgb(73, 125, 189)),
    color-stop(0.86, rgb(28, 58, 148))
  );
}

@font-face {
  font-family: "Kruti-Dev";
  src: url("./../../../assets/fonts/kruti_dev_010.ttf");
}

.krutidev {
  font-family: Kruti-Dev;
}
</style>