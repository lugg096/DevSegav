import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { isNumber } from 'util';

@Pipe({ name: 'ngxcurrency' })
export class NgxCurrencyPipe implements PipeTransform {
    transform(value: any, moneda: string) {
        if (isNumber(value))
            return `<strong class="space-currency">${moneda}.</strong>${this.pipeValue(value)}`;
        return value;
    }

    private pipeValue(value) {
        return new DecimalPipe('en-US').transform(value, '1.2-2');
    }
}