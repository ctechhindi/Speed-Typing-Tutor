<template>
  <div class="home">
    <section class="hero is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">English Typing Lessons</h1>
          <h2
            class="subtitle"
          >Take typing speed test, practice your touch typing skills, learn to type faster and with fewer errors with this free online typing tutor.</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <h3 class="title has-text-centered">Classic Lessons</h3>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <p class="level-item">
              <b-field>
                <b-tooltip label="Total Characters in typing content (Min: 50, Max: 1000)" position="is-top" animated>
                  <b-input placeholder="Characters" type="number" v-model="inputTotalCharacters"></b-input>
                </b-tooltip>

                <b-tooltip label="Typing Time Duration" position="is-top" animated>
                  <b-select v-model="selectTimeDuration" placeholder="Select Time for Test">
                    <option
                      v-for="option in allTimeDuration"
                      :value="option.id"
                      :key="option.id">
                      {{ option.name }}
                    </option>
                  </b-select>
                </b-tooltip>
              </b-field>
            </p>
          </div>
        </nav>
        <hr>
        <div class="columns is-multiline">
          <div
            class="column"
            v-for="(p, index) in $store.state.el.lessons"
            :key="index"
            v-bind:class="applyLessonClass('column', index)"
          >
            <div class="card">
              <header class="card-header" v-bind:class="applyLessonClass('header', index)">
                <p class="card-header-title">
                  <router-link
                    class="has-text-white"
                    :to="'/learn/english/classic/'+ clickTOb(index)"
                  >{{ index }}</router-link>
                </p>
              </header>
              <div
                style="padding: 0.8rem;"
                class="card-content has-text-centered has-text-weight-bold is-size-3"
                v-bind:class="applyLessonClass('content', index)"
              >
                <div class="content">
                  {{ p.name }}
                  <span v-if="p.key">({{ p.key }})</span>  
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <h3 class="title has-text-centered">Advanced Lessons</h3> -->
        <hr>
      </div>
    </section>
  </div>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  name: "learn-english-lessons",
  data() {
    return {};
  },

  computed: {
    allTimeDuration() {
      return this.$store.state.el.allTimeDuration;
    },
    selectTimeDuration: {
      get() {
        return this.$store.state.el.selectedTimeDuration;
      },
      set(val) {
        this.$store.commit("el/UP_TIME_DURATION", val)
      }
    },
    inputTotalCharacters: {
      get() {
        return this.$store.state.el.totalCharacters
      },
      set(val) {
        this.$store.commit("el/UP_TOTAL_CHARACTERS", val)
      }
    }
  },

  methods: {
    clickTOb(i) {
      return Base64.encode(i);
    },

    /**
     * Apply Lesson Card Class Name
     * @param: type
     * @param: data
     */
    applyLessonClass(type, data) {
      if (
        data === "Lessons 3" ||
        data === "Lessons 6" ||
        data === "Lessons 11" ||
        data === "Lessons 14" ||
        data === "Lessons 19" ||
        data === "Lessons 22"
      ) {
        if (type === "header") {
          return "has-background-danger";
        } else if (type === "content") {
          return "has-text-danger";
        }
      } else if (
        data === "Lessons 8" ||
        data === "Lessons 16" ||
        data === "Lessons 24"
      ) {
        if (type === "header") {
          return "has-background-info";
        } else if (type === "content") {
          return "has-text-info";
        }
      } else {
        if (type === "header") {
          return "has-background-primary";
        }
      }

      // If Type is Column
      if (type === "column") {
        if (
          data === "Lessons 8" ||
          data === "Lessons 16" ||
          data === "Lessons 24"
        ) {
          return "is-10";
        }
        return "is-2";
      }
    }
  },

  mounted() {
    this.$Progress.finish()
  }
};
</script>