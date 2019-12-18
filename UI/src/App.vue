<template>
  <div id="app">
    <div ref="container" id="container"></div>
    <div id="sidebar">
      <div class="sidebar-section">
        <h2 class="sidebar-section__header">Инструменты</h2>
        <ul class="instruments-list sidebar-section__instruments">
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="1"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 1}"
            >
              Перемещение
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="2"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 2}"
            >
              Удаление
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="3"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 3}"
            >
              Точка
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="4"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 4}"
            >
              Линия
            </button>
          </li>
        </ul>
      </div>
      <div class="hr"></div>
      <div class="sidebar-section">
        <h2 class="sidebar-section__header">Ограничения</h2>
        <ul class="instruments-list sidebar-section__instruments">
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="5"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 5}"
            >
              Совпадение 2 точек
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="6"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 6}"
            >
              Расстояние между 2 точками
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="7"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 7}"
            >
              Горизонтальность прямых
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Konva from 'konva';
import { DataLayer } from '../../DataLayer/DataLayer';
import { Kernel } from '../../Kernel/Kernel';
import { Point } from '../../Point'

export default {
  name: 'app',
  data() {
    return {
      stage: null,
      layer: null,
      dataLayer: null,
      kernel: null,
      selectedInstrument: 1,
      drawPoints: [],
      endOfLine: null,
    };
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.$refs.container.offsetWidth,
      height: this.$refs.container.offsetHeight,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();
    this.setContainerEvents(container);
    // this.kernel = new Kernel();
    // this.dataLayer = new DataLayer(this.kernel);
  },
  methods: {
    selectInstrument(event) {
      this.selectedInstrument = +event.target.dataset.number;
    },
    setContainerEvents(container) {
      // mouseover handler
      container.addEventListener('mousemove', () => {
        // eslint-disable-next-line
        // console.log('mouse');
      });

      // click handler
      container.addEventListener('click', (event) => {
        const pointerX = event.clientX;
        const pointerY = event.clientY;

        if (this.selectedInstrument === 3) { // selected instrument – point
          // eslint-disable-next-line
          console.log('point');
          const newPoint = new Point(pointerX, pointerY);
          // this.dataLayer.addPoint(newPoint);
          const drawPoint = new Konva.Circle({
            radius: 10,
            fill: '#244CE5',
            x: pointerX,
            y: pointerY,
            draggable: true,
          });
          drawPoint.pointId = newPoint.id;
          this.drawPoints.push(drawPoint);
          this.layer.add(drawPoint);
          this.layer.draw();
        } else if (this.selectedInstrument === 4) {
          // eslint-disable-next-line
          console.log('line');
          if (this.tmpLineEnd === null) {
            const startPoint = new Point(pointerX, pointerY);
            const endPoint = new Point(pointerX, pointerY);
            // this.dataLayer.addPoint(newPoint);
            // this.dataLayer.addPoint(endPoint);
            const sP = new Konva.Circle({
              radius: 10,
              fill: '#244CE5',
              x: pointerX,
              y: pointerY,
              draggable: true,
            });
            const eP = sP.clone();
            this.drawPoints.push(sP, eP);
            this.endOfLine = eP;
            const drawLine = new Konva.Line({
              points: [startPoint.x, startPoint.y, endPoint.x, endPoint.y],
              fill: '#244CE5',
            });
            this.layer.add(drawLine);
            this.layer.draw();
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
}

#container {
  width: 100%;
  height: 100%;
}

#sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  padding: 20px 10px;
  box-sizing: border-box;
  background-color: #e7e7e7;
  overflow-y: auto;
}

.sidebar-section {
  &__header {
    margin: 0;
  }

  &__instruments {
    margin: 0;
  }
}

.hr {
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: #acacac;
}

.instruments-list {
  padding: 0;
  list-style-type: none;

  &__el {
    margin: 10px;
  }
}

.instrument-btn {
  border: none;
  outline: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #CBCBF0;
  transition: 200ms all ease;

  &:hover {
    background-color: darken(#CBCBF0, 10);
    color: white;
  }

  &_active {
    background-color: darken(#CBCBF0, 10);
    color: white;

    &:hover {
      cursor: no-drop;
    }
  }
}
</style>
