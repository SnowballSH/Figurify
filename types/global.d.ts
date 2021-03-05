type TypeValue =
    "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "rangeBar"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "radar"
    | "polarArea"

interface State {
    options: {
        chart: {
            id: string
        }
        xaxis: {
            categories: number[]
        }
    },
    series: {
        name: string,
        data: number[]
    }[]
    type: TypeValue
    width: number
    height: number
}

interface ChartProp {
    id: string
    xaxis: {
        categories: number[]
    }
    series: {
        name: string,
        data: number[]
    }[]
    type: TypeValue
    width: number
    height: number
}
