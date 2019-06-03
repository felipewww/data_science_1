new Vue({
    el: '#by-gender',
    data: {
        tableHeaders: [
            'sexo',
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
                'Masculino',
                'Feminino'
            ];

            mountTableRows($colsNames, this.tableRows);

            for(let person of window.respondents){
                if (person.genre === 0) {
                    this.tableRows[0][1]++;
                } else {
                    this.tableRows[1][1]++;
                }
            }

            let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
            fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

            this.$forceUpdate();
        },

        setChart(){

            let labels = [
                this.tableRows[0][0],
                this.tableRows[1][0],
            ];

            let dataset = [
                this.tableRows[0][1],
                this.tableRows[1][1],
            ];

            new Chart(this.$refs.chart, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataset,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        //     'rgba(255, 206, 86, 0.2)',
                        //     'rgba(75, 192, 192, 0.2)',
                        //     'rgba(153, 102, 255, 0.2)',
                        //     'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        //     'rgba(255, 206, 86, 1)',
                        //     'rgba(75, 192, 192, 1)',
                        //     'rgba(153, 102, 255, 1)',
                        //     'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
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