new Vue({
    el: '#by-age',
    data: {
        tableHeaders: [
            'Idade',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){
        this.setTable();
        this.setChart();
    },
    methods: {
        setTable(){
            $colsNames = [
                '18 |- 24',
                '24 |- 30',
                '30 |- 36',
                '36 |- 42',
                '42 |- 48',
                '48 ou +',
            ];

            mountTableRows($colsNames, this.tableRows);

            for(let person of window.respondents){
                let idxSelected = null;

                if (person.age < 24) {
                    idxSelected = 0;
                } else if (person.age < 30) {
                    idxSelected = 1;
                } else if (person.age < 36) {
                    idxSelected = 2;
                } else if (person.age < 42) {
                    idxSelected = 3;
                } else if (person.age < 48) {
                    idxSelected = 4;
                } else {
                    idxSelected = 5;
                }

                this.tableRows[idxSelected][1]++;
            }

            let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
            fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

            this.$forceUpdate();
        },
        setChart(){

            let chartData = setChartData(this.tableRows);
            let chartColors = getChartColors();

            new Chart(this.$refs.chart, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            data: chartData.dataset,
                            backgroundColor: chartColors.backgroundColors,
                            borderColor: chartColors.borderColors,
                            borderWidth: 1
                        },
                        {
                            data: chartData.dataset,
                            backgroundColor: ['rgba(0,0,0,0)'],
                            borderColor: chartColors.borderColors,
                            borderWidth: 1,
                            type: 'line'
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem) => {
                                console.log(tooltipItem);
                                let row = this.tableRows[tooltipItem.index];
                                let tip = tooltipItem.yLabel + ' - ' + row[3];
                                return tip;
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: window.respondents.length
                            },
                        }],
                    }
                }
            });
        }
    }
});