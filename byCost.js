new Vue({
    el: '#by-cost',
    data: {
        tableHeaders: [
            'custo',
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
                '20 |- 40',
                '40 |- 60',
                '60 |- 80',
                '80 |- 100',
                '100 ou +',
            ];

            mountTableRows($colsNames, this.tableRows);

            for(let person of window.respondents){
                let idxSelected = null;

                if (person.spendDisposition < 40) {
                    idxSelected = 0;
                } else if (person.spendDisposition < 60) {
                    idxSelected = 1;
                } else if (person.spendDisposition < 80) {
                    idxSelected = 2;
                } else if (person.spendDisposition < 100) {
                    idxSelected = 3;
                }  else {
                    idxSelected = 4;
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
                    plugins: {
                        labels: {
                            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                            render: (settings) => {
                                return this.tableRows[settings.index][3];
                            },
                        }
                    },
                    legend: {
                        display: false,
                    },
                    showAllTooltips: true,
                    tooltips: {
                        enabled: true,
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