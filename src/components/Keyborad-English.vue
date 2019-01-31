<template>
  <div id="keyboard" v-show="showKeyborad">
    <ul>
      <li id ="Backquote">
        <span class="off">`</span>
        <span class="on">~</span>
      </li>
      <li id="Digit1">
        <span class="off">1</span>
        <span class="on">!</span>
      </li>
      <li id="Digit2">
        <span class="off">2</span>
        <span class="on">@</span>
      </li>
      <li id="Digit3">
        <span class="off">3</span>
        <span class="on">#</span>
      </li>
      <li id ="Digit4">
        <span class="off">4</span>
        <span class="on">$</span>
      </li>
      <li id="Digit5">
        <span class="off">5</span>
        <span class="on">%</span>
      </li>
      <li id="Digit6">
        <span class="off">6</span>
        <span class="on">^</span>
      </li>
      <li id="Digit7">
        <span class="off">7</span>
        <span class="on">&amp;</span>
      </li>
      <li id="Digit8">
        <span class="off">8</span>
        <span class="on">*</span>
      </li>
      <li id="Digit9">
        <span class="off">9</span>
        <span class="on">(</span>
      </li>
      <li id="Digit0">
        <span class="off">0</span>
        <span class="on">)</span>
      </li>
      <li id="Minus">
        <span class="off">-</span>
        <span class="on">_</span>
      </li>
      <li id="Equal">
        <span class="off">=</span>
        <span class="on">+</span>
      </li>
      <li id="Backspace" style="width: 88px; font-size: small;">Backspace</li>
    </ul>
    <!-- New Line -->
    <ul>
      <li id="Tab" style="width: 87px; font-size: small;">Tab</li>
      <li class="char" id="KeyQ">q</li>
      <li class="char" id="KeyW">w</li>
      <li class="char" id="KeyE">e</li>
      <li class="char" id="KeyR">r</li>
      <li class="char" id="KeyT">t</li>
      <li class="char" id="KeyY">y</li>
      <li class="char" id="KeyU">u</li>
      <li class="char" id="KeyI">i</li>
      <li class="char" id="KeyO">o</li>
      <li class="char" id="KeyP">p</li>
      <li class="char" id="BracketLeft">
        <span class="off">[</span>
        <span class="on">{</span>
      </li>
      <li id="BracketRight">
        <span class="off">]</span>
        <span class="on">}</span>
      </li>
      <li id ="Backslash">
        <span class="off">\</span>
        <span class="on">|</span>
      </li>
    </ul>
    <!-- New Line -->
    <ul>
      <li id="CapsLock" style="width: 100px; font-size: small;">Caps Lock</li>
      <li class="char" id="KeyA">a</li>
      <li class="char" id="KeyS">s</li>
      <li class="char" id="KeyD">d</li>
      <li class="char" id="KeyF">f</li>
      <li class="char" id="KeyG">g</li>
      <li class="char" id="KeyH">h</li>
      <li class="char" id="KeyJ">j</li>
      <li class="char" id="KeyK">k</li>
      <li class="char" id="KeyL">l</li>
      <li class="char" id="Semicolon">
        <span class="off">;</span>
        <span class="on">:</span>
      </li>
      <li id='Quote'>
        <span class="off">'</span>
        <span class="on">&quot;</span>
      </li>
      <li ID="Enter" style="width: 92px; font-size: small;">Enter</li>
    </ul>
    <!-- New Line -->
    <ul>
      <li id="ShiftLeft" style="width: 128px; font-size: small;">Left Shift</li>
      <li class="char" id ="KeyZ">z</li>
      <li class="char" id="KeyX">x</li>
      <li class="char" id="KeyC">c</li>
      <li class="char" id="KeyV">v</li>
      <li class="char" id="KeyB">b</li>
      <li class="char" id="KeyN">n</li>
      <li class="char" id="KeyM">m</li>
      <li id= "Comma">
        <span class="off">,</span>
        <span class="on">&lt;</span></li>
      <li id="Period">
        <span class="off">.</span>
        <span class="on">&gt;</span>
      </li>
      <li id="Slash">
        <span class="off">/</span>
        <span class="on">?</span>
      </li>
      <li id="ShiftRight" style="width: 122px; font-size: small;">Right Shift</li>
    </ul>
    <!-- New Line -->
    <ul>
      <li id="Space" style="width: 807px; font-size: small;">&nbsp; Space</li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "KeyboardEnglish",

  props: ["isShow"], // camelCase in JavaScript

  computed: {
    showKeyborad() {
      if (this.isShow === undefined)
        return true
      else
        return this.isShow
    }
  },

  methods: {
    isCapsLock(status) {
      var capsLockBtn = $("#CapsLock");
      var allChar = $("#keyboard ul li.char");

      // Active Button Backgroud
      if (status === true) {
        capsLockBtn.addClass("active");

        /**
         * All Character [uppercase]
         */
        if (typeof allChar == "object") {
          $.each(allChar, function(index, el) {
            $(el).css("text-transform", "uppercase");
          });
        }
      } else {
        capsLockBtn.removeClass("active");

        /**
         * All Character [lowercase]
         */
        if (typeof allChar == "object") {
          $.each(allChar, function(index, el) {
            $(el).css("text-transform", "lowercase");
          });
        }
      }
    }
  },

  mounted() {
    const that = this;
    window.onkeydown = function(event) {
      var key = event.key; // keyboard key
      var keyCode = event.code; // keyboard key code
      var isShift = event.shiftKey; // shift key active
      var isCapsLockValue = event.getModifierState("CapsLock"); // CapsLock key active

      that.isCapsLock(isCapsLockValue);

      /**
       * Active/Deactive Key
       */
      if (keyCode !== "CapsLock") {
        var id = $("#" + keyCode);

        if (id !== null) {
          // Check Shift Key Active
          if (isShift) {
            id.css("text-transform", "uppercase");
          }

          id.addClass("active");

          setTimeout(function() {
            id.removeClass("active");
          }, 150);
        }
      }

      /**
       * If CapsLock Key Press
       */
      if (key == "Shift") {
        var allChar = $("#keyboard ul li.char");

        // Show small char
        $("#keyboard ul li span.on").css("display", "inherit");
        $("#keyboard ul li span.off").css("display", "none");

        setTimeout(function() {
          $("#keyboard ul li span.on").css("display", "none");
          $("#keyboard ul li span.off").css("display", "inherit");
        }, 150);

        /**
         * All Character [uppercase, lowercase]
         */
        if (typeof allChar == "object") {
          if (isCapsLockValue === true) {
            $.each(allChar, function(index, el) {
              $(el).css("text-transform", "lowercase");
              setTimeout(function() {
                $(el).css("text-transform", "uppercase");
              }, 150);
            });
          } else {
            $.each(allChar, function(index, el) {
              $(el).css("text-transform", "uppercase");
              setTimeout(function() {
                $(el).css("text-transform", "lowercase");
              }, 150);
            });
          }
        }
      }
    };
  }
};
</script>

<style>
#keyboard {
  width: min-content;
}

#keyboard ul {
  clear: both;
  font-size: 23px;
  font-weight: 600;
}

#keyboard ul li {
  float: left;
  margin: 0 5px 5px 0;
  width: 50px;
  height: 40px;
  line-height: 37px;
  text-align: center;
  background: #fee;
  color: #036;
  border: 1px solid #f9f9f9;
  box-shadow: 1px 1px 1px -1px black
}

#keyboard ul li span.on {
  display: none;
}

#keyboard li:hover {
  position: relative;
  top: 1px;
  left: 1px;
  border-color: #e5e5e5;
  cursor: pointer;
}

#keyboard ul li.active {
  background: rgb(51, 170, 250);
}
</style>