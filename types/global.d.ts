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
    responsive: { breakpoint: number, options: object }[]
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
    responsive: { breakpoint: number, options: object }[]
}

interface NumberWithKey {
    n: number
    key: number
}

interface Step {
    list: NumberWithKey[]
    why: string
}
