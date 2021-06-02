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
              data-number="27"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 27}"
            >
              Информация
            </button>
          </li>
          <hr>
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
              Отрезок
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="14"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 14}"
            >
              Дуга
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
              data-number="6"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 6}"
            >
              Расстояние между точками / длина отрезка
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="24"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 24}"
            >
              Расстояние между точкой и отрезком
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
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="10"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 10}"
            >
              Параллельность
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="12"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 12}"
            >
              Перпендикулярность
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="11"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 11}"
            >
              Угол между отрезками
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="13"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 13}"
            >
              Точка на прямой
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="23"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 23}"
            >
              Равная длина отрезков
            </button>
          </li>
          <hr>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="26"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 26}"
            >
              Длина полилинии (отрезки/дуги)
            </button>
          </li>
          <hr>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="16"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 16}"
            >
              Радиус дуги
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="15"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 15}"
            >
              Длина дуги
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="17"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 17}"
            >
              Угол дуги
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="20"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 20}"
            >
              Касание дуги и отрезка
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="25"
              disabled="true"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 25}"
            >
              <del>
                Перпендикулярность прямой к дуге в точке
              </del>
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="21"
              disabled="true"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 21}"
            >
              <del>
                Совмещение точки и конца дуги
              </del>
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              disabled="true"
              data-number="18"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 18}"
            >
              Внешнее касание дуг
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="19"
              disabled="true"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 19}"
            >
              Внутреннее касание дуг
            </button>
          </li>
          <li class="instruments-list__el">
            <button
              @click="selectInstrument"
              data-number="22"
              disabled="true"
              class="instrument-btn"
              :class="{ 'instrument-btn_active': selectedInstrument === 22}"
            >
              <del>
                Фиксация конца дуги
              </del>
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
import { Point } from '../../elements/Point';
import { Constraint } from '../../Constraint';
import { Arc } from '../../elements/Arc';
import { Line } from '../../elements/Line';
import { ConstraintsTypes } from '../../ConstraintsTypes';

const frameTime = 1; // ms
const defaultElementColor = '#244CE5';
const selectedElementColor = '#ff3838';

