new Vue({
    el: '#by-like-dance',
    data: {
        tableHeaders: [
            'Gosta de dançar',
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
        setTable() {
            $colsNames = [
                'Sim',
                'Não'
            ];

            mountTableRows($colsNames, this.tableRows);

            for(let person of window.respondents){
                if (person.likeDance) {
                    this.tableRows[1][1]++;
                } else {
                    this.tableRows[0][1]++;
                }
            }

            let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
            fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

            this.$forceUpdate();
        },

        setChart(){

            // makeChart(this.tableRows);
            let chartData = setChartData(this.tableRows);
            let chartColors = getChartColors();

            new Chart(this.$refs.chart, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        data: chartData.dataset,
                        backgroundColor: chartColors.backgroundColors,
                        borderColor: chartColors.borderColors,
                        borderWidth: 1
                    }]
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