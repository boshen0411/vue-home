const getTree = (token) => {
    return {
        code: 1000,
        data: [{
                id: "1",
                name: '常住人口',
                pid: 0,
                state: "N",
                list: [{
                        id: "11",
                        name: '广东省',
                        pid: 1,
                        state: "N",
                        list: [{
                                id: "100",
                                name: '广州市',
                                pid: 11,
                                state: "N",
                            },
                            {
                                id: "101",
                                name: '深圳市',
                                pid: 11,
                                state: "N",
                                list: [{
                                        id: "1000",
                                        name: '南山区',
                                        pid: 101,
                                        state: "Y"
                                    },
                                    {
                                        id: "1001",
                                        name: '福田区',
                                        pid: 101,
                                        state: "N"
                                    },
                                    {
                                        id: "1002",
                                        name: '宝安区',
                                        pid: 101,
                                        state: "N"
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: "12",
                        name: '新疆维吾尔自治区',
                        pid: 1,
                        state: "N",
                        list: [

                        ]
                    }
                ]
            },
            {
                id: "2",
                name: '流动人口',
                pid: 0,
                list: [{
                    id: "12",
                    name: '新疆维吾尔自治区',
                    pid: 1,
                    state: "N",
                    list: [

                    ]
                }]
            },
            {
                id: "3",
                name: '临时人口',
                pid: 0,
                list: [{
                    id: "12",
                    name: '新疆维吾尔自治区',
                    pid: 1,
                    state: "N",
                    list: [

                    ]
                }]
            },
            {
                id: "4",
                name: '布控人口',
                pid: 0,
                list: [{
                    id: "12",
                    name: '新疆维吾尔自治区',
                    pid: 1,
                    state: "N",
                    list: [

                    ]
                }]
            }
        ]
    }
}

export default {
    getTree
}