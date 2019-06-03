new Vue({
    el: '#by-food',
    data: {
        tableHeaders: [
            'comida',
            'Freq. Abs (fi)',
            'Freq. Rel (fr)',
            'Porcentagem (fr%)',
        ],
        tableRows: [],
    },
    mounted(){

        $colsNames = [
            'Massas',
            'Regional',
            'fast-food',
            'Carne',
            'Self-service',
        ];

        mountTableRows($colsNames, this.tableRows);

        for(let person of window.respondents){
            this.tableRows[person.preferredFood][1]++;
        }

        let absoluteFrequencies = getTableRowsAbsoluteFrequency(this.tableRows);
        fillFrequenciesWithTotalsRow(this.tableRows, absoluteFrequencies);

        this.$forceUpdate();
    }
});