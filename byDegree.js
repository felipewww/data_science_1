new Vue({
    el: '#by-degree',
    data: {
        tableHeaders: [
            'grau de instrução',
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
                'Não estudou',
                'Fundamental',
                'Médio',
                'Superior',
            ];

            mountTableRows($colsNames, this.tableRows);

            for(let person of window.respondents){
                this.tableRows[person.degree][1]++;
            }

            let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
            fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

            this.$forceUpdate();
        },
        setChart(){
            let chartData = setChartData(this.tableRows);
            let chartColors = getChartColors();

            new Chart(this.$refs.chart, {
                type: 'pie',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            data: chartData.dataset,
                            backgroundColor: chartColors.backgroundColors,
                            borderColor: chartColors.borderColors,
                            borderWidth: 1
                        },
                    ]
                },
                pieceLabel: {
                    // mode 'label', 'value' or 'percentage', default is 'percentage'
                    mode: 'label',
                    precision: 0,
                    fontSize: 18,
                    fontColor: '#fff',
                    fontStyle: 'bold',
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"

                },
                options: {
                    plugins: {
                        labels: {
                            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                            render: 'percentage',

                            // precision for percentage, default is 0
                            precision: 0,

                            // identifies whether or not labels of value 0 are displayed, default is false
                            showZero: true,
                        }
                    },
                    showAllTooltips: true,
                    tooltips: {
                        enabled: true,
                    },
                    legend: {
                        display: true,
                    }
                }
            });

        },
    }
});