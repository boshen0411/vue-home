/**
 * 环狀圖臨時數據
 * a: series.name
 * b: series.data.name
 * c: series.data.value
 * d: series.data.percent
 */
const json = list => {
    // 颜色列表,对应1~5
    const colors = ['#F7BA2A','#15E4B5','#F87B47','#FB5346','#41BAFF']
    list = list.map((item, idx) => {
        item.itemStyle= {normal:{color: colors[idx]}}
        return item
    })
    return {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['0%', '50%'],
                label: {
                    normal: {
                        formatter: "{t|{b}：}{per|{d}%}  ",
                        rich: {
                            t: {
                                color: '#fff',
                                align: 'center'
                            },
                            per: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: list
            }
        ]
    }
}

export default json