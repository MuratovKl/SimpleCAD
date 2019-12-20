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
              Горизонтальность
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
              Вертикальность
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="8"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 8}"
            >
              Совмещение точек
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="9"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 9}"
            >
              Фиксация точки
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
import { Point } from '../../Point';
import { Constraint } from '../../Constraint';

export default {
  name: 'app',
  data() {
    return {
      stage: null,
      layer: null,
      dataLayer: null,
      kernel: null,
      selectedInstrument: 1,
      drawingPoints: [],
      endOfLine: false,
      tmpConstraint: null,
      tmpConstraintId: null,
      prevLineDrag: Date.now(),
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
    this.kernel = new Kernel();
    console.log(this.kernel);
    this.dataLayer = new DataLayer(this.kernel);
  },
  methods: {
    selectInstrument(event) {
      this.selectedInstrument = +event.target.dataset.number;
    },
    setPointEvents(point) {
      // TODO add event handler for dragstart and dragend
      point.on('click', () => {
        if (this.selectedInstrument === 2) {
          if (!point.relatedLine) {
            const pointId = point.relatedId;
            this.dataLayer.removePoint(pointId);
            const pointIndex = this.drawingPoints.findIndex((el) => el.relatedId == pointId);
            this.drawingPoints.splice(pointIndex, 1);
            point.destroy();
            this.layer.draw();
          }
        } else if (this.selectedInstrument === 6) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint('LENGTH', [ point ]);
            this.tmpConstraint = constraint;
            if (point.relatedConstraints[constraint.type]) {
              point.relatedConstraints[constraint.type].push(constraint);
            } else {
              point.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            const answer = parseFloat(prompt('Введите расстояние:'));
            if (isNaN(answer)) {
              alert('Введено неверное значение расстояния');
              this.tmpConstraint.points[0].relatedConstraints['LENGTH'].pop();
              this.tmpConstraint = null;
              return;
            }
            this.tmpConstraint.value = answer;
            const constraintPoint = this.tmpConstraint.points[0]
            this.tmpConstraint.points = [constraintPoint.relatedPoint, point.relatedPoint];
            this.dataLayer.addConstraint(this.tmpConstraint);
            point.relatedConstraints[this.tmpConstraint.type] = this.tmpConstraint;
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 8) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint('COINCIDENT', [ point ]);
            this.tmpConstraint = constraint;
            if (point.relatedConstraints[constraint.type]) {
              point.relatedConstraints[constraint.type].push(constraint);
            } else {
              point.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            const constraintPoint = this.tmpConstraint.points[0]
            this.tmpConstraint.points = [constraintPoint.relatedPoint, point.relatedPoint];
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (point.relatedConstraints[this.tmpConstraint.type]) {
              point.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              point.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            if (constraintPoint.relatedConstraints['FIX_POINT']) {
              const fixConstraint = new Constraint('FIX_POINT', [ point.relatedPoint ]);
              point.relatedConstraints['FIX_POINT'] = [ fixConstraint ];
              point.draggable(false);
              point.fill('grey');
              this.dataLayer.addConstraint(fixConstraint);
            } else if (point.relatedConstraints['FIX_POINT']) {
              const fixConstraint = new Constraint('FIX_POINT', [ constraintPoint.relatedPoint ]);
              constraintPoint.relatedConstraints['FIX_POINT'] = [ fixConstraint ];
              constraintPoint.draggable(false);
              constraintPoint.fill('grey');
              this.dataLayer.addConstraint(fixConstraint);
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 9 && !('FIX_POINT' in point.relatedConstraints)) {
          const constraint = new Constraint('FIX_POINT', [ point.relatedPoint ]);
          point.relatedConstraints[constraint.type] = [ constraint ];
          point.draggable(false);
          point.fill('grey');
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        }
      });
      point.on('dragmove', (event) => {
        if (!point.relatedLine) {
          const relatedPoint = point.relatedPoint;
          relatedPoint.x = point.x();
          relatedPoint.y = point.y();
        } else {
          const relatedPoint = point.relatedPoint;
          const line = point.relatedLine;
          const linePoints = line.points();
          const lineX = line.x();
          const lineY = line.y();
          if (point.relatedId === line.startPoint.relatedId) {
            linePoints[0] = point.x() - lineX;
            linePoints[1] = point.y() - lineY;
          } else {
            linePoints[2] = point.x() - lineX;
            linePoints[3] = point.y() - lineY;
          }
          relatedPoint.x = point.x();
          relatedPoint.y = point.y();
          line.points(linePoints);
          this.layer.draw();
        }
        if (Date.now() - this.prevLineDrag > 16) {
          try {
            if (this.dataLayer.resolve()) {
              this.updateDrawing();
            }
          } catch (e) {
            console.error(e.message);
          }
          this.prevLineDrag = Date.now();
        }
      });

      point.on('dragstart', () => {
        if (!point.relatedConstraints['FIX_POINT']) {
          const tmpConstraint = new Constraint('FIX_POINT', [ point.relatedPoint ]);
          this.tmpConstraintId = tmpConstraint.id;
          this.dataLayer.addTmpConstraint(tmpConstraint);
        }
      });

      point.on('dragend', () => {
        if (this.tmpConstraintId) {
          this.dataLayer.removeConstraint(this.tmpConstraintId);
          this.tmpConstraintId = null;
        }
      });

      point.on('mouseenter', () => {
        if (point.draggable()) {
          point.radius(8);
          point.fill('green');
          this.layer.draw();
        }
      });
      point.on('mouseleave', () => {
        if (point.draggable()) {
          point.radius(5);
          point.fill('#244CE5');
          this.layer.draw();
        }
      });
    },
    updatePointPos(point) {
      const relatedPoint = point.relatedPoint;
      point.x(relatedPoint.x);
      point.y(relatedPoint.y);
      if (point.relatedLine) {
        const line = point.relatedLine;
        const linePoints = line.points();
        const lineX = line.x();
        const lineY = line.y();
        if (point.relatedId === line.startPoint.relatedId) {
          linePoints[0] = point.x() - lineX;
          linePoints[1] = point.y() - lineY;
        } else {
          linePoints[2] = point.x() - lineX;
          linePoints[3] = point.y() - lineY;
        }
        line.points(linePoints);
      }
      this.layer.draw();
    },
    updateDrawing() {
      for (let point of this.drawingPoints) {
        this.updatePointPos(point);
      }
    },
    updateLineObject(line) {
      const linePoints = line.points();
      const x = line.x();
      const y = line.y();
      const startP = line.startPoint;
      const startPRel = startP.relatedPoint;
      const endP = line.endPoint;
      const endPRel = endP.relatedPoint;

      startP.x(linePoints[0] + x);
      startP.y(linePoints[1] + y);
      endP.x(linePoints[2] + x);
      endP.y(linePoints[3] + y);

      startPRel.x = startP.x();
      startPRel.y = startP.y();
      endPRel.x = endP.x();
      endPRel.y = endP.y();

      this.layer.draw();
    },
    setLineEvents(line) {
      line.on('click', () => {
        if (this.selectedInstrument === 2) {
          const startP = line.startPoint;
          const endP = line.endPoint;
          const sPId = startP.relatedId;
          const ePId = endP.relatedId;

          this.dataLayer.removePoint(sPId);
          this.dataLayer.removePoint(ePId);

          let pointIndex = this.drawingPoints.findIndex((el) => el.relatedId == sPId);
          this.drawingPoints.splice(pointIndex, 1);
          pointIndex = this.drawingPoints.findIndex((el) => el.relatedId == ePId);
          this.drawingPoints.splice(pointIndex, 1);

          startP.destroy();
          endP.destroy();
          line.destroy();

          this.layer.draw();
        } else if (this.selectedInstrument === 5 && !('HORIZONTAL' in line.relatedConstraints)) {
          const points = [line.startPoint.relatedPoint, line.endPoint.relatedPoint];
          console.log('Line Handler Horizontal');
          const constraint = new Constraint('HORIZONTAL', points);
          line.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
          // this.updateLinePos(line);
        } else if (this.selectedInstrument === 7 && !('VERTICAL' in line.relatedConstraints)) {
          const points = [line.startPoint.relatedPoint, line.endPoint.relatedPoint];
          console.log('Line Handler Vertical');
          const constraint = new Constraint('VERTICAL', points);
          line.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        }
      });
      line.on('dragmove', () => {
        this.updateLineObject(line);
        if (Date.now() - this.prevLineDrag > 30) {
          try {
            if (this.dataLayer.resolve()) {
              this.updateDrawing();
            }
          } catch (e) {
            console.error(e.message);
          }
          this.prevLineDrag = Date.now();
        }
      });

      line.on('mouseenter', () => {
        line.strokeWidth(5);
        line.stroke('green');
        this.layer.draw();
      });
      line.on('mouseleave', () => {
        line.strokeWidth(3);
        line.stroke('#244CE5');
        this.layer.draw();
      });
    },
    setContainerEvents(container) {
      // mouseover handler
      container.addEventListener('mousemove', (event) => {
        // console.log('mouse');
        const pointerX = event.clientX;
        const pointerY = event.clientY;

        if (this.endOfLine) {
          const endPoint = this.drawingPoints[this.drawingPoints.length - 1];
          endPoint.x(pointerX);
          endPoint.y(pointerY);
          const linePoints = endPoint.relatedLine.points();
          linePoints[2] = pointerX;
          linePoints[3] = pointerY;
          endPoint.relatedLine.points(linePoints);
          this.layer.draw();
        }
      });

      // click handler
      container.addEventListener('click', (event) => {
        const pointerX = event.clientX;
        const pointerY = event.clientY;

        if (this.selectedInstrument === 3) { // selected instrument – point
          console.log('point');
          const modelPoint = new Point(pointerX, pointerY);
          this.dataLayer.addPoint(modelPoint);
          const drawingPoint = new Konva.Circle({
            radius: 5,
            fill: '#244CE5',
            x: pointerX,
            y: pointerY,
            draggable: true,
          });
          drawingPoint.relatedPoint = modelPoint;
          drawingPoint.relatedId = modelPoint.id;
          drawingPoint.relatedConstraints = {};
          this.setPointEvents(drawingPoint);
          this.drawingPoints.push(drawingPoint);
          this.layer.add(drawingPoint);
          this.layer.draw();
        } else if (this.selectedInstrument === 4) { // selected instrument – line
          console.log('line');
          if (!this.endOfLine) {
            const startModelPoint = new Point(pointerX, pointerY);
            const endModelPoint = new Point(pointerX, pointerY);
            this.dataLayer.addPoint(startModelPoint);
            this.dataLayer.addPoint(endModelPoint);
            const sP = new Konva.Circle({
              radius: 5,
              fill: '#244CE5',
              x: pointerX,
              y: pointerY,
              draggable: true,
            });
            const eP = sP.clone();
            this.setPointEvents(sP);
            this.setPointEvents(eP);

            this.drawingPoints.push(sP, eP);
            const drawingLine = new Konva.Line({
              points: [startModelPoint.x, startModelPoint.y, endModelPoint.x, endModelPoint.y],
              stroke: '#244CE5',
              strokeWidth: 3,
              draggable: true,
            });
            
            drawingLine.startPoint = sP;
            drawingLine.endPoint = eP;
            drawingLine.relatedConstraints = {};
            this.setLineEvents(drawingLine);

            sP.relatedPoint = startModelPoint;
            sP.relatedLine = drawingLine;
            sP.relatedId = startModelPoint.id;
            sP.relatedConstraints = {};

            eP.relatedPoint = endModelPoint;
            eP.relatedLine = drawingLine;
            eP.relatedId = endModelPoint.id;
            eP.relatedConstraints = {};

            this.endOfLine = true;
            this.layer.add(drawingLine);
            this.layer.add(sP);
            this.layer.add(eP);
            this.layer.draw();
          } else {
            this.endOfLine = false;
            const endPoint = this.drawingPoints[this.drawingPoints.length - 1];
            const relPoint = endPoint.relatedPoint;
            relPoint.x = endPoint.x();
            relPoint.y = endPoint.y();
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
