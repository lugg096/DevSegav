import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngxestado'
})
export class NgxEstadoPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      if (value.estado == 1) return `
        <div class="estado-row">
          <div class="estado-cell"><img src="./assets/images/process/green_green_left.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green_gray.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/gray_gray_both.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_gray_gray.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/gray_gray_right.svg"></div>
        </div>
      `;
      else if (value.estado == 2) return `
        <div class="estado-row">
          <div class="estado-cell"><img src="./assets/images/process/green_green_left.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/green_green_both.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green_gray.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/gray_gray_right.svg"></div>
        </div>
      `;
      else if (value.estado == 3) return `
        <div class="estado-row">
          <div class="estado-cell"><img src="./assets/images/process/green_green_left.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/green_green_both.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/green_green_right.svg"></div>
        </div>
      `;
      else if (value.estado == 4) return `
        <div class="estado-row">
          <div class="estado-cell"><img src="./assets/images/process/green_green_left.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green_red.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/red_red.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_red_gray.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/gray_gray_right.svg"></div>
        </div>
      `;
      else if (value.estado == 5) return `
        <div class="estado-row">
          <div class="estado-cell"><img src="./assets/images/process/green_green_left.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/green_green_both.svg"></div>
          <div class="estado-cell"><img src="./assets/images/process/line_green_red.svg" width="60px"></div>
          <div class="estado-cell"><img src="./assets/images/process/red_red_left.svg"></div>
        </div>
      `
    }

    return `
      <div class="estado-row">
        <div class="estado-cell"><img src="./assets/images/process/gray_gray.svg"></div>
        <div class="estado-cell"><img src="./assets/images/process/line_gray_gray.svg" width="60px"></div>
        <div class="estado-cell"><img src="./assets/images/process/gray_gray_both.svg"></div>
        <div class="estado-cell"><img src="./assets/images/process/line_gray_gray.svg" width="60px"></div>
        <div class="estado-cell"><img src="./assets/images/process/gray_gray_both.svg"></div>
      </div>
    `;
  }

}
