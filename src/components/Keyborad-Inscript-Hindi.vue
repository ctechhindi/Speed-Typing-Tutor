<template>
  <div id="keyboard" v-show="showKeyborad">
    <ul>
      <li id="Backquote">
        <span class="off">ॊ</span>
        <span class="on">ऒ</span>
      </li>
      <li id="Digit1">
        <span class="off">1</span>
        <span class="on">ऍ</span>
      </li>
      <li id="Digit2">
        <span class="off">2</span>
        <span class="on">ॅ</span>
      </li>
      <li id="Digit3">
        <span class="off">3</span>
        <span class="on">्र</span>
      </li>
      <li id="Digit4">
        <span class="off">4</span>
        <span class="on">र्</span>
      </li>
      <li id="Digit5">
        <span class="off">5</span>
        <span class="on">ज्ञ</span>
      </li>
      <li id="Digit6">
        <span class="off">6</span>
        <span class="on">त्र</span>
      </li>
      <li id="Digit7">
        <span class="off">7</span>
        <span class="on">क्ष</span>
      </li>
      <li id="Digit8">
        <span class="off">8</span>
        <span class="on">श्र</span>
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
        <span class="on">ः</span>
      </li>
      <li id="Equal">
        <span class="off">ृ</span>
        <span class="on">ऋ</span>
      </li>
      <li id="Backspace" style="width: 88px; font-size: small;">Backspace</li>
    </ul>
    <ul>
      <li id="Tab" style="width: 87px; font-size: small;">Tab</li>
      <li class="char" id="KeyQ">
        <span class="off">ौ</span>
        <span class="on">औ</span>
      </li>
      <li class="char" id="KeyW">
        <span class="off">ै</span>
        <span class="on">ऐ</span>
      </li>
      <li class="char" id="KeyE">
        <span class="off">ा</span>
        <span class="on">आ</span>
      </li>
      <li class="char" id="KeyR">
        <span class="off">ी</span>
        <span class="on">ई</span>
      </li>
      <li class="char" id="KeyT">
        <span class="off">ू</span>
        <span class="on">ऊ</span>
      </li>
      <li class="char" id="KeyY">
        <span class="off">ब</span>
        <span class="on">भ</span>
      </li>
      <li class="char" id="KeyU">
        <span class="off">ह</span>
        <span class="on">ङ</span>
      </li>
      <li class="char" id="KeyI">
        <span class="off">ग</span>
        <span class="on">घ</span>
      </li>
      <li class="char" id="KeyO">
        <span class="off">द</span>
        <span class="on">ध</span>
      </li>
      <li class="char" id="KeyP">
        <span class="off">ज</span>
        <span class="on">झ</span>
      </li>
      <li class="char" id="BracketLeft">
        <span class="off">ड</span>
        <span class="on">ढ</span>
      </li>
      <li id="BracketRight">
        <span class="off">़</span>
        <span class="on">ञ</span>
      </li>
      <li id="Backslash">
        <span class="off">ॉ</span>
        <span class="on">ऑ</span>
      </li>
    </ul>
    <ul>
      <li id="CapsLock" style="width: 100px; font-size: small;">Caps Lock</li>
      <li class="char" id="KeyA">
        <span class="off">ो</span>
        <span class="on">ओ</span>
      </li>
      <li class="char" id="KeyS">
        <span class="off">े</span>
        <span class="on">ए</span>
      </li>
      <li class="char" id="KeyD">
        <span class="off">्</span>
        <span class="on">अ</span>
      </li>
      <li class="char" id="KeyF">
        <span class="off">ि</span>
        <span class="on">इ</span>
      </li>
      <li class="char" id="KeyG">
        <span class="off">ु</span>
        <span class="on">उ</span>
      </li>
      <li class="char" id="KeyH">
        <span class="off">प</span>
        <span class="on">फ</span>
      </li>
      <li class="char" id="KeyJ">
        <span class="off">र</span>
        <span class="on">ऱ</span>
      </li>
      <li class="char" id="KeyK">
        <span class="off">क</span>
        <span class="on">ख</span>
      </li>
      <li class="char" id="KeyL">
        <span class="off">त</span>
        <span class="on">थ</span>
      </li>
      <li class="char" id="Semicolon">
        <span class="off">च</span>
        <span class="on">छ</span>
      </li>
      <li id="Quote">
        <span class="off">ट</span>
        <span class="on">ठ</span>
      </li>
      <li id="Enter" style="width: 92px; font-size: small;">Enter</li>
    </ul>
    <ul>
      <li id="ShiftLeft" style="width: 128px; font-size: small;">Left Shift</li>
      <li class="char" id="KeyZ">
        <span class="off">ॆ</span>
        <span class="on">ऎ</span>
      </li>
      <li class="char" id="KeyX">
        <span class="off">ं</span>
        <span class="on">ँ</span>
      </li>
      <li class="char" id="KeyC">
        <span class="off">म</span>
        <span class="on">ण</span>
      </li>
      <li class="char" id="KeyV">
        <span class="off">न</span>
        <span class="on">ऩ</span>
      </li>
      <li class="char" id="KeyB">
        <span class="off">व</span>
        <span class="on">ऴ</span>
      </li>
      <li class="char" id="KeyN">
        <span class="off">ल</span>
        <span class="on">ळ</span>
      </li>
      <li class="char" id="KeyM">
        <span class="off">स</span>
        <span class="on">श</span>
      </li>
      <li id="Comma">
        <span class="off">,</span>
        <span class="on">ष</span>
      </li>
      <li id="Period">
        <span class="off">.</span>
        <span class="on">।</span>
      </li>
      <li id="Slash">
        <span class="off">य</span>
        <span class="on">य़</span>
      </li>
      <li id="ShiftRight" style="width: 122px; font-size: small;">Right Shift</li>
    </ul>
    <ul>
      <li id="Space" style="width: 807px; font-size: small;">&nbsp; Space</li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "KeyboardInscriptHindi",

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