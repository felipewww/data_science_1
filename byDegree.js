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
    }
});