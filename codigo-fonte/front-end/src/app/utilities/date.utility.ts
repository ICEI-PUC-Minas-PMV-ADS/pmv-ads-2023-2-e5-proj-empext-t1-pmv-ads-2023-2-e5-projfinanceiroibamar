export class DateUtil {
    static monthsMMMM = [
        'Janeiro', 'Fevereiro', 'Março',
        'Abril','Maio', 'Junho',
        'Julho','Agosto','Setembro',
        'Outubro','Novembro','Dezembro'
    ];

    static monthsMMM = [
        'Jan','Feb','Mar',
        'Abr','Mai','Jun',
        'Jul','Ago','Set',
        'Out','Nov','Dez'
    ];

    static weekDaysDDDD = [
        'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'
    ];

    static weekDaysDDD = [
        'Dom','Seg','Ter','Qua','Qui','Sex','Sáb'
    ];

    static Format(value: Date, type: string){
        const year = `${value.getFullYear()}`;
        const month = DateUtil.lpad(value.getMonth() + 1);
        const day = DateUtil.lpad(value.getDate());
        const [hour, minute, second] = value.toTimeString().split(' ')[0].split(':');

        if(!type) {
            return `${year}-${month}-${day}`
        }

        return type.replace('DDDD', DateUtil.weekDaysDDDD[value.getDay()])
        .replace('DDD', DateUtil.weekDaysDDD[value.getDay()])
        .replace('DD', day)
        .replace('MMMM', DateUtil.monthsMMMM[+month-1])
        .replace('MMM', DateUtil.monthsMMM[+month-1])
        .replace('MM', month)
        .replace('yyyy', year)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second);
    }

    private static lpad(number: number): string {
        return number < 10 ? `0${number}` : `${number}`;
    }

}