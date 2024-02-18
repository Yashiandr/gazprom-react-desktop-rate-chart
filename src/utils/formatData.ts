function indicatorBySymbol(symbol: string | null) {
    switch(symbol) {
        case '$':
            return 'Курс доллара'
        case '€':
            return 'Курс евро' 
        case '¥':
            return 'Курс юаня'
        default:
            return ''
    }
}

const findAverage = (array: number[]): string => {
    const sum = array.reduce((a: number, b: number): number => a + b);
    return (sum / array.length).toFixed(1)
}

export function filterDataBySymbol(symbol: string | null, json: any) {
    const indicator = indicatorBySymbol(symbol)
    const filteredData = json.filter( function(data: any) {
        return data.indicator === indicator
    })

    let xData: Array<string> = [];
    let yData: Array<number> = [];

    for ( let i = 0; i < filteredData.length; i++) {
        let obj = filteredData[i];

        xData.push(obj.month);
        yData.push(obj.value);
    }

    const title: string = `${indicator.toUpperCase()} ${symbol}/₽`

    let result = {
        title: title,
        description: indicator,
        xData: xData,
        yData: yData,
        average: findAverage(yData),
    }

    return result
}

