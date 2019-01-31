<template>
  <div id="InscriptHinkeyboard" v-show="showKeyborad">
    <ul>
      <li id="Backquote">
        <p class="first_key">ॊ</p>
        <p class="second_key">ऒ</p>
        <p class="third_key">`</p>
      </li>
      <li id="Digit1">
        <p class="first_key">1</p>
        <p class="second_key">ऍ</p>
      </li>
      <li id="Digit2">
        <p class="first_key">2</p>
        <p class="second_key">ॅ</p>
      </li>
      <li id="Digit3">
        <p class="first_key">3</p>
        <p class="second_key">्र</p>
      </li>
      <li id="Digit4">
        <p class="first_key">4</p>
        <p class="second_key">र्</p>
      </li>
      <li id="Digit5">
        <p class="first_key">5</p>
        <p class="second_key">ज्ञ</p>
      </li>
      <li id="Digit6">
        <p class="first_key">6</p>
        <p class="second_key">त्र</p>
      </li>
      <li id="Digit7">
        <p class="first_key">7</p>
        <p class="second_key">क्ष</p>
      </li>
      <li id="Digit8">
        <p class="first_key">8</p>
        <p class="second_key">श्र</p>
      </li>
      <li id="Digit9">
        <p class="first_key">9</p>
        <p class="second_key">(</p>
      </li>
      <li id="Digit0">
        <p class="first_key">0</p>
        <p class="second_key">)</p>
      </li>
      <li id="Minus">
        <p class="first_key">-</p>
        <p class="second_key">ः</p>
        <p class="third_key">-</p>
      </li>
      <li id="Equal">
        <p class="first_key">ृ</p>
        <p class="second_key">ऋ</p>
        <p class="third_key">=</p>
      </li>
      <li id="Backspace" style="width: 88px; font-size: small;">Backspace</li>
    </ul>
    <ul>
      <li id="Tab" style="width: 87px; font-size: small;">Tab</li>
      <li class="char" id="KeyQ">
        <p class="first_key">ौ</p>
        <p class="second_key">औ</p>
        <p class="third_key">Q</p>
      </li>
      <li class="char" id="KeyW">
        <p class="first_key">ै</p>
        <p class="second_key">ऐ</p>
        <p class="third_key">W</p>
      </li>
      <li class="char" id="KeyE">
        <p class="first_key">ा</p>
        <p class="second_key">आ</p>
        <p class="third_key">E</p>
      </li>
      <li class="char" id="KeyR">
        <p class="first_key">ी</p>
        <p class="second_key">ई</p>
        <p class="third_key">R</p>
      </li>
      <li class="char" id="KeyT">
        <p class="first_key">ू</p>
        <p class="second_key">ऊ</p>
        <p class="third_key">T</p>
      </li>
      <li class="char" id="KeyY">
        <p class="first_key">ब</p>
        <p class="second_key">भ</p>
        <p class="third_key">Y</p>
      </li>
      <li class="char" id="KeyU">
        <p class="first_key">ह</p>
        <p class="second_key">ङ</p>
        <p class="third_key">U</p>
      </li>
      <li class="char" id="KeyI">
        <p class="first_key">ग</p>
        <p class="second_key">घ</p>
        <p class="third_key">I</p>
      </li>
      <li class="char" id="KeyO">
        <p class="first_key">द</p>
        <p class="second_key">ध</p>
        <p class="third_key">O</p>
      </li>
      <li class="char" id="KeyP">
        <p class="first_key">ज</p>
        <p class="second_key">झ</p>
        <p class="third_key">P</p>
      </li>
      <li class="char" id="BracketLeft">
        <p class="first_key">ड</p>
        <p class="second_key">ढ</p>
        <p class="third_key">[</p>
      </li>
      <li id="BracketRight">
        <p class="first_key">़</p>
        <p class="second_key">ञ</p>
        <p class="third_key">]</p>
      </li>
      <li id="Backslash">
        <p class="first_key">ॉ</p>
        <p class="second_key">ऑ</p>
        <p class="third_key">\</p>
      </li>
    </ul>
    <ul>
      <li id="CapsLock" style="width: 100px; font-size: small;">Caps Lock</li>
      <li class="char" id="KeyA">
        <p class="first_key">ो</p>
        <p class="second_key">ओ</p>
        <p class="third_key">A</p>
      </li>
      <li class="char" id="KeyS">
        <p class="first_key">े</p>
        <p class="second_key">ए</p>
        <p class="third_key">S</p>
      </li>
      <li class="char" id="KeyD">
        <p class="first_key">्</p>
        <p class="second_key">अ</p>
        <p class="third_key">D</p>
      </li>
      <li class="char" id="KeyF">
        <p class="first_key">ि</p>
        <p class="second_key">इ</p>
        <p class="third_key">F</p>
      </li>
      <li class="char" id="KeyG">
        <p class="first_key">ु</p>
        <p class="second_key">उ</p>
        <p class="third_key">G</p>
      </li>
      <li class="char" id="KeyH">
        <p class="first_key">प</p>
        <p class="second_key">फ</p>
        <p class="third_key">H</p>
      </li>
      <li class="char" id="KeyJ">
        <p class="first_key">र</p>
        <p class="second_key">ऱ</p>
        <p class="third_key">J</p>
      </li>
      <li class="char" id="KeyK">
        <p class="first_key">क</p>
        <p class="second_key">ख</p>
        <p class="third_key">K</p>
      </li>
      <li class="char" id="KeyL">
        <p class="first_key">त</p>
        <p class="second_key">थ</p>
        <p class="third_key">L</p>
      </li>
      <li class="char" id="Semicolon">
        <p class="first_key">च</p>
        <p class="second_key">छ</p>
        <p class="third_key">;</p>
      </li>
      <li id="Quote">
        <p class="first_key">ट</p>
        <p class="second_key">ठ</p>
        <p class="third_key">'</p>
      </li>
      <li id="Enter" style="width: 92px; font-size: small;">Enter</li>
    </ul>
    <ul>
      <li id="ShiftLeft" style="width: 128px; font-size: small;">Left Shift</li>
      <li class="char" id="KeyZ">
        <p class="first_key">ॆ</p>
        <p class="second_key">ऎ</p>
        <p class="third_key">Z</p>
      </li>
      <li class="char" id="KeyX">
        <p class="first_key">ं</p>
        <p class="second_key">ँ</p>
        <p class="third_key">X</p>
      </li>
      <li class="char" id="KeyC">
        <p class="first_key">म</p>
        <p class="second_key">ण</p>
        <p class="third_key">C</p>
      </li>
      <li class="char" id="KeyV">
        <p class="first_key">न</p>
        <p class="second_key">ऩ</p>
        <p class="third_key">V</p>
      </li>
      <li class="char" id="KeyB">
        <p class="first_key">व</p>
        <p class="second_key">ऴ</p>
        <p class="third_key">B</p>
      </li>
      <li class="char" id="KeyN">
        <p class="first_key">ल</p>
        <p class="second_key">ळ</p>
        <p class="third_key">N</p>
      </li>
      <li class="char" id="KeyM">
        <p class="first_key">स</p>
        <p class="second_key">श</p>
        <p class="third_key">M</p>
      </li>
      <li id="Comma">
        <p class="first_key">,</p>
        <p class="second_key">ष</p>
        <p class="third_key">,</p>
      </li>
      <li id="Period">
        <p class="first_key">.</p>
        <p class="second_key">।</p>
        <p class="third_key">.</p>
      </li>
      <li id="Slash">
        <p class="first_key">य</p>
        <p class="second_key">य़</p>
        <p class="third_key">/</p>
      </li>
      <li id="ShiftRight" style="width: 122px; font-size: small;">Right Shift</li>
    </ul>
    <ul>
      <li id="Space" style="width: 807px; height: 40px; font-size: small;">&nbsp; Space</li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "KeyboardInscriptHindi",

  props: ["isShow", "keyName"], // camelCase in JavaScript

  data() {
    return {
      keysData: {
        "ॊ": { select: "#Backquote p.first_key", shift: false },
        "ऒ": { select: "#Backquote p.second_key", shift: "#ShiftRight" },
        "1": { select: "#Digit1 p.first_key", shift: false },
        "ऍ": { select: "#Digit1 p.second_key", shift: "#ShiftRight", },
        "2": { select: "#Digit2 p.first_key", shift: false },
        "ॅ": { select: "#Digit2 p.second_key", shift: "#ShiftRight", },
        "3": { select: "#Digit3 p.first_key", shift: false },
        "्र": { select: "#Digit3 p.second_key", shift: "#ShiftRight", },
        "4": { select: "#Digit4 p.first_key", shift: false },
        "र्": { select: "#Digit4 p.second_key", shift: "#ShiftRight", },
        "5": { select: "#Digit5 p.first_key", shift: false },
        "ज्ञ": { select: "#Digit5 p.second_key", shift: "#ShiftRight", },
        "6": { select: "#Digit6 p.first_key", shift: false },
        "त्र": { select: "#Digit6 p.second_key", shift: "#ShiftRight", },
        "7": { select: "#Digit7 p.first_key", shift: false },
        "क्ष": { select: "#Digit7 p.second_key", shift: "#ShiftLeft", },
        "8": { select: "#Digit8 p.first_key", shift: false },
        "श्र": { select: "#Digit8 p.second_key", shift: "#ShiftLeft", },
        "9": { select: "#Digit9 p.first_key", shift: false },
        "(": { select: "#Digit9 p.second_key", shift: "#ShiftLeft", },
        "0": { select: "#Digit0 p.first_key", shift: false },
        ")": { select: "#Digit0 p.second_key", shift: "#ShiftLeft", },
        "-": { select: "#Minus p.first_key", shift: false },
        "ः": { select: "#Minus p.second_key", shift: "#ShiftLeft", },
        "ृ": { select: "#Equal p.first_key", shift: false },
        "ऋ": { select: "#Equal p.second_key", shift: "#ShiftLeft", },
        // Second Row
        "ौ": { select: "#KeyQ p.first_key", shift: false },
        "औ": { select: "#KeyQ p.second_key", shift: "#ShiftRight" },
        "ै": { select: "#KeyW p.first_key", shift: false },
        "ऐ": { select: "#KeyW p.second_key", shift: "#ShiftRight" },
        "ा": { select: "#KeyE p.first_key", shift: false },
        "आ": { select: "#KeyE p.second_key", shift: "#ShiftRight" },
        "ी": { select: "#KeyR p.first_key", shift: false },
        "ई": { select: "#KeyR p.second_key", shift: "#ShiftRight" },
        "ू": { select: "#KeyT p.first_key", shift: false },
        "ऊ": { select: "#KeyT p.second_key", shift: "#ShiftRight" },
        "ब": { select: "#KeyY p.first_key", shift: false },
        "भ": { select: "#KeyY p.second_key", shift: "#ShiftRight" },
        "ह": { select: "#KeyU p.first_key", shift: false },
        "ङ": { select: "#KeyU p.second_key", shift: "#ShiftLeft" },
        "ग": { select: "#KeyI p.first_key", shift: false },
        "घ": { select: "#KeyI p.second_key", shift: "#ShiftLeft" },
        "द": { select: "#KeyO p.first_key", shift: false },
        "ध": { select: "#KeyO p.second_key", shift: "#ShiftLeft" },
        "ज": { select: "#KeyP p.first_key", shift: false },
        "झ": { select: "#KeyP p.second_key", shift: "#ShiftLeft" },
        "ड": { select: "#BracketLeft p.first_key", shift: false },
        "ढ": { select: "#BracketLeft p.second_key", shift: "#ShiftLeft" },
        "़": { select: "#BracketRight p.first_key", shift: false },
        "ञ": { select: "#BracketRight p.second_key", shift: "#ShiftLeft" },
        "ॉ": { select: "#Backslash p.first_key", shift: false },
        "ऑ": { select: "#Backslash p.second_key", shift: "#ShiftLeft" },
        // Third Row
        "ो" : { select: "#KeyA p.first_key", shift: false },
        "ओ" : { select: "#KeyA p.second_key", shift: "#ShiftRight" },
        "े" : { select: "#KeyS p.first_key", shift: false },
        "ए" : { select: "#KeyS p.second_key", shift: "#ShiftRight" },
        "्" : { select: "#KeyD p.first_key", shift: false },
        "अ" : { select: "#KeyD p.second_key", shift: "#ShiftRight" },
        "ि" : { select: "#KeyF p.first_key", shift: false },
        "इ" : { select: "#KeyF p.second_key", shift: "#ShiftRight" },
        "ु" : { select: "#KeyG p.first_key", shift: false },
        "उ" : { select: "#KeyG p.second_key", shift: "#ShiftRight" },
        "प" : { select: "#KeyH p.first_key", shift: false },
        "फ" : { select: "#KeyH p.second_key", shift: "#ShiftLeft" },
        "र" : { select: "#KeyJ p.first_key", shift: false },
        "ऱ" : { select: "#KeyJ p.second_key", shift: "#ShiftLeft" },
        "क" : { select: "#KeyK p.first_key", shift: false },
        "ख" : { select: "#KeyK p.second_key", shift: "#ShiftLeft" },
        "त" : { select: "#KeyL p.first_key", shift: false },
        "थ" : { select: "#KeyL p.second_key", shift: "#ShiftLeft" },
        "च" : { select: "#Semicolon p.first_key", shift: false },
        "छ" : { select: "#Semicolon p.second_key", shift: "#ShiftLeft" },
        "ट" : { select: "#Quote p.first_key", shift: false },
        "ठ" : { select: "#Quote p.second_key", shift: "#ShiftLeft" },
        // Fourth Row
        "ॆ" : { select: "#KeyZ p.first_key", shift: false },
        "ऎ": { select: "#KeyZ p.second_key", shift: "#ShiftRight" },
        "ं" : { select: "#KeyX p.first_key", shift: false },
        "ँ": { select: "#KeyX p.second_key", shift: "#ShiftRight" },
        "म" : { select: "#KeyC p.first_key", shift: false },
        "ण": { select: "#KeyC p.second_key", shift: "#ShiftRight" },
        "न" : { select: "#KeyV p.first_key", shift: false },
        "ऩ": { select: "#KeyV p.second_key", shift: "#ShiftRight" },
        "व" : { select: "#KeyB p.first_key", shift: false },
        "ऴ": { select: "#KeyB p.second_key", shift: "#ShiftLeft" },
        "ल" : { select: "#KeyN p.first_key", shift: false },
        "ळ": { select: "#KeyN p.second_key", shift: "#ShiftLeft" },
        "स" : { select: "#KeyM p.first_key", shift: false },
        "श": { select: "#KeyM p.second_key", shift: "#ShiftLeft" },
        "," : { select: "#Comma p.first_key", shift: false },
        "ष": { select: "#Comma p.second_key", shift: "#ShiftLeft" },
        "." : { select: "#Period p.first_key", shift: false },
        "।": { select: "#Period p.second_key", shift: "#ShiftLeft" },
        "य" : { select: "#Slash p.first_key", shift: false },
        "य़": { select: "#Slash p.second_key", shift: "#ShiftLeft" },
        // Space
        " ": { select: "#Space", shift: false },
      },
      oldSelectedKey: "",
      oldShiftKey: "",
    }
  },

  computed: {
    showKeyborad() {
      if (this.isShow === undefined)
        return true
      else
        return this.isShow
    }
  },

  watch: {
    keyName (n) {
      if (n !== "") {
        if (this.keysData.hasOwnProperty(n)) {
          var key = this.keysData[n]
          if (key.select !== undefined && key.select !== "") {
            if (this.oldSelectedKey !== key.select) {
              // Remove old style
              if (this.oldSelectedKey !== "") {
                if (this.oldSelectedKey === "#Space") {
                  $(this.oldSelectedKey).css("background-color", "")
                } else {
                  $(this.oldSelectedKey).parent().css("background-color", "")
                }
              }
            }
            if (this.oldShiftKey !== key.shift) {
              // Remove old style in shift key
              if (this.oldShiftKey !== "") {
                $(this.oldShiftKey).css("background-color", "")
              }
            }
            this.oldSelectedKey = key.select
            this.oldShiftKey = key.shift
            if (key.select === "#Space") {
              $(key.select).css("background-color", "#00ffee")
            } else {
              $(key.select).parent().css("background-color", "#00ffee")
              if (key.shift !== false) {
                $(key.shift).css("background-color", "#00ffee")
              }
            }
          }
        }
      }
    }
  },

  methods: {},

  mounted() {
    const that = this;
    window.onkeydown = function(event) {
      var key = event.key; // keyboard key
      var keyCode = event.code; // keyboard key code
      var isShift = event.shiftKey; // shift key active
      var isCapsLockValue = event.getModifierState("CapsLock"); // CapsLock key active

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
    };
  }
};
</script>

<style>
#InscriptHinkeyboard {
  width: min-content;
}

#InscriptHinkeyboard ul {
  clear: both;
  font-size: 18px;
  font-weight: 550;
}

#InscriptHinkeyboard ul li {
  float: left;
  margin: 0 5px 5px 0;
  width: 50px;
  height: 50px;
  line-height: 37px;
  text-align: center;
  background: #fee;
  color: #036;
  border: 1px solid #f9f9f9;
  box-shadow: 1px 1px 1px -1px black;
}

#InscriptHinkeyboard ul li span.on {
  display: none;
}

#InscriptHinkeyboard li:hover {
  position: relative;
  top: 1px;
  left: 1px;
  border-color: #e5e5e5;
  cursor: pointer;
}

#InscriptHinkeyboard ul li.active {
  background: rgb(51, 170, 250);
}

#InscriptHinkeyboard > ul > li > p.first_key {
  margin-right: 22px;
  margin-top: -6px;
}

#InscriptHinkeyboard > ul > li > p.second_key {
  margin-top: -13px;
  margin-left: 25px;
}

#InscriptHinkeyboard > ul > li > p.third_key {
  font-family: sans-serif;
  font-size: 19px;
  margin-top: -63px;
  margin-left: 25px;
}
</style>