export default {
  name: 'app',
  data() {
    return {
      stage: null,
      layer: null,
      dataLayer: null,
      kernel: null,
      selectedInstrument: 4,
      drawingPoints: [],
      endOfLine: false,
      arcDrawingStage: 0, // current stage of drawing arc: 0 - not drawing, 1 - center positioned, 2 - start positioned
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
    this.selectedElementList = {lines: [], arcs: []};

    // hey event for LENGTH_TOTAL constraint
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        console.log('enter pressed');
        const answer = prompt('Введите длину:');
        const length = parseFloat(answer);
        if (isNaN(length) || length <= 0) {
          alert('Введено неверное значение длины:' + answer);
          return;
        }
        this.tmpConstraint.value = length
        this.dataLayer.addConstraint(this.tmpConstraint);
        for (const line of this.selectedElementList.lines) {
          line.stroke(defaultElementColor)
        }
        this.selectedElementList.lines = [];
        for (const arc of this.selectedElementList.arcs) {
          arc.fill(defaultElementColor)
        }
        this.selectedElementList.arcs = [];
        this.updateDrawing();
        this.tmpConstraint = null;
      }
    });
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
            const constraint = new Constraint({ type: 'LENGTH', points: [point] });
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
            const constraint = new Constraint({ type: 'COINCIDENT', points: [point] });
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
              const fixConstraint = new Constraint({ type: 'FIX_POINT', points: [point.relatedPoint] });
              point.relatedConstraints['FIX_POINT'] = [ fixConstraint ];
              point.draggable(false);
              point.fill('grey');
              this.dataLayer.addConstraint(fixConstraint);
            } else if (point.relatedConstraints['FIX_POINT']) {
              const fixConstraint = new Constraint({ type: 'FIX_POINT', points: [constraintPoint.relatedPoint] });
              constraintPoint.relatedConstraints['FIX_POINT'] = [ fixConstraint ];
              constraintPoint.draggable(false);
              constraintPoint.fill('grey');
              this.dataLayer.addConstraint(fixConstraint);
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 9 && !('FIX_POINT' in point.relatedConstraints)) {
          const constraint = new Constraint({ type: 'FIX_POINT', points: [point.relatedPoint] });
          point.relatedConstraints[constraint.type] = [ constraint ];
          point.draggable(false);
          point.fill('grey');
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        } else if (this.selectedInstrument === 13) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'POINT_ON_LINE', points: [point.relatedPoint] });
            this.tmpConstraint = constraint;
            if (point.relatedConstraints[constraint.type]) {
              point.relatedConstraints[constraint.type].push(constraint);
            } else {
              point.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            this.tmpConstraint.points = [point.relatedPoint];
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (point.relatedConstraints[this.tmpConstraint.type]) {
              point.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              point.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 21) {
          if (!this.tmpConstraint) {
            let constraint;
            if (point.relatedArc) {
              const arc = point.relatedArc;
              if (point.relatedId == arc.centerPoint.relatedId) {
                return;
              }

              const mode = point.relatedId == arc.startPoint.relatedId ? 1 : 2;
              console.log(`const mode ${mode}`);
              constraint = new Constraint({ type: 'ARC_POINT_COINCIDENT', elements: [ arc.relatedArc ], mode });
            } else {
              constraint = new Constraint({ type: 'ARC_POINT_COINCIDENT', points: [ point.relatedPoint ] });
            }
            this.tmpConstraint = constraint;
            if (point.relatedConstraints[constraint.type]) {
              point.relatedConstraints[constraint.type].push(constraint);
            } else {
              point.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            if (point.relatedArc) {
              if (this.tmpConstraint.elements) {
                this.tmpConstraint = null;
                return;
              }
              const arc = point.relatedArc;
              if (point.relatedId == arc.centerPoint.relatedId) {
                this.tmpConstraint = null;
                return;
              }
              this.tmpConstraint.elements = [ point.relatedArc.relatedArc ];
              const mode = point.relatedId == arc.startPoint.relatedId ? 1 : 2;
              console.log(`constraint mode ${mode}`);
              this.tmpConstraint.mode = mode;
            } else {
              if (this.tmpConstraint.points) {
                this.tmpConstraint = null;
                return;
              } else {
                this.tmpConstraint.points = [ point.relatedPoint ];
              }
            }
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (point.relatedConstraints[this.tmpConstraint.type]) {
              point.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              point.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 22 && !('ARC_POINT_FIX' in point.relatedConstraints)) {
          if (!point.relatedArc) {
            return;
          }
          let mode;
          if (point.relatedId == point.relatedArc.startPoint.relatedId) {
            mode = 1;
          } else {
            mode = 2
          }

          const constraint = new Constraint({ type: 'ARC_POINT_FIX', elements: [point.relatedArc.relatedArc], mode });
          point.relatedConstraints[constraint.type] = [ constraint ];
          point.draggable(false);
          point.fill('grey');
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        } else if (this.selectedInstrument === 24) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'DISTANCE_POINT_LINE', points: [ point.relatedPoint ] });
            this.tmpConstraint = constraint;
            if (point.relatedConstraints[constraint.type]) {
              point.relatedConstraints[constraint.type].push(constraint);
            } else {
              point.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            if (this.tmpConstraint.points) {
              this.tmpConstraint = null;
              return
            }
            const answer = parseFloat(prompt('Введите расстояние:'));
            if (isNaN(answer)) {
              alert('Введено неверное значение расстояние');
              this.tmpConstraint = null;
              return;
            }
            this.tmpConstraint.points = [ point.relatedPoint ];
            this.tmpConstraint.value = answer;
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (point.relatedConstraints[this.tmpConstraint.type]) {
              point.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              point.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 25) {
          if (!this.tmpConstraint) {
            let constraint;
            if (point.relatedArc) {
              const arc = point.relatedArc;
              if (point.relatedId == arc.centerPoint.relatedId) {
                return;
              }

              const mode = point.relatedId == arc.startPoint.relatedId ? 1 : 2;
              constraint = new Constraint({ type: ConstraintsTypes.ARC_LINE_PERPENDICULAR, elements: [ arc.relatedArc ], mode });
            }
            this.tmpConstraint = constraint;
            if (point.relatedConstraints[constraint.type]) {
              point.relatedConstraints[constraint.type].push(constraint);
            } else {
              point.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            if (point.relatedArc) {
              const arc = point.relatedArc;
              if (point.relatedId == arc.centerPoint.relatedId) {
                this.tmpConstraint = null;
                return;
              }
              if (this.tmpConstraint.elements) {
                this.tmpConstraint.points = [ point.relatedPoint ];
              } else {
                this.tmpConstraint.elements = [ point.relatedArc.relatedArc ];
                const mode = point.relatedId == arc.startPoint.relatedId ? 1 : 2;
                this.tmpConstraint.mode = mode;
              }
            }
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (point.relatedConstraints[this.tmpConstraint.type]) {
              point.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              point.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 27) {
          const pointId = point.relatedId;
          const pointInfo = this.dataLayer.getPointInfo(pointId);
          const message = "Point#" + pointId + " (" + pointInfo.x.toFixed(2) + "; " + pointInfo.y.toFixed(2) + ")"
          alert(message)
        }
      });
      point.on('dragmove', (event) => {

        if (point.relatedLine) {
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
        } else if (point.relatedArc) {
          const relatedPoint = point.relatedPoint;
          const arc = point.relatedArc;
          const arcModel = point.relatedArc.relatedArc;
          const centerPoint = arc.centerPoint;
          const startPoint = arc.startPoint;
          const endPoint = arc.endPoint;

          if (point.relatedId == centerPoint.relatedId) { // move arc center
            const deltaX = point.x() - relatedPoint.x;
            const deltaY = point.y() - relatedPoint.y;

            relatedPoint.x = point.x();
            relatedPoint.y = point.y();

            arc.x(point.x());
            arc.y(point.y());

            startPoint.x(startPoint.x() + deltaX);
            startPoint.y(startPoint.y() + deltaY);
            startPoint.relatedPoint.x = startPoint.x();
            startPoint.relatedPoint.y = startPoint.y();
            
            endPoint.x(endPoint.x() + deltaX);
            endPoint.y(endPoint.y() + deltaY);
            endPoint.relatedPoint.x = endPoint.x();
            endPoint.relatedPoint.y = endPoint.y();
          } else if (point.relatedId == startPoint.relatedId) { // move arc start point
            const arcRadius = arc.innerRadius();
            const deltaX = point.x() - centerPoint.x();
            const deltaY = point.y() - centerPoint.y();

            let startAngleRad = Math.atan(deltaY / deltaX);
            let startAngleDeg = startAngleRad * (180 / Math.PI);
            if ((deltaX < 0 && deltaY >= 0) || (deltaX < 0 && deltaY < 0)) {
              startAngleDeg += 180;
              startAngleRad += Math.PI;
            }
            const rotationDelta = startAngleDeg - arc.rotation();
            const newStartYPos = (Math.sin(startAngleRad) * arcRadius) + centerPoint.y();
            const newStartXPos = (Math.cos(startAngleRad) * arcRadius) + centerPoint.x();
            arc.rotation(startAngleDeg);
            point.x(newStartXPos);
            point.y(newStartYPos);
            relatedPoint.x = point.x();
            relatedPoint.y = point.y();

            // const endAngle = (arc.rotation() + arc.angle()) * (Math.PI / 180);
            // const newEndYPos = (Math.sin(endAngle) * arcRadius) + centerPoint.y();
            // const newEndXPos = (Math.cos(endAngle) * arcRadius) + centerPoint.x();

            // endPoint.x(newEndXPos);
            // endPoint.y(newEndYPos);
            // endPoint.relatedPoint.x = endPoint.x();
            // endPoint.relatedPoint.y = endPoint.y();

            const newArcAngle = arc.angle() - rotationDelta;
            arc.angle(newArcAngle);

          } else if (point.relatedId == endPoint.relatedId) { // move arc end point
            const arcRadius = arc.innerRadius();
            const deltaX = point.x() - centerPoint.x();
            const deltaY = point.y() - centerPoint.y();

            let endAngleRad = Math.atan(deltaY / deltaX);
            let endAngleDeg = endAngleRad * (180 / Math.PI);
            if ((deltaX < 0 && deltaY >= 0) || (deltaX < 0 && deltaY < 0)) {
              endAngleDeg += 180;
              endAngleRad += Math.PI;
            }
            const newEndYPos = (Math.sin(endAngleRad) * arcRadius) + centerPoint.y();
            const newEndXPos = (Math.cos(endAngleRad) * arcRadius) + centerPoint.x();
            point.x(newEndXPos);
            point.y(newEndYPos);
            relatedPoint.x = point.x();
            relatedPoint.y = point.y();

            const newArcAngle = endAngleDeg - arc.rotation();
            arc.angle(newArcAngle);
          }
          arcModel.center = centerPoint.relatedPoint;
          arcModel.fi1 = arc.rotation();
          arcModel.fi2 = arc.rotation() + arc.angle();

          this.layer.draw();
        } else {
          const relatedPoint = point.relatedPoint;
          relatedPoint.x = point.x();
          relatedPoint.y = point.y();
        }
        if (Date.now() - this.prevLineDrag > frameTime) {
          try {
            let { status } = this.dataLayer.resolve();
            console.log(`resolve status ${status}`);
            if (status == "OK") {
              this.updateDrawing()
            }
          } catch (e) {
            console.error(e);
          }
          this.prevLineDrag = Date.now();
        }
      });

      // point.on('dragstart', () => {
      //   if (!point.relatedConstraints['FIX_POINT'] && !point.relatedArc) {
      //     const tmpConstraint = new Constraint({ type: 'FIX_POINT', points: [point.relatedPoint] });
      //     this.tmpConstraintId = tmpConstraint.id;
      //     this.dataLayer.addTmpConstraint(tmpConstraint);
      //   }
      // });

      // point.on('dragend', () => {
      //   if (this.tmpConstraintId) {
      //     this.dataLayer.removeConstraint(this.tmpConstraintId);
      //     this.tmpConstraintId = null;
      //   }
      // });

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
          if (point.relatedArc && point.relatedArc.centerPoint == point) {
            point.fill('#ffd500');
          } else {
            point.fill(defaultElementColor);
          }
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
    updateArcPos(arc) {
      const arcModel = arc.relatedArc;
      console.log(arcModel);
      let { p0, p1, p2 } = arcModel;
      const R = arcModel.calcRadius();

      const dx1 = p1.x - p0.x;
      const dy1 = p1.y - p0.y;
      let fi1 = Math.acos(dx1 / R);
      if (dy1 < 0) { // for angle more than PI rad;
        fi1 = 2 * Math.PI - fi1;
      }

      const dx2 = p2.x - p0.x;
      const dy2 = p2.y - p0.y;
      let fi2 = Math.acos(dx2 / R);
      if (dy2 < 0) { // for angle more than PI rad;
        fi2 = 2 * Math.PI - fi2;
      }

      let angle = fi2 - fi1;
      if (fi2 < fi1) {
        angle += 2 * Math.PI;
      }
      const fi1Deg = fi1 * 180 / Math.PI;
      const angleDeg = angle * 180 / Math.PI;

      arc.x(p0.x);
      arc.y(p0.y);
      arc.rotation(fi1Deg)
      arc.angle(angleDeg);
      arc.innerRadius(R)
      arc.outerRadius(R + 3);

      arc.centerPoint.x(p0.x);
      arc.centerPoint.y(p0.y);
      arc.startPoint.x(p1.x);
      arc.startPoint.y(p1.y);
      arc.endPoint.x(p2.x);
      arc.endPoint.y(p2.y);

      this.layer.draw();
    },
    updateDrawing() {
      for (let point of this.drawingPoints) {
        this.updatePointPos(point);
        if (point.relatedArc) {
          this.updateArcPos(point.relatedArc);
        }
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
    updateArcObject(arc) {
      const centerPoint = arc.centerPoint;
      const startPoint = arc.startPoint;
      const endPoint = arc.endPoint;

      const arcX = arc.x();
      const arcY = arc.y();
      const deltaX = arcX - centerPoint.x();
      const deltaY = arcY - centerPoint.y();
      const arcRad = arc.innerRadius();

      centerPoint.x(arcX);
      centerPoint.y(arcY);
      centerPoint.relatedPoint.x = centerPoint.x();
      centerPoint.relatedPoint.y = centerPoint.y();

      startPoint.x(startPoint.x() + deltaX);
      startPoint.y(startPoint.y() + deltaY);
      startPoint.relatedPoint.x = startPoint.x();
      startPoint.relatedPoint.y = startPoint.y();

      endPoint.x(endPoint.x() + deltaX);
      endPoint.y(endPoint.y() + deltaY);
      endPoint.relatedPoint.x = endPoint.x();
      endPoint.relatedPoint.y = endPoint.y();

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
          const constraint = new Constraint({ type: 'HORIZONTAL', points });
          line.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
          // this.updateLinePos(line);
        } else if (this.selectedInstrument === 6) {
          const answer = parseFloat(prompt('Введите расстояние:'));
          if (isNaN(answer)) {
            alert('Введено неверное значение расстояния');
            this.tmpConstraint.points[0].relatedConstraints['LENGTH'].pop();
            this.tmpConstraint = null;
            return;
          }
          const points = [line.startPoint.relatedPoint, line.endPoint.relatedPoint];
          console.log('Line Handler Length');
          const constraint = new Constraint({ type: 'LENGTH', points, value: answer });
          line.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        } else if (this.selectedInstrument === 7 && !('VERTICAL' in line.relatedConstraints)) {
          const points = [line.startPoint.relatedPoint, line.endPoint.relatedPoint];
          console.log('Line Handler Vertical');
          const constraint = new Constraint({ type: 'VERTICAL', points });
          line.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        } else if (this.selectedInstrument === 10) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'PARALLEL', lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            this.tmpConstraint.lines.push([ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]);
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 11) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'ANGLE', lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            const answer = parseFloat(prompt('Введите угол:'));
            if (isNaN(answer)) {
              alert('Введено неверное значение угла');
              this.tmpConstraint = null;
              return;
            }
            this.tmpConstraint.lines.push([ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]);
            this.tmpConstraint.value = { val: answer, mode: 'DEG' };
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 12) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'PERPENDICULAR', lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            this.tmpConstraint.lines.push([ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]);
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 13) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'POINT_ON_LINE', lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            this.tmpConstraint.lines = [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]];
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 20) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'ARC_TANGENT_ToLine', lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            if (this.tmpConstraint.lines) {
              this.tmpConstraint = null;
              return;
            }
            this.tmpConstraint.lines = [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]];
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 23) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'EQUAL_LINES', lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            this.tmpConstraint.lines.push([ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]);
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 24) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'DISTANCE_POINT_LINE', lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            if (this.tmpConstraint.lines) {
              this.tmpConstraint = null;
              return
            }
            const answer = parseFloat(prompt('Введите расстояние:'));
            if (isNaN(answer)) {
              alert('Введено неверное значение расстояние');
              this.tmpConstraint = null;
              return;
            }
            this.tmpConstraint.lines = [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]];
            this.tmpConstraint.value = answer;
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 25) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: ConstraintsTypes.ARC_LINE_PERPENDICULAR, lines: [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            if (this.tmpConstraint.lines) {
              this.tmpConstraint = null;
              return;
            }
            this.tmpConstraint.lines = [[ line.startPoint.relatedPoint, line.endPoint.relatedPoint ]];
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 26) {
          if (!this.tmpConstraint) {
            const newLine = new Line(line.startPoint.relatedPoint, line.endPoint.relatedPoint)
            const constraint = new Constraint({ type: ConstraintsTypes.LENGTH_TOTAL, elements: [ newLine ] });
            this.tmpConstraint = constraint;
            if (line.relatedConstraints[constraint.type]) {
              line.relatedConstraints[constraint.type].push(constraint);
            } else {
              line.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            const newLine = new Line(line.startPoint.relatedPoint, line.endPoint.relatedPoint)
            this.tmpConstraint.elements.push(newLine)
            if (line.relatedConstraints[this.tmpConstraint.type]) {
              line.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              line.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
          }
          this.selectedElementList.lines.push(line)
          line.stroke(selectedElementColor)
          this.layer.draw();
        } else if (this.selectedInstrument === 27) {
          const startP = line.startPoint;
          const endP = line.endPoint;
          const sPId = startP.relatedId;
          const ePId = endP.relatedId;

          const distance = this.dataLayer.getPointsDistance(sPId, ePId);
          const message = "Length is " + distance.toFixed(2);
          alert(message);
        }
      });
      line.on('dragmove', () => {
        this.updateLineObject(line);
        if (Date.now() - this.prevLineDrag > frameTime) {
          try {
            let { status } = this.dataLayer.resolve();
            console.log(`resolve status ${status}`);
            if (status == "OK") {
              this.updateDrawing()
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
        line.stroke(defaultElementColor);
        for (const lineElement of this.selectedElementList.lines) {
          lineElement.stroke(selectedElementColor);
        }
        this.layer.draw();
      });
    },
    setArcEvents(arc) {
      arc.on('click', () => {
        console.log('arc events');
        if (this.selectedInstrument === 15 && !(ConstraintsTypes.ARC_LENGTH in arc.relatedConstraints)) {
          console.log('arc length')
          const answer = prompt('Введите длину дуги:');
          const lenght = parseFloat(answer);
          if (isNaN(lenght) || lenght <= 0) {
            alert('Введено неверное значение длины:' + answer);
            return;
          }
          console.log(arc.relatedArc);
          const constraint = new Constraint({ type: ConstraintsTypes.ARC_LENGTH, elements: [arc.relatedArc], value: lenght });
          arc.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        } else if (this.selectedInstrument === 16 && !(ConstraintsTypes.ARC_RADIUS in arc.relatedConstraints)) {
          console.log('arc radius')
          const answer = prompt('Введите радиус дуги:');
          const radius = parseFloat(answer);
          if (isNaN(radius) || radius <= 0) {
            alert('Введено неверное значение радиуса: ' + answer);
            return;
          }
          console.log(arc.relatedArc);
          const constraint = new Constraint({ type: ConstraintsTypes.ARC_RADIUS, elements: [arc.relatedArc], value: radius });
          arc.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        } else if (this.selectedInstrument === 17 && !(ConstraintsTypes.ARC_ANGLE in arc.relatedConstraints)) {
          console.log('arc angle')
          const answer = prompt('Введите угол дуги:');
          const angle = parseFloat(answer);
          if (isNaN(angle) || angle <= 0 || angle > 360) {
            alert('Введено неверное значение угла: ' + answer);
            return;
          }
          console.log(arc.relatedArc);
          const constraint = new Constraint({ type: ConstraintsTypes.ARC_ANGLE, elements: [arc.relatedArc], value: angle });
          arc.relatedConstraints[constraint.type] = [ constraint ];
          this.dataLayer.addConstraint(constraint);
          this.updateDrawing();
        } else if (this.selectedInstrument === 18 || this.selectedInstrument === 19) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'ARC_TANGENT_ToArc', elements: [ arc.relatedArc ], mode: this.selectedInstrument === 18 ? 'OUT' : 'IN' });
            this.tmpConstraint = constraint;
            if (arc.relatedConstraints[constraint.type]) {
              arc.relatedConstraints[constraint.type].push(constraint);
            } else {
              arc.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            this.tmpConstraint.elements.push(arc.relatedArc);
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (arc.relatedConstraints[this.tmpConstraint.type]) {
              arc.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              arc.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 20) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: 'ARC_TANGENT_ToLine', elements: [ arc.relatedArc ] });
            this.tmpConstraint = constraint;
            if (arc.relatedConstraints[constraint.type]) {
              arc.relatedConstraints[constraint.type].push(constraint);
            } else {
              arc.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            if (this.tmpConstraint.elements) {
              this.tmpConstraint = null;
              return;
            }
            this.tmpConstraint.elements = [ arc.relatedArc ];
            this.dataLayer.addConstraint(this.tmpConstraint);
            if (arc.relatedConstraints[this.tmpConstraint.type]) {
              arc.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              arc.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
            this.updateDrawing();
            this.tmpConstraint = null;
          }
        } else if (this.selectedInstrument === 26) {
          if (!this.tmpConstraint) {
            const constraint = new Constraint({ type: ConstraintsTypes.LENGTH_TOTAL, elements: [ arc.relatedArc ] });
            this.tmpConstraint = constraint;
            if (arc.relatedConstraints[constraint.type]) {
              arc.relatedConstraints[constraint.type].push(constraint);
            } else {
              arc.relatedConstraints[constraint.type] = [ constraint ];
            }
          } else {
            this.tmpConstraint.elements.push(arc.relatedArc)
            if (arc.relatedConstraints[this.tmpConstraint.type]) {
              arc.relatedConstraints[this.tmpConstraint.type].push(this.tmpConstraint);
            } else {
              arc.relatedConstraints[this.tmpConstraint.type] = [ this.tmpConstraint ];
            }
          }
          this.selectedElementList.arcs.push(arc)
          arc.fill(selectedElementColor)
          this.layer.draw();
        } else if (this.selectedInstrument === 27) {
          const radius = arc.relatedArc.calcRadius();
          const fi1 = arc.relatedArc.calcFi1Deg();
          const fi2 = arc.relatedArc.calcFi2Deg();
          const angle = arc.relatedArc.calcAngleDeg();
          const arcLength = radius * (Math.PI * angle /180);
          const message = "Arc#" + arc.relatedArc.id + ":\nR = " + radius.toFixed(2)+ "\n\nArc length is " + arcLength.toFixed(2)
                           + "\n\nAngle = " + angle.toFixed(2) + "\n" + "fi1 = " + fi1.toFixed(2) + "\n" + "fi2 = " + fi2.toFixed(2) ;
          alert(message)
        }
      });
      arc.on('dragmove', () => {
        this.updateArcObject(arc);
        if (Date.now() - this.prevLineDrag > frameTime) {
          try {
            let { status } = this.dataLayer.resolve();
            console.log(`resolve status ${status}`);
            if (status == "OK") {
              this.updateDrawing()
            }
          } catch (e) {
            console.error(e.message);
          }
          this.prevLineDrag = Date.now();
        }
      });
      arc.on('mouseenter', () => {
        arc.outerRadius(arc.innerRadius() + 5);
        arc.fill('green');
        this.layer.draw();
      });
      arc.on('mouseleave', () => {
        arc.outerRadius(arc.innerRadius() + 3);
        arc.fill(defaultElementColor);
        for (const arcElement of this.selectedElementList.arcs) {
          arcElement.fill(selectedElementColor);
        }
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
          console.log(endPoint.relatedLine.rotation());
          this.layer.draw();
        } else if (this.arcDrawingStage == 1) {
          const radiusPoint = this.drawingPoints[this.drawingPoints.length - 1];
          radiusPoint.x(pointerX);
          radiusPoint.y(pointerY);
          radiusPoint.relatedPoint.x = radiusPoint.x();
          radiusPoint.relatedPoint.y = radiusPoint.y();
          this.layer.draw();
        } else if (this.arcDrawingStage == 2) {
          const endPoint = this.drawingPoints[this.drawingPoints.length - 1];
          const centerPoint = this.drawingPoints[this.drawingPoints.length - 3];
          const arcRadius = endPoint.relatedArc.innerRadius();
          const deltaX = pointerX - centerPoint.x();
          const deltaY = pointerY - centerPoint.y();
          let startAngleRad = Math.atan(deltaY / deltaX);
          let startAngleDeg = startAngleRad * (180 / Math.PI);
          if ((deltaX < 0 && deltaY >= 0) || (deltaX < 0 && deltaY < 0)) {
              startAngleDeg += 180;
              startAngleRad += Math.PI;
            }

          const newYPos = (Math.sin(startAngleRad) * arcRadius) + centerPoint.y();
          const newXPos = (Math.cos(startAngleRad) * arcRadius) + centerPoint.x();

          endPoint.x(newXPos);
          endPoint.y(newYPos);
          endPoint.relatedPoint.x = endPoint.x();
          endPoint.relatedPoint.y = endPoint.y();
          endPoint.relatedArc.angle(startAngleDeg - endPoint.relatedArc.rotation());

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
            fill: defaultElementColor,
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
            console.log(JSON.stringify(pointerX))
            const startModelPoint = new Point(pointerX, pointerY);
            const endModelPoint = new Point(pointerX, pointerY);
            this.dataLayer.addPoint(startModelPoint);
            this.dataLayer.addPoint(endModelPoint);
            const sP = new Konva.Circle({
              radius: 5,
              fill: defaultElementColor,
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
              stroke: defaultElementColor,
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
        } else if (this.selectedInstrument === 14) { // selected instrument - arc
          console.log('arc');
          if (this.arcDrawingStage == 0) {
            const centerModelPoint = new Point(pointerX, pointerY);
            const radiusModelPoint = new Point(pointerX, pointerY);
            this.dataLayer.addPoint(centerModelPoint);
            this.dataLayer.addPoint(radiusModelPoint);
            const cP = new Konva.Circle({
              radius: 5,
              fill: '#ffd500',
              x: pointerX,
              y: pointerY,
              draggable: true,
            });
            const rP = cP.clone();
            this.setPointEvents(cP);
            this.setPointEvents(rP);
            this.drawingPoints.push(cP);
            this.drawingPoints.push(rP);

            cP.relatedPoint = centerModelPoint;
            cP.relatedId = centerModelPoint.id;
            cP.relatedConstraints = {};

            rP.relatedPoint = radiusModelPoint;
            rP.relatedId = radiusModelPoint.id;
            rP.relatedConstraints = {};

            this.layer.add(cP);
            this.layer.add(rP);
            this.layer.draw();

            this.arcDrawingStage = 1;
          } else if (this.arcDrawingStage == 1) {
            const centerPoint = this.drawingPoints[this.drawingPoints.length - 2];
            const startPoint = this.drawingPoints[this.drawingPoints.length - 1];
            const endModelPoint = new Point(pointerX, pointerY);
            this.dataLayer.addPoint(endModelPoint);
            const eP = new Konva.Circle({
              radius: 5,
              fill: defaultElementColor,
              x: pointerX,
              y: pointerY,
              draggable: true,
            });
            this.setPointEvents(eP);
            eP.relatedPoint = endModelPoint;
            eP.relatedId = endModelPoint.id;
            eP.relatedConstraints = {};
            this.drawingPoints.push(eP);

            const deltaX = startPoint.x() - centerPoint.x();
            const deltaY = startPoint.y() - centerPoint.y();
            let startAngle = Math.atan(deltaY / deltaX) * (180 / Math.PI);
            if ((deltaX < 0 && deltaY >= 0) || (deltaX < 0 && deltaY < 0)) {
              startAngle += 180;
            }
            const arcRadius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

            const arc = new Konva.Arc({
              x: centerPoint.x(),
              y: centerPoint.y(),
              innerRadius: arcRadius,
              outerRadius: arcRadius + 3,
              angle:  0,
              fill: defaultElementColor,
              stroke: defaultElementColor,
              strokeWidth: 0,
              rotation: startAngle,
              // clockwise: true,
              draggable: true,
            });

            centerPoint.relatedArc = arc;
            startPoint.relatedArc = arc;
            eP.relatedArc = arc;
            arc.centerPoint = centerPoint;
            arc.startPoint = startPoint;
            arc.endPoint = eP;
            arc.relatedConstraints = {};

            this.layer.add(eP);
            this.layer.add(arc);
            this.layer.draw();
            this.arcDrawingStage = 2;
          } else if (this.arcDrawingStage == 2) {
            const arc = this.drawingPoints[this.drawingPoints.length - 1].relatedArc;
            const p0 = arc.centerPoint.relatedPoint;
            const p1 = arc.startPoint.relatedPoint;
            const p2 = arc.endPoint.relatedPoint;
            const arcModel = new Arc(p0, p1, p2, 'DEG');

            const equalRadiusConstraint = new Constraint({ type: 'EQUAL_LINES', lines: [[ p0, p1 ], [ p0, p2 ]] });
            this.dataLayer.addConstraint(equalRadiusConstraint);
            arc.relatedConstraints[equalRadiusConstraint.type] = [ equalRadiusConstraint ];
            
            arc.relatedArc = arcModel;
            arc.relatedId = arcModel.id;
            this.setArcEvents(arc);
            this.dataLayer.addArc(arcModel);
            this.arcDrawingStage = 0;
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
