<template>
  <div class="krutidev-hindi-lessons">
    <section class="hero is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Kruti Dev हिन्दी Typing Lessons</h1>
          <h2 class="subtitle"
          >Take typing speed test, practice your touch typing skills, learn to type faster and with fewer errors with this free online typing tutor.</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-fluid">
        <!-- Learn Lessons -->
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <h3 class="title has-text-centered">Learn Lessons</h3>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <p class="level-item">
              <b-field>
                <b-tooltip label="Total Characters in typing content (Min: 50, Max: 1000)" position="is-top" animated>
                  <b-input placeholder="Characters" type="number" v-model="totalChar"></b-input>
                </b-tooltip>

                <b-tooltip label="Typing Time Duration" position="is-top" animated>
                  <b-select v-model="selectTimeDuration" placeholder="Select Time for Test">
                    <option
                      v-for="option in listTimeDuration"
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
        <b-collapse class="panel" v-for="(bl, index) in listLearnLessons" :key="index" :open.sync="collapseOpenData[bl.id].top">
          <div slot="trigger" class="panel-heading">
            <strong>{{ bl.name }}</strong>
          </div>
          <p class="panel-tabs">
            <a v-bind:class="{ 'is-active': collapseOpenData[bl.id].wOShift }" @click="collapseAction(bl.id, 'wOShift')">Without Shift Key</a>
            <a v-bind:class="{ 'is-active': collapseOpenData[bl.id].wShift }" @click="collapseAction(bl.id, 'wShift')">With Shift Key</a>
          </p>
          <div class="panel-block">
            <b-collapse class="panel" :open.sync="collapseOpenData[bl.id].wOShift" animation>
              <div class="columns is-multiline">
                <div class="column" v-for="(shiftLessons, index) in bl.withoutShift" :key="index" v-bind:class="applyLessonClass('column', index)">
                  <div class="card">
                    <header class="card-header" v-bind:class="applyLessonClass('header', index)">
                      <p class="card-header-title">
                        <router-link class="has-text-white" :to="'/learn/hindi/krutidev/'+ encodeString(index)">{{ index }}</router-link>
                      </p>
                    </header>
                    <div style="padding: 0.8rem;" class="card-content has-text-centered has-text-weight-bold is-size-3" v-bind:class="applyLessonClass('content', index)">
                      <div class="content krutidev">
                        {{ shiftLessons.name }}
                        <span v-if="shiftLessons.key">({{ shiftLessons.key }})</span>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-collapse>
            <b-collapse class="panel" :open.sync="collapseOpenData[bl.id].wShift" animation>
              <div class="columns is-multiline">
                <div class="column" v-for="(outShiftLessons, index) in bl.withShift" :key="index" v-bind:class="applyLessonClass('column', index)">
                  <div class="card">
                    <header class="card-header" v-bind:class="applyLessonClass('header', index)">
                      <p class="card-header-title">
                        <router-link class="has-text-white" :to="'/learn/hindi/krutidev/'+ encodeString(index)">{{ index }}</router-link>
                      </p>
                    </header>
                    <div style="padding: 0.8rem;" class="card-content has-text-centered has-text-weight-bold is-size-3" v-bind:class="applyLessonClass('content', index)">
                      <div class="content krutidev">
                        {{ outShiftLessons.name }}
                        <span v-if="outShiftLessons.key">({{ outShiftLessons.key }})</span>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </b-collapse>
      </div>
    </section>
  </div>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  name: "krutidev-hindi-lessons",
  data() {
    return {
      collapseOpenData: {
        "R1": {
          top: true,
          wOShift: true,
          wShift: false,
        },
        "R2": {
          top: false,
          wOShift: true,
          wShift: false,
        },
        "R3": {
          top: false,
          wOShift: true,
          wShift: false,
        }
      },
    };
  },

  computed: {
    lessonsList() {
      return this.$store.state.kdhl.lessons;
    },
    listLearnLessons() {
      return this.$store.state.kdhl.learnLessons;
    },
    listTimeDuration() {
      return this.$store.state.kdhl.listTimeDuration;
    },
    selectTimeDuration: {
      get() {
        return this.$store.state.kdhl.selectedTimeDuration;
      },
      set(val) {
        this.$store.commit("kdhl/UP_TIME_DURATION", val)
      }
    },
    totalChar: {
      get() {
        return this.$store.state.kdhl.totalCharacters
      },
      set(val) {
        this.$store.commit("kdhl/UP_TOTAL_CHARACTERS", val)
      }
    }
  },

  methods: {
    encodeString(i) {
      return Base64.encode(i)
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
        data === "Lessons 22" ||
        data === "Lessons 27" ||
        data === "Lessons 30" ||
        data === "Lessons 35" ||
        data === "Lessons 38" || 
        data === "Lessons 43" || 
        data === "Lessons 46"
      ) {
        if (type === "header") {
          return "has-background-danger";
        } else if (type === "content") {
          return "has-text-danger";
        }
      } else if (
        data === "Lessons 8" ||
        data === "Lessons 16" ||
        data === "Lessons 24" ||
        data === "Lessons 32" ||
        data === "Lessons 40" || 
        data === "Lessons 48"
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
          data === "Lessons 40" || 
          data === "Lessons 48"
        ) {
          return "is-10";
        } else if (data === "Lessons 24" || data === "Lessons 32") {
          return "is-6";
        }
        return "is-2";
      }
    },

    /**
     * Open & Close Collapse
     */
    collapseAction(ch, key) {
      if (key === "wShift") {
        this.collapseOpenData[ch].wOShift = false
        this.collapseOpenData[ch].wShift = true
      } else if (key === "wOShift") {
        this.collapseOpenData[ch].wShift = false
        this.collapseOpenData[ch].wOShift = true
      }
    }
  },

  watch: {
    collapseOpenData: {
      handler: function (newObject) {
        localStorage.setItem("krutidev_lessons_collapse", JSON.stringify(newObject))
      },
      deep: true
    },
  },

  created() {
    // Fetch Collapse Data in localStorage
    var krutidev_lessons_collapse = localStorage.getItem("krutidev_lessons_collapse")
    if (krutidev_lessons_collapse !== null && krutidev_lessons_collapse !== undefined) {
      this.collapseOpenData = JSON.parse(krutidev_lessons_collapse)
    }
  },

  mounted() {
    this.$Progress.finish()
  }
}
</script>

<style>
@font-face {
  font-family: 'Kruti-Dev'; 
  src: url('./../../../assets/fonts/kruti_dev_010.ttf'); 
}

.krutidev {
  font-family: Kruti-Dev;
}
</style>
